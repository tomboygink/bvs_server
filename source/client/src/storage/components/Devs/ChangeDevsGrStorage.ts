import {observable, action, computed, makeAutoObservable } from "mobx";
import { IWSQuery, WSQuery, IWSResult } from '../../../../../xcore/WSQuery';
import { WSocket } from '../../WSocket';


export class ChangeDevsGroups {

    @observable open_modal_change: boolean= false;

    constructor(){
        makeAutoObservable(this);
    }

    @action setOpenModalChDevsGr(val : boolean) {this.open_modal_change = val};
    @computed getOpenModalChDevsGr() : boolean {return this.open_modal_change}
    

}

