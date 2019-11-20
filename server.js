'use strict';

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3001 });

wss.on('connection', ws => {
  ws.on('message', message => {
    console.log(`Received message`, message);
  });
  ws.send(JSON.stringify({
    title: 'New title',
    text: 'New text',
  }));
});
