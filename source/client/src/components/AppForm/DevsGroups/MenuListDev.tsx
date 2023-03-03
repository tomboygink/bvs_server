import React from "react";
import { observer } from "mobx-react";

import { Box, Typography, TextField, ListItemIcon } from "@mui/material";
import { APP_STORAGE } from "../../../storage/AppStorage";

import { TDevsGroup } from "../../../storage/components/Devs/DevEntityes";
import { TDGroup } from "../../../storage/components/Devs/DevEntityes";

import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import Divider from "@mui/material/Divider";

import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";



interface IProps {}



export class MenuListDev extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  async moveDeviceLocation(a: any) {
    APP_STORAGE.devs.setMenu_devs(a);
    APP_STORAGE.devs_groups.setOpen_menu(false);
    let DevGr: any;
    DevGr = APP_STORAGE.devs_groups.getDevsGroups();
     

    return this.getValueMove(DevGr);
  }

  async openModal(e: any, org_id: any) {
    APP_STORAGE.devs_groups.setOrg(Number(org_id));
    APP_STORAGE.devs_groups.setParentId(e);
    APP_STORAGE.devs_groups.setOpenModal(true);
    APP_STORAGE.reg_user.get_Org("sess_id", APP_STORAGE.auth_form.getdt()); /// получаем все организации
  }


  
  getValueCh(dgrs: TDevsGroup[]) {
    var parent: React.ReactNode[] = new Array();
    for (var ii in dgrs) {
      var dgr: TDevsGroup = dgrs[ii];
      var gr: TDGroup = dgr.group;
      var gr_childs = dgr.childs;

      var childs: React.ReactNode[] = new Array();
      if (gr_childs.length > 0) childs = this.getValueCh(gr_childs);

      parent.push(childs);

      if (APP_STORAGE.devs.getIdDevs() === String(gr.id)) {
        APP_STORAGE.devs_groups.setName(String(gr.g_name));
        APP_STORAGE.devs_groups.setLongitude(String(gr.longitude));
        APP_STORAGE.devs_groups.setLatitude(String(gr.latitude));
        APP_STORAGE.devs_groups.setInfo(String(gr.g_info));
        APP_STORAGE.devs_groups.setKeyOrg(String(gr.org_id));
        APP_STORAGE.devs_groups.setParent(String(gr.parent_id));
        APP_STORAGE.devs_groups.setCheckboxEd(gr.deleted);

        APP_STORAGE.devs_groups.setOpenModalChDevsGr(true);
      }
    }
    return parent;
  }
  async editDeviceLocation() {
    APP_STORAGE.devs_groups.setOpen_menu(false);
    let DevGr: any;
    DevGr = APP_STORAGE.devs_groups.getDevsGroups();
    return this.getValueCh(DevGr);
  }

  getValueMove(dgrs: TDevsGroup[]) {
    let array = [];
    var parent: React.ReactNode[] = new Array();
    for (var ii in dgrs) {
      var dgr: TDevsGroup = dgrs[ii];
      var gr: TDGroup = dgr.group;
      var gr_childs = dgr.childs;

      var childs: React.ReactNode[] = new Array();
      if (gr_childs.length > 0) childs = this.getValueMove(gr_childs);

      parent.push(childs);

      if (Number(gr.parent_id) === 0) {
        array.push(gr.parent_id);
      }

      APP_STORAGE.setdevs_group_move(array);

      if (APP_STORAGE.devs.getIdDevs() === String(gr.id)) {
        APP_STORAGE.devs_groups.setParentId(String(gr.id));
        APP_STORAGE.devs_groups.setParent(String(gr.parent_id));
        APP_STORAGE.devs_groups.setName(gr.g_name);
        APP_STORAGE.devs_groups.setLatitude(gr.longitude);
        APP_STORAGE.devs_groups.setLongitude(gr.longitude);
        APP_STORAGE.devs.setCheckboxEd(gr.deleted);
        APP_STORAGE.devs.setInfo(gr.g_info);

        APP_STORAGE.devs_groups.setOpenModalMoveDevsGr(true);
      }
    }
    return parent;
  }
  render(): React.ReactNode {


    return (
        <div>
        <IconButton
          onClick={() => {
            APP_STORAGE.devs_groups.setOpen_menu(true);
          }}
          id="long-button_menu"
          aria-label="more"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
        >
        <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          MenuListProps={{
            "aria-labelledby": "long-button",
          }}
          anchorEl={document.getElementById("long-button_menu")}
          open={APP_STORAGE.devs_groups.getOpen_menu()}
          onClose={() => {
            APP_STORAGE.devs_groups.setOpen_menu(false);
          }}
        >
          <MenuItem onClick={() => this.editDeviceLocation()}>
            <ListItemIcon>
              <ModeEditRoundedIcon fontSize="small" />
            </ListItemIcon>{" "}
            Редактировать
          </MenuItem>

          <MenuItem
            onClick={() => this.moveDeviceLocation("3")}
          >
            <ListItemIcon>
              <LogoutRoundedIcon fontSize="small" />
            </ListItemIcon>{" "}
            Переместить
          </MenuItem>

          <Divider />
          <MenuItem>
            <Typography
              onClick={() =>
                APP_STORAGE.devs.setOpenModal(true)
              }
            >
              {" "}
              Добавить устройство
            </Typography>
          </MenuItem>

          <MenuItem
            onClick={() =>
              this.openModal(
                APP_STORAGE.devs.getIdDevs(),
                Number(APP_STORAGE.devs.getId_org())
              )
            }
          >
            <ListItemIcon>
              <CreateNewFolderOutlinedIcon fontSize="small" />
            </ListItemIcon>{" "}
            Добавить подруппу
          </MenuItem>
        </Menu>
      </div>
       );
  }}

