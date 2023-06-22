import React from "react";
import { observer } from "mobx-react";
import { Box, Button, Typography } from "@mui/material";
import { APP_STORAGE } from "../../storage/AppStorage"; //////Хранилище данных

import { AppBarPanel } from "./AppBarPanel/AppBarPanel";
import { Modal } from "./AppBarPanel/TopMenu/Modal/Modal"; //// Модальное окно для изменения данных пользователя
import { ModalLeftPanel } from "./AppBarPanel/LeftPanel/RegistationUsers/ModalLeftPanel";
import { NewDevPovs } from "./Devs/Dev/Menu/NewDevPovs"

import { TableUser } from "../../components/AppForm/AppBarPanel/LeftPanel/EditUsers/TableUser"; /////////////Таблица пользователей
import { UsersMenu } from "./User/UsersMenu"; //////////////////////////// устройства
import { Users } from "./User/Users";

import { OrgsMenu } from "./Оrgs/OrgsMenu";
import { Orgs } from "./Оrgs/Оrgs";

import { JobsTitlesMenu } from "./JobsTitles/JobsTitlesMenu";
import { JobsTitles } from "./JobsTitles/JobsTitles";



import { DevLocation } from "./Devs/DevsGroups/DevLocation"; ////////расположение устройств
import { ChangeDevsGroups } from "./Devs/DevsGroups/Menu/ChangeDevsGroups"; /////// Редактировать расположение5 устройств (модальное окно)
import { MoveDevsGroups } from "./Devs/DevsGroups/Menu/MoveDevsGroups"; ////////////Переместить расположение устройств (модальное окно)
import { AddNewGroup } from "./Devs/DevsGroups/Menu/AddNewGroup"; ////////// Добавить новое расположение
import { AddNewSubgroup } from "./Devs/DevsGroups/Menu/AddNewSubgroup"; //////////Добавить новую подгруппу

import { Devs } from "./Devs/Dev/Devs"; //////////////////////////// устройства
import { SensorsList } from "./Sensors/SensorsList"; ///////////////////////////////сенсоры на устройствах
import { ChangeDevsModal } from "./Devs/Dev/Menu/ChangeDevsModal"; ////////////////////////////Редактировать устройства
import { AddNewDevModal } from "./Devs/Dev/Menu/AddNewDevModal"; //////////////Добавить новое устройство
import { Calendar } from "./Devs/Dev/Calendar";
import { SelectedSession } from "./Devs/Dev/SelectedSession";
import { DevsGroupsTree } from "./Devs/DevsGroupsTree";

interface IProps { }

//Компонент формы приложения
@observer
export class AppForm extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

 async BackToTopButton(){}

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
    var dev_sess: React.ReactNode = <></>;
    var left_form: React.ReactNode = <></>;
    var new_group: React.ReactNode = <></>;
    var right_form: React.ReactNode = <></>;

    if (
      APP_STORAGE.devs_groups.getMiddleForm() === 1 ||
      APP_STORAGE.devs_groups.getMiddleForm() === ""
    ) {
      middle_form = <DevLocation />;
      new_group = <AddNewGroup />;
      left_form = <DevsGroupsTree />;
    }

    if (APP_STORAGE.devs_groups.getMiddleForm() === 2) {
      middle_form = (
        <>
          <Devs />
          <SelectedSession />
        </>
      );
      //dev_sess = <DevSess/>
      left_form = <DevsGroupsTree />;
    }

    if (APP_STORAGE.devs_groups.getMiddleForm() === 3) {
      ///middle_form = <TableUser />;
      middle_form = <Users />;
      left_form = <UsersMenu />;
    }

    if (APP_STORAGE.devs_groups.getMiddleForm() === 5) {
      middle_form = <Orgs />;
      left_form = <OrgsMenu />;
    }

    if (APP_STORAGE.devs_groups.getMiddleForm() === 6) {
      middle_form = <JobsTitles />;
      left_form = <JobsTitlesMenu />;
    }


    right_form = <SensorsList />;


    if (APP_STORAGE.auth_form.getUser())
      return (
        <React.Fragment>
          <Box style={{ display: "flex", justifyContent: "flex-start" }}>
            <AppBarPanel />
            <Modal />
            <ModalLeftPanel />
            <ChangeDevsModal />{" "}
            <NewDevPovs />
            {/*-------------------------Модальное окно - редактировать уствройство */}
            <AddNewSubgroup />
            <ChangeDevsGroups />
            <MoveDevsGroups />
            <AddNewDevModal />{" "}
            {/*-------------------------Модальное окно - добавить устройство */}
          </Box>
          <Box className="is-grid">
            <Box className="wrapper">
              <Box className="blocks">
                <Box className="block-wrapp" id='left-form'> {left_form} </Box>

                <Box className="block-wrapp grid">
                  {middle_form}

                  {new_group}
                </Box>

                <Box className="block-wrapp" id='right-form'>{right_form}</Box>
              </Box>
            </Box>
           
          </Box>

          <Button className="button-back-to-up"
          onClick={() => {
            this.BackToTopButton()
          }}
          >Back to top</Button>
        </React.Fragment>
      );
  }
}
