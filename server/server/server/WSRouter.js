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
        while (_) try {
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
exports.__esModule = true;
exports.WSRoute = void 0;
var WSQuery_1 = require("../xcore/WSQuery");
var Sessions_1 = require("../xcore/dbase/Sessions");
var Users_1 = require("../xcore/dbase/Users");
function WSRoute(_ws, q) {
    return __awaiter(this, void 0, void 0, function () {
        var wsres, sess_code, data, _a, st, ut, code, ut, st;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    wsres = new WSQuery_1.WSResult(q.cmd);
                    console.log(q);
                    _a = q.cmd;
                    switch (_a) {
                        case 'get_UserBySessionCode': return [3, 1];
                        case 'get_UserByAuth': return [3, 4];
                        case 'set_CUserData': return [3, 7];
                        case 'set_ChangePass': return [3, 9];
                    }
                    return [3, 10];
                case 1:
                    st = new Sessions_1.SessionsTable(q.args);
                    ut = new Users_1.UserTable(q.args, q.sess_code);
                    return [4, st.selectSessCode()];
                case 2:
                    code = _b.sent();
                    return [4, ut.selectUserBySessCode()];
                case 3:
                    data = _b.sent();
                    if (code[0] == undefined) {
                        wsres.error = "Данного кода сессии не существует";
                    }
                    else {
                        sess_code = code[0].sess_code;
                        wsres.code = sess_code;
                        wsres.data = data;
                    }
                    return [3, 11];
                case 4:
                    ut = new Users_1.UserTable(q.args, q.sess_code);
                    st = new Sessions_1.SessionsTable(q.args);
                    return [4, st.insertSess()];
                case 5:
                    sess_code = _b.sent();
                    return [4, ut.selectUser()];
                case 6:
                    data = _b.sent();
                    if (sess_code === '' && data[0] === undefined) {
                        wsres.error = "Пользователя не существует или введены не верные данные";
                    }
                    else {
                        wsres.code = sess_code;
                        wsres.data = data;
                    }
                    return [3, 11];
                case 7:
                    ut = new Users_1.UserTable(q.args, q.sess_code);
                    return [4, ut.updateUser()];
                case 8:
                    data = _b.sent();
                    if (data[0] === undefined) {
                        wsres.error = "Пользователя не существует";
                    }
                    else {
                        wsres.data = data;
                        wsres.code = q.sess_code;
                    }
                    return [3, 11];
                case 9:
                    { }
                    return [3, 11];
                case 10:
                    {
                        wsres.error = "\u041A\u043E\u043C\u0430\u043D\u0434\u0430 \"".concat(q.cmd, "\" \u043D\u0435 \u0440\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u043D\u0430");
                    }
                    return [3, 11];
                case 11:
                    _ws.send((0, WSQuery_1.WSStr)(wsres));
                    return [2];
            }
        });
    });
}
exports.WSRoute = WSRoute;
//# sourceMappingURL=WSRouter.js.map