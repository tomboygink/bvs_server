--Таблица должностей 
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

--Таблица организаций
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

--Таблица сессий пользователя
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




DROP FUNCTION IF EXISTS AddUserSession;
-- Функция сессий пользователя
create function AddUserSession 
(
 c_Uid BIGINT,
 c_Expires TIMESTAMP,
 c_Created_at TIMESTAMP,
 c_Sess_code VARCHAR(250),
 c_Sess_data JSON
) RETURNS VOID AS $$
BEGIN 
	INSERT INTO sessions(uid, expires, created_at, sess_code, sess_data)
	VALUES(c_Uid, c_Expires, c_Created_at,c_Sess_code, c_Sess_data);
END
$$
LANGUAGE 'plpgsql';

DROP FUNCTION IF EXISTS SelectSessCode;
-- Получение данных сессии по коду
CREATE OR REPLACE FUNCTION SelectSessCode(
	c_sess_code VARCHAR(250)
)
RETURNS table(
	id BIGINT, 
	uid BIGINT, 
	expires TIMESTAMP, 
	created_at TIMESTAMP,
	sess_code VARCHAR(250), 
	sess_data JSON
)
as $$
	SELECT 
	sessions.id, sessions.uid, sessions.expires, sessions.created_at, sessions.sess_code, sessions.sess_data
	FROM sessions 
	WHERE sess_code = c_sess_code
$$ LANGUAGE sql;




--Таблица ролей пользователя
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

--Таблица пользователей
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
COMMENT ON COLUMN users.deleted IS 'блокировка пользователя';
COMMENT ON COLUMN users.deleted_date IS 'дата блокировки пользователя';
COMMENT ON COLUMN users.created_at IS 'дата создания записи';
COMMENT ON COLUMN users.info IS 'дополнительное описание';

DROP FUNCTION IF EXISTS AddUser;
--Функция добавления пользователя 
create function AddUser
(
	c_login VARCHAR(250), 
	c_password VARCHAR(250), 
	c_family VARCHAR(150), 
	c_name VARCHAR(150), 
	c_father VARCHAR(150), 
	c_telephone VARCHAR(50), 
	c_email VARCHAR(150), 
	c_org_id BIGINT, 
	c_job_title_id BIGINT, 
	c_roles_ids JSON,
	c_user_data JSON, 
	c_mail_code VARCHAR(250), 
	c_act_mail BOOLEAN, 
	c_re_password_code VARCHAR(250), 
	c_deleted BOOLEAN, 
	c_deleted_date TIMESTAMP, 
	c_created_at TIMESTAMP, 
	c_info TEXT
) RETURNS VOID AS $$
BEGIN 
	INSERT INTO users(login, password, family, name, father, telephone, email, org_id, job_title_id, roles_ids, user_data, mail_code, act_mail, re_password_code, deleted, deleted_date, created_at, info)
	VALUES(c_login, c_password, c_family, c_name, c_father, c_telephone, c_email, c_org_id, c_job_title_id, c_roles_ids, c_user_data, c_mail_code, c_act_mail, c_re_password_code, c_deleted, c_deleted_date, c_created_at, c_info);
END
$$
LANGUAGE 'plpgsql';



DROP FUNCTION IF EXISTS SelectIdUser;
--Выбор id пользовотеля для формирования CODE
CREATE OR REPLACE FUNCTION SelectIdUser(
	c_login VARCHAR(250), 
	c_password VARCHAR(250)
)
RETURNS BIGINT
as $$
	SELECT id FROM users WHERE login = c_login and password = c_password
$$ LANGUAGE sql;


