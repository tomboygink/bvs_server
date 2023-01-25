import React from "react";
import { observer } from "mobx-react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";



import { APP_STORAGE } from "../../../storage/AppStorage";

interface IProps {}

//Компонент формы приложения
@observer
export class ModalSensors extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  render(): React.ReactNode {
    return (
      <React.Fragment>
        <Box>
          <Modal
            open={APP_STORAGE.devs.getDepthSensors()} 
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: "absolute" as "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                borderRadius: "4px",
                border: "none",
                boxShadow: 24,
                p: 4,
                outline: "none",
              }}
            >
              <Typography id="modal-modal-title">
                Введите глубину датчика
              </Typography>

              <TextField
                size="small"
                fullWidth
                id="outlined-number"
                label="Глубина"
                type="Глубина"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  APP_STORAGE.devs.setSensors(Number(e.target.value));
                }}
                sx={{ mt: 2 }}
              />

              <Typography
                id="modal-modal-description"
                sx={{ mt: 2 }}
                onClick={() => {
                  APP_STORAGE.devs.set_DevsDepth(APP_STORAGE.devs.getSensors());
                }}
              >
                Сохранить
              </Typography>

              <Typography onClick={() => {APP_STORAGE.devs.setDepthSensors(false)}}>close</Typography>
            </Box>
          </Modal>
        </Box>
      </React.Fragment>
    );
  }
}
