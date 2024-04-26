import React from "react";
import { observer } from "mobx-react";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import {
  Box,
  Dialog,
  Divider,
  Typography,
  Button,
  Stack,
  Alert,
} from "@mui/material";
import { APP_STORAGE } from "../../../../storage/AppStorage";
import { CloseButton } from "../../../shared/CloseButton";

interface IProps {}

//Компонент формы приложения
@observer
export class Opensvgfile extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  async uploadfile() {
    try {
      var svg = atob(
        APP_STORAGE.importdevs
          .getArraySvgData()
          .replace(/data:image\/svg\+xml;base64,/, "")
      );

      if (svg) {
        APP_STORAGE.importdevs.set_SchemeSvg(APP_STORAGE.auth_form.getdt());
      } else
        APP_STORAGE.importdevs.setErrorSave_mess(
          "Ошибка! Убедитесь, что загружаемый файл в формате .svg"
        );
    } catch (err) {
      APP_STORAGE.importdevs.setErrorSave_mess(
        "Ошибка! Убедитесь, что загружаемый файл в формате .svg"
      );
    }
  }
  async removeFileButton() {
    let uploadIcon = document.querySelector(".upload-icon") as HTMLInputElement;

    let fileInput = document.querySelector(
      ".default-file-input"
    ) as HTMLInputElement;

    let uploadedFile = document.querySelector(
      ".file-block"
    ) as HTMLInputElement;

    uploadedFile.style.cssText = "display: none;";
    fileInput.value = "";
    // uploadIcon.innerHTML = "file_upload";

    APP_STORAGE.importdevs.setErrorSave_mess("");
  }

  private _handleFile = async (e: any) => {
    let fileToUpload = e.target.files[0];
    let reader = new FileReader();

    reader.onload = (event: any) => {
      APP_STORAGE.importdevs.setArraySvgData(event.target.result);
    };

    let fileInput = document.querySelector(
      ".default-file-input"
    ) as HTMLInputElement;

    let uploadedFile = document.querySelector(
      ".file-block"
    ) as HTMLInputElement;
    let fileName = document.querySelector(".file-name") as HTMLInputElement;
    let fileSize = document.querySelector(".file-size") as HTMLInputElement;

    fileName.innerHTML = fileInput.files[0].name;
    fileSize.innerHTML = (fileInput.files[0].size / 1024).toFixed(1) + " KB";
    uploadedFile.style.cssText = "display: flex;";
    // progressBar.style.width = '0';

    reader.readAsDataURL(fileToUpload);
  };

  async onClose() {
    APP_STORAGE.importdevs.setOpenModalSvg(false);
    APP_STORAGE.importdevs.setErrorSave_mess("");
    APP_STORAGE.importdevs.setArraySvgData("");
  }

  render(): React.ReactNode {
    return (
      <React.Fragment>
        <Dialog
          componentsProps={{
            backdrop: { style: { backgroundColor: "rgba(0 0 0 / 35%)" } },
          }}
          open={APP_STORAGE.importdevs.getOpenModalSvg()}
          fullWidth
        >
          <Box>
            <Box
              className="ModalTitle"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                m: "12px",
              }}
            >
              <Typography>Загрузить схему расположения</Typography>
              <CloseButton
                onClose={() => {
                  this.onClose();
                }}
              />
            </Box>
            <Divider sx={{ m: "20px 20px" }} />

            <form className="form-container">
              <div className="upload-files-container">
                <div className="drag-file-area">
                  {/* <span className="material-icons-outlined upload-icon">  </span> */}

                  <label className="label">
                    {" "}
                    <span className="browse-files">
                      <input
                        onInput={(e) => this._handleFile(e)}
                        type="file"
                        id="fileInput"
                        className="default-file-input"
                      />
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Box sx={{ display: "flex" }}>
                          <Typography
                            sx={{ color: "#474747", fontWeight: "600" }}
                          >
                            {" "}
                            выберите файл
                          </Typography>
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3 5C3 3.34315 4.34315 2 6 2H14C17.866 2 21 5.13401 21 9V19C21 20.6569 19.6569 22 18 22H6C4.34315 22 3 20.6569 3 19V5ZM18.584 7C17.9413 5.52906 16.6113 4.4271 15 4.10002V7H18.584Z"
                              fill="#6D6D6D"
                            />
                            <path
                              d="M9.23168 12V12.736H7.34889V13.6629H8.98681V14.3596H7.34889V16H6.5V12H9.23168Z"
                              fill="white"
                            />
                            <path
                              d="M10.58 12V16H9.72563V12H10.58Z"
                              fill="white"
                            />
                            <path
                              d="M14.073 15.2472V16H11.3305V12H12.1794V15.2472H14.073Z"
                              fill="white"
                            />
                            <path
                              d="M17.4619 12V12.7191H15.3995V13.5899H17.2932V14.2809H15.3995V15.264H17.5V16H14.5561V12H17.4619Z"
                              fill="white"
                            />
                          </svg>
                        </Box>{" "}
                        <Typography>с устройства</Typography>
                      </Box>
                    </span>{" "}
                  </label>
                </div>
                <span className="cannot-upload-message">
                  {" "}
                  <span className="material-icons-outlined">Ошибка</span>{" "}
                  Необходимо выбрать файл{" "}
                  <span className="material-icons-outlined cancel-alert-button">
                    cancel
                  </span>{" "}
                </span>
                <div className="file-block">
                  <div className="file-info">
                    {" "}
                    <span className="material-icons-outlined file-icon"></span>{" "}
                    <span className="file-name"> </span> |{" "}
                    <span className="file-size"> </span>{" "}
                  </div>
                  <span
                    className="material-icons remove-file-icon"
                    onClick={() => {
                      this.removeFileButton();
                    }}
                  >
                    {" "}
                    <DeleteOutlineOutlinedIcon />
                  </span>
                  <div className="progress-bar"> </div>
                </div>

                {/* <button type="button" className="upload-button" onClick={() => (this.uploadfile())}> Загрузить файл </button> */}
                <Button
                  onClick={() => this.uploadfile()}
                  sx={{
                    background: "#266BF1",
                    color: "#fff;",
                    mt: "18px",
                    mb: "18px",
                    fontSize: "12px",
                    alignSelf: "flex-end",
                  }}
                >
                  {" "}
                  Сохранить
                </Button>
                {APP_STORAGE.importdevs.getErrorSave_mess().length > 0 && (
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">
                      {APP_STORAGE.importdevs.getErrorSave_mess()}
                    </Alert>
                  </Stack>
                )}
                {APP_STORAGE.importdevs.getSuccessSave_mess().length > 0 && (
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="success">
                      {APP_STORAGE.importdevs.getSuccessSave_mess()}
                    </Alert>
                  </Stack>
                )}
                <Stack sx={{ width: "100%" }} spacing={2}>
                  <Alert severity="warning">
                    Внимание! После нажатия на кнопку, отменить операцию будет
                    невозможно.
                  </Alert>
                </Stack>
              </div>
            </form>
          </Box>
        </Dialog>
      </React.Fragment>
    );
  }
}
