import React from "react";
import { observer } from "mobx-react";

import {
    Box,
  Button,
  Dialog,
  Divider,
  TextField,
  Typography
} from "@mui/material";

import { APP_STORAGE } from "../../../storage/AppStorage";
import CloseIcon from "@mui/icons-material/Close";


interface IProps {}

//Компонент формы приложения
@observer
export class NewDevPovs extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount(): void {
  //  APP_STORAGE.reg_user.get_Org("sess_id", APP_STORAGE.auth_form.getdt());
  }

 

  render(): React.ReactNode {

    if (APP_STORAGE.devs.getStartDevPovs() === "" || APP_STORAGE.devs.getEndDevPovs() === "") {
        var tzoffset = new Date().getTimezoneOffset() * 60000; // смещение в миллисекундах
        var localISOTime = new Date(Date.now() - tzoffset)
          .toISOString()
          .slice(0, -8);
        APP_STORAGE.devs.setStartDevPovs(localISOTime);
        APP_STORAGE.devs.setEndDevPovs(localISOTime); // => '2023-03-16T09:00'
      }

    return (
      <React.Fragment>
        <Dialog
          BackdropProps={{ style: { background: "rgba(0 0 0 / 12%)" } }}
          open={APP_STORAGE.devs.getOpenNewdevpovs()}
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
              <Typography>Установить поверочный интервал - { APP_STORAGE.devs_groups.getName()}</Typography>

              <CloseIcon
                sx={{ color: "#1976D2" }}
                onClick={() => {
                APP_STORAGE.devs.setOpenNewdevpovs(false)
                }}
              />
            </Box>

            <Divider sx= {{mb: '20px'}}/>

            <TextField
              size="small"
              id="datetime-local"
              type="datetime-local"
              defaultValue={
                APP_STORAGE.devs.getStartDevPovs()
                
              }
              onChange={(e) => {
                APP_STORAGE.devs.setStartDevPovs(e.target.value);
              }}
              sx={{ mr: "16px", fontSize: '14px', mb: '8px'}}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
            sx ={{fontSize: '12px!important', mr: "16px",  mb: '8px'}}
              size="small"
              id="datetime-local"
              type="datetime-local"
              defaultValue={ APP_STORAGE.devs.getEndDevPovs()}
              onChange={(e) => {
                APP_STORAGE.devs.setEndDevPovs(e.target.value);;
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
              height: '37px'
            }}
            onClick={()=> {APP_STORAGE.devs.set_NewDevPovs("sess_id", APP_STORAGE.auth_form.getdt())}}
          
          >
            Сохранить
          </Button>
          </Box>
           
          
        </Dialog>
      </React.Fragment>
    );
  }
}
