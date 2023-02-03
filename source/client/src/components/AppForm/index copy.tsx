import React from "react";
import { observer } from "mobx-react";

import { AppBarPanel } from "./AppBarPanel/AppBarPanel";
import { Modal } from "./AppBarPanel/TopMenu/Modal/Modal";
import { ModalLeftPanel } from "./AppBarPanel/LeftPanel/RegistationUsers/ModalLeftPanel";
import { Box, Alert, Typography } from "@mui/material";
import { APP_STORAGE } from "../../storage/AppStorage";
import {TableUser} from '../../components/AppForm/AppBarPanel/LeftPanel/EditUsers/TableUser';

import {DevsGroupsTree} from './DevsGroups/DevsGroupsTree';
import {AdoutDevs} from './DevsGroups/AdoutDevs'
import {DevLocation} from './DevsGroups/DevLocation'
import {ModalDevsGroup} from './DevsGroups/ModalDevsGroup';
import {ModalDevs1} from './Devs/ModalDevs'
import {Devs}  from './Devs/Devs';
import {Sensors} from './Sensors/Sensors'
import {ChangeDevsGroups} from './DevsGroups/ChangeDevsGroups'
import {ChangeDevs} from './Devs/ChangeDevs'

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
      APP_STORAGE.devs.setUserRole(true)
     }
     if (user_r === 1 && !user_w) { 
      APP_STORAGE.devs.setUserRole(false)
     }

   

    var middle_form:React.ReactNode = <></>;

    if(APP_STORAGE.devs_groups.getMiddleForm() === 1 || APP_STORAGE.devs_groups.getMiddleForm() ===  ''){
      middle_form = <DevLocation />
    }
      if(APP_STORAGE.devs_groups.getMiddleForm() === 2){
      middle_form = <Devs />
    }
    // if(APP_STORAGE.devs_groups.getMiddleForm() === ''){
    //   middle_form = <AdoutDevs />
    // }


    
    if (APP_STORAGE.auth_form.getUser())
      return (
        <React.Fragment>
          <Box style={{ display: "flex" , justifyContent: 'flex-start' }}>
            <AppBarPanel />
            <Modal />
            <ModalLeftPanel />
            <ChangeDevs />
            <ModalDevsGroup />
            <ChangeDevsGroups />
            <ModalDevs1 />
            <Box sx={{ mt: "2%" }}></Box>
          </Box>
          <Box
            className="wrapper"
           sx={{ display: "flex", justifyContent: "space-between"}}
          >
           <Box className="appform">
           <DevsGroupsTree />


           {/* <WorkingWithDev /> */}
            </Box> 
            
              
            {APP_STORAGE.reg_user.getOpenTableUsers() === true &&
            <Box className="appform" sx= {{ borderRadius: '4px'}}>
            <TableUser/>
            </Box>
            } 
             
             <Box>
              {middle_form}
            </Box>
 
                 <Box className="appform">
                <Sensors/>
              </Box>  
          </Box>

        </React.Fragment>
      );
  }
}