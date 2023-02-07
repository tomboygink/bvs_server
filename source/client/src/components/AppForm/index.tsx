import React from "react";
import { observer } from "mobx-react";

import { AppBarPanel } from "./AppBarPanel/AppBarPanel";
import { Modal } from "./AppBarPanel/TopMenu/Modal/Modal";
import { ModalLeftPanel } from "./AppBarPanel/LeftPanel/RegistationUsers/ModalLeftPanel";
import { Box, Alert, Typography } from "@mui/material";
import { APP_STORAGE } from "../../storage/AppStorage";
import { TableUser } from "../../components/AppForm/AppBarPanel/LeftPanel/EditUsers/TableUser";

import { DevsGroupsTree } from "./DevsGroups/DevsGroupsTree";
import { DevLocation } from "./DevsGroups/DevLocation";
import { ModalDevsGroup } from "./DevsGroups/ModalDevsGroup";
import {AddNewGroup} from './DevsGroups/AddNewGroup'
import { ModalDevs1 } from "./Devs/ModalDevs";
import { Devs } from "./Devs/Devs";
import { Sensors } from "./Sensors/Sensors";
import { ChangeDevsGroups } from "./DevsGroups/ChangeDevsGroups";
import { ChangeDevs } from "./Devs/ChangeDevs";

interface IProps {}

//Компонент формы приложения
@observer
export class AppForm extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  render(): React.ReactNode {
    let user_r = null;
    let user_w = null;
    var roles = null;
    if (APP_STORAGE.auth_form.getUser().roles_ids) {
      APP_STORAGE.devs_groups.setOrgId(APP_STORAGE.auth_form.getUser().org_id);
      APP_STORAGE.devs.setOrgId(APP_STORAGE.auth_form.getUser().org_id);
      roles = JSON.parse(
        JSON.stringify(APP_STORAGE.auth_form.getUser().roles_ids)
      );
      for (var key in roles) {
        if (roles.hasOwnProperty(key)) {
          let a = roles[key];
          user_r = a[0];
          user_w = a[1];
        }
      }
    }
    if (user_w === 2 && user_r === 1) {
      APP_STORAGE.devs.setUserRole(true);
    }
    if (user_r === 1 && !user_w) {
      APP_STORAGE.devs.setUserRole(false);
    }

    var middle_form: React.ReactNode = <></>;
    var left_form: React.ReactNode = <></>;
    var new_group : React.ReactNode = <></>;

    if (
      APP_STORAGE.devs_groups.getMiddleForm() === 1 ||
      APP_STORAGE.devs_groups.getMiddleForm() === ""
    ) {
      middle_form = <DevLocation />
      
      new_group =  <AddNewGroup  />

      left_form =  <DevsGroupsTree /> ;
      
    }
    if (APP_STORAGE.devs_groups.getMiddleForm() === 2) {
      middle_form = <Devs />;
      left_form =  <DevsGroupsTree /> ;
    }

    if (APP_STORAGE.devs_groups.getMiddleForm() === 3) {
      middle_form = <TableUser />; 
      left_form =  <></>;
    }
    // if(APP_STORAGE.devs_groups.getMiddleForm() === ''){
    //   middle_form = <AdoutDevs />
    // }

    if (APP_STORAGE.auth_form.getUser())
      return (
        <React.Fragment>
          <Box 
           style={{ display: "flex", justifyContent: "flex-start" }} 
         >
            <AppBarPanel />
            <Modal />
            <ModalLeftPanel />
            <ChangeDevs />
            <ModalDevsGroup />
            <ChangeDevsGroups />
            <ModalDevs1 />
           
          </Box>
          <Box className="is-grid">
  

    <Box className ="wrapper">
    <Box className="blocks">

    <Box className="block-wrapp">

    {left_form}

    </Box>

        <Box className="block-wrapp grid">
        {middle_form} 
        {new_group}      
        </Box>


        <Box className="block-wrapp">
        <Sensors /> 
        </Box>
    </Box>
</Box>



          </Box>
        </React.Fragment>
      );
  }
}
