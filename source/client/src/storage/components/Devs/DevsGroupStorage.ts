import { observable, action, computed, makeAutoObservable } from 'mobx';
import { IWSQuery, WSQuery, IWSResult } from '../../../../../xcore/WSQuery';
import { WSocket } from '../../WSocket';


export class DevsGroupStorage{

    @observable open_devs_list: boolean = false;
    @observable open_modal: boolean = false;
    @observable middle_form: any = '';

    @observable org_id: number = null;


    @observable name:string = '';
    @observable key_org: any= ''
    @observable latitude:string = '';
    @observable longitude: string = '';
    @observable info: string = '';
    @observable parent_id : string = '';

    @observable parent : string = '';


    @observable defaultExpanded_devs_froups : Array<string> = [];


    @observable devs_groups: Array<string> = []
    constructor(){
        makeAutoObservable(this);
    }

    @action setOrgId(val : number ) { this.org_id = val};
    @computed getOrgId () : number { return this.org_id}


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

    @action setParentId (val : string) {this.parent_id = val}
    @computed getParentId() : string {return this.parent_id} 

    @action setParent (val: string) {this.parent = val}
    @computed getParent() : string {return this.parent}

    

    ///////////////////////////////////////////////Список расположений устройств
    @action setDevsGroups(val: Array<string>) {this.devs_groups = val;}
    @computed getDevsGroups() : Array<string> {return this.devs_groups}

    @action setDefaultExpandedDevsGroups(val: Array<string>) {this.defaultExpanded_devs_froups = val;}
    @computed getDefaultExpandedDevsGroups() : Array<string> {return this.defaultExpanded_devs_froups}

    
    async set_NewDevGroup(name: string, value: any, _options?: any) {
        var sess_code = value;
        var q:IWSQuery = new WSQuery("set_NewDevGroup");

        console.log('1121123123', this.getParentId())
        
        q.args = {
            g_name: this.getName() || '',
            latitude:this.getLatitude() || '', 
            longitude:this.getLongitude() || '', 
            org_id:this.getKeyOrg() || '',
            parent_id: this.getParentId(),
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
            //Пофикситть, порлучить инфу из запроса с данными пользователя 
            users_w: true,
            org_id: this.getOrgId() || ''
        }; 
        q.sess_code = sess_code;
         (await WSocket.get()).send(q);  
    }

    setDevsGroupsAll(dt: IWSResult) { /* -----  Получаем всех пользователей   */
      this.setDevsGroups(dt.data);
     }

     async set_ChangeDevsGroups(name: string, value: any, _options?: any) { 
        var sess_code = value;
        var q: IWSQuery = new WSQuery("set_ChangeDevsGroups");
        q.args = {
            id: this.getParentId() || "",
            parent_id: this.getParent() || "",
            name: this.getName() || "",
            latitude: this.getLatitude() || "",
            longitude: this.getLongitude() || "",
            org_id : this.getKeyOrg(),
            ord_id: 0,
            deleted: false,
            info: this.getInfo() || ""
          };
        
        q.sess_code = sess_code;
        (await WSocket.get()).send(q);
       

      }

    }



