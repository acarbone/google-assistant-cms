'use strict';

import express from 'express';
import path from 'path';
import ControllerInterface from './interface.controller';

export default class ContentController implements ControllerInterface {

  public router = express.Router();

  private wss: any;

  constructor() {
    this.routes();
  }

  public setWss(wss: any): void {
    this.wss = wss;
  }

  private routes() {
    this.router.get('/', (req: express.Request, res: express.Response) => {
      this.view(req, res);
    });
    this.router.post('/content', (req: express.Request, res: express.Response) => {
      this.update(req, res);
    });
  }

  private view(req: express.Request, res: express.Response): void {
    res.sendFile(
      path.join(__dirname, '../../view/index.html')
    );
  }

  private update(req: express.Request, res: express.Response): void {
    this.wss.clients.forEach((client: WebSocket) => {
      let { title, text } = req.body.queryResult.parameters;

      client.send(JSON.stringify({
        title: title,
        text: text,
      }));
    });

    res.send({});
  };
};
