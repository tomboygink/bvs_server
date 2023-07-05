import React from "react";
import { observer } from "mobx-react";

import { Box, Typography, TextField, ListItemIcon, Link, TextareaAutosize } from "@mui/material";
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

import {EditOrg} from './EditOrg'



interface IProps {}

//Устройства
@observer
export class Orgs extends React.Component<IProps> {
  constructor(props: any) {
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
  render(): React.ReactNode {
    let table_rows = [];
    if (APP_STORAGE.reg_user.getOrgAll()) {
      let org = JSON.parse(
        JSON.stringify(APP_STORAGE.reg_user.getOrgAll())
      );
      for (var key in org) {
        let row = org[key];
        if (String(row.id) === APP_STORAGE.reg_user.getNodeidOrg()) {

          setTimeout(() => {  ///////////////////////////////////////////Функция для отрисовки графика при нажатии на устройство
          APP_STORAGE.org.setFullNameOrg(row.full_name);
          APP_STORAGE.org.setNameOrg(row.name);
          APP_STORAGE.org.setInn(row.inn);
          APP_STORAGE.org.setAddress(row.address);
          APP_STORAGE.org.setLatitude(row.latitude);
          APP_STORAGE.org.setLongitude(row.longitude);
          APP_STORAGE.org.setKeyOrg(row.id);
         }, 100);

          
          table_rows.push(
            <React.Fragment key={String(row.id)}>
              <Box id="long-button" className="grid__card_middle">
                <Box>
                  {APP_STORAGE.getRoleWrite() === 2 &&
                    APP_STORAGE.getRoleRead() === 1 && (
                      <div className="edit_user_menu">
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
                          <MenuItem
                          onClick={() => {
                            APP_STORAGE.org.setModalEditOrg(true);
                          }}
                          >
                            <ListItemIcon>
                              <ModeEditRoundedIcon fontSize="small" />
                            </ListItemIcon>{" "}
                            Редактировать
                          </MenuItem>
                        </Menu>
                      </div>
                    )}

                  <Box className="wrapper_user_card">
                    <Typography className="box_info" sx={{ color: "#000" }}>
                      {" "}
                     Полное наименование - 
                    </Typography>

                    <TextField
                      className="box_info"
                      fullWidth
                      inputProps={{ style: { fontSize: 12 } }}
                      InputLabelProps={{ style: { fontSize: 12 } }}
                      variant="outlined"
                      margin="normal"
                      size="small"
                      value={row.full_name || ""}
                    />

                  <Typography className="box_info" sx={{ color: "#000" }}>
                  {" "}
                  Наименование -{" "}
                  </Typography>

                  <TextField
                  className="box_info"
                  fullWidth
                  inputProps={{ style: { fontSize: 12 } }}
                  InputLabelProps={{ style: { fontSize: 12 } }}
                  variant="outlined"
                  margin="normal"
                  size="small"
                  value={row.name || ""}
                  />

                    <Typography className="box_info" sx={{ color: "#000" }}>
                      ИНН -
                    </Typography>

                    <TextField
                      className="box_info"
                      fullWidth
                      inputProps={{ style: { fontSize: 12 } }}
                      InputLabelProps={{ style: { fontSize: 12 } }}
                      variant="outlined"
                      margin="normal"
                      size="small"
                      value={row.inn || ""}
                    />

                    <Typography className="box_info" sx={{ color: "#000" }}>
                      Адрес -
                    </Typography>

                    <TextField
                      className="box_info"
                      fullWidth
                      inputProps={{ style: { fontSize: 12 } }}
                      InputLabelProps={{ style: { fontSize: 12 } }}
                      variant="outlined"
                      margin="normal"
                      size="small"
                      value={row.address || ""}
                    />

                    <Typography className="box_info" sx={{ color: "#000" }}>
                      Долгота -
                    </Typography>

                    <TextField
                      className="box_info"
                      fullWidth
                      inputProps={{ style: { fontSize: 12 } }}
                      InputLabelProps={{ style: { fontSize: 12 } }}
                      variant="outlined"
                      margin="normal"
                      size="small"
                      value={row.longitude || ""}
                    />

                    <Typography className="box_info" sx={{ color: "#000" }}>
                      Широта -
                    </Typography>

                    <TextField
                      className="box_info"
                      fullWidth
                      inputProps={{ style: { fontSize: 12 } }}
                      InputLabelProps={{ style: { fontSize: 12 } }}
                      variant="outlined"
                      margin="normal"
                      size="small"
                      value={row.latitude || ""}
                    /> 
                  </Box>

                  <Divider  sx ={{mt: '12px'}}/>
                  <TextareaAutosize
          className="info"
          aria-label="minimum height"
          minRows={4}
          style={{ width: "100%" , marginTop: '12px'}}
          value={row.info || ""}
        />
                </Box>
              </Box>
            </React.Fragment>
          );
        }
      }
    }
    return (
      <React.Fragment>
        <Typography sx={{ fontWeight: "600", color: "#111111", mb: "8px" }}>
          {" "}
          Подробная информация{" "}
        </Typography>

     
        {table_rows}
        <EditOrg />

        <Box
              sx={{
                borderRadius: "4px",
                width: '100%',
                background:'#E3EDFF',
                p:2
                
              }}
              onClick={() => this.OpenModalRegUser(2, "Добавить организацию")}
            >
              <Typography sx={{ display: "flex", color:'#266BF1', justifyContent: 'center' }}>
                {" "}
                Добавить организацию
              </Typography>
            </Box>
      </React.Fragment>
    );
  }
}
