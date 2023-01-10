import React from "react";
import { observer } from "mobx-react";

import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

import { Box, Alert, Typography } from "@mui/material";
import { APP_STORAGE } from "../../../storage/AppStorage";
import { WidthFull } from "@mui/icons-material";

import TreeItem, { TreeItemProps, treeItemClasses } from "@mui/lab/TreeItem";
import Collapse from "@mui/material/Collapse";
import TreeView from "@mui/lab/TreeView";

import EdgesensorHighIcon from "@mui/icons-material/EdgesensorHigh";

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
    ); /// получаем все организации
    APP_STORAGE.devs.get_Devs("sess_id", APP_STORAGE.auth_form.getdt());
  }

  async Treeitems(e: any) {
    let items = [];
    let devs = JSON.parse(
      JSON.stringify(APP_STORAGE.devs_groups.getDevsGroups())
    );

    for (var key in devs) {
      if (devs.hasOwnProperty(key)) {
        let a = devs[key];

        if (a.parent_id === e) {
          items.push(
            <TreeItem key={a.id} nodeId={a.id} label={a.g_name}></TreeItem>
          );
        }
      }
    }
    APP_STORAGE.devs.setItem(items);
    APP_STORAGE.devs.setIdDevs(e)
  }

  render(): React.ReactNode {
    let devs = [];
    let dev_form = [];

    if (APP_STORAGE.devs_groups.getDevsGroups()) {
      devs = JSON.parse(
        JSON.stringify(APP_STORAGE.devs_groups.getDevsGroups())
      );

      for (var key in devs) {
        if (devs.hasOwnProperty(key)) {
          let a = devs[key];

          if (a.parent_id < 1) {
            dev_form.push(
              <TreeItem
                key={a.id}
                nodeId={a.id}
                label={a.g_name}
                onClick={() => {
                  this.Treeitems(a.id);
                }}
              >
                {APP_STORAGE.devs.getItem()}
              </TreeItem>
            );
          }
        }
      }
    }

    if (APP_STORAGE.auth_form.getUser())
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
            <Typography sx={{fontWeight: '500' , pb: '20px'}}>Список групп устройств</Typography>
            <Box
              sx={{
                width: "290px",
                minHeight: "168px",
                background: "#fff",
                p: "25px",
                borderRadius: "4px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <TreeView
                aria-label="customized"
                defaultExpanded={["1"]}
                defaultCollapseIcon={<RemoveIcon />}
                defaultExpandIcon={<AddIcon />}
                defaultEndIcon={<AddIcon />}
                sx={{ flexGrow: 1, maxWidth: 400 }}
              >
                {dev_form}
              </TreeView>
            </Box>
          </Box>
        </React.Fragment>
      );
  }
}
