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
var DBase_1 = require("../xcore/dbase/DBase");
var DateStr_1 = require("../xcore/dbase/DateStr");
var users_1 = require("./sql/users");
var orgs_1 = require("./sql/orgs");
var jobs_titles_1 = require("./sql/jobs_titles");
var users_roles_1 = require("./sql/users_roles");
var sessions_1 = require("./sql/sessions");
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var db, dt;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    db = (0, DBase_1.getDB)();
                    return [4, db.NOW()];
                case 1:
                    dt = _a.sent();
                    console.log("START INSTALLER", (0, DateStr_1.dateTimeToStr)(dt));
                    console.log("ADDING TABLE \"orgs\"");
                    return [4, db.query(orgs_1.orgs_table.sql)];
                case 2:
                    _a.sent();
                    console.log("TABLE \"orgs\" ADD");
                    console.log("ADDING TABLE \"jobs_titles\"");
                    return [4, db.query(jobs_titles_1.jobs_titles_table.sql)];
                case 3:
                    _a.sent();
                    console.log("TABLE \"jobs_titles\" ADD");
                    console.log("ADDING TABLE \"users_roles\"");
                    return [4, db.query(users_roles_1.users_roles_table.sql)];
                case 4:
                    _a.sent();
                    console.log("TABLE \"users_roles\" ADD");
                    console.log("ADDING TABLE \"sessions\"");
                    return [4, db.query(sessions_1.sessions_table.sql)];
                case 5:
                    _a.sent();
                    console.log("TABLE \"sessions\" ADD");
                    console.log("ADDING TABLE \"users\"");
                    return [4, db.query(users_1.users_table.sql, users_1.users_table.args)];
                case 6:
                    _a.sent();
                    console.log("TABLE \"users\" ADD");
                    console.log("CREATE ROLE");
                    return [4, db.query(users_roles_1.insert_role.sql, users_roles_1.insert_role.args)];
                case 7:
                    _a.sent();
                    console.log("CREATE ORG");
                    return [4, db.query(orgs_1.org_insert_admin.sql, orgs_1.org_insert_admin.args)];
                case 8:
                    _a.sent();
                    console.log("CREATE JOB_TITLE");
                    return [4, db.query(jobs_titles_1.insert_jt_admin.sql, jobs_titles_1.insert_jt_admin.args)];
                case 9:
                    _a.sent();
                    console.log("CREATE USER");
                    return [4, db.query(users_1.insert_admin.sql, users_1.insert_admin.args)];
                case 10:
                    _a.sent();
                    (0, DBase_1.endDB)();
                    console.log("END INSTALLER");
                    return [2];
            }
        });
    });
}
run();
//# sourceMappingURL=main.js.map