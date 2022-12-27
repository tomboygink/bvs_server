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


--------------------------------------------------------------------------------------------Функция получения данных устройств по группе 
DROP FUNCTION IF EXISTS SelectDevs;
CREATE OR REPLACE FUNCTION SelectDevs(
	c_group_dev_id BIGINT,
	c_deleted BOOLEAN
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
SELECT * FROM devs WHERE group_dev_id = c_group_dev_id and deleted = c_deleted
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



