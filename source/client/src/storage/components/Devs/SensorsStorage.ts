import {observable, action, computed, makeAutoObservable } from "mobx";
import { IWSQuery, WSQuery, IWSResult } from '../../../../../xcore/WSQuery';
import { WSocket } from '../../WSocket';
import {APP_STORAGE} from '../../AppStorage';
import { toJS } from "mobx";


export class SensorsStorage {
    
    @observable dataCharts: any = [];
    @observable sensors: any = [];
    @observable open_devsess: boolean = false;

    @observable dev_sensors: any = null;

    @observable sort_desc: string = '';
    @observable active_button_sort: string = '';
    @observable active_button_sort_desc: string = '';

    @observable sess_period_start : string = '' ; 
    @observable sess_period_end : string = '';

    @observable anchorEl: string = '';
    @observable number: string = '';

    @observable id_dev_sess: string = '';
    @observable chose_sess_time : string = '';

    @observable sessions_period: Array<any>  = [];

    @observable sessions_first_last_period: Array<any>  = [];
    constructor(){
        makeAutoObservable(this);
    }


    @action setChoseSessTime(val : string) {this.chose_sess_time = val};
    @computed getChoseSessTime() : string {return this.chose_sess_time}; 

    @action setdataCharts(val: Array<any>) { this.sessions_period = val; } 
    @computed getdataCharts(): Array<any> { return this.sessions_period; }

    @action setSessionsPeriod(val: Array<any>) { this.sessions_period = val; } /// Массив (сессии за переод)
    @computed getSessionsPeriod(): Array<any> { return this.sessions_period; } /// Массив (сессии за переод)

    @action setDevSession(val : any) {this.dev_sensors = val};
    @computed getDevSession() : any {return this.dev_sensors};

    @action setSensors(val : any) {this.sensors = val};
    @computed getSensors() : any {return this.sensors};

    @action setSortDesc(val : string) {this.sort_desc = val};
    @computed getSortDesc() : string {return this.sort_desc};

    @action setActiveButtonSort(val : string) {this.active_button_sort = val};
    @computed getActiveButtonSort() : string {return this.active_button_sort};

    @action setActiveButtonSortDesc(val : string) {this.active_button_sort_desc = val};
    @computed getActiveButtonSortDesc() : string {return this.active_button_sort_desc};

    @action setAnchorEl(val : string) {this.anchorEl = val};
    @computed getAnchorEl() : string {return this.anchorEl};

    @action setSessPeriodStart(val : string) {this.sess_period_start = val};
    @computed getSessPeriodStart() : string {return this.sess_period_start};

    @action setSessPeriodEnd(val : string) {this.sess_period_end = val};
    @computed getSessPeriodEnd() : string {return this.sess_period_end};

    @action setNumber(val: string) {this.number = val}
    @computed getNumber(): string {return this.number;}

    @action setOpenDevsess(val: boolean) {this.open_devsess = val}
    @computed getOpenDevsess(): boolean {return this.open_devsess;}

    @action setIdDevSess(val : string) {this.id_dev_sess = val};
    @computed getIdDevSess() : string {return this.id_dev_sess};

  

    @action setSessFirstLast(val: Array<any>) { this.sessions_first_last_period = val; } 
    @computed getSessFirstLast(): Array<any> { return this.sessions_first_last_period; }

    


    async get_DevSessions(name: string, value: any, _options?: any) {
        var sess_code = value;
        var q: IWSQuery = new WSQuery("get_DevSessions");
        {
          q.args = {
            dev_number: this.getNumber() || "",
            sess_period_start: this.getSessPeriodStart() || "",
            sess_period_end: this.getSessPeriodEnd() || ""
          };
    
          q.sess_code = sess_code;
          (await WSocket.get()).send(q);
        }
      }

      async get_DevFirstLastSessions(name: string, value: any, _options?: any) {
        var sess_code = value;
        var q: IWSQuery = new WSQuery("get_DevFirstLastSessions");
        {
          q.args = {
            dev_number: this.getNumber() || ""
          };
          q.sess_code = sess_code;
          (await WSocket.get()).send(q); 
        }
      }

      
  async setDevSess(dt: IWSResult) {
    this.setDevSession(dt.data); 
  }


  async set_DevFirstLastSessions(dt: IWSResult) {
    var data: any[] = []; ////// отображаем сенсоры
    let sessdata: any[] = [];
    console.log('тут',dt.data);


   // for (var key in dt.data[1]) {
      let sess_data = JSON.parse(dt.data[1].sess_data);
      
    
  
      console.log('sess_data1', sess_data.s);

      const uniqueChars = sess_data.s; 


      for (var i in uniqueChars.sort((a: { depth: number; },b: { depth: number; }) =>  b.depth - a.depth )) {
          data.push({
            name: String(uniqueChars[i].depth),
            "град.": uniqueChars[i].data
          });
      APP_STORAGE.sensors.setdataCharts(data);
      console.log(toJS(APP_STORAGE.sensors.getdataCharts))
      }

    //   for (var i in uniqueChars1.sort((a: { depth: number; },b: { depth: number; }) =>  b.depth - a.depth )) {
    //     data.push({
    //       name: String(uniqueChars[i].depth),
    //       "град.": uniqueChars[i].data
    //     });
    // APP_STORAGE.sensors.setSessFirstLast(data);
    // console.log(toJS(APP_STORAGE.sensors.setSessFirstLast), '12334')

    // }
   
  

    // //  for (var i in uniqueChars.sort((a: { depth: number; },b: { depth: number; }) =>  b.depth - a.depth )) {

    //     // {
    //     //   data.push({
    //     //     name: String(uniqueChars[i].depth),
    //     //     "град.": uniqueChars[i].data
    //     //   });
    //     // }

    //     //this.setSessFirstLast(data);
    //  // }
    //  // console.log('sdfsdf', toJS(this.getSessFirstLast()))
    // }
  }

}

