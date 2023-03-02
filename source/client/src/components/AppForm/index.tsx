import React from "react";
import { observer } from "mobx-react";
import { Box} from "@mui/material";
import { APP_STORAGE } from "../../storage/AppStorage"; //////Хранилище данных

import { AppBarPanel } from "./AppBarPanel/AppBarPanel"; 
import { Modal } from "./AppBarPanel/TopMenu/Modal/Modal"; //// Модальное окно для изменения данных пользователя 
import { ModalLeftPanel } from "./AppBarPanel/LeftPanel/RegistationUsers/ModalLeftPanel";


import { TableUser } from "../../components/AppForm/AppBarPanel/LeftPanel/EditUsers/TableUser";/////////////Таблица пользователей

import { DevsGroupsTree } from "./DevsGroups/DevsGroupsTree"; /////////////////Дерево устройств (левое боковое меню)
import { DevLocation } from "./DevsGroups/DevLocation"; ////////расположение устройств
import { ChangeDevsGroups } from "./DevsGroups/ChangeDevsGroups";/////// Редактировать расположение5 устройств (модальное окно)
import { MoveDevsGroups } from "./DevsGroups/MoveDevsGroups";////////////Переместить расположение устройств (модальное окно)
import { AddNewGroup } from "./DevsGroups/AddNewGroup"; ////////// Добавить новое расположение
import { AddNewSubgroup } from "./DevsGroups/AddNewSubgroup";//////////Добавить новую подгруппу


import { Devs } from "./Devs/Devs";//////////////////////////// устройства
import { DevSess } from './Devs/DevSess'
import { Sensors } from "./Sensors/Sensors"; ///////////////////////////////сенсоры на устройствах
import { DevSessList } from "./Sensors/DevSessList"
import { ChangeDevsModal } from "./Devs/ChangeDevsModal";////////////////////////////Редактировать устройства
import { AddNewDevModal } from "./Devs/AddNewDevModal"; //////////////Добавить новое устройство


 
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
      middle_form =  <>
      <Devs />
      <DevSess/>
      </>
      dev_sess = <DevSess/>
      left_form = <DevsGroupsTree />;
    }

    if (APP_STORAGE.devs_groups.getMiddleForm() === 3) {
      middle_form = <TableUser />;
      left_form = <></>;
    }

    // if(APP_STORAGE.sensors.getOpenDevsess() === true && APP_STORAGE.sensors.getIdDevSess() !==''){
    //   right_form = <DevSessList/>
    // }

    // if(APP_STORAGE.sensors.getOpenDevsess() === false ){
      right_form =  <Sensors /> 
    //}
   
    if (APP_STORAGE.auth_form.getUser())
      return (
        <React.Fragment>
          <Box style={{ display: "flex", justifyContent: "flex-start" }}>
            <AppBarPanel />
            <Modal />
            <ModalLeftPanel />
            <ChangeDevsModal />{" "}
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
                <Box className="block-wrapp">{left_form}</Box>

                <Box className="block-wrapp grid">
                  {middle_form}
                  
                  {new_group}
                </Box>

                <Box className="block-wrapp">
                {right_form}
                </Box>
              </Box>
            </Box>
          </Box>

        </React.Fragment>
      );
  }
}
