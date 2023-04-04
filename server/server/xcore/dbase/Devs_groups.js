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
            var groups, test, dev, roots_gr, _a, _b, _c, _i, i, device, t, tzoffset, j, roots_gr, _d, _e, _f, _g, i, device, t, tzoffset, j, _h, _j, _k, _l, i, _m, result;
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
                        test = new Array;
                        dev = {
                            id: 0,
                            group_dev_id: '',
                            number: '',
                            name: '',
                            latitude: '',
                            longitude: '',
                            sensors: '',
                            deleted: false,
                            info: '',
                            time: ''
                        };
                        if (!(this.args.users_w === true)) return [3, 10];
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
                        if (!(_i < _b.length)) return [3, 9];
                        _c = _b[_i];
                        if (!(_c in _a)) return [3, 8];
                        i = _c;
                        return [4, this.db.query("SELECT devs.id, group_dev_id, number, " +
                                "name, latitude, longitude, sensors, deleted, info, MAX(time_srv) as time " +
                                "FROM devs INNER JOIN dev_sess ON devs.number = dev_sess.dev_number WHERE group_dev_id = " + roots_gr.rows[i].id + " group by devs.id")];
                    case 3: return [4, (_o.sent()).rows];
                    case 4:
                        device = _o.sent();
                        if (!(device[i] === undefined)) return [3, 7];
                        return [4, this.db.query("SELECT * FROM devs WHERE group_dev_id = " + roots_gr.rows[i].id)];
                    case 5: return [4, (_o.sent()).rows];
                    case 6:
                        device = _o.sent();
                        _o.label = 7;
                    case 7:
                        tzoffset = (new Date()).getTimezoneOffset() * 60000;
                        for (j in device) {
                            if (device[j].time === undefined) {
                                t = null;
                            }
                            else {
                                t = (new Date(device[j].time - tzoffset)).toISOString().slice(0, -8);
                            }
                            dev = {
                                id: device[j].id,
                                group_dev_id: device[j].group_dev_id,
                                number: device[j].number,
                                name: device[j].name,
                                latitude: device[j].latitude,
                                longitude: device[j].longitude,
                                sensors: device[j].sensors,
                                deleted: device[j].deleted,
                                info: device[j].info,
                                time: t
                            };
                            test.push(dev);
                        }
                        groups.childs.push({
                            group: roots_gr.rows[i],
                            id: roots_gr.rows[i].id,
                            p_id: roots_gr.rows[i].parent_id,
                            childs: new Array(),
                            devs: test,
                            update: false
                        });
                        _o.label = 8;
                    case 8:
                        _i++;
                        return [3, 2];
                    case 9: return [3, 19];
                    case 10: return [4, this.db.query("SELECT * FROM devs_groups WHERE parent_id=0 and org_id=" + this.args.org_id)];
                    case 11:
                        roots_gr = _o.sent();
                        _d = roots_gr.rows;
                        _e = [];
                        for (_f in _d)
                            _e.push(_f);
                        _g = 0;
                        _o.label = 12;
                    case 12:
                        if (!(_g < _e.length)) return [3, 19];
                        _f = _e[_g];
                        if (!(_f in _d)) return [3, 18];
                        i = _f;
                        return [4, this.db.query("SELECT devs.id, group_dev_id, number, " +
                                "name, latitude, longitude, sensors, deleted, info, MAX(time_srv) as time " +
                                "FROM devs INNER JOIN dev_sess ON devs.number = dev_sess.dev_number WHERE group_dev_id = " + roots_gr.rows[i].id + " group by devs.id")];
                    case 13: return [4, (_o.sent()).rows];
                    case 14:
                        device = _o.sent();
                        if (!(device[i] === undefined)) return [3, 17];
                        return [4, this.db.query("SELECT * FROM devs WHERE group_dev_id = " + roots_gr.rows[i].id)];
                    case 15: return [4, (_o.sent()).rows];
                    case 16:
                        device = _o.sent();
                        _o.label = 17;
                    case 17:
                        tzoffset = (new Date()).getTimezoneOffset() * 60000;
                        for (j in device) {
                            if (device[j].time === undefined) {
                                t = null;
                            }
                            else {
                                t = (new Date(device[j].time - tzoffset)).toISOString().slice(0, -8);
                            }
                            dev = {
                                id: device[j].id,
                                group_dev_id: device[j].group_dev_id,
                                number: device[j].number,
                                name: device[j].name,
                                latitude: device[j].latitude,
                                longitude: device[j].longitude,
                                sensors: device[j].sensors,
                                deleted: device[j].deleted,
                                info: device[j].info,
                                time: t
                            };
                            test.push(dev);
                        }
                        groups.childs.push({
                            group: roots_gr.rows[i],
                            id: roots_gr.rows[i].id,
                            p_id: roots_gr.rows[i].parent_id,
                            childs: new Array(),
                            devs: test,
                            update: false
                        });
                        _o.label = 18;
                    case 18:
                        _g++;
                        return [3, 12];
                    case 19:
                        _h = groups.childs;
                        _j = [];
                        for (_k in _h)
                            _j.push(_k);
                        _l = 0;
                        _o.label = 20;
                    case 20:
                        if (!(_l < _j.length)) return [3, 23];
                        _k = _j[_l];
                        if (!(_k in _h)) return [3, 22];
                        i = _k;
                        _m = groups.childs[i];
                        return [4, this._d_tree(groups.childs[i])];
                    case 21:
                        _m.childs = _o.sent();
                        _o.label = 22;
                    case 22:
                        _l++;
                        return [3, 20];
                    case 23:
                        result = this.objToString(groups);
                        return [2, result];
                }
            });
        });
    };
    Devs_groupsTable.prototype._d_tree = function (childs) {
        return __awaiter(this, void 0, void 0, function () {
            var reti, grs, test, dev, _a, _b, _c, _i, i, device, t, tzoffset, j, _d, _e;
            var _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        reti = new Array();
                        return [4, this.db.query("SELECT * FROM devs_groups WHERE parent_id=" + childs.id)];
                    case 1:
                        grs = _g.sent();
                        test = new Array;
                        dev = {
                            id: 0,
                            group_dev_id: '',
                            number: '',
                            name: '',
                            latitude: '',
                            longitude: '',
                            sensors: '',
                            deleted: false,
                            info: '',
                            time: ''
                        };
                        _a = grs.rows;
                        _b = [];
                        for (_c in _a)
                            _b.push(_c);
                        _i = 0;
                        _g.label = 2;
                    case 2:
                        if (!(_i < _b.length)) return [3, 10];
                        _c = _b[_i];
                        if (!(_c in _a)) return [3, 9];
                        i = _c;
                        return [4, this.db.query("SELECT devs.id, group_dev_id, number, " +
                                "name, latitude, longitude, sensors, deleted, info, MAX(time_srv) as time " +
                                "FROM devs INNER JOIN dev_sess ON devs.number = dev_sess.dev_number WHERE group_dev_id = " + grs.rows[i].id + " group by devs.id")];
                    case 3: return [4, (_g.sent()).rows];
                    case 4:
                        device = _g.sent();
                        if (!(device[i] === undefined)) return [3, 7];
                        return [4, this.db.query("SELECT * FROM devs WHERE group_dev_id = " + grs.rows[i].id)];
                    case 5: return [4, (_g.sent()).rows];
                    case 6:
                        device = _g.sent();
                        _g.label = 7;
                    case 7:
                        tzoffset = (new Date()).getTimezoneOffset() * 60000;
                        for (j in device) {
                            if (device[j].time === undefined) {
                                t = null;
                            }
                            else {
                                t = (new Date(device[j].time - tzoffset)).toISOString().slice(0, -8);
                            }
                            dev = {
                                id: device[j].id,
                                group_dev_id: device[j].group_dev_id,
                                number: device[j].number,
                                name: device[j].name,
                                latitude: device[j].latitude,
                                longitude: device[j].longitude,
                                sensors: device[j].sensors,
                                deleted: device[j].deleted,
                                info: device[j].info,
                                time: t
                            };
                            test.push(dev);
                        }
                        _e = (_d = reti).push;
                        _f = {
                            group: grs.rows[i],
                            id: grs.rows[i].id,
                            pid: grs.rows[i].parent_id
                        };
                        return [4, this._d_tree(grs.rows[i])];
                    case 8:
                        _e.apply(_d, [(_f.childs = _g.sent(),
                                _f.devs = test,
                                _f.updated = false,
                                _f)]);
                        _g.label = 9;
                    case 9:
                        _i++;
                        return [3, 2];
                    case 10: return [2, reti];
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
    Devs_groupsTable.prototype.updateDevsGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, i, data_dev, j;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.db.query("SELECT * FROM UpdateDevs_Group(" +
                            "CAST (" + this.args.id + " AS BIGINT), " +
                            "CAST (" + this.args.parent_id + " AS BIGINT), " +
                            "CAST ('" + this.args.name + "' AS VARCHAR(250)), " +
                            "CAST ('" + this.args.latitude + "' AS VARCHAR(60)), " +
                            "CAST ('" + this.args.longitude + "' AS VARCHAR(60)), " +
                            "CAST (" + this.args.org_id + " AS BIGINT), " +
                            "CAST (" + this.args.ord_id + " AS INTEGER), " +
                            "CAST ('" + this.args.deleted + "' AS BOOLEAN), " +
                            "CAST ('" + this.args.info + "' AS TEXT))")];
                    case 1:
                        _a.sent();
                        return [4, this.db.query("with recursive temp1 (id, parent_id, g_name, latitude, longitude, org_id, ord_num, deleted, g_info, path) " +
                                "as (select t1.id, t1.parent_id, t1.g_name, t1.latitude, t1.longitude, t1.org_id, t1.ord_num, t1.deleted, t1.g_info, cast (t1.g_name as varchar (50)) as path " +
                                "from devs_groups t1 where id = " + this.args.id + " union " +
                                "select t2.id, t2.parent_id, t2.g_name, t2.latitude, t2.longitude, t2.org_id, t2.ord_num, t2.deleted, t2.g_info, cast (temp1.path || '->'|| t2.g_name as varchar(50)) " +
                                "from devs_groups t2 inner join temp1 on (temp1.id = t2.parent_id)) " +
                                "select * from temp1")];
                    case 2:
                        data = _a.sent();
                        i = 0;
                        _a.label = 3;
                    case 3:
                        if (!(i < data.rows.length)) return [3, 10];
                        return [4, this.db.query("update devs_groups set org_id = " + this.args.org_id + ", deleted = " + this.args.deleted + " where id = " + data.rows[i].id)];
                    case 4:
                        _a.sent();
                        return [4, this.db.query("SELECT * FROM Devs WHERE group_dev_id=" + data.rows[i].id)];
                    case 5:
                        data_dev = _a.sent();
                        j = 0;
                        _a.label = 6;
                    case 6:
                        if (!(j < data_dev.rows.length)) return [3, 9];
                        return [4, this.db.query("UPDATE Devs SET " +
                                "deleted = " + this.args.deleted + " WHERE id=" + data_dev.rows[j].id)];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8:
                        j++;
                        return [3, 6];
                    case 9:
                        i++;
                        return [3, 3];
                    case 10: return [2];
                }
            });
        });
    };
    return Devs_groupsTable;
}());
exports.Devs_groupsTable = Devs_groupsTable;
//# sourceMappingURL=Devs_groups.js.map