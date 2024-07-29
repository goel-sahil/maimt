const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    if (req.url === '/read-sync') {
        const data = fs.readFileSync('file.txt'); // Blocking operation
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(data);
    } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello World');
    }
}).listen(3000, () => {
    console.log('Synchronous server listening on port 3000');
});
