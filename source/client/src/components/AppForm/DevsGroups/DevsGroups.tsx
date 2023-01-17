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

  async Treeitems(e: any, a: number) {
    let number = Number(a);
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
    APP_STORAGE.devs.setIdDev(e)
  }

  render(): React.ReactNode {
    let devs1 = [];
    let devs2 = [];
    let devs_form = [];
    let devs_form1212 = [];


    ////////////////////////////// Получаем список устройств
    if (APP_STORAGE.devs.getDevs() &&  APP_STORAGE.devs.getParent() !== 0) {
      devs2 = JSON.parse(JSON.stringify(APP_STORAGE.devs.getDevs()));
      for (var key in devs2) {
        if (devs2.hasOwnProperty(key)) {
          let a = devs2[key];
         if (APP_STORAGE.devs.getIdChild() === a.group_dev_id) {
          devs_form.push(
            <TreeItem  onClick={() => {this.setIdDev(a.id); }} sx = {{color : '#1976D2'}}  
            icon={<CrisisAlertIcon />}
            key= {a.id}
            nodeId={a.name}
            label= {a.name}>
          </TreeItem>
           )
         }
        }
      };
    }

  if (APP_STORAGE.devs.getParent1() === 0 ) {
      devs1 = JSON.parse(JSON.stringify(APP_STORAGE.devs.getDevs()));

      for (var key in devs1) {
        if (devs1.hasOwnProperty(key)) {
          let a = devs1[key];
          if (APP_STORAGE.devs.getIdDevs() === a.group_dev_id) {
         devs_form1212.push(
          <TreeItem  onClick={() => {this.setIdDev(a.id); }} 
          sx = {{color : '#1976D2'}} 
          icon={<CrisisAlertIcon />}
          key= {a.id}
          nodeId={a.name}
          label= {a.name}
        >
        </TreeItem>
        )
          }
        }
      };
    }



    ///////////////////////////////////////////////////// Получаем список групп устройств

    let devs = [];
    let dev_form = [];
    let dev_item = [];
    let id = [];
    let parent_id = [];

    let filterB = [];

    let child = [];

    let uniqueChars: any = [];


    if (APP_STORAGE.devs_groups.getDevsGroups()) {
      devs = JSON.parse(
        JSON.stringify(APP_STORAGE.devs_groups.getDevsGroups())
      );
      dev_item = JSON.parse(
        JSON.stringify(APP_STORAGE.devs_groups.getDevsGroups())
      );

      for (var key in devs) {
        if (devs.hasOwnProperty(key)) {
          let a = devs[key];

          for (var i in dev_item) {
            if (dev_item.hasOwnProperty(i)) {
              let b = dev_item[i];

              if (b.parent_id === a.id) {
                filterB.push(b.parent_id);
               
               
                if (APP_STORAGE.devs.getIdDevs() === a.id) {
                  id = b.parent_id;
                  child.push(
                    <>
                    <TreeItem onClick={() => {this.TreeSensors( b.id, b.parent_id); }}
                      key={b.number}
                      nodeId={b.id}
                      label={b.id}
                    >
                      {devs_form}
                    </TreeItem></>
             
                  );
                }
              }
            }
          }

          if (id !== "" && a.id === id) {
            dev_form.push(
              <TreeItem sx ={{fontWeight: '700'}}
                onClick={() => {
                  this.Treeitems(a.id, a.parent_id);
                }}
                key={a.id}
                nodeId={a.id}
                label={a.g_name}
              >
                {devs_form1212}
                {child}
              </TreeItem>
            );
          }

          if (a.id !== id && a.parent_id < 1) {
            dev_form.push(
              <TreeItem sx ={{fontWeight: '700'}}
                onClick={() => {
                  this.Treeitems(a.id, a.parent_id);
                }}
                key={a.id}
                nodeId={a.id}
                label={a.g_name}></TreeItem>
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
                {dev_form}
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
