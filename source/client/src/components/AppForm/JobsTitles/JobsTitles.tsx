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
export class JobsTitles extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
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
          table_rows.push(
            <React.Fragment key={String(row.id)}>
              <Box id="long-button" className="grid__card_middle">
                <Box>
              
                  <Box className="wrapper_user_card">
                    <Typography className="box_info" sx={{ color: "#000" }}>
                      {" "}
                      Должность-{" "}
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
