import { observable, action, computed, makeAutoObservable } from "mobx";

import { IWSQuery, WSQuery, IWSResult } from "../../../../xcore/WSQuery";
import { WSocket } from "../WSocket";
import { api, api1 } from "../../api/api";

import { APP_STORAGE } from "../AppStorage";
import {
  EMPTY_FIELD_ERROR,
  INVALID_EMAIL_ERROR,
  INVALID_PASSWORD_ERROR,
  INVALID_TELEPHONE_ERROR,
} from "../../../utils/consts";
import { regexp_email, regexp_dash } from "../../../utils/consts";

export class ModalStorage {
  @observable PersonalAccaunt: boolean = false;
  @observable alert_message: string = "";
  @observable act_mail_message: boolean = false;

  @observable spawn_alert: boolean = null; /// создаем алерт для формы редактирования (ChangeUserData)

  @observable family: string = "";
  @observable name: string = "";
  @observable father: string = "";
  @observable telephone: string = "";
  @observable login: string = "";
  @observable old_password: string = "";
  @observable new_password: string = "";
  @observable repeat_password: string = "";
  @observable email: string = "";
  @observable info: string = "";
  @observable act_mail: boolean = false;

  @observable error_pass: boolean = false;
  @observable error_message: string = null;

  @observable errr_old_pass: boolean = false;
  @observable error_old_message: string = null;

  @observable errr_new_pass: boolean = false;
  @observable error_new_message: string = null;

  @observable modal: number = null;
  @observable alert_dialog: boolean = false;

  @observable cmd_error_pass: string = "";
  @observable cmd_error_data: string = "";

  @observable checked_email: boolean = false; /// потдверждение  пароля
  ////////////////////////////////////валидация формы

  @observable family_err: boolean = false;
  @observable family_err_mess: string = "";
  @observable name_err: boolean = false;
  @observable name_err_mess: string = "";
  @observable email_err: boolean = false; ///ошибка при вводе адреса электронной почты
  @observable email_err_mess: string = ""; ///сообщение об ошибке адреса электронной почты

  @observable phone_err: boolean = false; ///ошибка при вводе адреса электронной почты
  @observable phone_err_mess: string = ""; ///сообщение об ошибке адреса электронной почты

  @observable modal_title: string = "";

  @observable code: any = window.location.search.replace(/%20/g, "").split("=");
  @observable dt: any = null;
  @observable error: boolean = false;
  @observable error_mass: string = null;

  constructor() {
    makeAutoObservable(this);
  }

  @action setSpawnAlert(val: boolean) {
    this.spawn_alert = val;
  }
  @computed getSpawnAlert(): boolean {
    return this.spawn_alert;
  }

  @action setChecked(val: boolean) {
    this.checked_email = val;
  }
  @computed getChecked(): boolean {
    return this.checked_email;
  }

  @action setCmdErrPass(val: string) {
    this.cmd_error_pass = val;
  }
  @computed getCmdErrPass(): string {
    return this.cmd_error_pass;
  }

  @action setCmdErrData(val: string) {
    this.cmd_error_data = val;
  }
  @computed getCmdErrData(): string {
    return this.cmd_error_data;
  }

  @action setPersonalAccaunt(val: boolean) {
    this.PersonalAccaunt = val;
  }
  @computed getPersonalAccaunt(): boolean {
    return this.PersonalAccaunt;
  }

  @action setModal(val: number) {
    this.modal = val;
  }
  @computed getModal(): number {
    return this.modal;
  }

  @action setAlertDialog(val: boolean) {
    this.alert_dialog = val;
  }
  @computed getAlertDialog(): boolean {
    return this.alert_dialog;
  }

  @action setModalTitle(val: string) {
    this.modal_title = val;
  }
  @computed getModalTitle(): string {
    return this.modal_title;
  }

  /////////////Проверка формы перед отправкой на сервер (Валидация формы)
  @action setError_family(val: boolean) {
    this.family_err = val;
  }

  @computed getError_family(): boolean {
    return this.family_err;
  }

  @action setTextHelpFamily(val: string) {
    this.family_err_mess = val;
  }

  @computed getTextHelpFamily(): string {
    return this.family_err_mess;
  }
  @action setError_name(val: boolean) {
    this.name_err = val;
  }

  @computed getError_name(): boolean {
    return this.name_err;
  }

  @action setTextHelpName(val: string) {
    this.name_err_mess = val;
  }

  @computed getTextHelpName(): string {
    return this.name_err_mess;
  }

  @action setError_email(val: boolean) {
    this.email_err = val;
  }
  @computed getError_email(): boolean {
    return this.email_err;
  } /////передаем ошибку

