import React from "react";
import { observer } from "mobx-react";

import {
  Box,
  Typography,
  ListItemIcon,
  Link,
  TextareaAutosize,
  IconButton,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import { APP_STORAGE } from "../../../../storage/AppStorage";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
import DirectionsIcon from "@mui/icons-material/Directions";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import PhotoSizeSelectLargeIcon from "@mui/icons-material/PhotoSizeSelectLarge";

import { CONFIG } from "../../../../../../xcore/config";

import { TDevsGroup } from "../../../../storage/components/Devs/DevEntityes";
import { TDGroup } from "../../../../storage/components/Devs/DevEntityes";
import { TextInput } from "../../../shared/TextInput";

interface IProps {}

//Устройства
@observer
export class DevLocation extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  async openModal(e: any, org_id: any) {
    APP_STORAGE.devs_groups.setOrg(Number(org_id));
    APP_STORAGE.devs_groups.setParentId(e);
    APP_STORAGE.devs_groups.setOpenModal(true);
    APP_STORAGE.reg_user.get_Org("sess_id", APP_STORAGE.auth_form.getdt()); /// получаем все организации
  }

  async editDeviceLocation() {
    APP_STORAGE.devs_groups.setOpen_menu(false);
    let DevGr: any;
    DevGr = APP_STORAGE.devs_groups.getDevsGroups();
    return this.getValueCh(DevGr);
  }

  async moveDeviceLocation(a: any) {
    APP_STORAGE.devs.setMenu_devs(a);
    APP_STORAGE.devs_groups.setOpen_menu(false);
    let DevGr: any;
    DevGr = APP_STORAGE.devs_groups.getDevsGroups();
    return this.getValueMove(DevGr);
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
        APP_STORAGE.devs_groups.setKeyOrg(gr.org_id);
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

  drawDevGroup(dgrs: TDevsGroup[]): React.ReactNode[] {
    let parent: React.ReactNode[] = new Array();

    for (var ii in dgrs) {
      var dgr: TDevsGroup = dgrs[ii];
      var gr: TDGroup = dgr.group;
      var gr_childs = dgr.childs;
      var childs: React.ReactNode[] = new Array();
      if (gr_childs.length > 0) childs = this.drawDevGroup(gr_childs);

      /////////////////////////////////////////////////////////////////////////////// Если есть дочерние строки
      parent.push(
        <React.Fragment key={"_gr_id_key_" + gr.id}>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
            }}
          >
            <Box id={String(gr.id)}>{childs}</Box>
          </Box>
        </React.Fragment>
      );

      if (APP_STORAGE.devs.getIdDevs() === String(gr.id)) {
        APP_STORAGE.devs.setChangeSensors2(dgr.devs);

        setTimeout(() => {
          //////Сохраню данные в массив
          APP_STORAGE.devs.setGr(gr);
        }, 100);

        let longitude = gr.longitude;
        let latitude = gr.latitude;

        if (gr.svg) {
          var svg = atob(gr.svg.replace(/data:image\/svg\+xml;base64,/, ""));
          APP_STORAGE.importdevs.setSvg(svg);
          setTimeout(() => {
            APP_STORAGE.importdevs.uploadfile();
          }, 100);
        }

        if (gr.deleted === true) {
          /////////////////////////////////////////////////////////////////////////////////////////Если устройство удаленно
          parent.push(
            <React.Fragment key={String(gr.id)}>
              <Box id="long-button" className="grid__card_middle">
                <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
                  {APP_STORAGE.getRoleWrite() === 2 &&
                    APP_STORAGE.getRoleRead() === 1 && (
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

                          <MenuItem
                            onClick={() => APP_STORAGE.devs.setOpenModal(true)}
                          >
                            <ListItemIcon>
                              <CrisisAlertIcon fontSize="small" />
                            </ListItemIcon>{" "}
                            Добавить устройство
                          </MenuItem>

                          <MenuItem
                            onClick={() =>
                              APP_STORAGE.importdevs.setOpenModal(true)
                            }
                          >
                            <ListItemIcon>
                              <PostAddOutlinedIcon fontSize="small" />
                            </ListItemIcon>{" "}
                            Импортировать список устройств
                          </MenuItem>

                          <MenuItem>
                            <ListItemIcon>
                              <PostAddOutlinedIcon fontSize="small" />
                            </ListItemIcon>{" "}
                            Загрузить схему расположения
                          </MenuItem>

                          <MenuItem
                            onClick={() =>
                              this.openModal(
                                APP_STORAGE.devs.getIdDevs(),
                                Number(gr.org_id)
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
                    )}
                </Box>

                <Box className="wrapper_devlocation_card">
                  <Typography className="box_info" sx={{ color: "#000" }}>
                    Место расположения -
                  </Typography>

                  <TextInput disabled={true} value={gr.g_name || ""} />

                  <Typography className="box_info" sx={{ color: "#000" }}>
                    Долгота -
                  </Typography>

                  <TextInput
                    disabled={true}
                    value={gr.longitude.trim() || ""}
                  />

                  <Typography className="box_info" sx={{ color: "#000" }}>
                    Широта -
                  </Typography>

                  <TextInput disabled={true} value={gr.latitude.trim() || ""} />
                </Box>

                <Link
                  underline="hover"
                  href={`http://${CONFIG.host}:${
                    CONFIG.port
                  }/show-map?lng=${latitude.trim()}&lat=${longitude.trim()}`}
                  target="_blank"
                  sx={{
                    color: "#808080",
                    fontSize: "1rem",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row-reverse",
                  }}
                >
                  Показать на карте
                  <DirectionsIcon />
                </Link>

                <Divider sx={{ m: "2px" }} />
                <TextareaAutosize
                  className="info"
                  aria-label="minimum height"
                  minRows={4}
                  style={{ width: "100%", marginTop: "12px" }}
                  value={gr.g_info || ""}
                />
              </Box>
              {APP_STORAGE.importdevs.getSvg().length && (
                <>
                  <Typography
                    sx={{ fontWeight: "600", color: "#0D1C52", mb: "12px" }}
                  >
                    {" "}
                    Схема изделий на полигоне{" "}
                  </Typography>
                  <Box
                    className="svg-container"
                    sx={{
                      borderRadius: "4px",
                      background: "#fff",
                      display: "flex",
                      padding: "8px",
                      pl: "22px",
                      mb: "22px",
                    }}
                  ></Box>
                  <Box
                    id="tooltip"
                    sx={{ position: "absolute", display: "none" }}
                  ></Box>
                </>
              )}
            </React.Fragment>
          );

          ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        } else {
          /////////////////////////////////////////////////////////////////////////////////////////Если устройство действующее
          parent.push(
            <React.Fragment key={String(gr.id)}>
              <Box id="long-button" className="grid__card_middle">
                <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
                  {APP_STORAGE.getRoleWrite() === 2 &&
                    APP_STORAGE.getRoleRead() === 1 && (
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

                          <MenuItem
                            onClick={() => APP_STORAGE.devs.setOpenModal(true)}
                          >
                            <ListItemIcon>
                              <CrisisAlertIcon fontSize="small" />
                            </ListItemIcon>{" "}
                            Добавить устройство
                          </MenuItem>

                          <MenuItem
                            onClick={() =>
                              APP_STORAGE.importdevs.setOpenModal(true)
                            }
                          >
                            <ListItemIcon>
                              <PostAddOutlinedIcon fontSize="small" />
                            </ListItemIcon>{" "}
                            Импортировать список устройств
                          </MenuItem>

                          <MenuItem
                            onClick={() => {
                              APP_STORAGE.importdevs.setOpenModalSvg(true);
                            }}
                          >
                            <ListItemIcon>
                              <PhotoSizeSelectLargeIcon fontSize="small" />
                            </ListItemIcon>{" "}
                            Загрузить схему расположения
                          </MenuItem>

                          <MenuItem
                            onClick={() =>
                              this.openModal(
                                APP_STORAGE.devs.getIdDevs(),
                                Number(gr.org_id)
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
                    )}
                </Box>

                <Box className="wrapper_devlocation_card">
                  <Typography className="box_info" sx={{ color: "#000" }}>
                    Место расположения -
                  </Typography>

                  <TextInput value={gr.g_name || ""} />

                  <Typography className="box_info" sx={{ color: "#000" }}>
                    Долгота -
                  </Typography>

                  <TextInput value={gr.longitude.trim() || ""} />

                  <Typography className="box_info" sx={{ color: "#000" }}>
                    Широта -
                  </Typography>

                  <TextInput value={gr.latitude.trim() || ""} />
                </Box>
                <Link
                  underline="hover"
                  href={`http://${CONFIG.host}:${
                    CONFIG.port
                  }/show-map?lng=${latitude.trim()}&lat=${longitude.trim()}`}
                  target="_blank"
                  sx={{
                    fontSize: "1rem",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row-reverse",
                  }}
                >
                  Показать на карте
                  <DirectionsIcon />
                </Link>

                <Divider sx={{ m: "2px" }} />
                {gr.g_info.length && (
                  <TextareaAutosize
                    className="info"
                    aria-label="minimum height"
                    minRows={4}
                    style={{ width: "100%", marginTop: "12px" }}
                    value={gr.g_info || ""}
                  />
                )}
              </Box>

              {APP_STORAGE.importdevs.getSvg().length > 0 && (
                <>
                  <Typography
                    sx={{ fontWeight: "600", color: "#0D1C52", mb: "12px" }}
                  >
                    {" "}
                    Схема изделий на полигоне{" "}
                  </Typography>
                  <Box
                    className="svg-container"
                    sx={{
                      borderRadius: "4px",

                      background: "#fff",
                      display: "flex",
                      padding: "8px",
                      pl: "22px",
                      mb: "22px",
                    }}
                  ></Box>
                  <Box
                    id="tooltip"
                    sx={{ position: "absolute", display: "none" }}
                  ></Box>
                </>
              )}
            </React.Fragment>
          );
        }
      }
    }
    return parent;
  }

  drawDevLocation(): React.ReactNode {
    let DevGr: any;
    DevGr = APP_STORAGE.devs_groups.getDevsGroups();

    return this.drawDevGroup(DevGr);
  }

  render(): React.ReactNode {
    return (
      <React.Fragment>
        <Typography sx={{ fontWeight: "600", color: "#0D1C52", mb: "12px" }}>
          {" "}
          Данные по расположению устройства{" "}
        </Typography>

        {this.drawDevLocation()}
      </React.Fragment>
    );
  }
}
