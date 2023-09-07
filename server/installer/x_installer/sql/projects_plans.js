"use strict";
exports.__esModule = true;
exports.projects_plans_table = void 0;
exports.projects_plans_table = {
    sql: "\n    DROP TABLE IF EXISTS projects_plans;\n    CREATE TABLE projects_plans (\n        id                      BIGSERIAL NOT NULL PRIMARY KEY,\n        id_devs_groups          BIGINT DEFAULT(0),\n        svg                     TEXT DEFAULT(''),\n        created_at              TIMESTAMP DEFAULT(CURRENT_TIMESTAMP)\n    );\n\n    COMMENT ON TABLE projects_plans IS '\u0421\u0445\u0435\u043C\u044B \u043F\u0440\u043E\u0435\u043A\u0442\u043E\u0432';\n    COMMENT ON COLUMN projects_plans.id_devs_groups IS '\u0418\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440 \u0433\u0440\u0443\u043F\u043F\u044B \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0430';\n    COMMENT ON COLUMN projects_plans.svg IS '\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0441\u0445\u0435\u043C\u044B \u043F\u0440\u043E\u0435\u043A\u0442\u043E\u0432';\n    COMMENT ON COLUMN projects_plans.created_at IS '\u0412\u0440\u0435\u043C\u044F \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u0437\u0430\u043F\u0438\u0441\u0438';\n    ",
    args: new Array()
};
//# sourceMappingURL=projects_plans.js.map