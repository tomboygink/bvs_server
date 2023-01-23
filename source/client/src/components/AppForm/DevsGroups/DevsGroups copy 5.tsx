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

import {TDevsGroup} from '../../../storage/components/DevEntityes';
import {TDGroup} from '../../../storage/components/DevEntityes';
import {TDevice} from '../../../storage/components/DevEntityes'

interface IProps {
    devs_tree: TDevsGroup,
    onSelect: (dev:TDevice)=>void
}

//Устройства
@observer
export class DevsGroups extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  static defaultProps:IProps = {
    devs_tree: null,
    onSelect: (dev:TDevice)=>{}
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

  drawDeviceItem(dev:TDevice):React.ReactNode{
    return (
        <React.Fragment key={'_dev_id_key_'+dev.id}>
            <TreeItem nodeId={'_dev_id_'+dev.id} label={dev.name} icon={<SensorsIcon/>} onClick={ ()=>{ this.props.onSelect(dev); } } sx={{color:'#000088'}}></TreeItem>
        </React.Fragment>
    );
}




  drawDevGroup(dgrs:TDevsGroup[]):React.ReactNode[]{
    console.log('Новая строка',dgrs) 
    var reti:React.ReactNode[] = new Array();
   

    for (var key in dgrs) {
      if (dgrs.hasOwnProperty(key)) {
        for(var ii in dgrs){
          var dgr:TDevsGroup = dgrs[ii];
          var gr:TDGroup = dgr.group;
          var gr_childs = dgr.childs;
          var gr_devs = dgr.devs;

          // var childs:React.ReactNode[] = new Array();
          // if(gr_childs.length>0) childs = this.drawDevGroup(gr_childs);

          // if(gr_devs.length>0){
          //     for(var dii in gr_devs) childs.push(this.drawDeviceItem(gr_devs[dii]));
          // }

          // var g_icon = <FolderIcon/>;
          // if(gr_childs.length>0) g_icon = < FolderIcon sx = {{color: '#FFE2C0'}} />;
          // if(gr_devs.length>0) g_icon = <FolderOpenIcon type ='filed'/>;
          // if(gr_childs.length>0 && gr_devs.length>0)  g_icon = <FolderOpenIcon type ='filed'/>;

          reti.push(
              <React.Fragment key={'_gr_id_key_'+gr.id}>

                  <TreeItem onClick={() => {this.Treeitems(gr.id); }} nodeId={'_gr_id_'+gr.id} label={gr.g_name}  sx={{color:'#222'}}>
                  
                  </TreeItem>
                  
              </React.Fragment>
          );
      }
      }}
      alert('hi')
    return reti;
}

  drawDevsTree():React.ReactNode{
    let devs_g = [];
    let root = [];
    let DevGr = [];

    if(Object.keys(JSON.parse(JSON.stringify(APP_STORAGE.devs_groups.getDevsGroups()))).length !== 0 
        && JSON.parse(JSON.stringify(APP_STORAGE.devs_groups.getDevsGroups())).constructor === Object){
      devs_g = JSON.parse(JSON.stringify(APP_STORAGE.devs_groups.getDevsGroups()))
    }
   
    
    for (var key in devs_g) {
      if (devs_g.hasOwnProperty(key)) {
        let a = devs_g[key];
        let root = JSON.parse(a)

        if(root.childs.length > 0) {
          for (let i=0; i < root.childs.length; i++){
          console.log('111112123214',root.childs[i]);
          DevGr.push(root.childs[i]);
          }
        }
        console.log('DevGr', DevGr)
      }
      
    }

    return this.drawDevGroup(DevGr);

   }



  render(): React.ReactNode {


    console.log("getGevs", APP_STORAGE.devs_groups.getDevsGroups())
  
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
    {this.drawDevsTree()}
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
