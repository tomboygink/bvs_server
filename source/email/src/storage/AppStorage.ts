import { observable, action, computed, makeAutoObservable } from 'mobx';
import { IWSQuery, IWSResult, WSQuery } from '../../../xcore/WSQuery';
import { WSocket } from './WSocket';

import {getCookie , setCookie, deleteCookie }  from '../storage/browserCookes';

import { UsersEntity } from '../../../xcore/dbase/Users';



import { AuthFormStorage } from '../../../client/src/storage/components/AuthFormStorage';

// ********************************************************************************************************************************************************
// ХРАНИЛИЩЕ

class AppStorage {
    @observable code: string = null;
    @observable dt:any = null;
    @observable error: boolean = false;
    @observable error_mass: string = null;
   

   

    @action setCode(u:string){ this.code = u; } 
    @computed getCode():string{ return this.code; } 
    
    @action setError(u:boolean){ this.error = u; } 
    @computed getError():boolean{ return this.error; } 

    @action setErrorMass(u:string) {this.error_mass = u ;}
    @computed getErorMass():string {return this.error_mass; } 
    
     
    constructor() {
        makeAutoObservable(this);
        
       
    }

    /**
     * Получить пользователя по коду сессии из куков (пользователь уже заходил с этого браузера)
     * @returns 
     */

   
    async set_SendCode () {

        console.log('SendCode', this.getCode())
        var ss_code = getCookie('sess_id');
        var q:IWSQuery = new WSQuery("set_MailCode");
        if (this.getCode() === null) {
            this.setError(true);
            this.setErrorMass('Введите код подтверждения')
        }
        else {
            this.setError(false);
            this.setErrorMass('')
            q.args = { code: this.getCode()};
            q.sess_code = ss_code;
            (await WSocket.get()).send(q);
            window.location.assign('http://127.0.0.1:3040/');
        }
    }
};
 
export const APP_STORAGE: AppStorage = new AppStorage();

