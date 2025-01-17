import { observable, action, computed, makeAutoObservable } from "mobx";
import { UsersEntity } from "../../../../xcore/dbase/Users";
import { IWSQuery, WSQuery, IWSResult } from "../../../../xcore/WSQuery";
import { WSocket } from "../WSocket";
import { api, api1 } from "../../api/api";
import {
  getCookie,
  setCookie,
  deleteCookie,
  deleteAllCookies,
} from "../browserCookes";
import { StoreMallDirectory, ThumbUpSharp } from "@mui/icons-material";
import { CONFIG } from "../../../../xcore/config";
import { SAVE_ERROR, SAVE_SUCCESS } from "../../../utils/consts";

export class AuthFormStorage {
  @observable login: string = ""; //observable определяет отслеживаемое поле, в котором хранится состояние.
  @observable password: string = "";

  ///если пользователь забыл пароль
  @observable email: string = "";
  @observable new_password: string = "";
  @observable repeat_password: string = "";
  @observable code: string = "";
  @observable dt_set_forgPass: string = ""; /// если данные успешно отправлены

  @observable user: UsersEntity = null;

  @observable cmderror: any = null; // используется в компоненте Alert , если есть ошибка
  @observable alert_forg_pass: string = ""; // для смены пароля ( форма ForgotPassForm )

  @observable dt: string = null; ///куки

  @observable forgot_pass: boolean = false;

  @observable email_err: boolean = false; ///ошибка при вводе адреса электронной почты
  @observable email_err_mess: string = ""; ///сообщение об ошибке адреса электронной почты

  @observable login_err: boolean = false; ///ошибка при вводе адреса электронной почты
  @observable login_err_mess: string = ""; ///сообщение об ошибке адреса электронной почты

  @observable errr_new_pass: boolean = false;
  @observable error_new_message: string = null;

  @observable errr_repeat_pass: boolean = false;
  @observable error_repeat_message: string = null;

  @observable error_code: boolean = false; /// если поле КОД пусто,  помечаем поле как error
  @observable error_code_mess: string = ""; /// если поле КОД пусто, то отправляем сообщение об ошибке

  @observable succesSave_mess: string = "";
  @observable errorSave_mess: string = "";

  @observable isLoad: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  @action setLogin(val: string) {
    this.login = val;
  } //устанавливает значение поля - Логин
  @computed getLogin(): string {
    return this.login;
  } //возвращает значение поля - Логин (отмечает геттер)

  @action setPassword(val: string) {
    this.password = val;
  } //устанавливает значение поля - Пароль
  @computed getPassword(): string {
    return this.password;
  } //возвращает значение поля - Пароль

  @action setUser(u: UsersEntity) {
    this.user = u;
  } //устанавливает значение класса UsersEntity
  @computed getUser(): UsersEntity {
    return this.user;
  } //возвращает значение класса UsersEntity

  @action setCmderror(u: any) {
    this.cmderror = u;
  } // ошибки cmd (Websoket)
  @computed getCmderror(): any {
    return this.cmderror;
  }

  @action setAlertForgPass(val: any) {
    this.alert_forg_pass = val;
  } //
  @computed getAlertForgPass(): any {
    return this.alert_forg_pass;
  }

  @action setdt(u: string) {
    this.dt = u;
  }
  @computed getdt(): string {
    return this.dt;
  }

  @action setForgotPass(u: boolean) {
    this.forgot_pass = u;
  }
  @action getForgotPass(): boolean {
    return this.forgot_pass;
  }

  ///////////////////////Если пользователь забыл пароль

  @action set_forgPass(val: string) {
    this.dt_set_forgPass = val;
  } // помещаем описание ошибки от сервера - cmd set_ForgPass
  @computed get_forgPass(): string {
    return this.dt_set_forgPass;
  }

  @action setEmail(val: string) {
    this.email = val;
  }
  @computed getEmail(): string {
    return this.email;
  }

  @action setNewPass(val: string) {
    this.new_password = val;
  }
  @computed getNewPass(): string {
    return this.new_password;
  }

  @action setRepeatPass(val: string) {
    this.repeat_password = val;
  }
  @computed getRepeatPass(): string {
    return this.repeat_password;
  }

  @action setError_login(val: boolean) {
    this.login_err = val;
  }
  @computed getError_login(): boolean {
    return this.login_err;
  } /////передаем ошибку - поле Логин

  @action setLogin_message(val: string) {
    this.login_err_mess = val;
  } //////передаем сообщение об ошибке - поле Логин
  @computed getLogin_message(): string {
    return this.login_err_mess;
  }

  @action setError_emain(val: boolean) {
    this.email_err = val;
  }
  @computed getError_emain(): boolean {
    return this.email_err;
  } /////передаем ошибку

