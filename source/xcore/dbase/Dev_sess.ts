import { DBase, getDB } from "./DBase";
import { dateTimeToSQL } from '../../xcore/dbase/DateStr'

export class Dev_sessEntity {
    id: number = 0;
    time_dev: Date = null;
    time_srv: Date = new Date(Date.now());
    dev_number: string = '';
    dev_id: number = 0;
    level_akb: number = 0;
    sess_data: string = '';
    constructor() { }
}

export class Dev_sessTable {
    db: DBase;
    args: any;
    sess_code: string;
    constructor(_args: any, _sess_code: string) {
        this.db = getDB();
        this.args = _args;
        this.sess_code = _sess_code;
    }

    //Получение сессий устройства за определенный период
    /*async selectDevSess(): Promise<Dev_sessEntity[]>{
        var start_date = new Date(this.args.sess_period_start).toISOString().slice(0, 19).replace('T', ' ');
        var end_date = new Date(this.args.sess_period_end).toISOString().slice(0, 19).replace('T', ' ');
        var db_res = await this.db.query("SELECT * FROM SelectDev_Sess ('"+this.args.dev_number+"', '"+start_date+"', '"+end_date+"')");
        var result: Dev_sessEntity[] = new Array();
        for (var r in db_res.rows) {
            //console.log(db_res.rows[r])
            result.push(db_res.rows[r]);
        }
        //console.log(result);
        return result;
    }*/

    async selectDevSess() {

        var start_date = new Date(this.args.sess_period_start).toISOString().slice(0, 19).replace('T', ' ');
        var end_date = new Date(this.args.sess_period_end).toISOString().slice(0, 19).replace('T', ' ');
        var db_res = await this.db.query("SELECT * FROM SelectDev_Sess ('" + this.args.dev_number + "', '" + start_date + "', '" + end_date + "')");


        return JSON.stringify(db_res.rows);

    }



}
