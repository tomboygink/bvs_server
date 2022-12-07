//импорт базы данных
import { DBase, getDB } from "../xcore/dbase/DBase"
import { time_to_datetime } from "../xcore/dbase/DateStr"

export class ServerData{

    data_str:string;
    s_ind:number;

    data_arr:Array<string>;

    db:DBase;

    constructor(_data_str:string, _s_ind:number){
        this.data_str = _data_str;
        this.s_ind = _s_ind;
        this.data_arr = [];
        this.db = getDB();
    }

    async Run(){
        console.log(this.s_ind, "\x1b[0m >> " + this.data_str);

        //разбираем строку формата csv
        var dt_arr_0 = this.data_str.split(",");
        for (var d in dt_arr_0) 
        {
            if (dt_arr_0[d].trim()!=''){
                this.data_arr.push(dt_arr_0[d].trim());
            }
        }

        //Ошибка данных для парсера
        if(this.data_arr.length<2)
        {
            console.log(this.s_ind, "\x1b[31m >>", this.data_str);
            return;
        }

         //Парсер данных 
        //time 
        var TIME = time_to_datetime(this.data_arr[1]);
        this.data_arr[0] = "-";
        this.data_arr[1] = "-";

        //number 
        var NUMBER = null;
        var NUMBER_I = this.data_arr.indexOf("Number");
        this.data_arr[NUMBER_I] = "-";
        if(NUMBER_I>0)
        {
            NUMBER = (this.data_arr[NUMBER_I+1]).trim();
        }
        this.data_arr[NUMBER_I+1] = "-";

        //akb 
        var AKB = null;
        var AKB_I = this.data_arr.indexOf("AKB");
        this.data_arr[AKB_I] = "-";
        if(AKB_I>0)
        {
            AKB = (this.data_arr[AKB_I+1]).trim();
        }
        this.data_arr[AKB_I+1] = "-";

        //sensors
        var SENSORS = [];
        var SENSORS_I = this.data_arr.indexOf("Sensors");
        this.data_arr[SENSORS_I] = "-";
        if(SENSORS_I>0)
        {
            for(var d in this.data_arr)
            {
                if(this.data_arr[d].trim()!=='-' && !isNaN(Number(this.data_arr[d].trim()))) { SENSORS.push(Number(this.data_arr[d].trim())); }
                else{ if (this.data_arr[d].trim() !== '-') SENSORS.push("---"); }
            }
        }

        /*console.log(" ВРЕМЯ ", TIME);
        console.log(" НОМЕР УСТРОЙСТВА ",NUMBER);
        console.log(" ЗАРЯД УСТРОЙСТВА " ,AKB);
        console.log("Данные с сенсеров ", SENSORS);*/
        
        //ошибки парсера данных 
        var errors = false;
        var info_err = "";
        if(TIME == null) { 
            info_err += "ВРЕМЯ НЕ СООТВЕТСВУЕТ ФОРМАТУ"; 
            errors = true;
        }
        if(NUMBER == null) {
            info_err += "ДАННОГО УСТРОЙСТВА НЕТ В БАЗЕ ДАННЫХ";
            errors = true;
        }
        if(SENSORS.length < 1){
            info_err+="ДАННЫХ ПО СЕНСЕРАМ НА УСТРОЙСТВЕ НЕТ"
            errors = true;
        }
        if (SENSORS.indexOf("---") >= 0) { 
            info_err += " ОШИБКА ДАННЫХ НА СЕНСОРАХ (ПРОВЕРЬТЕ КАК ПЕРЕДАЕТ УСТРОЙСТВО);"; 
            errors = true; 
        }
        if(NUMBER=="1111"){
            info_err+= "УСТРОЙСТВО РАБОТАЕТ НЕ ИСПРАВНО"
            errors = true;
        }
        if(errors)
        {
            console.log(this.s_ind, "\x1b[35m", this.data_str, info_err);
            return;
        }


        //ДОБАВИТЬ СОХРАНЕНИЕ В БАЗУ ДАННЫХ
    }


}