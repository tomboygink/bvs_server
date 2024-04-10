import { observable, action, computed, makeAutoObservable } from "mobx";
import { toJS } from "mobx";
import {
  IWSQuery,
  IWSResult,
  IWSResultSessionss,
  WSQuery,
} from "../../../xcore/WSQuery";

import { PageStorage } from "./PageStorage";
import { AuthFormStorage } from "./components/AuthFormStorage";
import { AppBarStorage } from "./components/AppBarStorage";
import { ModalStorage } from "./components/ModalStorage";
import { ModalLeftPanel } from "./components/RegistationUsersStorage";
import { EditUsersStorage } from "./components/EditUsersStorage";
import { WSocket } from "./WSocket";
import {
  getCookie,
  setCookie,
  deleteCookie,
  deleteAllCookies,
} from "./browserCookes";
import { UsersEntity } from "../../../xcore/dbase/Users";
import { DevsGroupStorage } from "./components/Devs/DevsGroupStorage";
import { DevsStorage } from "./components/Devs/DevsStorage";
import { SensorsStorage } from "./components/Devs/SensorsStorage";

import { MobaleStorage } from "../storage/components/MobaleVersion/MobaleStorage";
import { OrgStorage } from "./components/Orgs/OrgStorage"; /////// Вкладка организации
import { JobsTitlesStorage } from "./components/JobsTitles/JobsTitlesStorage";
import { SharedSrorage } from "./SharedStorage";
import { ImportDevStorage } from "./components/Devs/ImportDevStorage";
import { api } from "../api/api";
import { WellsStorage } from "./components/Wells/WellsStorage";

// ********************************************************************************************************************************************************
// ХРАНИЛИЩЕ

class AppStorage {
  @observable main: PageStorage = null;
  @observable auth_form: AuthFormStorage = null;
  @observable app_bar: AppBarStorage = null;
  @observable modal: ModalStorage = null;
  @observable reg_user: ModalLeftPanel = null;
  @observable edit_user: EditUsersStorage = null;
  @observable devs_groups: DevsGroupStorage = null;
  @observable devs: DevsStorage = null;
  @observable sensors: SensorsStorage = null;
  @observable org: OrgStorage = null;
  @observable jobs: JobsTitlesStorage = null;
  @observable importdevs: ImportDevStorage = null;
  @observable mobale: MobaleStorage = null; ////////////////////// Для мобильных устройств
  @observable shared_store: SharedSrorage = null;
  @observable wells: WellsStorage = null;

  @observable devs_group_move: Array<any>; /////////////////////////////////////Тест(потом нужно удалить)

  @observable dt: any = null;
  @observable dtUser: any = null;
  @observable id_org_user: any = null; //// Определить ид организации пользователя для отображения устройств
  @observable role_read: any = null;
  @observable role_write: any = null;

  @observable notifications: boolean = false;

  @action setNotifications(val: boolean) {
    this.notifications = val;
  }
  @computed getNotifications(): boolean {
    return this.notifications;
  }

  @action setdevs_group_move(val: Array<any>) {
    this.devs_group_move = val;
  } ////////////Тест (потом удлаить )
  @computed getdevs_group_move(): Array<any> {
    return this.devs_group_move;
  } ////////////Тест (потом удлаить )

  @action setdt(val: any) {
    this.dt = val;
  }
  @computed getdt(): any {
    return this.dt;
  }

  @action setIdOrgUser(val: any) {
    this.id_org_user = val;
  }
  @computed getIdOrgUser(): any {
    return this.id_org_user;
  }

  @action setdtUser(val: any) {
    this.dtUser = val;
  }
  @computed getdtUser(): any {
    return this.dtUser;
  }

  @action setRoleRead(val: any) {
    this.role_read = val;
  }
  @computed getRoleRead(): any {
    return this.role_read;
  }

  @action setRoleWrite(val: any) {
    this.role_write = val;
  }
  @computed getRoleWrite(): any {
    return this.role_write;
  }

