import * as http from "http";
import express from 'express';
import bodyParser from 'body-parser';
import ControllerInterface from './controller/interface.controller';

const { Server } = require('ws');

class App {
  public app: express.Application;
  public server: http.Server;
  public port: number | string;
  public wss: any;

  constructor(controllers: ControllerInterface[], port: number | string) {
    this.app = express();
    this.port = port;
    this.server = this.listen();
    this.wss = this.getWebSocketServer();

    this.applyMiddlewares();
    this.applyControllers(controllers);
  }

  private applyMiddlewares() {
    this.app.use(bodyParser.json());
  }

  private applyControllers(controllers: ControllerInterface[]) {
    controllers.forEach((controller: ControllerInterface) => {
      controller.setWss(this.wss);
      this.app.use('/', controller.router);
    });
  }

  private listen(): http.Server {
    return this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }

  private getWebSocketServer(): any {
    let server = this.server;
    const wss = new Server({ server });

    wss.on('connection', (ws: any) => {
      ws.on('message', (message: string) => {
        console.log(`Received message`, message);
      });
    });

    return wss;
  }
}

export default App;
