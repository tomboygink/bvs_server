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
    let child = [];
    let tree = [];

    let array = [];

    let dev = [];

    let devs = [];
    


    if (APP_STORAGE.devs_groups.getDevsGroups()) 
            {devs_g = JSON.parse(JSON.stringify(APP_STORAGE.devs_groups.getDevsGroups()));

      for (var key in devs_g) {
        if (devs_g.hasOwnProperty(key)) {
          let a = devs_g[key];
          let b = JSON.parse(a)
          console.log('group_devs', b);

          for (let i=0; i < b.childs.length; i++){
          
            devs.push(b.childs[i].devs);

            console.log('devs', devs)
          parent.push(  
            <> 
          <TreeItem  id={b.childs[i].group.id} onClick={() => {this.Treeitems(b.childs[i].group.id); }}  
          key= {b.childs[i].group.id}
          nodeId={b.childs[i].group.id}
          label= {b.childs[i].group.g_name}
          sx={{color: '#266BF1'}}
        >
         {b.childs[i].childs.map((row : any, i : any) => (
          
      //  console.log(row.group.g_name,"i");
       <TreeItem  sx={{color: '#000'}}  
       key= {row.group.id}
       nodeId={row.group.id}
       label= {row.group.g_name}>
                               
                               {Array(10).map((cell, i) => <td key={i}>&nbsp;</td>)}

     </TreeItem>

      ))}
        </TreeItem>
             </> 
        )













          if (b.childs[i].childs.length){
             for (let a = 0; a<b.childs[i].childs.length ; a ++){
                if (APP_STORAGE.devs.getIdDevs() === b.childs[i].childs[a].group.parent_id){
                 child.push(
                    <TreeItem    
                    key= {b.childs[i].childs[a].group.id}
                    nodeId={b.childs[i].childs[a].group.id}
                    label= {b.childs[i].childs[a].group.g_name}>
                      {dev}
                  </TreeItem>
                  )
                  console.log('b.childs[i].childs', b.childs[i].childs[a].group)
                }
                if(b.childs[i].devs){ 
                  dev.push(
                    <TreeItem   sx = {{color : '#1976D2'}}
                    icon={<CrisisAlertIcon />}  
                    key= {b.childs[i].devs.id}
                    nodeId={b.childs[i].devs.number}
                    label= {b.childs[i].devs.name}
                     >
                  </TreeItem>
                  )
                }
              // if(b.childs[i].devs){
              //   for (let a = 0; a<b.childs[i].childs.length ; a ++){

              //   }  
              // }
             
             }
          }



        //   if (b.childs[i].devs.length){
        //     for (let a = 0; a<b.childs[i].devs.length ; a ++){
            
        //     /// console.log('b.childs[i].devs.length',b.childs[i].devs.length)       
        //     }
        //  }
       // console.log('b.childs[i].childs.devs',b.childs[i].childs[a].devs)
 
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
                defaultExpanded={["1", "2", "3" ]}
                aria-label="customized"
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
