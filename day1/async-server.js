const http = require('http');
const fs = require('fs').promises;

http.createServer(async (req, res) => {
    if (req.url === '/read-async') {
        try {
            const data = await fs.readFile('file.txt'); // Non-blocking operation
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(data);
        } catch (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error reading file');
        }
    } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello World');
    }
}).listen(4000, () => {
    console.log('Asynchronous server listening on port 3000');
});
