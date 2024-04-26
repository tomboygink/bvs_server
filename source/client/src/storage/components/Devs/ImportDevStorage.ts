import { observable, action, computed, makeAutoObservable } from "mobx";
import { IWSQuery, WSQuery, IWSResult } from "../../../../../xcore/WSQuery";
import { WSocket } from "../../WSocket";
import { api, api1 } from "../../../api/api";
import { getDigitalStr } from "../../../../utils/functions";

import { APP_STORAGE } from "../../AppStorage";
import { toJS } from "mobx";

import {
  MATCHING_TEMPLATE_ERROR,
  SAVE_ERROR,
  SAVE_SUCCESS,
} from "../../../../utils/consts";
import { json } from "stream/consumers";

export class ImportDevStorage {
  @observable modal: boolean = false;
  @observable modal_svg: boolean = false;
  @observable jsonData: Array<any> = [];

  @observable svgData: any = [];
  @observable svgString: string = "";

  @observable devShemeSvg: any = [];

  @observable text_button: string = "";

  @observable successfully_text = "";

  @observable base64 = "";

  @observable errorSave_mess: string = "";
  @observable successSave_mess: string = "";
  @observable duplicates: Array<string> = [];
  @observable invalid_devs: Array<string> = [];
  @observable valid_devs: Array<string> = [];
  @observable errorSaved_devs: Array<string> = [];

  constructor() {
    makeAutoObservable(this);
  }

  @action setOpenModal(val: boolean) {
    this.modal = val;
  }
  @computed getOpenModal(): boolean {
    return this.modal;
  }

  @action setOpenModalSvg(val: boolean) {
    this.modal_svg = val;
  }
  @computed getOpenModalSvg(): boolean {
    return this.modal_svg;
  }

  @action setArrayJsonData(val: Array<any>) {
    this.jsonData = val;
  }
  @computed getArrayJsonData(): Array<any> {
    return this.jsonData;
  }

  @action setArraySvgData(val: any) {
    this.svgData = val;
  }
  @computed getArraySvgData(): any {
    return this.svgData;
  }
  @action setDevShemeSvgData(val: any) {
    this.devShemeSvg = val;
  }

  @computed getDevShemeSvgData(): any {
    return this.devShemeSvg;
  }

  @action setSvg(val: any) {
    this.svgString = val;
  }
  @computed getSvg(): any {
    return this.svgString;
  }

  @action setText_Button(val: string) {
    this.text_button = val;
  }
  @computed getText_Button(): string {
    return this.text_button;
  }

  @action setSuccessfully_text(val: string) {
    this.successfully_text = val;
  }
  @computed getSuccessfully_text(): string {
    return this.successfully_text;
  }

  @action setBase4(val: string) {
    this.base64 = val;
  }
  @computed getBase4(): string {
    return this.base64;
  }

  @action setErrorSave_mess(val: string) {
    this.errorSave_mess = val;
  }

  @computed getErrorSave_mess(): string {
    return this.errorSave_mess;
  }

  @action setSuccessSave_mess(val: string) {
    this.successSave_mess = val;
  }

  @computed getSuccessSave_mess(): string {
    return this.successSave_mess;
  }

  @action setDuplicates(val: Array<string>) {
    this.duplicates = [...this.duplicates, ...val];
  }
  @action clearDuplicates() {
    this.duplicates = [];
  }

  @computed getDuplicates(): Array<string> {
    return this.duplicates;
  }

  @action setInvalid_devs(val: string) {
    this.invalid_devs.push(val);
  }

  @action clearInvalid_devs() {
    this.invalid_devs = [];
  }

  @computed getInvalid_devs(): Array<string> {
    return this.invalid_devs;
  }

  @action setErrorSaved_devs(val: string) {
    this.errorSaved_devs.push(val);
  }

  @action clearErrorSaved_devs() {
    this.errorSaved_devs = [];
  }

  @computed getErrorSaved_devs(): Array<string> {
    return this.errorSaved_devs;
  }
  @action setValid_devs(val: string) {
    this.valid_devs.push(val);
  }

