import * as React from 'react';
import {MenuItem, IconButton , Divider, Menu , Avatar, Typography , Link } from '@mui/material';

import ListItemIcon from '@mui/material/ListItemIcon';
import Settings from '@mui/icons-material/Settings';
import CreateIcon from '@mui/icons-material/Create';
import Logout from '@mui/icons-material/Logout';
import LockOpenIcon from '@mui/icons-material/LockOpen';

import {getCookie , setCookie, deleteCookie }  from '../../../storage/browserCookes';
import { observer } from 'mobx-react';
import { APP_STORAGE } from '../../../storage/AppStorage'

import { IWSQuery, WSQuery, IWSResult } from '../../../../../xcore/WSQuery';
import { WSocket } from '../../../storage/WSocket'; 
interface IProps{} 


@observer
export class AccountMenu extends React.Component<IProps> {
  
    constructor(props:any){
        super(props);     
    }

    async onLogOut( ) {
            var q:IWSQuery = new WSQuery("deleteCookie");
            q.args = { 
            sess_id:APP_STORAGE.auth_form.getdt()
            };
            (await WSocket.get()).send(q);
            APP_STORAGE.auth_form.setUser(null);
            deleteCookie('sess_id', APP_STORAGE.auth_form.getdt() )  
            }
 
    render(): React.ReactNode {

        const user =  APP_STORAGE.auth_form.user;
        return (
            <React.Fragment>
                <IconButton id = 'btnPerfil'onClick={()=>{ APP_STORAGE.app_bar.setAppBarUser(true);  }}>
                <Avatar sx={{ width: 32, height: 32 }}></Avatar><Typography sx={{  pl: '1rem', color : 'white'}} > {user.family}  </Typography>
                </IconButton>
            <Menu
                anchorEl={document.getElementById('btnPerfil')}
                open={APP_STORAGE.app_bar.getAppBarUser()}
                onClick={()=>{ APP_STORAGE.app_bar.setAppBarUser(false);  }}
                PaperProps={{
                elevation: 0,
                sx: {
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
                },},
                }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }} /// смещаем компонент вправо
                >
            <MenuItem>
            <Avatar /> {user.family}
            </MenuItem>
            <Divider />
             
            <MenuItem onClick={()=>{ APP_STORAGE.personal_acc.setPersonalAccaunt(true); }} >
            <ListItemIcon>
            <CreateIcon fontSize="small" />
            </ListItemIcon>  Изменить данные пользователя
            </MenuItem>

            <MenuItem >
            <ListItemIcon>
            <LockOpenIcon fontSize="small" />
            </ListItemIcon>  Изменить пароль
            </MenuItem>

            <MenuItem onClick={ ()=>{this.onLogOut();}}>  
            <ListItemIcon>
            <Logout fontSize="small" />
            </ListItemIcon> Выйти 
            </MenuItem>
            </Menu>
            </React.Fragment>
        );
    }
}



