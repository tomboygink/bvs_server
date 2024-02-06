import { observable, action, computed, makeAutoObservable } from "mobx";

import { APP_STORAGE } from "../../../storage/AppStorage";
import { IWSQuery, WSQuery, IWSResult } from "../../../../../xcore/WSQuery";
import { WSocket } from "../../WSocket";
import { api, api1 } from "../../../api/api";
import {
  Apartment,
  DataThresholdingSharp,
  ResetTvOutlined,
} from "@mui/icons-material";
import {
  SAVE_SUCCESS,
  SAVE_ERROR,
  EMPTY_FIELD_ERROR,
  INVALID_INN_ERROR,
} from "../../../../utils/consts";

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

  //Валидация

  @observable full_name_org_error: boolean = false;
  @observable full_name_org_help_text: string = "";
  @observable name_org_error: boolean = false;
  @observable name_org_help_text: string = "";
  @observable inn_error: boolean = false;
  @observable inn_help_text: string = "";
  @observable address_error: boolean = false;
  @observable address_help_text: string = "";
  @observable latitude_error: boolean = false;
  @observable latitude_help_text: string = "";
  @observable longitude_error: boolean = false;
  @observable longitude_help_text: string = "";
  @observable successSave_mess: string = "";
  @observable errorSave_mess: string = "";

  constructor() {
    makeAutoObservable(this);
  }
  @action setModalEditOrg(val: boolean) {
    this.modal_edit_org = val;
  } /// Для открытия модального окна (Регистрация пользователя)
  @computed getModalEditOrg(): boolean {
    return this.modal_edit_org;
  }

  @action setKeyOrg(val: any) {
    this.key_org = val;
  }
  @computed getKeyOrg(): any {
    return this.key_org;
  }

  @action setFullNameOrg(val: string) {
    this.full_name_org = val;
  }
  @computed getFullNameOrg(): string {
    return this.full_name_org;
  }

  @action setNameOrg(val: string) {
    this.name_org = val;
  }
  @computed getNameOrg(): string {
    return this.name_org;
  }

  @action setInn(val: string) {
    this.inn = val;
  }
  @computed getInn(): string {
    return this.inn;
  }

  @action setAddress(val: string) {
    this.address = val;
  }
  @computed getAddress(): string {
    return this.address;
  }

  @action setLatitude(val: string) {
    this.latitude = val;
  }
  @computed getLatitude(): string {
    return this.latitude;
  }

  @action setLongitude(val: string) {
    this.longitude = val;
  }
  @computed getLongitude(): string {
    return this.longitude;
  }

  @action setInfOrg(val: string) {
    this.info_org = val;
  }
  @computed getInfOrg(): string {
    return this.info_org;
  }

  @action setErrorFullNameOrg(val: boolean) {
    this.full_name_org_error = val;
  }

  @computed getErrorFullNameOrg(): boolean {
    return this.full_name_org_error;
  }

  @action setHelpTextFullNameOrg(val: string) {
    this.full_name_org_help_text = val;
  }

  @computed getHelpTextFullNameOrg(): string {
    return this.full_name_org_help_text;
  }

  @action setErrorNameOrg(val: boolean) {
    this.name_org_error = val;
  }

  @computed getErrorNameOrg(): boolean {
    return this.name_org_error;
  }

  @action setHelpTextNameOrg(val: string) {
    this.name_org_help_text = val;
  }

  @computed getHelpTextNameOrg(): string {
    return this.name_org_help_text;
  }

  @action setErrorInn(val: boolean) {
    this.inn_error = val;
  }

  @computed getErrorInn(): boolean {
    return this.inn_error;
  }

  @action setHelpTextInn(val: string) {
    this.inn_help_text = val;
  }

  @computed getHelpTextInn(): string {
    return this.inn_help_text;
  }

  @action setErrorAddress(val: boolean) {
    this.address_error = val;
  }

  @computed getErrorAddress(): boolean {
    return this.address_error;
  }

  @action setHelpTextAddress(val: string) {
    this.address_help_text = val;
  }
  @computed getHelpTextAddress(): string {
    return this.address_help_text;
  }

  @action setErrorLatitude(val: boolean) {
    this.latitude_error = val;
  }

  @computed getErrorLatitude(): boolean {
    return this.latitude_error;
  }

  @action setHelpTextLatitude(val: string) {
    this.latitude_help_text = val;
  }

  @computed getHelpTextLatitude(): string {
    return this.latitude_help_text;
  }

  @action setErrorLongititude(val: boolean) {
    this.longitude_error = val;
  }

  @computed getErrorLongitude(): boolean {
    return this.longitude_error;
  }

  @action setHelpTextLongitude(val: string) {
    this.longitude_help_text = val;
  }

  @computed getHelpTextLongitude(): string {
    return this.longitude_help_text;
  }

  @action setSuccessSave_mess(val: string) {
    this.successSave_mess = val;
  }

  @computed getSuccessSave_mess(): string {
    return this.successSave_mess;
  }

  @action setErrorSave_mess(val: string) {
    this.errorSave_mess = val;
  }

  @computed getErrorSave_mess(): string {
    return this.errorSave_mess;
  }
  ///////////////////////изменение организации

  async get_ChangeOrg(dt: IWSResult) {
    if (dt.error === null) {
      APP_STORAGE.reg_user.get_Org("sess_id", APP_STORAGE.auth_form.getdt()); /// получаем все организации
    }
  }

  async set_ChangeOrg(name: string, value: any, _options?: any) {
    const regexp_inn = /^[0-9]+$/; /// регулярное выражение для ввода только цифр для поля ИНН
    const inn = this.getInn().match(regexp_inn);

    if (this.getFullNameOrg().trim()) {
      this.setErrorFullNameOrg(false);
      this.setHelpTextFullNameOrg("");
    } else {
      this.setErrorFullNameOrg(true);
      this.setHelpTextFullNameOrg(EMPTY_FIELD_ERROR);
    }

    if (this.getNameOrg().trim()) {
      this.setErrorNameOrg(false);
      this.setHelpTextNameOrg("");
    } else {
      this.setErrorNameOrg(true);
      this.setHelpTextNameOrg(EMPTY_FIELD_ERROR);
    }

    if (this.getInn().length === 10) {
      this.setErrorInn(false);
      this.setHelpTextInn("");
    } else {
      this.setErrorInn(true);
      this.setHelpTextInn(INVALID_INN_ERROR);
    }

    if (this.getAddress().trim()) {
      this.setErrorAddress(false);
      this.setHelpTextAddress("");
    } else {
      this.setErrorAddress(true);
      this.setHelpTextAddress(EMPTY_FIELD_ERROR);
    }

    if (this.getLatitude()) {
      this.setErrorLatitude(false);
      this.setHelpTextLatitude("");
    } else {
      this.setErrorLatitude(true);
      this.setHelpTextLatitude(EMPTY_FIELD_ERROR);
    }

    if (this.getLongitude()) {
      this.setErrorLongititude(false);
      this.setHelpTextLongitude("");
    } else {
      this.setErrorLongititude(true);
      this.setHelpTextLongitude(EMPTY_FIELD_ERROR);
    }

    const isValidValues = () => {
      return (
        !this.getErrorFullNameOrg() &&
        !this.getErrorNameOrg() &&
        !this.getErrorInn() &&
        !this.getErrorLatitude() &&
        !this.getErrorLongitude()
      );
    };
    console.log("isValid=>", isValidValues());

    if (
      isValidValues()
      // this.getAddress() !== "" &&
      // this.getFullNameOrg() !== "" &&
      // this.getNameOrg() !== "" &&
      // this.getInn() !== ""
    ) {
      var sess_code = value;
      var q: IWSQuery = new WSQuery("set_ChangeOrg");
      q.args = {
        id: this.getKeyOrg() || "",
        name: this.getNameOrg() || "",
        full_name: this.getFullNameOrg() || "",
        inn: this.getInn(),
        address: this.getAddress(),
        latitude: this.getLatitude(),
        longitude: this.getLongitude(),
        info: this.getInfOrg(),
      };
      q.sess_code = sess_code;

      api
        .fetch(q)
        .then(() => {
          this.setSuccessSave_mess(SAVE_SUCCESS);
          // APP_STORAGE.reg_user.get_Org("sess_id", value);

          setTimeout(() => {
            this.setSuccessSave_mess("");
            APP_STORAGE.reg_user.setModalRegUser(false);
            APP_STORAGE.org.setModalEditOrg(false);
          }, 2000);
        })

        .catch((e) => {
          console.log("error=>", e);
          this.setErrorSave_mess(SAVE_ERROR);
          setTimeout(() => {
            this.setErrorSave_mess("");
          }, 2000);
        }); //fetch-запрос
      // (await WSocket.get()).send(q);
      // APP_STORAGE.reg_user.setResulSave("Данные успешно сохранены");

      // setTimeout(() => {
      //   APP_STORAGE.reg_user.setResulSave("");
      //   APP_STORAGE.reg_user.setModalRegUser(false);

      //   APP_STORAGE.org.setModalEditOrg(false);
      // }, 1000);
    }
  }

  // Где используется (дубль)?
  async setChangeJobs_Titles(name: string, value: any, _options?: any) {
    var sess_code = value;
    var q: IWSQuery = new WSQuery("set_ChangeJobs_Titles");
    q.args = {
      id: 1 || "",
      org_id: 1 || "",
      name: "ewqewewqewqe" || "",
      info: "APP_STORAGE.jobs.getInfo()" || "",
    };
    q.sess_code = sess_code;
    api.fetch(q).catch((e) => console.log("error=>", e)); // fetch-запрос
    // (await WSocket.get()).send(q);
  }
}
