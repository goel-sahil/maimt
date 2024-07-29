const http = require('http');
const fs = require('fs');
function fileRead(filename) {
    if (!filename || !fs.existsSync(filename)) {
        return "Not found"
    }
    return fs.readFileSync(filename, "utf-8")
}

const server = http.createServer((req, res) => {
    const url = req.url;
    let html = ""
    let fileName = ""
    if (url == "/") {
        fileName = "./home.html"
    } else if (url == "/about") {
        fileName = "./about.html"
    } else if (url == "/contact") {
        fileName = "./contact.html"
    } else if (url == "/sever.css") {
        fileName = "./sever.css"
    }
    html = fileRead(fileName);
    res.end(html);
});

server.listen(8000);