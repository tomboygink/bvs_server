import { observable, action, computed, makeAutoObservable } from "mobx";

import { APP_STORAGE } from "../../AppStorage";
import { IWSQuery, WSQuery, IWSResult } from "../../../../../xcore/WSQuery";
import { WSocket } from "../../WSocket";
import { api, api1 } from "../../../api/api";
import {
  SAVE_SUCCESS,
  SAVE_ERROR,
  EMPTY_FIELD_ERROR,
} from "../../../../utils/consts";

export class JobsTitlesStorage {
  @observable modal_edit_jobstitle: boolean = false;

  @observable jobs_titles: string = ""; ///// Изменение организации
  @observable info: string = "";
  @observable id: string = ""; ///// id организации
  @observable id_org: string = ""; // id организации
  @observable error_title: boolean = false;
  @observable texthelp_title: string = "";
  @observable error_org: boolean = false;
  @observable texthelp_org: string = "";

  @observable name: string;

  constructor() {
    makeAutoObservable(this);
  }
  @action setModalEditJobsTitles(val: boolean) {
    this.modal_edit_jobstitle = val;
  } /// Для открытия модального окна (Регистрация пользователя)
  @computed getModalEditJobsTitles(): boolean {
    return this.modal_edit_jobstitle;
  }

  @action setId(val: string) {
    this.id = val;
  }
  @computed getId(): string {
    return this.id;
  }

  @action setJobsTitles(val: string) {
    this.jobs_titles = val;
  }
  @computed getJobsTitles(): string {
    return this.jobs_titles;
  }

  @action setInfo(val: string) {
    this.info = val;
  }
  @computed getInfo(): string {
    return this.info;
  }

  @action setIdOrg(val: string) {
    this.id_org = val;
  }
  @computed getIdOrg(): string {
    return this.id_org;
  }

  //Валидация формы
  @action setErrorTitle(val: boolean) {
    this.error_title = val;
  }

  @computed getErrorTitle(): boolean {
    return this.error_title;
  }

  @action setTextHelpTitle(val: string) {
    this.texthelp_title = val;
  }

  @computed getTextHelpTitle(): string {
    return this.texthelp_title;
  }

  @action setErrorOrg(val: boolean) {
    this.error_org = val;
  }

  @computed getErrorOrg(): boolean {
    return this.error_org;
  }

  @action setTextHelpOrg(val: string) {
    this.texthelp_org = val;
  }

  @computed getTextHelpOrg(): string {
    return this.texthelp_org;
  }
  // Запрос на изменение наименования должности
  async setChangeJobs_Titles(name: string, value: any, _options?: any) {
    var sess_code = value;
    var q: IWSQuery = new WSQuery("set_ChangeJobs_Titles");
    if (this.getJobsTitles().trim()) {
      this.setErrorTitle(false);
      this.setTextHelpTitle("");
    } else {
      this.setErrorTitle(true);
      this.setTextHelpTitle(EMPTY_FIELD_ERROR);
    }

    if (this.getIdOrg()) {
      this.setErrorOrg(false);
      this.setTextHelpOrg("");
    } else {
      this.setErrorOrg(false);
      this.setTextHelpOrg("");
    }

    const isValidValues = () => {
      return !this.getErrorOrg() && !this.getErrorTitle();
    };

    if (isValidValues()) {
      q.args = {
        id: this.getId() || "",
        org_id: this.getIdOrg() || "",
        name: this.getJobsTitles() || "",
        info: this.getInfo() || "",
      };
      q.sess_code = sess_code;
      // (await WSocket.get()).send(q);
      api
        .fetch(q)
        .then(() => {
          APP_STORAGE.edit_user.setSuccessSave_mess(SAVE_SUCCESS);
          APP_STORAGE.edit_user.get_Jobs("sess_id", value);
          setTimeout(() => {
            this.setModalEditJobsTitles(false);
            APP_STORAGE.edit_user.setSuccessSave_mess("");
          }, 2000);
        })

        .catch((e) => {
          APP_STORAGE.edit_user.setErrorSave_mess(SAVE_ERROR);
          console.log("error=>", e);
          setTimeout(() => {
            APP_STORAGE.edit_user.setErrorSave_mess("");
          }, 2000);
        }); //fetch-запрос
    }
  }
}
