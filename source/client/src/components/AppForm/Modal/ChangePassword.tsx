import React from 'react';
import { observer } from 'mobx-react';

import {TextField, Box, Button, Typography, Divider, Alert} from '@mui/material';
import { APP_STORAGE } from '../../../storage/AppStorage'
import SaveIcon from '@mui/icons-material/Save'; 

interface IProps{}

//Компонент формы приложения
@observer
export class ChangePassword extends React.Component<IProps> {
    constructor(props:any){
        super(props);
    }

    async saveСhanges( ) {
        APP_STORAGE.modal.set_ChangePass('sess_id', APP_STORAGE.auth_form.getdt())
        }

    render(): React.ReactNode {
     const user =  APP_STORAGE.auth_form.user;
     if(APP_STORAGE.modal.getLogin() === ''){
        APP_STORAGE.modal.setLogin(user.login)  
        }
    
        var alert:React.ReactNode = <></>;
        if(APP_STORAGE.modal.getCmdErrPass() === null && APP_STORAGE.modal.getCmdErrPass() === ''){
            alert = <Alert sx={{mt: '12px'}} severity="success">Пароль успешно сохранен.</Alert>;
        }
        else if (APP_STORAGE.modal.getCmdErrPass() !== null && APP_STORAGE.modal.getCmdErrPass() !== ''){
            alert = <Alert sx={{mt: '12px'}} severity="error">Необходимо проверить правильность вводимых данных.</Alert>;
        }
     
        return (
            <React.Fragment>
                <form> 
                  <Box sx= {{display: 'grid' , gridTemplateColumns: '1fr 8fr', gap: '8px' , alignItems: 'center'}}> 
{/* ---------------------------------------смена пароля */}  
                <Typography variant="caption" sx = {{color: '#0D80D8'}}>Старый пароль:</Typography>
                <TextField 
                        fullWidth 
                        size='small'
                        name="password"
                        autoComplete='on'
                        error={APP_STORAGE.modal.getErrr_old_pass()}
                        helperText= {APP_STORAGE.modal.getError_old_message()}
                        type="password"
                        onChange={ (e)=>{ APP_STORAGE.modal.setOld_Pass(e.target.value); } }
                        value={ APP_STORAGE.modal.getOld_Pass() || '' } />
                        

                <Typography variant="caption" sx = {{color: '#0D80D8'}}>Новый пароль:</Typography>
                <TextField 
                        fullWidth
                        size='small' 
                        name="password"
                        autoComplete='on'
                        error={APP_STORAGE.modal.getErrr_new_pass()}
                        type="password"
                        helperText= {APP_STORAGE.modal.getError_new_message()}
                        onChange={ (e)=>{ APP_STORAGE.modal.setNew_Pass(e.target.value); } }
                        value={ APP_STORAGE.modal.getNew_Pass() || '' }  />



                <Typography variant="caption" sx = {{color: '#0D80D8'}}>Подтверждение пароля:</Typography>
                <TextField
                    fullWidth
                    name="password"
                    autoComplete='on'
                    error={APP_STORAGE.modal.getError_pass()}
                    helperText= {APP_STORAGE.modal.getError_message()}
                    size='small' 
                    type="password"
                    onChange={ (e)=>{ APP_STORAGE.modal.setRepeat_password(e.target.value); } }
                    value={ APP_STORAGE.modal.getRepeat_password() || ''} />
               
                </Box>
                
                <Divider sx = {{pt: 2}} />
                <Button  sx={{ mr: 2, mt: '8px' }} 
                    endIcon={<SaveIcon />}     
                    variant="outlined"
                    onClick={ ()=>{this.saveСhanges();}}>   
                    Сохранить
                </Button>
                {alert}
                </form>
            </React.Fragment>
        );
    }
}



