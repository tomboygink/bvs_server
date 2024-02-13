import React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

import { observer } from "mobx-react";
import { APP_STORAGE } from "./storage/AppStorage";

import { TextField, Box, Typography, Alert, Button } from "@mui/material";

interface IProps {}

@observer
export class App extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount(): void {}

  componentWillUnmount(): void {}

  async handleSubmit() {
    APP_STORAGE.set_SendCode();
  }

  render(): React.ReactNode {
    let splArr = window.location.search.replace(/%20/g, "");
    let splArr1 = splArr.split("=");
    APP_STORAGE.setCode(splArr1[1]);

    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <Box
            className="box_wrapper"
            sx={{
              p: "12px",
              mt: "10%",
              borderRadius: "4px",
              display: "grid",
              boxShadow: "1px 3px 20px -1px rgb(3 131 229 / 20%);",
            }}
          >
            <Typography
              sx={{ p: "20px", color: "#1976D2", justifySelf: "center" }}
            >
              {" "}
              Нажмите для подтверждения
            </Typography>
            <TextField
              InputProps={{ type: "hidden" }}
              sx={{ display: "none" }}
              // error={APP_STORAGE.getError()}
              // helperText={APP_STORAGE.getErorrMess()}
              disabled
              onChange={(e) => {
                APP_STORAGE.setCode(e.target.value);
              }}
            />
            <Button
              fullWidth
              onClick={this.handleSubmit}
              sx={{
                mt: "14px",
                mb: "14px",
                background: "#edf2ff",
                color: "#1976d2;",
              }}
            >
              Подтвердить
            </Button>
            {APP_STORAGE.getSuccessSave_mess().length > 0 && (
              <Alert severity="success">
                {APP_STORAGE.getSuccessSave_mess()}
              </Alert>
            )}
            {APP_STORAGE.getErrorSave_mess().length > 0 && (
              <Alert severity="error">{APP_STORAGE.getErrorSave_mess()}</Alert>
            )}
          </Box>
        </Container>
      </React.Fragment>
    );
  }
}
