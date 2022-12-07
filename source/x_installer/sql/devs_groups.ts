export const devs_groups_table = {
    sql: 
    `
    DROP TABLE IF EXISTS devs_groups;
    CREATE TABLE devs_groups
    (
        "id" BIGSERIAL NOT NULL PRIMARY KEY,
        "parent_id" BIGINT NOT NULL DEFAULT(0),
        "g_name" CHARACTER VARYING(250) NOT NULL DEFAULT(''),
        "latitude" CHARACTER VARYING(60) NOT NULL DEFAULT('0.0'),
        "longitude" CHARACTER VARYING(60) NOT NULL DEFAULT('0.0'),
        "ord_num" INTEGER NOT NULL DEFAULT(0),
        "g_info" TEXT NOT NULL DEFAULT(''),
	    "deleted" BOOL NOT NULL DEFAULT(FALSE)
    );
    COMMENT ON TABLE devs_groups IS 'Группы устройств по местоположению';
    COMMENT ON COLUMN devs_groups.parent_id IS 'Родительская группа';
    COMMENT ON COLUMN devs_groups.g_name IS 'Наименование группы (отображается в дереве)';
    COMMENT ON COLUMN devs_groups.latitude IS 'Географическая широта';
    COMMENT ON COLUMN devs_groups.longitude IS 'Географическая долгота';
    COMMENT ON COLUMN devs_groups.ord_num IS 'Порядок следования групп';
    COMMENT ON COLUMN devs_groups.g_info IS 'Информация о группе';
    COMMENT ON COLUMN devs_groups.deleted IS 'Группа удалена';
    `,
    args: new Array()
};