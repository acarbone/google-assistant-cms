"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var Server = require('ws').Server;
var App = /** @class */ (function () {
    function App(controllers, port) {
        this.app = express_1.default();
        this.port = port;
        this.server = this.listen();
        this.wss = this.getWebSocketServer();
        this.applyMiddlewares();
        this.applyControllers(controllers);
    }
    App.prototype.applyMiddlewares = function () {
        this.app.use(body_parser_1.default.json());
    };
    App.prototype.applyControllers = function (controllers) {
        var _this = this;
        controllers.forEach(function (controller) {
            controller.setWss(_this.wss);
            _this.app.use('/', controller.router);
        });
    };
    App.prototype.listen = function () {
        var _this = this;
        return this.app.listen(this.port, function () {
            console.log("App listening on the port " + _this.port);
        });
    };
    App.prototype.getWebSocketServer = function () {
        var server = this.server;
        var wss = new Server({ server: server });
        wss.on('connection', function (ws) {
            ws.on('message', function (message) {
                console.log("Received message", message);
            });
        });
        return wss;
    };
    return App;
}());
exports.default = App;
