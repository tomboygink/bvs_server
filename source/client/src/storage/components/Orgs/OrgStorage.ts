import { observable, action, computed, makeAutoObservable } from 'mobx';

import { APP_STORAGE } from '../../../storage/AppStorage';
import { IWSQuery, WSQuery, IWSResult } from "../../../../../xcore/WSQuery";
import { WSocket } from "../../WSocket";



export class OrgStorage {

    @observable modal_edit_org: boolean = false;

      //////////////////////добавление организации

  @observable full_name_org: string = "";
  @observable name_org: string = "";
  @observable inn: string = "";
  @observable address: string = "";
  @observable latitude: string = null; /// широта
  @observable longitude: string = null; /// долгота
  @observable info_org: string = "";
  @observable key_org: any = null;

    constructor(){
        makeAutoObservable(this);
    }
    @action setModalEditOrg(val: boolean) {this.modal_edit_org = val;} /// Для открытия модального окна (Регистрация пользователя)
    @computed getModalEditOrg(): boolean {return this.modal_edit_org;}


    @action setKeyOrg(val: any) { this.key_org = val;}
    @computed getKeyOrg(): any {return this.key_org;} 

    @action setFullNameOrg(val: string) {this.full_name_org = val;}
    @computed getFullNameOrg(): string {return this.full_name_org;}
  
    @action setNameOrg(val: string) {this.name_org = val;}
    @computed getNameOrg(): string {return this.name_org;}
  
    @action setInn(val: string) {this.inn = val;}
    @computed getInn(): string {return this.inn;}
  
    @action setAddress(val: string) {this.address = val;}
    @computed getAddress(): string {return this.address;}
  
    @action setLatitude(val: string) {this.latitude = val;}
    @computed getLatitude(): string {return this.latitude;}
  
    @action setLongitude(val: string) {this.longitude = val;}
    @computed getLongitude(): string {return this.longitude;}
  
    @action setInfOrg(val: string) {this.info_org = val}
    @computed getInfOrg(): string {return this.info_org;}


  ///////////////////////изменение организации 

  async get_ChangeOrg(dt: IWSResult){

    if(dt.error === null){
        APP_STORAGE.reg_user.get_Org("sess_id", APP_STORAGE.auth_form.getdt()); /// получаем все организации
    }
  }


  async set_ChangeOrg( name: string, value: any, _options?: any ){
 
    const regexp_inn = /^[0-9]+$/; /// регулярное выражение для ввода только цифр для поля ИНН
    const inn = this.getInn().match(regexp_inn);
      if (
        this.getAddress() !== "" &&
        this.getFullNameOrg() !== '' &&
        this.getNameOrg() !== '' &&
        this.getInn() !== ''
      ) {

        var sess_code = value;
        var q: IWSQuery = new WSQuery("set_ChangeOrg");
        q.args = {
          id: this.getKeyOrg() || "",
          name: this.getNameOrg()|| "",
          full_name: this.getFullNameOrg() || "",
          inn : this.getInn(),
          address : this.getAddress(),
          latitude : this.getLatitude(),
          longitude : this.getLongitude(),
          info : this.getInfOrg(), 
        };
        q.sess_code = sess_code;
        (await WSocket.get()).send(q);

      APP_STORAGE.reg_user.setResulSave('Данные успешно сохранены')
      
      setTimeout(() => {
        APP_STORAGE.reg_user.setResulSave('');
        APP_STORAGE.reg_user.setModalRegUser(false);
       
        APP_STORAGE.org.setModalEditOrg(false);

      }, 1000);
  }
}



async setChangeJobs_Titles( name: string, value: any, _options?: any ){
  var sess_code = value;
  var q: IWSQuery = new WSQuery("set_ChangeJobs_Titles");
  q.args = {
       id: 1 || "",
      org_id: 1 || "",
      name: 'ewqewewqewqe' || "",
      info: 'APP_STORAGE.jobs.getInfo()' || ''
  };
  q.sess_code = sess_code;
  (await WSocket.get()).send(q);
}
}
