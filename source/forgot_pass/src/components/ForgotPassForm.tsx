import React from 'react';
import { observer } from 'mobx-react';

import { APP_STORAGE } from '../../../../source/client/src/storage/AppStorage';
import {Button, TextField, Box, Container, CssBaseline, Typography, Divider, Alert  } from '@mui/material';

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

        return (
            <React.Fragment>
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
                        label="Код подтверждения"
                        id="outlined-size-small"
                        error= { APP_STORAGE.auth_form.getError_code()}
                        helperText= {APP_STORAGE.auth_form.getError_code_mess()}
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
                    </Button>


                    </Box>
            
                </Container> 
            </React.Fragment>
        );
    }
}



