import {observable, action, computed, makeAutoObservable, makeObservable} from "mobx";

import { IWSQuery, WSQuery, IWSResult } from "../../../../xcore/WSQuery";
import { WSocket } from "../WSocket";

import { APP_STORAGE } from '../AppStorage';


export class EditUsersStorage {
  @observable modal_edit_user: boolean = false;
  @observable id_rows: any = "";

  @observable checkbox_editing: boolean = false; /// разрешить редактирование пользователю
  @observable checkbox_reading: boolean = true; /// только чтение

  @observable family: string = "";
  @observable name: string = "";
  @observable father: string = "";
  @observable email: string = "";
  @observable telephone: string = "";
  @observable login: string = "";
  @observable password: string = "";
  @observable repeat_password: string = "";
  @observable info: string = "";


  
  @observable key_org: any = "";
  @observable key_jobs: any = "";

  @observable active_user: boolean = true;
  @observable active_user_id: any = "";
  @observable u_act_mail: boolean = false;

  
  @observable error_family: boolean = false;
  @observable texthelp_family: string = "";
  @observable error_name: boolean = false;
  @observable texthelp_name: string = "";
  @observable error_father: boolean = false;
  @observable texthelp_father: string = "";
  @observable error_password: boolean = false;
  @observable texthelp_password: string = "";
  @observable error_repeat_password: boolean = false;
  @observable texthelp_repeat_password: string = "";


  constructor() {
    makeAutoObservable(this);
  }

  /////опции для организации

  @action setKeyOrg(val: any) {this.key_org = val;}
  @computed getKeyOrg(): any {return this.key_org;}

  @action setKeyJobs(val: any) {this.key_jobs = val;}
  @computed getKeyJobs(): any {return this.key_jobs;}

  @action setCheckboxEd(val: boolean) {this.checkbox_editing = val;}
  @action getCheckboxEd(): boolean {return this.checkbox_editing;}

  @action setCheckboxRead(val: boolean) {this.checkbox_reading = val;}
  @action getCheckboxRead(): boolean {return this.checkbox_reading;}

  @action setModalEditUser(val: boolean) {this.modal_edit_user = val;} /// Для открытия модального окна (Регистрация пользователя)
  @computed getModalEditUser(): boolean {return this.modal_edit_user;}

  @action setIdRows(val: any) {this.id_rows = val;}
  @computed getIdRows(): any {return this.id_rows;}

  @action setFamily(val: string) {this.family = val;}
  @computed getFamily(): string {return this.family;}

  @action setName(val: string) {this.name = val;}
  @computed getName(): string {return this.name;}
  @action setFather(val: string) {this.father = val;}
  @computed getFather(): string {return this.father;}

  @action setEmail(val: string) {this.email = val;}
  @computed getEmail(): string {return this.email;}

  @action setTelephone(val: string) {this.telephone = val;}
  @computed getTelephone(): string {return this.telephone;}

  @action setLogin(val: string) {this.login = val;}
  @computed getLogin(): string {return this.login;}

  @action setPassword(val: string) {this.password = val;}
  @computed getPassword(): string {return this.password;}

  @action setRepeatPassword(val: string) {this.repeat_password = val;}
  @computed getRepeatPassword(): string {return this.repeat_password;}

  @action setStateActive(val: boolean) {this.active_user = val;}
  @action getStateActive(): boolean {return this.active_user;}

  @action setActive(val: any) {this.active_user_id = val;}
  @action getActive(): any {return this.active_user_id;} 
  
  @action setActMail(val: any) {this.u_act_mail = val;}
  @action getActMail(): any {return this.u_act_mail;}

  @action setInfo(val: string) {this.info = val;}
  @computed getInfo(): string {return this.info;}


  @action setErrorFamily(val: boolean) {this.error_family = val;}
  @computed getErrorFamily(): boolean {return this.error_family;}
  @action setTextHelpFamily(val: string) {this.texthelp_family = val;}
  @computed getTextHelpFamily(): string {return this.texthelp_family;}

  @action setErrorName(val: boolean) {this.error_name = val;}
  @computed getErrorName(): boolean {return this.error_name;}
  @action setTextHelpName(val: string) {this.texthelp_name = val;}
  @computed getTextHelpName(): string {return this.texthelp_name;}

  @action setErrorFather(val: boolean) {this.error_father = val;}
  @computed getErrorFather(): boolean {return this.error_father;}
  @action setTextHelpFather(val: string) {this.texthelp_father = val;}
  @computed getTextHelpFather(): string {return this.texthelp_father;}


  @action setErrorPassword(val: boolean) {this.error_password = val;}
  @computed getErrorPassword(): boolean {return this.error_password;}
  @action setTextHelpPassword(val: string) {this.texthelp_password = val;}
  @computed getTextHelpPassword(): string {return this.texthelp_password;}

