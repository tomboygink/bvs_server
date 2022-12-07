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
export class SaveNewPass extends React.Component<IProps> {
    constructor(props:any){
        super(props);
    }

    render(): React.ReactNode {
        return (
            <React.Fragment>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs" sx ={{border: '1px solid #eeeeee;' , padding: '20px' , mt: '5%'}}>
            <CssBaseline />
                 <Box sx= {{display: 'flex' , justifyContent: 'space-between'}}> 
                 <Typography component="h1" variant="h5">
                 Укажите код
                </Typography>
                    <ArrowRightAltIcon
                    onClick={ ()=>{   window.location.href = 'http://127.0.0.1:3040' }}/>
                 </Box>
             
                
                <Typography sx={{fontSize: '12px', color: 'grey'}}>
                Код подтверждения был отправлен на электронную почту  <Typography sx={{color : '#198adf', fontSize: '12px'}} >{APP_STORAGE.auth_form.getEmail()}</Typography>
                </Typography>
             
                <Box component="form" noValidate sx={{ mt: 1 }}>
  
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
            </ThemeProvider>
            </React.Fragment>
        );
    }
}



