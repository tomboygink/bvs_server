import React from 'react';
import { observer } from 'mobx-react';

import { APP_STORAGE } from '../storage/AppStorage';

import {Avatar, Button, TextField, Box, Container, CssBaseline, Typography, Divider, Alert  } from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';


interface IProps{}

const theme = createTheme(); 
//Если пользователь забыл пароль
@observer
export class ForgotPass extends React.Component<IProps> {
    constructor(props:any){
        super(props);
    }

    render(): React.ReactNode {
        var error_alert:React.ReactNode = <></>;
        if(APP_STORAGE.auth_form.getAlertForgPass() !== ''){
            error_alert =   <Alert sx={{display: 'flex' , position: 'absolute', right: 0, bottom: 0, mb: '15px'}} severity="success">{APP_STORAGE.auth_form.getAlertForgPass()}</Alert>
        }

        return (
            <React.Fragment>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs" sx ={{border: '1px solid #eeeeee;' , padding: '20px' , mt: '5%'}}>
            <CssBaseline />
                 <Box sx= {{display: 'flex' , justifyContent: 'space-between'}}> 
                 <Typography component="h1" variant="h5">
                     Сброс пароля
                </Typography>
                    <ArrowRightAltIcon
                    onClick={ ()=>{   window.location.href = 'http://127.0.0.1:3040' }}/>
                 </Box>
             
                
                <Typography sx={{fontSize: '12px', color: 'grey'}}>
                Забыли пароль? Пожалуйста, введите логин, адрес электронной почты и новый пароль. Вы получите код подтверждения по электронной почте.
                </Typography>
             
                <Box component="form" noValidate sx={{ mt: 1 }}>

                <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        error = { APP_STORAGE.auth_form.getError_login()}
                        helperText = { APP_STORAGE.auth_form.getLogin_message() }
                        id="email"
                        label="Логин"
                        name="login"
                        autoComplete="login"
                        autoFocus  
                        onChange={ (e)=>{ APP_STORAGE.auth_form.setLogin(e.target.value); } }
                        value={ APP_STORAGE.auth_form.getLogin() }
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        error = { APP_STORAGE.auth_form. getError_emain() } 
                        helperText = { APP_STORAGE.auth_form.getEmail_message()}
                        fullWidth
                        label="email"
                        name="email"
                        autoComplete="email"
                        onChange={ (e)=>{ APP_STORAGE.auth_form.setEmail(e.target.value); } }
                        value={ APP_STORAGE.auth_form.getEmail() }
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
                        value={ APP_STORAGE.auth_form.getNewPass() }
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
                        value={ APP_STORAGE.auth_form.getRepeatPass() }
                    />    
                  
                    <Button sx= {{background: '#edf2ff', color: '#1976d2;' , mt : '12px' , mb: '12px'}}
                        type="button"
                        fullWidth
                        onClick={ ()=>{  APP_STORAGE.auth_form.set_ForgPass();}}
                    >
                        Получить код
                    </Button>
                    {/* <Divider sx ={{mb: '12px', mt: '12px'}} />
                    <TextField
                        label="Код подтверждения"
                        id="outlined-size-small"
                        size="small"
                        onChange={ (e)=>{ APP_STORAGE.auth_form.setCode(e.target.value); } }
                        value={ APP_STORAGE.auth_form.getCode() || '' }
                    />
    
                    
                     <Button sx= {{background: '#edf2ff', color: '#1976d2;' , mt : '12px' , mb: '12px'}}
                        type="button"
                        fullWidth
                       onClick={ ()=>{  APP_STORAGE.auth_form.set_SaveNewPass();}}
                     >
                       Сохранить
                    </Button> */}

                    </Box>
            
                </Container> 
            </ThemeProvider>
              {error_alert}
            </React.Fragment>
        );
    }
}



