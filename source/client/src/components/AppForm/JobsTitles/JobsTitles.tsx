import React from "react";
import { observer } from "mobx-react";

import {
  Box,
  Typography,
  TextField,
  ListItemIcon,
  Link,
  TextareaAutosize,
} from "@mui/material";
import { APP_STORAGE } from "../../../storage/AppStorage";

import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import Divider from "@mui/material/Divider";

import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import { EditJobsTitles } from "./EditJobsTitles";

interface IProps {}

//Устройства
@observer
export class JobsTitles extends React.Component<IProps> {
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
  }

  render(): React.ReactNode {
    let table_rows = [];
    if (APP_STORAGE.reg_user.getJobsAll()) {
      let jobstitles = JSON.parse(
        JSON.stringify(APP_STORAGE.reg_user.getJobsAll())
      );
      for (var key in jobstitles) {
        let row = jobstitles[key];

        if (String(row.id) === APP_STORAGE.reg_user.getNodeidJobsTitles()) {
          setTimeout(() => {
            ///////////////////////////////////////////Функция для отрисовки графика при нажатии на устройство
            APP_STORAGE.jobs.setId(row.id),
              APP_STORAGE.jobs.setIdOrg(row.org_id),
              APP_STORAGE.jobs.setJobsTitles(row.name),
              APP_STORAGE.jobs.setInfo(row.info);
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
                              APP_STORAGE.jobs.setModalEditJobsTitles(true);
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
                      Должность -{" "}
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
                  </Box>

                  <Divider sx={{ mt: "12px" }} />
                  <TextareaAutosize
                    className="info"
                    aria-label="minimum height"
                    minRows={4}
                    style={{ width: "100%", marginTop: "12px" }}
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
        <EditJobsTitles />
        <Box
          sx={{
            borderRadius: "4px",
            width: "100%",
            background: "#E3EDFF",
            p: 2,
            cursor: "pointer",
            transition: "0.3s",
            ":hover": {
              opacity: "0.6",
            },
          }}
          onClick={() => this.OpenModalRegUser(3, "Добавить должность")}
        >
          <Typography
            sx={{ display: "flex", color: "#266BF1", justifyContent: "center" }}
          >
            {" "}
            Добавить должность
          </Typography>
        </Box>
      </React.Fragment>
    );
  }
}
