import { observable, action, computed, makeAutoObservable } from "mobx";

import { IWSQuery, WSQuery, IWSResult } from "../../../../xcore/WSQuery";
import { WSocket } from "../WSocket";

export class ModalLeftPanel {
  @observable modal_registration_user: boolean = false;
  @observable take_data: any = null; /// пушим в модальное окно форму, в зависимоти от выбора пользователя
  @observable modal_tittle: string = "";

  @observable organization: Array<string> = [];
  @observable jobs_titles: Array<string> = [];
  @observable jobs_titles_error: string = "";
  @observable key_org: any = null;
  @observable key_jobs: any = null;
  @observable checkbox_editing: boolean = false; /// разрешить редактирование пользователю
  @observable checkbox_reading: boolean = true; /// только чтение

  /////////////////////регистрация пользователя

  @observable family: string = "";
  @observable name: string = "";
  @observable father: string = "";
  @observable email: string = "";
  @observable telephone: string = "";
  @observable login: string = "";
  @observable password: string = "";
  @observable repeat_password: string = "";
  @observable info: string = "";

  ///////////////проверка формы (регистрация пользователя) на правильность ввода данных

  @observable error_family: boolean = false;
  @observable texthelp_family: string = "";
  @observable error_name: boolean = false;
  @observable texthelp_name: string = "";
  @observable error_father: boolean = false;
  @observable texthelp_father: string = "";
  @observable error_email: boolean = false;
  @observable texthelp_email: string = "";
  @observable error_telephone: boolean = false;
  @observable texthelp_telephone: string = "";
  @observable error_login: boolean = false;
  @observable texthelp_login: string = "";
  @observable error_password: boolean = false;
  @observable texthelp_password: string = "";
  @observable error_repeat_password: boolean = false;
  @observable texthelp_repeat_password: string = "";

  //////////////////////добавление организации

  @observable full_name_org: string = "";
  @observable name_org: string = "";
  @observable inn: string = "";
  @observable address: string = "";
  @observable latitude: string = null; /// широта
  @observable longitude: string = null; /// долгота
  @observable info_org: string = "";

  ///////////////проверка формы (добавление организации) на правильность ввода данных

  @observable error_inn: boolean = false;
  @observable texthelp_inn: string = "";

  constructor() {
    makeAutoObservable(this);
    Map<string, string>;
  }

  @action setCheckboxEd(val: boolean) {
    this.checkbox_editing = val;
  }
  @action getCheckboxEd(): boolean {
    return this.checkbox_editing;
  }

  @action setCheckboxRead(val: boolean) {
    this.checkbox_reading = val;
  }
  @action getCheckboxRead(): boolean {
    return this.checkbox_reading;
  }

  @action setKeyOrg(val: any) {
    this.key_org = val;
  }
  @computed getKeyOrg(): any {
    return this.key_org;
  }

  @action setKeyJobs(val: any) {
    this.key_jobs = val;
  }
  @computed getKeyJobs(): any {
    return this.key_jobs;
  }

  @action setOrgAll(val: Array<string>) {
    this.organization = val;
  }
  @computed getOrgAll(): Array<string> {
    return this.organization;
  }

  @action setJobsAll(val: Array<string>) {
    this.jobs_titles = val;
  }
  @computed getJobsAll(): Array<string> {
    return this.jobs_titles;
  }
  @action setJobsAllError(val: string) {
    this.jobs_titles_error = val;
  }
  @computed getJobsAllError(): string {
    return this.jobs_titles_error;
  }

  @action setModalRegUser(val: boolean) {
    this.modal_registration_user = val;
  } /// Для открытия модального окна
  @computed getModalRegUser(): boolean {
    return this.modal_registration_user;
  }

  @action setTakeModal(val: any) {
    this.take_data = val;
  } /// пушим в модальное окно форму, в зависимоти от выбора пользователя
  @computed getTakeModal(): any {
    return this.take_data;
  }

  @action setTittleModal(val: string) {
    this.modal_tittle = val;
  } /// пушим в модальное окно форму, в зависимоти от выбора пользователя
  @computed getTittleModal(): string {
    return this.modal_tittle;
  }

  ////////////////////////////////////////////регистрация пользователя

  @action setFamily(val: string) {
    this.family = val;
  }
  @computed getFamily(): string {
    return this.family;
  }

  @action setName(val: string) {
    this.name = val;
  }
  @computed getName(): string {
    return this.name;
  }

  @action setFather(val: string) {
    this.father = val;
  }
  @computed getFather(): string {
    return this.father;
  }

  @action setEmail(val: string) {
    this.email = val;
  }
  @computed getEmail(): string {
    return this.email;
  }

  @action setTelephone(val: string) {
    this.telephone = val;
  }
  @computed getTelephone(): string {
    return this.telephone;
  }

