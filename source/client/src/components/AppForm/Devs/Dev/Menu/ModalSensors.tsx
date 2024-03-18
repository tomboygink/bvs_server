import React from "react";
import { observer } from "mobx-react";

import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { APP_STORAGE } from "../../../../../storage/AppStorage";
import { CloseButton } from "../../../../shared/CloseButton";
import { TextInput } from "../../../../shared/TextInput";

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
                <CloseButton
                  onClose={() => APP_STORAGE.devs.setDepthSensors(false)}
                />
              </Box>

              <Divider sx={{ marginBottom: "20px" }} />

              <TextInput
                label="Глубина"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  type: "number",
                  inputMode: "decimal",
                  step: 0.1,
                  pattern: "[0..9]*[.][0..9]*",
                }}
                onChange={(e) => {
                  APP_STORAGE.devs.setSensors(Number(e.target.value));
                }}
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
