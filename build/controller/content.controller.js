'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var ContentController = /** @class */ (function () {
    function ContentController() {
        this.router = express_1.default.Router();
        this.routes();
    }
    ContentController.prototype.setWss = function (wss) {
        this.wss = wss;
    };
    ContentController.prototype.routes = function () {
        var _this = this;
        this.router.get('/', function (req, res) {
            _this.view(req, res);
        });
        this.router.post('/content', function (req, res) {
            _this.update(req, res);
        });
    };
    ContentController.prototype.view = function (req, res) {
        res.sendFile(path_1.default.join(__dirname, '../../view/index.html'));
    };
    ContentController.prototype.update = function (req, res) {
        this.wss.clients.forEach(function (client) {
            var _a = req.body.queryResult.parameters, title = _a.title, text = _a.text;
            client.send(JSON.stringify({
                title: title,
                text: text,
            }));
        });
        res.send({});
    };
    ;
    return ContentController;
}());
exports.default = ContentController;
;
