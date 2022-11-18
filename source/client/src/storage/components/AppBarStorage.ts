import { observable, action, computed, makeAutoObservable } from 'mobx';
import { UsersEntity } from '../../../../xcore/dbase/Users';
import { IWSQuery, WSQuery, IWSResult } from '../../../../xcore/WSQuery';
import { WSocket } from '../WSocket';
import {getCookie , setCookie, deleteCookie }  from '../browserCookes';


export class AppBarStorage{

    @observable setOpenAppBar: boolean = false; //observable определяет отслеживаемое поле, в котором хранится состояние.
    @observable AppBarUser: boolean = false; //observable определяет отслеживаемое поле, в котором хранится состояние.

    constructor(){
        makeAutoObservable(this);
    }

    @action setSetOpenAppBar(val:boolean){ this.setOpenAppBar = val; } //устанавливает значение поля - Логин
    @computed getSetOpenAppBar():boolean{ return this.setOpenAppBar; } //возвращает значение поля - Логин (отмечает геттер)

    @action setAppBarUser(val:boolean){ this.AppBarUser = val; } //устанавливает значение поля - Логин
    @computed getAppBarUser():boolean{ return this.AppBarUser; } //возвращает значение поля - Логин (отмечает геттер)

}
