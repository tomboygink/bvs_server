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
import { EditUser } from "../AppBarPanel/LeftPanel/EditUsers/EditUser";
import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";

import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";

import DirectionsIcon from "@mui/icons-material/Directions";

import { CONFIG } from "../../../../../xcore/config";

interface IProps {}

//Устройства
@observer
export class Orgs extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
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
          table_rows.push(
            <React.Fragment key={String(row.id)}>
              <Box id="long-button" className="grid__card_middle">
                <Box>
                  {/* {APP_STORAGE.getRoleWrite() === 2 &&
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
                            onClick={(e) => {
                              APP_STORAGE.edit_user.set_IdRows(
                                APP_STORAGE.reg_user.getNodeidUser()
                              );
                            }}
                          >
                            <ListItemIcon>
                              <ModeEditRoundedIcon fontSize="small" />
                            </ListItemIcon>{" "}
                            Редактировать
                          </MenuItem>
                        </Menu>
                      </div>
                    )} */}

                  <Box className="wrapper_user_card">
                    <Typography className="box_info" sx={{ color: "#000" }}>
                      {" "}
                      Наименование организации -{" "}
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
        <Typography sx={{ fontWeight: "500", color: "#111111", mb: "8px" }}>
          {" "}
          Подробная информация{" "}
        </Typography>
        {table_rows}
        <EditUser />
      </React.Fragment>
    );
  }
}
