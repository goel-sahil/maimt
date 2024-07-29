const { json } = require('body-parser');
const express = require('express');
const fs = require('fs');
const server = express();
server.use(json());

server.get('/users', (req, res) => {
    let read = fs.readFileSync("./data.json", "utf-8")
    let data = JSON.parse(read);
    res.json(data);
});

server.get('/users/:id', (req, res) => {
    const userId = Number.parseInt(req.params.id);
    let read = fs.readFileSync("./data.json", "utf-8")
    let data = JSON.parse(read);
    const user = data.find(u => u.id === userId);
    res.json(user);
})

server.post('/users', (req, res) => {
    const data = req.body;
    let read = fs.readFileSync("./data.json", "utf-8");
    let dat = JSON.parse(read);
    dat.push(data);
    fs.writeFileSync("./data.json", JSON.stringify(dat), 'utf-8');
    res.status(201).json({ message: "user created successfully!!" });
})

server.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    let read = fs.readFileSync("./data.json", "utf-8");
    let dat = JSON.parse(read);
    const user = dat.find(u => u.id === userId);
    dat.splice(user, 1);
    fs.writeFileSync("./data.json", JSON.stringify(dat), 'utf-8');
    res.status(200).json({ message: "User deleted successfully!!" });
})

server.put('/users/:id', (req, res) => {
    const data = req.body;
    const id = req.params.id;
    let read = fs.readFileSync("./data.json", "utf-8");
    let dat = JSON.parse(read);
    const user = dat.findIndex(u => u.id === userId);
    if (user != -1) {
        dat[user] = data
    }

    fs.writeFileSync("./data.json", JSON.stringify(data), 'utf-8');
    res.status(200).json({ message: "user updated successfully!!" });
})

server.listen(8000);