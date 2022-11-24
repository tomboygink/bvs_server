import React from 'react';
import { observer } from 'mobx-react';

import {AppBarPanel} from './AppBarPanel/AppBarPanel'
import {Modal} from './Modal/Modal'
import {Box } from '@mui/material';
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
                <Box className='1111' style={{display : 'flex'}}> 
                <AppBarPanel/>
                 <Modal/>
                <Box sx = {{mt : '20%'}}></Box>
                </Box>
            </React.Fragment> 
        );
    
}
}



