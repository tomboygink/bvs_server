import { observable, action, computed, makeAutoObservable } from 'mobx';
import { UsersEntity } from '../../../../../xcore/dbase/Users';
import { IWSQuery, WSQuery, IWSResult } from '../../../../../xcore/WSQuery';
import { WSocket } from '../../WSocket';
import { getCookie, setCookie, deleteCookie } from '../../browserCookes';
import { info } from 'console';


export class DevsStorage {

  @observable devs: Array<string> = [];

  @observable item: Array<any> = [];

  @observable array: Array<any> = [];

  @observable id_devs: string = '';

  @observable id_devs_ch: string = null;

  @observable open_modal: boolean = false;

  @observable open_modal_change: boolean = false;

  @observable user_role: boolean = null;
  @observable org_id: number = null;

  @observable parent: number = null;
  @observable parent1: number = null;

  @observable add_sensors: boolean = false; ///// модальное окно для добавления сенсоров
  @observable get_sensors: Array<any> = [];

  @observable get_sensors1: Array<any> = [];
  @observable get_sensors2: Array<any> = [];

  @observable array_sensors: Array<any> = []; ////////тестовый массив 
  
  @observable change_sensors: boolean = false;
  ////// Добавление нового устройства
  @observable id: string = '';
  @observable group_dev_id = '';
  @observable number: string = '';
  @observable name: string = '';
  @observable latitude: string = '';
  @observable longitude: string = ''
  @observable deleted: boolean = false;
  @observable info: string = '';
  @observable sensors: number = null;
  @observable select_id_dev: string = '';

  @observable checkbox_editing: boolean = false;

  //////////////////////////////////////////// Проверка
  @observable number_err: boolean = false;
  @observable number_err_mess: string = '';

  @observable name_err: boolean = false;
  @observable name_err_mess: string = '';

  @observable org_err: boolean = false;
  @observable org_err_mess: string = '';

  @observable latitude_err: boolean = false;
  @observable latitude_err_mess: string = '';
  @observable longitude_err: boolean = false;
  @observable longitude_err_mess: string = '';

  @observable menu_devs : string = '';

  @observable save :string = '';

  constructor() {
    makeAutoObservable(this);
  }

  @action setMenu_devs(val: string) { this.menu_devs = val };
  @computed getMenu_devs(): string { return this.menu_devs };

  @action setCheckboxEd(val: boolean) { this.checkbox_editing = val; }
  @computed getCheckboxEd(): boolean { return this.checkbox_editing; }

  @observable setOrgId(val: number) { this.org_id = val };
  @observable getOrgId(): number { return this.org_id }

  @action setUserRole(val: boolean) { this.user_role = val };
  @computed getUserRole(): boolean { return this.user_role }

  @action setDevs(val: Array<string>) { this.devs = val };
  @computed getDevs(): Array<string> { return this.devs };

  @action setItem(val: Array<any>) { this.item = val };
  @computed getItem(): Array<any> { return this.item };

  @action setArray(val: Array<any>) { this.array = val };
  @computed getArray(): Array<any> { return this.array };

  @action setIdDevs(val: string) { this.id_devs = val };
  @computed getIdDevs(): string { return this.id_devs };

  @action setIdChild(val: string) { this.id_devs_ch = val };
  @computed getIdChild(): string { return this.id_devs_ch };

  @action setOpenModal(val: boolean) { this.open_modal = val };
  @computed getOpenModal(): boolean { return this.open_modal };

  @action setOpenModalChange(val: boolean) { this.open_modal_change = val };
  @computed getOpenModalChange(): boolean { return this.open_modal_change } /// открываем модальное окно редактирования

  ////// Добавление нового устройства
  @observable setId(val: string) { this.id = val };
  @observable getId(): string { return this.id }

  @observable setGroupDevId(val: string) { this.group_dev_id = val };
  @observable getGroupDevId(): string { return this.group_dev_id }

  @action setNumber(val: string) { this.number = val };
  @computed getNumber(): string { return this.number };

