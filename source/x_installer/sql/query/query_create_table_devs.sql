--------------------------------------------------------------------------------------------Таблица групп устройств 
DROP TABLE IF EXISTS devs_groups;
CREATE TABLE devs_groups
(
    "id" BIGSERIAL NOT NULL PRIMARY KEY,
    "parent_id" BIGINT NOT NULL DEFAULT(0),
    "g_name" CHARACTER VARYING(250) NOT NULL DEFAULT(''),
    "latitude" CHARACTER VARYING(60) NOT NULL DEFAULT('0.0'),
    "longitude" CHARACTER VARYING(60) NOT NULL DEFAULT('0.0'),
    --"org_id" BIGINT DEFAULT(0),
    "ord_num" INTEGER NOT NULL DEFAULT(0),
    "g_info" TEXT NOT NULL DEFAULT(''),
	"deleted" BOOL NOT NULL DEFAULT(FALSE)
);
COMMENT ON TABLE devs_groups IS 'Группы устройств по местоположению';
COMMENT ON COLUMN devs_groups.parent_id IS 'Родительская группа';
COMMENT ON COLUMN devs_groups.g_name IS 'Наименование группы (отображается в дереве)';
COMMENT ON COLUMN devs_groups.latitude IS 'Географическая широта';
COMMENT ON COLUMN devs_groups.longitude IS 'Географическая долгота';
--COMMENT ON COLUMN devs_groups.org_id IS 'Группа устройств для организации';
COMMENT ON COLUMN devs_groups.ord_num IS 'Порядок следования групп';
COMMENT ON COLUMN devs_groups.g_info IS 'Информация о группе';
COMMENT ON COLUMN devs_groups.deleted IS 'Группа удалена';

--------------------------------------------------------------------------------------------Таблица устройств
DROP TABLE IF EXISTS devs;
CREATE TABLE devs
(
    "id" BIGSERIAL NOT NULL PRIMARY KEY,
    "group_dev_id" BIGINT NOT NULL DEFAULT(0),
    "number" CHARACTER VARYING(80) NOT NULL DEFAULT(''),
    "name" CHARACTER VARYING(250) NOT NULL DEFAULT(''),
    "latitude" CHARACTER VARYING(60) NOT NULL DEFAULT('0.0'),
    "longitude" CHARACTER VARYING(60) NOT NULL DEFAULT('0.0'),
    "sensors" JSON NOT NULL DEFAULT('{"s":[]}'),
    "deleted" BOOLEAN DEFAULT (false),
    "info" TEXT NOT NULL DEFAULT('')
);
COMMENT ON TABLE devs IS 'Устройства по группам';
COMMENT ON COLUMN devs.group_dev_id IS 'Идентификатор группы';
COMMENT ON COLUMN devs.number IS 'Номер устройства';
COMMENT ON COLUMN devs.name IS 'Наименование устройства';
COMMENT ON COLUMN devs.latitude IS 'Географическая широта';
COMMENT ON COLUMN devs.longitude IS 'Географическая долгота';
COMMENT ON COLUMN devs.sensors IS 'Сенсоры на устройстве';
COMMENT ON COLUMN devs.deleted IS 'Удаление утройства';
COMMENT ON COLUMN devs.info IS 'Информация об устройстве';

--------------------------------------------------------------------------------------------Таблица сессий устройств
DROP TABLE IF EXISTS dev_sess;
CREATE TABLE dev_sess 
(
	"id" BIGSERIAL NOT NULL PRIMARY KEY,
	"time_dev" TIMESTAMP NOT NULL,
	"time_srv" TIMESTAMP NOT NULL,
	"dev_number" VARCHAR(80) NOT NULL DEFAULT(''),
	"dev_id" BIGSERIAL NOT NULL,
	"level_akb" FLOAT NOT NULL,
	"sess_data" TEXT NOT NULL
);

COMMENT ON TABLE dev_sess IS 'Сессии по устройствам';
COMMENT ON COLUMN dev_sess.id IS 'Идентификатор сессии';
COMMENT ON COLUMN dev_sess.time_dev IS 'Время устройства';
COMMENT ON COLUMN dev_sess.time_srv IS 'Время сервера';
COMMENT ON COLUMN dev_sess.dev_number IS 'Номер устройства';
COMMENT ON COLUMN dev_sess.dev_id IS 'Идентификатор устройства';
COMMENT ON COLUMN dev_sess.level_akb IS 'Уровень заряда устройства';
COMMENT ON COLUMN dev_sess.sess_data IS 'Данные с устройства';

--------------------------------------------------------------------------------------------Таблица логов ошибок
DROP TABLE IF EXISTS info_log;
CREATE TABLE info_log 
(
	"id" BIGSERIAL NOT NULL PRIMARY KEY,
	"msg_type" VARCHAR(70) NOT NULL DEFAULT (''),
	"log" TEXT NOT NULL DEFAULT (''),
	"info" TEXT NOT NULL DEFAULT ('')
);
COMMENT ON TABLE info_log IS 'Логи по ошибкам';
COMMENT ON COLUMN info_log.id IS 'Идентификатор лога';
COMMENT ON COLUMN info_log.msg_type IS 'Тип ошибки';
COMMENT ON COLUMN info_log.log IS 'Преданная строка';
COMMENT ON COLUMN info_log.info IS 'Сообщение от сервера';
