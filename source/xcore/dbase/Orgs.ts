import { DBase, getDB } from "./DBase";


export class OrgsEntity{
    id:number = 0;
    name:string = '';
    full_name:string = '';
    inn:string = '';
    address:string = '';
    latitude:string = '';
    longitude:string = '';
    created_at:Date =  new Date(Date.now());
    info:string = '';

    constructor(){}
}

/*
export class OrgsTable{
    constructor(){}

    async selectAll():Promise<OrgsEntity[]>{
        var db:DBase = getDB();
        var db_res = await db.query("SELECT * FROM orgs");
        var result:OrgsEntity[] = new Array();
        for(var p in db_res.rows){ result.push(db_res.rows[p]); }
        return result;
    }
    
}
*/

