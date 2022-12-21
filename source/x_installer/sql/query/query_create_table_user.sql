--------------------------------------------------------------------------------------------Таблица пользователей
DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    login VARCHAR(250) DEFAULT(''),
    password VARCHAR(250) DEFAULT(''),
    family VARCHAR(150) DEFAULT(''),
    name VARCHAR(150) DEFAULT(''),
    father VARCHAR(150) DEFAULT(''),
    telephone VARCHAR(50) DEFAULT(''),
    email VARCHAR(150) DEFAULT(''),
    org_id BIGINT DEFAULT(0),
    job_title_id BIGINT DEFAULT(0),
    roles_ids JSON DEFAULT('{"roles":[]}'),
    user_data JSON DEFAULT('{"user_data":[]}'),
    mail_code VARCHAR(250) DEFAULT(''),
    act_mail BOOLEAN DEFAULT(false),
    re_password_code VARCHAR(250) DEFAULT(''),
    --devs_groups_id BIGINT DEFAULT(0),
    deleted BOOLEAN DEFAULT(false),
    deleted_date TIMESTAMP DEFAULT(null),
    created_at TIMESTAMP DEFAULT(CURRENT_TIMESTAMP),
    info TEXT DEFAULT('')
);
COMMENT ON TABLE users IS 'Пользователи системы';
COMMENT ON COLUMN users.id IS 'Идентификатор пользователя';
COMMENT ON COLUMN users.login IS 'Логин пользователя';
COMMENT ON COLUMN users.password IS 'Пароль пользователя';
COMMENT ON COLUMN users.family IS 'Фамилия';
COMMENT ON COLUMN users.name IS 'Имя';
COMMENT ON COLUMN users.father IS 'Отчество';
COMMENT ON COLUMN users.telephone IS 'Телефон';
COMMENT ON COLUMN users.email IS 'Почта';
COMMENT ON COLUMN users.org_id IS 'Идентификатор привязки организации';
COMMENT ON COLUMN users.job_title_id IS 'Идентификатор привязки должности организации';
COMMENT ON COLUMN users.roles_ids IS 'json объект с массивом идентификаторов ролей доступа';
COMMENT ON COLUMN users.user_data IS 'json объукт дополнительных данных пользователя';
COMMENT ON COLUMN users.mail_code IS 'код подтверждения емаил';
COMMENT ON COLUMN users.act_mail IS 'фиксация подтвержденного кода';
COMMENT ON COLUMN users.re_password_code IS 'код смены пароля по ссылке';
--COMMENT ON COLUMN users.devs_groups_id IS 'Id группы устройств';
COMMENT ON COLUMN users.deleted IS 'блокировка пользователя';
COMMENT ON COLUMN users.deleted_date IS 'дата блокировки пользователя';
COMMENT ON COLUMN users.created_at IS 'дата создания записи';
COMMENT ON COLUMN users.info IS 'дополнительное описание';

--------------------------------------------------------------------------------------------Таблица сессий пользователя
DROP TABLE IF EXISTS sessions;
CREATE TABLE sessions (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    uid BIGINT DEFAULT(0),
    expires TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT(CURRENT_TIMESTAMP),
    sess_code VARCHAR(250) DEFAULT(''),
    sess_data JSON DEFAULT('{"data":[]}')
);
COMMENT ON TABLE sessions IS 'Сессии пользователей';
COMMENT ON COLUMN sessions.uid IS 'Идентификатор пользователя';
COMMENT ON COLUMN sessions.expires IS 'Конечное время жизни сессии ';
COMMENT ON COLUMN sessions.created_at IS 'Время создания записи';
COMMENT ON COLUMN sessions.sess_code IS 'Код сессии';
COMMENT ON COLUMN sessions.sess_data IS 'Данные сессии в формате json типа ключ значение';

--------------------------------------------------------------------------------------------Таблица организаций
DROP TABLE IF EXISTS orgs;
CREATE TABLE orgs (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(250) DEFAULT(''),
    full_name VARCHAR(400) DEFAULT(''),
    inn VARCHAR(50) DEFAULT(''),
    address VARCHAR(400) DEFAULT(''),
    latitude VARCHAR(60) DEFAULT(''),
    longitude VARCHAR(60) DEFAULT(''),
    created_at TIMESTAMP DEFAULT(CURRENT_TIMESTAMP),
    info TEXT DEFAULT('')
);
COMMENT ON TABLE orgs IS 'Организации';
COMMENT ON COLUMN orgs.name IS 'Сокращенное название организации';
COMMENT ON COLUMN orgs.full_name IS 'Полное название организации';
COMMENT ON COLUMN orgs.inn IS 'ИНН организации для поиска по ИНН';
COMMENT ON COLUMN orgs.address IS 'Адрес организации';
COMMENT ON COLUMN orgs.latitude IS 'Широта';
COMMENT ON COLUMN orgs.longitude IS 'Долгота';
COMMENT ON COLUMN orgs.created_at IS 'Время создания записи';
COMMENT ON COLUMN orgs.info IS 'дополнительное описание';

--------------------------------------------------------------------------------------------Таблица должностей 
DROP TABLE IF EXISTS jobs_titles;
CREATE TABLE jobs_titles (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    org_id BIGINT DEFAULT(0),
    name VARCHAR(250) DEFAULT(''),
    created_at TIMESTAMP DEFAULT(CURRENT_TIMESTAMP),
    info TEXT DEFAULT('')
);
COMMENT ON TABLE jobs_titles IS 'Должности';
COMMENT ON COLUMN jobs_titles.org_id IS 'Привязка по полю организации из таблицы ORGS';
COMMENT ON COLUMN jobs_titles.name IS 'Наименование должности';
COMMENT ON COLUMN jobs_titles.created_at IS 'Время создания записи';
COMMENT ON COLUMN jobs_titles.info IS 'дополнительное описание';

--------------------------------------------------------------------------------------------Таблица ролей пользователя
DROP TABLE IF EXISTS users_roles;
CREATE TABLE users_roles (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(250) DEFAULT(''),
    created_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
    info TEXT DEFAULT('')
);
COMMENT ON TABLE users_roles IS 'Роль пользователей в системе';
COMMENT ON COLUMN users_roles.name IS 'Наименование роли';
COMMENT ON COLUMN users_roles.created_at IS 'Время создания записи';
COMMENT ON COLUMN users_roles.info IS 'дополнительное описание';