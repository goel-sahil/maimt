const { urlencoded, json, raw, text } = require('body-parser');
const express = require('express');
const fs = require('fs');
const server = express();

server.use(express.json());

function fileRead(filename) {
    if (!filename || !fs.existsSync(filename)) {
        return "Not found"
    }
    return fs.readFileSync(filename, "utf-8")
}

server.get('/', (req, res, next) => {
    html = fileRead("./home.html");
    res.send(html);
})

server.get('/data', (req, res, next) => {
    data = fileRead("./data.json");
    if (data == "Not found") {
        return res.send(data);
    }
    //data = JSON.parse(data);
    res.send(data);
})

server.get('/about', (req, res, next) => {
    html = fileRead("./about.html");
    res.send(html);
})

server.get('/contact', (req, res, next) => {
    html = fileRead("./contact.html");
    res.send(html);
});

server.get('/xyz', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json').status(201).send({
        "message": `Request processed successfully for ${req.query.id} - ${req.query.name}!`
    });
});

server.post('/xyz', (req, res, next) => {
    res.send({
        "message": `In Post method!`
    });
});

server.put('/xyz', (req, res, next) => {
    res.send({
        "message": `In Put method!`
    });
});

server.patch('/xyz', (req, res, next) => {
    res.send({
        "message": `In Put method!`
    });
});

server.delete('/xyz', (req, res, next) => {
    res.send({
        "message": `In Put method!`
    });
});

server.post('/users', (req, res, next) => {
    // console.log(req.body);
    res.send({
        "message": `In Post method!`
    });
});

server.listen(8000);