  constructor() {
    this.main = new PageStorage();
    this.auth_form = new AuthFormStorage();
    this.app_bar = new AppBarStorage();
    this.modal = new ModalStorage();
    this.reg_user = new ModalLeftPanel();
    this.edit_user = new EditUsersStorage();
    this.devs_groups = new DevsGroupStorage();
    this.devs = new DevsStorage();
    this.sensors = new SensorsStorage();
    this.org = new OrgStorage();
    this.jobs = new JobsTitlesStorage();
    this.mobale = new MobaleStorage();
    this.importdevs = new ImportDevStorage();
    this.shared_store = new SharedSrorage();
    this.wells = new WellsStorage();
    makeAutoObservable(this);

    // WSocket.get();
  }

  @action async onWSData(dt: IWSResult | IWSResultSessionss) {
    console.log("SOCKET RESULT", dt);

    switch (dt.cmd) {
      case "get_UserByAuth":
        {
          this.auth_form.onGetUserByAuth(dt as IWSResult);
        }
        break;
      case "get_UserBySessionCode":
        {
          this.auth_form.onGetUserBySessionCode(dt as IWSResult);
        }
        break;
      case "set_ChangePass":
        {
          this.modal.onGetChangePass(dt as IWSResult);
        }
        break;
      case "set_CUserData":
        {
          this.modal.onGetCUserData(dt as IWSResult);
        }
        break;
      case "set_ForgPass":
        {
          this.auth_form.onSaveNewPass(dt as IWSResult);
        }
        break;
      case "set_SaveNewPass":
        {
          this.auth_form.onSaveNewPass(dt as IWSResult);
        }
        break;
      case "set_SaveNewPass":
        {
          this.auth_form.onSaveNewPass(dt as IWSResult);
        }
        break;
      case "get_Org":
        {
          this.reg_user.setAllOrganization(dt as IWSResult);
        }
        break;
      case "get_Jobs":
        {
          this.reg_user.setAllJobsTitle(dt as IWSResult);
        }
        break;
      case "get_AllUser":
        {
          this.reg_user.setUsersAll(dt as IWSResult);
        }
        break;
      case "get_DevsGroups":
        {
          this.devs_groups.setDevsGroupsAll(dt as IWSResult);
        }
        break;
      case "get_Devs":
        {
          this.devs.setDevsAll(dt as IWSResult);
        }
        break;
      case "get_DevSessions":
        {
          this.sensors.setDevSess(dt as IWSResult);
        }
        break;
      case "get_DevFirstLastSessions":
        {
          this.sensors.set_DevFirstLastSessions(dt as IWSResultSessionss);
          this.sensors.setDevSheme(dt as IWSResultSessionss);
        }
        break;
      case "set_ThermoStreamer_Svg": {
        this.sensors.setDevSheme(dt as IWSResultSessionss);
      }
      case "set_ChangeOrg": {
        this.org.get_ChangeOrg(dt as IWSResult);
      }
      case "set_NewControlDevSess": {
        this.devs.get_NewControlDevSess(dt as IWSResult);
      }
      case "get_DevPovs": {
        this.sensors.set_DevPovs(dt as IWSResult);
      }
      case "get_DevPovs": {
        this.sensors.set_DevPovs(dt as IWSResult);
      }
      case "set_ThermalWell": {
        this.wells.fetchWells();
      }
      case "set_ChangeThermalWell": {
        this.wells.fetchWells();
      }
      case "get_ThermalWell": {
        this.wells.setAllWells(dt as IWSResult);
      }
      default:
        {
        }
        break;
    }
    if (dt.error) {
      this.shared_store.setResponseErrorMess(dt as IWSResult);
    }
  }

  /**
   * Получить пользователя по коду сессии из куков (пользователь уже заходил с этого браузера)
   * @returns
   */
  async get_UserBySessionCode() {
    var ss_code = getCookie("sess_id");
    if (ss_code === undefined) return deleteAllCookies();
    var q: IWSQuery = new WSQuery("get_UserBySessionCode", { code: ss_code });
    // (await WSocket.get()).send(q);
    api.fetch(q).catch((e) => console.log("error=>", e));
  }
}

export const APP_STORAGE: AppStorage = new AppStorage();
