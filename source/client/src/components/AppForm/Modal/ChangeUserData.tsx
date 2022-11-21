import React from 'react';
import { observer } from 'mobx-react';

import {TextField, Box, Button , Divider , Typography } from '@mui/material';
import { APP_STORAGE } from '../../../storage/AppStorage';

interface IProps{}


@observer
export class ChangeUserData extends React.Component<IProps> {
    constructor(props:any){
        super(props);
    }
      render(): React.ReactNode {
      let user =  APP_STORAGE.auth_form.user;
      if(APP_STORAGE.personal_acc.getFamily() === ''){
      APP_STORAGE.personal_acc.setFamily(user.family)  
      }

      if(APP_STORAGE.personal_acc.getName() === ''){
      APP_STORAGE.personal_acc.setName(user.name)  
      }

      if(APP_STORAGE.personal_acc.getFather() === ''){
      APP_STORAGE.personal_acc.setFather(user.father)  
      }

      if(APP_STORAGE.personal_acc.getTelephone() === ''){
      APP_STORAGE.personal_acc.setTelephone(user.telephone)  
      }


      if(APP_STORAGE.personal_acc.getEmail() === ''){
      APP_STORAGE.personal_acc.setEmail(user.email)  
      }

      if(APP_STORAGE.personal_acc.getInfo() === ''){
      APP_STORAGE.personal_acc.setInfo(user.info)  
      }

      if(APP_STORAGE.personal_acc.getLogin() === ''){
      APP_STORAGE.personal_acc.setLogin(user.login)  
      }


      return (
      <React.Fragment>

      <Box>     
       

        <Typography variant="caption">Фамилия:</Typography>
        <TextField 
              fullWidth 
              size='small'
              onChange={ (e)=>{ APP_STORAGE.personal_acc.setFamily(e.target.value);; } }
              value={ APP_STORAGE.personal_acc.getFamily() || '' } />


        <Typography variant="caption">Имя:</Typography>
        <TextField 
              fullWidth 
              size='small'
              onChange={ (e)=>{ APP_STORAGE.personal_acc.setName(e.target.value); } }
              value={ APP_STORAGE.personal_acc.getName() || user.name} />


        <Typography variant="caption" >Отчество:</Typography>
        <TextField
              fullWidth  
              size='small' 
              onChange={ (e)=>{ APP_STORAGE.personal_acc.setFather(e.target.value); } }
              value={ APP_STORAGE.personal_acc.getFather() || user.father }  />

      
        <Typography variant="caption">Телофон:</Typography>
        <TextField 
              error={APP_STORAGE.personal_acc.getError_phone()}
              helperText= {APP_STORAGE.personal_acc.getPhone_message()}
              fullWidth 
              size='small' 
              type="tel"
              required
              onChange={ (e)=>{ APP_STORAGE.personal_acc.setTelephone(e.target.value); } }
              value={ APP_STORAGE.personal_acc.getTelephone() || user.telephone } />


        <Typography variant="caption">E-mail:</Typography>
        <TextField
              error={APP_STORAGE.personal_acc.getError_emain()}
              helperText= {APP_STORAGE.personal_acc.getEmail_message()}
              fullWidth   
              size='small'
              type = 'email'
              required
              onChange={ (e)=>{ APP_STORAGE.personal_acc.setEmail(e.target.value); } }
              value={ APP_STORAGE.personal_acc.getEmail() || user.email} />


        <Typography variant="caption">Примечание:</Typography>
        <TextField 
              fullWidth 
              size='small'
              onChange={ (e)=>{ APP_STORAGE.personal_acc.setInfo(e.target.value); } }
              value={ APP_STORAGE.personal_acc.getInfo()  || user.info}  />

      
        </Box>
        <Divider/>
      <Box className='right-wrapper' sx ={{pl: 1, mt : 2}}>

        <Button  sx ={{mr: 2}}   
              variant="outlined"
              onClick={ ()=>{ APP_STORAGE.personal_acc.set_CUserData('sess_id', APP_STORAGE.auth_form.getdt())}}>
              Сохранить
        </Button>
      </Box>
      </React.Fragment>
        );
    }
}



