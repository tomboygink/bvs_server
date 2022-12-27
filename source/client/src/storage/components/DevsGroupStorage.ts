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
    

    async set_NewDevGroup(name: string, value: any, _options?: any) {
        var sess_code = value;
        var q:IWSQuery = new WSQuery("set_NewDevGroup");
        q.args = {
            g_name: this.getName() || '',
            latitude:this.getLatitude() || '', 
            longitude:this.getLongitude() || '', 
            org_id:this.getKeyOrg() || '',
            ord_num: '',
            deleted: false,
            g_info: this.getInfo() || ''
         }; 
          q.sess_code = sess_code;
         (await WSocket.get()).send(q); 
       }
    }


