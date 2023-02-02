import { observable, action, computed, makeAutoObservable } from 'mobx';
import { IWSQuery, WSQuery, IWSResult } from '../../../../../xcore/WSQuery';
import { WSocket } from '../../WSocket';


export class DevsGroupStorage{

    @observable open_devs_list: boolean = false;
    @observable open_modal: boolean = false;
    @observable middle_form: any = '';

    @observable org_id: number = null;
    @observable set_org_id : number = 0;

    @observable name:string = '';
    @observable key_org: any= ''
    @observable latitude:string = '';
    @observable longitude: string = '';
    @observable info: string = '';
    @observable parent_id : string = '';

    @observable parent : string = '';

    
    ////////////////////////////////////////////Проверка

    @observable name_err: boolean = false;
    @observable name_err_mess: string = '';

    @observable org_err: boolean = false;
    @observable org_err_mess: string = '';

    @observable latitude_err:boolean = false;
    @observable latitude_err_mess:string = '';
    @observable longitude_err: boolean = false;
    @observable longitude_err_mess: string = '';

    @observable open_menu: boolean = false; ///// открыть меню редактирования

    @observable defaultExpanded_devs_froups : Array<string> = [];

    @observable checkbox_editing: boolean = false; 


    @observable devs_groups: Array<string> = []
    constructor(){
        makeAutoObservable(this);
    }

    @action setCheckboxEd(val: boolean) {this.checkbox_editing = val;}
    @action getCheckboxEd(): boolean {return this.checkbox_editing;}

    @action setOpen_menu (val: boolean) {this.open_menu = val} //// открыть  меню редактирования
    @computed getOpen_menu() : boolean {return this.open_menu}

    @action setOrgId(val : number ) { this.org_id = val};
    @computed getOrgId () : number { return this.org_id};

    @action setOrg(val : number ) { this.set_org_id = val};
    @computed getOrg () : number { return this.set_org_id}

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
    @action setDevsGroups(val: Array<string>) {this.devs_groups = val}
    @computed getDevsGroups() : Array<string> {return this.devs_groups}

    @action setDefaultExpandedDevsGroups(val: Array<string>) {this.defaultExpanded_devs_froups = val}
    @computed getDefaultExpandedDevsGroups() : Array<string> {return this.defaultExpanded_devs_froups}



  //////////////////////////////////////////////////////////////////////////Проверка
    
    @action setNameError(val : boolean) { this.name_err = val}
    @computed getNamaError() : boolean { return this.name_err}
    @action setNameError_mess(val : string) { this.name_err_mess = val}
    @computed getNamaError_mess() : string { return this.name_err_mess}

    @action setLatitudeError(val : boolean) { this.latitude_err = val}
    @computed getLatitudeError() : boolean { return this.latitude_err}
    @action setLatitudeError_mess(val : string) { this.latitude_err_mess = val}
    @computed getLatitudeError_mess() : string { return this.latitude_err_mess}

    @action setLongitudeError(val : boolean) { this.longitude_err = val}
    @computed getLongitudeError() : boolean { return this.longitude_err}
    @action setLongitudeError_mess(val : string) { this.longitude_err_mess = val}
    @computed getLongitudeError_mess() : string { return this.longitude_err_mess}

    @action setOrgError(val : boolean) { this.org_err = val}
    @computed getOrgError() : boolean { return this.org_err} 

    
    async set_NewDevGroup(name: string, value: any, _options?: any) { ///////// Добавляем новое расположение устройств
        var sess_code = value;
        var q:IWSQuery = new WSQuery("set_NewDevGroup");
        
        if( this.getName() === ''){
          this.setNameError(true);
          this.setNameError_mess('Поле не может быть пустым')
        }

        if( this.getName() !== ''){
          this.setNameError(false);
          this.setNameError_mess('')
        }


        if( this.getKeyOrg() !== ''){
          this.setOrgError(false);
        }

        if( this.getLatitude() === ''){
          this.setLatitudeError(true);
          this.setLatitudeError_mess('Поле не должно быть пустым')
        }

        if( this.getLatitude() !== ''){
          this.setLatitudeError(false);
          this.setLatitudeError_mess('')
        }


        if( this.getLongitude() === ''){
          this.setLongitudeError(true);
          this.setLongitudeError_mess('Поле не должно быть пустым')
        }

        if( this.getLongitude() !== ''){
          this.setLongitudeError(false);
          this.setLongitudeError_mess('')
        }
         

        if(this.getName() !== '' && this.getLatitude() !== '' && this.getLongitude() !== '' && this.getKeyOrg() !== ''){
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
       
       }


 
       async get_DevsGroups(name: string, value: any, _options?: any) {  //// Отправляем запрос на получение расположений устройств
        var sess_code = value;
        var q:IWSQuery = new WSQuery("get_DevsGroups");
        q.args = {
            users_w: true,
            org_id: this.getOrgId() || ''
        }; 
        q.sess_code = sess_code;
         (await WSocket.get()).send(q);  
    }

    setDevsGroupsAll(dt: IWSResult) { /* -----  Получаем все группы устройств   */
      this.setDevsGroups(dt.data);
     }

     async set_ChangeDevsGroups(name: string, value: any, _options?: any) { 
        var sess_code = value;
        var q: IWSQuery = new WSQuery("set_ChangeDevsGroups");

        if( this.getName() === ''){
          this.setNameError(true);
          this.setNameError_mess('Поле не может быть пустым')
        }

        if( this.getName() !== ''){
          this.setNameError(false);
          this.setNameError_mess('')
        }


        if( this.getKeyOrg() !== ''){
          this.setOrgError(false);
        }

        if( this.getLatitude() === ''){
          this.setLatitudeError(true);
          this.setLatitudeError_mess('Поле не должно быть пустым')
        }

        if( this.getLatitude() !== ''){
          this.setLatitudeError(false);
          this.setLatitudeError_mess('')
        }


        if( this.getLongitude() === ''){
          this.setLongitudeError(true);
          this.setLongitudeError_mess('Поле не должно быть пустым')
        }

        if( this.getLongitude() !== ''){
          this.setLongitudeError(false);
          this.setLongitudeError_mess('')
        }
        if(this.getName() !== '' && this.getLatitude() !== '' && this.getLongitude() !== '' && this.getKeyOrg() !== ''){
        q.args = {
            id: Number(this.getParentId()) || "",
            parent_id: Number(this.getParent()) || 0,
            name: this.getName() || "",
            latitude: this.getLatitude() || "",
            longitude: this.getLongitude() || "",
            org_id : Number(this.getKeyOrg()),
            ord_id: 0,
            deleted: this.getCheckboxEd(),
            info: this.getInfo() || ""
          };
        
        q.sess_code = sess_code;
        (await WSocket.get()).send(q);
      }
    }

    }



