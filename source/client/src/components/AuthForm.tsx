import React from 'react';
import { observer } from 'mobx-react';

import { APP_STORAGE } from '../storage/AppStorage';

import {Avatar, Button, TextField, Box, Container, CssBaseline, Typography , Alert , AlertTitle} from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

interface IProps{}

const theme = createTheme(); 
//Компонент формы авторизации
@observer
export class AuthForm extends React.Component<IProps> {
    constructor(props:any){
        super(props);
    }

    render(): React.ReactNode {

        var error_alert:React.ReactNode = <></>;
        if(APP_STORAGE.auth_form.getCmderror() !== null){
            error_alert =  <Alert icon={false} sx={{ marginTop: 2}}  severity="error">{APP_STORAGE.auth_form.getCmderror() }</Alert>
        }
 
        return (
            <React.Fragment>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
            <CssBaseline />
                <Box
                sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}
                >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                   Авторизация
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
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
                        fullWidth
                        name="password"
                        label="Пароль"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={ (e)=>{ APP_STORAGE.auth_form.setPassword(e.target.value); } }
                        value={ APP_STORAGE.auth_form.getPassword() }
                    />
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={ ()=>{  APP_STORAGE.auth_form.get_UserByAuth();}}
                    >
                        Войти
                    </Button>
                </Box>
                {error_alert}
                </Box>
                </Container> 
            </ThemeProvider>
            </React.Fragment>
        );
    }
}



