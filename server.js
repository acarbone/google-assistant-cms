'use strict';

const { Server } = require('ws');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser')

var app = express();

// Create client
const PORT = process.env.PORT || 80;
const INDEX = path.join(__dirname, 'index.html');

const updateContent = (req, res) => {
  wss.clients.forEach((client) => {
    client.send(JSON.stringify({
      title: req.body.title,
      text: req.body.text,
    }));
  });
  res.send({});
};

const server = app.use(bodyParser.json())
  .get('/', (req, res) => res.sendFile(INDEX))
  .put('/content', updateContent)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

// Create websocket server
const wss = new Server({ server });

wss.on('connection', ws => {
  ws.on('message', message => {
    console.log(`Received message`, message);
  });
});
