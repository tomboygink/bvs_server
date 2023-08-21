import React from "react";
import { observer } from "mobx-react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { APP_STORAGE } from "../../../../../storage/AppStorage";

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
                p: "12px",
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
                  sx={{ color: "#1976D2" }}
                  onClick={() => {
                    APP_STORAGE.devs.setDepthSensors(false);
                  }}
                />fhfrgdh
              </Box>

              <Divider sx={{ marginBottom: "20px" }} />
yy
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
                sx={{ mt: 2 }}
              />

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
                    APP_STORAGE.devs.set_DevsDepth(
                      APP_STORAGE.devs.getSensors()
                    );
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
