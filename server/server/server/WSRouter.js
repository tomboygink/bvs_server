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
exports.WSRoute = void 0;
var WSQuery_1 = require("../xcore/WSQuery");
var Sessions_1 = require("../xcore/dbase/Sessions");
var Users_1 = require("../xcore/dbase/Users");
var Orgs_1 = require("../xcore/dbase/Orgs");
var Jobs_titles_1 = require("../xcore/dbase/Jobs_titles");
var sendMail_1 = require("../xcore/mailer/sendMail");
var crypto_1 = __importDefault(require("crypto"));
var config_1 = require("../xcore/config");
var Devs_groups_1 = require("../xcore/dbase/Devs_groups");
var Devs_1 = require("../xcore/dbase/Devs");
var Dev_sess_1 = require("../xcore/dbase/Dev_sess");
function WSRoute(_ws, q) {
    return __awaiter(this, void 0, void 0, function () {
        var wsres, sess_code, data, _a, st, ut, code, ut, st, old_pass, pass, sendMail, _b, orgs, orgs, jobs, jobs, ut, ut, dg, dg, dg, dev, dev, dev_sess;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    wsres = new WSQuery_1.WSResult(q.cmd);
                    console.log(q);
                    _a = q.cmd;
                    switch (_a) {
                        case 'get_UserBySessionCode': return [3, 1];
                        case 'get_UserByAuth': return [3, 4];
                        case 'set_CUserData': return [3, 7];
                        case 'set_ChangePass': return [3, 9];
                        case 'set_ActMail': return [3, 12];
                        case 'set_MailCode': return [3, 13];
                        case 'set_ForgPass': return [3, 18];
                        case 'set_SaveNewPass': return [3, 20];
                        case 'set_ChangeUser': return [3, 22];
                        case 'get_Org': return [3, 24];
                        case 'set_NewOrg': return [3, 26];
                        case 'get_Jobs': return [3, 31];
                        case 'set_NewJobTitle': return [3, 33];
                        case 'set_NewUser': return [3, 38];
                        case 'get_AllUser': return [3, 40];
                        case 'set_NewDevGroup': return [3, 42];
                        case 'get_DevsGroups': return [3, 47];
                        case 'set_ChangeDevsGroups': return [3, 49];
                        case 'set_NewDevs': return [3, 51];
                        case 'set_ChangeDevs': return [3, 53];
                        case 'get_DevSessions': return [3, 54];
                        case 'deleteCookie': return [3, 56];
                    }
                    return [3, 57];
                case 1:
                    st = new Sessions_1.SessionsTable(q.args);
                    ut = new Users_1.UserTable(q.args, q.sess_code);
                    return [4, st.selectSessCode()];
                case 2:
                    code = _c.sent();
                    return [4, ut.selectUserBySessCode()];
                case 3:
                    data = _c.sent();
                    if (code[0] == undefined) {
                        wsres.error = "Данного кода сессии не существует";
                    }
                    else {
                        sess_code = code[0].sess_code;
                        wsres.code = sess_code;
                        wsres.data = data;
                    }
                    return [3, 58];
                case 4:
                    ut = new Users_1.UserTable(q.args, q.sess_code);
                    st = new Sessions_1.SessionsTable(q.args);
                    return [4, st.insertSess()];
                case 5:
                    sess_code = _c.sent();
                    return [4, ut.selectUser()];
                case 6:
                    data = _c.sent();
                    if (sess_code === '' && data[0] === undefined) {
                        wsres.error = "Пользователя не существует или введены не верные данные";
                    }
                    else {
                        wsres.code = sess_code;
                        wsres.data = data;
                    }
                    return [3, 58];
                case 7:
                    ut = new Users_1.UserTable(q.args, q.sess_code);
                    return [4, ut.updateUser()];
                case 8:
                    data = _c.sent();
                    if (data[0] === undefined) {
                        wsres.error = "Пользователя не существует";
                    }
                    else {
                        wsres.data = data;
                        wsres.code = q.sess_code;
                    }
                    return [3, 58];
                case 9:
                    ut = new Users_1.UserTable(q.args, q.sess_code);
                    return [4, ut.selectUserLoginEmail()];
                case 10:
                    data = _c.sent();
                    old_pass = crypto_1["default"].createHmac('sha256', config_1.CONFIG.key_code).update(q.args.old_password).digest('hex');
                    pass = crypto_1["default"].createHmac('sha256', config_1.CONFIG.key_code).update(q.args.new_password).digest('hex');
                    if (data[0].password === pass) {
                        wsres.error = 'Новый пароль не должен повторять старый';
                        wsres.data = [];
                        wsres.code = q.sess_code;
                        return [3, 58];
                    }
                    if (q.args.login === q.args.new_password) {
                        wsres.error = 'Пароль не должен совпадать с логином';
                        wsres.data = [];
                        wsres.code = q.sess_code;
                        return [3, 58];
                    }
                    if (data[0].password !== old_pass) {
                        wsres.error = 'Старый пароль не верен';
                        wsres.code = q.sess_code;
                        wsres.data = [];
                        return [3, 58];
                    }
                    return [4, ut.changePass()];
                case 11:
                    data = _c.sent();
                    wsres.data = data;
                    wsres.code = q.sess_code;
                    wsres.error = null;
                    return [3, 58];
                case 12:
                    {
                        if (q.args.email !== '') {
                            sendMail = new sendMail_1.SendMail(q.args, q.sess_code);
                            sendMail.sendConfirmMail();
                        }
                        else {
                            wsres.error = "Введите email";
                        }
                    }
                    return [3, 58];
                case 13:
                    ut = new Users_1.UserTable(q.args, q.sess_code);
                    return [4, ut.updateMail()];
                case 14:
                    data = _c.sent();
                    if (!(data[0] === undefined)) return [3, 15];
                    wsres.error = "Введен неверный код";
                    return [3, 17];
                case 15:
                    _b = wsres;
                    return [4, ut.updateMail()];
                case 16:
                    _b.data = _c.sent();
                    wsres.code = q.sess_code;
                    _c.label = 17;
                case 17: return [3, 58];
                case 18:
                    ut = new Users_1.UserTable(q.args, q.sess_code);
                    sendMail = new sendMail_1.SendMail(q.args, q.sess_code);
                    return [4, ut.selectUserLoginEmail()];
                case 19:
                    data = _c.sent();
                    if (data[0] == undefined) {
                        wsres.error = 'Такого email не существует, проверте введенные данные или обратитесть к администратору системы';
                    }
                    else {
                        if (data[0].act_mail === true) {
                            sendMail.sendRePassword();
                        }
                        else {
                            wsres.error = 'Данный email не был подтвержден, обращайтесь к администратору системы';
                        }
                    }
                    return [3, 58];
                case 20:
                    ut = new Users_1.UserTable(q.args, q.sess_code);
                    return [4, ut.selectUserLoginEmail()];
                case 21:
                    data = _c.sent();
                    if (q.args.code !== data[0].re_password_code) {
                        wsres.error = 'Код подтверждения неверен, проверте правильность введеного кода';
                    }
                    else {
                        ut = new Users_1.UserTable(q.args, q.sess_code);
                        ut.forgPass();
                    }
                    return [3, 58];
                case 22:
                    ut = new Users_1.UserTable(q.args, q.sess_code);
                    return [4, ut.updateUserAdmin()];
                case 23:
                    _c.sent();
                    return [3, 58];
                case 24:
                    orgs = new Orgs_1.OrgsTable(q.args, q.sess_code);
                    return [4, orgs.selectOrgs()];
                case 25:
                    data = _c.sent();
                    if (data.length > 0) {
                        wsres.code = q.sess_code;
                        wsres.error = null;
                        wsres.data = data;
                    }
                    else {
                        wsres.code = q.sess_code;
                        wsres.data = [],
                            wsres.error = 'Организации отсутвуют';
                    }
                    return [3, 58];
                case 26:
                    orgs = new Orgs_1.OrgsTable(q.args, q.sess_code);
                    return [4, orgs.insertOrgs()];
                case 27:
                    data = _c.sent();
                    if (!(data[0].id == 0 || data == null || data == undefined)) return [3, 28];
                    wsres.code = q.sess_code;
                    wsres.data = [];
                    wsres.error = "Ошибка добавления организации";
                    return [3, 30];
                case 28: return [4, orgs.selectOrgs()];
                case 29:
                    data = _c.sent();
                    wsres.code = q.sess_code;
                    wsres.data = data;
                    wsres.error = null;
                    _c.label = 30;
                case 30: return [3, 58];
                case 31:
                    jobs = new Jobs_titles_1.Jobs_titlesTable(q.args, q.sess_code);
                    return [4, jobs.selectJobs_title()];
                case 32:
                    data = _c.sent();
                    if (data.length > 0) {
                        wsres.code = q.sess_code;
                        wsres.error = null;
                        wsres.data = data;
                    }
                    else {
                        wsres.code = q.sess_code;
                        wsres.data = [],
                            wsres.error = 'У организации отсутствуют должности';
                    }
                    return [3, 58];
                case 33:
                    jobs = new Jobs_titles_1.Jobs_titlesTable(q.args, q.sess_code);
                    return [4, jobs.insertJobs_title()];
                case 34:
                    data = _c.sent();
                    if (!(data[0].id == 0 || data == null || data == undefined)) return [3, 35];
                    wsres.code = q.sess_code;
                    wsres.data = [];
                    wsres.error = "Ошибка добавления должности";
                    return [3, 37];
                case 35: return [4, jobs.selectJobs_title()];
                case 36:
                    data = _c.sent();
                    wsres.code = q.sess_code;
                    wsres.data = data;
                    wsres.error = null;
                    _c.label = 37;
                case 37: return [3, 58];
                case 38:
                    ut = new Users_1.UserTable(q.args, q.sess_code);
                    return [4, ut.insertUser()];
                case 39:
                    data = _c.sent();
                    if (data[0].id == 0 || data == null || data == undefined) {
                        wsres.code = q.sess_code;
                        wsres.data = [];
                        wsres.error = "Ошибка добавления пользователя";
                    }
                    else {
                        wsres.code = q.sess_code;
                        wsres.data = [];
                        wsres.error = null;
                    }
                    return [3, 58];
                case 40:
                    ut = new Users_1.UserTable(q.args, q.sess_code);
                    return [4, ut.selectAllUsers()];
                case 41:
                    data = _c.sent();
                    wsres.code = q.sess_code;
                    wsres.data = data;
                    wsres.error = '';
                    return [3, 58];
                case 42:
                    dg = new Devs_groups_1.Devs_groupsTable(q.args, q.sess_code);
                    return [4, dg.insertDevsGroups()];
                case 43:
                    data = _c.sent();
                    if (!(data[0].id == 0 || data == null || data == undefined)) return [3, 44];
                    wsres.code = q.sess_code;
                    wsres.data = [];
                    wsres.error = "Ошибка добавления группы";
                    return [3, 46];
                case 44: return [4, dg.selectDevsGroups()];
                case 45:
                    data = _c.sent();
                    wsres.code = q.sess_code;
                    wsres.error = null;
                    _c.label = 46;
                case 46: return [3, 58];
                case 47:
                    dg = new Devs_groups_1.Devs_groupsTable(q.args, q.sess_code);
                    return [4, dg.selectDevsGroups()];
                case 48:
                    data = _c.sent();
                    wsres.code = q.sess_code;
                    wsres.error = null;
                    wsres.data = [data];
                    return [3, 58];
                case 49:
                    dg = new Devs_groups_1.Devs_groupsTable(q.args, q.sess_code);
                    return [4, dg.updateDevsGroups()];
                case 50:
                    data = _c.sent();
                    wsres.code = q.sess_code;
                    wsres.error = null;
                    wsres.data = [];
                    return [3, 58];
                case 51:
                    dev = new Devs_1.DevsTable(q.args, q.sess_code);
                    return [4, dev.insertDevs()];
                case 52:
                    data = _c.sent();
                    if (data === null || data === undefined || data[0].id === 0) {
                        wsres.code = q.sess_code;
                        wsres.data = [];
                        wsres.error = "Ошибка добавления устройства";
                    }
                    else {
                        wsres.code = q.sess_code;
                        wsres.data = [];
                        wsres.error = null;
                    }
                    return [3, 58];
                case 53:
                    {
                        dev = new Devs_1.DevsTable(q.args, q.sess_code);
                        dev.updateDevs();
                        wsres.error = null;
                        wsres.code = q.sess_code;
                        wsres.data = [];
                    }
                    return [3, 58];
                case 54:
                    dev_sess = new Dev_sess_1.Dev_sessTable(q.args, q.sess_code);
                    return [4, dev_sess.selectDevSess()];
                case 55:
                    data = _c.sent();
                    wsres.error = null;
                    wsres.code = q.sess_code;
                    console.log(data);
                    wsres.data = [data];
                    return [3, 58];
                case 56:
                    {
                        st = new Sessions_1.SessionsTable(q.args);
                        st.deleteSess();
                        wsres.code = '';
                        wsres.data = [];
                    }
                    return [3, 58];
                case 57:
                    {
                        wsres.error = "\u041A\u043E\u043C\u0430\u043D\u0434\u0430 \"".concat(q.cmd, "\" \u043D\u0435 \u0440\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u043D\u0430");
                    }
                    return [3, 58];
                case 58:
                    _ws.send((0, WSQuery_1.WSStr)(wsres));
                    return [2];
            }
        });
    });
}
exports.WSRoute = WSRoute;
//# sourceMappingURL=WSRouter.js.map