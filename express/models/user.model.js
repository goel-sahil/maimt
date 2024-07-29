const pool = require('../config/db.config');

class User {
    /**
     * Fetch the user(s) with addresses
     * @param {*} userId 
     * @returns 
     */
    static async getUsersWithAddresses(userId = null) {
        // Step 1: Construct the query
        const query = User.buildUserAddressQuery(userId);

        // Step 2: Execute the query
        const rows = await User.fetchQueryResults(query, userId);

        // Step 3: Process the result rows
        const users = User.mapRowsToUsersWithAddresses(rows[0], userId);

        // Step 4: Return the result
        return userId ? (users[userId] ? users[userId] : null) : Object.values(users);
    }

    // Function to construct the SQL query
    static buildUserAddressQuery(userId) {
        let query = `
            SELECT 
                u.id AS user_id, 
                u.name, 
                u.email,
                u.password,
                u.job_title,
                u.created_at,
                u.updated_at,
                a.id AS address_id,
                a.address,
                a.city,
                a.state,
                a.created_at as address_created_at,
                a.updated_at as address_updated_at
            FROM
                users u
            LEFT JOIN 
                user_addresses a 
            ON 
                u.id = a.user_id
        `;

        if (userId) {
            query += ` WHERE u.id = ?`;
        }

        return query;
    }

    // Function to execute the SQL query
    static async fetchQueryResults(query, userId) {
        return userId ? await pool.query(query, [userId]) : await pool.query(query);
    }

    // Function to process the result rows
    static mapRowsToUsersWithAddresses(rows, userId) {
        if (this.isEmptyResult(rows, userId)) {
            return {};
        }

        const users = this.processRows(rows);
        return users;
    }

    static isEmptyResult(rows, userId) {
        return rows.length === 0 && userId;
    }

    static processRows(rows) {
        const users = {};
        rows.forEach(row => {
            this.processRow(users, row);
        });
        return users;
    }

    static processRow(users, row) {
        if (!users[row.user_id]) {
            users[row.user_id] = this.mapRowToUser(row);
        }
        if (row.address_id) {
            this.addAddressToUser(users[row.user_id], row);
        }
    }

    // Function to construct a user object from a row
    static mapRowToUser(row) {
        return {
            id: row.user_id,
            name: row.name,
            email: row.email,
            password: row.password,
            job_title: row.job_title,
            addresses: [],
            created_at: row.created_at,
            updated_at: row.updated_at,
        };
    }

    // Function to construct an address object from a row
    static mapRowToAddress(row) {
        return {
            id: row.address_id,
            address: row.address,
            city: row.city,
            state: row.state,
            created_at: row.address_created_at,
            updated_at: row.address_updated_at,
        };
    }

    /**
     * Saves the user into database
     * @param {*} user 
     * @param {*} addresses 
     * @returns 
     */
    static async createUserWithAddresses(user, addresses) {
        const connection = await pool.getConnection();
        await connection.beginTransaction();

        try {
            // Step 1: Insert the user and get the userId
            const userId = await User.insertUser(connection, user);

            // Step 2: Insert the addresses
            await User.insertAddresses(connection, userId, addresses);

            // Step 3: Commit the transaction
            await connection.commit();
            return userId;
        } catch (error) {
            // Rollback the transaction in case of an error
            await connection.rollback();
            throw error;
        } finally {
            // Release the connection
            connection.release();
        }
    }

    // Function to insert a user into the database
    static async insertUser(connection, user) {
        const userQuery = `
            INSERT INTO users (name, email, password, job_title, created_at, updated_at) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const [userResult] = await connection.query(userQuery, [user.name, user.email, user.password, user.job_title, new Date(), new Date()]);
        return userResult.insertId;
    }

    // Function to insert multiple addresses into the database
    static async insertAddresses(connection, userId, addresses) {
        const addressQuery = `
            INSERT INTO user_addresses (user_id, address, city, state, created_at, updated_at)
            VALUES ?
        `;
        const addressValues = addresses.map(address => [
            userId,
            address.address,
            address.city,
            address.state,
            new Date(),
            new Date()
        ]);
        await connection.query(addressQuery, [addressValues]);
    }

    /**
     * Returns the user by id
     * @param {*} userId 
     * @returns 
     */
    static async getUserByID(userId) {
        const query = `SELECT * FROM users WHERE id = ?`;
        const [rows] = await pool.query(query, [userId]);
        return rows.length ? rows[0] : null;
    }

    /**
     * Returns the user by id
     * @param {*} userId 
     * @returns 
     */
    static async getUserByEmail(email) {
        const query = `SELECT * FROM users WHERE email = ?`;
        const [rows] = await pool.query(query, [email]);
        return rows.length ? rows[0] : null;
    }

    /**
     * Fetches the address by id and user id
     * @param {*} id 
     * @param {*} userId 
     * @returns 
     */
    static async getAddressByID(id, userId) {
        const query = `SELECT * FROM user_addresses WHERE id = ? AND user_id = ?`;
        const [rows] = await pool.query(query, [id, userId]);
        return rows.length ? rows[0] : null;
    }

    /**
     * Update the user details based on user id
     * @param {*} userId 
     * @param {*} user 
     * @returns 
     */
    static async updateUserDetails(userId, user) {
        const query = `
            UPDATE users 
            SET name = ?, email = ?,  job_title = ?, updated_at = ? 
            WHERE id = ?
        `;
        const [result] = await pool.query(query, [user.name, user.email, user.job_title, new Date, userId]);
        return result.affectedRows;
    }

    /**
     * Updates the user address in the database
     * @param {*} addressId 
     * @param {*} address 
     * @returns 
     */
    static async updateUserAddress(addressId, address) {
        const query = `
            UPDATE user_addresses 
            SET address = ?, city = ?, state = ?, updated_at = ? 
            WHERE id = ?
        `;
        const [result] = await pool.query(query, [address.address, address.city, address.state, new Date, addressId]);
        return result.affectedRows;
    }

    /**
     * Deletes the user
     * @param {*} userId 
     * @returns 
     */
    static async deleteUser(userId) {
        const connection = await pool.getConnection();
        await connection.beginTransaction();

        try {
            const deleteAddressesQuery = `DELETE FROM user_addresses WHERE user_id = ?`;
            await connection.query(deleteAddressesQuery, [userId]);

            const deleteUserQuery = `DELETE FROM users WHERE id = ?`;
            const [result] = await connection.query(deleteUserQuery, [userId]);

            await connection.commit();
            return result.affectedRows;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }
};

module.exports = User;
