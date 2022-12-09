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
        var alert:React.ReactNode = <></>;
        if(APP_STORAGE.auth_form.get_forgPass() === null ){
            alert = <Alert severity="success">Код подтверждения отправлен на электронную почту</Alert>;
        }
        else if (APP_STORAGE.auth_form.get_forgPass() !== null && APP_STORAGE.auth_form.get_forgPass() !== ''){
            alert = <Alert severity="error">{APP_STORAGE.auth_form.get_forgPass()}</Alert>;
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
                Забыли пароль? Пожалуйста, введите ваш email . Вы получите код подтверждения по электронной почте.
                </Typography>
             
                <Box component="form" noValidate sx={{ mt: 1 }}>

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
                    
                  
                  
                    <Button sx= {{background: '#edf2ff', color: '#1976d2;' , mt : '12px' , mb: '12px'}}
                        type="button"
                        fullWidth
                        onClick={ ()=>{  APP_STORAGE.auth_form.set_ForgPass();}}
                    >
                        Получить код
                    </Button>
                     
                    </Box>
                    {alert}
                </Container> 
            </ThemeProvider>
            </React.Fragment>
        );
    }
}



