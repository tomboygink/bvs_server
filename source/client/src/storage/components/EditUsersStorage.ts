import {
  observable,
  action,
  computed,
  makeAutoObservable,
  makeObservable,
} from "mobx";

import { IWSQuery, WSQuery, IWSResult } from "../../../../xcore/WSQuery";
import { WSocket } from "../WSocket";

import { api, api1 } from "../../api/api";

import { APP_STORAGE } from "../AppStorage";
import {
  SAVE_ERROR,
  SAVE_SUCCESS,
  EMPTY_FIELD_ERROR,
  MATCHING_LOGIN_AND_PASS_ERROR,
  PASSWORDS_NOT_MATCH,
  INVALID_EMAIL_ERROR,
  INVALID_PASSWORD_ERROR,
} from "../../../utils/consts";
import {
  regexp_email,
  regexp_dash,
  regexp_password,
} from "../../../utils/consts";

export class EditUsersStorage {
  @observable modal_edit_user: boolean = false;
  @observable id_rows: any = "";

  @observable open_search: boolean = false; /// открываем строку поиска

  @observable search_famaly: any = "";
  @observable search_name: any = "";
  @observable search_father: any = "";
  @observable search_login: any = "";
  @observable search_telephone: any = "";
  @observable search_email: any = "";

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
  @observable error_email: boolean = false;
  @observable texthelp_email: string = "";
  @observable error_telephone: boolean = false;
  @observable texthelp_telephone: string = "";

  @observable successSave_mess: string = "";
  @observable errorSave_mess: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  @action setOpenSearch(val: boolean) {
    this.open_search = val;
  }
  @computed getOpenSearch(): boolean {
    return this.open_search;
  } //// строка поиска (таблица пользователей)

  @action setSearchFamaly(val: any) {
    this.search_famaly = val;
  }
  @computed getSearchFamaly(): any {
    return this.search_famaly;
  }

  @action setSearchName(val: any) {
    this.search_name = val;
  }
  @computed getSearchName(): any {
    return this.search_name;
  }

  @action setSearchFather(val: any) {
    this.search_father = val;
  }
  @computed getSearchFather(): any {
    return this.search_father;
  }

  @action setSearchLogin(val: any) {
    this.search_login = val;
  }
  @computed getSearchLogin(): any {
    return this.search_login;
  }

  @action setSearchTelephone(val: any) {
    this.search_telephone = val;
  }
  @computed getSearchTelephone(): any {
    return this.search_telephone;
  }

  @action setSearchEmail(val: any) {
    this.search_email = val;
  }
  @computed getSearchEmail(): any {
    return this.search_email;
  }

  /////опции для организации
  @action setKeyOrg(val: any) {
    this.key_org = val;
  }
  @computed getKeyOrg(): any {
    return this.key_org;
  }

  @action setKeyJobs(val: any) {
    this.key_jobs = val;
  }
  @computed getKeyJobs(): any {
    return this.key_jobs;
  }

  @action setCheckboxEd(val: boolean) {
    this.checkbox_editing = val;
  }
  @action getCheckboxEd(): boolean {
    return this.checkbox_editing;
  }

  @action setCheckboxRead(val: boolean) {
    this.checkbox_reading = val;
  }
  @action getCheckboxRead(): boolean {
    return this.checkbox_reading;
  }

  @action setModalEditUser(val: boolean) {
    this.modal_edit_user = val;
  } /// Для открытия модального окна (Регистрация пользователя)
  @computed getModalEditUser(): boolean {
    return this.modal_edit_user;
  }

  @action setIdRows(val: any) {
    this.id_rows = val;
  }
  @computed getIdRows(): any {
    return this.id_rows;
  }

  @action setFamily(val: string) {
    this.family = val;
  }
  @computed getFamily(): string {
    return this.family;
  }

  @action setName(val: string) {
    this.name = val;
  }
  @computed getName(): string {
    return this.name;
  }
  @action setFather(val: string) {
    this.father = val;
  }
  @computed getFather(): string {
    return this.father;
  }

