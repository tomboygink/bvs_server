import { DBase, getDB } from "./DBase";
import crypto from 'crypto';
import { CONFIG } from '../../xcore/config';

import { SessionsTable } from '../dbase/Sessions';


export class UsersEntity {
    id: number = 0;
    login: string = '';
    password: string = '';
    family: string = '';
    name: string = '';
    father: string = '';
    telephone: string = '';
    email: string = '';
    org_id: number = 0;
    job_title_id: number = 0;
    roles_ids: Object = {};
    user_data: Object = {};
    mail_code: string = '';
    act_mail: boolean = false;
    re_password_code: string = '';
    deleted: boolean = false;
    deleted_date: Date = null;
    created_at: Date = new Date(Date.now());
    info: string = '';
    constructor() { }
}

export class UserTable {
    db: DBase;
    args: any;
    sess_code: string;
    constructor(_args: any, _sess_code: string) {
        this.db = getDB();
        this.args = _args;
        this.sess_code = _sess_code;

    }

    //Поиск пользователя по логину и паролю
    async selectUser(): Promise<UsersEntity[]> {
        var db_res = await this.db.query("SELECT * FROM SelectUser ('" + this.args.login + "', '" + crypto.createHmac('sha256', CONFIG.key_code).update(this.args.password).digest('hex') + "')");
        var result: UsersEntity[] = new Array();
        for (var r in db_res.rows) {
            result.push(db_res.rows[r]);
        }
        return result;
    }

    //Поиск пользователя по коду сессии 
    async selectUserBySessCode(): Promise<UsersEntity[]> {
        var db_res = await this.db.query("SELECT * FROM SelectUserBySessCode ('" + this.args.code + "')");
        var result: UsersEntity[] = new Array();
        for (var r in db_res.rows) {
            result.push(db_res.rows[r]);
        }
        return result;
    }

    //Изменение данных пользователя 
    async updateUser(): Promise<UsersEntity[]> {
        var db_res = await this.db.query("SELECT * FROM UpdateUser('" + this.sess_code + "', '"+this.args.login+"','"+
        this.args.family+"','"+this.args.name+"','"+this.args.father+"','"+this.args.telephone+"','"+this.args.email+"','"+this.args.info+"')");
        var result: UsersEntity[] = new Array();
        for (var r in db_res.rows) {
            result.push(db_res.rows[r]);
        }
        return result;

    }

    //Изменения пароля из панели управления
    async changePass():Promise<UsersEntity[]>{
        var db_res = await this.db.query("SELECT * FROM ChangePass('" + this.sess_code + "', '"+this.args.login+"','"+ crypto.createHmac('sha256', CONFIG.key_code).update(this.args.new_password).digest('hex')+"','"+ crypto.createHmac('sha256', CONFIG.key_code).update(this.args.old_password).digest('hex') +"')");
        var result: UsersEntity[] = new Array();
        for (var r in db_res.rows) {
            result.push(db_res.rows[r]);
        }
        return result;
    }

}