  @action setLogin(val: string) {
    this.login = val;
  }
  @computed getLogin(): string {
    return this.login;
  }

  @action setPassword(val: string) {
    this.password = val;
  }
  @computed getPassword(): string {
    return this.password;
  }

  @action setRepeatPassword(val: string) {
    this.repeat_password = val;
  }
  @computed getRepeatPassword(): string {
    return this.repeat_password;
  }

  @action setInfo(val: string) {
    this.info = val;
  }
  @computed getInfo(): string {
    return this.info;
  }

  /////проверка формы (user)

  @action setErrorFamily(val: boolean) {
    this.error_family = val;
  }
  @computed getErrorFamily(): boolean {
    return this.error_family;
  }
  @action setTextHelpFamily(val: string) {
    this.texthelp_family = val;
  }
  @computed getTextHelpFamily(): string {
    return this.texthelp_family;
  }

  @action setErrorName(val: boolean) {
    this.error_name = val;
  }
  @computed getErrorName(): boolean {
    return this.error_name;
  }
  @action setTextHelpName(val: string) {
    this.texthelp_name = val;
  }
  @computed getTextHelpName(): string {
    return this.texthelp_name;
  }

  @action setErrorFather(val: boolean) {
    this.error_father = val;
  }
  @computed getErrorFather(): boolean {
    return this.error_father;
  }
  @action setTextHelpFather(val: string) {
    this.texthelp_father = val;
  }
  @computed getTextHelpFather(): string {
    return this.texthelp_father;
  }

  @action setErrorEmail(val: boolean) {
    this.error_email = val;
  }
  @computed getErrorEmail(): boolean {
    return this.error_email;
  }
  @action setTextHelpEmail(val: string) {
    this.texthelp_email = val;
  }
  @computed getTextHelpEmail(): string {
    return this.texthelp_email;
  }

  @action setErrorTelephone(val: boolean) {
    this.error_telephone = val;
  }
  @computed getErrorTelephone(): boolean {
    return this.error_telephone;
  }
  @action setTextHelpTelephone(val: string) {
    this.texthelp_telephone = val;
  }
  @computed getTextHelpTelephone(): string {
    return this.texthelp_telephone;
  }

  @action setErrorLogin(val: boolean) {
    this.error_login = val;
  }
  @computed getErrorLogin(): boolean {
    return this.error_login;
  }
  @action setTextHelpLogin(val: string) {
    this.texthelp_login = val;
  }
  @computed getTextHelpLogin(): string {
    return this.texthelp_login;
  }

  @action setErrorPassword(val: boolean) {
    this.error_password = val;
  }
  @computed getErrorPassword(): boolean {
    return this.error_password;
  }
  @action setTextHelpPassword(val: string) {
    this.texthelp_password = val;
  }
  @computed getTextHelpPassword(): string {
    return this.texthelp_password;
  }

  @action setErrorRepeatPassword(val: boolean) {
    this.error_repeat_password = val;
  }
  @computed getErrorRepeatPassword(): boolean {
    return this.error_repeat_password;
  }
  @action setTextHelpRepeatPassword(val: string) {
    this.texthelp_repeat_password = val;
  }
  @computed getTextHelpRepeatPassword(): string {
    return this.texthelp_repeat_password;
  }

  //////////////////////добавление организации

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

  /////проверка формы (addOrg)
  @action setErrorInn(val: boolean) {
    this.error_inn = val;
  }
  @computed getErrorInn(): boolean {
    return this.error_inn;
  }
  @action setTextHelpInn(val: string) {
    this.texthelp_inn = val;
  }
  @computed getTextHelpInn(): string {
    return this.texthelp_inn;
  }

  async get_Org(name: string, value: any, _options?: any) {
    var sess_code = value;
    var q: IWSQuery = new WSQuery("get_Org");
    q.sess_code = sess_code;
    (await WSocket.get()).send(q);
  }
  async get_Jobs(name: string, value: any, _options?: any) {
    var sess_code = value;
    var q: IWSQuery = new WSQuery("get_Jobs");
    q.args = {
      id_org: this.getKeyOrg() || "",
    };
    q.sess_code = sess_code;
    (await WSocket.get()).send(q);
  }

