import { DBase, getDB } from "./DBase";
import { dateTimeToSQL } from '../../xcore/dbase/DateStr'


export class ThermalWellEntity {
    id: number = 0;
    number: string = '';
    org_id: number = 0;
    group_id: number = 0;
    dev_id: number = 0;;
    created_at: Date = new Date(Date.now());
    info: string = '';

    constructor() { }
}

export class ThermalWellTable {
    db: DBase;
    args: any;
    sess_code: string;

    constructor(_args: any, _sess_code: string) {
        this.db = getDB();
        this.args = _args;
        this.sess_code = _sess_code;
    }

    //Добавление скважины в базу данных
    async insertThermalWell(): Promise<ThermalWellEntity[]> {
        var db_res = await this.db.query("INSERT INTO skvazhiny(number, org_id, group_id, dev_id, create_at) " +
            "VALUES(\'" + this.args.number + "\'," + this.args.org_id + "," + this.args.group_id + "," + this.args.dev_id + ",\'" + dateTimeToSQL(new Date(Date.now())) + "\') RETURNING  id");
        return db_res.rows[0].id;
    }

    //Получение всех скважин для списка 
    async selectThermalWell(): Promise<ThermalWellEntity[]> {
        var db_res = await this.db.query("SELECT * FROM skvazhiny");
        var result: ThermalWellEntity[] = new Array();
        for (var p in db_res.rows) { result.push(db_res.rows[p]); }
        return result;
    }

    //обновление данных о скважине
    async updateThermalWell() {
        var data = await this.db.query(
            "SELECT * FROM skvazhiny WHERE id = " + this.args.id
        );
        //console.log(data.rows)
        if (data.rows[0] === undefined || data.rows[0].id === this.args.id) {
            return false;
        } else {
            await this.db.query("UPDATE skvazhiny SET dev_id =" + this.args.dev_id + ", number = '"+this.args.number+"', group_id = "+this.args.group_id+
            ", org_id = "+this.args.org_id+" WHERE id = " + this.args.id);
            return true;
        }

    }
}
