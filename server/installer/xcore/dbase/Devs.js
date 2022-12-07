"use strict";
exports.__esModule = true;
exports.DevsTable = exports.DevsEntity = void 0;
var DevsEntity = (function () {
    function DevsEntity() {
        this.id = 0;
        this.group_dev_id = 0;
        this.number = '';
        this.name = '';
        this.latitude = '';
        this.longitude = '';
        this.sensors = {};
        this.info = '';
    }
    return DevsEntity;
}());
exports.DevsEntity = DevsEntity;
var DevsTable = (function () {
    function DevsTable() {
    }
    return DevsTable;
}());
exports.DevsTable = DevsTable;
//# sourceMappingURL=Devs.js.map