import { DBase, getDB } from "./DBase";
import { dateTimeToSQL } from '../../xcore/dbase/DateStr'

export class Dev_povsEntity {
    id: number = 0;
    dev_id: number = 0;
    dev_number: string = '0';
    start_povs: Date = null;
    end_povs: Date = null;
    old_dev_povs: number = 0;
    constructor() { }
}

export class Dev_povsTable {
    db: DBase;
    args: any;
    sess_code: string;
    constructor(_args: any, _sess_code: string) {
        this.db = getDB();
        this.args = _args;
        this.sess_code = _sess_code;
    }

    //Добавление/Обновление поверочного интервала 
    async insertDev_povs(): Promise<Dev_povsEntity[]> {
        var db_res = await this.db.query("SELECT AddDev_Povs(" +
            "CAST (" + this.args.dev_id + " AS BIGINT)," +
            "CAST ('" + this.args.dev_number + "' AS VARCHAR(80)), " +
            "CAST ('" + dateTimeToSQL(new Date(this.args.start_povs)) + "' AS TIMESTAMP), " +
            "CAST ('" + dateTimeToSQL(new Date(this.args.end_povs)) + "' AS TIMESTAMP), " +
            "CAST ('" + this.args.old_dev_povs + "' AS BIGINT)) AS id");
        var result: Dev_povsEntity[] = new Array();
        for (var p in db_res.rows) { result.push(db_res.rows[p]); }
        return result;
    }

    async selectDev_povs():Promise<Dev_povsEntity[]>
    {
        var db_res = await this.db.query("SELECT * FROM SelectDev_Povs('" + 
        this.args.id + "', '"+this.args.dev_number+"')");
        var result:Dev_povsEntity[] = new Array();
        for(var p in db_res.rows) {result.push(db_res.rows[p]);}
        return result;
    }
}
