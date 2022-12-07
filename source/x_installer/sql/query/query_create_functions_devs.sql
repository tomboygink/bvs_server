--------------------------------------------------------------------------------------------Функция добавления устройства
DROP FUNCTION IF EXISTS AddDevs;
CREATE OR REPLACE FUNCTION AddDevs(
	c_group_dev_id BIGINT,
	c_number VARCHAR(80), 
	c_name VARCHAR(250), 
	c_latitude VARCHAR(60),
	c_longitude VARCHAR(60),
	c_sensors JSON,
	c_info TEXT
)
RETURNS VOID
AS $$
insert into devs (group_dev_id, number, name, latitude, longitude, sensors, info)
values (c_group_dev_id, c_number, c_name, c_latitude, c_longitude, c_sensors, c_info)
$$ LANGUAGE SQL;



--------------------------------------------------------------------------------------------Функция получения данных устройства по номеру устройства
DROP FUNCTION IF EXISTS SelectDevs;
CREATE OR REPLACE FUNCTION SelectDevs(
	c_number VARCHAR(80)
)
RETURNS TABLE (
	id BIGINT,
	group_dev_id BIGINT,
	number VARCHAR(80), 
	name VARCHAR(250), 
	latitude VARCHAR(60),
	longitude VARCHAR(60),
	sensors JSON,
	info TEXT
)
AS $$
SELECT * FROM devs WHERE number = c_number
$$ LANGUAGE SQL;
