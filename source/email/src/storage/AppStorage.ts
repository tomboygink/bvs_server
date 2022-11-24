import { observable, action, computed, makeAutoObservable } from 'mobx';
import { IWSQuery, IWSResult, WSQuery } from '../../../xcore/WSQuery';
import { WSocket } from './WSocket';

import {getCookie , setCookie, deleteCookie }  from '../storage/browserCookes'
// ********************************************************************************************************************************************************
// ХРАНИЛИЩЕ

class AppStorage {
    @observable code: string = null;
    @observable dt:any = null;

    constructor() {
        makeAutoObservable(this);

        // WSocket.get();
    }

   
 

    @action setCode(u:any){ this.code = u; } //устанавливает значение класса UsersEntity
    @computed getCode():any{ return this.code; } //возвращает значение класса UsersEntity

   

    /**
     * Получить пользователя по коду сессии из куков (пользователь уже заходил с этого браузера)
     * @returns 
     */

   

    async set_SendCode () {
        var ss_code = getCookie('sess_id');
        var q:IWSQuery = new WSQuery("set_MailCode");
        q.args = { code: this.getCode()};
        q.sess_code = ss_code;
        (await WSocket.get()).send(q);

    }
};

   
export const APP_STORAGE: AppStorage = new AppStorage();

