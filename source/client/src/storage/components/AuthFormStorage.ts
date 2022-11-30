import { observable, action, computed, makeAutoObservable } from 'mobx';
import { UsersEntity } from '../../../../xcore/dbase/Users';
import { IWSQuery, WSQuery, IWSResult } from '../../../../xcore/WSQuery';
import { WSocket } from '../WSocket';
import {getCookie , setCookie, deleteCookie }  from '../browserCookes';
import { ThumbUpSharp } from '@mui/icons-material';



export class AuthFormStorage{

    @observable login: string = ''; //observable определяет отслеживаемое поле, в котором хранится состояние.
    @observable password:string = '';

                                    ///если пользователь забыл пароль
    @observable email: string = ''; 
    @observable new_password:string = '';
    @observable repeat_password:string = '';

    
    @observable user: UsersEntity = null;

    @observable cmderror:any = null;

    @observable dt:string = null;  ///куки

    @observable forgot_pass:boolean = false;

     @observable email_err:boolean=false; ///ошибка при вводе адреса электронной почты
    @observable email_err_mess:string = '';///сообщение об ошибке адреса электронной почты


    constructor(){
        makeAutoObservable(this);
    }

   
    @action setLogin(val:string){ this.login = val; } //устанавливает значение поля - Логин
    @computed getLogin():string{ return this.login; } //возвращает значение поля - Логин (отмечает геттер)

    @action setPassword(val:string){ this.password = val; } //устанавливает значение поля - Пароль
    @computed getPassword():string{ return this.password; } //возвращает значение поля - Пароль

    @action setUser(u:UsersEntity){ this.user = u; } //устанавливает значение класса UsersEntity
    @computed getUser():UsersEntity{ return this.user; } //возвращает значение класса UsersEntity

    @action setCmderror(u:any){ this.cmderror = u; } //устанавливает значение класса UsersEntity
    @computed getCmderror():any{ return this.cmderror; } //возвращает значение класса UsersEntity

    @action setdt(u:string){ this.dt = u; } //устанавливает значение класса UsersEntity
    @computed getdt():string{ return this.dt; } //возвращает значение класса UsersEntity

    @action setForgotPass(u:boolean) { this.forgot_pass = u; }
    @action getForgotPass():boolean { return this.forgot_pass }
                                            
    ///////////////////////Если пользователь забыл пароль

    @action setEmail(val:string){ this.email = val; }
    @computed getEmail():string{ return this.email; } 

    @action setNewPass(val:string){ this.new_password = val; }
    @computed getNewPass():string{ return this.new_password; } 

    @action setRepeatPass(val:string){ this.repeat_password = val; }
    @computed getRepeatPass():string{ return this.repeat_password; } 

    @action setError_emain(val:boolean){ this.email_err = val; }
    @computed getError_emain():boolean{ return this.email_err; }  /////передаем ошибку 

    @action setEmail_message(val:string){ this.email_err_mess = val; } //////передаем сообщение об ошибке
    @computed getEmail_message():string{ return this.email_err_mess; }


 

    async get_UserByAuth(){
        var q:IWSQuery = new WSQuery("get_UserByAuth");
        q.args = { login: this.getLogin(), password:this.getPassword() };
        (await WSocket.get()).send(q);
    }



    async get_ForgPass(){   // Функция восстановления пароля
        console.log('Забыпи пароль');
        const email = this.getEmail();
        const regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const matches = email.match(regexp);

        if ( matches === null) {
            this.setError_emain(true);
            this.setEmail_message('Адрес электронной почты должен содержать символ "@"')
         }
         else  {
            this.setError_emain(false);
            this.setEmail_message('')
         }

        if ( this.getEmail() !== '' && this.getNewPass() !== '' && this.getRepeatPass() !== '' ) {
            var q:IWSQuery = new WSQuery("get_ForgPass");
            q.args = { login: this.getLogin(), new_password:this.getNewPass(), repeat_password : this.getRepeatPass()  };
            (await WSocket.get()).send(q); 
        }
        
    }



    setUserWS(dt: IWSResult){
        if(dt.error !== null && dt.error.trim() !== ''){}
        var data:UsersEntity[] = new Array();
        for(var key in dt.data) data.push( dt.data[key] );

        if(data.length > 0){
            if(data[0].id > 0){
                // СОХРАНИТЬ ПОЛЬЗОВАТЕЛЯ В ХРАНИЛИЩЕ ДАННЫХ КАК ТЕКУЩЕГО ПОЛЬЗОВАТЕЛЯ СИСТЕМЫ !!!!!!!
                setCookie('sess_id', dt.code);
                this.setdt(dt.code);
                this.setUser(data[0]);
            }
        }
    }

    onGetUserByAuth(dt: IWSResult){
        this.setUserWS(dt);
            this.setCmderror(dt.error);
    }

    onGetUserBySessionCode(dt: IWSResult){
        this.setUserWS(dt);
    }

}
