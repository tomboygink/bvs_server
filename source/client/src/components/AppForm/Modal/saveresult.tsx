import React from "react";
import { observer } from "mobx-react";

import {
  TextField,
  Box,
  Button,
  Typography,
  Divider,
  Alert,
} from "@mui/material";
import { APP_STORAGE } from "../../../storage/AppStorage";
import SaveIcon from "@mui/icons-material/Save";

interface IProps {}

//Компонент формы приложения
@observer
export class ChangePassword extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  async saveСhanges() {
    APP_STORAGE.modal.set_ChangePass("sess_id", APP_STORAGE.auth_form.getdt());
  }

  render(): React.ReactNode {




    return (
      <React.Fragment>
        <Box>

        </Box>
      </React.Fragment>
    );
  }
}
