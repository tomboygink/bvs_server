import { observable, action, computed, makeAutoObservable } from 'mobx';
import { IWSQuery, IWSResult, WSQuery } from '../../../xcore/WSQuery';
import { PageStorage } from './PageStorage';
import { AuthFormStorage } from './components/AuthFormStorage';
import { AppBarStorage } from './components/AppBarStorage';
import { PersonalAccauntStorage } from './components/PersonalAccauntStorage';
import { WSocket } from './WSocket';
import {getCookie , setCookie, deleteCookie }  from './browserCookes'
import { UsersEntity } from '../../../xcore/dbase/Users';

// ********************************************************************************************************************************************************
// ХРАНИЛИЩЕ

class AppStorage {
    @observable main: PageStorage = null;
    @observable auth_form: AuthFormStorage = null;
    @observable app_bar:  AppBarStorage = null;
    @observable personal_acc: PersonalAccauntStorage = null;

    
 
    constructor() {
        this.main = new PageStorage();
        this.auth_form = new AuthFormStorage();
        this.app_bar = new AppBarStorage();
        this.personal_acc = new PersonalAccauntStorage();
        makeAutoObservable(this);

        // WSocket.get();
    }

    @action async onWSData(dt: IWSResult) {
        // console.log("SOCKET RESULT", dt); 
        switch (dt.cmd) {
            case ('get_UserByAuth'): { this.auth_form.onGetUserByAuth(dt); } break;
            case ('get_UserBySessionCode'): { this.auth_form.onGetUserBySessionCode(dt); } break;
            default: { } break;
        }
    }

    /**
     * Получить пользователя по коду сессии из куков (пользователь уже заходил с этого браузера)
     * @returns 
     */
    async get_UserBySessionCode(){
        var ss_code = getCookie('sess_id');
        if(ss_code === undefined) return;

        var q:IWSQuery = new WSQuery('get_UserBySessionCode', { code: ss_code });
        (await WSocket.get()).send(q);
        console.log(q); 
    }

   
};

export const APP_STORAGE: AppStorage = new AppStorage();