  @action setName(val: string) { this.name = val };
  @computed getName(): string { return this.name };

  @action setLatitude(val: string) { this.latitude = val };
  @computed getLatitude(): string { return this.latitude };

  @action setLongitude(val: string) { this.longitude = val };
  @computed getLongitude(): string { return this.longitude };

  @action setDeleted(val: boolean) { this.deleted = val };
  @computed getDeleted(): boolean { return this.deleted };

  @action setInfo(val: string) { this.info = val };
  @computed getInfo(): string { return this.info };

  @action setSensors(val: number) { this.sensors = val };
  @computed getSensors(): number { return this.sensors };

  @action setParent(val: number) { this.parent = val };
  @computed getParent(): number { return this.parent };

  @action setParent1(val: number) { this.parent1 = val };
  @computed getParent1(): number { return this.parent1 };

  @action setIdDev(val: string) { this.select_id_dev = val };
  @computed getIdDev(): string { return this.select_id_dev };

  @action setDepthSensors(val: boolean) { this.add_sensors = val }; /// Добавление сенсоров (модальное окно)
  @computed getDepthSensors(): boolean { return this.add_sensors };

  @action setDepthSensors_Ch(val: boolean) { this.change_sensors = val }; /// Добавление сенсоров (модальное окно)
  @computed getDepthSensors_Ch(): boolean { return this.change_sensors }

  @action setChangeSensors(val: Array<any>) { this.get_sensors = val }
  @computed getChangeSensors(): Array<any> { return this.get_sensors }

  @action setChangeSensors1(val: Array<any>) { this.get_sensors1 = val }
  @computed getChangeSensors1(): Array<any> { return this.get_sensors1 }

  @action setChangeSensors2(val: Array<any>) { this.get_sensors2 = val }
  @computed getChangeSensors2(): Array<any> { return this.get_sensors2 }

  @action setSave(val: string) { this.save = val }
  @computed getSave(): string{ return this.save }


  @action setArray_sensors(val: Array<any>) { this.array_sensors = val }
  @computed getArray_sensors(): Array<any> { return this.array_sensors }

  //////////////////////////////////////////////////////////////////////////Проверка
  @action setNumberError(val: boolean) { this.number_err = val } /// проверка формы добавления устройства
  @computed getNumberError(): boolean { return this.number_err }
  @action setNumberError_mess(val: string) { this.number_err_mess = val }
  @computed getNumberError_mess(): string { return this.number_err_mess }

  @action setNameError(val: boolean) { this.name_err = val } /// проверка формы добавления устройства
  @computed getNameError(): boolean { return this.name_err }
  @action setNameError_mess(val: string) { this.name_err_mess = val }
  @computed getNamaError_mess(): string { return this.name_err_mess }

  @action setLatitudeError(val: boolean) { this.latitude_err = val }
  @computed getLatitudeError(): boolean { return this.latitude_err }
  @action setLatitudeError_mess(val: string) { this.latitude_err_mess = val }
  @computed getLatitudeError_mess(): string { return this.latitude_err_mess }

  @action setLongitudeError(val: boolean) { this.longitude_err = val }
  @computed getLongitudeError(): boolean { return this.longitude_err }
  @action setLongitudeError_mess(val: string) { this.longitude_err_mess = val }
  @computed getLongitudeError_mess(): string { return this.longitude_err_mess }


  async get_Devs(name: string, value: any, _options?: any) {
    var sess_code = value;
    var q: IWSQuery = new WSQuery('get_Devs');
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
    var q: IWSQuery = new WSQuery('get_Devs');
    q.args = {
      org_id: this.getOrgId(),
      dev_group_id: this.getIdChild(),
      user_w: this.getUserRole()
    };
    q.sess_code = sess_code;
    (await WSocket.get()).send(q);
  }


