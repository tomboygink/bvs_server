import { observable, action, computed, makeAutoObservable } from 'mobx';

import { APP_STORAGE } from '../../AppStorage';


export class MobaleStorage{

  
    @observable active_buttom: boolean = false; 
    @observable open_mabal_menu: boolean =  false;

    @observable anchorEl: string = '';

    
    constructor(){
        makeAutoObservable(this);
    }
    
    @action setActieButton(val: boolean) {this.active_buttom = val}
    @computed getActieButton():boolean { return this.active_buttom}

    @action setOpenModalMenu(val: boolean) {this.open_mabal_menu = val}
    @computed getOpenModalMenu() : boolean { return this.open_mabal_menu}

    @action setAnchorEl(val: string) {this.anchorEl = val}
    @computed getAnchorEl():string {return this.anchorEl}
}
