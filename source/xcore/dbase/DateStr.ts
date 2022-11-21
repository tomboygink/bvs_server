
//*******************************************************************************************************************************
// ПРЕОБРАЗОВАНИЯ ДАТЫ В СТРОКУ ТИПА "01.01.2021"

export function dateToStr(dt:Date):string{
    var reti = '';
    if(dt.getDate() < 10) { reti += "0" }; reti += dt.getDate(); reti += '.';
    if((dt.getMonth()+1) < 10) { reti += "0" }; reti += (dt.getMonth()+1); reti += '.';
    return reti + dt.getFullYear();
}


//*******************************************************************************************************************************
// ПРЕОБРАЗОВАНИЯ ДАТЫ В СТРОКУ ТИПА "01.01.2021 00:00:00"
export function dateTimeToStr(dt:Date):string{
    var dt_str = dateToStr(dt) + ' ';
    if(dt.getHours() < 10) { dt_str += "0" ; } dt_str += dt.getHours(); dt_str += ':';
    if(dt.getMinutes() < 10) { dt_str += "0"; } dt_str += dt.getMinutes(); dt_str += ':';
    if(dt.getSeconds() < 10) { dt_str += "0"; } dt_str += dt.getSeconds();
    return dt_str
}


//*******************************************************************************************************************************
// ПРЕОБРАЗОВАНИЯ ДАТЫ В СТРОКУ ТИПА SQL "2022-01-25 00:00:00"
export function dateTimeToSQL(dt:Date):string{
    var reti = dt.getFullYear() + '-';
    if((dt.getMonth()+1) < 10) { reti += "0" }; reti += (dt.getMonth()+1); reti += '-';
    if(dt.getDate() < 10) { reti += "0" }; reti += dt.getDate(); reti += ' ';

    if(dt.getHours() < 10) { reti += "0" ; } reti += dt.getHours(); reti += ':';
    if(dt.getMinutes() < 10) { reti += "0"; } reti += dt.getMinutes(); reti += ':';
    if(dt.getSeconds() < 10) { reti += "0"; } reti += dt.getSeconds();

    return reti
}


//*******************************************************************************************************************************
// ПОЛУЧИТЬ ДАТУ ИЗ СТРОКИ ТИПА "01.01.2021"

export function strToDate(str_dt:string):Date{
    var dtx = str_dt.trim().split(".");
    if(dtx.length > 2){
        var ret_dt = dtx[2].trim() + "-" + dtx[1].trim() + "-" + dtx[0].trim();
        var dres = Date.parse(ret_dt);
        //if(dres === NaN) return null;
        if(Number.isNaN(ret_dt) === true) return null;
        return new Date(dres);
    }
    return null; // (если строка не верная - может вернуть null)
}


//*******************************************************************************************************************************
// Получить дату из строки типа "01.01.2021 10:00:15" (DD.MM.YYYY hh:mm:ss)
// Если не верный формат строки - вернет null
export function strToDateTime(str_dt:string){
    var ret_dt = null;

    var dt_str = '';

    var d_t_arr = str_dt.split(" "); // отделим дату от времени

    if(d_t_arr.length > 0){
        // собираем дату
        var dtx = d_t_arr[0].trim().split(".");
        if(dtx.length > 2){
            dt_str += dtx[2].trim() + "-" + dtx[1].trim() + "-" + dtx[0].trim();
        }
    }

    if(d_t_arr.length > 1 && d_t_arr[1].trim() !== ''){
        // собираем время
        dt_str += "T" + d_t_arr[1].trim();
    }else{
        // по умолчанию
        dt_str += "T00:00:00"
    }

    ret_dt = Date.parse(dt_str);
    //if(ret_dt === NaN) return null;
    if(Number.isNaN(ret_dt) === true) return null;

    return ret_dt;
}


//*******************************************************************************************************************************
// Получить дату из строки SQL типа "2022-01-29 10:00:15" (YYYY-MM-DD hh:mm:ss)
// Если не верный формат строки - вернет null
export function sqlToDateTime(str_dt:string){
    var ret_dt = null;

    var dt_str = '';

    var d_t_arr = str_dt.split(" "); // отделим дату от времени

    if(d_t_arr.length > 0){
        // собираем дату
        var dtx = d_t_arr[0].trim().split("-");
        if(dtx.length > 2){
            dt_str += dtx[0].trim() + "-" + dtx[1].trim() + "-" + dtx[2].trim();
        }
    }

    if(d_t_arr.length > 1 && d_t_arr[1].trim() !== ''){
        // собираем время
        dt_str += "T" + d_t_arr[1].trim();
    }else{
        // по умолчанию
        dt_str += "T00:00:00"
    }

    ret_dt = Date.parse(dt_str);
    //if(ret_dt === NaN) return null;
    if(Number.isNaN(ret_dt) === true) return null;

    return ret_dt;
}





