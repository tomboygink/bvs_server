import React from 'react';
import { observer } from 'mobx-react';

import {AppBarPanel} from './AppBarPanel/AppBarPanel'
import {Modal} from './Modal/Modal'
import {ModalLeftPanel} from './AppBarPanel/LeftPanel/NewUserRegistratiom/ModalLeftPanel'
import {Box} from '@mui/material';
import { APP_STORAGE } from '../../storage/AppStorage';

interface IProps{}

//Компонент формы приложения
@observer
export class AppForm extends React.Component<IProps> {
    constructor(props:any){
        super(props);
    }
  

    render(): React.ReactNode {
     
        if (APP_STORAGE.auth_form.getUser())  
     
        return (
            <React.Fragment>
                <Box style={{display : 'flex'}}> 
                <AppBarPanel/>
                 <Modal/>
                 <ModalLeftPanel/>
                <Box sx = {{mt : '8%'}}></Box>
                </Box>
                <Box className='wrapper' sx={{display: 'flex', justifyContent: 'space-between'}} >
                <Box className='appform'>
                1
               </Box>
               <Box className='appform'>
                2
               </Box>
               <Box className='appform'>
                3
               </Box>
               </Box>
            </React.Fragment> 
        );
    
}
}



