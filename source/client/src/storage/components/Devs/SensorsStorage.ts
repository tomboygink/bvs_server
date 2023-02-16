import {observable, action, computed, makeAutoObservable } from "mobx";
import { IWSQuery, WSQuery, IWSResult } from '../../../../../xcore/WSQuery';
import { WSocket } from '../../WSocket';


export class SensorsStorage {

    @observable sensors: any = [];

    @observable sort_desc: string = '';
    @observable active_button_sort: string = '';
    @observable active_button_sort_desc: string = '';

    @observable sess_period_start : string = '' ; 
    @observable sess_period_end : string = '';

    @observable anchorEl: string = '';
    @observable number: string = ''
    constructor(){
        makeAutoObservable(this);
    }

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

}

