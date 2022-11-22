import React from 'react';
import { observer } from 'mobx-react';

import {TextField, Box, Button, Typography, Divider} from '@mui/material';
import { APP_STORAGE } from '../../../storage/AppStorage' 

interface IProps{}

//Компонент формы приложения
@observer
export class ChangePassword extends React.Component<IProps> {
    constructor(props:any){
        super(props);
    }

    async saveСhanges( ) {
        APP_STORAGE.personal_acc.set_ChangePass('sess_id', APP_STORAGE.auth_form.getdt())
        }

    render(): React.ReactNode {
     const user =  APP_STORAGE.auth_form.user;
     if(APP_STORAGE.personal_acc.getLogin() === ''){
        APP_STORAGE.personal_acc.setLogin(user.login)  
        }
     
        return (
            <React.Fragment>
                  <Box> 
{/* ---------------------------------------смена пароля */}
                 <form> 
                <Typography variant="caption" sx = {{color: '#0D80D8'}}>Старый пароль:</Typography>
                <TextField 
                        fullWidth 
                        size='small'
                        name="password"
                        autoComplete='on'
                        error={APP_STORAGE.personal_acc.getErrr_old_pass()}
                        helperText= {APP_STORAGE.personal_acc.getError_old_message()}
                        type="password"
                        onChange={ (e)=>{ APP_STORAGE.personal_acc.setOld_Pass(e.target.value); } }
                        value={ APP_STORAGE.personal_acc.getOld_Pass() || '' } />
                        

                <Typography variant="caption" sx = {{color: '#0D80D8'}}>Новый пароль:</Typography>
                <TextField 
                        fullWidth
                        size='small' 
                        name="password"
                        autoComplete="on"
                        error={APP_STORAGE.personal_acc.getErrr_new_pass()}
                        type="password"
                        helperText= {APP_STORAGE.personal_acc.getError_new_message()}
                        onChange={ (e)=>{ APP_STORAGE.personal_acc.setNew_Pass(e.target.value); } }
                        value={ APP_STORAGE.personal_acc.getNew_Pass() || '' }  />


           

                <Typography variant="caption" sx = {{color: '#0D80D8'}}>Подтверждение пароля:</Typography>
                <TextField
                    fullWidth
                    name="password"
                    autoComplete="on"
                    error={APP_STORAGE.personal_acc.getError_pass()}
                    helperText= {APP_STORAGE.personal_acc.getError_message()|| APP_STORAGE.personal_acc.getCmdErrPass()}
                    size='small' 
                    type="password"
                    onChange={ (e)=>{ APP_STORAGE.personal_acc.setRepeat_password(e.target.value); } }
                    value={ APP_STORAGE.personal_acc.getRepeat_password() || ''} />
                 </form>
                </Box>
                <Box 
                   className='right-wrapper' 
                   sx ={{pl: 1, mt : 2}}>

                <Button   sx ={{mr: 2}}     
                    variant="outlined"
                      onClick={ ()=>{this.saveСhanges();}}>   
                    Сохранить
                </Button>
                </Box>

                

            </React.Fragment>
        );
    }
}