DROP FUNCTION IF EXISTS SelectUser;
--получаем все данные таблицы users по логину и паролю
CREATE OR REPLACE FUNCTION SelectUser(
	c_login VARCHAR(250), 
	c_password VARCHAR(250)
)
RETURNS table(
	id BIGINT, 
	login VARCHAR(250), 
	password VARCHAR(250), 
	family VARCHAR(150), 
	name VARCHAR(150), 
	father VARCHAR(150), 
	telephone VARCHAR(50), 
	email VARCHAR(150), 
	org_id BIGINT, 
	job_title_id BIGINT, 
	roles_ids JSON,
	user_data JSON, 
	mail_code VARCHAR(250), 
	act_mail BOOLEAN, 
	re_password_code VARCHAR(250), 
	deleted BOOLEAN, 
	deleted_date TIMESTAMP, 
	created_at TIMESTAMP, 
	info TEXT
)
as $$
	SELECT users.id, users.login, users.password, users.family, users.name, users.father, users.telephone, users.email, users.org_id, users.job_title_id, users.roles_ids,
	users.user_data, users.mail_code, users.act_mail, users.re_password_code, users.deleted, users.deleted_date, users.created_at, users.info
	FROM users 
	WHERE login = c_login and password = c_password
$$ LANGUAGE sql;


DROP FUNCTION IF EXISTS SelectUserBySessCode;
--получаем все данные таблицы users по коду сессии
CREATE OR REPLACE FUNCTION SelectUserBySessCode(
	c_sess_code VARCHAR(250)
)
RETURNS table(
	id BIGINT, 
	login VARCHAR(250), 
	password VARCHAR(250), 
	family VARCHAR(150), 
	name VARCHAR(150), 
	father VARCHAR(150), 
	telephone VARCHAR(50), 
	email VARCHAR(150), 
	org_id BIGINT, 
	job_title_id BIGINT, 
	roles_ids JSON,
	user_data JSON, 
	mail_code VARCHAR(250), 
	act_mail BOOLEAN, 
	re_password_code VARCHAR(250), 
	deleted BOOLEAN, 
	deleted_date TIMESTAMP, 
	created_at TIMESTAMP, 
	info TEXT
)
as $$
	SELECT users.id, users.login, users.password, users.family, users.name, users.father, users.telephone, users.email, users.org_id, users.job_title_id, users.roles_ids,
	users.user_data, users.mail_code, users.act_mail, users.re_password_code, users.deleted, users.deleted_date, users.created_at, users.info
	FROM users 
	INNER JOIN sessions on users.id = sessions.uid
	WHERE sessions.sess_code = c_sess_code
$$ LANGUAGE sql;

--Обновление пользователя 
DROP FUNCTION IF EXISTS UpdateUser;
create function UpdateUser(
	c_sess_code VARCHAR(250),
	c_login VARCHAR(250),
	--c_password VARCHAR(250),
	c_family VARCHAR(150),
	c_name VARCHAR(150),
	c_father VARCHAR(150),
	c_telephone VARCHAR(50),
	c_email VARCHAR(150), 
	c_info TEXT
)
RETURNS TABLE (
	id BIGINT, 
	login VARCHAR(250), 
	password VARCHAR(250), 
	family VARCHAR(150), 
	name VARCHAR(150), 
	father VARCHAR(150), 
	telephone VARCHAR(50), 
	email VARCHAR(150), 
	org_id BIGINT, 
	job_title_id BIGINT, 
	roles_ids JSON,
	user_data JSON, 
	mail_code VARCHAR(250), 
	act_mail BOOLEAN, 
	re_password_code VARCHAR(250), 
	deleted BOOLEAN, 
	deleted_date TIMESTAMP, 
	created_at TIMESTAMP, 
	info TEXT
)
as $$
UPDATE users
SET
	--password = CASE WHEN ((SELECT password FROM users WHERE login=c_login) <> c_password) THEN (c_password) ELSE (SELECT password FROM users WHERE login=c_login) END,
 	family = c_family,
 	name = c_name,
 	father = c_father,
 	telephone = c_telephone,
	mail_code = CASE WHEN ((SELECT email FROM users WHERE login=c_login) <> c_email) THEN (c_email) ELSE (SELECT mail_code FROM users WHERE login=c_login) END,
	act_mail = CASE WHEN ((SELECT email FROM users WHERE login=c_login) <> c_email) THEN (false) ELSE (SELECT act_mail FROM users WHERE login=c_login) END,
	email=c_email,
 	info = c_info
WHERE login=c_login;
SELECT * FROM SelectUserBySessCode(c_sess_code)
$$ LANGUAGE sql;