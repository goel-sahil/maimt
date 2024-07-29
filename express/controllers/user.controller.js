const User = require("../models/user.model");

class UserController {
    /**
     * Fetches the list of users with their addresses
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    static async getUsers(req, res) {
        let users = await User.getUsersWithAddresses();
        return res.json({
            data: users,
            message: "User list fetched successfully!"
        })
    }

    /**
     * Fetches a single user with address details
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    static async getUser(req, res) {
        let user = await User.getUsersWithAddresses(req.params.id);
        if (!user) {
            return res.status(400).json({
                message: "User does not exists!"
            });
        }

        return res.json({
            data: user,
            message: "User fetched successfully!"
        });
    }

    /**
     * Creates a new user with multiple addresses
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    static async createUser(req, res) {


        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            job_title: req.body.job_title
        };
        const newAddresses = req.body.addresses;

        const existingUser = await User.getUserByEmail(newUser.email);
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists with the same email!"
            });
        }

        const userId = await User.createUserWithAddresses(newUser, newAddresses);
        return res.status(201).json({
            data: {
                id: userId
            },
            message: "User has been created successfully!"
        });
    }

    /**
     * Updates the user details
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    static async updateUser(req, res) {
        const existingUser = await User.getUserByID(req.params.id);
        if (!existingUser) {
            return res.status(404).json({
                message: "User does not exist!"
            });
        }

        const updatedData = {
            name: req.body.name,
            email: req.body.email,
            job_title: req.body.job_title
        };

        await User.updateUserDetails(req.params.id, updatedData);
        return res.json({
            message: "User details have been updated successfully!"
        });
    }

    /**
     * Updates the user address details
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    static async updateUserAddress(req, res) {
        const existingAddress = await User.getAddressByID(req.params.id, req.params.user_id);
        if (!existingAddress) {
            return res.status(404).json({
                message: "Address does not exist!"
            });
        }

        const updatedAddressData = {
            address: req.body.address,
            city: req.body.city,
            state: req.body.state
        };

        await User.updateUserAddress(req.params.id, updatedAddressData);
        return res.json({
            message: "User address has been updated successfully!"
        });
    }

    /**
     * Deletes a user
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    static async deleteUser(req, res) {
        const existingUser = await User.getUserByID(req.params.id);
        if (!existingUser) {
            return res.status(404).json({
                message: "User does not exist!"
            });
        }

        await User.deleteUser(req.params.id);
        return res.json({
            message: "User has been deleted successfully!"
        });
    }
}

module.exports = UserController;