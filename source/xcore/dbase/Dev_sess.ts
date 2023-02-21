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
        console.log(result);
        return result;
    }*/

    async selectDevSess() {

        var start_date = new Date(this.args.sess_period_start).toISOString().slice(0, 19).replace('T', ' ');
        var end_date = new Date(this.args.sess_period_end).toISOString().slice(0, 19).replace('T', ' ');
        var db_res = await this.db.query("SELECT * FROM SelectDev_Sess ('" + this.args.dev_number + "', '" + start_date + "', '" + end_date + "')");

        //console.log(this.args.sess_period_start, " ", start_date);

        //console.log(db_res.rows[0].time_dev);
        //return JSON.stringify(db_res.rows);
        return this.objToString(db_res.rows);

    }
    objToString(obj: any, isArray?: boolean) {
        var isArray = isArray || false; // что нужно вернуть - массив или объект

        var sstr = "";
        if (isArray) { sstr += "["; } else { sstr += "{"; }

        var first = true;
        for (var k in obj) {

            if (typeof obj[k] == 'function') continue; // не включает методы - только JSON для переноса данных

            if (first) {
                first = false;
            } else {
                sstr += ',';
            }


            if (!isArray) { sstr += `"${k}":`; } // ключи для объекта

            // значения
            if (obj[k] === null) {
                sstr += 'null'
            } else if (Array.isArray(obj[k])) {
                sstr += this.objToString(obj[k], true)
            } else if ('object' == typeof obj[k]) {
                sstr += this.objToString(obj[k], false)
            } else if ('undefined' == typeof obj[k]) {
                sstr += 'null'; //'undefined'
            } else if ('string' == typeof obj[k]) {
                sstr += `"${this.escStr(obj[k])}"`;
            } else {
                sstr += obj[k]
            }

        }
        if (isArray) { sstr += "]"; } else { sstr += "}"; }
        return sstr;
    }
    escStr(str: string): string {
        var reti = str.replace(/[\\]/g, "\\\\");
        reti = reti.replace(/["]/g, '\\"');
        return reti;
    }



}
