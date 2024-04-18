import { observable, action, computed, makeAutoObservable, toJS } from "mobx";
import { IWSQuery, WSQuery, IWSResult } from "../../../../../xcore/WSQuery";
import { IWell, IDefaultWell } from "../../../models/IWell";
import { APP_STORAGE } from "../../AppStorage";
import { api, api1 } from "../../../api/api";
import { getMatchedOrg } from "../../../../utils/functions";
import { IGroup, ILocation } from "../../../models/IDevice";
import { SAVE_SUCCESS, SAVE_ERROR } from "../../../../utils/consts";

export class WellsStorage {
  @observable well: IWell = {
    id: "",
    number: "",
    location: {
      id: "",
      name: "",
    },
    org: {
      id: "",
      name: "",
    },
    dev: {
      id: "",
      number: "",
    },
  };

  @observable defaultWell: IDefaultWell = {
    id: "",
    number: "",
    org_id: "",
    group_id: "",
    dev_id: "",
  };
  // @observable wells: IWell[] = [];
  @observable defaultWells: IDefaultWell[] = [];
  @observable openModal: boolean = false;

  @observable successSave_mess: string = "";
  @observable errorSave_mess: string = "";

  constructor() {
    makeAutoObservable(this);
  }
  @action setSelectedWell(well: IWell) {
    this.well = well;
  }

  @computed getSelectedWell(): IWell {
    return this.well;
  }

  @action setSuccessSave_mess(val: string) {
    this.successSave_mess = val;
  }

  @computed getSuccessSave_mess() {
    return this.successSave_mess;
  }

  @action setErrorSave_mess(val: string) {
    this.errorSave_mess = val;
  }

  @computed getErrorSave_mess() {
    return this.errorSave_mess;
  }
  @action setDefaultWells(wells: IDefaultWell[]) {
    this.defaultWells = wells;
  }
  @computed getDefaultWells(): IDefaultWell[] {
    return this.defaultWells;
  }
  @action setOpenModal(val: boolean) {
    this.openModal = val;
  }
  @computed getOpenModal(): boolean {
    return this.openModal;
  }

  fetchWells() {
    const sess_code = APP_STORAGE.auth_form.getdt();
    const q: IWSQuery = new WSQuery("get_ThermalWell");
    q.args = {};
    q.sess_code = sess_code;
    api
      .fetch(q)

      .catch((err) => console.log("err", err));
  }
  setAllWells(dt: IWSResult) {
    this.setDefaultWells(dt.data);
  }

  changeThermalWell(
    name: string,
    value: string,
    newWell: IWell,
    options?: { [key: string]: string }
  ) {
    const {
      id,
      editWell_number: number,
      editWell_location: location,
      editWell_org: org,
      editWell_dev: dev,
    } = options;
    const sess_code = value;
    const q: IWSQuery = new WSQuery("set_ChangeThermalWell");
    q.args = {
      id: Number(id),
      number: number,
      org_id: Number(org),
      group_id: Number(location),
      dev_id: Number(dev) || null,
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
        this.setSelectedWell(newWell);

        setTimeout(() => {
          this.setOpenModal(false);
          this.setSuccessSave_mess("");
        }, 2000);
      })
      .catch((e) => {
        console.log("error=>", e);
        this.setErrorSave_mess(SAVE_ERROR);
        setTimeout(() => {
          this.setErrorSave_mess("");
        }, 2000);
      });
  }
}
