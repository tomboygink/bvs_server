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
            middle_form = <Box sx={{background: '#fff'}}>Пользователь</Box>
          }
//asdasd
        return (
            <React.Fragment>
               <AppBar sx={{background: '#fff', boxShadow: 'none', borderBottom: '1px solid #8F9DCE;'}}>
                <Box 
                    sx={{ display: 'flex' , 
                    justifyContent: 'space-between' , 
                    pl: '3rem' , 
                    pr: '2rem'}} >
                    <IconButton
                    sx ={{color: '#0D1C52'}}
                    onClick={()=>{ APP_STORAGE.app_bar.setSetOpenAppBar(true); }}           
                    edge="start">
                <MenuIcon />
                <Typography sx = {{marginLeft: '22px', fontSize: '14px'}}> Выбрано: 5005 устройство</Typography>
                </IconButton>
                <AccountMenu/> 
                </Box>
            </AppBar>
            <AppBarLeftPanel/>  

      </React.Fragment>
        );
    }
}



