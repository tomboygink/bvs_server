import React from 'react';
import { observer } from 'mobx-react';

import { APP_STORAGE } from '../storage/AppStorage';

import {Avatar, Button, TextField, Box, Container, CssBaseline, Typography , Alert , FormControlLabel,Checkbox } from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
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
             <Container component="main" maxWidth="xs" sx ={{border: '1px solid #eeeeee;' , padding: '20px' , mt: '5%'}}>
             
            <CssBaseline />
            <Box sx= {{display: 'flex' , justifyContent: 'space-between'}}> 
                 <Typography component="h1" variant="h5">
                     Авторизация
                </Typography>
                    
                 </Box>
             
                
                <Typography sx={{fontSize: '12px', color: 'grey'}}>
                Пожалуйста, введите ваш логин и пароль.
                </Typography>

                <Box component="form">
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
                    
                    <Button sx= {{background: '#edf2ff', color: '#1976d2;' , mt : '12px'}}
                        type="button"
                        fullWidth
                        onClick={ ()=>{  APP_STORAGE.auth_form.get_UserByAuth();}}
                    >
                        Войти
                    </Button>
                        {error_alert}
                    </Box>
                    <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                        size='small'
                    />
                    }
                    label="Запомнить меня"
                 />
                    <Grid container sx= {{mt: '12px'}}>
                   
                    <Link 
                        href="#" 
                        variant="body2"
                        onClick={ () => { APP_STORAGE.auth_form.setForgotPass(true)}}>
                    
                  Забыли пароль?
                    </Link>
                    <Grid item>
             
                    </Grid>
                    </Grid>
                </Container> 
            </React.Fragment>
        );
    }
}



