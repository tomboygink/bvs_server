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
            var groups, roots_gr, _a, _b, _c, _i, i, dev, roots_gr, _d, _e, _f, _g, i, dev, _h, _j, _k, _l, i, _m;
            return __generator(this, function (_o) {
                switch (_o.label) {
                    case 0:
                        groups = {
                            group: {},
                            id: 0,
                            p_id: 0,
                            childs: new Array(),
                            devs: new Array(),
                            update: false
                        };
                        if (!(this.args.users_w === true)) return [3, 6];
                        return [4, this.db.query("SELECT * FROM devs_groups WHERE parent_id=0 ")];
                    case 1:
                        roots_gr = _o.sent();
                        _a = roots_gr.rows;
                        _b = [];
                        for (_c in _a)
                            _b.push(_c);
                        _i = 0;
                        _o.label = 2;
                    case 2:
                        if (!(_i < _b.length)) return [3, 5];
                        _c = _b[_i];
                        if (!(_c in _a)) return [3, 4];
                        i = _c;
                        return [4, this.db.query("SELECT * FROM devs WHERE group_dev_id = " + roots_gr.rows[i].id)];
                    case 3:
                        dev = _o.sent();
                        groups.childs.push({
                            group: roots_gr.rows[i],
                            id: roots_gr.rows[i].id,
                            p_id: roots_gr.rows[i].parent_id,
                            childs: new Array(),
                            devs: dev.rows,
                            update: false
                        });
                        _o.label = 4;
                    case 4:
                        _i++;
                        return [3, 2];
                    case 5: return [3, 11];
                    case 6: return [4, this.db.query("SELECT * FROM devs_groups WHERE parent_id=0 and org_id=" + this.args.org_id)];
                    case 7:
                        roots_gr = _o.sent();
                        _d = roots_gr.rows;
                        _e = [];
                        for (_f in _d)
                            _e.push(_f);
                        _g = 0;
                        _o.label = 8;
                    case 8:
                        if (!(_g < _e.length)) return [3, 11];
                        _f = _e[_g];
                        if (!(_f in _d)) return [3, 10];
                        i = _f;
                        return [4, this.db.query("SELECT * FROM devs WHERE group_dev_id = " + roots_gr.rows[i].id)];
                    case 9:
                        dev = _o.sent();
                        groups.childs.push({
                            group: roots_gr.rows[i],
                            id: roots_gr.rows[i].id,
                            p_id: roots_gr.rows[i].parent_id,
                            childs: new Array(),
                            devs: dev.rows,
                            update: false
                        });
                        _o.label = 10;
                    case 10:
                        _g++;
                        return [3, 8];
                    case 11:
                        _h = groups.childs;
                        _j = [];
                        for (_k in _h)
                            _j.push(_k);
                        _l = 0;
                        _o.label = 12;
                    case 12:
                        if (!(_l < _j.length)) return [3, 15];
                        _k = _j[_l];
                        if (!(_k in _h)) return [3, 14];
                        i = _k;
                        _m = groups.childs[i];
                        return [4, this._d_tree(groups.childs[i])];
                    case 13:
                        _m.childs = _o.sent();
                        _o.label = 14;
                    case 14:
                        _l++;
                        return [3, 12];
                    case 15: return [2, JSON.stringify(groups)];
                }
            });
        });
    };
    Devs_groupsTable.prototype._d_tree = function (childs) {
        return __awaiter(this, void 0, void 0, function () {
            var reti, grs, _a, _b, _c, _i, i, _d, _e;
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
                        if (!(_i < _b.length)) return [3, 6];
                        _c = _b[_i];
                        if (!(_c in _a)) return [3, 5];
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
                    case 4:
                        _e.apply(_d, [(_f.devs = _g.sent(),
                                _f.updated = false,
                                _f)]);
                        _g.label = 5;
                    case 5:
                        _i++;
                        return [3, 2];
                    case 6: return [2, reti];
                }
            });
        });
    };
    return Devs_groupsTable;
}());
exports.Devs_groupsTable = Devs_groupsTable;
//# sourceMappingURL=Devs_groups.js.map