  @action set_email(val: boolean) {
    this.act_mail_message = val;
  } /// если почта не подтверждена, то передаем сообщение пользователю
  @computed get_email(): boolean {
    return this.act_mail_message;
  } /////передаем ошибку

  @action setEmail_message(val: string) {
    this.email_err_mess = val;
  } //////передаем сообщение об ошибке
  @computed getEmail_message(): string {
    return this.email_err_mess;
  }

  @action setError_phone(val: boolean) {
    this.phone_err = val;
  }
  @computed getError_phone(): boolean {
    return this.phone_err;
  } /////передаем ошибку

  @action setPhone_message(val: string) {
    this.phone_err_mess = val;
  } //////передаем сообщение об ошибке
  @computed getPhone_message(): string {
    return this.phone_err_mess;
  }

  //////////////////////////////////////////////Для проверки пароля

  @action setLogin(val: string) {
    this.login = val;
  }
  @computed getLogin(): string {
    return this.login;
  }

  @action setError_pass(val: boolean) {
    this.error_pass = val;
  }
  @computed getError_pass(): boolean {
    return this.error_pass;
  }

  @action setError_message(val: string) {
    this.error_message = val;
  }
  @computed getError_message(): string {
    return this.error_message;
  }

  @action setErrr_old_pass(val: boolean) {
    this.errr_old_pass = val;
  }
  @computed getErrr_old_pass(): boolean {
    return this.errr_old_pass;
  }

  @action setError_old_message(val: string) {
    this.error_old_message = val;
  }
  @computed getError_old_message(): string {
    return this.error_old_message;
  }

  @action setErrr_new_pass(val: boolean) {
    this.errr_new_pass = val;
  }
  @computed getErrr_new_pass(): boolean {
    return this.errr_new_pass;
  }

  @action setError_new_message(val: string) {
    this.error_new_message = val;
  }
  @computed getError_new_message(): string {
    return this.error_new_message;
  }

  ///////////////////////////////////////////////////////////////////////////

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

  @action setTelephone(val: string) {
    this.telephone = val;
  }
  @computed getTelephone(): string {
    return this.telephone;
  }

  @action setOld_Pass(val: string) {
    this.old_password = val;
  }
  @computed getOld_Pass(): string {
    return this.old_password;
  }

  @action setNew_Pass(val: string) {
    this.new_password = val;
  }
  @computed getNew_Pass(): string {
    return this.new_password;
  }

  @action setRepeat_password(val: string) {
    this.repeat_password = val;
  }
  @computed getRepeat_password(): string {
    return this.repeat_password;
  }

  @action setEmail(val: string) {
    this.email = val;
  }
  @computed getEmail(): string {
    return this.email;
  }

  @action setInfo(val: string) {
    this.info = val;
  }
  @computed getInfo(): string {
    return this.info;
  }

  @action setActMail(val: boolean) {
    this.act_mail = val;
  }
  @computed getActMail(): boolean {
    return this.act_mail;
  } // подтверждение почты

  @action setCode(u: any) {
    this.code = u;
  }
  @computed getCode(): any {
    return this.code;
  }

  @action setError(u: boolean) {
    this.error = u;
  }
  @computed getError(): boolean {
    return this.error;
  }

  @action setErrorMass(u: string) {
    this.error_mass = u;
  }
  @computed getErorMass(): string {
    return this.error_mass;
  }

  async set_ActMail(name: string, value: any, _options?: any) {
    var sess_code = value;
    var q: IWSQuery = new WSQuery("set_ActMail");
    q.args = {
      login: this.getLogin(),
      email: this.getEmail(),
    };
    q.sess_code = sess_code;
    // (await WSocket.get()).send(q);
    api.fetch(q).catch((e) => console.log("error=>", e)); //fetch-запрос
  }

