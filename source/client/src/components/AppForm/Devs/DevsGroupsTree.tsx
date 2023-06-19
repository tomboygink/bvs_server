import React from "react";
import { toJS } from "mobx";

import { observer } from "mobx-react";

import { Box, Typography } from "@mui/material";
import { APP_STORAGE } from "../../../storage/AppStorage";

import TreeItem from "@mui/lab/TreeItem";

import TreeView from "@mui/lab/TreeView";

import { handleChange } from "./StyledMua"


import FolderIcon from "@mui/icons-material/Folder";

import { TDevsGroup } from "../../../storage/components/Devs/DevEntityes";
import { TDGroup } from "../../../storage/components/Devs/DevEntityes";
import { TDevice } from "../../../storage/components/Devs/DevEntityes";

import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import FolderZipIcon from '@mui/icons-material/FolderZip';



interface IProps {
  devs_tree: TDevsGroup;
  onSelect: (dev: TDevice) => void;
}

//Устройства
@observer
export class DevsGroupsTree extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  static defaultProps: IProps = {
    devs_tree: null,
    onSelect: (dev: TDevice) => {},
  };
  

  componentDidMount(): void {
    APP_STORAGE.devs_groups.get_DevsGroups("sess_id", APP_STORAGE.auth_form.getdt());}

  drawDeviceItem(dev: TDevice): React.ReactNode {


    if(APP_STORAGE.getRoleRead() === 1 && APP_STORAGE.getRoleWrite() === 2){
      if(dev.deleted === true){
        return (
          <React.Fragment key={"_dev_id_key_" + dev.id}>
            <TreeItem
              nodeId={"_dev_id_key_" + dev.id}
              label={dev.number}
              icon={<CrisisAlertIcon fontSize="small" sx={{color: '#808080'}}/>}
              sx={{ color: "#808080" }}></TreeItem>
          </React.Fragment>
        );
      }
      if(dev.deleted === false){
 
        if(dev.time === null){
          return (
            <React.Fragment key={"_dev_id_key_" + dev.id}>
              <TreeItem
                nodeId={"_dev_id_key_" + dev.id}
                label={dev.number}
                icon={<CrisisAlertIcon fontSize="small" sx={{color: '#EA4335'}}/>}
                sx={{ color: "#EA4335" }}></TreeItem>
            </React.Fragment>
          );
      }

      if (dev.time !== ''){
      //////----------------------------------Определяем сколько дней прошло с даты otherDate по nowDate
       let otherDate=new Date(dev.time);
       let nowDate= new Date();
       
       

       let delta=nowDate.getTime()-otherDate.getTime();
       
       var passedDay= Math.floor(delta/1000/60/60/24) ///////////////////( new Date( ( new Date() ).toDateString() ) - 86400000 ); // 24*60*60*1000
      
       if(passedDay === 0){
        return (
          <React.Fragment key={"_dev_id_key_" + dev.id}>
            <TreeItem
              nodeId={"_dev_id_key_" + dev.id}
              label={dev.number}
              icon={<CrisisAlertIcon fontSize="small" sx={{color: '#0FA958'}}/>}
              sx={{ color: "#002757" }}></TreeItem>
          </React.Fragment>
        );
    }
       if(passedDay <=3 ){
        return (
          <React.Fragment key={"_dev_id_key_" + dev.id}>
            <TreeItem
              nodeId={"_dev_id_key_" + dev.id}
              label={dev.number}
              icon={<CrisisAlertIcon fontSize="small" sx={{color: '#266BF1'}}/>}
              sx={{ color: "#002757" }}></TreeItem>
          </React.Fragment>
        );
       }

       if(passedDay >= 3 && passedDay <= 5){
        return (
          <React.Fragment key={"_dev_id_key_" + dev.id}>
            <TreeItem
              nodeId={"_dev_id_key_" + dev.id}
              label={dev.number}
              icon={<CrisisAlertIcon fontSize="small" sx={{color: '#FFEF02'}}/>}
              sx={{ color: "#002757" }}></TreeItem>
          </React.Fragment>
        );
       }

       if(passedDay > 5 && passedDay <= 15){
        return (
          <React.Fragment key={"_dev_id_key_" + dev.id}>
            <TreeItem
              nodeId={"_dev_id_key_" + dev.id}
              label={dev.number}
              icon={<CrisisAlertIcon fontSize="small" sx={{color: '#FD8A04'}}/>}
              sx={{ color: "#002757" }}></TreeItem>
          </React.Fragment>
        );
       }

       if(passedDay >= 15 && passedDay<=29 ){
        return (
          <React.Fragment key={"_dev_id_key_" + dev.id}>
            <TreeItem
              nodeId={"_dev_id_key_" + dev.id}
              label={dev.number}
              icon={<CrisisAlertIcon fontSize="small" sx={{color: '#EB4C42'}}/>}
              sx={{ color: "#002757" }}></TreeItem>
          </React.Fragment>
        );
       }

       if(passedDay>=30){
        return (
          <React.Fragment key={"_dev_id_key_" + dev.id}>
            <TreeItem
              nodeId={"_dev_id_key_" + dev.id}
              label={dev.number}
              icon={<CrisisAlertIcon fontSize="small" sx={{color: '#EB4C42'}}/>}
              sx={{ color: "#002757" }}></TreeItem>
          </React.Fragment>
        );
       }
      }
      }
    }




    if(APP_STORAGE.getRoleRead() === 1 && !APP_STORAGE.getRoleWrite() && dev.deleted === false){

      if(dev.time === null){
        return (
          <React.Fragment key={"_dev_id_key_" + dev.id}>
            <TreeItem
              nodeId={"_dev_id_key_" + dev.id}
              label={dev.number}
              icon={<CrisisAlertIcon fontSize="small" sx={{color: '#EA4335'}}/>}
              sx={{ color: "#EA4335" }}></TreeItem>
          </React.Fragment>
        );
    }

    if (dev.time !== ''){
    //////----------------------------------Определяем сколько дней прошло с даты otherDate по nowDate
     let otherDate=new Date(dev.time);
     let nowDate= new Date();
     let delta=nowDate.getTime()-otherDate.getTime();
     
     var passedDay= Math.floor(delta/1000/60/60/24) ;///////////////////( new Date( ( new Date() ).toDateString() ) - 86400000 ); // 24*60*60*1000
  
    
     if(passedDay === 0){
      return (
        <React.Fragment key={"_dev_id_key_" + dev.id}>
          <TreeItem
            nodeId={"_dev_id_key_" + dev.id}
            label={dev.number}
            icon={<CrisisAlertIcon fontSize="small" sx={{color: '#0FA958'}}/>}
            sx={{ color: "#002757" }}></TreeItem>
        </React.Fragment>
      );
  }
     if(passedDay <=3 ){
      return (
        <React.Fragment key={"_dev_id_key_" + dev.id}>
          <TreeItem
            nodeId={"_dev_id_key_" + dev.id}
            label={dev.number}
            icon={<CrisisAlertIcon fontSize="small" sx={{color: '#266BF1'}}/>}
            sx={{ color: "#002757" }}></TreeItem>
        </React.Fragment>
      );
     }

     if(passedDay >= 3 && passedDay <= 5){
      return (
        <React.Fragment key={"_dev_id_key_" + dev.id}>
          <TreeItem
            nodeId={"_dev_id_key_" + dev.id}
            label={dev.number}
            icon={<CrisisAlertIcon fontSize="small" sx={{color: '#FFEF02'}}/>}
            sx={{ color: "#002757" }}></TreeItem>
        </React.Fragment>
      );
     }

     if(passedDay > 5 && passedDay <= 15){
      return (
        <React.Fragment key={"_dev_id_key_" + dev.id}>
          <TreeItem
            nodeId={"_dev_id_key_" + dev.id}
            label={dev.number}
            icon={<CrisisAlertIcon fontSize="small" sx={{color: '#FD8A04'}}/>}
            sx={{ color: "#002757" }}></TreeItem>
        </React.Fragment>
      );
     }

     if(passedDay >= 15 && passedDay<=29 ){
      return (
        <React.Fragment key={"_dev_id_key_" + dev.id}>
          <TreeItem
            nodeId={"_dev_id_key_" + dev.id}
            label={dev.number}
            icon={<CrisisAlertIcon fontSize="small" sx={{color: '#EB4C42'}}/>}
            sx={{ color: "#002757" }}></TreeItem>
        </React.Fragment>
      );
     }

     if(passedDay>=30){
      return (
        <React.Fragment key={"_dev_id_key_" + dev.id}>
          <TreeItem
            nodeId={"_dev_id_key_" + dev.id}
            label={dev.number}
            icon={<CrisisAlertIcon fontSize="small" sx={{color: '#EB4C42'}}/>}
            sx={{ color: "#002757" }}></TreeItem>
        </React.Fragment>
      );
     }
    }
    }
  }

  drawDevGroup(dgrs: any): React.ReactNode[] {
    var parent: React.ReactNode[] = new Array();
    for (var ii in dgrs) {
      var dgr: TDevsGroup = dgrs[ii];
      var gr: TDGroup = dgr.group;
      var gr_childs = dgr.childs;  
      var gr_devs = dgr.devs;
    
      var childs: React.ReactNode[] = new Array();
      if (gr_childs.length > 0) childs = this.drawDevGroup(gr_childs);

      if (gr_devs.length > 0) {
        for (var dii in gr_devs) childs.push(this.drawDeviceItem(gr_devs[dii]));
      }

      var icon = <FolderIcon fontSize="small" sx={{ color: "#FFE2C0"}} />;
      if (gr_childs.length > 0) icon = <FolderZipIcon fontSize="small" sx ={{color: '#FFAD4E'}}/>;
      if (gr_devs.length > 0) icon = <FolderIcon fontSize="small" sx={{ color: "#FFE2C0" }} />;
      if (gr_childs.length > 0 && gr_devs.length > 0)
        icon = <FolderIcon fontSize="small" sx={{ color: "#FFE2C0" }} />;
       
      if(Number(gr.org_id) === Number(APP_STORAGE.getIdOrgUser()) 
      && APP_STORAGE.getRoleRead() === 1 && !APP_STORAGE.getRoleWrite() && gr.deleted === false ) { 
        ////// Условие для пользователя с правами "только чтение"
        parent.push(
          <React.Fragment key={"_gr_id_key_" + gr.id}>
            <Box sx={{ display: "flex" }}>
              <TreeItem
                nodeId={String(gr.id)}
                label={gr.g_name}
                icon={icon}
                sx={{ color: "#222", borderLeft: '1px solid #c1c1c1' }}>
                {childs}
              </TreeItem>
            </Box>
          </React.Fragment>
        );
      }

      if(APP_STORAGE.getRoleRead() === 1 && APP_STORAGE.getRoleWrite() === 2) 
      { ////// Условие для пользователя с правами администратора

        if(gr.deleted === false){
          parent.push(
            <React.Fragment key={"_gr_id_key_" + gr.id}>
              <Box sx={{ display: "flex" }}>
                <TreeItem
                  nodeId={String(gr.id)}
                  label={gr.g_name}
                  icon={icon}
                  sx={{ color: "#222", borderLeft: '1px solid #c1c1c1' ,  fontSize: '14px'}} 
                >
                  {childs}
                </TreeItem>
              </Box>
            </React.Fragment>
          );
        }

        else {
          parent.push(
            <React.Fragment key={"_gr_id_key_" + gr.id}>
              <Box sx={{ display: "flex" }}>
                <TreeItem
                  nodeId={String(gr.id)}
                  label={gr.g_name}
                  icon= {<FolderIcon fontSize="small" sx={{ color: "#808080"}} />}
                  sx={{ color: "#808080", borderLeft: '1px solid #c1c1c1',  fontSize: '14px' }} >
                  {childs}
                </TreeItem>
              </Box>
            </React.Fragment>
          );
        }
      }
    }
    return parent;
  }

  drawDevsTree(): React.ReactNode { ////////////////////////////// Функция отрисовки дерева 
    let DevGr:any;
    DevGr = APP_STORAGE.devs_groups.getDevsGroups();

    return this.drawDevGroup(DevGr);
  }

  render(): React.ReactNode {
    return (
      <React.Fragment>
        <div id = 'wrapper-devgr-tree'> 
          <Typography sx={{ fontWeight: "500" , color: '#111111', mb : '8px'}}>Список устройств</Typography>  
          <Box
           sx={{
              background: "#fff",
              p :'20px',
              borderRadius: '4px'
            }}
          >
            <TreeView
              className="wrapper_treeviw"
              onNodeSelect={handleChange}
              aria-label="customized"
              sx={{ flexGrow: 1, maxWidth: 400,overflow: 'auto'}}>
              {this.drawDevsTree()}
            </TreeView>
          </Box>
        </div>
     
      </React.Fragment>
    );
  }
}