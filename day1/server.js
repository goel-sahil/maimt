const { json } = require('body-parser');
const express = require('express');
const mysql = require('mysql2')
const server = express();
server.use(json());

var con = mysql.createConnection({
    host: "localhost",
    user: "app",
    password: "root",
    database: 'test'
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");


});

server.get('/users/:id', (req, res) => {
    let userId = Number(req.params.id);

    con.query(`SELECT * FROM users where id = ${userId}`, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
})



server.get('/users', (req, res) => {
    con.query('SELECT * FROM users', function (err, result) {
        if (err) throw err;
        res.json(result);
    });
    // console.log("hello");
    // let read = fs.readFileSync("./data.json", "utf-8")
    // let data = JSON.parse(read);
})


server.post('/users', (req, res) => {
    const data = req.body;

    con.query(`INSERT INTO users(name,gender,email,password,created_at,updated_at) values ('${data.name}', '${data.gender}','${data.email}','${data.password}','${data.created_at}','${data.updated_at}')`, function (err, result) {
        if (err) throw err;
        res.status(201).json({ message: "user created successfully!!" });
    });

    // let read = fs.readFileSync("./data.json", "utf-8");
    // let dat = JSON.parse(read);
    // dat.push(data);
    // fs.writeFileSync("./data.json", JSON.stringify(dat), 'utf-8');
});

server.delete('/users/:id', (req, res) => {
    const userId = req.params.id;

    con.query(`delete from users where id =${userId}`, function (err, result) {
        if (err) throw err;
        res.status(200).json({ message: "user updated successfully!!", result });
    });


    // let read = fs.readFileSync("./data.json", "utf-8");
    // let dat = JSON.parse(read);
    // const user = dat.find(u => u.id === userId);
    // dat.splice(user, 1);
    // fs.writeFileSync("./data.json", JSON.stringify(dat), 'utf-8');
    res.status(200).json({ message: "User deleted successfully!!" });
})

server.patch('/users/:id', (req, res) => {
    const data = req.body;
    const id = req.params.id;
    con.query(`update  users set name='${data.name}' where id =${id}`, function (err, result) {
        if (err) throw err;
        res.status(200).json({ message: "user updated successfully!!", result });
    });


    // let read = fs.readFileSync("./data.json", "utf-8");
    // let dat = JSON.parse(read);
    // const user = dat.findIndex(u => u.id === id);
    // if (user != -1) {
    //     dat[user] = data
    // }

    // fs.writeFileSync("./data.json", JSON.stringify(data), 'utf-8');
})



server.listen(8000);