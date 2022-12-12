import * as React from 'react';

import {Drawer, List , Divider, ListItemIcon, MenuItem} from '@mui/material';

import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { APP_STORAGE } from '../../../../storage/AppStorage'
import { observer } from 'mobx-react';

import PersonAddAltSharpIcon from '@mui/icons-material/PersonAddAltSharp';
import {NewUserRegistration} from './NewUserRegistratiom/NewUserRegistration'


interface IProps{} 


@observer
export class AppBarLeftPanel extends React.Component<IProps> {
  
    constructor(props:any){
        super(props);     
    }


    async OpenModalRegUser( ) {
        APP_STORAGE.reg_user.setModalRegUser(true);
        APP_STORAGE.app_bar.setSetOpenAppBar(false);
        }
 
    render(): React.ReactNode {
        return (
            <React.Fragment>
          <Drawer
                sx={{
                width: 250,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                width: 250,
                },
                }}
                anchor="left"
                open={APP_STORAGE.app_bar.getSetOpenAppBar()}
                >
          <IconButton sx={{color : '#1976D2'}}
                aria-label="open drawer"
                onClick={()=>{ APP_STORAGE.app_bar.setSetOpenAppBar(false); }}
                edge="start" 
                >
                <ChevronLeftIcon  sx={{ marginLeft: 28}}/>
          </IconButton>
            
            <MenuItem onClick={ () => this.OpenModalRegUser()}>
            <ListItemIcon>
            <PersonAddAltSharpIcon fontSize="small" />
            </ListItemIcon>Добавить пользователя
            </MenuItem>
            

            <MenuItem>
            <ListItemIcon>
            <PersonAddAltSharpIcon fontSize="small" />
            </ListItemIcon>Текст
            </MenuItem>

            </Drawer>
            </React.Fragment>
        );
    }
}



