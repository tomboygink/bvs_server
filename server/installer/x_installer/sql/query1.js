"use strict";
exports.__esModule = true;
exports.query1 = exports.query000 = void 0;
exports.query000 = {
    sql: "\n    -- SQL\n    ",
    args: new Array()
};
exports.query1 = {
    sql: "\n    DROP TABLE IF EXISTS projects;\n    CREATE TABLE projects (\n        id          BIGSERIAL NOT NULL PRIMARY KEY,\n        name        VARCHAR(250) NOT NULL DEFAULT(''),\n        c_flags     JSON NOT NULL DEFAULT('{}'),\n        compiller   VARCHAR(250) NOT NULL DEFAULT(''),\n        info        TEXT NOT NULL DEFAULT('')\n    );\n    \n    COMMENT ON TABLE projects IS '\u0422\u0430\u0431\u043B\u0438\u0446\u0430 \u043F\u0440\u043E\u0435\u043A\u0442\u043E\u0432';\n    COMMENT ON COLUMN projects.id IS '\u0418\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440 \u043F\u0440\u043E\u0435\u043A\u0442\u0430';\n    COMMENT ON COLUMN projects.name IS '\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435 \u043F\u0440\u043E\u0435\u043A\u0442\u0430 (\u0438\u043C\u044F \u0432\u044B\u0445\u043E\u0434\u043D\u043E\u0433\u043E \u0444\u0430\u0439\u043B\u0430)';\n    COMMENT ON COLUMN projects.c_flags IS '\u0424\u043B\u0430\u0433\u0438 \u043A\u043E\u043C\u043F\u0438\u043B\u044F\u0442\u043E\u0440\u0430 JSON';\n    COMMENT ON COLUMN projects.compiller IS '\u041A\u043E\u043C\u043F\u0438\u043B\u044F\u0442\u043E\u0440, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u043F\u0440\u0438\u043C\u0435\u043D\u044F\u0435\u0442\u0441\u044F \u0434\u043B\u044F \u043F\u0440\u043E\u0435\u043A\u0442\u0430';\n    COMMENT ON COLUMN projects.info IS '\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043F\u0440\u043E\u0435\u043A\u0442\u0430';\n    \n    INSERT INTO projects ( \"name\", \"c_flags\", \"compiller\", \"info\" ) VALUES ('main_project', '{\"flags\":[\"-c11\"]}', 'gcc', 'test project');\n    ",
    args: new Array()
};
//# sourceMappingURL=query1.js.map