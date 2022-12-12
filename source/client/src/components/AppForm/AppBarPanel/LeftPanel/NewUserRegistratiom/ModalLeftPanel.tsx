import React from 'react';
import { observer } from 'mobx-react';

import { APP_STORAGE } from '../../../../../storage/AppStorage';

import {TextField, Box, Dialog , Divider , Typography} from '@mui/material';

import { NewUserRegistration } from './NewUserRegistration';

import CloseIcon from '@mui/icons-material/Close';



interface IProps{}


@observer
export class ModalLeftPanel extends React.Component<IProps> {
    constructor(props:any){
        super(props);
    }

    async closeModal(){
       APP_STORAGE.reg_user.setModalRegUser(false);
    }

        
      render(): React.ReactNode {
      var modal_date:React.ReactNode = <></>;

      if (APP_STORAGE.reg_user.getModalRegUser() === true)
      {
        modal_date = <NewUserRegistration/>
      }

      return (
      <React.Fragment>

      <Dialog sx={{background: "#fff"}} open={APP_STORAGE.reg_user.getModalRegUser()}  fullWidth >
       
      <Box  sx={{p: 2}}>

      <Box className='ModalTitle' sx = { {display: 'flex' , justifyContent: 'space-between'}}> 
       
      <Typography component="h1" variant="h5"> 
         Регистрация нового пользователя
      </Typography>
   
      <CloseIcon  sx={{color: '#1976D2'}}
          onClick={ ()=>{this.closeModal();}}
          />
      </Box>  
      <Typography sx={{fontSize: '12px', color: 'grey' , mb: '14px'}}>
               Пожалуйста, заполните все поля.
                </Typography>
      

          {modal_date}
      </Box>

      </Dialog>
      
      </React.Fragment>
        );
    }
}



