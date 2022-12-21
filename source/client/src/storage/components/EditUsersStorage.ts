import {observable, action, computed, makeAutoObservable, makeObservable} from "mobx";

import { IWSQuery,  } from "../../../../xcore/WSQuery"; 
import { WSocket } from '../WSocket';

import { APP_STORAGE } from '../AppStorage';


export class EditUsersStorage {
    @observable modal_edit_user: boolean = false;

    constructor() {
        makeAutoObservable(this)
    }

    @action setModalEditUser(val: boolean) {this.modal_edit_user = val;} /// Для открытия модального окна (Регистрация пользователя)
    @computed getModalEditUser(): boolean {return this.modal_edit_user;}

}