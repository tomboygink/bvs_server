import React from "react";
import { observer } from "mobx-react";
import { TextField, Box, Dialog, Divider, Typography } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import { APP_STORAGE } from "../../../../../storage/AppStorage";

import { ChangePassword } from "./ChangePassword";
import { ChangeUserData } from "./ChangeUserData";
import { Saveresult } from "./saveresult";
interface IProps {}

@observer
export class Modal extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  async closeModal() {
    APP_STORAGE.modal.setPersonalAccaunt(false);
    APP_STORAGE.modal.setErrr_old_pass(false);
    APP_STORAGE.modal.setError_old_message("");
    APP_STORAGE.modal.setCmdErrData("");
    APP_STORAGE.modal.setError_pass(false);
    APP_STORAGE.modal.setError_message("");
    let user = APP_STORAGE.auth_form.getUser();
    if (APP_STORAGE.modal.getFamily() !== "") {
      APP_STORAGE.modal.setFamily(user.family);
    }

    if (APP_STORAGE.modal.getName() !== "") {
      APP_STORAGE.modal.setName(user.name);
    }

    if (APP_STORAGE.modal.getFather() !== "") {
      APP_STORAGE.modal.setFather(user.father);
    }

    if (APP_STORAGE.modal.getTelephone() !== "") {
      APP_STORAGE.modal.setTelephone(user.telephone);
    }

    if (APP_STORAGE.modal.getEmail() !== "") {
      APP_STORAGE.modal.setEmail(user.email);
    }

    if (APP_STORAGE.modal.getLogin() !== "") {
      APP_STORAGE.modal.setLogin(user.login);
    }

    if (APP_STORAGE.modal.getOld_Pass() !== "") {
      APP_STORAGE.modal.setOld_Pass("");
    }

    if (APP_STORAGE.modal.getNew_Pass() !== "") {
      APP_STORAGE.modal.setNew_Pass("");
    }

    if (APP_STORAGE.modal.getRepeat_password() !== "") {
      APP_STORAGE.modal.setRepeat_password("");
    }
  }

  render(): React.ReactNode {
    var modal_date: React.ReactNode = <></>;
    if (APP_STORAGE.modal.getModal() === 1) {
      modal_date = <ChangeUserData />;
    } else if (APP_STORAGE.modal.getModal() === 2) {
      modal_date = <ChangePassword />;
    }
    if (APP_STORAGE.modal.getCmdErrData() === null) {
      modal_date = <Saveresult />;
    }

    return (
      <React.Fragment>
        <Dialog
          componentsProps={{
            backdrop: { style: { backgroundColor: "rgba(0 0 0 / 35%)" } },
          }}
          open={APP_STORAGE.modal.getPersonalAccaunt()}
          fullWidth
        >
          <Box sx={{ p: 2 }}>
            <Box
              className="ModalTitle"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: "12px",
              }}
            >
              <Typography>{APP_STORAGE.modal.getModalTitle()}</Typography>

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
