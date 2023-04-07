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



    @observable sess_end: Array<any> = [];
    @observable sess_start: Array<any> = [];

    constructor(){
        makeAutoObservable(this);
    }


    @action setsess_end(val: Array<any>) { this.sess_end = val; } 
    @computed getsess_end(): Array<any> { return this.sess_end; }

    @action setsess_start(val: Array<any>) { this.sess_start = val; } 
    @computed getsess_start(): Array<any> { return this.sess_start; }


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
    var first_sess = [];
    var last_sess = [];

      let start_sess = JSON.parse(dt.data[1].sess_data);
      let end_sess = JSON.parse(dt.data[0].sess_data);
      



for (let i in start_sess.s){
  first_sess.push({
    depth: start_sess.s[i].depth
  })
}

for (let i in end_sess.s){
  last_sess.push({
    depth: end_sess.s[i].depth
  })
}

let start = [];
let end = [];

for (let i in start_sess.s){ ///////////////////////////// данные по первой сессии
  start.push({
    start: start_sess.s[i].data
  })
}

for (let i in end_sess.s){ ///////////////////////////// данные по первой сессии
  end.push({
    end: end_sess.s[i].data
  })
}
 ////////////////////////////////////////////////////////////////Сравниваем глубину двух строк 

 let f = first_sess.length; /////////////первая строка
 let e = last_sess.length  /////////////////////вторая строка
let depth_s = []; ////// Глубина (Наибольшая длина)
 if (f> e){
  depth_s.push(first_sess)
 }
 else{
  depth_s.push(last_sess)
 }


 const result = [...depth_s[0], ...end, ...start];



const arr = [];
const end_s = [];
const start_s = [];
const all_array = [];
 for ( let iii in result){
  console.log(result[iii].depth);
  if(result[iii].depth !== undefined){
    arr.push({
      name: result[iii].depth
  })
}
  }

  all_array.push(
    depth_s[0],
    end,
    start
  )


  console.log('all_array', all_array);

 
   const a = all_array[1].length;
   const b = all_array[2].length;
   let rr:any = ''
 
   
  if( a > b){
   rr = a-b;
   alert('lf')
    for( let b = 0; b> rr; b++){
       console.log()
    }
  }
  else{
    rr = b -a;
  }
  

  console.log(rr);

  for ( let iii in result){
    if(result[iii].end !== undefined){
      end_s.push({
        end: result[iii].end
    })
  }
    }

    for ( let iii in result){
      if(result[iii].start !== undefined){
        start_s.push({
          start: result[iii].start
      })
    }
      }



this.setSessFirstLast(arr);
this.setsess_end(end_s);
this.setsess_start(start_s);
// for(let i in start_sess.s.sort(
//   (a: { depth: number }, b: { depth: number }) => b.depth - a.depth
// )){
//   for( let i in start_sess.s){
//     arr.push({
//       name: start_sess.s[i].depth,
//       uv: end_sess.s[i].data,
//       start: start_sess.s[i].data
//   })
//   }
// }

// const res = result.reduce((o, i) => {
//   if (!o.find(v => v.depth == i.depth)) {
//     o.push(i);
//   }
//   return o;
// }, []);

//  console.log(res, 'res1')
 ///this.setSessFirstLast(res);
  }
}

