import { observable, action, computed, makeAutoObservable } from 'mobx';
import { UsersEntity } from '../../../../xcore/dbase/Users';
import { IWSQuery, WSQuery, IWSResult } from '../../../../xcore/WSQuery';
import { WSocket } from '../WSocket';
import {getCookie , setCookie, deleteCookie }  from '../browserCookes';
import { ThumbUpSharp } from '@mui/icons-material';


export class AuthFormStorage{

    @observable login: string = ''; //observable определяет отслеживаемое поле, в котором хранится состояние.
    @observable password:string = '';
    
    @observable user: UsersEntity = null;

    @observable cmderror:any = null;

    @observable dt:string = null;  ///куки

    constructor(){
        makeAutoObservable(this);
    }

    @action setLogin(val:string){ this.login = val; } //устанавливает значение поля - Логин
    @computed getLogin():string{ return this.login; } //возвращает значение поля - Логин (отмечает геттер)

    @action setPassword(val:string){ this.password = val; } //устанавливает значение поля - Пароль
    @computed getPassword():string{ return this.password; } //возвращает значение поля - Пароль

    @action setUser(u:UsersEntity){ this.user = u; } //устанавливает значение класса UsersEntity
    @computed getUser():UsersEntity{ return this.user; } //возвращает значение класса UsersEntity

    @action setCmderror(u:any){ this.cmderror = u; } //устанавливает значение класса UsersEntity
    @computed getCmderror():any{ return this.cmderror; } //возвращает значение класса UsersEntity

    @action setdt(u:string){ this.dt = u; } //устанавливает значение класса UsersEntity
    @computed getdt():string{ return this.dt; } //возвращает значение класса UsersEntity

 

    async get_UserByAuth(){
        var q:IWSQuery = new WSQuery("get_UserByAuth");
        q.args = { login: this.getLogin(), password:this.getPassword() };
        (await WSocket.get()).send(q);
    }


    setUserWS(dt: IWSResult){
        if(dt.error !== null && dt.error.trim() !== ''){}
        var data:UsersEntity[] = new Array();
        for(var key in dt.data) data.push( dt.data[key] );

        if(data.length > 0){
            if(data[0].id > 0){
                // СОХРАНИТЬ ПОЛЬЗОВАТЕЛЯ В ХРАНИЛИЩЕ ДАННЫХ КАК ТЕКУЩЕГО ПОЛЬЗОВАТЕЛЯ СИСТЕМЫ !!!!!!!
                setCookie('sess_id', dt.code);
                this.setdt(dt.code);
                this.setUser(data[0]);
            }
        }
    }

    onGetUserByAuth(dt: IWSResult){
        this.setUserWS(dt);
            this.setCmderror(dt.error);
    }

    onGetUserBySessionCode(dt: IWSResult){
        this.setUserWS(dt);
    }

}
