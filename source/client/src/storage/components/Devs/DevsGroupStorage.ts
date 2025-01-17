import { observable, action, computed, makeAutoObservable, toJS } from "mobx";
import { IWSQuery, WSQuery, IWSResult } from "../../../../../xcore/WSQuery";
import { WSocket } from "../../WSocket";
import { api, api1 } from "../../../api/api";
import { regexp_number } from "../../../../utils/consts";
import { getGroups, getMatchedOrg } from "../../../../utils/functions";
import { APP_STORAGE } from "../../AppStorage";
import {
  SAVE_ERROR,
  SAVE_SUCCESS,
  EMPTY_FIELD_ERROR,
  MATCHING_LOGIN_AND_PASS_ERROR,
  PASSWORDS_NOT_MATCH,
  INVALID_EMAIL_ERROR,
  INVALID_PASSWORD_ERROR,
} from "../../../../utils/consts";
import { ThirtyFpsTwoTone, ThreeSixty } from "@mui/icons-material";
import { IDevice, IGroup, ILocation } from "../../../models/IDevice";
import { IWell } from "../../../models/IWell";
import { TDevice } from "./DevEntityes";

export class DevsGroupStorage {
  @observable search: any;

  @observable open_modal: boolean = false;
  @observable middle_form: any = "";

  @observable org_id: number = null;
  @observable set_org_id: number = 0;

  @observable name: string = "";
  @observable key_org: any = "";
  @observable key_devsgr: any = "";
  @observable latitude: string = "";
  @observable longitude: string = "";
  @observable info: string = "";
  @observable parent_id: string = "";

  @observable parent: string = "";

  @observable select_parent_id: string = ""; ///перепроверить и переименовать элемент

  ////////////////////////////////////////////Проверка

  @observable name_err: boolean = false;
  @observable name_err_mess: string = "";

  @observable org_err: boolean = false;
  @observable org_err_mess: string = "";

  @observable latitude_err: boolean = false;
  @observable latitude_err_mess: string = "";
  @observable longitude_err: boolean = false;
  @observable longitude_err_mess: string = "";

  @observable open_menu: boolean = false; ///// открыть меню редактирования

  @observable defaultExpanded_devs_froups: Array<string> = [];

  @observable checkbox_editing: boolean = false;

  @observable open_modal_change: boolean = false; ////////////////меню редактирования (Редактировать расположение)
  @observable open_modal_move: boolean = false; //////////////// (Переместить расположение)

  @observable successSave_mess: string = ""; // Алерт в форме при успешном сохранении
  @observable errorSave_mess: string = ""; // Алерт в форме при ошибке

  @observable devs_groups: IGroup[] = [];

  @observable devs_numbers: Array<string> = [];

  @observable all_devs: IDevice[] = [];

  @observable locations: ILocation[] = [];
  @observable isLoading: boolean = false;
  constructor() {
    makeAutoObservable(this);
  }

  @action setSearch(val: any) {
    this.search = val;
  }
  @computed getSearch(): any {
    return this.search;
  }

  @action setOpenModalChDevsGr(val: boolean) {
    this.open_modal_change = val;
  }
  @computed getOpenModalChDevsGr(): boolean {
    return this.open_modal_change;
  }

  @action setOpenModalMoveDevsGr(val: boolean) {
    this.open_modal_move = val;
  } //// открыть меню "переместить расположение"
  @computed getOpenModalMoveDevsGr(): boolean {
    return this.open_modal_move;
  } ///////////////////////////////////////////////////////////////////////

  @action setCheckboxEd(val: boolean) {
    this.checkbox_editing = val;
  }
  @action getCheckboxEd(): boolean {
    return this.checkbox_editing;
  }

  @action setOpen_menu(val: boolean) {
    this.open_menu = val;
  } //// открыть  меню редактирования
  @computed getOpen_menu(): boolean {
    return this.open_menu;
  }

  @action setOrgId(val: number) {
    this.org_id = val;
  }
  @computed getOrgId(): number {
    return this.org_id;
  }

  @action setOrg(val: number) {
    this.set_org_id = val;
  }
  @computed getOrg(): number {
    return this.set_org_id;
  }

  @action setKeyOrg(val: any) {
    this.key_org = val;
  }
  @computed getKeyOrg(): any {
    return this.key_org;
  }