  async set_NewDevs(name: string, value: any, _options?: any) {

    
       if (this.getNumber() === '') {
      this.setNumberError(true);
      this.setNumberError_mess('Поле не может быть пустым');
    }

    if (this.getNumber() !== '') {
      this.setNumberError(false);
      this.setNumberError_mess('');
    }

    if (this.getName() === '') {
      this.setNameError(true);
      this.setNameError_mess('Поле не может быть пустым');
    }

    if (this.getName() !== '') {
      this.setNameError(false);
      this.setNameError_mess('');
    }

    if (this.getLatitude() === '') {
      this.setLatitudeError(true);
      this.setLatitudeError_mess('Поле не может быть пустым');
    }

    if (this.getLatitude() !== '') {
      this.setLatitudeError(false);
      this.setLatitudeError_mess('');
    }

    if (this.getLongitude() === '') {
      this.setLongitudeError(true);
      this.setLongitudeError_mess('Поле не может быть пустым');
    }

    if (this.getLongitude() !== '') {
      this.setLongitudeError(false);
      this.setLongitudeError_mess('');
    }

    var sess_code = value;
    var q: IWSQuery = new WSQuery("set_NewDevs");

    if (this.getNumber() !== '' && this.getName() !== '' && this.getLatitude() !== '' && this.getLongitude() !== '') {


      q.args = {
        group_dev_id: this.getIdDevs(),
        number: this.getNumber() || '',
        name: this.getName() || '',
        latitude: this.getLatitude() || '',
        longitude: this.getLongitude() || '',
        sensors: '{\"s\":' +  JSON.stringify(this.getArray()) + '}',
        deleted: this.getDeleted() || false,
        info: this.getDeleted() || ''
      };
      q.sess_code = sess_code;
      (await WSocket.get()).send(q);

      this.setOpenModal(false);
    }
  }

  async setDevsAll(dt: IWSResult) {
    this.setDevs(dt.data);
  }


  async set_DevsDepth(value: number) {
   let a = {"depth": value , "value" : 1 }
   
    this.array.push(a);

    const uniqueChars = this.array.reduce((o:any, i:any) => { ////////////////// Редюсом убираем дубликаты
      if (!o.find((v: { depth: any; }) => v.depth == i.depth)) {
        o.push(i);
      }
      return o;
    }, []); 
  }


  async set_ChangeDevs(name: string, value: any, _options?: any) {
    var sess_code = value;
    if (this.getNumber() === '') {
      this.setNumberError(true);
      this.setNumberError_mess('Необходимо ввести номер устройства')
    }
    if (this.getNumber() !== '') {
      this.setNumberError(false);
      this.setNumberError_mess('');
    }

    if (this.getName() === '') {
      this.setNameError(true);
      this.setNameError_mess('Необходимо ввести название устройства')
    }
    if (this.getName() !== '') {
      this.setNameError(false);
      this.setNameError_mess('');
    }

    if (this.getLatitude() === '') {
      this.setLatitudeError(true);
      this.setLatitudeError_mess('Поле не должно быть пустым')
    }
    if (this.getLatitude() !== '') {
      this.setLatitudeError(false);
      this.setLatitudeError_mess('');
    }

    if (this.getLongitude() === '') {
      this.setLongitudeError(true);
      this.setLongitudeError_mess('Поле не должно быть пустым')
    }
    if (this.getLongitude() !== '') {
      this.setLongitudeError(false);
      this.setLongitudeError_mess('');
    }



    var q: IWSQuery = new WSQuery("set_ChangeDevs");
    if (this.getNumber() && this.getName() !== '' && this.getLatitude() !== '' && this.getLongitude() !== '') {
      

      q.args = {
        id: this.getId() || "",
        group_dev_id: this.getGroupDevId() || '',
        number: this.getNumber() || '',
        name: this.getName() || "",
        latitude: this.getLatitude() || "",
        longitude: this.getLongitude() || "",
        sensors: '{\"s\":' + JSON.stringify(this.getChangeSensors()) + '}',
        deleted: this.getCheckboxEd(),
        info: this.getInfo() || ""
      };

      q.sess_code = sess_code;
      (await WSocket.get()).send(q); 
      setTimeout(() => {
      
      this.setOpenModalChange(false)
      }, 2000);

    }
  }

}
