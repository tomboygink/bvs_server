import { observable, action, computed, makeAutoObservable } from "mobx";
import { IWSQuery, IWSResult, WSQuery } from "../../../xcore/WSQuery";
import { WSocket } from "./WSocket";
import { api, api1 } from "../../../client/src/api/api";
import { CONFIG } from "../../../xcore/config";

import { getCookie, setCookie, deleteCookie } from "../storage/browserCookes";

import { UsersEntity } from "../../../xcore/dbase/Users";

import { AuthFormStorage } from "../../../client/src/storage/components/AuthFormStorage";
import {
  EMPTY_CONFIRM_CODE_ERROR,
  SAVE_ERROR,
  SAVE_SUCCESS,
} from "../../../client/utils/consts";

// ********************************************************************************************************************************************************
// ХРАНИЛИЩЕ

class AppStorage {
  @observable code: string = null;
  @observable dt: any = null;
  @observable error: boolean = false;
  @observable error_mess: string = "";
  @observable saveSuccess_mess: string = "";
  @observable saveError_mess: string = "";

  @action setCode(u: string) {
    this.code = u;
  }
  @computed getCode(): string {
    return this.code;
  }

  @action setError(u: boolean) {
    this.error = u;
  }
  @computed getError(): boolean {
    return this.error;
  }

  @action setErrorMess(u: string) {
    this.error_mess = u;
  }
  @computed getErorrMess(): string {
    return this.error_mess;
  }

  @action setSuccessSave_mess(val: string) {
    this.saveSuccess_mess = val;
  }

  @computed getSuccessSave_mess(): string {
    return this.saveSuccess_mess;
  }

  @action setErrorSave_mess(val: string) {
    this.saveError_mess = val;
  }

  @computed getErrorSave_mess(): string {
    return this.saveError_mess;
  }

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * Получить пользователя по коду сессии из куков (пользователь уже заходил с этого браузера)
   * @returns
   */

  async set_SendCode() {
    var ss_code = getCookie("sess_id");
    var q: IWSQuery = new WSQuery("set_MailCode");
    if (this.getCode() === null) {
      this.setError(true);
      this.setErrorMess("Введите код подтверждения");
    } else {
      this.setError(false);
      this.setErrorMess("");
      q.args = { code: this.getCode() };
      q.sess_code = ss_code;
      api
        .fetch(q)
        .then(() => {
          this.setSuccessSave_mess(SAVE_SUCCESS);
          setTimeout(() => {
            window.location.assign(`http://${CONFIG.host}:${CONFIG.port}`);
            this.setSuccessSave_mess(SAVE_SUCCESS);
          }, 2000);
        })
        .catch((e) => {
          console.log("error=>", e);
          this.setErrorSave_mess(SAVE_ERROR);
          setTimeout(() => {
            this.setErrorSave_mess("");
          }, 2000);
        });
      // (await WSocket.get()).send(q);
      // window.location.assign('http://127.0.0.1:3040/');
    }
  }
}

export const APP_STORAGE: AppStorage = new AppStorage();
