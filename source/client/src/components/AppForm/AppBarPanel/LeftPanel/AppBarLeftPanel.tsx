import * as React from "react";

import { Drawer, List, Divider, ListItemIcon, MenuItem } from "@mui/material";

import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import { APP_STORAGE } from "../../../../storage/AppStorage";
import { observer } from "mobx-react";

import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import BusinessIcon from "@mui/icons-material/Business";
import WorkIcon from '@mui/icons-material/Work';

interface IProps {}

@observer
export class AppBarLeftPanel extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  async OpenModalRegUser(e: any, tittle: string) {
    APP_STORAGE.reg_user.get_Org("sess_id", APP_STORAGE.auth_form.getdt()); /// получаем все организации

    APP_STORAGE.reg_user.setTakeModal(e); // идентификатор модального окна
    APP_STORAGE.reg_user.setTittleModal(tittle); // заголовок модального окна
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
            "& .MuiDrawer-paper": {
              width: 250,
            },
          }}
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

          <MenuItem>
            <ListItemIcon>
              <PeopleOutlineIcon fontSize="small" />
            </ListItemIcon>{" "}
            Пользователи
          </MenuItem>

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
              <WorkIcon fontSize="small" />
            </ListItemIcon>
            Добавить должность
          </MenuItem>
        </Drawer>
      </React.Fragment>
    );
  }
}
