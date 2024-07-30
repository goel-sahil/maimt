const mysql = require("mysql2");
const conn = mysql.createConnection({
    host: "localhost",
    user: "app",
    password: "root",
    database: "maimt"
})
conn.connect((err) => {
    if (err) {
        console.log("Error", err)
    }
    else {
        console.log("Connected Successfully!")
    }
})
module.exports = conn;