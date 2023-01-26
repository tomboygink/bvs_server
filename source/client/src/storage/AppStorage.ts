import { observable, action, computed, makeAutoObservable } from 'mobx';
import { IWSQuery, IWSResult, WSQuery } from '../../../xcore/WSQuery';

import { PageStorage } from './PageStorage';
import { AuthFormStorage } from './components/AuthFormStorage';
import { AppBarStorage } from './components/AppBarStorage';
import { ModalStorage } from './components/ModalStorage';
import { ModalLeftPanel } from './components/RegistationUsersStorage';
import { EditUsersStorage } from './components/EditUsersStorage'
import { WSocket } from './WSocket';
import {getCookie , setCookie, deleteCookie }  from './browserCookes'
import { UsersEntity } from '../../../xcore/dbase/Users';
import { DevsGroupStorage } from './components/DevsGroupStorage';
import {DevsStorage} from './components/DevsStorage';
import {SensorsStorage} from './components/SensorsStorage';
import {ChangeDevsGroups} from './components/ChangeDevsGroups'

// ********************************************************************************************************************************************************
// ХРАНИЛИЩЕ

class AppStorage {
    @observable main: PageStorage = null;
    @observable auth_form: AuthFormStorage = null;
    @observable app_bar:  AppBarStorage = null;
    @observable modal: ModalStorage = null;
    @observable reg_user: ModalLeftPanel = null;
    @observable edit_user: EditUsersStorage = null;
    @observable devs_groups: DevsGroupStorage = null;
    @observable change_devs_groups: ChangeDevsGroups = null;
    @observable devs : DevsStorage = null;
    @observable sensors : SensorsStorage = null;
    

    @observable dt:any = null;
    @observable dtUser:any = null;
    
    @action setdt(val:any){ this.dt = val; }
    @computed getdt():any{ return this.dt; }

    @action setdtUser(val :any) {this.dtUser = val }
    @computed getdtUser() : any { return this.dtUser}
 
    constructor() {
        this.main = new PageStorage();
        this.auth_form = new AuthFormStorage();
        this.app_bar = new AppBarStorage();
        this.modal = new ModalStorage();
        this.reg_user = new ModalLeftPanel();
        this.edit_user = new EditUsersStorage();
        this.devs_groups = new DevsGroupStorage();
        this.devs = new DevsStorage();
        this.sensors = new SensorsStorage();
        this.change_devs_groups = new ChangeDevsGroups();
        makeAutoObservable(this);

        // WSocket.get();
    }

    @action async onWSData(dt: IWSResult) {
        console.log("SOCKET RESULT", dt); 
        switch (dt.cmd) {
            case ('get_UserByAuth'): { this.auth_form.onGetUserByAuth(dt); } break;
            case ('get_UserBySessionCode'): { this.auth_form.onGetUserBySessionCode(dt); } break;
            case ('set_ChangePass'): { this.modal.onGetChangePass(dt); } break;
            case ('set_CUserData') : { this.modal.onGetCUserData(dt); } break;
            case ('set_ForgPass') : { this.auth_form.onSaveNewPass(dt); } break;
            case ('set_SaveNewPass') : {this.auth_form.onSaveNewPass(dt)} break;
            case ('get_Org') : {this.reg_user.setAllOrganization(dt)} break;
            case ('get_Jobs') : {this.reg_user.setAllJobsTitle(dt)} break;
            case ('get_AllUser') : {this.reg_user.setUsersAll(dt)} break;
            case ('get_DevsGroups') : {this.devs_groups.setDevsGroupsAll(dt)} break;
            case ('get_Devs') : {this.devs.setDevsAll(dt)} break;
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
    }
};

export const APP_STORAGE: AppStorage = new AppStorage();