  @action clearValid_devs() {
    this.valid_devs = [];
  }

  @computed getValid_devs(): Array<string> {
    return this.valid_devs;
  }
  async Uploadfile() {
    try {
      const sess_code = APP_STORAGE.auth_form.getdt();
      const q: IWSQuery = new WSQuery("set_NewDevs");

      let m1: any;
      let array_senssors;
      let array_number: any;
      let lat: any;
      let lng: any;
      let sess: string;
      const arr = APP_STORAGE.importdevs.getArrayJsonData();
      const numbers = APP_STORAGE.devs_groups.getNumbers();
      this.clearDuplicates();
      this.clearInvalid_devs();
      this.clearValid_devs();
      this.clearErrorSaved_devs();

      arr.forEach((item, i) => {
        const isValid = () => {
          return (
            String(item[0]).trim() !== "" &&
            String(item[1]).trim() !== "" &&
            String(item[2]).trim() !== "" &&
            String(item[3]) !== "" &&
            String(item[4]) !== "" &&
            !Number.isNaN(Number(item[0])) &&
            !Number.isNaN(Number(item[2])) &&
            !Number.isNaN(Number(item[3])) &&
            !Number.isNaN(Number(item[4]))
          );
        };

        if (!isValid()) {
          this.setInvalid_devs(String(item[0]));
        } else {
          m1 = item.slice(5);
          array_senssors = m1;
          array_number = array_senssors.filter(
            (el: any) => typeof el === "number"
          );
          let senssors = array_number.map((val: { toString: () => any }) => ({
            depth: val.toString(),
            value: 1,
          }));

          if (numbers.includes(String(item[0]))) {
            this.setDuplicates([String(item[0])]);
          } else {
            this.setValid_devs(String(item[0]));
          }
          if (Number(item[2] !== (1 || 7 || 14 || 31))) {
            sess = "1";
          } else {
            sess = item[2];
          }

          if (Number(item[3] !== 0) && Number(item[4] !== 0)) {
            let latchar = getDigitalStr(String(item[3]));
            let lngchar = getDigitalStr(String(item[4]));

            const removeExtraDots = (str: string) => {
              const firstDotIndex = str.indexOf(".");
              if (firstDotIndex !== 1) {
                const withoutDots =
                  str.slice(0, firstDotIndex + 1) +
                  str.slice(firstDotIndex + 1).replace(/\./g, "");
                return withoutDots;
              } else return str;
            };
            lat = removeExtraDots(latchar);
            lng = removeExtraDots(lngchar);

            if (
              lat.startsWith(".") ||
              lat.endsWith(".") ||
              lng.startsWith(".") ||
              lng.endsWith(".")
            ) {
              lat = "0.0";
              lng = "0.0";
            }
          } else if (Number(item[3] === 0) && Number(item[4] === 0)) {
            lat = "0.0";
            lng = "0.0";
          } else throw new Error("Произошла неизвестная ошибка");

          q.args = {
            group_dev_id: APP_STORAGE.devs.getIdDevs(),
            number: String(item[0]) || "",
            name: item[1] || "",
            latitude: lat,
            longitude: lng,
            sensors: '{"s":' + JSON.stringify(senssors) + "}",
            deleted: false,
            info: "",
            period_sess: sess || "",
          };
          q.sess_code = sess_code;

          api
            .fetch(q)
            .then(() => {})
            .catch((e) => {
              console.log("error=>", e.message);
              this.setErrorSaved_devs(String(item[0]));
            }); // fetch-запрос
        }
      });

      APP_STORAGE.devs_groups.get_DevsGroups(
        "sess_id",
        APP_STORAGE.auth_form.getdt()
      );
    } catch (err) {
      console.log("error=>", err.message);

      this.setErrorSave_mess(MATCHING_TEMPLATE_ERROR);
      setTimeout(() => {
        this.setErrorSave_mess("");
      }, 3000);
    } finally {
      APP_STORAGE.importdevs.setArrayJsonData([]);
    }
  }

  // TODO: remove this

