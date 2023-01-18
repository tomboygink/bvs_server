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

    //Добавление группы устройства 
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

    //Получение группы устройства 
    async selectDevsGroups() {
        var groups: any = {
            group: {},
            id: 0,
            p_id: 0,
            childs: new Array(),
            devs: new Array(),
            update: false
        }


        if (this.args.users_w === true) {
            var roots_gr = await this.db.query("SELECT * FROM devs_groups WHERE parent_id=0 ");
            for (var i in roots_gr.rows) {
                var dev = await this.db.query("SELECT * FROM devs WHERE group_dev_id = " + roots_gr.rows[i].id);
                groups.childs.push({
                    group: roots_gr.rows[i],
                    id: roots_gr.rows[i].id,
                    p_id: roots_gr.rows[i].parent_id,
                    childs: new Array(),
                    devs: dev.rows[i],
                    update: false

                })
            }
        }
        else {
            var roots_gr = await this.db.query("SELECT * FROM devs_groups WHERE parent_id=0 and org_id=" + this.args.org_id);
            for (var i in roots_gr.rows) {
                var dev = await this.db.query("SELECT * FROM devs WHERE group_dev_id = " + roots_gr.rows[i].id);
                groups.childs.push({
                    group: roots_gr.rows[i],
                    id: roots_gr.rows[i].id,
                    p_id: roots_gr.rows[i].parent_id,
                    childs: new Array(),
                    devs: dev.rows[i],
                    update: false

                })
            }
        }



        for (var i in groups.childs) {
            groups.childs[i].childs = await this._d_tree(groups.childs[i]);
        }


        var result = this.objToString(groups);

//        console.log(result);
        return result

    }


    async _d_tree(childs: any) {

        var reti = new Array();
        var grs = await this.db.query("SELECT * FROM devs_groups WHERE parent_id=" + childs.id);
        for (var i in grs.rows) {
            var dev = await this.db.query("SELECT * FROM devs WHERE group_dev_id=" + grs.rows[i].id);
            reti.push({
                group: grs.rows[i],
                id: grs.rows[i].id,
                pid: grs.rows[i].parent_id,
                childs: await this._d_tree(grs.rows[i]),
                devs: dev.rows[i],
                updated: false
            });
        }

        return reti;

    }


    objToString (obj:any, isArray?:boolean){
        var isArray = isArray || false; // что нужно вернуть - массив или объект
    
        var sstr = "";
        if(isArray){sstr += "[";}else{sstr += "{";}
    
        var first = true;
        for(var k in obj){
    
            if(typeof obj[k] == 'function') continue; // не включает методы - только JSON для переноса данных
    
            if(first){
                first = false;
            }else{
                sstr += ',';
            }
            
    
            if(!isArray){ sstr += `"${k}":`; } // ключи для объекта
    
            // значения
            if(obj[k] === null){
                sstr += 'null'
            }else if(Array.isArray(obj[k])){
                sstr += this.objToString(obj[k], true)
            }else if('object' == typeof obj[k]){
                sstr += this.objToString(obj[k], false)
            }else if('undefined'== typeof obj[k]){
                sstr += 'null'; //'undefined'
            }else if('string'== typeof obj[k]){
                sstr += `"${this.escStr(obj[k])}"`;
            }else{
                sstr += obj[k]
            }
    
        }
        if(isArray){sstr += "]";}else{sstr += "}";}
        return sstr;
    }

    escStr(str:string):string{
        var reti = str.replace(/[\\]/g, "\\\\");
        reti = reti.replace(/["]/g, '\\"');
        return reti;
    }
}