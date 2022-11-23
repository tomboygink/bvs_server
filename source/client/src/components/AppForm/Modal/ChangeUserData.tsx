import React from 'react';
import { observer } from 'mobx-react';

import {TextField, Box, Button , Divider , Typography, Checkbox, Alert  , } from '@mui/material';
import { APP_STORAGE } from '../../../storage/AppStorage';
import SaveIcon from '@mui/icons-material/Save';
import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import CheckIcon from '@mui/icons-material/Check';

interface IProps{}


@observer
export class ChangeUserData extends React.Component<IProps> {
    constructor(props:any){
        super(props);
     
    }
     
    async saveСhanges( ) {
      APP_STORAGE.modal.set_CUserData('sess_id', APP_STORAGE.auth_form.getdt())

      
      }

    async confirmEmail () {
      alert('fuydgfydsfgdfs') 
    }
    

    componentDidMount(): void {
      let user =  APP_STORAGE.auth_form.user;
      if(APP_STORAGE.modal.getFamily() === ''){
            
      APP_STORAGE.modal.setFamily(user.family)  
      }

      if(APP_STORAGE.modal.getName() === ''){
      APP_STORAGE.modal.setName(user.name)  
      }

      if(APP_STORAGE.modal.getFather() === ''){
      APP_STORAGE.modal.setFather(user.father)  
      }

      if(APP_STORAGE.modal.getTelephone() === ''){
      APP_STORAGE.modal.setTelephone(user.telephone)  
      }


      if(APP_STORAGE.modal.getEmail() === ''){
      APP_STORAGE.modal.setEmail(user.email)  
      }
      

      if(APP_STORAGE.modal.getLogin() === ''){
      APP_STORAGE.modal.setLogin(user.login)  
      }

        
  }


      render(): React.ReactNode {
            const checked = APP_STORAGE.modal.getChecked();
            const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                  APP_STORAGE.modal.setChecked(event.target.checked);
                };
      return (
      <React.Fragment>

      <Box>     
       

        <Typography variant="caption" sx = {{color: '#0D80D8'}}>Фамилия: </Typography> 
        <TextField 
              fullWidth 
              size='small'
              onChange={ (e)=>{ APP_STORAGE.modal.setFamily(e.target.value);; } }
              value={ APP_STORAGE.modal.getFamily() || '' } />
          


        <Typography variant="caption" sx = {{color: '#0D80D8'}}>Имя:</Typography>
        <TextField 
              fullWidth 
              size='small'
              onChange={ (e)=>{ APP_STORAGE.modal.setName(e.target.value); } }
              value={ APP_STORAGE.modal.getName() || ''} />


        <Typography variant="caption" sx = {{color: '#0D80D8'}}>Отчество:</Typography>
        <TextField
              fullWidth  
              size='small' 
              onChange={ (e)=>{ APP_STORAGE.modal.setFather(e.target.value); } }
              value={ APP_STORAGE.modal.getFather() || '' }  />

      
        <Typography variant="caption"  sx = {{color: '#0D80D8'}}>Телефон:</Typography>
        <TextField 
              error={APP_STORAGE.modal.getError_phone()}
              helperText= {APP_STORAGE.modal.getPhone_message()}
              fullWidth 
              size='small' 
              type="tel"
              required
              onChange={ (e)=>{ APP_STORAGE.modal.setTelephone(e.target.value); } }
              value={ APP_STORAGE.modal.getTelephone()} />


        <Typography variant="caption" sx = {{color: '#0D80D8'}}>E-mail:</Typography>
        <Box sx = {{display: 'flex'}}> 
        <TextField
              error={APP_STORAGE.modal.getError_emain()}
              helperText= {APP_STORAGE.modal.getEmail_message() || APP_STORAGE.modal.getCmdErrData()}
              fullWidth   
              size='small'
              type = 'email'
              required
              onChange={ (e)=>{ APP_STORAGE.modal.setEmail(e.target.value); } }
              value={ APP_STORAGE.modal.getEmail() || ''} /> 


      <Checkbox
            checked={checked}
            onChange={handleChange}
            id="myCheck"
            //onChange = { () => {this.confirmEmail}}
            inputProps={{ 'aria-label': 'controlled' }}
    />
      </Box>        

      
      <Typography variant="caption" sx = {{color: '#0D80D8'}}>Состояние:</Typography>
         <TextField 
              fullWidth 
              size='small'
              value= 'Действующая'/>



        <Typography variant="caption">ПРИМЕЧАНИЕ:</Typography>
        <TextField 
              fullWidth 
              size='small'
              onChange={ (e)=>{ APP_STORAGE.modal.setInfo(e.target.value); } }
              value={ APP_STORAGE.modal.getInfo()  || ''}  />
      
        </Box>
        <Divider/>
      <Box className='right-wrapper' sx ={{pl: 1, mt : 2}}> 
      <Button  sx ={{mr: 2 , mb: '16px'}}   
              variant="outlined"
            //   onClick={ ()=>{ APP_STORAGE.personal_acc.set_CUserData('sess_id', APP_STORAGE.auth_form.getdt())}}> 
              onClick={ ()=>{this.saveСhanges();}}>
              Сохранить
      </Button>
        {/* <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
        Данные успешно сохранены. Перезагрузите страницу
      </Alert> */}

      </Box>
      </React.Fragment>
        );
    }
}



