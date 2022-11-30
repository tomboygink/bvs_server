import React from 'react';

import { observer } from 'mobx-react';
import { APP_STORAGE } from './storage/AppStorage';



import { AuthForm } from './components/AuthForm';
import { AppForm } from './components/AppForm/index';
import { ForgotPass } from './components/ForgotPass'

interface IProps {}

@observer 
export class App extends React.Component<IProps>{
    
    constructor(props:any){
        super(props);
    }

    componentDidMount(): void {
        APP_STORAGE.main.setTitle("ТИТУЛЬНЫЙ ЗАГОЛОВОК СТРАНИЦЫ");
        APP_STORAGE.get_UserBySessionCode();
    }


    componentWillUnmount(): void {}


    render(): React.ReactNode {
        document.title = APP_STORAGE.main.getTitle();

        var ret_dt:React.ReactNode = <></>;
        var user = APP_STORAGE.auth_form.getUser();
        var sess_id: string = null;

       if(user !== null && user.id > 0 && document.cookie !== '') {
            ret_dt = <AppForm/>} 
       else if (user === null && document.cookie === '' ) { 
            ret_dt = <AuthForm/>;}

        if (APP_STORAGE.auth_form.getForgotPass() === true ) {
            ret_dt = <ForgotPass />
        }

        
   
        return ( 
            <React.Fragment> 
               {ret_dt}  
            </React.Fragment>
        );
    }
}