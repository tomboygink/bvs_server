import React from "react";
import { observer } from "mobx-react";

import { AppBarPanel } from "./AppBarPanel/AppBarPanel";
import { Modal } from "./AppBarPanel/TopMenu/Modal/Modal";
import { ModalLeftPanel } from "./AppBarPanel/LeftPanel/RegistationUsers/ModalLeftPanel";
import { Box, Alert, Typography } from "@mui/material";
import { APP_STORAGE } from "../../storage/AppStorage";
import {TableUser} from '../../components/AppForm/AppBarPanel/LeftPanel/EditUsers/TableUser';

import {DevsGroups} from './Devs/DevsGroups';
import {AdoutDevs} from './Devs/AdoutDevs'
import {WorkingWithDev} from './Devs/WorkingWithDev'
import {DevLocation} from './Devs/DevLocation'
import {ModalDevs} from './Devs/ModalDevs'

interface IProps {}

//Компонент формы приложения
@observer
export class AppForm extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  render(): React.ReactNode {
    var middle_form:React.ReactNode = <></>;

    if(APP_STORAGE.devs_groups.getMiddleForm() === 1){
      middle_form = <DevLocation />
    }
    if(APP_STORAGE.devs_groups.getMiddleForm() === ''){
      middle_form = <AdoutDevs />
    }


    
    if (APP_STORAGE.auth_form.getUser())
      return (
        <React.Fragment>
          <Box style={{ display: "flex" , justifyContent: 'flex-start' }}>
            <AppBarPanel />
            <Modal />
            <ModalLeftPanel />
            <ModalDevs />
            <Box sx={{ mt: "2%" }}></Box>
          </Box>
          <Box
            className="wrapper"
           sx={{ display: "flex", justifyContent: "flex-start" }}
          >
           <Box className="appform">
           <DevsGroups />
           <WorkingWithDev />
            </Box> 
            
              
            {APP_STORAGE.reg_user.getOpenTableUsers() === true &&
            <Box className="appform" sx= {{ borderRadius: '4px'}}>
            <TableUser/>
            </Box>
            } 
             
             <Box >
            
              {middle_form}

            </Box>
 
            {/* <Box className="appform">
              
            dsfdasydtrf
              </Box>  */}
          </Box>

        </React.Fragment>
      );
  }
}
