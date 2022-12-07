import { DBase, getDB } from "./DBase";

export class DevsEntity {
    id: number = 0;
    group_dev_id: number = 0;
    number: string = '';
    name: string = '';
    latitude: string = '';
    longitude: string = '';
    sensors: Object = {};
    info: string = '';

    constructor() { }
}

export class DevsTable {
    constructor(){}

    //------------------------------------------------------Получение данных устройства по номеру устройства
/*
    async selectDevs() { 
        var db_res = "SELECT * FROM SelectDevs('"++"')";        
    }*/
}