import { observable, action, computed, makeAutoObservable } from 'mobx';
import { UsersEntity } from '../../../../xcore/dbase/Users';
import { IWSQuery, WSQuery, IWSResult } from '../../../../xcore/WSQuery';
import { WSocket } from '../WSocket';
import {getCookie , setCookie, deleteCookie }  from '../browserCookes';

export class DevsStorage{
    @observable devs: Array<string> = [];

    @observable item :  Array<any> = [];
    @observable id_devs: string = '';

    @observable open_modal: boolean = false;
    
    constructor(){
        makeAutoObservable(this);
    }

    @action setDevs ( val : Array<string> ) {this.devs = val};
    @computed getDevs (): Array<string> {return this.devs};

    @action setItem ( val :  Array<any> ) {this.item = val};
    @computed getItem ():  Array<any> {return this.item};

    @action setIdDevs ( val : string ) {this.id_devs = val};
    @computed getIdDevs ():  string {return this.id_devs};

    @action setOpenModal ( val : boolean ) {this.open_modal = val};
    @computed getOpenModal ():  boolean {return this.open_modal};



   async get_Devs (name: string, value: any, _options?: any){
    var sess_code = value;
    var q: IWSQuery = new WSQuery('get_Devs');
    q.args = {
        org_id: '1'
    };
    q.sess_code = sess_code;
    (await WSocket.get()).send(q); 
   }


   async set_NewDevs(name: string, value: any, _options?: any) {
    var sess_code = value;
    var q:IWSQuery = new WSQuery("set_NewDevs");
    q.args = {
        group_dev_id: 1,
        number: '55544', 
        name: '1111', 
        latitude: '12123',
        longitude: '11212',
        sensors: '{\"s\":[1,2,3]}',
        deleted: false,
        info: ''
     }; 
      q.sess_code = sess_code;
     (await WSocket.get()).send(q); 
   }

   async setDevsAll(dt: IWSResult){ 
    this.setDevs(dt.data);
   }
    }
