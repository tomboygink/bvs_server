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

interface IProps {}

//Компонент формы приложения
@observer
export class AppForm extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  render(): React.ReactNode {
    
    if (APP_STORAGE.auth_form.getUser())
      return (
        <React.Fragment>
          <Box style={{ display: "flex" , justifyContent: 'flex-start' }}>
            <AppBarPanel />
            <Modal />
            <ModalLeftPanel />
            <Box sx={{ mt: "2%" }}></Box>
          </Box>
          <Box
            className="wrapper"
           sx={{ display: "flex", justifyContent: "flex-start" }}
          >
           <Box className="appform">
           <DevsGroups />
            </Box> 
            
              
            {APP_STORAGE.reg_user.getOpenTableUsers() === true &&
            <Box className="appform" sx= {{ borderRadius: '4px'}}>
            <TableUser/>
            </Box>
            } 
             
             <Box >
             <AdoutDevs/>
            </Box>
 
            {/* <Box className="appform">
              
            dsfdasydtrf
              </Box>  */}
          </Box>

        </React.Fragment>
      );
  }
}
