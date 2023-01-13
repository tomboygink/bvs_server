import * as React from "react";
import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";
import { alpha, styled } from "@mui/material/styles";
import TreeView from "@mui/lab/TreeView";
import TreeItem, { TreeItemProps, treeItemClasses } from "@mui/lab/TreeItem";
import Collapse from "@mui/material/Collapse";
// web.cjs is required for IE11 support
import { useSpring, animated } from "@react-spring/web";
import { TransitionProps } from "@mui/material/transitions";
import { Box, Alert, Typography, TextField } from "@mui/material";

import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
import SensorsIcon from "@mui/icons-material/Sensors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import { observer } from "mobx-react";
import { APP_STORAGE } from "../../../storage/AppStorage";


interface IProps {}

//Компонент формы приложения
@observer
export class Sensors extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  async closeModal() {
    APP_STORAGE.devs_groups.setOpenModal(false);
  }

  async SelectedOrg(a: any) {//// Сохраняем , то что выбрал пользователь из выпадающего списка Организации
    APP_STORAGE.devs_groups.setKeyOrg(a);
  }

  async OpenModal(){
    APP_STORAGE.devs.setOpenModal(true);
  }

  render(): React.ReactNode {
   

    return (
      <React.Fragment>
      <Box
        className="wrapper-devs"
        sx={{
          mt: "44px",
          display: "flex",
          flexDirection: "column;",
          alignItems: "flex-start;",
          ml: "1rem",
          mr: "32px",
        }}
      >
        <Typography sx={{ fontWeight: "500", pb: "20px" }}>
          Сенсоры на устройствах
        </Typography>
        <Box
          sx={{
            width: "290px",
            p: "25px",
            background: '#fff', 
            borderRadius: "4px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
         Тут список
        </Box>

        <Box
          sx={{
            width: "290px",
            p: "25px",
            mt: '22px',
            background: '#fff', 
            borderRadius: "4px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
       <li><SensorsIcon fontSize="small"/>[001]</li>
       <li><SensorsIcon fontSize="small"/>[001]</li>
        </Box>
      </Box>
    </React.Fragment>
    );
  }
}
