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
exports.__esModule = true;
exports.ThermalWellTable = exports.ThermalWellEntity = void 0;
var DBase_1 = require("./DBase");
var DateStr_1 = require("../../xcore/dbase/DateStr");
var ThermalWellEntity = (function () {
    function ThermalWellEntity() {
        this.id = 0;
        this.number = '';
        this.org_id = 0;
        this.group_id = 0;
        this.dev_id = 0;
        this.created_at = new Date(Date.now());
        this.info = '';
    }
    ;
    return ThermalWellEntity;
}());
exports.ThermalWellEntity = ThermalWellEntity;
var ThermalWellTable = (function () {
    function ThermalWellTable(_args, _sess_code) {
        this.db = (0, DBase_1.getDB)();
        this.args = _args;
        this.sess_code = _sess_code;
    }
    ThermalWellTable.prototype.insertThermalWell = function () {
        return __awaiter(this, void 0, void 0, function () {
            var db_res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.db.query("INSERT INTO skvazhiny(number, org_id, group_id, dev_id, create_at) " +
                            "VALUES(\'" + this.args.number + "\'," + this.args.org_id + "," + this.args.group_id + "," + this.args.dev_id + ",\'" + (0, DateStr_1.dateTimeToSQL)(new Date(Date.now())) + "\') RETURNING  id")];
                    case 1:
                        db_res = _a.sent();
                        return [2, db_res.rows[0].id];
                }
            });
        });
    };
    ThermalWellTable.prototype.selectThermalWell = function () {
        return __awaiter(this, void 0, void 0, function () {
            var db_res, result, p;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.db.query("SELECT * FROM skvazhiny")];
                    case 1:
                        db_res = _a.sent();
                        result = new Array();
                        for (p in db_res.rows) {
                            result.push(db_res.rows[p]);
                        }
                        return [2, result];
                }
            });
        });
    };
    ThermalWellTable.prototype.updateThermalWell = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.db.query("SELECT * FROM skvazhiny WHERE id = " + this.args.id)];
                    case 1:
                        data = _a.sent();
                        if (!(data.rows[0] === undefined || data.rows[0].id === this.args.id)) return [3, 2];
                        return [2, false];
                    case 2: return [4, this.db.query("UPDATE skvazhiny SET dev_id =" + this.args.dev_id + ", number = '" + this.args.number + "', group_id = " + this.args.group_id +
                            ", org_id = " + this.args.org_id + " WHERE id = " + this.args.id)];
                    case 3:
                        _a.sent();
                        return [2, true];
                }
            });
        });
    };
    return ThermalWellTable;
}());
exports.ThermalWellTable = ThermalWellTable;
//# sourceMappingURL=ThermalWell.js.map