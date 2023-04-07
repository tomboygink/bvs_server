import {observable, action, computed, makeAutoObservable } from "mobx";
import { IWSQuery, WSQuery, IWSResult } from '../../../../../xcore/WSQuery';
import { WSocket } from '../../WSocket';
import {APP_STORAGE} from '../../AppStorage';
import { toJS } from "mobx";
import { RechartsEntity } from "./RechartsEntityes";


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
    
    @observable time_dev_firstsess : string = '';
    @observable time_dev_lastsess : string = '';
    
    constructor(){
        makeAutoObservable(this);
    }


   
    @action setTimeDevSessFirst(val : string) {this.time_dev_firstsess = val};
    @computed getTimeDevSessFirst() : string {return this.time_dev_firstsess}; 

    @action setTimeDevSessLast(val : string) {this.time_dev_lastsess = val};
    @computed getTimeDevSessLast() : string {return this.time_dev_lastsess}; 

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
     
    console.log(toJS(APP_STORAGE.sensors.getdataCharts()), 'getdataCharts')

   // if(Object.keys(dt.data).length > 0){
      let start_sess = JSON.parse(dt.data[1].sess_data);
      let end_sess = JSON.parse(dt.data[0].sess_data);
      this.setTimeDevSessFirst(dt.data[0].time_dev);
      this.setTimeDevSessLast(dt.data[1].time_dev);
    
      var obj_first: any = {
        depth: '',
        data: ''
    };
    
    var obj_second: any = {
      depth: '',
      data1: ''
    };
    
    var first = new Array();
    var second = new Array();
   
      const mergeByProperty = (arrays: any[], property = "depth") => {
       const arr = arrays.flatMap((item) => item); //делаем из всех массивов - один
     
       const obj = arr.reduce((acc, item) => {
         return { // делаем из массива - объект, чтобы повторения перезаписывались
           ...acc,
           [item[property]]: { ...acc[item[property]], ...item }
         };
       }, {});
     
       return Object.values(obj); //обратно преобразуем из объекта в массив
     };
     
   

     for(var i in start_sess.s){
       obj_first = {
         data_f : start_sess.s[i].data,
         depth : start_sess.s[i].depth
     }
     first.push(obj_first)
     }
   
   
   
     for (var j in end_sess.s){
         obj_second= {
           data_s: end_sess.s[j].data,
          depth : end_sess.s[j].depth
         }  
         second.push(obj_second)
     }
    
     const result1 = mergeByProperty([first, second]);
     console.log(result1, 'depth11');
     this.setSessFirstLast(result1);
    //}
    // else{
    //   this.setSessFirstLast([]);
    // }     
}
}
