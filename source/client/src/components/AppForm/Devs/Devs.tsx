import * as React from "react";

import { observer } from "mobx-react";
import { APP_STORAGE } from "../../../storage/AppStorage";
import { Box, Typography, TextField, ListItemIcon } from "@mui/material";
import { TDevsGroup } from "../../../storage/components/Devs/DevEntityes";
import { TDGroup } from "../../../storage/components/Devs/DevEntityes";

import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";

interface IProps {}

//Устройства
@observer
export class Devs extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  async editDevice(a:any) {
    APP_STORAGE.devs.setMenu_devs(a);
    let DevGr: any;
    DevGr = APP_STORAGE.devs_groups.getDevsGroups();

    return this.getValueCh(DevGr);
  }

  getValueCh(dgrs: TDevsGroup[]) {
     
    var parent: React.ReactNode[] = new Array();
    for (var ii in dgrs) {
      var dgr: TDevsGroup = dgrs[ii];
      var gr: TDGroup = dgr.group;
      var gr_childs = dgr.childs;
      var gr_devs = dgr.devs;
      var childs: React.ReactNode[] = new Array();
      if (gr_childs.length > 0) childs = this.getValueCh(gr_childs);

      parent.push(childs);
      for (var key in gr_devs) {
        if (
          "_dev_id_key_" + gr_devs[key].id ===
          APP_STORAGE.devs.getIdChild()
        ) {
          APP_STORAGE.devs.setNumber(String(gr_devs[key].number));
          APP_STORAGE.devs_groups.setParentId('key-09');
          APP_STORAGE.devs.setName(String(gr_devs[key].name));
          APP_STORAGE.devs.setLongitude(String(gr_devs[key].longitude));
          APP_STORAGE.devs.setLatitude(String(gr_devs[key].latitude));
          APP_STORAGE.devs.setInfo(String(gr_devs[key].info));
          APP_STORAGE.devs.setChangeSensors(gr_devs[key].sensors.s);
          APP_STORAGE.devs.setId(String(gr_devs[key].id));
          APP_STORAGE.devs.setGroupDevId(String(gr_devs[key].group_dev_id));
          APP_STORAGE.devs.setCheckboxEd(gr_devs[key].deleted);
            

          if(APP_STORAGE.devs.getMenu_devs() === '1'){
            APP_STORAGE.devs.setOpenModalChange(true);
            APP_STORAGE.devs_groups.setOpen_menu(false);
          }
          if(APP_STORAGE.devs.getMenu_devs() === '2'){
            APP_STORAGE.devs_groups.setOpenModalMoveDevsGr(true);
            APP_STORAGE.devs_groups.setOpen_menu(false);
          }
          
        }
      }
    }
    return parent;
  }

  async closeModal() {
    APP_STORAGE.devs_groups.setOpenModal(false);
  }

  async SelectedOrg(a: any) {
    APP_STORAGE.devs_groups.setKeyOrg(a);
  }

  async OpenModal() {
    APP_STORAGE.devs.setOpenModal(true);
  }

  drawDevs(dgrs: TDevsGroup[]): React.ReactNode[] {
    //// отображаем выбранные устройства
    var devs: React.ReactNode[] = new Array();
    for (var ii in dgrs) {
      var dgr: TDevsGroup = dgrs[ii];
      var gr: TDGroup = dgr.group;
      var gr_childs = dgr.childs;
      var gr_devs = dgr.devs;
      for (var key in gr_devs) {
        if (
          "_dev_id_key_" + gr_devs[key].id ===
          APP_STORAGE.devs.getIdChild()
        ) {
          if (gr_devs[key].deleted === true) {
            devs.push(
              <React.Fragment key={"_gr_id_key_" + gr_devs[key].id}>
                <Box className="wrappert-devs">
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      flexDirection: "row",
                      background: "#fff",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ color: "#645757", fontWeight: "600" }}>
                      Место расположения - {gr.g_name}{" "}
                    </Typography>
                    {APP_STORAGE.getRoleWrite() === 2 &&
                      APP_STORAGE.getRoleRead() === 1 && (
                        <div>
                          <IconButton
                            onClick={() => {
                              APP_STORAGE.devs_groups.setOpen_menu(true);
                            }}
                            id="long-button555"
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
                            anchorEl={document.getElementById("long-button555")}
                            open={APP_STORAGE.devs_groups.getOpen_menu()}
                            onClose={() => {
                              APP_STORAGE.devs_groups.setOpen_menu(false);
                            }}
                          >
                            
                            <MenuItem onClick={() => this.editDevice('1')}>
                            <ListItemIcon>
                              <ModeEditRoundedIcon fontSize="small" />
                            </ListItemIcon>{" "}
                            Редактировать
                          </MenuItem>

                            <MenuItem onClick={() => this.editDevice('2')} >
                            <ListItemIcon>
                              <LogoutRoundedIcon fontSize="small" />
                            </ListItemIcon>{" "}
                            Переместить
                          </MenuItem>
                          </Menu>
                        </div>
                      )}
                  </Box>
                  <Box
                    sx={{
                      borderLeft: "1px solid #808080",
                      p: "12px",
                      borderRadius: "4px",
                      background: "#eeeeee5e",
                    }}
                  >
                    <Box></Box>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      size="small"
                      required
                      fullWidth
                      id="Название устройства"
                      label="Название устройства"
                      autoFocus
                      disabled={true}
                      value={gr_devs[key].name}
                    />

                    <TextField
                      variant="outlined"
                      margin="normal"
                      size="small"
                      required
                      fullWidth
                      id="Долгота"
                      label="Долгота"
                      autoFocus
                      disabled={true}
                      value={gr_devs[key].longitude}
                    />

                    <TextField
                      variant="outlined"
                      margin="normal"
                      size="small"
                      required
                      fullWidth
                      id="Долгота"
                      label="Долгота"
                      autoFocus
                      disabled={true}
                      value={gr_devs[key].longitude}
                    />

                    <TextField
                      variant="outlined"
                      margin="normal"
                      size="small"
                      required
                      fullWidth
                      id="Информация"
                      label="Информация"
                      autoFocus
                      disabled={true}
                      value={gr_devs[key].info}
                    />
                  </Box>
                </Box>
              </React.Fragment>
            );
          }

          if (gr_devs[key].deleted === false) {
            devs.push(
              <React.Fragment key={"_gr_id_key_" + gr_devs[key].id}>
                <Box className="wrappert-devs">
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ color: "#645757", fontWeight: "600" }}>
                      Место расположения - {gr.g_name}{" "}
                    </Typography>
                    {APP_STORAGE.getRoleWrite() === 2 &&
                      APP_STORAGE.getRoleRead() === 1 && (
                        <div>
                          <IconButton
                            onClick={() => {
                              APP_STORAGE.devs_groups.setOpen_menu(true);
                            }}
                            id="long-button555"
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
                            anchorEl={document.getElementById("long-button555")}
                            open={APP_STORAGE.devs_groups.getOpen_menu()}
                            onClose={() => {
                              APP_STORAGE.devs_groups.setOpen_menu(false);
                            }}
                          >
                            <MenuItem onClick={() => this.editDevice('1')}>
                            <ListItemIcon>
                              <ModeEditRoundedIcon fontSize="small" />
                            </ListItemIcon>{" "}
                            Редактировать
                          </MenuItem>

                            <MenuItem onClick={() => this.editDevice('2')} >
                            <ListItemIcon>
                              <LogoutRoundedIcon fontSize="small" />
                            </ListItemIcon>{" "}
                            Переместить
                          </MenuItem>
                          </Menu>
                        </div>
                      )}
                  </Box>
                  <Box
                    sx={{
                      borderLeft: "1px solid #266bf18c",
                      pl: "12px",
                      borderRadius: "4px",
                    }}
                  >
                    <Box></Box>

                    <TextField
                      variant="outlined"
                      margin="normal"
                      size="small"
                      required
                      fullWidth
                      id="Название устройства"
                      label="Название устройства"
                      autoFocus
                      value={gr_devs[key].name}
                    />

                    <TextField
                      variant="outlined"
                      margin="normal"
                      size="small"
                      required
                      fullWidth
                      id="Долгота"
                      label="Долгота"
                      autoFocus
                      ///onChange={ (e)=>{ APP_STORAGE.auth_form.setLogin(e.target.value); } }
                      value={gr_devs[key].longitude}
                    />

                    <TextField
                      variant="outlined"
                      margin="normal"
                      size="small"
                      required
                      fullWidth
                      id="Долгота"
                      label="Долгота"
                      autoFocus
                      ///onChange={ (e)=>{ APP_STORAGE.auth_form.setLogin(e.target.value); } }
                      value={gr_devs[key].longitude}
                    />

                    <TextField
                      variant="outlined"
                      margin="normal"
                      size="small"
                      required
                      fullWidth
                      id="Информация"
                      label="Информация"
                      autoFocus
                      ///onChange={ (e)=>{ APP_STORAGE.auth_form.setLogin(e.target.value); } }
                      value={gr_devs[key].info}
                    />
                  </Box>
                </Box>
              </React.Fragment>
            );
          }
        }
      }

      var childs: React.ReactNode[] = new Array();
      if (gr_childs.length > 0) childs = this.drawDevs(gr_childs);

      devs.push(childs);
    }
    return devs;
  }


  drawDevLocation(): React.ReactNode {
    let DevGr: any;
    DevGr = APP_STORAGE.devs_groups.getDevsGroups();
    return this.drawDevs(DevGr); /// передаем сформированные данные
  }


  
  render(): React.ReactNode {
    return (
      <React.Fragment>
        <Box
          className="wrapper-devs"
          sx={{
            display: "flex",
            flexDirection: "column;",
            alignItems: "flex-start;",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "100%",
            }}
          >
            {this.drawDevLocation()}
          </Box>
        </Box>
      </React.Fragment>
    );
  }
}
