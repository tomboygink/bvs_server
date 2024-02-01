import { observable, action, computed, makeAutoObservable } from "mobx";
import { APP_STORAGE } from "./AppStorage";
import { IWSQuery, WSQuery, IWSResult } from "../../../xcore/WSQuery";

export class SharedSrorage {
  // Ошибка добавления данных в бд
  @observable error_response: boolean = false;
  @observable error_response_mess: string = "";

  // Дублирование данных в бд

  constructor() {
    makeAutoObservable(this);
    Map<string, string>;
  }
  //   @action setErrorResponse(val: boolean) {
  //     this.error_response = val;
  //   }

  //   @computed getErrorResponse(): boolean {
  //     return this.error_response;
  //   }
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
