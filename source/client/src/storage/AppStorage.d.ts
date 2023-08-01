import { IWSResult } from '../../../xcore/WSQuery';
import { PageStorage } from './PageStorage';
import { AuthFormStorage } from './components/AuthFormStorage';
import { AppBarStorage } from './components/AppBarStorage';
import { ModalStorage } from './components/ModalStorage';
import { ModalLeftPanel } from './components/RegistationUsersStorage';
import { EditUsersStorage } from './components/EditUsersStorage';
import { DevsGroupStorage } from './components/Devs/DevsGroupStorage';
import { DevsStorage } from './components/Devs/DevsStorage';
import { SensorsStorage } from './components/Devs/SensorsStorage';
import { MobaleStorage } from '../storage/components/MobaleVersion/MobaleStorage';
import { OrgStorage } from './components/Orgs/OrgStorage';
import { JobsTitlesStorage } from './components/JobsTitles/JobsTitlesStorage';
declare class AppStorage {
    main: PageStorage;
    auth_form: AuthFormStorage;
    app_bar: AppBarStorage;
    modal: ModalStorage;
    reg_user: ModalLeftPanel;
    edit_user: EditUsersStorage;
    devs_groups: DevsGroupStorage;
    devs: DevsStorage;
    sensors: SensorsStorage;
    org: OrgStorage;
    jobs: JobsTitlesStorage;
    mobale: MobaleStorage;
    devs_group_move: Array<any>;
    dt: any;
    dtUser: any;
    id_org_user: any;
    role_read: any;
    role_write: any;
    setdevs_group_move(val: Array<any>): void;
    getdevs_group_move(): Array<any>;
    setdt(val: any): void;
    getdt(): any;
    setIdOrgUser(val: any): void;
    getIdOrgUser(): any;
    setdtUser(val: any): void;
    getdtUser(): any;
    setRoleRead(val: any): void;
    getRoleRead(): any;
    setRoleWrite(val: any): void;
    getRoleWrite(): any;
    constructor();
    onWSData(dt: IWSResult): Promise<void>;
    /**
     * Получить пользователя по коду сессии из куков (пользователь уже заходил с этого браузера)
     * @returns
     */
    get_UserBySessionCode(): Promise<void>;
}
export declare const APP_STORAGE: AppStorage;
export {};