  @action setKeyDevsgr(val: any) {
    this.key_devsgr = val;
  }
  @computed getKeyDevsgr(): any {
    return this.key_devsgr;
  }

  @action setOpenModal(val: boolean) {
    this.open_modal = val;
  }
  @computed getOpenModal(): boolean {
    return this.open_modal;
  }

  @action setMiddleForm(val: any) {
    this.middle_form = val;
  }
  @computed getMiddleForm(): any {
    return this.middle_form;
  }

  @action setInfo(val: any) {
    this.info = val;
  }
  @computed getInfo(): any {
    return this.info;
  }

  /////////////////////////////////////////////////////////////////////////////место расположения устройства
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

  @action setParentId(val: string) {
    this.parent_id = val;
  }
  @computed getParentId(): string {
    return this.parent_id;
  }

  @action setParent(val: string) {
    this.parent = val;
  }
  @computed getParent(): string {
    return this.parent;
  }

  @action setSelectedParentId(val: string) {
    this.select_parent_id = val;
  } /////// перепроверить элемент и переименовать, если
  @computed getSelectedParentId(): string {
    return this.select_parent_id;
  }

  ///////////////////////////////////////////////Список расположений устройств
  @action setDevsGroups(val: IGroup[]) {
    this.devs_groups = val;
  }
  @computed getDevsGroups(): IGroup[] {
    return this.devs_groups;
  }

  @action setLocations(val: ILocation[]) {
    this.locations = val;
  }

  @computed getLocations(): ILocation[] {
    return this.locations;
  }

  // @action setDefaultExpandedDevsGroups(val: Array<string>) {
  //   this.defaultExpanded_devs_froups = val;
  // }
  // @computed getDefaultExpandedDevsGroups(): Array<string> {
  //   return this.defaultExpanded_devs_froups;
  // }

  //////////////////////////////////////////////////////////////////////////Проверка
  @action setNameError(val: boolean) {
    this.name_err = val;
  }
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

  @action setOrgError(val: boolean) {
    this.org_err = val;
  }
  @computed getOrgError(): boolean {
    return this.org_err;
  }

  @action setOrgError_mess(val: string) {
    this.org_err_mess = val;
  }
  @computed getOrgError_mess(): string {
    return this.org_err_mess;
  }

  // Сообщение при сохранении данных в форме
  @action setSuccessSave_mess(val: string) {
    return (this.successSave_mess = val);
  }

  @computed getSuccessSave_mess() {
    return this.successSave_mess;
  }

  // Сообщение при ошибке сохранения данных в форме
  @action setErrorSave_mess(val: string) {
    return (this.errorSave_mess = val);
  }

  @computed getErrorSave_mess() {
    return this.errorSave_mess;
  }

  // Массив номеров всех устройств
  @action setNumbers(val: Array<string>) {
    this.devs_numbers = val;
  }

  @computed getNumbers(): Array<string> {
    return this.devs_numbers;
  }

  @action setAllDevs(val: IDevice[]) {
    this.all_devs = val;
  }

  @computed getAllDevs(): IDevice[] {
    return this.all_devs;
  }

  @action setIsLoading(val: boolean) {
    this.isLoading = val;
  }
  @computed getIsLoading(): boolean {
    return this.isLoading;
  }