  async uploadfile() {
    let tooltip = document.getElementById("tooltip");
    APP_STORAGE.importdevs.setOpenModalSvg(false);
    const hrefs: SVGElement[] = Array.from(document.querySelectorAll(".well"));
    hrefs.forEach((item, i) => {
      item.addEventListener("mouseout", () => {
        item.style.stroke = "";
        tooltip.style.display = "none";
      });
      item.addEventListener("mousemove", () => {
        APP_STORAGE.devs.getChangeSensors2().forEach((dev, j) => {
          if (item.id.slice(5) === dev.id) {
            item.style.stroke = "#25E48B";
            const clientRectangle = item.getBoundingClientRect();
            tooltip.innerHTML =
              "Номер косы" +
              "-" +
              APP_STORAGE.devs.getChangeSensors2()[j].number;
            tooltip.style.display = "block";
            tooltip.style.left = clientRectangle.left + "px";
            tooltip.style.top = clientRectangle.top + "px";
          }
        });
      });
      item.addEventListener("click", () => {
        APP_STORAGE.devs.getChangeSensors2().forEach((dev, j) => {
          if (item.id.slice(5) === dev.id) {
            APP_STORAGE.devs.setIdChild("_dev_id_key_" + item.id.slice(5));
            APP_STORAGE.sensors.setEmptySession("");
            APP_STORAGE.sensors.setSessFirstLast([]);
            APP_STORAGE.sensors.setSessFirstLastCharts([]);
            APP_STORAGE.sensors.setSess_first([]);
            APP_STORAGE.sensors.setSess_second([]);
            APP_STORAGE.sensors.setSortDesc("");
            APP_STORAGE.sensors.setAkbSessChose("");
            APP_STORAGE.sensors.setChoseSessTime("");
            APP_STORAGE.sensors.setAkbSessLast("");
            APP_STORAGE.devs_groups.setMiddleForm(2);
            APP_STORAGE.devs.setTopMenuDev("top_menu-1");
          }
        });
      });
    });
  }

  async set_SchemeSvg(sess_code: string) {
    var q: IWSQuery = new WSQuery("set_SchemeSvg");
    q.args = {
      id: APP_STORAGE.devs_groups.getParentId(),
      svg_file: this.getArraySvgData(), ////data:image\/svg\+xml;base64
    };
    q.sess_code = sess_code;
    api
      .fetch(q)
      .then(() => {
        APP_STORAGE.devs_groups.get_DevsGroups(
          "sess_id",
          APP_STORAGE.auth_form.getdt()
        );
        this.setSuccessSave_mess(SAVE_SUCCESS);
        setTimeout(() => {
          this.setSuccessSave_mess("");
        }, 2000);
      })
      .catch((e) => {
        console.log("error=>", e.message);
        this.setErrorSave_mess(SAVE_ERROR);
        setTimeout(() => {
          this.setErrorSave_mess("");
        }, 2000);
      });
    // (await WSocket.get()).send(q);
    // setTimeout(() => {
    //   APP_STORAGE.devs_groups.get_DevsGroups(
    //     "sess_id",
    //     APP_STORAGE.auth_form.getdt()
    //   );
    // }, 100);
  }

  set_DevShemeSvg(sess_code: string) {
    const q: IWSQuery = new WSQuery("set_ThermoStreamer_Svg");

    q.args = {
      id: APP_STORAGE.devs.getId(),
      svg_file: this.getDevShemeSvgData(), ////data:image\/svg\+xml;base64
    };
    q.sess_code = sess_code;

    api
      .fetch(q)
      .then(() => {
        this.setSuccessSave_mess(SAVE_SUCCESS);
        setTimeout(() => {
          APP_STORAGE.devs.setOpenModalUploadSheme(false);
          APP_STORAGE.importdevs.setDevShemeSvgData("");
          this.setSuccessSave_mess("");
        }, 2000);
      })
      .catch((e) => {
        console.log("error=>", e.message);
        this.setErrorSave_mess(SAVE_ERROR);
        setTimeout(() => {
          this.setErrorSave_mess("");
        }, 2000);
      });
  }
}
