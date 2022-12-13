import { DBase, getDB } from "./DBase";


export class OrgsEntity {
    id: number = 0;
    name: string = '';
    full_name: string = '';
    inn: string = '';
    address: string = '';
    latitude: string = '';
    longitude: string = '';
    created_at: Date = new Date(Date.now());
    info: string = '';

    constructor() { }
}


export class OrgsTable {
    db: DBase;
    args: any;
    sess_code: string;

    constructor(_args: any, _sess_code: string) {
        this.db = getDB();
        this.args = _args;
        this.sess_code = _sess_code;
    }

    //Добавление организации
    async isertOrgs(): Promise<OrgsEntity[]> {
        await this.db.query("SELECT AddOrgs()");

        var result: OrgsEntity[] = new Array();
        return result;
    }

    //Получение всех организаций 
    async selectOrgs(): Promise<OrgsEntity[]> {
        var db_res = await this.db.query("SELECT * FROM SelectOrgs()");
        var result: OrgsEntity[] = new Array();
        for (var p in db_res.rows) { result.push(db_res.rows[p]); }
        //console.log(result);
        return result;
    }

}


