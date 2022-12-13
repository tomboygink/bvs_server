import * as React from 'react';

import { APP_STORAGE } from '../../../storage/AppStorage'
import { observer } from 'mobx-react';

import {AppBar, Box, IconButton} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; // иконка для меню

import {AppBarLeftPanel} from './LeftPanel/AppBarLeftPanel'
import {AccountMenu} from './TopMenu/AppBarMenu'

interface IProps{} 


@observer
export class AppBarPanel extends React.Component<IProps> {
    constructor(props:any){
        super(props);   
    }

    render(): React.ReactNode {
        return (
            <React.Fragment>
           <AppBar >
                <Box 
                    sx={{ display: 'flex' , 
                    justifyContent: 'space-between' , 
                    pl: '2rem' , 
                    pr: '2rem'}} >
                    <IconButton
                    color="inherit"
                    onClick={()=>{ APP_STORAGE.app_bar.setSetOpenAppBar(true); }}           
                    edge="start">
                <MenuIcon />
                </IconButton>
                <AccountMenu/> 
                </Box>
            </AppBar>
            <AppBarLeftPanel/> 

      </React.Fragment>
        );
    }
}



