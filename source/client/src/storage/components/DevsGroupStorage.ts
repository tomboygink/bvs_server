import { observable, action, computed, makeAutoObservable } from 'mobx';
import { UsersEntity } from '../../../../xcore/dbase/Users';
import { IWSQuery, WSQuery, IWSResult } from '../../../../xcore/WSQuery';
import { WSocket } from '../WSocket';
import {getCookie , setCookie, deleteCookie }  from '../browserCookes';


export class DevsGroupStorage{

    @observable open_devs_list: boolean = false;
    @observable open_modal: boolean = false;
    @observable middle_form: any = '';


    @observable name:string = '';
    @observable key_org: any= ''
    @observable latitude:string = '';
    @observable longitude: string = '';
    @observable info: string = '';

    @observable devs_groups: Array<string> = []
    constructor(){
        makeAutoObservable(this);
    }

    @action setOpenListDev (val: boolean) {this.open_devs_list = val}
    @computed getOpenListDev() : boolean {return this.open_devs_list}

    @action setKeyOrg(val: any) { this.key_org = val;}
    @computed getKeyOrg(): any {return this.key_org;}

    @action setOpenModal (val: boolean) {this.open_modal = val}
    @computed getOpenModal() : boolean {return this.open_modal}

    @action setMiddleForm (val: any) {this.middle_form = val}
    @computed getMiddleForm() : any {return this.middle_form}

    @action setInfo (val: any) {this.info = val}
    @computed getInfo() : any {return this.info}


    /////////////////////////////////////////////////////////////////////////////место расположения устройства
    @action setName (val: string) {this.name = val}
    @computed getName() : string {return this.name}

    @action setLatitude (val: string) {this.latitude = val}
    @computed getLatitude() : string {return this.latitude}

    @action setLongitude (val: string) {this.longitude = val}
    @computed getLongitude() : string {return this.longitude}
    

    ///////////////////////////////////////////////Список расположений устройств
    @action setDevsGroups(val: Array<string>) {this.devs_groups = val;}
    @computed getDevsGroups() : Array<string> {return this.devs_groups}

    async set_NewDevGroup(name: string, value: any, _options?: any) {
        var sess_code = value;
        var q:IWSQuery = new WSQuery("set_NewDevGroup");
        q.args = {
            g_name: this.getName() || '',
            latitude:this.getLatitude() || '', 
            longitude:this.getLongitude() || '', 
            org_id:this.getKeyOrg() || '',
            parent_id: 0,
            ord_num: 0,
            deleted: false,
            g_info: this.getInfo() || ''
         }; 
          q.sess_code = sess_code;
         (await WSocket.get()).send(q); 
       }
 
       async get_DevsGroups(name: string, value: any, _options?: any) {  //// Отправляем запрос на получение расположений устройств
        var sess_code = value;
        var q:IWSQuery = new WSQuery("get_DevsGroups");
        q.args = {
            users_w: true,
            org_id: 1
        }; 
        q.sess_code = sess_code;
         (await WSocket.get()).send(q);  
    }

    setDevsGroupsAll(dt: IWSResult) { /* -----  Получаем всех пользователей   */
      this.setDevsGroups(dt.data);
     }

    }



