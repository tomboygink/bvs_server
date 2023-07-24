import React from 'react';
import { observer } from 'mobx-react';

import { APP_STORAGE } from '../../../../source/client/src/storage/AppStorage';
import {Button, TextField, Box, Container, CssBaseline, Typography, Divider, Alert, Link  } from '@mui/material';

import { createTheme} from '@mui/material/styles';

import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

import  CircularIntegration  from './reload'


interface IProps{}

const theme = createTheme(); 
//Если пользователь забыл пароль
@observer
export class ForgotPass extends React.Component<IProps> {
    constructor(props:any){
        super(props);
    }

    render(): React.ReactNode {
        let splArr = window.location.search.replace(/%20/g, "");
        let splArr1 = splArr.split('=')
        APP_STORAGE.auth_form.setCode((splArr1[1]))


        var alert:React.ReactNode = <></>;

        if(APP_STORAGE.auth_form.get_forgPass() === null ){
            alert = <Alert severity="success">Пароль успешно изменен</Alert>;
         
        }

        else if (APP_STORAGE.auth_form.get_forgPass() !== null && APP_STORAGE.auth_form.get_forgPass() !== ''){
            alert = <Alert severity="error">{APP_STORAGE.auth_form.get_forgPass()}</Alert>;
          
        }  

        if(APP_STORAGE.auth_form.getErrr_new_pass() === true || APP_STORAGE.auth_form.getError_repeat_pass() === true || APP_STORAGE.auth_form.getError_login() === true){
            alert = <></>;
        }
        
        return (
            <React.Fragment>
                <Box className='auth-form'>
                <Container component="main" maxWidth="xs" sx ={{padding: '20px' , mt: '5%', alignSelf: 'center'}}>
            <CssBaseline />
                 <Box sx= {{display: 'flex' , justifyContent: 'space-between'}}> 
                 <Typography component="h1" variant="h5" sx={{color: '#266BF1', fontSize: '36px'}}>
                     Сброс пароля
                </Typography>
                    <ArrowRightAltIcon sx={{color: '#1976D2'}}
                    onClick={ ()=>{   window.location.href = 'http://127.0.0.1:3040' }}/>
                 </Box>
             
                
                <Typography sx={{fontSize: '12px', color: 'grey'}}>
                Для сброса пароля , пожалуйста, укажите ваш логин и новый пароль. <Typography sx={{fontSize: '12px', color: '#1976d2'}}>(код подтверждения - введен автоматически)</Typography>
                </Typography>
             
                <Box component="form" noValidate sx={{ mt: 1 }}>

                <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        error = { APP_STORAGE.auth_form.getError_login()}
                        helperText = { APP_STORAGE.auth_form.getLogin_message() }
                        label="Логин"
                        name="login"
                        autoComplete="login"
                        autoFocus  
                        onChange={ (e)=>{ APP_STORAGE.auth_form.setLogin(e.target.value); } }
                        value={ APP_STORAGE.auth_form.getLogin() || '' }
                    />
               
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        error={APP_STORAGE.auth_form.getErrr_new_pass()}
                        helperText= {APP_STORAGE.auth_form.getError_new_message()}
                        label="Новый пароль"
                        type="password"
                        autoComplete="current-password"
                        onChange={ (e)=>{ APP_STORAGE.auth_form.setNewPass(e.target.value); } }
                        value={ APP_STORAGE.auth_form.getNewPass() || ''  }
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        error = {APP_STORAGE.auth_form.getError_repeat_pass()}
                        helperText = {APP_STORAGE.auth_form.getError_repeat_message()}
                        name="password"
                        label="Повторите пароль"
                        type="password"
                        autoComplete="current-password"
                        onChange={ (e)=>{ APP_STORAGE.auth_form.setRepeatPass(e.target.value); } }
                        value={ APP_STORAGE.auth_form.getRepeatPass() || '' }
                    />    
             
                    <TextField
                        fullWidth
                        disabled = {true}
                        margin="normal"
                        label="Код подтверждения"
                        id="outlined-size-small"
                        error= { APP_STORAGE.auth_form.getError_code()}
                        helperText= {APP_STORAGE.auth_form.getError_code_mess()}
                        onChange={ (e)=>{ APP_STORAGE.auth_form.setCode(e.target.value); } }
                        value={ APP_STORAGE.auth_form.getCode() || '' }
                    />
    
                   
                     <CircularIntegration />
                     
                    </Box>
                    {alert}
                    <Link 
                        href="#" 
                        variant="body2"
                        onClick={ () => { window.location.href = 'http://127.0.0.1:3040'}}>
                    
                    Вернуться на форму авторизации
                    </Link>
                </Container>  
             
                </Box>
             
            </React.Fragment>
        );
    }
}



