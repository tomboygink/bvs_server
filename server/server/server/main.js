"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var ws_1 = __importDefault(require("ws"));
var hbs_1 = __importDefault(require("hbs"));
var DBase_1 = require("../xcore/dbase/DBase");
var config_1 = require("../xcore/config");
var WSRouter_1 = require("./WSRouter");
var AppServer = (function () {
    function AppServer() {
        var _this = this;
        this.app = null;
        this.server = null;
        this.wss = null;
        this.DB = null;
        this.app = (0, express_1["default"])();
        this.server = http_1["default"].createServer(this.app);
        this.wss = new ws_1["default"].Server({ server: this.server });
        this.app.set('view engine', 'hbs');
        this.app.set('views', path_1["default"].normalize(path_1["default"].join(__dirname, '..', '..', 'views')));
        hbs_1["default"].registerPartials(path_1["default"].normalize(path_1["default"].join(__dirname, '..', '..', 'views', 'partials')));
        this.app.use('/static', express_1["default"].static(path_1["default"].normalize(path_1["default"].join(__dirname, '..', '..', 'public'))));
        this.DB = (0, DBase_1.getDB)();
        this.DB.NOW();
        this.server.on("close", function () { _this.onCloseServer(); });
    }
    AppServer.prototype.run = function () {
        var _this = this;
        if (this.app === null)
            return;
        if (this.server === null)
            return;
        if (this.wss === null)
            return;
        this.route();
        this.wss.on('connection', function (_ws) {
            _ws.on('message', function (message) { try {
                (0, WSRouter_1.WSRoute)(_ws, JSON.parse(message));
            }
            catch (_a) { } });
        });
        this.server.listen(process.env.PORT || config_1.CONFIG.port, function () {
            var addr = _this.server.address();
            var family = (typeof addr === 'string') ? "IP4" : addr.family;
            var address = (typeof addr === 'string') ? "none" : addr.address;
            var port = (typeof addr === 'string') ? "none" : addr.port;
            var out_res = (typeof addr === 'string') ? 'http://127.0.0.1' : "".concat(family, " ").concat(address).concat(port);
            console.log("Server started on http://127.0.0.1:".concat(port, " -- ").concat(out_res, ")"));
        });
    };
    AppServer.prototype.route = function () {
        var _this = this;
        this.app.all("/", function (req, res) {
            res.render('index.hbs', { title: "---" });
        });
        this.app.all("/confirm_mail", function (req, res) {
            res.render('confirm_mail.hbs', { title: "Подтверждение почты" });
        });
        this.app.all('/quit', function (req, res) { res.send('QUIT SERVER'); _this.server.close(); });
    };
    AppServer.prototype.onCloseServer = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, (0, DBase_1.endDB)()];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    return AppServer;
}());
var app = new AppServer();
app.run();
//# sourceMappingURL=main.js.map