  setAllOrganization(dt: IWSResult) {
    //////////// Socket result cmd - set_ForgPass
    this.setOrgAll(dt.data);
  }
  setAllJobsTitle(dt: IWSResult) {
    if (dt.error === null) {
      this.setJobsAll(dt.data);
    } else if (dt.error) {
      this.setJobsAllError(dt.error);
    } else {
      this.setJobsAllError("");
    }
  }
  /////проверка формы (org)
  async set_NewUser(name: string, value: any, _options?: any) {
    var q: IWSQuery = new WSQuery("set_NewUser");
    var sess_code = value;
    const regexp_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const regexp_ph = /^((\+7|7|8)+([0-9]){10})$/;
    const email = this.getEmail().match(regexp_email);
    const telephone = this.getTelephone().match(regexp_ph);

    if (this.getFamily() === "") {
      this.setErrorFamily(true);
      this.setTextHelpFamily("Заполните поле");
    } else {
      this.setErrorFamily(false);
      this.setTextHelpFamily("");
    }

    if (this.getName() === "") {
      this.setErrorName(true);
      this.setTextHelpName("Заполните поле");
    } else {
      this.setErrorName(false);
      this.setTextHelpName("");
    }

    if (this.getFather() === "") {
      this.setErrorFather(true);
      this.setTextHelpFather("Заполните поле");
    } else {
      this.setErrorFather(false);
      this.setTextHelpFather("");
    }

    if (email === null) {
      this.setErrorEmail(true);
      this.setTextHelpEmail(
        'Адрес электронной почты должен содержать символ "@"'
      );
    } else {
      this.setErrorEmail(false);
      this.setTextHelpEmail("");
    }

    if (telephone === null) {
      this.setErrorTelephone(true);
      this.setTextHelpTelephone("Введите корректный номер телефона");
    } else {
      this.setErrorTelephone(false);
      this.setTextHelpTelephone("");
    }

    if (this.getLogin() === "") {
      this.setErrorLogin(true);
      this.setTextHelpLogin("Заполните поле");
    } else {
      this.setErrorLogin(false);
      this.setTextHelpLogin("");
    }

    ////////////Проверка пароля

    if (this.getPassword() === "") {
      this.setErrorPassword(true);
      this.setTextHelpPassword("Заполните поле");
    } else if (this.getPassword().length < 6) {
      this.setErrorPassword(true);
      this.setTextHelpPassword("используйте 6 или более символов");
    } else {
      this.setErrorPassword(false);
      this.setTextHelpPassword("");
    }

    if (this.getRepeatPassword() === "") {
      this.setErrorRepeatPassword(true);
      this.setTextHelpRepeatPassword("Заполните поле");
    } else if (
      this.getPassword() !== "" &&
      this.getPassword() !== this.getRepeatPassword()
    ) {
      this.setErrorRepeatPassword(true);
      this.setTextHelpRepeatPassword("Пароли не совпадают");
    } else {
      this.setErrorRepeatPassword(false);
      this.setTextHelpRepeatPassword("");
      this.setErrorPassword(false);
      this.setTextHelpPassword("");
    }
    if (
      this.getFamily() &&
      email !== null &&
      telephone !== null &&
      this.getPassword() === this.getRepeatPassword() &&
      this.getPassword().length >= 6 &&
      this.getName() &&
      this.getFather() &&
      this.getEmail() &&
      this.getTelephone() &&
      this.getLogin() &&
      this.getPassword() &&
      this.getRepeatPassword()
    ) {
      q.args = {
        family: this.getFamily() || "",
        name: this.getName() || "",
        father: this.getFather() || "",
        email: this.getEmail() || "",
        telephone: this.getTelephone() || "",
        id_org: this.getKeyOrg() || "",
        id_job: this.getKeyJobs() || "",
        login: this.getLogin() || "",
        password: this.getPassword() || "",
        repeat: this.getRepeatPassword() || "",
        users_r: this.getCheckboxEd(),
        users_w: this.getCheckboxRead() || "",
        info: this.getInfo(),
      };
      q.sess_code = sess_code;
      (await WSocket.get()).send(q);
      console.log(q);
    }
  }

  async set_NewOrg(name: string, value: any, _options?: any) {
    var sess_code = value;
    const regexp_inn = /^[0-9]+$/;
    const inn = this.getInn().match(regexp_inn);
    console.log(inn);

    if (inn === null) {
      this.setErrorInn(true);
      this.setTextHelpInn("Только цифры");
    } else {
      this.setErrorInn(false);
      this.setTextHelpInn("");
    }

    if (inn !== null && inn.length < 10) {
      this.setErrorInn(true);
      this.setTextHelpInn("инн должен содержать 10 символов");
    } else {
      this.setErrorInn(false);
      this.setTextHelpInn("");
    }

    var q: IWSQuery = new WSQuery("set_NewOrg");
    if (
      this.getFullNameOrg() &&
      this.getNameOrg() &&
      this.getInn() &&
      this.getAddress() &&
      inn !== null
    ) {
      q.args = {
        name: this.getNameOrg() || "",
        full_name: this.getFullNameOrg() || "",
        inn: this.getInn() || "",
        address: this.getAddress() || "",
        latitude: this.getLatitude() || "",
        longitude: this.getLongitude() || "",
        info: this.getInfOrg() || "",
      };
      q.sess_code = sess_code;
      (await WSocket.get()).send(q);
      console.log(q);
    }
  }
}