  @action setEmail(val: string) {
    this.email = val;
  }
  @computed getEmail(): string {
    return this.email;
  }

  @action setTelephone(val: string) {
    this.telephone = val;
  }
  @computed getTelephone(): string {
    return this.telephone;
  }

  @action setLogin(val: string) {
    this.login = val;
  }
  @computed getLogin(): string {
    return this.login;
  }

  @action setPassword(val: string) {
    this.password = val;
  }
  @computed getPassword(): string {
    return this.password;
  }

  @action setRepeatPassword(val: string) {
    this.repeat_password = val;
  }
  @computed getRepeatPassword(): string {
    return this.repeat_password;
  }

  @action setStateActive(val: boolean) {
    this.active_user = val;
  }
  @action getStateActive(): boolean {
    return this.active_user;
  }

  @action setActive(val: any) {
    this.active_user_id = val;
  }
  @action getActive(): any {
    return this.active_user_id;
  }

  @action setActMail(val: any) {
    this.u_act_mail = val;
  }
  @action getActMail(): any {
    return this.u_act_mail;
  }

  @action setInfo(val: string) {
    this.info = val;
  }
  @computed getInfo(): string {
    return this.info;
  }

  @action setErrorFamily(val: boolean) {
    this.error_family = val;
  }
  @computed getErrorFamily(): boolean {
    return this.error_family;
  }
  @action setTextHelpFamily(val: string) {
    this.texthelp_family = val;
  }
  @computed getTextHelpFamily(): string {
    return this.texthelp_family;
  }

  @action setErrorName(val: boolean) {
    this.error_name = val;
  }
  @computed getErrorName(): boolean {
    return this.error_name;
  }
  @action setTextHelpName(val: string) {
    this.texthelp_name = val;
  }
  @computed getTextHelpName(): string {
    return this.texthelp_name;
  }

  @action setErrorFather(val: boolean) {
    this.error_father = val;
  }
  @computed getErrorFather(): boolean {
    return this.error_father;
  }
  @action setTextHelpFather(val: string) {
    this.texthelp_father = val;
  }
  @computed getTextHelpFather(): string {
    return this.texthelp_father;
  }

  @action setErrorPassword(val: boolean) {
    this.error_password = val;
  }
  @computed getErrorPassword(): boolean {
    return this.error_password;
  }
  @action setTextHelpPassword(val: string) {
    this.texthelp_password = val;
  }
  @computed getTextHelpPassword(): string {
    return this.texthelp_password;
  }

  @action setErrorRepeatPassword(val: boolean) {
    this.error_repeat_password = val;
  }
  @computed getErrorRepeatPassword(): boolean {
    return this.error_repeat_password;
  }
  @action setTextHelpRepeatPassword(val: string) {
    this.texthelp_repeat_password = val;
  }
  @computed getTextHelpRepeatPassword(): string {
    return this.texthelp_repeat_password;
  }

  @action setErrorEmail(val: boolean) {
    this.error_email = val;
  }

  @computed getErrorEmail(): boolean {
    return this.error_email;
  }

  @action setTextHelpEmail(val: string) {
    this.texthelp_email = val;
  }

  @computed getTextHelpEmail(): string {
    return this.texthelp_email;
  }
  @action setErrorTelephone(val: boolean) {
    this.error_telephone = val;
  }

  @computed getErrorTelephone(): boolean {
    return this.error_telephone;
  }

  @action setTextHelpTelephone(val: string) {
    this.texthelp_telephone = val;
  }

  @computed getTextHelpTelephone(): string {
    return this.texthelp_telephone;
  }

  @action setSuccessSave_mess(val: string) {
    return (this.successSave_mess = val);
  }

  @computed getSuccessSave_mess() {
    return this.successSave_mess;
  }

  @action setErrorSave_mess(val: string) {
    return (this.errorSave_mess = val);
  }

  @computed getErrorSave_mess() {
    return this.errorSave_mess;
  }

