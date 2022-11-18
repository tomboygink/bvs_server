import { DBase, getDB } from "./DBase";
import { dateTimeToSQL } from "../dbase/DateStr"

import crypto from 'crypto';
import { CONFIG } from '../../xcore/config';

export class SessionsEntity {
    id: number = 0;
    uid: number = 0;
    expires: Date = null;
    created_at: Date = new Date(Date.now());
    sess_code: string = '';
    sess_data: Object = { "data": [] };

    constructor() { }
}

export class SessionsTable {
    db: DBase;
    args: any;

    constructor(_args: any) {
        this.db = getDB();
        this.args = _args;

    }

    //Выбор сессии по коду
    async selectSessCode(): Promise<SessionsEntity[]> {
        var db_res = await this.db.query("SELECT * FROM SelectSessCode ('" + this.args.code + "')");
        var result: SessionsEntity[] = new Array();
        for (var r in db_res.rows) {
            result.push(db_res.rows[r]);
        }
        return result;
    }


    //Выбор всех сессий пользователя
    async selectAllSess(): Promise<SessionsEntity[]> {

        var db_res = await this.db.query("SELECT * FROM sessions")
        var result: SessionsEntity[] = new Array();
        for (var r in db_res.rows) {
            result.push(db_res.rows[r]);
        }
        return result;
    }

    //добавление сессии
    async insertSess() {
        //получение ID пользователя
        var db = await this.db.query("SELECT SelectIdUser ('" + this.args.login + "', '" + crypto.createHmac('sha256', CONFIG.key_code).update(this.args.password).digest('hex') + "')");
        //Установка времени сесии 15 дней
        if (db.rows[0].selectiduser !== null) {

            const date = new Date;
            date.setDate(date.getDate() + 15);
            // получаем id для записи 
            var id_q = await this.db.query("select max(id) from sessions");
            var id: number = 0;
            //если записей в Sessions не было то присваеваем 1
            if (id_q.rows[0].max === null) { id++; }
            //иначе к последней записи добавляем 1 
            else { id = parseInt(id_q.rows[0].max) + 1 }

            //генерируем зашифрованный код
            var sess = crypto.createHmac('sha256', CONFIG.key_code).update(id + "_" + dateTimeToSQL(date) + "_" + db.rows[0].selectiduser).digest('hex'); 3

            //записываем в Sessions, используя функцию
            await this.db.query("select addusersession (cast (" + db.rows[0].selectiduser + " as integer), cast ('" + dateTimeToSQL(date) + "' as timestamp), cast ('" + dateTimeToSQL(new Date(Date.now())) + "' as timestamp), cast('" + sess + "' as varchar(250)), cast('{\"data\":[]}' as json));");
            return sess;
        }
        return '';
    }

}