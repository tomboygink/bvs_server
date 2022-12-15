--------------------------------------------------------------------------------------------Функция добавления пользователя
DROP FUNCTION IF EXISTS AddUser;
CREATE OR REPLACE FUNCTION AddUser
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

--------------------------------------------------------------------------------------------Функция обновления данных пользователя 
DROP FUNCTION IF EXISTS UpdateUser;
CREATE OR REPLACE FUNCTION UpdateUser(
    c_login VARCHAR(250),
    c_family VARCHAR(150),
    c_name VARCHAR(150),
    c_father VARCHAR(150),
    c_telephone VARCHAR(50),
    c_email VARCHAR(150), 
    c_info TEXT
)
RETURNS VOID
as $$
UPDATE users
SET
    family = c_family,
    name = c_name,
    father = c_father,
    telephone = c_telephone,
    mail_code = CASE WHEN ((SELECT email FROM users WHERE login=c_login) <> c_email) THEN ('') ELSE (SELECT mail_code FROM users WHERE login=c_login) END,
    act_mail = CASE WHEN ((SELECT email FROM users WHERE login=c_login) <> c_email) THEN (false) ELSE (SELECT act_mail FROM users WHERE login=c_login) END,
    email=c_email,
    info = c_info
WHERE login=c_login
$$ LANGUAGE sql;

--------------------------------------------------------------------------------------------Функция обновления и подтверждения email 
DROP FUNCTION IF EXISTS UpdateUserEmail;
CREATE OR REPLACE FUNCTION UpdateUserEmail
(c_mail_code VARCHAR(250),
 c_sess_code VARCHAR(250))
RETURNS VOID AS $$
    UPDATE users 
    SET mail_code = c_mail_code,
    act_mail = true
    WHERE login = (select login from users inner join sessions on sessions.uid = users.id where sess_code = c_sess_code)
$$ LANGUAGE sql;

--------------------------------------------------------------------------------------------Функция обновления пароля пользователем
DROP FUNCTION IF EXISTS ChangePass;
CREATE OR REPLACE FUNCTION ChangePass(
    c_login VARCHAR(250),
    c_new_password VARCHAR(250)
)
RETURNS VOID
as $$
UPDATE users
SET
    password = c_new_password
	WHERE login=c_login;
$$ LANGUAGE sql;

--------------------------------------------------------------------------------------------Функция создания/обновления кода для восстановления пароля 
DROP FUNCTION IF EXISTS UpdateRePassCode;
CREATE OR REPLACE FUNCTION UpdateRePassCode(
    c_login VARCHAR(250),
    c_re_password_code VARCHAR(250))
RETURNS VOID AS $$
    UPDATE users
    SET re_password_code = c_re_password_code
    WHERE login = c_login
$$ LANGUAGE sql;


--------------------------------------------------------------------------------------------Функция забыли пароль 
DROP FUNCTION IF EXISTS ForgPass;
create or replace function ForgPass(
	c_login VARCHAR(250),
	c_password VARCHAR(250),
	c_re_password_code VARCHAR(250))
RETURNS VOID AS $$
	UPDATE users
	SET re_password_code = c_re_password_code,
	password = c_password
	WHERE login = c_login
$$ LANGUAGE sql; 

--------------------------------------------------------------------------------------------Функция добавления сессии при авторизации
DROP FUNCTION IF EXISTS AddUserSession;
CREATE OR REPLACE FUNCTION AddUserSession 
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

--------------------------------------------------------------------------------------------Функция удаления сессии при выходе из программы
DROP FUNCTION IF EXISTS DeleteSessions;
CREATE OR REPLACE FUNCTION DeleteSessions (
    c_sess_code VARCHAR(250)
) RETURNS VOID AS $$
    DELETE FROM sessions WHERE sess_code=c_sess_code
$$ 
LANGUAGE sql;

--------------------------------------------------------------------------------------------Функция получения данных при авторизации по логину и паролю
DROP FUNCTION IF EXISTS SelectUser;
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
    SELECT users
    FROM users 
    WHERE login = c_login and password = c_password
$$ LANGUAGE sql;

--------------------------------------------------------------------------------------------Функция получения данных по email
DROP FUNCTION IF EXISTS SelectUserLoginEmail;
CREATE OR REPLACE FUNCTION SelectUserLoginEmail(
    c_data VARCHAR(250)
)
RETURNS table(
    password VARCHAR(250),
    act_mail BOOLEAN, 
    re_password_code VARCHAR(250) 
)
as $$
    SELECT password, act_mail, re_password_code
    FROM users 
    WHERE login = c_data OR email = c_data
$$ LANGUAGE sql;
--------------------------------------------------------------------------------------------Функция получения данных по коду сессии
DROP FUNCTION IF EXISTS SelectUserBySessCode;
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
    SELECT users
    FROM users 
    INNER JOIN sessions on users.id = sessions.uid
    WHERE sessions.sess_code = c_sess_code
$$ LANGUAGE sql;

--------------------------------------------------------------------------------------------Функция получения данных сессии по коду
DROP FUNCTION IF EXISTS SelectSessCode;
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
    sessions
    FROM sessions 
    WHERE sess_code = c_sess_code
$$ LANGUAGE sql;

--------------------------------------------------------------------------------------------Функция добавления организации
DROP FUNCTION IF EXISTS AddOrgs;
CREATE OR REPLACE FUNCTION AddOrgs(
	c_name VARCHAR(250),
	c_full_name VARCHAR(400),
	c_inn VARCHAR(50),
	c_address VARCHAR(400),
	c_latitude VARCHAR(60),
	c_longitude VARCHAR(60),
	c_created_at TIMESTAMP,
	c_info TEXT)
RETURNS VOID
AS $$
	INSERT INTO orgs (name, full_name, inn, address, latitude, longitude, created_at, info)
	VALUES (c_name, c_full_name, c_inn, c_address, c_latitude, c_longitude, c_created_at, c_info)
$$
LANGUAGE SQL;

--------------------------------------------------------------------------------------------Функция получения всех организаций
DROP FUNCTION IF EXISTS SelectOrgs;
CREATE OR REPLACE FUNCTION SelectOrgs()
RETURNS TABLE (
	id BIGINT, 
	name VARCHAR(250),
	full_name VARCHAR(400),
	inn VARCHAR(50),
	address VARCHAR(400),
	latitude VARCHAR(60),
	longitude VARCHAR(60),
	created_at TIMESTAMP,
	info TEXT
)
AS $$
SELECT * FROM orgs
$$
LANGUAGE SQL;

