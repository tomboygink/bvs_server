import React from 'react';
import { observer } from 'mobx-react';

import { APP_STORAGE } from '../storage/AppStorage';

import {Avatar, Button, TextField, Box, Container, CssBaseline, Typography } from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';


interface IProps{}

const theme = createTheme(); 
//Компонент формы авторизации
@observer
export class ForgotPass extends React.Component<IProps> {
    constructor(props:any){
        super(props);
    }

    render(): React.ReactNode {
        return (
            <React.Fragment>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs" sx ={{border: '1px solid #eeeeee;' , padding: '20px' , mt: '10%'}}>
            <CssBaseline />
              
                <Typography component="h1" variant="h5">
                     Сброс пароля
                </Typography>
                <Typography sx={{fontSize: '12px', color: 'grey'}}>
                Забыли пароль? Пожалуйста, введите адрес электронной почты и новый пароль. Вы получите ссылку для подтверждения пароля по электронной почте.
                </Typography>
             
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        error = { APP_STORAGE.auth_form. getError_emain() } 
                        helperText = { APP_STORAGE.auth_form.getEmail_message()}
                        fullWidth
                        id="email"
                        label="email"
                        name="email"
                        autoComplete="email"
                        autoFocus  
                        onChange={ (e)=>{ APP_STORAGE.auth_form.setEmail(e.target.value); } }
                        value={ APP_STORAGE.auth_form.getEmail() }
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Новый пароль"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={ (e)=>{ APP_STORAGE.auth_form.setNewPass(e.target.value); } }
                        value={ APP_STORAGE.auth_form.getNewPass() }
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Повторите пароль"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={ (e)=>{ APP_STORAGE.auth_form.setRepeatPass(e.target.value); } }
                        value={ APP_STORAGE.auth_form.getRepeatPass() }
                    />    
                  
                    <Button sx= {{background: '#edf2ff', color: '#1976d2;' , mt : '12px' , mb: '12px'}}
                        type="button"
                        fullWidth
                        onClick={ ()=>{  APP_STORAGE.auth_form.get_ForgPass();}}
                    >
                        Сохранить
                    </Button>
                </Box>
            
                </Container> 
            </ThemeProvider>
            </React.Fragment>
        );
    }
}



