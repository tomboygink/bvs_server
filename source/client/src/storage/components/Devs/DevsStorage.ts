import { observable, action, computed, makeAutoObservable, toJS } from "mobx";
import { IWSQuery, WSQuery, IWSResult } from "../../../../../xcore/WSQuery";
import { WSocket } from "../../WSocket";
import { api, api1 } from "../../../api/api";
import { APP_STORAGE } from "../../AppStorage";
import { TDGroup } from "./DevEntityes";
import {
  EMPTY_FIELD_ERROR,
  SAVE_ERROR,
  SAVE_SUCCESS,
  DOEBL_NUMBER_ERROR,
} from "../../../../utils/consts";

export class DevsStorage {
  @observable gr: TDGroup = {
    id: 0,
    parent_id: 0,
    g_name: "",
    latitude: "",
    longitude: "",
    ord_num: "",
    org_id: "",
    g_info: "",
    deleted: false,
    svg: "",
  };

  @observable devs: Array<string> = [];

  @observable item: Array<any> = [];

  @observable array: Array<any> = [];
  @observable depth_new_sensors: Array<any> = [];
  @observable id_devs: string = "";

  @observable id_devs_ch: string = null;

  @observable open_modal: boolean = false;

  @observable open_modal_change: boolean = false;

  @observable open_modal_uploadSheme: boolean = false;

  @observable user_role: boolean = null;
  @observable org_id: number = null;

  @observable parent: number = null;

  @observable add_sensors: boolean = false; ///// модальное окно для добавления сенсоров
  @observable get_sensors: Array<any> = [];

  @observable get_sensors1: Array<any> = [];
  @observable get_sensors2: Array<any> = [];

  @observable array_sensors: Array<any> = [];

  @observable change_sensors: boolean = false;

  ////// Добавление нового устройства
  @observable id: string = "";
  @observable group_dev_id = "";
  @observable number: string = "";
  @observable default_number: string = "";
  @observable name: string = "";
  @observable latitude: string = "";
  @observable longitude: string = "";
  @observable deleted: boolean = false;
  @observable info: string = "";
  @observable sensors: number = 0;
  @observable change_sensors_value: string = "";
  @observable select_id_dev: string = "";

  @observable checkbox_editing: boolean = false;

  //////////////////////////////////////////// Проверка
  @observable number_err: boolean = false;
  @observable number_err_mess: string = "";

  @observable name_err: boolean = false;
  @observable name_err_mess: string = "";

  @observable org_err: boolean = false;
  @observable org_err_mess: string = "";

  @observable latitude_err: boolean = false;
  @observable latitude_err_mess: string = "";
  @observable longitude_err: boolean = false;
  @observable longitude_err_mess: string = "";

  @observable menu_devs: string = "";

  @observable save: string = "";

  @observable deactivate_constrolsess: any = "";
  @observable error_controlsess: any = "";

  @observable open_newdevpovs: boolean = false;

  @observable start_devpovs: string = "";
  @observable end_devpovs: string = "";

  @observable passedDay: string = "";
  @observable day: string = "";

  ///////////////////////////////////////////////////////////////////////////  Таблица сессий
  @observable rowsPerPage: number = 3;
  @observable page: number = 0;

  @observable top_menu_dev: string = "top_menu-1";

  @observable period_sess: number = 1;

  @observable errorSave_mess: string = "";

  @observable successSave_mess: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  @action setTopMenuDev(val: string) {
    this.top_menu_dev = val;
  }
  @computed getTopMenuDev(): string {
    return this.top_menu_dev;
  }

  @action setGr(val: TDGroup) {
    this.gr = val;
  } /////// Группа устройств
  @computed getGr(): TDGroup {
    return this.gr;
  }

  @action setDeactivateControlSess(val: any) {
    this.deactivate_constrolsess = val;
  }
  @computed getDeactivateControlSess(): any {
    return this.deactivate_constrolsess;
  }

  @action setErrorControlSess(val: any) {
    this.error_controlsess = val;
  }
  @computed getErrorControlSess(): any {
    return this.deactivate_constrolsess;
  }

  @action setRowsPerPage(val: number) {
    this.rowsPerPage = val;
  }
  @computed getRowsPerPage(): number {
    return this.rowsPerPage;
  }

  @action setPage(val: number) {
    this.page = val;
  }
  @computed getPage(): number {
    return this.page;
  }

  @action setMenu_devs(val: string) {
    this.menu_devs = val;
  }
  @computed getMenu_devs(): string {
    return this.menu_devs;
  }