  @action setErrorRepeatPassword(val: boolean) {this.error_repeat_password = val;}
  @computed getErrorRepeatPassword(): boolean {return this.error_repeat_password;}
  @action setTextHelpRepeatPassword(val: string) {this.texthelp_repeat_password = val;}
  @computed getTextHelpRepeatPassword(): string {return this.texthelp_repeat_password;}




  
  async get_Jobs(name: string, value: any, _options?: any) {/* -----  Открываем модальное  (Редактировать пользователя)  */
    var sess_code = value;
    var q: IWSQuery = new WSQuery("get_Jobs");
    q.args = {
      id_org: this.getKeyOrg() || "",
    };
    q.sess_code = sess_code;
    (await WSocket.get()).send(q);
  }

  async set_IdRows(a: any) {
    let user_selected = [];
    let id_rows = a; /// id строки
    var options_jobs = [];

    let user_r = null;
    let user_w = null;

    if (APP_STORAGE.reg_user.getAllUsers()) {
      let user = JSON.parse(JSON.stringify(APP_STORAGE.reg_user.getAllUsers()));

      for (var key in user) {
        let users = user[key];
        if (users.u_id === id_rows) {
          user_selected.push(users);
        }
      }
      this.setFamily(user_selected[0].u_family);
      this.setName(user_selected[0].u_name);
      this.setFather(user_selected[0].u_father);
      this.setEmail(user_selected[0].u_email);

      this.setTelephone(user_selected[0].u_telephone);
      this.setLogin(user_selected[0].u_login);
      this.setInfo(user_selected[0].u_info);

      this.setKeyOrg(user_selected[0].u_org_id);
      this.setKeyJobs(user_selected[0].u_job_title_id);
      this.setStateActive(user_selected[0].u_deleted);
      this.setActMail(user_selected[0].u_act_mail)
      
      

      let role = user_selected[0].u_roles_ids;
      for (var key in role) {
        if (role.hasOwnProperty(key)) {
          let a = role[key];
          user_r = a[0]; ///чтение
          user_w = a[1]; ///редактирование
        }
      }

      if (user_r) {
        this.setCheckboxRead(true);
      }
      if (user_w) {
        this.setCheckboxEd(true);
      }

      if(this.getStateActive() === false) {
        this.setActive(1)
      }

      if(this.getStateActive() === true) {
        this.setActive(2)
      }

      this.get_Jobs("sess_id", APP_STORAGE.auth_form.getdt()); // должность

      setTimeout(() => {
        this.setModalEditUser(true);
    }, 100)
    }
  }


   
  async  set_ActMail (name: string, value: any, _options?: any) {
    var sess_code = value;
    var q:IWSQuery = new WSQuery("set_ActMail");
    q.args = {
        login:this.getLogin(),
        email:this.getEmail(),
     }; 
      q.sess_code = sess_code;
     (await WSocket.get()).send(q);

}

  
  async set_ChangeUser(name: string, value: any, _options?: any) {
    
    if(this.getActive() === 1){
        this.setStateActive(false)
    }
    if(this.getActive() === 2){
        this.setStateActive(true)
    }

        /// Проверка на пустые значения формы
        if (this.getFamily() === "") {
          this.setErrorFamily(true);
          this.setTextHelpFamily("Заполните поле");
        } else {
          this.setErrorFamily(false);
          this.setTextHelpFamily("");
        }

        if (this.getName() === "") {
          this.setErrorName(true);
          this.setTextHelpName("Заполните поле");
        } else {
          this.setErrorName(false);
          this.setTextHelpName("");
        }

       

        if (this.getPassword().length < 6) {
          this.setErrorPassword(true);
          this.setTextHelpPassword("используйте 6 или более символов");
        }
        else if (this.getPassword() === this.getLogin()){
          this.setErrorPassword(true);
          this.setTextHelpPassword("Пароль должен отличаться от логина");
        }
        else {
          this.setErrorPassword(false);
          this.setTextHelpPassword("");
        }
    
      if (
          this.getPassword() !== this.getRepeatPassword()
        ) {
          this.setErrorRepeatPassword(true);
          this.setTextHelpRepeatPassword("Пароли не совпадают");
        } else {
          this.setErrorRepeatPassword(false);
          this.setTextHelpRepeatPassword("");
          this.setErrorPassword(false);
          this.setTextHelpPassword("");
        }
    
     
    var sess_code = value;
    if (
      this.getFamily() &&
      this.getPassword() === this.getRepeatPassword() &&
      this.getName() 
    ) { 
    var q: IWSQuery = new WSQuery("set_ChangeUser");
    q.args = {
        family: this.getFamily() || "",
        name: this.getName() || "",
        father: this.getFather() || "",
        email: this.getEmail() || "",
        act_mail : this.getActMail(),
        telephone: this.getTelephone() || "",
        id_org: this.getKeyOrg() || "",
        id_job: this.getKeyJobs() || "",
        login: this.getLogin() || "",
        new_password: this.getPassword() || "",
        new_password_repeat: this.getRepeatPassword() || "",
        deleted: this.getStateActive(),
        users_w: this.getCheckboxEd(),
        users_r: this.getCheckboxRead() ,
        info: this.getInfo(),
      };
    }
    q.sess_code = sess_code;
    (await WSocket.get()).send(q);
    APP_STORAGE.reg_user.get_AllUsers("sess_id", APP_STORAGE.auth_form.getdt());
     
  }
}



