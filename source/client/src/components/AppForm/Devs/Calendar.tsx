import * as React from "react";

import { observer } from "mobx-react";
import { toJS } from "mobx";
import { APP_STORAGE } from "../../../storage/AppStorage";

import CropSquareIcon from '@mui/icons-material/CropSquare';
import Battery5BarIcon from '@mui/icons-material/Battery5Bar';
import {
  Box,
  Button,
  Divider,
  Link,
  TextField,
  Typography,
} from "@mui/material";

import { TableCell } from "@mui/material";

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
        <Divider sx={{ m: "20px" , background: '#8F9DCE;'}} />

        <Box sx={{display: 'flex', justifyContent: 'space-between' }}>

        <Box>
          <Box>
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
              sx={{ mr: "15px"}}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
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
          </Box>

          <Button
            className="button-save new-devs"
            sx={{
              background: "#266BF1",
              color: "#fff;",
              fontSize: "12px",
              mt: "12px",
            }}
            onClick={() => {
              this.setDevSess();
            }}
          >
            Установить период
          </Button>
        </Box>

        <Box className="legend" sx={{background: '#f5f8fd', borderRadius: '4px', border: '1px solid #8F9DCE', p: '4px', boxShadow: '-1px 0px 8px -2px rgba(34, 60, 80, 0.2)'}}>
        <Typography sx = {{color: '#00B394', display: 'flex', alignItems: 'center', fontSize: '14px'}} > <CropSquareIcon  sx = {{color : '#00B394', fontSize: 'small'}} />  - Первая сессия ({APP_STORAGE.sensors.getTimeDevSessFirst().replace('T',' ')})</Typography>
        <Typography sx = {{color: '#A3A0DC', display: 'flex', alignItems: 'center', fontSize: '14px'}} > <CropSquareIcon sx ={{color: '#A3A0DC' , fontSize: 'small'}}/> - Последняя сессия ({APP_STORAGE.sensors.getTimeDevSessLast().replace('T',' ')})</Typography>   
        <Typography sx = {{color: '#FE6F4F', display: 'flex', alignItems: 'center', fontSize: '14px'}} > <CropSquareIcon sx = {{color: '#FE6F4F' , fontSize: 'small'}}/> - Выбраная сессия ({APP_STORAGE.sensors.getChoseSessTime()})</Typography> 
        <Typography sx = {{color: '#266BF1', display: 'flex', alignItems: 'center', fontSize: '14px'}} > <Battery5BarIcon sx = {{color: '#266BF1', fontSize: 'small'}}/> - Аккумулятор ({APP_STORAGE.sensors.getAkbSessLast()})</Typography>        
        </Box>
        </Box>
      </React.Fragment>
    );
  }
}
