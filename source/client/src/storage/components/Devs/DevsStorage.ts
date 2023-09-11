import { observable, action, computed, makeAutoObservable, toJS } from "mobx";
import { IWSQuery, WSQuery, IWSResult } from "../../../../../xcore/WSQuery";
import { WSocket } from "../../WSocket";
import { APP_STORAGE } from "../../AppStorage";
import { TDGroup } from "./DevEntityes";

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
    svg: ""
  };

  @observable devs: Array<string> = [];

  @observable item: Array<any> = [];

  @observable array: Array<any> = [];
  @observable depth_new_sensors: Array<any> = [];
  @observable id_devs: string = "";

  @observable id_devs_ch: string = null;

  @observable open_modal: boolean = false;

  @observable open_modal_change: boolean = false;

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

  @observable period_sess: string = "";

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
  @computed getNamaError_mess(): string {
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

  @action setPeriodSess(val: string) {
    this.period_sess = val;
  }
  @computed getPeriodSess(): string {
    return this.period_sess;
  }

  async get_Devs(name: string, value: any, _options?: any) {
    var sess_code = value;
    var q: IWSQuery = new WSQuery("get_Devs");
    q.args = {
      org_id: this.getOrgId(),
      dev_group_id: this.getIdDevs(),
      user_w: this.getUserRole()
    };
    q.sess_code = sess_code;
    (await WSocket.get()).send(q);
  }

  async get_Devs11(name: string, value: any, _options?: any) {
    var sess_code = value;
    var q: IWSQuery = new WSQuery("get_Devs");
    q.args = {
      org_id: this.getOrgId(),
      dev_group_id: this.getIdChild(),
      user_w: this.getUserRole()
    };
    q.sess_code = sess_code;
    (await WSocket.get()).send(q);
  }

  async set_NewDevs(name: string, value: any, _options?: any) {
    let lat: any;
    let lng: any;
    let latnumber = this.getLatitude().replace(/[^\d\.,]/g, ""); //// только цифты
    let latchar = latnumber.replace(/,/g, "."); //// то
    if (latchar.match(/\./g).length > 1) {
      lat = latchar.substr(0, latchar.lastIndexOf("."));
    } else {
      lat = latchar;
    }

    let lngnumber = this.getLongitude().replace(/[^\d\.,]/g, ""); //// только цифты
    let lngchar = lngnumber.replace(/,/g, "."); //// то
    if (lngchar.match(/\./g).length > 1) {
      lng = lngchar.substr(0, latchar.lastIndexOf("."));
    } else {
      lng = lngchar;
    }

    if (String(lng) === ".") {
      lng = Number(0.0);
    }

    if (String(lat) === ".") {
      lat = Number(0.0);
    }
    this.setLatitude(lat);
    this.setLongitude(lng);

    if (this.getNumber() === "") {
      this.setNumberError(true);
      this.setNumberError_mess("Поле не может быть пустым");
    }

    if (this.getNumber() !== "") {
      this.setNumberError(false);
      this.setNumberError_mess("");
    }

    if (this.getName() === "") {
      this.setNameError(true);
      this.setNameError_mess("Поле не может быть пустым");
    }

    if (this.getName() !== "") {
      this.setNameError(false);
      this.setNameError_mess("");
    }

    if (this.getLatitude() === "") {
      this.setLatitudeError(true);
      this.setLatitudeError_mess("Поле не может быть пустым");
    }

    if (this.getLatitude() !== "") {
      this.setLatitudeError(false);
      this.setLatitudeError_mess("");
    }

    if (this.getLongitude() === "") {
      this.setLongitudeError(true);
      this.setLongitudeError_mess("Поле не может быть пустым");
    }

    if (this.getLongitude() !== "") {
      this.setLongitudeError(false);
      this.setLongitudeError_mess("");
    }

    var sess_code = value;
    var q: IWSQuery = new WSQuery("set_NewDevs");

    if (
      this.getNumber() !== "" &&
      this.getName() !== "" &&
      this.getLatitude() !== "" &&
      this.getLongitude() !== ""
    ) {
      q.args = {
        group_dev_id: this.getIdDevs(),
        number: this.getNumber() || "",
        name: this.getName().replace(/"([^"]*)"/g, "«$1»") || "",
        latitude: lat || "",
        longitude: lng || "",
        sensors: '{"s":' + JSON.stringify(this.getDepthNewSensors()) + "}",
        deleted: this.getDeleted() || false,
        info: this.getDeleted() || "",
        period_sess: this.getPeriodSess() || ""
      };
      q.sess_code = sess_code;
      (await WSocket.get()).send(q);
      this.setName("");
      this.setNumber("");
      this.setLatitude("");
      this.setLongitude("");
      this.setInfo("");
      this.setArray([]);

      APP_STORAGE.setNotifications(true);

      setTimeout(() => {
        APP_STORAGE.setNotifications(false);
      }, 1000);
      setTimeout(() => {
        this.setOpenModal(false);
      }, 1000);
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
    let lat: any;
    let lng: any;
    let latnumber = this.getLatitude().replace(/[^\d\.,]/g, ""); //// только цифты
    let latchar = latnumber.replace(/,/g, "."); //// то
    if (latchar.match(/\./g).length > 1) {
      lat = latchar.substr(0, latchar.lastIndexOf("."));
    } else {
      lat = latchar;
    }

    let lngnumber = this.getLongitude().replace(/[^\d\.,]/g, ""); //// только цифты
    let lngchar = lngnumber.replace(/,/g, "."); //// то
    if (lngchar.match(/\./g).length > 1) {
      lng = lngchar.substr(0, latchar.lastIndexOf("."));
    } else {
      lng = lngchar;
    }

    if (String(lng) === ".") {
      lng = Number(0.0);
    }

    if (String(lat) === ".") {
      lat = Number(0.0);
    }
    this.setLatitude(lat);
    this.setLongitude(lng);

    var sess_code = value;
    if (this.getNumber() === "") {
      this.setNumberError(true);
      this.setNumberError_mess("Необходимо ввести номер устройства");
    }
    if (this.getNumber() !== "") {
      this.setNumberError(false);
      this.setNumberError_mess("");
    }

    if (this.getName() === "") {
      this.setNameError(true);
      this.setNameError_mess("Необходимо ввести название устройства");
    }
    if (this.getName() !== "") {
      this.setNameError(false);
      this.setNameError_mess("");
    }

    if (this.getLatitude() === "") {
      this.setLatitudeError(true);
      this.setLatitudeError_mess("Поле не должно быть пустым");
    }
    if (this.getLatitude() !== "") {
      this.setLatitudeError(false);
      this.setLatitudeError_mess("");
    }

    if (this.getLongitude() === "") {
      this.setLongitudeError(true);
      this.setLongitudeError_mess("Поле не должно быть пустым");
    }
    if (this.getLongitude() !== "") {
      this.setLongitudeError(false);
      this.setLongitudeError_mess("");
    }

    var q: IWSQuery = new WSQuery("set_ChangeDevs");
    if (
      this.getNumber() &&
      this.getName() !== "" &&
      this.getLatitude() !== "" &&
      this.getLongitude() !== ""
    ) {
      q.args = {
        id: this.getId() || "",
        group_dev_id: this.getGroupDevId() || "",
        number: this.getNumber().replace(/"([^"]*)"/g, "«$1»") || "" || "",
        name: this.getName().replace(/"([^"]*)"/g, "«$1»") || "" || "",
        latitude: lat || "",
        longitude: lng || "",
        sensors: '{"s":' + JSON.stringify(this.getChangeSensors()) + "}",
        deleted: this.getCheckboxEd(),
        info: this.getInfo() || "",
        period_sess: this.getPeriodSess() || ""
      };

      q.sess_code = sess_code;
      (await WSocket.get()).send(q);
      setTimeout(() => {
        this.setOpenModalChange(false);
      }, 2000);
    }
  }

  async set_NewDevPovs(name: string, value: any, _options?: any) {
    //////// Поверочный интервал
    var sess_code = value;
    var q: IWSQuery = new WSQuery("set_NewDevPovs");

    q.args = {
      dev_id: this.getId(),
      dev_number: this.getNumber(),
      start_povs: this.getStartDevPovs(),
      end_povs: this.getEndDevPovs(),
      old_dev_povs: APP_STORAGE.sensors.getOldDevPovs()
    };
    q.sess_code = sess_code;
    (await WSocket.get()).send(q);

    APP_STORAGE.reg_user.setResulSave("Поверочный интервал установлен");
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
      dev_number: dev_number
    };
    q.sess_code = sess_code;
    (await WSocket.get()).send(q);
  }

  async deleteControlDevSess(value: any, id_sess: any) {
    var sess_code = id_sess;
    var q: IWSQuery = new WSQuery("deleteControlDevSess");

    q.args = {
      id: APP_STORAGE.sensors.getIdFirstSess()
    };

    q.sess_code = sess_code;
    (await WSocket.get()).send(q);
    setTimeout(() => {
      ///////////////////////////////////////////Функция для отрисовки графика при нажатии на устройство
      APP_STORAGE.sensors.get_DevFirstLastSessions(
        "sess_id",
        APP_STORAGE.auth_form.getdt()
      );
    }, 100);
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
      svg_file: "APP_STORAGE.importdevs.getSvg()"
    };
    q.sess_code = sess_code;
    (await WSocket.get()).send(q);
  }
}
