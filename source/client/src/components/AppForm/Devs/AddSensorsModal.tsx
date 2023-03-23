import React from "react";
import { observer } from "mobx-react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, Divider, TextField } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import { APP_STORAGE } from "../../../storage/AppStorage";

interface IProps {}

//Компонент формы приложения
@observer
export class Change_ModalSensors extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  async Change_sensors() {
    APP_STORAGE.devs.get_sensors.push(
      {"depth": APP_STORAGE.devs.getSensors(), "value" : 0 }
    );
    
    var q = APP_STORAGE.devs.get_sensors
    const uniqueChars = q.reduce((o:any, i:any) => { ////////////////// Редюсом убираем дубликаты
      if (!o.find((v: { depth: any; }) => v.depth == i.depth)) {
        o.push(i);
      }
      return o;
    }, []);
    
    APP_STORAGE.devs.setChangeSensors(JSON.parse(JSON.stringify(uniqueChars)))
  }

  render(): React.ReactNode {
    return (
      <React.Fragment>
        <Box>
          <Modal
            open={APP_STORAGE.devs.getDepthSensors_Ch()}
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
                p: "14px",
                outline: "none",
              }}
            >
         

              <Box
                className="ModalTitle"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: "12px",
                }}
              >
                <Typography>Введите глубину датчика</Typography>

                <CloseIcon
                  fontSize="small"
                  onClick={() => {
                    APP_STORAGE.devs.setDepthSensors_Ch(false);
                  }}
                />
              </Box>

              <Divider sx={{ marginBottom: "20px" }} />

              <TextField
                size="small"
                fullWidth
                id="outlined-number"
                label="Глубина"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  inputMode: "decimal",
                  step: 0.1,
                  pattern: "[0..9]*[.][0..9]*",
                }}
                onChange={(e) => {
                  APP_STORAGE.devs.setSensors(Number(e.target.value));
                }}
                value={APP_STORAGE.devs.getSensors() || ""}
              />
              <Typography sx={{ fontSize: "12px", color: "grey" }}>
                Введите глубину датчика
              </Typography>
            

              <Box
                sx={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  className="button-save"
                  sx={{
                    background: "#266BF1",
                    color: "#fff;",
                    mt: "18px",
                    mb: "18px",
                    fontSize: "12px",
                  }}
                  onClick={() => {
                    this.Change_sensors();
                  }}
                >
                  Сохранить( Сенсоры )
                </Button>
              </Box>
              
            </Box>
          </Modal>
        </Box>
      </React.Fragment>
    );
  }
}
