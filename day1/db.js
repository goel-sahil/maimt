var mysql = require('mysql2');

var con = mysql.createConnection({
    host: "localhost",
    user: "app",
    password: "root",
    database: 'test',
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

var sql = "SELECT * from users";
con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    console.log(fields);
});