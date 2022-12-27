import { DBase, getDB } from "./DBase";

export class Devs_groupsEntity {
    id: number = 0;
    parent_id: number = 0;
    g_name: string = '';
    latitude: string = '';
    longitude: string = '';
    org_id: number = 0;
    org_num: number = 0;
    deleted: boolean = false;
    g_info: string = '';

    constructor() { }
}

export class Devs_groupsTable {
    db: DBase;
    args: any;
    sess_code: string;
    constructor(_args: any, _sess_code: string) {
        this.db = getDB();
        this.args = _args;
        this.sess_code = _sess_code;
    }

    async insertDevsGroups(): Promise<Devs_groupsEntity[]> {
        var db_res = await this.db.query("SELECT AddDevs_Group(CAST ('" + this.args.parent_id + "' AS BIGINT), " +
            "CAST('" + this.args.g_name + "' AS VARCHAR(250))," +
            "CAST('" + this.args.latitude + "' AS VARCHAR(60)), " +
            "CAST('" + this.args.longitude + "' AS VARCHAR(60)), " +
            "CAST('" + this.args.org_id + "' AS BIGINT), " +
            "CAST('" + this.args.ord_num + "' AS INTEGER), " +
            "CAST('" + this.args.deleted + "' AS BOOLEAN), " +
            "CAST('" + this.args.g_info + "' AS TEXT)) AS id");
        var result: Devs_groupsEntity[] = new Array();
        for (var p in db_res.rows) { result.push(db_res.rows[p]); }
        return result;
    }

    async selectDevsGroups(): Promise<Devs_groupsEntity[]> {
        //Если администратор 
        if (this.args.users_w === true) {
            var db_res = await this.db.query("SELECT * FROM SelectDevs_Group_OrgId('%')");
        } 
        //Обычный пользователь 
        else {var db_res = await this.db.query("SELECT * FROM SelectDevs_Group_OrgId('" + this.args.org_id + "')");}
        var result: Devs_groupsEntity[] = new Array();
        for (var p in db_res.rows) { result.push(db_res.rows[p]); }
        return result;
    }
}