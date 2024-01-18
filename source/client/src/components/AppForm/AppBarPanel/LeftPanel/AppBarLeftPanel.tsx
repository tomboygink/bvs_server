import * as React from "react";

import {
  Drawer,
  Divider,
  ListItemIcon,
  MenuItem,
  ListItemText,
  Button,
} from "@mui/material";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import { APP_STORAGE } from "../../../../storage/AppStorage";
import { observer } from "mobx-react";

import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import BusinessIcon from "@mui/icons-material/Business";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";

import LogoutIcon from "@mui/icons-material/Logout";

import FolderOpenIcon from "@mui/icons-material/FolderOpen";

interface IProps {}

@observer
export class AppBarLeftPanel extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  async OpenListDev() {
    APP_STORAGE.devs_groups.setMiddleForm(1);
    APP_STORAGE.app_bar.setSetOpenAppBar(false);
  }

  async OpenListOrg() {
    APP_STORAGE.devs_groups.setMiddleForm(5);
    APP_STORAGE.app_bar.setSetOpenAppBar(false);
  }

  async OpenListJobsTitles() {
    APP_STORAGE.devs_groups.setMiddleForm(6);
    APP_STORAGE.app_bar.setSetOpenAppBar(false);
  }

  async DevLocation(e: any) {
    APP_STORAGE.devs_groups.setMiddleForm(e);
    APP_STORAGE.devs_groups.get_DevsGroups(
      "sess_id",
      APP_STORAGE.auth_form.getdt()
    ); /// получаем все организации
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

  async OpenTableUser(a: any) {
    /// рисуем таблицу пользователей

    APP_STORAGE.devs_groups.setMiddleForm(a);
    APP_STORAGE.reg_user.setOpenTableUsers(true);
    APP_STORAGE.reg_user.get_AllUsers("sess_id", APP_STORAGE.auth_form.getdt()); // все пользователи
    APP_STORAGE.app_bar.setSetOpenAppBar(false); /// закрываем
    ///APP_STORAGE.reg_user.get_Org("sess_id", APP_STORAGE.auth_form.getdt());  // как только модальное окно открылось, отправляем запрос на получение всех организаций
  }

  async functionSetIdOrgUser() {
    APP_STORAGE.setIdOrgUser(APP_STORAGE.auth_form.getUser().org_id);
  }

  render(): React.ReactNode {
    let user_r = null;
    let user_w = null;
    var menu: React.ReactNode = <></>;
    var roles = null;
    if (APP_STORAGE.auth_form.getUser().roles_ids) {
      setTimeout(() => this.functionSetIdOrgUser(), 100);

      roles = JSON.parse(
        JSON.stringify(APP_STORAGE.auth_form.getUser().roles_ids)
      );
      for (var key in roles) {
        if (roles.hasOwnProperty(key)) {
          let a = roles[key];

          setTimeout(() => APP_STORAGE.setRoleRead(a[0]), 100);
          setTimeout(() => APP_STORAGE.setRoleWrite(a[1]), 100);
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
          <MenuItem onClick={() => this.OpenListDev()}>
            <ListItemIcon className="list_item">
              <FolderOpenIcon fontSize="small" sx={{ color: "#007FFF" }} />
            </ListItemIcon>{" "}
            Устройства
          </MenuItem>

          <MenuItem onClick={() => this.OpenTableUser(3)}>
            <ListItemIcon className="list_item">
              <PeopleOutlineIcon fontSize="small" sx={{ color: "#007FFF" }} />
            </ListItemIcon>{" "}
            Пользователи
          </MenuItem>

          <MenuItem onClick={() => this.OpenListOrg()}>
            <ListItemIcon className="list_item">
              <AccountBalanceOutlinedIcon
                fontSize="small"
                sx={{ color: "#007FFF" }}
              />
            </ListItemIcon>{" "}
            Организации
          </MenuItem>

          <MenuItem onClick={() => this.OpenListJobsTitles()}>
            <ListItemIcon className="list_item">
              <EngineeringOutlinedIcon
                fontSize="small"
                sx={{ color: "#007FFF" }}
              />
            </ListItemIcon>{" "}
            Должности
          </MenuItem>

          <Divider light sx={{ pb: 1, pt: 1 }} />

          <MenuItem
            onClick={() => this.OpenModalRegUser(1, "Добавить пользователя")}
          >
            <ListItemIcon className="list_item">
              <PersonAddAltIcon fontSize="small" sx={{ color: "#007FFF" }} />
            </ListItemIcon>
            Добавить пользователя
          </MenuItem>

          <MenuItem
            onClick={() => this.OpenModalRegUser(2, "Добавить организацию")}
          >
            <ListItemIcon className="list_item">
              <BusinessIcon fontSize="small" sx={{ color: "#007FFF" }} />
            </ListItemIcon>
            Добавить организацию
          </MenuItem>

          <MenuItem
            onClick={() => this.OpenModalRegUser(3, "Добавить должность")}
          >
            <ListItemIcon className="list_item">
              <WorkOutlineIcon fontSize="small" sx={{ color: "#007FFF" }} />
            </ListItemIcon>
            Добавить должность
          </MenuItem>

          <Divider light sx={{ pb: 1, pt: 1 }} />

          {/* <MenuItem
          >
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            Выход
          </MenuItem>
    */}
        </>
      );
    } else if (user_r === 1) {
      menu = (
        <>
          <MenuItem>
            <ListItemIcon></ListItemIcon> Только чтение
          </MenuItem>
        </>
      );
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
          <Button
            sx={{ color: "#1976D2" }}
            onClick={() => {
              APP_STORAGE.app_bar.setSetOpenAppBar(false);
            }}
          >
            <ChevronLeftIcon sx={{ marginLeft: 28, color: "#2D70E7" }} />
          </Button>

          {menu}
        </Drawer>
      </React.Fragment>
    );
  }
}