  @action setCheckboxEd(val: boolean) {
    this.checkbox_editing = val;
  }
  @computed getCheckboxEd(): boolean {
    return this.checkbox_editing;
  }

  @observable setOrgId(val: number) {
    this.org_id = val;
  }
  @observable getOrgId(): number {
    return this.org_id;
  }

  @action setUserRole(val: boolean) {
    this.user_role = val;
  }
  @computed getUserRole(): boolean {
    return this.user_role;
  }

  @action setDevs(val: Array<string>) {
    this.devs = val;
  }
  @computed getDevs(): Array<string> {
    return this.devs;
  }

  @action setItem(val: Array<any>) {
    this.item = val;
  }
  @computed getItem(): Array<any> {
    return this.item;
  }

  @action setArray(val: Array<any>) {
    this.array = val;
  }
  @computed getArray(): Array<any> {
    return this.array;
  }

  @action setDepthNewSensors(val: Array<any>) {
    this.depth_new_sensors = val;
  }
  @computed getDepthNewSensors(): Array<any> {
    return this.depth_new_sensors;
  }

  @action setIdDevs(val: string) {
    this.id_devs = val;
  }
  @computed getIdDevs(): string {
    return this.id_devs;
  }

  @action setIdChild(val: string) {
    this.id_devs_ch = val;
  }
  @computed getIdChild(): string {
    return this.id_devs_ch;
  }

  @action setOpenModal(val: boolean) {
    this.open_modal = val;
  }
  @computed getOpenModal(): boolean {
    return this.open_modal;
  }

  @action setOpenModalChange(val: boolean) {
    this.open_modal_change = val;
  }
  @computed getOpenModalChange(): boolean {
    return this.open_modal_change;
  } /// открываем модальное окно редактирования

  @action setOpenModalUploadSheme(val: boolean) {
    this.open_modal_uploadSheme = val;
  }

  @computed getOpenModalUploadSheme(): boolean {
    return this.open_modal_uploadSheme;
  }

  ////// Добавление нового устройства
  @observable setId(val: string) {
    this.id = val;
  }
  @observable getId(): string {
    return this.id;
  }

  @observable setGroupDevId(val: string) {
    this.group_dev_id = val;
  }
  @observable getGroupDevId(): string {
    return this.group_dev_id;
  }

