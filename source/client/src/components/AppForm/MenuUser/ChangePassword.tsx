import React from 'react';
import { observer } from 'mobx-react';

import {TextField, Box, Button} from '@mui/material';
import { APP_STORAGE } from '../../../storage/AppStorage' 

interface IProps{}

//Компонент формы приложения
@observer
export class ChangePassword extends React.Component<IProps> {
    constructor(props:any){
        super(props);
    }

    render(): React.ReactNode {
     const user =  APP_STORAGE.auth_form.user;

     
        return (
            <React.Fragment>
                  <Box display={{ xs: 'flex'}}>
{/* ---------------------------------------смена пароля */}
                <TextField sx = {{m: 1}}
                    label="старый пароль"
                    error={APP_STORAGE.personal_acc.getErrr_old_pass()}
                    helperText= {APP_STORAGE.personal_acc.getError_old_message()}
                    size='small' 
                    type="password"
                    onChange={ (e)=>{ APP_STORAGE.personal_acc.setOld_Pass(e.target.value); } }
                    value={ APP_STORAGE.personal_acc.getOld_Pass() || '' } />
                    

                <TextField sx = {{m: 1}}
                    label="новый пароль"
                    error={APP_STORAGE.personal_acc.getErrr_new_pass()}
                    size='small' 
                    type="password"
                    helperText= {APP_STORAGE.personal_acc.getError_new_message()}
                    onChange={ (e)=>{ APP_STORAGE.personal_acc.setNew_Pass(e.target.value); } }
                    value={ APP_STORAGE.personal_acc.getNew_Pass() || '' }  />


                <TextField sx = {{m: 1}}
                    label="повторите пароль"
                    error={APP_STORAGE.personal_acc.getError_pass()}
                    helperText= {APP_STORAGE.personal_acc.getError_message()}
                    size='small' 
                    type="password"
                    onChange={ (e)=>{ APP_STORAGE.personal_acc.setRepeat_password(e.target.value); } }
                    value={ APP_STORAGE.personal_acc.getRepeat_password() || ''} />

</Box>
            </React.Fragment>
        );
    }
}



