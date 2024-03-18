import * as React from "react";

import { observer } from "mobx-react";
import { APP_STORAGE } from "../../../../storage/AppStorage";
import { Box, Button, TextField } from "@mui/material";

interface IProps {}

//Устройства
@observer
export class Calendar extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  async setDevSess() {
    let sess = APP_STORAGE.sensors;
    if (sess.getSessPeriodStart() === "" || sess.getSessPeriodEnd() === "") {
      var now = new Date();
      sess.setSessPeriodStart(String(now.toISOString()));
      sess.setSessPeriodEnd(String(now.toISOString()));
    }
    sess.get_DevSessions("sess_id", APP_STORAGE.auth_form.getdt());
  }

  render(): React.ReactNode {
    let sess = APP_STORAGE.sensors;

    if (sess.getSessPeriodStart() === "" || sess.getSessPeriodEnd() === "") {
      var tzoffset = new Date().getTimezoneOffset() * 60000; // смещение в миллисекундах
      var localISOTime = new Date(Date.now() - tzoffset)
        .toISOString()
        .slice(0, -8);
      sess.setSessPeriodStart(localISOTime);
      sess.setSessPeriodEnd(localISOTime); // => '2023-03-16T09:00'
    }

    return (
      <React.Fragment>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <TextField
                size="small"
                id="datetime-local"
                type="datetime-local"
                defaultValue={
                  APP_STORAGE.sensors.getSessPeriodStart() ||
                  new Date().toISOString().substring(0, 10)
                }
                onChange={(e) => {
                  APP_STORAGE.sensors.setSessPeriodStart(e.target.value);
                }}
                sx={{ mr: "16px", fontSize: "14px", mb: "8px" }}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
                sx={{ fontSize: "12px!important", mr: "16px", mb: "8px" }}
                size="small"
                id="datetime-local"
                type="datetime-local"
                defaultValue={APP_STORAGE.sensors.getSessPeriodEnd()}
                onChange={(e) => {
                  APP_STORAGE.sensors.setSessPeriodEnd(e.target.value);
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <Button
                className="button-save new-devs"
                sx={{
                  background: "#266BF1",
                  color: "#fff;",
                  fontSize: "12px",
                  height: "37px",
                }}
                onClick={() => {
                  this.setDevSess();
                }}
              >
                Установить период
              </Button>
            </Box>
          </Box>
        </Box>
      </React.Fragment>
    );
  }
}