  @action setNumber(val: string) {
    this.number = val;
  }
  @computed getNumber(): string {
    return this.number;
  }
  @action setDefaultNumber(val: string) {
    this.default_number = val;
  }
  @computed getDefaultNumber(): string {
    return this.default_number;
  }
  @action setName(val: string) {
    this.name = val;
  }
  @computed getName(): string {
    return this.name;
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

  @action setDeleted(val: boolean) {
    this.deleted = val;
  }
  @computed getDeleted(): boolean {
    return this.deleted;
  }

  @action setInfo(val: string) {
    this.info = val;
  }
  @computed getInfo(): string {
    return this.info;
  }

  @action setSensors(val: number) {
    this.sensors = val;
  }
  @computed getSensors(): number {
    return this.sensors;
  }

  @action setChangeSensorsValue(val: string) {
    this.change_sensors_value = val;
  }
  @computed getChangeSensorsValue(): string {
    return this.change_sensors_value;
  }

  @action setParent(val: number) {
    this.parent = val;
  }
  @computed getParent(): number {
    return this.parent;
  }

  @action setIdDev(val: string) {
    this.select_id_dev = val;
  }
  @computed getIdDev(): string {
    return this.select_id_dev;
  }

  @action setDepthSensors(val: boolean) {
    this.add_sensors = val;
  } /// Добавление сенсоров (модальное окно)
  @computed getDepthSensors(): boolean {
    return this.add_sensors;
  }

  @action setDepthSensors_Ch(val: boolean) {
    this.change_sensors = val;
  } /// Добавление сенсоров (модальное окно)
  @computed getDepthSensors_Ch(): boolean {
    return this.change_sensors;
  }

  @action setChangeSensors(val: Array<any>) {
    this.get_sensors = val;
  }
  @computed getChangeSensors(): Array<any> {
    return this.get_sensors;
  }

  @action setChangeSensors1(val: Array<any>) {
    this.get_sensors1 = val;
  }
  @computed getChangeSensors1(): Array<any> {
    return this.get_sensors1;
  }

  @action setChangeSensors2(val: Array<any>) {
    this.get_sensors2 = val;
  }
  @computed getChangeSensors2(): Array<any> {
    return this.get_sensors2;
  }

  @action setSave(val: string) {
    this.save = val;
  }
  @computed getSave(): string {
    return this.save;
  }

  @action setArray_sensors(val: Array<any>) {
    this.array_sensors = val;
  }
  @computed getArray_sensors(): Array<any> {
    return this.array_sensors;
  }

  //////////////////////////////////////////////////////////////////////////Проверка
  @action setNumberError(val: boolean) {
    this.number_err = val;
  } /// проверка формы добавления устройства
  @computed getNumberError(): boolean {
    return this.number_err;
  }
  @action setNumberError_mess(val: string) {
    this.number_err_mess = val;
  }
  @computed getNumberError_mess(): string {
    return this.number_err_mess;
  }

  @action setNameError(val: boolean) {
    this.name_err = val;
  } /// проверка формы добавления устройства
  @computed getNameError(): boolean {
    return this.name_err;
  }
  @action setNameError_mess(val: string) {
    this.name_err_mess = val;
  }
  @computed getNameError_mess(): string {
    return this.name_err_mess;
  }

  @action setLatitudeError(val: boolean) {
    this.latitude_err = val;
  }
  @computed getLatitudeError(): boolean {
    return this.latitude_err;
  }
  @action setLatitudeError_mess(val: string) {
    this.latitude_err_mess = val;
  }
  @computed getLatitudeError_mess(): string {
    return this.latitude_err_mess;
  }

  @action setLongitudeError(val: boolean) {
    this.longitude_err = val;
  }
  @computed getLongitudeError(): boolean {
    return this.longitude_err;
  }
  @action setLongitudeError_mess(val: string) {
    this.longitude_err_mess = val;
  }
  @computed getLongitudeError_mess(): string {
    return this.longitude_err_mess;
  }

  @action setOpenNewdevpovs(val: boolean) {
    this.open_newdevpovs = val;
  }
  @computed getOpenNewdevpovs(): boolean {
    return this.open_newdevpovs;
  }

  @action setStartDevPovs(val: string) {
    this.start_devpovs = val;
  } //////////////////// Установить поверочный интервал начало
  @computed getStartDevPovs(): string {
    return this.start_devpovs;
  }

  @action setEndDevPovs(val: string) {
    this.end_devpovs = val;
  } //////////////////// Установить поверочный интервал окнчание
  @computed getEndDevPovs(): string {
    return this.end_devpovs;
  }

  @action setPassedDay(val: string) {
    this.passedDay = val;
  } //////////////////// Установить поверочный интервал окнчание
  @computed getPassedDay(): string {
    return this.passedDay;
  }

  @action setDay(val: string) {
    this.day = val;
  }
  @computed getDay(): string {
    return this.day;
  }

  @action setPeriodSess(val: number) {
    this.period_sess = val;
  }
  @computed getPeriodSess(): number {
    return this.period_sess;
  }

  //Сообщение при отправке формы

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
  // Где используется?
  async get_Devs(name: string, value: any, _options?: any) {
    var sess_code = value;
    var q: IWSQuery = new WSQuery("get_Devs");
    q.args = {
      org_id: this.getOrgId(),
      dev_group_id: this.getIdDevs(),
      user_w: this.getUserRole(),
    };
    q.sess_code = sess_code;
    // (await WSocket.get()).send(q);
    api.fetch(q).catch((e) => console.log("error=>", e)); //fetch-запрос
  }

  // async get_Devs11(name: string, value: any, _options?: any) {
  //   var sess_code = value;
  //   var q: IWSQuery = new WSQuery("get_Devs");
  //   q.args = {
  //     org_id: this.getOrgId(),
  //     dev_group_id: this.getIdChild(),
  //     user_w: this.getUserRole()
  //   };
  //   q.sess_code = sess_code;
  //   (await WSocket.get()).send(q);
  // }

  async set_NewDevs(name: string, value: any, _options?: any) {
    let lat: any;
    let lng: any;

    let latnumber = this.getLatitude().replace(/[^\d\.,]/g, ""); //// только цифты
    let latchar = latnumber.replace(/,/g, "."); //// то

    let latArr = latchar.match(/\./g) || [];
    // if (latchar.match(/\./g).length > 1)
    if (latArr.length > 1) {
      // lat = latchar.substr(0, latchar.lastIndexOf("."));
      lat = latchar.substring(0, latchar.lastIndexOf("."));
    } else {
      lat = latchar;
    }

    let lngnumber = this.getLongitude().replace(/[^\d\.,]/g, ""); //// только цифты
    let lngchar = lngnumber.replace(/,/g, "."); //// то
    let lngArr = lngchar.match(/\./g) || [];

    //if (lngchar.match(/\./g).length > 1)
    if (lngArr.length > 1) {
      // lng = lngchar.substr(0, latchar.lastIndexOf("."));
      lng = lngchar.substring(0, latchar.lastIndexOf("."));
    } else {
      lng = lngchar;
    }

    if (String(lng) === "." || String(lng) === "0") {
      lng = "0.0";
    }

    if (String(lat) === "." || String(lat) === "0") {
      lat = "0.0";
    }
    this.setLatitude(lat);
    this.setLongitude(lng);
    if (this.getNumber().trim()) {
      this.setNumberError(false);
      this.setNumberError_mess("");
    } else {
      this.setNumberError(true);
      this.setNumberError_mess(EMPTY_FIELD_ERROR);
    }

    if (this.getName().trim()) {
      this.setNameError(false);
      this.setNameError_mess("");
    } else {
      this.setNameError(true);
      this.setNameError_mess(EMPTY_FIELD_ERROR);
    }

    if (this.getLatitude()) {
      this.setLatitudeError(false);
      this.setLatitudeError_mess("");
    } else {
      this.setLatitudeError(true);
      this.setLatitudeError_mess(EMPTY_FIELD_ERROR);
    }

    if (this.getLongitude()) {
      this.setLongitudeError(false);
      this.setLongitudeError_mess("");
    } else {
      this.setLongitudeError(true);
      this.setLongitudeError_mess(EMPTY_FIELD_ERROR);
    }
    const isValidValues = () => {
      return (
        !this.getNumberError() &&
        !this.getNameError() &&
        !this.getLongitudeError() &&
        !this.getLatitudeError()
      );
    };

    var sess_code = value;
    var q: IWSQuery = new WSQuery("set_NewDevs");

    if (isValidValues()) {
      q.args = {
        group_dev_id: this.getIdDevs(),
        number: this.getNumber() || "",
        name: this.getName().replace(/"([^"]*)"/g, "«$1»") || "",
        latitude: lat || "",
        longitude: lng || "",
        sensors: '{"s":' + JSON.stringify(this.getDepthNewSensors()) + "}",
        deleted: this.getDeleted() || false,
        info: this.getInfo() || "",
        period_sess: this.getPeriodSess() || "",
      };
      q.sess_code = sess_code;
      // (await WSocket.get()).send(q);

      api
        .fetch(q)
        .then(() => {
          APP_STORAGE.devs_groups.get_DevsGroups(
            "sess_id",
            APP_STORAGE.auth_form.getdt()
          );
          if (!APP_STORAGE.shared_store.getErrorResponseMess()) {
            this.setSuccessSave_mess(SAVE_SUCCESS);
          } else {
            setTimeout(() => {
              APP_STORAGE.shared_store.setErrorResponseMess("");
            }, 2000);
          }
          this.setName("");
          this.setNumber("");
          this.setLatitude("");
          this.setLongitude("");
          this.setInfo("");
          this.setArray([]);
          APP_STORAGE.setNotifications(true); // нужно?

          setTimeout(() => {
            this.setOpenModal(false);
            this.setSuccessSave_mess("");
            this.setErrorSave_mess("");
            APP_STORAGE.setNotifications(false);
          }, 2000);
        })
        .catch((e) => {
          console.log("error=>", e);
          this.setErrorSave_mess(SAVE_ERROR);
          setTimeout(() => {
            this.setErrorSave_mess("");
          }, 2000);
        }); //fetch-запрос
      // this.setName("");
      // this.setNumber("");
      // this.setLatitude("");
      // this.setLongitude("");
      // this.setInfo("");
      // this.setArray([]);

      // APP_STORAGE.setNotifications(true);

      // setTimeout(() => {
      //   APP_STORAGE.setNotifications(false);
      // }, 1000);
      // setTimeout(() => {
      //   this.setOpenModal(false);
      // }, 1000);
    }
  }

