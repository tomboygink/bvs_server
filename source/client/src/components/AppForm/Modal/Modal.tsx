import React from 'react';
import { observer } from 'mobx-react';
;
import {TextField, Box, Dialog , Divider , Typography } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

import { APP_STORAGE } from '../../../storage/AppStorage';

import {ChangePassword} from './ChangePassword'
import {ChangeUserData} from './ChangeUserData'

interface IProps{}


@observer
export class Modal extends React.Component<IProps> {
    constructor(props:any){
        super(props);
    }
      render(): React.ReactNode {
      var modal_date:React.ReactNode = <></>;
      if(APP_STORAGE.personal_acc.getModal() === 1 ) {
            modal_date = <ChangeUserData/>} 
       else if (APP_STORAGE.personal_acc.getModal() === 2 ) { 
            modal_date = <ChangePassword/>;}

      return (
      <React.Fragment>

      <Dialog open={APP_STORAGE.personal_acc.getPersonalAccaunt()}>
      <Box  sx={{p: 2}}>

      <Box className='ModalTitle' sx = { {display: 'flex' , justifyContent: 'space-between', mb: '12px'}}> 
       
      <Typography> 
          { APP_STORAGE.personal_acc.getModalTitle()}
      </Typography>

      <CloseIcon  
          onClick={()=>{ APP_STORAGE.personal_acc.setPersonalAccaunt(false); }}/>
      </Box>  
      
      <Divider 
          sx = {{marginBottom: '20px'}}/>
          {modal_date}    
      </Box>
      </Dialog>
      </React.Fragment>
        );
    }
}



