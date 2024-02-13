import { observable, action, computed, makeAutoObservable } from "mobx";
import { APP_STORAGE } from "./AppStorage";
import { IWSQuery, WSQuery, IWSResult } from "../../../xcore/WSQuery";

export class SharedSrorage {
  // Ошибка добавления данных в бд
  @observable error_response: boolean = false;
  @observable error_response_mess: string = "";

  constructor() {
    makeAutoObservable(this);
    Map<string, string>;
  }

  @action setErrorResponseMess(val: string) {
    this.error_response_mess = val;
  }

  @computed getErrorResponseMess(): string {
    return this.error_response_mess;
  }

  setResponseErrorMess(dt: IWSResult) {
    this.setErrorResponseMess(dt.error);
  }
}