  async set_CUserData(name: string, value: any, _options?: any) {
    var sess_code = value;
    var q: IWSQuery = new WSQuery("set_CUserData");
    const email = this.getEmail().match(regexp_email);
    const telephone = this.getTelephone().replace(regexp_dash, "");
    // const email = this.getEmail();
    // const phone = this.getTelephone();
    // const regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // const regexp_ph = /^((\+7|7|8)+([0-9]){10})$/;
    // const matches = email.match(regexp);
    // const matchesnum = phone.match(regexp_ph);

    if (this.getFamily().trim()) {
      this.setError_family(false);
      this.setTextHelpFamily("");
    } else {
      this.setError_family(true);
      this.setTextHelpFamily(EMPTY_FIELD_ERROR);
    }

    if (this.getName().trim()) {
      this.setError_name(false);
      this.setTextHelpName("");
    } else {
      this.setError_name(true);
      this.setTextHelpName(EMPTY_FIELD_ERROR);
    }

    if (email !== null) {
      this.setError_email(false);
      this.setEmail_message("");
    } else {
      this.setError_email(true);
      this.setEmail_message(INVALID_EMAIL_ERROR);
    }

    if (email !== null && this.getActMail() === false) {
      this.set_email(true);
      this.set_ActMail("sess_id", value);
    }

    if (this.getTelephone()) {
      this.setError_phone(false);
      this.setPhone_message("");
    } else {
      this.setError_phone(true);
      this.setPhone_message(EMPTY_FIELD_ERROR);
    }

    if (telephone.length === 12) {
      this.setError_phone(false);
      this.setPhone_message("");
    } else {
      this.setError_phone(true);
      this.setPhone_message(INVALID_TELEPHONE_ERROR);
    }

    const isValidValues = () => {
      return (
        !this.getError_family() &&
        !this.getError_name() &&
        !this.getError_email() &&
        !this.getError_phone()
      );
    };

    if (isValidValues()) {
      q.args = {
        family: this.getFamily(),
        login: this.getLogin(),
        name: this.getName(),
        father: this.getFather(),
        telephone: this.getTelephone(),
        email: this.getEmail(),
        info: this.getInfo(),
      };
      q.sess_code = sess_code;

      // (await WSocket.get()).send(q);
      api
        .fetch(q)
        .then(() => {
          if (this.getActMail() && !this.getSpawnAlert()) {
            setTimeout(() => {
              this.setPersonalAccaunt(false);
            }, 2000);
          }
        })
        .catch((e) => console.log("error=>", e)); // fetch-запрос

      //   if (this.getActMail() === true && this.getSpawnAlert() === false) {
      //     setTimeout(() => {
      //       this.setPersonalAccaunt(false);
      //     }, 1000);
      //   }
    }
  }

  async set_ChangePass(name: string, value: any, _options?: any) {
    var sess_code = value;
    var q: IWSQuery = new WSQuery("set_ChangePass");
    if (this.getOld_Pass() === "") {
      /// проверка пароля, если не пусто
      this.setErrr_old_pass(true);
      this.setError_old_message("Введите старый пароль.");
    }

    if (this.getOld_Pass() !== "") {
      ///если пароль введен , то удаляем ошибку
      this.setErrr_old_pass(false);
      this.setError_old_message("");
    }

    if (this.getNew_Pass() === "" && this.getOld_Pass() !== "") {
      this.setErrr_new_pass(true);
      this.setError_new_message("Введите новый пароль.");
    }

    if (this.getNew_Pass().length < 6) {
      this.setErrr_new_pass(true);
      this.setError_new_message("Пароль не должен быть короче 6 символов.");
    }

    if (this.getNew_Pass() !== "" && this.getNew_Pass().length > 6) {
      ///если пароль введен , то удаляем ошибку
      this.setErrr_new_pass(false);
      this.setError_new_message("");
    }

    if (
      this.getNew_Pass() !== this.getRepeat_password() &&
      this.getOld_Pass() !== "" &&
      this.getNew_Pass() !== ""
    ) {
      this.setError_pass(true);
      this.setError_message("Пароли не совпадают. Повторите попытку.");
    }

    if (this.getNew_Pass() === this.getRepeat_password()) {
      this.setError_pass(false);
      this.setError_message("");
    }

    if (
      this.getOld_Pass() !== "" &&
      this.getNew_Pass() !== "" &&
      this.getNew_Pass() === this.getRepeat_password() &&
      this.getNew_Pass().length > 6
    ) {
      q.args = {
        login: this.getLogin(),
        old_password: this.getOld_Pass().trim(),
        new_password: this.getNew_Pass().trim(),
        repeat_password: this.getRepeat_password().trim(),
      };
      q.sess_code = sess_code;
      // (await WSocket.get()).send(q);
      api.fetch(q).catch((e) => console.log("error=>", e)); //fetch-запрос
    }
  }

  onGetChangePass(dt: IWSResult) {
    this.setCmdErrPass(dt.error);
    APP_STORAGE.auth_form.setUserWS(dt);
    if (dt.error === "Старый пароль не верен") {
      this.setErrr_old_pass(true);
      this.setError_old_message(dt.error);
    }
    if (dt.error === "Новый пароль не должен повторять старый") {
      this.setError_pass(true);
      this.setError_message(dt.error);
    } else if (dt.error === null || dt.error === "") {
      this.setErrr_old_pass(false);
      this.setError_old_message("");
      this.setError_pass(false);
    }
  }

  onGetCUserData(dt: IWSResult) {
    this.setCmdErrData(dt.error);
    APP_STORAGE.auth_form.setUserWS(dt);
    if (this.getCmdErrData() === null) {
      this.setModal(null);
    }
  }
}
