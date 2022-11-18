import { DBase, getDB } from "./DBase";


export class Jobs_titlesEntity{
    id:number = 0;
    org_id:number = 0;
    name:string = '';
    created_at:Date =  new Date(Date.now());
    info:string = '';

    constructor(){}
}