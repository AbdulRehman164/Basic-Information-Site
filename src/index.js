const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    if (req.url === '/favicon.ico') return;
    const filePath = path.join(
        __dirname,
        'public',
        req.url === '/' ? '/index.html' : req.url,
    );
    fs.readFile(filePath, (err, content) => {
        if (err) {
            fs.readFile(
                path.join(__dirname, 'public', '/404.html'),
                (err, content) => {
                    if (err) throw err;
                    res.writeHead(400, { 'content-type': 'text/html' });
                    res.end(content);
                },
            );
            return;
        }
        res.writeHead(200, { 'content-type': 'text/html' });
        res.end(content);
    });
});

const PORT = 8080;

server.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});
