import React from "react";
import { observer } from "mobx-react";

import { APP_STORAGE } from "../../../../../storage/AppStorage";

import { TextField, Box, Dialog, Divider, Typography } from "@mui/material";

import { NewUserRegistration } from "./NewUserRegistration";
import { NewOrganization } from "./NewOrganization";
import { NewJobsTittle } from "./NewJobsTittle";
import { NewWell } from "./NewWell";

import CloseIcon from "@mui/icons-material/Close";

interface IProps {}

@observer
export class ModalLeftPanel extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  async closeModal() {
    APP_STORAGE.reg_user.setModalRegUser(false);
    APP_STORAGE.reg_user.setFamily("");
    APP_STORAGE.reg_user.setName("");
    APP_STORAGE.reg_user.setFather("");
    APP_STORAGE.reg_user.setEmail("");
    APP_STORAGE.reg_user.setTelephone("");
    APP_STORAGE.reg_user.setLogin("");
    APP_STORAGE.reg_user.setPassword("");
    APP_STORAGE.reg_user.setRepeatPassword("");
    APP_STORAGE.reg_user.setKeyOrg("");
    APP_STORAGE.reg_user.setKeyJobs("");
    APP_STORAGE.reg_user.setErrorFamily(false);
    APP_STORAGE.reg_user.setTextHelpFamily("");
    APP_STORAGE.reg_user.setErrorName(false);
    APP_STORAGE.reg_user.setTextHelpName("");
    APP_STORAGE.reg_user.setErrorFather(false);
    APP_STORAGE.reg_user.setTextHelpFather("");
    APP_STORAGE.reg_user.setErrorEmail(false);
    APP_STORAGE.reg_user.setTextHelpEmail("");
    APP_STORAGE.reg_user.setErrorTelephone(false);
    APP_STORAGE.reg_user.setTextHelpTelephone("");
    APP_STORAGE.reg_user.setErrorLogin(false);
    APP_STORAGE.reg_user.setTextHelpLogin("");
    APP_STORAGE.reg_user.setErrorPassword(false);
    APP_STORAGE.reg_user.setTextHelpPassword("");
    APP_STORAGE.reg_user.setErrorPassword(false);
    APP_STORAGE.reg_user.setTextHelpPassword("");
    APP_STORAGE.reg_user.setErrorRepeatPassword(false);
    APP_STORAGE.reg_user.setTextHelpRepeatPassword("");
    APP_STORAGE.reg_user.setErrorInn(false);
    APP_STORAGE.reg_user.setTextHelpInn("");
    APP_STORAGE.reg_user.setErrorOrg(false);
    APP_STORAGE.reg_user.setTextHelpOrg("");
    APP_STORAGE.reg_user.setErrorJobs(false);
    APP_STORAGE.reg_user.setTextHelpJobs("");
    APP_STORAGE.reg_user.setErrorFullName(false);
    APP_STORAGE.reg_user.setTextHelpFullName("");
    APP_STORAGE.reg_user.setErrorNameOrg(false);
    APP_STORAGE.reg_user.setTextHelpNameOrg("");
    APP_STORAGE.reg_user.setErrorAddress(false);
    APP_STORAGE.reg_user.setTextHelpAddress("");
    APP_STORAGE.reg_user.setErrorLatitude(false);
    APP_STORAGE.reg_user.setTextHelpLatitude("");
    APP_STORAGE.reg_user.setErrorLongitude(false);
    APP_STORAGE.reg_user.setTextHelpLongitude("");
  }

  render(): React.ReactNode {
    var modal_date: React.ReactNode = <></>;

    if (
      APP_STORAGE.reg_user.getModalRegUser() === true &&
      APP_STORAGE.reg_user.getTakeModal() === 1
    ) {
      modal_date = <NewUserRegistration />;
    }

    if (
      APP_STORAGE.reg_user.getModalRegUser() === true &&
      APP_STORAGE.reg_user.getTakeModal() === 2
    ) {
      modal_date = <NewOrganization />;
    }

    if (
      APP_STORAGE.reg_user.getModalRegUser() === true &&
      APP_STORAGE.reg_user.getTakeModal() === 3
    ) {
      modal_date = <NewJobsTittle />;
    }
    if (
      APP_STORAGE.reg_user.getModalRegUser() === true &&
      APP_STORAGE.reg_user.getTakeModal() === 4
    ) {
      modal_date = <NewWell />;
    }
    return (
      <React.Fragment>
        <Dialog
          componentsProps={{
            backdrop: { style: { backgroundColor: "rgba(0 0 0 / 35%)" } },
          }}
          open={APP_STORAGE.reg_user.getModalRegUser()}
          fullWidth
        >
          <Box sx={{ p: 2 }}>
            <Box
              className="ModalTitle"
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography>{APP_STORAGE.reg_user.getTittleModal()}</Typography>

              <CloseIcon
                sx={{ color: "#1976D2" }}
                onClick={() => {
                  this.closeModal();
                }}
              />
            </Box>
            <Divider sx={{ marginBottom: "20px" }} />

            {modal_date}
          </Box>
        </Dialog>
      </React.Fragment>
    );
  }
}
