const sql = require("mysql2")
const conn = sql.createConnection({
    host: "localhost",
    user: 'app',
    password: 'root',
    database: 'test'
})
conn.connect((err) => {
    console.log(err);
})
module.exports = conn;