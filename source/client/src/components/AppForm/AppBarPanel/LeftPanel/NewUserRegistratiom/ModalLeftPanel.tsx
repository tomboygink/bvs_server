import React from "react";
import { observer } from "mobx-react";

import { APP_STORAGE } from "../../../../../storage/AppStorage";

import { TextField, Box, Dialog, Divider, Typography } from "@mui/material";

import { NewUserRegistration } from "./NewUserRegistration";
import { NewOrganization } from "./NewOrganization";

import CloseIcon from "@mui/icons-material/Close";

interface IProps {}

@observer
export class ModalLeftPanel extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  async closeModal() {
    APP_STORAGE.reg_user.setModalRegUser(false);
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

    return (
      <React.Fragment>
        <Dialog
          BackdropProps={{ style: { background: "rgba(0, 0, 0, 0.75)" } }}
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
