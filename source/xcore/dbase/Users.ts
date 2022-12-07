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

    //Обновление данных по email
    async updateMail(): Promise<UsersEntity[]> {
        //обновление email
        await this.db.query("SELECT * FROM UpdateUserEmail('" + this.args.code + "', '" + this.sess_code + "')");
        //Получение актуальных данных
        var db_res = await this.db.query("SELECT * FROM SelectUserBySessCode ('" + this.sess_code + "')");
        var result: UsersEntity[] = new Array();
        for (var r in db_res.rows) {
            result.push(db_res.rows[r]);
        }
        return result
    }

    //Изменение данных пользователя 
    async updateUser(): Promise<UsersEntity[]> {
        var db_res = await this.db.query("SELECT * FROM UpdateUser('" + this.args.login + "','" +
            this.args.family + "','" + this.args.name + "','" + this.args.father + "','" + this.args.telephone + "','" + this.args.email + "','" + this.args.info + "')");
        db_res = await this.db.query("SELECT * FROM SelectUserBySessCode ('" + this.sess_code + "')");
    
        var result: UsersEntity[] = new Array();
        for (var r in db_res.rows) {
            result.push(db_res.rows[r]);
        }
        return result;

    }

    //Изменения пароля из панели управления
    async changePass(): Promise<UsersEntity[]> {
        //страный пароль
        var old_pass = crypto.createHmac('sha256', CONFIG.key_code).update(this.args.old_password).digest('hex');
        //генерация нового пароля 
        var pass = crypto.createHmac('sha256', CONFIG.key_code).update(this.args.new_password).digest('hex');
        var re_pass_code = crypto.createHmac('sha256', CONFIG.key_code).update(this.args.login+"_"+pass).digest('hex');
        //изменение re_pass_code
        await this.db.query("SELECT * FROM UpdateRePassCode ('" + this.args.login + "','" + re_pass_code + "')");
        //изменение пароля 
        var db_res = await this.db.query("SELECT * FROM ChangePass('" + this.sess_code + "', '" + this.args.login + "','" + pass + "','" + old_pass + "')");

        db_res = await this.db.query("SELECT * FROM SelectUserBySessCode ('" + this.sess_code + "')");
        var result: UsersEntity[] = new Array();
        for (var r in db_res.rows) {
            result.push(db_res.rows[r]);
        }
        if (crypto.createHmac('sha256', CONFIG.key_code).update(this.args.new_password).digest('hex') === result[0].password) {
            return result;
        }
        else { return []; }
    }

    //Забыли пароль
    async SelectUserLoginEmail():Promise<UsersEntity[]>{
        var db_res = await this.db.query("SELECT * FROM SelectUserLoginEmail ('" + this.args.login + "', '" + this.args.email + "')");
        var result: UsersEntity[] = new Array();
        for (var r in db_res.rows) {
            result.push(db_res.rows[r]);
        }
        return result;
    }

    async forgPass(): Promise<UsersEntity[]> {
        //обновление пароля шифрование нового пароля
        //получение актуальных данных
        //изменение re_pass_code //генерируется из email и пароля (нового) 

        //Генерация пароля
        var pass = crypto.createHmac('sha256', CONFIG.key_code).update(this.args.new_password).digest('hex');
        //Изменение re_pass_code и пароля
        await this.db.query("SELECT * FROM ForgPass ('"+this.args.email+"','"+this.args.login+"','"+pass+"','"+this.args.code+"')");

        var result: UsersEntity[] = new Array();
        return result;
    }

}