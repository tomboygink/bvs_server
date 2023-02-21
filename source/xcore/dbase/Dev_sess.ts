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

        var dev_sess:any = {
            id: 0,
            time_dev: '',
            time_srv: '',
            dev_number:'',
            dev_id:0,
            level_akb: 0.0,
            sess_data: ''
        };


        var start_date = new Date(this.args.sess_period_start).toISOString().slice(0, 19).replace('T', ' ');
        var end_date = new Date(this.args.sess_period_end).toISOString().slice(0, 19).replace('T', ' ');
        var db_res = await this.db.query("SELECT * FROM SelectDev_Sess ('" + this.args.dev_number + "', '" + start_date + "', '" + end_date + "')");
        
        var result: Dev_sessEntity[] = new Array();
        for (var i in db_res.rows) {
            dev_sess = {
                id: db_res.rows[i].id,
                time_dev: new Date(db_res.rows[i].time_dev).toISOString().slice(0,19).replace('T', ' '),
                time_srv: new Date(db_res.rows[i].time_srv).toISOString().slice(0,19).replace('T', ' '),
                dev_number: db_res.rows[i].dev_number,
                dev_id: db_res.rows[i].dev_id,
                level_akb: db_res.rows[i].level_akb,
                sess_data: db_res.rows[i].sess_data
            }
            result.push(dev_sess);

        }
        //console.log(result);
        return result;
    }
   

}