  async get_Jobs(name: string, value: any, _options?: any) {
    /* -----  Открываем модальное  (Редактировать пользователя)  */
    var sess_code = value;
    var q: IWSQuery = new WSQuery("get_Jobs");
    q.args = {
      id_org: this.getKeyOrg() || "",
    };
    q.sess_code = sess_code;
    // (await WSocket.get()).send(q);
    // api.fetch(q).then((data) => APP_STORAGE.reg_user.setAllJobsTitle(data));
    api.fetch(q).catch((e) => console.log("error=>", e)); // fetch-запрос
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
      this.setActMail(user_selected[0].u_act_mail);

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

      if (this.getStateActive() === false) {
        this.setActive(1);
      }

      if (this.getStateActive() === true) {
        this.setActive(2);
      }

      this.get_Jobs("sess_id", APP_STORAGE.auth_form.getdt()); // должность

      setTimeout(() => {
        this.setModalEditUser(true);
      }, 100);
    }
  }

  async set_ActMail(name: string, value: any, _options?: any) {
    var sess_code = value;
    var q: IWSQuery = new WSQuery("set_ActMail");
    q.args = {
      login: this.getLogin(),
      email: this.getEmail(),
    };
    q.sess_code = sess_code;
    api.fetch(q).catch((e) => console.log("error=>", e)); // fetch-запрос
    // (await WSocket.get()).send(q);
  }

  async set_ChangeUser(name: string, value: any, _options?: any) {
    const email = this.getEmail().match(regexp_email);
    const telephone = this.getTelephone().replace(regexp_dash, ""); // Убрать дефисы и пробелы
    const isValidPassword = regexp_password.test(this.getPassword());
    var sess_code = value;
    var q: IWSQuery = new WSQuery("set_ChangeUser");
    if (this.getActive() === 1) {
      this.setStateActive(false);
    }
    if (this.getActive() === 2) {
      this.setStateActive(true);
    }

    /// Проверка на пустые значения формы

    if (this.getFamily().trim()) {
      this.setErrorFamily(false);
      this.setTextHelpFamily("");
    } else {
      this.setErrorFamily(true);
      this.setTextHelpFamily(EMPTY_FIELD_ERROR);
    }

    if (this.getName().trim()) {
      this.setErrorName(false);
      this.setTextHelpName("");
    } else {
      this.setErrorName(true);
      this.setTextHelpName(EMPTY_FIELD_ERROR);
    }

    if (email !== null) {
      this.setErrorEmail(false);
      this.setTextHelpEmail("");
    } else {
      this.setErrorEmail(true);
      this.setTextHelpEmail(INVALID_EMAIL_ERROR);
    }

    if (this.getTelephone()) {
      this.setErrorTelephone(false);
      this.setTextHelpTelephone("");
    } else {
      this.setErrorTelephone(true);
      this.setTextHelpTelephone(EMPTY_FIELD_ERROR);
    }

    if (this.getPassword()) {
      if (this.getPassword().length < 6) {
        this.setErrorPassword(true);
        this.setTextHelpPassword(INVALID_PASSWORD_ERROR);
      } else if (!isValidPassword) {
        this.setErrorPassword(true);
        this.setTextHelpPassword(INVALID_PASSWORD_ERROR);
      } else if (this.getPassword() !== this.getRepeatPassword()) {
        this.setErrorRepeatPassword(true);
        this.setTextHelpRepeatPassword(PASSWORDS_NOT_MATCH);
        this.setErrorPassword(false);
        this.setTextHelpPassword("");
      } else if (this.getPassword() === this.getLogin()) {
        this.setErrorPassword(true);
        this.setTextHelpPassword(MATCHING_LOGIN_AND_PASS_ERROR);
      } else {
        this.setErrorPassword(false);
        this.setTextHelpPassword("");
        this.setErrorRepeatPassword(false);
        this.setTextHelpRepeatPassword("");
      }
    }

    // if (this.getPassword() && this.getPassword().length >= 6) {
    //   this.setErrorPassword(false);
    //   this.setTextHelpPassword("");

    // } else {
    //   this.setErrorPassword(true);
    //   this.setTextHelpPassword(INVALID_PASSWORD_ERROR);
    // }

    // if (this.getFamily()) {
    //   this.setErrorFamily(true);
    //   this.setTextHelpFamily(EMPTY_FIELD_ERROR);
    // } else {
    //   this.setErrorFamily(false);
    //   this.setTextHelpFamily("");
    // }

    // if (this.getName() === "") {
    //   this.setErrorName(true);
    //   this.setTextHelpName(EMPTY_FIELD_ERROR);
    // } else {
    //   this.setErrorName(false);
    //   this.setTextHelpName("");
    // }

    // if (this.getPassword().length < 7) {
    //   this.setErrorPassword(true);
    //   this.setTextHelpPassword("используйте 6 или более символов");
    // }
    // if (this.getPassword() === this.getLogin()) {
    //   this.setErrorPassword(true);
    //   this.setTextHelpPassword(MATCHING_LOGIN_AND_PASS_ERROR);
    // } else {
    //   this.setErrorPassword(false);
    //   this.setTextHelpPassword("");
    // }

    // if (this.getPassword() !== this.getRepeatPassword()) {
    //   this.setErrorRepeatPassword(true);
    //   this.setTextHelpRepeatPassword(PASSWORDS_NOT_MATCH);
    // } else if (this.getPassword() === this.getLogin()) {
    //   this.setErrorPassword(true);
    //   this.setTextHelpPassword(MATCHING_LOGIN_AND_PASS_ERROR);
    // } else if (
    //   this.getPassword() &&
    //   this.getPassword() === this.getRepeatPassword() &&
    //   this.getPassword().length < 6
    // ) {
    //   this.setErrorPassword(true);
    //   this.setTextHelpPassword(INVALID_PASSWORD_ERROR);
    //   this.setErrorRepeatPassword(false);
    //   this.setTextHelpRepeatPassword("");
    // } else {
    //   this.setErrorPassword(false);
    //   this.setErrorRepeatPassword(false);
    //   this.setTextHelpPassword("");
    //   this.setTextHelpRepeatPassword("");
    // }

    const isValidValues = () => {
      return (
        !this.getErrorFamily() &&
        !this.getErrorName() &&
        !this.getErrorPassword() &&
        !this.getErrorRepeatPassword() &&
        !this.getErrorTelephone() &&
        !this.getErrorEmail()
      );
    };

    if (isValidValues()) {
      q.args = {
        family: this.getFamily() || "",
        name: this.getName() || "",
        father: this.getFather() || "",
        email: this.getEmail() || "",
        act_mail: this.getActMail(),
        telephone: this.getTelephone() || "",
        id_org: this.getKeyOrg() || "",
        id_job: this.getKeyJobs() || "",
        login: this.getLogin() || "",
        new_password: this.getPassword() || "",
        new_password_repeat: this.getRepeatPassword() || "",
        deleted: this.getStateActive(),
        users_w: this.getCheckboxEd(),
        users_r: this.getCheckboxRead(),
        info: this.getInfo(),
      };
      q.sess_code = sess_code;
      // (await WSocket.get()).send(q);
      // APP_STORAGE.reg_user.get_AllUsers(
      //   "sess_id",
      //   APP_STORAGE.auth_form.getdt()
      // );
      // this.setModalEditUser(false);

      api
        .fetch(q)
        .then(() => {
          this.setSuccessSave_mess(SAVE_SUCCESS);
          APP_STORAGE.reg_user.get_AllUsers(
            "sess_id",
            APP_STORAGE.auth_form.getdt()
          );
          this.setPassword("");
          this.setRepeatPassword("");
          setTimeout(() => {
            this.setModalEditUser(false);
            this.setSuccessSave_mess("");
          }, 2000);
        })
        .catch((e) => {
          this.setErrorSave_mess(SAVE_ERROR);
          console.log("error=>", e);
          setTimeout(() => this.setErrorSave_mess(""), 2000);
        });
    }
  }
}
