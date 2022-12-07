import { DBase, getDB } from "./DBase";

export class Dev_sessEntity{
    id:number = 0;
    time_dev:Date = null;
    time_srv:Date = new Date(Date.now());
    dev_number:string = '';
    dev_id:number = 0;
    level_akb:number = 0;
    sess_data:string = '';
    constructor(){}
}