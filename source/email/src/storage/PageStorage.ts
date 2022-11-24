import { observable, action, computed, makeAutoObservable} from 'mobx';


export class PageStorage{
    @observable title:string = '';
    @observable loginned:boolean = false;

    constructor(){
        this.title = '';

        makeAutoObservable(this);
    }

    @action setTitle(_title:string){ this.title = _title; }
    @computed getTitle():string{ return this.title }

    @action setLogginned(val:boolean){ this.loginned = val; }
    @computed getLoginneg():boolean{ return this.loginned; }
}