  async set_NewDevGroup(name: string, value: any, _options?: any) {
    ///////// Добавляем новое расположение устройств

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
    if (lngArr.length > 1) {
      // if (lngchar.match(/\./g).length > 1)
      // lng = lngchar.substr(0, latchar.lastIndexOf("."));
      lng = lngchar.substring(0, latchar.lastIndexOf("."));
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
    var q: IWSQuery = new WSQuery("set_NewDevGroup");
    if (this.getName().trim()) {
      this.setNameError(false);
      this.setNameError_mess("");
    } else {
      this.setNameError(true);
      this.setNameError_mess(EMPTY_FIELD_ERROR);
    }

    if (this.getKeyOrg()) {
      this.setOrgError(false);
      this.setOrgError_mess("");
    } else {
      this.setOrgError(true);
      this.setOrgError_mess(EMPTY_FIELD_ERROR);
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

    const isValidValue = () => {
      return (
        !this.getNameError() &&
        !this.getLatitudeError() &&
        !this.getLongitudeError() &&
        !this.getOrgError()
      );
    };

    if (
      isValidValue()
      // this.getName() !== "" &&
      // this.getLatitude() !== "" &&
      // this.getLongitude() !== "" &&
      // this.getKeyOrg() !== ""
    ) {
      q.args = {
        g_name: this.getName().replace(/"([^"]*)"/g, "«$1»") || "",
        latitude: lat,
        longitude: lng || "",
        org_id: this.getKeyOrg() || "",
        parent_id: this.getParentId(),
        ord_num: 0,
        deleted: false,
        g_info: this.getInfo() || "",
      };
      q.sess_code = sess_code;

      // (await WSocket.get()).send(q);
      // this.setOpenModal(false);
      api
        .fetch(q)
        .then(() => {
          this.setSuccessSave_mess(SAVE_SUCCESS);
          this.get_DevsGroups("sess_id", APP_STORAGE.auth_form.getdt());
          this.setName("");
          this.setKeyOrg("");
          this.setLatitude("");
          this.setLongitude("");
          setTimeout(() => {
            this.setOpenModal(false);
            this.setSuccessSave_mess("");
          }, 2000);
        })
        .catch((e) => {
          console.log("error=>", e);
          this.setErrorSave_mess(SAVE_ERROR);
          setTimeout(() => this.setErrorSave_mess(""), 2000);
        });
    }
  }

  async get_DevsGroups(name: string, value: any, _options?: any) {
    //// Отправляем запрос на получение расположений устройств
    var sess_code = value;
    var q: IWSQuery = new WSQuery("get_DevsGroups");
    q.args = {
      users_w: true,
      org_id: this.getOrgId() || "",
    };
    q.sess_code = sess_code;
    // (await WSocket.get()).send(q);
    if (this.getDevsGroups().length === 0) {
      this.setIsLoading(true);
    }

    api
      .fetch(q)
      .catch((e) => console.log("error=>", e))
      .finally(() => this.setIsLoading(false)); // fetch-запрос
  }

  //TODO: оптимизировать функцию
  setDevsGroupsAll(dt: IWSResult) {
    /* -----  Получаем все группы устройств   */

    if (typeof dt.data === "string") {
      const data = dt.data;
      //Экранируем символ перевода строки (чтобы приложение не ломалось, когда в многострочных полях строки есть перевод строки)
      const str: string = data.replace(/\n/g, "\\n");
      let devs_g = [];
      let DevGr = [];

      // Объект создан для корректной работы кода с fetch-запросами, в дальнейшем - переписать логику:
      let obj = {
        0: str,
      };

      // Условие для работы с Websocket:
      // if (
      //   Object.keys(JSON.parse(JSON.stringify(dt.data))).length !== 0 &&
      //   JSON.parse(JSON.stringify(dt.data)).constructor === Object
      // ) {
      //   devs_g = JSON.parse(JSON.stringify(dt.data));

      // }

      //Условие для работы с fetch:
      if (
        Object.keys(JSON.parse(JSON.stringify(dt.data))).length !== 0 &&
        obj.constructor === Object
      ) {
        devs_g = JSON.parse(JSON.stringify(obj));
      }

      for (var key in devs_g) {
        if (devs_g.hasOwnProperty(key)) {
          let a = devs_g[key];

          let root = JSON.parse(a);

          if (root.childs.length > 0) {
            for (let i = 0; i < root.childs.length; i++) {
              DevGr.push(root.childs[i]);
            }
          }
        }
      }

      this.setDevsGroups(DevGr);

      // const arr = DevGr.reduce((acc, { devs }) => {
      //   return [...acc, ...devs];
      // }, []);

      let allDevs: IDevice[] = [];
      const recursionDevs = (arr: IGroup[]) => {
        for (let elem of arr) {
          allDevs.push(...elem.devs);
          if (elem.childs.length !== 0) {
            recursionDevs(elem.childs);
          }
        }
      };
      recursionDevs(DevGr);
      this.setAllDevs(allDevs);

      const allNumbers = allDevs.map((dev) => {
        return dev.number;
      });
      this.setNumbers(allNumbers);
      this.setLocations(getGroups(DevGr));

      // APP_STORAGE.wells.fetchWells();

      // let wells: IWell[] = [];
      // const recursionWells = (group: IGroup[]) => {
      //   group.forEach((element) => {
      //     element.devs.forEach((dev) => {
      //       if (dev.well) {
      //         const org = getMatchedOrg(
      //           APP_STORAGE.reg_user.getOrgAll(),
      //           element.group.org_id
      //         );
      //         wells.push({
      //           number: dev.well,
      //           location: { id: element.group.id, name: element.group.g_name },
      //           org: { id: element.group.org_id, name: org },
      //           dev: { id: dev.id, number: dev.number },
      //         });
      //       }
      //     });
      //     if (element.childs.length > 0) {
      //       recursionWells(element.childs);
      //     }
      //   });
      // };
      // recursionWells(DevGr);
      //APP_STORAGE.wells.setWells(wells);
    }
  }

  async set_ChangeDevsGroups(name: string, value: any, _options?: any) {
    let lat: any;
    let lng: any;
    let latnumber = this.getLatitude().replace(regexp_number, ""); //// только цифты
    let latchar = latnumber.replace(/,/g, "."); //// то
    let latArr = latchar.match(/\./g) || [];
    if (latArr.length > 1) {
      // if (latchar.match(/\./g).length > 1)
      // lat = latchar.substr(0, latchar.lastIndexOf("."));
      lat = latchar.substring(0, latchar.lastIndexOf("."));
    } else {
      lat = latchar;
    }

    let lngnumber = this.getLongitude().replace(regexp_number, ""); //// только цифты
    let lngchar = lngnumber.replace(/,/g, "."); //// то
    let lngArr = lngchar.match(/\./g) || [];
    // if (lngchar.match(/\./g).length > 1)
    if (lngArr.length > 1) {
      // lng = lngchar.substr(0, latchar.lastIndexOf("."));
      lng = lngchar.substring(0, latchar.lastIndexOf("."));
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
    var q: IWSQuery = new WSQuery("set_ChangeDevsGroups");

    if (this.getName().trim()) {
      this.setNameError(false);
      this.setNameError_mess("");
    } else {
      this.setNameError(true);
      this.setNameError_mess(EMPTY_FIELD_ERROR);
    }

    if (this.getKeyOrg()) {
      this.setOrgError(false);
    } else this.setOrgError(true);

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

    // if (this.getName() === "") {
    //   this.setNameError(true);
    //   this.setNameError_mess("Поле не может быть пустым");
    // }

    // if (this.getName() !== "") {
    //   this.setNameError(false);
    //   this.setNameError_mess("");
    // }

    // if (this.getKeyOrg() !== "") {
    //   this.setOrgError(false);
    // }

    // if (this.getLatitude() === "") {
    //   this.setLatitudeError(true);
    //   this.setLatitudeError_mess("Поле не должно быть пустым");
    // }

    // if (this.getLatitude() !== "") {
    //   this.setLatitudeError(false);
    //   this.setLatitudeError_mess("");
    // }

    // if (this.getLongitude() === "") {
    //   this.setLongitudeError(true);
    //   this.setLongitudeError_mess("Поле не должно быть пустым");
    // }

    // if (this.getLongitude() !== "") {
    //   this.setLongitudeError(false);
    //   this.setLongitudeError_mess("");
    // }
    const isValidValue = () => {
      return (
        !this.getNameError() &&
        !this.getLatitudeError() &&
        !this.getLongitudeError() &&
        !this.getOrgError()
      );
    };

    if (
      isValidValue()
      // this.getName() !== "" &&
      // this.getLatitude() !== "" &&
      // this.getLongitude() !== "" &&
      // this.getKeyOrg() !== ""
    ) {
      q.args = {
        id: Number(this.getParentId()) || "",
        parent_id: Number(this.getParent()) || 0,
        name: this.getName().replace(/"([^"]*)"/g, "«$1»") || "" || "",
        latitude: lat || "",
        longitude: lng || "",
        org_id: Number(this.getKeyOrg()),
        ord_id: 0,
        deleted: this.getCheckboxEd(),
        info: this.getInfo() || "",
      };

      q.sess_code = sess_code;
      //(await WSocket.get()).send(q);
      // this.setOpenModalChDevsGr(false);

      api
        .fetch(q)
        .then(() => {
          this.setSuccessSave_mess(SAVE_SUCCESS);
          setTimeout(() => {
            this.setOpenModalChDevsGr(false);
            this.setOpenModalMoveDevsGr(false);
            this.setSuccessSave_mess("");
          }, 2000);
        })
        .catch((e) => {
          this.setErrorSave_mess(SAVE_ERROR);
          setTimeout(() => this.setErrorSave_mess(""), 2000);
          console.log("error=>", e);
        }); // fetch-запрос
    }
  }
}
