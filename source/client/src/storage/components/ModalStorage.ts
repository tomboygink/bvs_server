import { observable, action, computed, makeAutoObservable } from 'mobx';

import { IWSQuery, WSQuery, IWSResult } from '../../../../xcore/WSQuery';
import { WSocket } from '../WSocket'; 

export class PersonalAccauntStorage{

  
    @observable PersonalAccaunt: boolean = false; 

    @observable family:string = '';
    @observable name:string = '';
    @observable father:string = '';
    @observable telephone:string = '';
    @observable login:string = '';
    @observable old_password:string = '';
    @observable new_password:string= '';
    @observable repeat_password:string = '';
    @observable email:string='';
    @observable info:string='';

    @observable error_pass:boolean= false;
    @observable error_message:string=null;

    @observable errr_old_pass:boolean=false;
    @observable error_old_message:string=null;

    @observable errr_new_pass:boolean=false;
    @observable error_new_message:string=null;
    
    @observable modal:number=null
  

    ////////////////////////////////////валидация формы

    @observable email_err:boolean=false; ///ошибка при вводе адреса электронной почты
    @observable email_err_mess:string = '';///сообщение об ошибке адреса электронной почты

    @observable phone_err:boolean=false; ///ошибка при вводе адреса электронной почты
    @observable phone_err_mess:string = '';///сообщение об ошибке адреса электронной почты

    @observable modal_title:string = ''
 
    constructor(){
        makeAutoObservable(this);
    }

   
    @action setPersonalAccaunt(val:boolean){ this.PersonalAccaunt = val; } 
    @computed getPersonalAccaunt():boolean{ return this.PersonalAccaunt; } 

    @action setModal(val:number){ this.modal = val; } 
    @computed getModal():number{ return this.modal; } 

    @action setModalTitle(val:string){ this.modal_title = val; } 
    @computed getModalTitle():string{ return this.modal_title; } 

    /////////////Проверка формы перед отправкой на сервер (Валидация формы)
    @action setError_emain(val:boolean){ this.email_err = val; }
    @computed getError_emain():boolean{ return this.email_err; }  /////передаем ошибку 

    @action setEmail_message(val:string){ this.email_err_mess = val; } //////передаем сообщение об ошибке
    @computed getEmail_message():string{ return this.email_err_mess; }


    @action setError_phone(val:boolean){ this.phone_err = val; }
    @computed getError_phone():boolean{ return this.phone_err; }  /////передаем ошибку 

    @action setPhone_message(val:string){ this.phone_err_mess = val; } //////передаем сообщение об ошибке
    @computed getPhone_message():string{ return this.phone_err_mess; }




//////////////////////////////////////////////Для проверки пароля

    @action setLogin(val:string){ this.login = val; }
    @computed getLogin():string{ return this.login; }

    @action setError_pass(val:boolean){ this.error_pass = val; }
    @computed getError_pass():boolean{ return this.error_pass; }

    @action setError_message(val:string){ this.error_message = val; }
    @computed getError_message():string{ return this.error_message; }

    @action setErrr_old_pass(val:boolean){ this.errr_old_pass = val; }
    @computed getErrr_old_pass():boolean{ return this.errr_old_pass; }

    @action setError_old_message(val:string){ this.error_old_message = val; }
    @computed getError_old_message():string{ return this.error_old_message; }

    @action setErrr_new_pass(val:boolean){ this.errr_new_pass = val; }
    @computed getErrr_new_pass():boolean{ return this.errr_new_pass; }

    @action setError_new_message(val:string){ this.error_new_message = val; }
    @computed getError_new_message():string{ return this.error_new_message; }

    ///////////////////////////////////////////////////////////////////////////


    @action setFamily(val:string){ this.family = val; }
    @computed getFamily():string{ return this.family; } 

    @action setName(val:string){ this.name = val; }
    @computed getName():string{ return this.name; } 

    @action setFather(val:string){ this.father = val; }
    @computed getFather():string{ return this.father; } 

