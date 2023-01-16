import React from "react";
import { observer } from "mobx-react";

import { Box, Alert, Typography } from "@mui/material";
import { APP_STORAGE } from "../../../storage/AppStorage";

import TreeItem, { TreeItemProps, treeItemClasses } from "@mui/lab/TreeItem";

import TreeView from "@mui/lab/TreeView";

import { StyledTreeItem } from "../Devs/StyledTreeItem";

import { MinusSquare } from "../Devs/StyledTreeItem";

import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import SensorsIcon from "@mui/icons-material/Sensors";

import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
import { color } from "@mui/system";
import { a } from "@react-spring/web";

interface IProps {}

//Устройства
@observer
export class DevsGroups extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount(): void {
    APP_STORAGE.devs_groups.get_DevsGroups(
      "sess_id",
      APP_STORAGE.auth_form.getdt()
    );
  }

  async Treeitems(e: any, a: number) {
    let number = Number(a);
    alert(e);
    APP_STORAGE.devs.setIdDevs(e);
    APP_STORAGE.devs.setParent1(number);
    APP_STORAGE.devs.setIdChild(e);
    APP_STORAGE.devs.get_Devs("sess_id", APP_STORAGE.auth_form.getdt());
  }

  async TreeSensors(e: any, a: any) {
    let number = Number(a);
    // APP_STORAGE.devs.setIdDevs(e);
    APP_STORAGE.devs.setIdChild(e);
    APP_STORAGE.devs.setParent(number);
    APP_STORAGE.devs.get_Devs11("sess_id", APP_STORAGE.auth_form.getdt());
  }

  async setIdDev(e: any) {
    APP_STORAGE.devs.setIdDev(e);
  }

  render(): React.ReactNode {
    let id = [];
    let parent_id = [];

    if (APP_STORAGE.devs_groups.getDevsGroups()) {
      let devs = JSON.parse(
        JSON.stringify(APP_STORAGE.devs_groups.getDevsGroups())
      );
      for (var key in devs) {
        let a = devs[key];
        id.push(a.id);
        parent_id.push(a.parent_id);
      }

      console.log(id);
      console.log(parent_id);
      

      

      /* for (var key in devs) {
        if (devs.hasOwnProperty(key)) {
          let a = devs[key];
          console.log(a.id);

          if( Number(a.parent_id) === 0){
            parent.push( <StyledTreeItem nodeId={a.id} label={a.g_name}> {child}</StyledTreeItem>)
          }
          if (Number(a.id) ===pate ){
            child.push( <StyledTreeItem nodeId={a.id} label={a.g_name}></StyledTreeItem>)
          }
        }
      }*/
    }

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
            Список групп устройств
          </Typography>
          <Box
            sx={{
              width: "290px",
              p: "25px",
              borderRadius: "4px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <TreeView
              aria-label="customized"
              // defaultExpanded={["1",]}
              defaultCollapseIcon={<MinusSquare />}
              defaultExpandIcon={<FolderOpenIcon />}
              defaultEndIcon={<FolderOpenIcon />}
              sx={{ flexGrow: 1, maxWidth: 400 }}
            >
              {id}
            </TreeView>
          </Box>
        </Box>
      </React.Fragment>
    );
  }
}
