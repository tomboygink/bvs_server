import * as React from "react";

import { Drawer, List, Divider, ListItemIcon, MenuItem, ListItemText } from "@mui/material";

import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import { APP_STORAGE } from "../../../../storage/AppStorage";
import { observer } from "mobx-react";

import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import BusinessIcon from "@mui/icons-material/Business";
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';

import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';



interface IProps {}

@observer
export class AppBarLeftPanel extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }
  
  async OpenListDev() {
   
    if(  APP_STORAGE.devs_groups.getOpenListDev() === false) {
      APP_STORAGE.devs_groups.setOpenListDev(true); 
    }
    else {
      APP_STORAGE.devs_groups.setOpenListDev(false); 
    }
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

  async OpenTableUser() {  /// рисуем таблицу пользователей
   APP_STORAGE.reg_user.setOpenTableUsers(true);
   APP_STORAGE.reg_user.get_AllUsers("sess_id", APP_STORAGE.auth_form.getdt()); // все пользователи
   APP_STORAGE.app_bar.setSetOpenAppBar(false);/// закрываем
   APP_STORAGE.reg_user.get_Org("sess_id", APP_STORAGE.auth_form.getdt());  // как только модальное окно открылось, отправляем запрос на получение всех организаций
  }

  render(): React.ReactNode {
    let user_r = null;
    let user_w = null;
    var menu: React.ReactNode = <></>;
    var roles = null;
    if (APP_STORAGE.auth_form.getUser().roles_ids) {
      roles = JSON.parse(
        JSON.stringify(APP_STORAGE.auth_form.getUser().roles_ids)
      );
      for (var key in roles) {
        if (roles.hasOwnProperty(key)) {
          let a = roles[key];
          user_r = a[0];
          user_w = a[1];
        }
      }
    }
    
      /* ----- разграничение прав доступа --------------------
                user_r === 1 Только чтение 
                user_w === 2 Разрегить редактирование
               */

     
    if (user_w === 2 && user_r === 1) {  
      menu = (
        <>
          <MenuItem
           onClick={() => this.OpenTableUser()}
          >
            <ListItemIcon>
              <PeopleOutlineIcon fontSize="small" />
            </ListItemIcon>{" "}
            Пользователи
          </MenuItem>
  
          <Divider light sx={{pb: 1, pt:1}} />

          <MenuItem
            onClick={() => this.OpenModalRegUser(1, "Добавить пользователя")}
          >
            <ListItemIcon>
              <PersonAddAltIcon fontSize="small" />
            </ListItemIcon>
            Добавить пользователя
          </MenuItem>

          <MenuItem
            onClick={() => this.OpenModalRegUser(2, "Добавить организацию")}
          >
            <ListItemIcon>
              <BusinessIcon fontSize="small" />
            </ListItemIcon>
            Добавить организацию
          </MenuItem>

          <MenuItem
            onClick={() => this.OpenModalRegUser(3, "Добавить должность")}
          >
            <ListItemIcon>
              <WorkOutlineIcon fontSize="small" />
            </ListItemIcon>
            Добавить должность
          </MenuItem>

          <Divider light sx={{pb: 1, pt:1}} />

          <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
     
    >
   
     
      <ListItemButton  onClick={() => this.OpenListDev()}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Устройства" />
        {APP_STORAGE.devs_groups.getOpenListDev() ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={APP_STORAGE.devs_groups.getOpenListDev()} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <RoomOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Расположение" />
          </ListItemButton>
        </List>
      </Collapse>

      <Collapse in={APP_STORAGE.devs_groups.getOpenListDev()} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <FormatListNumberedIcon />
            </ListItemIcon>
            <ListItemText primary="Список" />
          </ListItemButton>
        </List>
      </Collapse>
      
    </List>
        </>
      );
    }
    else if (user_r === 1) {
      menu = (
        <>
          <MenuItem>
            <ListItemIcon>
            </ListItemIcon>{" "}
            Только чтение
          </MenuItem>
          </>
      )

    }

    return (
      <React.Fragment>
        <Drawer
          sx={{
            width: 250,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 250,
            },
          }}
          // variant="persistent"
          anchor="left"
          open={APP_STORAGE.app_bar.getSetOpenAppBar()}
        >
          <IconButton
            sx={{ color: "#1976D2" }}
            aria-label="open drawer"
            onClick={() => {
              APP_STORAGE.app_bar.setSetOpenAppBar(false);
            }}
            edge="start"
          >
            <ChevronLeftIcon sx={{ marginLeft: 28 }} />
          </IconButton>

          {menu}
        </Drawer>
      </React.Fragment>
    );
  }
}
