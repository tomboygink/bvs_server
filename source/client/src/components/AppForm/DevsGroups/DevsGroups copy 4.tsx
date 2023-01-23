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

import {WorkingWithDev} from './WorkingWithDev';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FolderIcon from '@mui/icons-material/Folder';

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
    alert(e)
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
    let defaultExpanded = []


    if (APP_STORAGE.devs_groups.getDevsGroups()) 
     {devs_g = JSON.parse(JSON.stringify(APP_STORAGE.devs_groups.getDevsGroups()));

      for (var key in devs_g) {
        if (devs_g.hasOwnProperty(key)) {
          let a = devs_g[key];
          let root = JSON.parse(a)
          console.log('group_devs', root);

      if(root.childs.length> 0){
          for (let i=0; i < root.childs.length; i++){
            
          
          
          
          parent.push(  
            <> 
          <TreeItem   onClick={() => {this.Treeitems(root.childs[i].group.id); }}  
          key= {'qww' + root.childs[i].group.id}
          nodeId={'q1w' + root.childs[i].group.id}
          label= {root.childs[i].group.g_name}
          
        >    

{root.childs[i].devs.map((row : any, i : any) => ( 
           <TreeItem  sx={{borderLeft: '1px solid #266BF1', ml: '14px'}}  onClick={() => {this.Treeitems(row.group.id); }} 
           icon={<CrisisAlertIcon  sx = {{color: '#75A4FF'}}/>}
           key= {'qw' + row.id}
           nodeId={row.id}
           label= {row.name}>                     
         </TreeItem>
    
          ))}

         {root.childs[i].childs.map((row : any, i : any) => (
       <TreeItem  sx={{color: '#000',  borderLeft: '1px solid #FD8A04'}}  onClick={() => {this.Treeitems(row.group.id); }} 
       key= {'qw' + row.group.id}
       nodeId={row.group.id}
       label= {row.group.g_name}>

                              {root.childs[i].childs.map((cell:any, i:any) =>
                                 cell.devs.map((cell:any, i:any) => 
                                 <TreeItem  sx={{borderLeft: '1px solid #266BF1', ml: '14px'}}  onClick={() => {this.Treeitems(cell.group.id); }} 
                                 icon={<CrisisAlertIcon  sx = {{color: '#75A4FF'}}/>}
                                 key= {'qw' + cell.id}
                                 nodeId={cell.id}
                                 label= {cell.name}>                     
                               </TreeItem>
                                 )
                             )}  
                            
     </TreeItem>

      ))}
        </TreeItem>
             </> 
        )}}

        else{
          parent.push(
            <Box sx={{ flexGrow: 1, maxWidth: 400, p: '8px', background: '#FFD4D4', borderRadius: '4px', color: '#FF4848' }}>
             <Typography>Список групп устройств пуст!</Typography> 
            </Box>
          )
               
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
                defaultExpanded={["1", "2", "3", '4' ]}
                aria-label="customized"
                defaultCollapseIcon={<FolderIcon sx = {{color: '#FFE2C0'}}  />}
                defaultExpandIcon={<FolderOpenIcon type ='filed'/>}
                defaultEndIcon={<FolderIcon sx = {{color: '#FFE2C0'}} />}
                sx={{ flexGrow: 1, maxWidth: 400, p: '25px' }}>
                {parent}
              </TreeView>
               
              <Box sx ={{background: '#d5e3fda6', height: '80vh', borderTopRightRadius: '48px', p: '25px',}}>
              <WorkingWithDev/>
              </Box>
            </Box>
          </Box>
        </React.Fragment>
      );
  }
}
