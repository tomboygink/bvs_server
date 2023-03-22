import * as React from 'react';

import { APP_STORAGE } from '../../../storage/AppStorage'
import { observer } from 'mobx-react';

import {AppBar, Box, Button, IconButton, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; // иконка для меню
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import {AppBarLeftPanel} from './LeftPanel/AppBarLeftPanel'
import {AccountMenu} from './TopMenu/AppBarMenu';
import {Calendar} from '../Devs/Calendar'

interface IProps{} 


@observer
export class AppBarPanel extends React.Component<IProps> {
    constructor(props:any){
        super(props);   
    }
    async OpenModalRegUser(e: any, tittle: string) {
      APP_STORAGE.reg_user.get_Org("sess_id", APP_STORAGE.auth_form.getdt()); /// получаем все организации
  
      APP_STORAGE.reg_user.setTakeModal(e); // идентификатор модального окна
      APP_STORAGE.reg_user.setTittleModal(tittle); // заголовок модального окна
      APP_STORAGE.reg_user.setModalRegUser(true);
      APP_STORAGE.app_bar.setSetOpenAppBar(false);
      APP_STORAGE.reg_user.setOpenTableUsers(false);
      APP_STORAGE.reg_user.setOpenTableUsers(false);
    }

    async OpenLeftMenu() {
        APP_STORAGE.app_bar.setSetOpenAppBar(true);
      }

      async OpenModal(e: any, org_id: any) {
        APP_STORAGE.devs_groups.setOrg(Number(org_id));
        APP_STORAGE.devs_groups.setParentId(e);
        APP_STORAGE.devs_groups.setOpenModal(true);
        APP_STORAGE.reg_user.get_Org("sess_id", APP_STORAGE.auth_form.getdt()); /// получаем все организации
      }

    render(): React.ReactNode {
        var middle_form: React.ReactNode = <></>;

        if ( APP_STORAGE.devs_groups.getMiddleForm() === 1 || APP_STORAGE.devs_groups.getMiddleForm() === "") {
            middle_form = <>
            
        <Box sx={{background: '#fff', display: 'flex', justifyContent: 'space-between', p: '20px', alignItems: 'center'}}>
                  <Typography sx={{color: '#999999', fontSize: '14px'}}> Добавить новое расположение</Typography>
        <Box className='btn_border_left' sx={{borderLeft: '1px solid #AAAAAA'}}>
        
          <Button
          className="button-save new-devs"
            sx={{
              background: "#266BF1",
              color: "#fff;",
              fontSize: "12px",
              ml: '12px'}} onClick={() => this.OpenModal("0", 0)}> Добавить
          </Button>

        </Box> 
       </Box>
        
            </>
          }
          if (APP_STORAGE.devs_groups.getMiddleForm() === 2) {
            middle_form =  <Box sx={{background: '#fff', display: 'flex', flexDirection: 'column', p: '20px'}}>
       <Calendar />
            </Box>
          }
      
          if (APP_STORAGE.devs_groups.getMiddleForm() === 3) {
            middle_form =    <Box sx={{background: '#fff', display: 'flex', justifyContent: 'space-between', p: '20px', alignItems: 'center'}}>
            <Typography sx={{color: '#999999', fontSize: '14px'}}> Добавить пользователя</Typography>
  <Box className='btn_border_left' sx={{borderLeft: '1px solid #AAAAAA'}}>
  
    <Button
    className="button-save new-devs"
      sx={{
        background: "#266BF1",
        color: "#fff;",
        fontSize: "12px",
        ml: '12px'}} onClick={() => this.OpenModalRegUser(1, "Добавить пользователя")}> Добавить 
    </Button>

  </Box> 
 </Box>
          }


        return (
            <React.Fragment>
           <AppBar className='header-top' sx={{background: '#266bf100', boxShadow: 'none',  position: 'absolute'}}>
                <Box className='wrapper menu'>
                <Box className='menu-mobile'>
                 <Typography onClick={()=>{ this.OpenLeftMenu()}} >Меню</Typography>
                 <Typography onClick={() => this.OpenModal("0", 0)}>Добавить новое расположение</Typography>
                </Box>
                <Box
                    sx = {{background: '#266BF1', borderRadius: '4px', display: 'flex', alignItems: 'center', p: '20px', justifyContent: 'space-between', maxHeight: '52px'}}
                    color="inherit"
                    onClick={()=>{ this.OpenLeftMenu()}}           
                   >
                <MenuIcon sx={{background:'#4B88FF', borderRadius: '50px', p: '8px' , width: '40px', height: '40px' }}/>
                <Typography sx ={{fontSize: '14px'}}></Typography>
                <IconButton>
                {/* <ArrowForwardIosIcon sx = {{background: '#4B88FF'}} /> */}
                </IconButton>
                </Box>

                 {middle_form}
                <AccountMenu/> 
                </Box>
            </AppBar>
            <AppBarLeftPanel/> 

      </React.Fragment>
        );
    }
}



