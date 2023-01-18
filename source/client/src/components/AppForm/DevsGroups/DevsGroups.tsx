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

import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import { color } from "@mui/system";

import {WorkingWithDev} from './WorkingWithDev'

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

  async Treeitems(e: any) {
    let number = Number(e);
    APP_STORAGE.devs.setIdDevs(e);
    APP_STORAGE.devs.setParent1(number)
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

  async setIdDev(e:any){
    alert(e)
    APP_STORAGE.devs.setIdDev(e)
  }

  render(): React.ReactNode {
  
    ///////////////////////////////////////////////////// Получаем список групп устройств
    let devs_g = [];
    let parent = [];


    if (APP_STORAGE.devs_groups.getDevsGroups()) {
      devs_g = JSON.parse(
        JSON.stringify(APP_STORAGE.devs_groups.getDevsGroups())
      );

      for (var key in devs_g) {
        if (devs_g.hasOwnProperty(key)) {
          let a = devs_g[key];
          let b = JSON.parse(a)
          console.log('group_devs', b);

          for (let i=0; i < b.childs.length; i++){
          console.log('parent ',b.childs[i].group);
          parent.push(   
          <TreeItem  onClick={() => {this.Treeitems(b.childs[i].group.id); }}  
          key= {b.childs[i].group.id}
          nodeId={b.childs[i].group.id}
          label= {b.childs[i].group.g_name}
        >
        </TreeItem>)
      
          console.log('child ',b.childs[i].childs);
            
          }
          

        }
      }
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
            }}
          >
            <Typography sx={{ fontWeight: "500", pb: "20px" }}>
              Список групп устройств
            </Typography>
            <Box
              sx={{
                width: "290px",
                borderRadius: "4px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                background: '#fff'
              }}
            >
               <TreeView
                aria-label="customized"
                defaultExpanded={["1"]}
                defaultCollapseIcon={<MinusSquare />}
                defaultExpandIcon={<FolderOpenIcon />}
                defaultEndIcon={<FolderOpenIcon />}
                sx={{ flexGrow: 1, maxWidth: 400, p: '25px' }}>
                {parent}
              </TreeView>
              <Box sx ={{background: '#d5e3fda6', height: '80vh', borderTopRightRadius: '48px', p: '25px'}}>
              <WorkingWithDev/>
              </Box>
              
            </Box>
          </Box>
        </React.Fragment>
      );
  }
}