  @action setEmail_message(val: string) {
    this.email_err_mess = val;
  } //////передаем сообщение об ошибке
  @computed getEmail_message(): string {
    return this.email_err_mess;
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

  @action setError_repeat_pass(val: boolean) {
    this.errr_repeat_pass = val;
  }
  @computed getError_repeat_pass(): boolean {
    return this.errr_repeat_pass;
  }

  @action setError_repeat_message(val: string) {
    this.error_repeat_message = val;
  }
  @computed getError_repeat_message(): string {
    return this.error_repeat_message;
  }

  @action setError_code(val: boolean) {
    this.error_code = val;
  }
  @computed getError_code(): boolean {
    return this.error_code;
  }

  @action setError_code_mess(val: string) {
    this.error_code_mess = val;
  }
  @computed getError_code_mess(): string {
    return this.error_code_mess;
  }

  @action setCode(val: string) {
    this.code = val;
  }
  @computed getCode(): string {
    return this.code;
  }

  @action setSuccessSave_mess(val: string) {
    this.succesSave_mess = val;
  }

  @computed getSuccessSave_mess(): string {
    return this.succesSave_mess;
  }

  @action setErrorSave_mess(val: string) {
    this.errorSave_mess = val;
  }

  @computed getErrorSave_mess(): string {
    return this.errorSave_mess;
  }

  @action setIsLoad(val: boolean) {
    this.isLoad = val;
  }

  @computed getIsLoad(): boolean {
    return this.isLoad;
  }

  async get_UserByAuth() {
    var q: IWSQuery = new WSQuery("get_UserByAuth");
    q.args = { login: this.getLogin(), password: this.getPassword() };
    api.fetch(q).catch((e) => console.log("error=>", e)); // fetch-запрос
    // (await WSocket.get()).send(q);
  }

  async set_ForgPass() {
    // Функция восстановления пароля
    const email = this.getEmail();
    const regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const matches = email.match(regexp);

    if (matches === null) {
      this.setError_emain(true);
      this.setEmail_message(
        'Адрес электронной почты должен содержать символ "@"'
      );
    } else {
      this.setError_emain(false);
      this.setEmail_message("");
    }

    if (this.getEmail() !== "") {
      var q: IWSQuery = new WSQuery("set_ForgPass");
      q.args = {
        email: this.getEmail(),
      };
      api.fetch(q).catch((e) => console.log("error=>", e)); // fetch-запрос
      //(await WSocket.get()).send(q);
    }
  }

  async set_SaveNewPass() {
    if (
      // this.getLogin() !== "" &&
      // this.getNewPass() !== "" &&
      // this.getRepeatPass() !== "" &&
      // this.getNewPass() === this.getRepeatPass() &&
      this.getCode() !== ""
    ) {
      var q: IWSQuery = new WSQuery("set_SaveNewPass");
      q.args = {
        login: this.getLogin(),
        new_password: this.getNewPass(),
        repeat_password: this.getRepeatPass(),
        code: this.getCode(),
      };
      // (await WSocket.get()).send(q);
      api
        .fetch(q)
        .then(() => {
          this.setSuccessSave_mess(SAVE_SUCCESS);
          setTimeout(() => {
            window.location.assign(`http://${CONFIG.host}:${CONFIG.port}`);
            this.setSuccessSave_mess("");
          }, 2000);
        })
        .catch((e) => {
          console.log("error=>", e);
          this.setErrorSave_mess(SAVE_ERROR);
          setTimeout(() => {
            this.setErrorSave_mess("");
          }, 2000);
        }); // fetch-запрос
    }
  }

  setUserWS(dt: IWSResult) {
    if (dt.error !== null && dt.error.trim() !== "") {
    }
    var data: UsersEntity[] = new Array();
    for (var key in dt.data) data.push(dt.data[key]);

    if (data.length > 0 && dt.cmd) {
      if (data[0].id > 0) {
        // СОХРАНИТЬ ПОЛЬЗОВАТЕЛЯ В ХРАНИЛИЩЕ ДАННЫХ КАК ТЕКУЩЕГО ПОЛЬЗОВАТЕЛЯ СИСТЕМЫ !!!!!!!
        setCookie("sess_id", dt.code);
        this.setdt(dt.code);
        this.setUser(data[0]);
      }
    }
  }

  onGetUserByAuth(dt: IWSResult) {
    this.setUserWS(dt);
    this.setCmderror(dt.error);
  }

  onGetUserBySessionCode(dt: IWSResult) {
    this.setUserWS(dt);
    if (dt.error) {
      deleteAllCookies();

      ///deleteCookie('sess_id', this.getdt() )
      window.location.href = `http://${CONFIG.host}:${CONFIG.port}`;
    }
  }

  onSaveNewPass(dt: IWSResult) {
    //////////// Socket result cmd - set_ForgPass
    this.set_forgPass(dt.error);
    if (this.get_forgPass() !== null) {
      this.set_forgPass(dt.error);
    }
  }
}
