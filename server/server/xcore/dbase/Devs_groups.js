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
exports.Devs_groupsTable = exports.Devs_groupsEntity = void 0;
var DBase_1 = require("./DBase");
var Devs_groupsEntity = (function () {
    function Devs_groupsEntity() {
        this.id = 0;
        this.parent_id = 0;
        this.g_name = '';
        this.latitude = '';
        this.longitude = '';
        this.org_id = 0;
        this.org_num = 0;
        this.deleted = false;
        this.g_info = '';
    }
    return Devs_groupsEntity;
}());
exports.Devs_groupsEntity = Devs_groupsEntity;
var Devs_groupsTable = (function () {
    function Devs_groupsTable(_args, _sess_code) {
        this.db = (0, DBase_1.getDB)();
        this.args = _args;
        this.sess_code = _sess_code;
    }
    Devs_groupsTable.prototype.insertDevsGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var db_res, result, p;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.db.query("SELECT AddDevs_Group(CAST ('" + this.args.parent_id + "' AS BIGINT), " +
                            "CAST('" + this.args.g_name + "' AS VARCHAR(250))," +
                            "CAST('" + this.args.latitude + "' AS VARCHAR(60)), " +
                            "CAST('" + this.args.longitude + "' AS VARCHAR(60)), " +
                            "CAST('" + this.args.org_id + "' AS BIGINT), " +
                            "CAST('" + this.args.ord_num + "' AS INTEGER), " +
                            "CAST('" + this.args.deleted + "' AS BOOLEAN), " +
                            "CAST('" + this.args.g_info + "' AS TEXT)) AS id")];
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
    Devs_groupsTable.prototype.selectDevsGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var groups, d, roots_gr, _a, _b, _c, _i, i, _d, _e, roots_gr, _f, _g, _h, _j, i, _k, _l, _m, _o, _p, _q, i, _r, result;
            var _s, _t;
            return __generator(this, function (_u) {
                switch (_u.label) {
                    case 0:
                        groups = {
                            group: {},
                            id: 0,
                            p_id: 0,
                            childs: new Array(),
                            devs: new Array(),
                            update: false
                        };
                        if (!(this.args.users_w === true)) return [3, 7];
                        return [4, this.db.query("SELECT * FROM devs_groups WHERE parent_id=0 ")];
                    case 1:
                        roots_gr = _u.sent();
                        _a = roots_gr.rows;
                        _b = [];
                        for (_c in _a)
                            _b.push(_c);
                        _i = 0;
                        _u.label = 2;
                    case 2:
                        if (!(_i < _b.length)) return [3, 6];
                        _c = _b[_i];
                        if (!(_c in _a)) return [3, 5];
                        i = _c;
                        _e = (_d = groups.childs).push;
                        _s = {
                            group: roots_gr.rows[i],
                            id: roots_gr.rows[i].id,
                            p_id: roots_gr.rows[i].parent_id,
                            childs: new Array()
                        };
                        return [4, this.db.query("SELECT * FROM devs WHERE group_dev_id = " + roots_gr.rows[i].id)];
                    case 3: return [4, (_u.sent()).rows];
                    case 4:
                        _e.apply(_d, [(_s.devs = _u.sent(),
                                _s.update = false,
                                _s)]);
                        _u.label = 5;
                    case 5:
                        _i++;
                        return [3, 2];
                    case 6: return [3, 13];
                    case 7: return [4, this.db.query("SELECT * FROM devs_groups WHERE parent_id=0 and org_id=" + this.args.org_id)];
                    case 8:
                        roots_gr = _u.sent();
                        _f = roots_gr.rows;
                        _g = [];
                        for (_h in _f)
                            _g.push(_h);
                        _j = 0;
                        _u.label = 9;
                    case 9:
                        if (!(_j < _g.length)) return [3, 13];
                        _h = _g[_j];
                        if (!(_h in _f)) return [3, 12];
                        i = _h;
                        _l = (_k = groups.childs).push;
                        _t = {
                            group: roots_gr.rows[i],
                            id: roots_gr.rows[i].id,
                            p_id: roots_gr.rows[i].parent_id,
                            childs: new Array()
                        };
                        return [4, this.db.query("SELECT * FROM devs WHERE group_dev_id = " + roots_gr.rows[i].id)];
                    case 10: return [4, (_u.sent()).rows];
                    case 11:
                        _l.apply(_k, [(_t.devs = _u.sent(),
                                _t.update = false,
                                _t)]);
                        _u.label = 12;
                    case 12:
                        _j++;
                        return [3, 9];
                    case 13:
                        _m = groups.childs;
                        _o = [];
                        for (_p in _m)
                            _o.push(_p);
                        _q = 0;
                        _u.label = 14;
                    case 14:
                        if (!(_q < _o.length)) return [3, 17];
                        _p = _o[_q];
                        if (!(_p in _m)) return [3, 16];
                        i = _p;
                        _r = groups.childs[i];
                        return [4, this._d_tree(groups.childs[i])];
                    case 15:
                        _r.childs = _u.sent();
                        _u.label = 16;
                    case 16:
                        _q++;
                        return [3, 14];
                    case 17:
                        result = this.objToString(groups);
                        return [2, result];
                }
            });
        });
    };
    Devs_groupsTable.prototype._d_tree = function (childs) {
        return __awaiter(this, void 0, void 0, function () {
            var d, reti, grs, _a, _b, _c, _i, i, _d, _e;
            var _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        reti = new Array();
                        return [4, this.db.query("SELECT * FROM devs_groups WHERE parent_id=" + childs.id)];
                    case 1:
                        grs = _g.sent();
                        _a = grs.rows;
                        _b = [];
                        for (_c in _a)
                            _b.push(_c);
                        _i = 0;
                        _g.label = 2;
                    case 2:
                        if (!(_i < _b.length)) return [3, 7];
                        _c = _b[_i];
                        if (!(_c in _a)) return [3, 6];
                        i = _c;
                        _e = (_d = reti).push;
                        _f = {
                            group: grs.rows[i],
                            id: grs.rows[i].id,
                            pid: grs.rows[i].parent_id
                        };
                        return [4, this._d_tree(grs.rows[i])];
                    case 3:
                        _f.childs = _g.sent();
                        return [4, this.db.query("SELECT * FROM devs WHERE group_dev_id=" + grs.rows[i].id)];
                    case 4: return [4, (_g.sent()).rows];
                    case 5:
                        _e.apply(_d, [(_f.devs = _g.sent(),
                                _f.updated = false,
                                _f)]);
                        _g.label = 6;
                    case 6:
                        _i++;
                        return [3, 2];
                    case 7: return [2, reti];
                }
            });
        });
    };
    Devs_groupsTable.prototype.objToString = function (obj, isArray) {
        var isArray = isArray || false;
        var sstr = "";
        if (isArray) {
            sstr += "[";
        }
        else {
            sstr += "{";
        }
        var first = true;
        for (var k in obj) {
            if (typeof obj[k] == 'function')
                continue;
            if (first) {
                first = false;
            }
            else {
                sstr += ',';
            }
            if (!isArray) {
                sstr += "\"".concat(k, "\":");
            }
            if (obj[k] === null) {
                sstr += 'null';
            }
            else if (Array.isArray(obj[k])) {
                sstr += this.objToString(obj[k], true);
            }
            else if ('object' == typeof obj[k]) {
                sstr += this.objToString(obj[k], false);
            }
            else if ('undefined' == typeof obj[k]) {
                sstr += 'null';
            }
            else if ('string' == typeof obj[k]) {
                sstr += "\"".concat(this.escStr(obj[k]), "\"");
            }
            else {
                sstr += obj[k];
            }
        }
        if (isArray) {
            sstr += "]";
        }
        else {
            sstr += "}";
        }
        return sstr;
    };
    Devs_groupsTable.prototype.escStr = function (str) {
        var reti = str.replace(/[\\]/g, "\\\\");
        reti = reti.replace(/["]/g, '\\"');
        return reti;
    };
    return Devs_groupsTable;
}());
exports.Devs_groupsTable = Devs_groupsTable;
//# sourceMappingURL=Devs_groups.js.map