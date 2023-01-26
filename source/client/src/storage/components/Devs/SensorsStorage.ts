import {observable, action, computed, makeAutoObservable } from "mobx";
import { IWSQuery, WSQuery, IWSResult } from '../../../../../xcore/WSQuery';
import { WSocket } from '../../WSocket';


export class SensorsStorage {

    @observable sensors: any = [];

    constructor(){
        makeAutoObservable(this);
    }

    @action setSensors(val : any) {this.sensors = val};
    @computed getSensors() : any {return this.sensors}

}

