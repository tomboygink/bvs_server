import { observable, action, computed, makeAutoObservable } from 'mobx';
import { IWSQuery, IWSResult, WSQuery } from '../../../xcore/WSQuery';
import { PageStorage } from './PageStorage';
import { WSocket } from './WSocket';
import { UsersEntity } from '../../../xcore/dbase/Users';

// ********************************************************************************************************************************************************
// ХРАНИЛИЩЕ

class AppStorage {
    @observable main: PageStorage = null;
    @observable code: string = null;

    @observable dt:any = null;
    
    @action setdt(val:any){ this.dt = val; }
    @computed getdt():any{ return this.dt; }
 
    constructor() {
        this.main = new PageStorage();
        makeAutoObservable(this);

        // WSocket.get();
    }

    @action setCode(u:any){ this.code = u; } //устанавливает значение класса UsersEntity
    @computed getCode():any{ return this.code; } //возвращает значение класса UsersEntity

    @action async onWSData(dt: IWSResult) {
        console.log("SOCKET RESULT", dt); 
        this.setdt(dt)
        switch (dt.cmd) {
            default: { } break;
        }
    }

    /**
     * Получить пользователя по коду сессии из куков (пользователь уже заходил с этого браузера)
     * @returns 
     */


    async set_sendCode () {
        var q:IWSQuery = new WSQuery("set_Code");
        q.args = { code: this.getCode()};
        (await WSocket.get()).send(q);

    }
};

   
export const APP_STORAGE: AppStorage = new AppStorage();

