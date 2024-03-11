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
exports.router = void 0;
var crypto_1 = __importDefault(require("crypto"));
var config_1 = require("../xcore/config");
var Users_1 = require("../xcore/dbase/Users");
var Sessions_1 = require("../xcore/dbase/Sessions");
var Orgs_1 = require("../xcore/dbase/Orgs");
var Jobs_titles_1 = require("../xcore/dbase/Jobs_titles");
var Devs_groups_1 = require("../xcore/dbase/Devs_groups");
var Devs_1 = require("../xcore/dbase/Devs");
var Dev_Povs_1 = require("../xcore/dbase/Dev_Povs");
var Control_dev_sess_1 = require("../xcore/dbase/Control_dev_sess");
var Dev_sess_1 = require("../xcore/dbase/Dev_sess");
var SchemeSvg_1 = require("../xcore/dbase/SchemeSvg");
var sendMail_1 = require("../xcore/mailer/sendMail");
var Scheme_Thermostreamer_Svg_1 = require("../xcore/dbase/Scheme_Thermostreamer_Svg");
var res = {
    cmd: '',
    error: '',
    data: [],
    code: ''
};
function router(body) {
    return __awaiter(this, void 0, void 0, function () {
        var sess_code, data, _a, ut, st, st, ut, code, old_pass, pass, sendMail, _b, orgs, orgs, orgs, jobs, jobs, jobs, ut, ut, dg, dg, dg, dev, dev_povs, dev_povs, control_dev, deleteControlDevSess, dev, fl_sess, dev_sess, schemeSvg, schemeThermoStreamerSvg;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    sess_code = null;
                    data = null;
                    _a = body.cmd;
                    switch (_a) {
                        case 'get_UserByAuth': return [3, 1];
                        case 'get_UserBySessionCode': return [3, 4];
                        case 'set_CUserData': return [3, 7];
                        case 'set_ChangePass': return [3, 9];
                        case 'set_ActMail': return [3, 12];
                        case 'set_MailCode': return [3, 13];
                        case 'set_ForgPass': return [3, 18];
                        case 'set_SaveNewPass': return [3, 20];
                        case 'set_ChangeUser': return [3, 22];
                        case 'get_Org': return [3, 24];
                        case 'set_NewOrg': return [3, 26];
                        case 'set_ChangeOrg': return [3, 31];
                        case 'get_Jobs': return [3, 32];
                        case 'set_NewJobTitle': return [3, 34];
                        case 'set_ChangeJobs_Titles': return [3, 39];
                        case 'set_NewUser': return [3, 40];
                        case 'get_AllUser': return [3, 42];
                        case 'set_NewDevGroup': return [3, 44];
                        case 'get_DevsGroups': return [3, 49];
                        case 'set_ChangeDevsGroups': return [3, 51];
                        case 'set_NewDevs': return [3, 53];
                        case 'set_NewDevPovs': return [3, 56];
                        case 'get_DevPovs': return [3, 58];
                        case 'set_NewControlDevSess': return [3, 60];
                        case 'deleteControlDevSess': return [3, 62];
                        case 'set_ChangeDevs': return [3, 63];
                        case 'get_DevFirstLastSessions': return [3, 65];
                        case 'get_DevSessions': return [3, 67];
                        case 'set_SchemeSvg': return [3, 69];
                        case 'set_ThermoStreamer_Svg': return [3, 71];
                        case 'deleteCookie': return [3, 73];
                    }
                    return [3, 74];
                case 1:
                    ut = new Users_1.UserTable(body.args, body.sess_code);
                    st = new Sessions_1.SessionsTable(body.args);
                    return [4, st.insertSess()];
                case 2:
                    sess_code = _c.sent();
                    return [4, ut.selectUser()];
                case 3:
                    data = _c.sent();
                    if (sess_code === '' && data[0] === undefined) {
                        res.cmd = body.cmd;
                        res.code = null;
                        res.data = null;
                        res.error = "Пользователя не существует или введены не верные данные;";
                    }
                    else {
                        res.cmd = body.cmd;
                        res.code = sess_code;
                        res.error = null;
                        res.data = data;
                    }
                    return [3, 75];
                case 4:
                    st = new Sessions_1.SessionsTable(body.args);
                    ut = new Users_1.UserTable(body.args, body.sess_code);
                    return [4, st.selectSessCode()];
                case 5:
                    code = _c.sent();
                    return [4, ut.selectUserBySessCode()];
                case 6:
                    data = _c.sent();
                    if (code[0] == undefined) {
                        res.cmd = body.cmd;
                        res.code = null;
                        res.data = null;
                        res.error = "Данного кода сессии не существует";
                    }
                    else {
                        res.cmd = body.cmd;
                        res.code = code[0].sess_code;
                        res.error = null;
                        res.data = data;
                    }
                    return [3, 75];
                case 7:
                    ut = new Users_1.UserTable(body.args, body.sess_code);
                    return [4, ut.updateUser()];
                case 8:
                    data = _c.sent();
                    if (data[0] === undefined) {
                        res.cmd = body.cmd;
                        res.code = null;
                        res.data = null;
                        res.error = "Пользователя не существует";
                    }
                    else {
                        res.cmd = body.cmd;
                        res.code = body.sess_code;
                        res.data = data;
                        res.error = null;
                    }
                    return [3, 75];
                case 9:
                    ut = new Users_1.UserTable(body.args, body.sess_code);
                    return [4, ut.selectUserLoginEmail()];
                case 10:
                    data = _c.sent();
                    old_pass = crypto_1["default"].createHmac('sha256', config_1.CONFIG.key_code).update(body.args.old_password).digest('hex');
                    pass = crypto_1["default"].createHmac('sha256', config_1.CONFIG.key_code).update(body.args.new_password).digest('hex');
                    if (data[0].password === pass) {
                        res.cmd = body.cmd;
                        res.code = body.sess_code;
                        res.data = null;
                        res.error = "Новый пароль не должен повторять старый";
                        return [3, 75];
                    }
                    if (body.args.login === body.args.new_password) {
                        res.cmd = body.cmd;
                        res.code = body.sess_code;
                        res.data = null;
                        res.error = "Пароль не должен совпадать с логином";
                        return [3, 75];
                    }
                    if (data[0].password !== old_pass) {
                        res.cmd = body.cmd;
                        res.code = body.sess_code;
                        res.data = null;
                        res.error = "Старый пароль не верен";
                        return [3, 75];
                    }
                    return [4, ut.changePass()];
                case 11:
                    data = _c.sent();
                    res.cmd = body.cmd;
                    res.code = body.sess_code;
                    res.data = data;
                    res.error = null;
                    return [3, 75];
                case 12:
                    {
                        if (body.args.email !== '') {
                            sendMail = new sendMail_1.SendMail(body.args, body.sess_code);
                            sendMail.sendConfirmMail();
                        }
                        else {
                            res.cmd = body.cmd;
                            res.code = body.sess_code;
                            res.data = null;
                            res.error = "Введите email";
                        }
                    }
                    return [3, 75];
                case 13:
                    ut = new Users_1.UserTable(body.args, body.sess_code);
                    return [4, ut.updateMail()];
                case 14:
                    data = _c.sent();
                    if (!(data[0] === undefined)) return [3, 15];
                    res.cmd = body.cmd;
                    res.code = body.sess_code;
                    res.data = null;
                    res.error = "Введен неверный код";
                    return [3, 17];
                case 15:
                    res.cmd = body.cmd;
                    res.code = body.sess_code;
                    _b = res;
                    return [4, ut.updateMail()];
                case 16:
                    _b.data = _c.sent();
                    res.error = null;
                    _c.label = 17;
                case 17: return [3, 75];
                case 18:
                    ut = new Users_1.UserTable(body.args, body.sess_code);
                    sendMail = new sendMail_1.SendMail(body.args, body.sess_code);
                    return [4, ut.selectUserLoginEmail()];
                case 19:
                    data = _c.sent();
                    if (data[0] == undefined) {
                        res.cmd = body.cmd;
                        res.code = body.sess_code;
                        res.data = null;
                        res.error = "Такого email не существует, проверте введенные данные или обратитесть к администратору системы";
                    }
                    else {
                        if (data[0].act_mail === true) {
                            sendMail.sendRePassword();
                        }
                        else {
                            res.cmd = body.cmd;
                            res.code = body.sess_code;
                            res.data = null;
                            res.error = "Данный email не был подтвержден, обращайтесь к администратору системы";
                        }
                    }
                    return [3, 75];
                case 20:
                    ut = new Users_1.UserTable(body.args, body.sess_code);
                    return [4, ut.selectUserLoginEmail()];
                case 21:
                    data = _c.sent();
                    if (body.args.code !== data[0].re_password_code) {
                        res.cmd = body.cmd;
                        res.code = body.sess_code;
                        res.data = null;
                        res.error = "Код подтверждения неверен, проверте правильность введеного кода";
                    }
                    else {
                        ut = new Users_1.UserTable(body.args, body.sess_code);
                        ut.forgPass();
                    }
                    return [3, 75];
                case 22:
                    ut = new Users_1.UserTable(body.args, body.sess_code);
                    return [4, ut.updateUserAdmin()];
                case 23:
                    _c.sent();
                    return [3, 75];
                case 24:
                    orgs = new Orgs_1.OrgsTable(body.args, body.sess_code);
                    return [4, orgs.selectOrgs()];
                case 25:
                    data = _c.sent();
                    if (data.length > 0) {
                        res.cmd = body.cmd;
                        res.code = body.sess_code;
                        res.data = data;
                        res.error = null;
                    }
                    else {
                        res.cmd = body.cmd;
                        res.code = body.sess_code;
                        res.data = null;
                        res.error = "Организации отсутвуют";
                    }
                    return [3, 75];
                case 26:
                    orgs = new Orgs_1.OrgsTable(body.args, body.sess_code);
                    return [4, orgs.insertOrgs()];
                case 27:
                    data = _c.sent();
                    if (!(data[0].id == 0 || data == null || data == undefined)) return [3, 28];
                    res.cmd = body.cmd;
                    res.code = body.sess_code;
                    res.data = null;
                    res.error = "Ошибка добавления организации";
                    return [3, 30];
                case 28: return [4, orgs.selectOrgs()];
                case 29:
                    data = _c.sent();
                    res.cmd = body.cmd;
                    res.code = body.sess_code;
                    res.data = data;
                    res.error = null;
                    _c.label = 30;
                case 30: return [3, 75];
                case 31:
                    {
                        orgs = new Orgs_1.OrgsTable(body.args, body.sess_code);
                        orgs.updateOrgs();
                        res.cmd = body.cmd;
                        res.code = body.sess_code;
                        res.data = null;
                        res.error = null;
                    }
                    return [3, 75];
                case 32:
                    jobs = new Jobs_titles_1.Jobs_titlesTable(body.args, body.sess_code);
                    return [4, jobs.selectJobs_title()];
                case 33:
                    data = _c.sent();
                    if (data.length > 0) {
                        res.cmd = body.cmd;
                        res.code = body.sess_code;
                        res.data = data;
                        res.error = null;
                    }
                    else {
                        res.cmd = body.cmd;
                        res.code = body.sess_code;
                        res.data = null;
                        res.error = "У организации отсутствуют должности";
                    }
                    return [3, 75];
                case 34:
                    jobs = new Jobs_titles_1.Jobs_titlesTable(body.args, body.sess_code);
                    return [4, jobs.insertJobs_title()];
                case 35:
                    data = _c.sent();
                    if (!(data[0].id == 0 || data == null || data == undefined)) return [3, 36];
                    res.cmd = body.cmd;
                    res.code = body.sess_code;
                    res.data = null;
                    res.error = "Ошибка добавления должности";
                    return [3, 38];
                case 36: return [4, jobs.selectJobs_title()];
                case 37:
                    data = _c.sent();
                    res.cmd = body.cmd;
                    res.code = body.sess_code;
                    res.data = data;
                    res.error = null;
                    _c.label = 38;
                case 38: return [3, 75];
                case 39:
                    {
                        jobs = new Jobs_titles_1.Jobs_titlesTable(body.args, body.sess_code);
                        jobs.updateJobs_title();
                        res.cmd = body.cmd;
                        res.code = body.sess_code;
                        res.data = null;
                        res.error = null;
                    }
                    return [3, 75];
                case 40:
                    ut = new Users_1.UserTable(body.args, body.sess_code);
                    return [4, ut.insertUser()];
                case 41:
                    data = _c.sent();
                    if (data[0].id == 0 || data == null || data == undefined) {
                        res.cmd = body.cmd;
                        res.code = body.sess_code;
                        res.data = null;
                        res.error = "Ошибка добавления пользователя";
                    }
                    else {
                        res.cmd = body.cmd;
                        res.code = body.sess_code;
                        res.data = null;
                        res.error = null;
                    }
                    return [3, 75];
                case 42:
                    ut = new Users_1.UserTable(body.args, body.sess_code);
                    return [4, ut.selectAllUsers()];
                case 43:
                    data = _c.sent();
                    res.cmd = body.cmd;
                    res.code = body.sess_code;
                    res.data = data;
                    res.error = null;
                    return [3, 75];
                case 44:
                    dg = new Devs_groups_1.Devs_groupsTable(body.args, body.sess_code);
                    return [4, dg.insertDevsGroups()];
                case 45:
                    data = _c.sent();
                    if (!(data[0].id == 0 || data == null || data == undefined)) return [3, 46];
                    res.cmd = body.cmd;
                    res.code = body.sess_code;
                    res.data = null;
                    res.error = "Ошибка добавления группы";
                    return [3, 48];
                case 46: return [4, dg.selectDevsGroups()];
                case 47:
                    data = _c.sent();
                    res.cmd = body.cmd;
                    res.code = body.sess_code;
                    res.data = null;
                    res.error = null;
                    _c.label = 48;
                case 48: return [3, 75];
                case 49:
                    dg = new Devs_groups_1.Devs_groupsTable(body.args, body.sess_code);
                    return [4, dg.selectDevsGroups()];
                case 50:
                    data = _c.sent();
                    res.cmd = body.cmd;
                    res.code = body.sess_code;
                    res.data = data;
                    res.error = null;
                    return [3, 75];
                case 51:
                    dg = new Devs_groups_1.Devs_groupsTable(body.args, body.sess_code);
                    return [4, dg.updateDevsGroups()];
                case 52:
                    data = _c.sent();
                    res.cmd = body.cmd;
                    res.code = body.sess_code;
                    res.data = null;
                    res.error = null;
                    return [3, 75];
                case 53:
                    dev = new Devs_1.DevsTable(body.args, body.sess_code);
                    return [4, dev.insertDevs()];
                case 54:
                    data = _c.sent();
                    return [4, dev.delete_duplicate()];
                case 55:
                    _c.sent();
                    if (data === null || data[0] === undefined) {
                        res.cmd = body.cmd;
                        res.code = body.sess_code;
                        res.data = null;
                        res.error = "Ошибка добавления устройства";
                    }
                    else {
                        res.cmd = body.cmd;
                        res.code = body.sess_code;
                        res.data = null;
                        res.error = null;
                    }
                    return [3, 75];
                case 56:
                    dev_povs = new Dev_Povs_1.Dev_povsTable(body.args, body.sess_code);
                    return [4, dev_povs.insertDev_povs()];
                case 57:
                    data = _c.sent();
                    if (data === null || data === undefined || data[0].id === 0) {
                        res.cmd = body.cmd;
                        res.code = body.sess_code;
                        res.data = null;
                        res.error = "Ошибка добавления поверочного интервала";
                    }
                    else {
                        res.cmd = body.cmd;
                        res.code = body.sess_code;
                        res.data = null;
                        res.error = null;
                    }
                    return [3, 75];
                case 58:
                    dev_povs = new Dev_Povs_1.Dev_povsTable(body.args, body.sess_code);
                    return [4, dev_povs.selectDev_povs()];
                case 59:
                    data = _c.sent();
                    res.cmd = body.cmd;
                    res.code = body.sess_code;
                    res.data = data;
                    res.error = null;
                    return [3, 75];
                case 60:
                    control_dev = new Control_dev_sess_1.Control_dev_sessTable(body.args, body.sess_code);
                    return [4, control_dev.insertControl_dev_sess()];
                case 61:
                    data = _c.sent();
                    if (data === null || data === undefined || data[0].id === 0) {
                        res.cmd = body.cmd;
                        res.code = body.sess_code;
                        res.data = null;
                        res.error = "Ошибка добавления контрольной сессии";
                    }
                    else {
                        res.cmd = body.cmd;
                        res.code = body.sess_code;
                        res.data = body.args.dev_sess_id;
                        res.error = null;
                    }
                    return [3, 75];
                case 62:
                    {
                        deleteControlDevSess = new Control_dev_sess_1.Control_dev_sessTable(body.args, body.sess_code);
                        deleteControlDevSess.deleteControl_dev_sess();
                        res.cmd = body.cmd;
                        res.code = body.sess_code;
                        res.data = null;
                        res.error = null;
                    }
                    return [3, 75];
                case 63:
                    dev = new Devs_1.DevsTable(body.args, body.sess_code);
                    return [4, dev.updateDevs()];
                case 64:
                    data = _c.sent();
                    if (data === true) {
                        res.cmd = body.cmd;
                        res.code = body.sess_code;
                        res.data = null;
                        res.error = null;
                    }
                    else {
                        res.cmd = body.cmd;
                        res.code = body.sess_code;
                        res.data = null;
                        res.error = "Произошла ошибка редактирования";
                    }
                    return [3, 75];
                case 65:
                    fl_sess = new Dev_sess_1.Dev_sessTable(body.args, body.sess_code);
                    return [4, fl_sess.selectFirstLastSess()];
                case 66:
                    data = _c.sent();
                    res.cmd = body.cmd;
                    res.code = body.sess_code;
                    res.data = data;
                    res.error = null;
                    return [3, 75];
                case 67:
                    dev_sess = new Dev_sess_1.Dev_sessTable(body.args, body.sess_code);
                    return [4, dev_sess.selectDevSess()];
                case 68:
                    data = _c.sent();
                    res.cmd = body.cmd;
                    res.code = body.sess_code;
                    res.data = data;
                    res.error = null;
                    return [3, 75];
                case 69:
                    schemeSvg = new SchemeSvg_1.SchemeSvgTable(body.args);
                    return [4, schemeSvg.insertSchemeSVG()];
                case 70:
                    _c.sent();
                    res.cmd = body.cmd;
                    res.code = body.sess_code;
                    res.data = null;
                    res.error = null;
                    return [3, 75];
                case 71:
                    schemeThermoStreamerSvg = new Scheme_Thermostreamer_Svg_1.SchemeThermoStreamerSvgTable(body.args);
                    return [4, schemeThermoStreamerSvg.insertSchemeThermoStreamerSVG()];
                case 72:
                    _c.sent();
                    res.cmd = body.cmd;
                    res.code = body.sess_code;
                    res.data = null;
                    res.error = null;
                    return [3, 75];
                case 73:
                    {
                        st = new Sessions_1.SessionsTable(body.args);
                        st.deleteSess();
                        res.cmd = body.cmd;
                        res.code = '';
                        res.data = null;
                        res.error = null;
                    }
                    return [3, 75];
                case 74:
                    {
                        res.cmd = body.cmd;
                        res.code = null;
                        res.data = null;
                        res.error = "\u041A\u043E\u043C\u0430\u043D\u0434\u0430 \"".concat(body.cmd, "\" \u043D\u0435 \u0440\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u043D\u0430");
                    }
                    return [3, 75];
                case 75: return [2, JSON.stringify(res)];
            }
        });
    });
}
exports.router = router;
//# sourceMappingURL=router.js.map