--------------------------------------------------------------------------------------------Функция получения групп устройств по определенной 
--------------------------------------------------------------------------------------------организации или для админа всех
DROP FUNCTION IF EXISTS SelectDevs_Group_OrgId;
CREATE OR REPLACE FUNCTION SelectDevs_Group_OrgId(
	c_org_id VARCHAR(60)
	)
RETURNS TABLE
(
	id BIGINT,
	parent_id BIGINT, 
	g_name VARCHAR(250), 
	latitude VARCHAR(60), 
	longitude VARCHAR(60),
	org_id BIGINT, 
	ord_num INTEGER, 
	deleted BOOLEAN, 
	g_info TEXT
)
AS $$
	SELECT * FROM devs_groups WHERE CAST(org_id AS TEXT) LIKE c_org_id
$$
LANGUAGE SQL;
--НЕОБХОДИМО УСЛОВИЯ WRITE В ДОСТУПЕ 
--Для пользователя SELECT * FROM SelectDevs_Group_OrgId('2');
--Для админа SELECT * FROM SelectDevs_Group_OrgId('%');



--------------------------------------------------------------------------------------------Функция добавленя группы устройства
DROP FUNCTION IF EXISTS AddDevs_Group;
CREATE OR REPLACE FUNCTION AddDevs_Group(
	c_parent_id BIGINT,
	c_g_name VARCHAR(250), 
	c_latitude VARCHAR(60), 
	c_longitude VARCHAR(60), 
	c_org_id BIGINT, 
	c_ord_num INTEGER, 
	c_deleted BOOLEAN, 
	c_g_info TEXT
) RETURNS BIGINT
AS $$
	INSERT INTO devs_groups(parent_id, g_name, latitude, longitude, org_id, ord_num, deleted, g_info)
	VALUES(c_parent_id, c_g_name, c_latitude, c_longitude, c_org_id, c_ord_num, c_deleted, c_g_info)
	RETURNING id
$$
LANGUAGE SQL;

--------------------------------------------------------------------------------------------Функция обновления группы устройства
DROP FUNCTION IF EXISTS UpdateDevs_Group;
CREATE OR REPLACE FUNCTION UpdateDevs_Group(
	c_id BIGINT,
	c_parent_id BIGINT,
    c_g_name VARCHAR(250),
    c_latitude VARCHAR(60),
    c_longitude VARCHAR(60),
    c_org_id BIGINT,
	c_ord_num INTEGER,
    c_deleted BOOLEAN,
    c_g_info TEXT
)
RETURNS VOID
as $$
UPDATE Devs_Groups
SET
	parent_id = c_parent_id,
	g_name = c_g_name,
	latitude = c_latitude,
	longitude = c_longitude,
	org_id = c_org_id,
	ord_num = c_ord_num,
	deleted = c_deleted,
    g_info = c_g_info
WHERE id = c_id

$$ LANGUAGE sql;



--------------------------------------------------------------------------------------------Функция получения данных устройств по группе 
DROP FUNCTION IF EXISTS SelectDevs;
CREATE OR REPLACE FUNCTION SelectDevs(
	c_group_dev_id BIGINT
)
RETURNS TABLE (
	id BIGINT,
	group_dev_id BIGINT,
	number VARCHAR(80), 
	name VARCHAR(250), 
	latitude VARCHAR(60),
	longitude VARCHAR(60),
	sensors JSON,
	deleted BOOLEAN,
	info TEXT
)
AS $$
SELECT * FROM devs WHERE group_dev_id = c_group_dev_id
$$ LANGUAGE SQL;



--------------------------------------------------------------------------------------------Функция добавления устройства
DROP FUNCTION IF EXISTS AddDevs;
CREATE OR REPLACE FUNCTION AddDevs(
	c_group_dev_id BIGINT,
	c_number VARCHAR(80), 
	c_name VARCHAR(250), 
	c_latitude VARCHAR(60),
	c_longitude VARCHAR(60),
	c_sensors JSON,
	c_deleted BOOLEAN,
	c_info TEXT
)
RETURNS BIGINT
AS $$
	INSERT INTO devs (group_dev_id, number, name, latitude, longitude, sensors, deleted, info)
	VALUES (c_group_dev_id, c_number, c_name, c_latitude, c_longitude, c_sensors, c_deleted, c_info)
	RETURNING id