    @action setTelephone(val:string){ this.telephone = val; }
    @computed getTelephone():string{ return this.telephone; }

    @action setOld_Pass(val:string){ this.old_password = val; }
    @computed getOld_Pass():string{ return this.old_password; }
     
    @action setNew_Pass(val:string){ this.new_password = val; }
    @computed getNew_Pass():string{ return this.new_password; }

    @action setRepeat_password(val:string){ this.repeat_password = val; }
    @computed getRepeat_password():string{ return this.repeat_password; }

    @action setEmail(val:string){ this.email = val; }
    @computed getEmail():string{ return this.email; }

    @action setInfo(val:string){ this.info = val; }
    @computed getInfo():string{ return this.info; }



    async set_CUserData(name: string, value: any, _options?: any){
        var sess_code = value;
        var q:IWSQuery = new WSQuery("set_CUserData");
        
        const email = this.getEmail();
        const phone =  this.getTelephone();
        const regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const regexp_ph = /^((\+7|7|8)+([0-9]){10})$/;
        const matches = email.match(regexp);
        const matchesnum = phone.match(regexp_ph)
        
        if ( matches === null) {
           this.setError_emain(true);
           this.setEmail_message('Адрес электронной почты должен содержать символ "@"')
        }
        else  {
           this.setError_emain(false);
           this.setEmail_message('')
        }

        if(matchesnum === null){
            this.setError_phone(true);
            this.setPhone_message('Введите корректный номер телефона')
        }
        else {
            this.setError_phone(false);
            this.setPhone_message('')
        }
        
        if (this.getName() !== '' && this.getFather() !== '' && this.getTelephone() !== '' && this.getEmail() !== '' &&  this.getError_phone() == false &&  this.getError_emain () === false) {
        q.args = { 
            family: this.getFamily(), 
            login:this.getLogin(),
            name:this.getName(), 
            father:this.getFather(),
            telephone:this.getTelephone(),
            email:this.getEmail(),
            info:this.getInfo()
         };
         q.sess_code = sess_code;

         
      (await WSocket.get()).send(q);
       }
    }

    async set_ChangePass(name: string, value: any, _options?: any) {
        var sess_code = value;
        var q:IWSQuery = new WSQuery("set_ChangePass");
        if (this.getOld_Pass() === '') {  /// проверка пароля, если не пусто
            this.setErrr_old_pass(true);
            this.setError_old_message('Введите старый пароль.')
          } 

        if (this.getOld_Pass() !== ''){  ///если пароль введен , то удаляем ошибку
            this.setErrr_old_pass(false);
            this.setError_old_message('')
        }
        
        if (this.getNew_Pass() === '' && this.getOld_Pass() !== ''){
            this.setErrr_new_pass(true);
            this.setError_new_message('Введите новый пароль.')
        }

        if(this.getNew_Pass().length < 6){
            this.setErrr_new_pass(true);
            this.setError_new_message('Пароль не должен быть короче 6 символов.')
        }
        
        if (this.getNew_Pass() !== '' && this.getNew_Pass().length > 6){  ///если пароль введен , то удаляем ошибку
            this.setErrr_new_pass(false);
            this.setError_new_message('')
        }

        if(this.getNew_Pass() !==  this.getRepeat_password() && this.getOld_Pass() !== '' && this.getNew_Pass() !== '') {
            this.setError_pass(true);
            this.setError_message('Пароли не совпадают. Повторите попытку.')
        }

       if(this.getNew_Pass() ===  this.getRepeat_password()){
            this.setError_pass(false);
            this.setError_message('')
        }

       if (this.getOld_Pass() !== '' && this.getNew_Pass() !== '' && this.getNew_Pass() ===  this.getRepeat_password() && this.getNew_Pass().length > 6) {
           
        q.args = {
            login:this.getLogin(), 
            old_password:this.getOld_Pass(), 
            new_password:this.getNew_Pass(),
            repeat_password:this.getRepeat_password()
         }; 
          q.sess_code = sess_code;
         (await WSocket.get()).send(q);  
       }
      
    
    }
 
}