  async setDevsAll(dt: IWSResult) {
    this.setDevs(dt.data);
  }

  async set_DevsDepth(value: number) {
    let a = { depth: value, value: 1 };

    this.array.push(a);

    const uniqueChars = this.array.reduce((o: any, i: any) => {
      ////////////////// Редюсом убираем дубликаты
      if (!o.find((v: { depth: any }) => v.depth == i.depth)) {
        o.push(i);
      }
      return o;
    }, []);
  }

  async set_ChangeDevs(name: string, value: any, _options?: any) {
    const numbers = APP_STORAGE.devs_groups.getNumbers();
    let lat: any;
    let lng: any;

    let latnumber = this.getLatitude().replace(/[^\d\.,]/g, ""); //// только цифты
    let latchar = latnumber.replace(/,/g, "."); //// то

    let latArr = latchar.match(/\./g) || [];
    // if (latchar.match(/\./g).length > 1)
    if (latArr.length > 1) {
      // lat = latchar.substr(0, latchar.lastIndexOf("."));
      lat = latchar.substring(0, latchar.lastIndexOf("."));
    } else {
      lat = latchar;
    }

    let lngnumber = this.getLongitude().replace(/[^\d\.,]/g, ""); //// только цифты
    let lngchar = lngnumber.replace(/,/g, "."); //// то
    let lngArr = lngchar.match(/\./g) || [];

    //if (lngchar.match(/\./g).length > 1)
    if (lngArr.length > 1) {
      // lng = lngchar.substr(0, latchar.lastIndexOf("."));
      lng = lngchar.substring(0, latchar.lastIndexOf("."));
    } else {
      lng = lngchar;
    }

    if (String(lng) === "." || String(lng) === "0") {
      lng = "0.0";
    }

    if (String(lat) === "." || String(lat) === "0") {
      lat = "0.0";
    }
    this.setLatitude(lat);
    this.setLongitude(lng);

    var sess_code = value;

    if (this.getName().trim()) {
      this.setNameError(false);
      this.setNameError_mess("");
    } else {
      this.setNameError(true);
      this.setNameError_mess(EMPTY_FIELD_ERROR);
    }

    if (this.getLatitude()) {
      this.setLatitudeError(false);
      this.setLatitudeError_mess("");
    } else {
      this.setLatitudeError(true);
      this.setLatitudeError_mess(EMPTY_FIELD_ERROR);
    }

    if (this.getLongitude()) {
      this.setLongitudeError(false);
      this.setLongitudeError_mess("");
    } else {
      this.setLongitudeError(true);
      this.setLongitudeError_mess(EMPTY_FIELD_ERROR);
    }

    // Проверка на совпадения по номерам
    if (!this.getNumber().trim()) {
      this.setNumberError(true);
      this.setNumberError_mess(EMPTY_FIELD_ERROR);
    } else if (
      this.getNumber() !== this.getDefaultNumber() &&
      numbers.includes(this.getNumber())
    ) {
      this.setNumberError(true);
      this.setNumberError_mess(DOEBL_NUMBER_ERROR);
    } else {
      this.setNumberError(false);
      this.setNumberError_mess("");
    }

    const isValidValues = () => {
      return (
        !this.getNumberError() &&
        !this.getNameError() &&
        !this.getLongitudeError() &&
        !this.getLatitudeError()
      );
    };

    var q: IWSQuery = new WSQuery("set_ChangeDevs");
    if (
      isValidValues()
      // this.getNumber() &&
      // this.getName() !== "" &&
      // this.getLatitude() !== "" &&
      // this.getLongitude() !== ""
    ) {
      q.args = {
        id: this.getId() || "",
        group_dev_id: this.getGroupDevId() || "",
        number: this.getNumber().replace(/"([^"]*)"/g, "«$1»") || "" || "",
        name: this.getName().replace(/"([^"]*)"/g, "«$1»") || "" || "",
        latitude: lat || "0.0",
        longitude: lng || "0.0",
        sensors: '{"s":' + JSON.stringify(this.getChangeSensors()) + "}",
        deleted: this.getCheckboxEd(),
        info: this.getInfo() || "",
        period_sess: this.getPeriodSess() || 0,
      };
      q.sess_code = sess_code;
      // (await WSocket.get()).send(q);
      api
        .fetch(q)
        .then(() => {
          if (APP_STORAGE.shared_store.getErrorResponseMess().length === 0) {
            APP_STORAGE.devs_groups.get_DevsGroups(
              "sess_id",
              APP_STORAGE.auth_form.getdt()
            );
            this.setSuccessSave_mess(SAVE_SUCCESS);
            setTimeout(() => {
              this.setSuccessSave_mess("");
              this.setOpenModalChange(false);
            }, 2000);
          } else {
            this.setErrorSave_mess(SAVE_ERROR);
            setTimeout(() => {
              this.setErrorSave_mess("");
              APP_STORAGE.shared_store.setErrorResponseMess("");
            }, 2000);
          }
        })
        .catch((e) => {
          console.log("error=>", e);
          this.setErrorSave_mess(SAVE_ERROR);
          setTimeout(() => {
            this.setErrorSave_mess("");
          }, 2000);
        }); // fetch-запрос

