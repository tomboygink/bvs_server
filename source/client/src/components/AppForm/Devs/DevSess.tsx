import * as React from "react";

import { observer } from "mobx-react";
import { APP_STORAGE } from "../../../storage/AppStorage";
import { Box, Typography, TextField, Button} from "@mui/material";

interface IProps {}

//Устройства
@observer
export class DevSess extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }
    async setDevSess(){
      APP_STORAGE.sensors.set_DevSessions("sess_id", APP_STORAGE.auth_form.getdt())
      console.log(' APP_STORAGE.sensors.setSessPeriodEnd ',  APP_STORAGE.sensors.getSessPeriodEnd())
      console.log(' APP_STORAGE.sensors.setSessPeriodStart ',  APP_STORAGE.sensors.getSessPeriodStart())
      console.log(' APP_STORAGE.sensors.setSessPeriodStart ',  APP_STORAGE.sensors.getNumber())
    }

  render(): React.ReactNode {
    return (
      <React.Fragment>
       
          <Box sx={{ mb: "8px" }}>
            <Typography sx={{ fontWeight: "600" }}>
              {" "}
              Выборка сессий устройства 5005 по периоду{" "}
            </Typography>
          </Box>

          <Box sx={{ display: "flex" }}>

            <TextField
              size="small"
              id="datetime-local"
              label="Начало периода"
              type="datetime-local"
              defaultValue= {APP_STORAGE.sensors.getSessPeriodStart() || "2023-05-24T10:30"}
              onChange={(e) => {
                  APP_STORAGE.sensors.setSessPeriodStart(e.target.value);
                }}
              sx={{ width: 250, mr: "22px", mt: "12px", mb: "12px" }}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              size="small"
              id="datetime-local"
              label="Окончание периода"
              type="datetime-local"
              defaultValue= {APP_STORAGE.sensors.getSessPeriodEnd() || "2023-05-24T10:30"}
              onChange={(e) => {
                  APP_STORAGE.sensors.setSessPeriodEnd(e.target.value);
                }}
              sx={{ width: 250, mt: "12px", mb: "12px" }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          <Button  onClick = {() => {this.setDevSess()}} variant="outlined">Установить переод</Button>
          </Box>

          
      </React.Fragment>
    );
  }
}
