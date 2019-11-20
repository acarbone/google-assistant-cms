'use strict';

const http = require('http');
const fs = require('fs');
const { Server } = require('ws');

// Create client
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

// Create websocket server
const wss = new Server({ server });

wss.on('connection', ws => {
  ws.on('message', message => {
    console.log(`Received message`, message);
  });
});

setInterval(() => {
  wss.clients.forEach((client) => {
    client.send(JSON.stringify({
      title: `New title ${Math.random()}`,
      text: new Date().toTimeString(),
    }));
  });
}, 1000);
