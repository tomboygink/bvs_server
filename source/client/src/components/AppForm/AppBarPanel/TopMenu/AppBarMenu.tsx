import * as React from "react";
import {
  MenuItem,
  IconButton,
  Divider,
  Menu,
  Avatar,
  Typography,
  Link,
  Box,
} from "@mui/material";

import ListItemIcon from "@mui/material/ListItemIcon";
import CreateIcon from "@mui/icons-material/Create";
import Logout from "@mui/icons-material/Logout";
import LockOpenIcon from "@mui/icons-material/LockOpen";

import {
  getCookie,
  setCookie,
  deleteCookie,
  deleteAllCookies,
} from "../../../../storage/browserCookes";
import { observer } from "mobx-react";
import { APP_STORAGE } from "../../../../storage/AppStorage";

import PermIdentityIcon from "@mui/icons-material/PermIdentity";

import { IWSQuery, WSQuery, IWSResult } from "../../../../../../xcore/WSQuery";
import { WSocket } from "../../../../storage/WSocket";
import { api } from "../../../../api/api";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

interface IProps {}

@observer
export class AccountMenu extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  async onLogOut() {
    var q: IWSQuery = new WSQuery("deleteCookie");
    q.args = {
      sess_id: APP_STORAGE.auth_form.getdt(),
    };
    api
      .fetch(q)
      .then(() => {
        APP_STORAGE.auth_form.setUser(null);
        APP_STORAGE.devs_groups.setMiddleForm("");

        deleteAllCookies();
      })
      .catch((e) => console.log("error=>", e));
    //     (await WSocket.get()).send(q);
    //     APP_STORAGE.auth_form.setUser(null);
    //     APP_STORAGE.devs_groups.setMiddleForm('')
    //     //aaa
    //    ///deleteCookie('sess_id', APP_STORAGE.auth_form.getdt() )
    //    deleteAllCookies();
  }

  async ChangeCUserData() {
    APP_STORAGE.modal.setModal(1);
    APP_STORAGE.modal.setPersonalAccaunt(true);
    APP_STORAGE.modal.setModalTitle("Изменение данных");
  }

  async ChangePassword() {
    APP_STORAGE.modal.setModal(2);
    APP_STORAGE.modal.setPersonalAccaunt(true);
    APP_STORAGE.modal.setModalTitle("Изменение пароля");
  }

  render(): React.ReactNode {
    const user = APP_STORAGE.auth_form.getUser();
    return (
      <React.Fragment>
        <Box
          sx={{
            background: "#266BF1",
            borderRadius: "4px",
            maxHeight: "52px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: "20px",
          }}
          id="btnPerfil"
          onClick={() => {
            APP_STORAGE.app_bar.setAppBarUser(true);
          }}
        >
          <Avatar sx={{ width: 32, height: 32 }}></Avatar>

          <Typography id="top-menu" sx={{ pl: "1rem", color: "#fff" }}>
            {" "}
            {user.family} {user.name} {user.father}{" "}
          </Typography>
          <ArrowDropDownIcon sx={{ color: "#fff" }} />
        </Box>
        <Menu
          anchorEl={document.getElementById("btnPerfil")}
          open={APP_STORAGE.app_bar.getAppBarUser()}
          onClick={() => {
            APP_STORAGE.app_bar.setAppBarUser(false);
          }}
          PaperProps={{
            elevation: 0,
            sx: {
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
            },
          }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }} /// смещаем компонент вправо
        >
          <MenuItem>
            <Avatar /> {user.family} {user.name}
          </MenuItem>
          <Divider sx={{ m: "16px" }} />

          <MenuItem
            onClick={() => {
              this.ChangeCUserData();
            }}
          >
            <ListItemIcon className="list_item">
              <PermIdentityIcon fontSize="small" sx={{ color: "#007FFF" }} />
            </ListItemIcon>{" "}
            Настройка профиля
          </MenuItem>

          <MenuItem
            onClick={() => {
              this.ChangePassword();
            }}
          >
            <ListItemIcon className="list_item">
              <LockOpenIcon fontSize="small" sx={{ color: "#007FFF" }} />
            </ListItemIcon>{" "}
            Изменить пароль
          </MenuItem>
          <Divider sx={{ m: "16px" }} />

          <MenuItem
            onClick={() => {
              this.onLogOut();
            }}
            sx={{ color: "#266BF1" }}
          >
            <ListItemIcon>
              <Logout fontSize="small" sx={{ color: "#266BF1" }} />
            </ListItemIcon>{" "}
            Выйти
          </MenuItem>
        </Menu>
      </React.Fragment>
    );
  }
}
