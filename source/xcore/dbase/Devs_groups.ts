import { DBase, getDB } from "./DBase";

export class Devs_groupsEntity{
    id:number = 0;
    parent_id:number = 0;
    g_name:string = '';
    latitude:string = ''; 
    longitude:string = '';
    org_num:number = 0;
    g_info:string = '';
    deleted:boolean = false;
    
    constructor(){}
}