$$ LANGUAGE SQL;


--------------------------------------------------------------------------------------------Функция обновления устройства
DROP FUNCTION IF EXISTS UpdateDevs;
CREATE OR REPLACE FUNCTION UpdateDevs(
	c_id BIGINT,
	c_group_dev_id BIGINT,
	c_number VARCHAR(80),
	c_name VARCHAR(250),
	c_latitude VARCHAR(60),
	c_longitude VARCHAR(60),
	c_sensors JSON,
	c_deleted BOOLEAN,
	c_info TEXT
)
RETURNS VOID 
AS $$
	UPDATE devs SET
	group_dev_id=c_group_dev_id,
	number=c_number,
	name=c_name,
	latitude=c_latitude,
	longitude=c_longitude,
	sensors=c_sensors,
	deleted=c_deleted,
	info = c_info 
	WHERE id = c_id	
$$
LANGUAGE SQL; 


--------------------------------------------------------------------------------------------Функция получения сессий устройства 
DROP FUNCTION IF EXISTS SelectDev_Sess;
CREATE OR REPLACE FUNCTION SelectDev_Sess(
	c_dev_number VARCHAR(80),
	start_period VARCHAR(80),
	end_period VARCHAR(80)
)
RETURNS TABLE
(
	id BIGINT,
	time_dev TIMESTAMP,
	time_srv TIMESTAMP,
	dev_number VARCHAR(80),
	dev_id BIGINT,
	level_akb FLOAT,
	sess_data TEXT
)
AS $$ 
SELECT * FROM dev_sess WHERE dev_number = c_dev_number AND time_dev>= CAST(start_period as TIMESTAMP) AND time_dev<=CAST(end_period as TIMESTAMP)
$$ LANGUAGE SQL;


--------------------------------------------------------------------------------------------Функция добавления поверочного интервала устройства
DROP FUNCTION IF EXISTS AddDev_Povs;
CREATE OR REPLACE FUNCTION AddDev_Povs(
	c_dev_id BIGINT,
	c_dev_number VARCHAR(80), 
	c_start_povs TIMESTAMP, 
	c_end_povs TIMESTAMP, 
	c_old_dev_povs BIGINT
) RETURNS BIGINT
AS $$
	INSERT INTO dev_povs(dev_id, dev_number, start_povs, end_povs, old_dev_povs)
	VALUES(c_dev_id, c_dev_number, c_start_povs, c_end_povs, c_old_dev_povs)
	RETURNING id
$$
LANGUAGE SQL;

--------------------------------------------------------------------------------------------Функция получения поверочного интервала устройства
DROP FUNCTION IF EXISTS SelectDev_Povs;
CREATE OR REPLACE FUNCTION SelectDev_Povs(
	c_dev_id BIGINT,
	c_dev_number VARCHAR(80) 
) RETURNS TABLE
(
	id BIGINT,
	dev_id BIGINT, 
	dev_number VARCHAR(80), 
	start_povs TIMESTAMP, 
	end_povs TIMESTAMP, 
	old_dev_povs BIGINT
)
AS $$
	select * from dev_povs WHERE dev_id = c_dev_id AND dev_number = c_dev_number order by id desc limit 1;
$$
LANGUAGE SQL;

--------------------------------------------------------------------------------------------Функция добавления контрольной сессии 
DROP FUNCTION IF EXISTS AddControl_Dev_Sess;
CREATE OR REPLACE FUNCTION AddControl_Dev_Sess(
	c_dev_sess_id BIGINT,
	c_dev_id BIGINT,
	c_dev_number VARCHAR(80) 
) RETURNS BIGINT
AS $$
	INSERT INTO control_dev_sess(dev_sess_id, dev_id, dev_number)
	VALUES(c_dev_sess_id, c_dev_id, c_dev_number)
	RETURNING id
$$
LANGUAGE SQL;