      // setTimeout(() => {
      //   this.setOpenModalChange(false);
      // }, 2000);
    }
  }

  async set_NewDevPovs(name: string, value: any, _options?: any) {
    //////// Поверочный интервал
    var sess_code = value;
    var q: IWSQuery = new WSQuery("set_NewDevPovs");

    if (
      this.getStartDevPovs() === "" ||
      this.getEndDevPovs() === ""
    ) {

      var tzoffset = new Date().getTimezoneOffset() * 60000; // смещение в миллисекундах
      var localISOTime = new Date(Date.now() - tzoffset)
        .toISOString()
        .slice(0, -8);
      this.setStartDevPovs(localISOTime);
      this.setEndDevPovs(localISOTime); // => '2023-03-16T09:00'
    }
    q.args = {
      dev_id: this.getId(),
      dev_number: this.getNumber(),
      start_povs: this.getStartDevPovs(),
      end_povs: this.getEndDevPovs(),
      old_dev_povs: APP_STORAGE.sensors.getOldDevPovs(),
    };
    q.sess_code = sess_code;
    // (await WSocket.get()).send(q);
    api
      .fetch(q)
      .then((data) => {
        APP_STORAGE.reg_user.setResulSave("Поверочный интервал установлен");
      })
      .catch((e) => console.log("error=>", e));

    // APP_STORAGE.reg_user.setResulSave("Поверочный интервал установлен");
    setTimeout(() => {
      APP_STORAGE.reg_user.setResulSave("");
      this.setOpenNewdevpovs(false);
      APP_STORAGE.sensors.get_DevPovs(APP_STORAGE.auth_form.getdt());
    }, 2000);
  }

  async set_NewControlDevSess(
    value: any,
    id_sess: any,
    dev_id: any,
    dev_number: any
  ) {
    //////// Установка контрольной сессии

    var sess_code = value;
    var q: IWSQuery = new WSQuery("set_NewControlDevSess");

    q.args = {
      dev_sess_id: id_sess,
      dev_id: dev_id,
      dev_number: dev_number,
    };
    q.sess_code = sess_code;
    // (await WSocket.get()).send(q);
    api.fetch(q).catch((e) => console.log("error=>", e)); // fetch-запрос
  }

  async deleteControlDevSess(value: any, id_sess: any) {
    var sess_code = id_sess;
    var q: IWSQuery = new WSQuery("deleteControlDevSess");

    q.args = {
      id: APP_STORAGE.sensors.getIdFirstSess(),
    };

    q.sess_code = sess_code;
    api
      .fetch(q)
      .then(() => {
        APP_STORAGE.sensors.get_DevFirstLastSessions(
          "sess_id",
          APP_STORAGE.auth_form.getdt()
        );
      })
      .catch((e) => console.log("error=>", e)); // fetch-запрос
    // (await WSocket.get()).send(q);
    // setTimeout(() => {
    //   ///////////////////////////////////////////Функция для отрисовки графика при нажатии на устройство
    //   APP_STORAGE.sensors.get_DevFirstLastSessions(
    //     "sess_id",
    //     APP_STORAGE.auth_form.getdt()
    //   );
    // }, 100);
  }

  async get_NewControlDevSess(dt: IWSResult) {
    /* -----  Получаем все должности   */
    this.setDeactivateControlSess(dt.data);
    this.setErrorControlSess(dt.error);
    APP_STORAGE.sensors.get_DevFirstLastSessions(
      "sess_id",
      APP_STORAGE.auth_form.getdt()
    );
  }

  async set_SchemeSvg(sess_code: string) {
    alert("hjg11");
    var q: IWSQuery = new WSQuery("set_SchemeSvg");
    q.args = {
      id: APP_STORAGE.devs_groups.getParentId(),
      svg_file: "APP_STORAGE.importdevs.getSvg()",
    };
    q.sess_code = sess_code;
    // (await WSocket.get()).send(q);
    api.fetch(q).catch((e) => console.log("error=>", e)); // fetch-запрос
  }
}
