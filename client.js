'use strict';

const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  fs.readFile('index.html', (err, data) => {
    if (err) {
      throw err;
    }

    res.writeHead(200, {
      "Content-Type": "text/html"
    });
    res.end(data);
  });
});

server.listen(process.env.PORT || 80);
