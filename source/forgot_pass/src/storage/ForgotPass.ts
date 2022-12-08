import { observable, action, computed, makeAutoObservable } from 'mobx';




import { AuthFormStorage } from '../../../client/src/storage/components/AuthFormStorage';

// ********************************************************************************************************************************************************
// ХРАНИЛИЩЕ

class FORGOTPASS {
    @observable code: string = null;

   

    @action setCode(u:string){ this.code = u; } 
    @computed getCode():string{ return this.code; } 
    

    
     
    constructor() {
        makeAutoObservable(this);
        
       
    }

    /**
     * Получить пользователя по коду сессии из куков (пользователь уже заходил с этого браузера)
     * @returns 
     */

   
    
};
 
export const FORGOT_PASS: FORGOTPASS = new FORGOTPASS();

