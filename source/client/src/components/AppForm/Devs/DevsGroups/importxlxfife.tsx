import React from "react";
import { observer } from "mobx-react";

import DoneIcon from "@mui/icons-material/Done";
import * as XLSX from "xlsx";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

import {
  Box,
  Dialog,
  Divider,
  Typography,
  Button,
  FormHelperText,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Stack,
  Alert,
  IconButton,
} from "@mui/material";

import { APP_STORAGE } from "../../../../storage/AppStorage";
import { CloseButton } from "../../../shared/CloseButton";

interface IProps {}

//Компонент формы приложения
@observer
export class Importxlxfife extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  getAlert = () => {};

  async removeFileButton() {
    //let uploadIcon = document.querySelector(".upload-icon") as HTMLInputElement;

    let fileInput = document.querySelector(
      ".default-file-input"
    ) as HTMLInputElement;

    let uploadedFile = document.querySelector(
      ".file-block"
    ) as HTMLInputElement;

    uploadedFile.style.cssText = "display: none;";
    fileInput.value = "";
    //uploadIcon.innerHTML = "file_upload";

    APP_STORAGE.importdevs.clearDuplicates();
    APP_STORAGE.importdevs.clearInvalid_devs();
    APP_STORAGE.importdevs.clearValid_devs();
    APP_STORAGE.importdevs.clearErrorSaved_devs();
    APP_STORAGE.shared_store.setErrorResponseMess("");
  }

  private _handleFile = async (e: any) => {
    APP_STORAGE.importdevs.setSuccessfully_text("");
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

    const file = e.target.files[0];
    const data = await file.arrayBuffer();

    const workbook = XLSX.read(data);

    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    const jsonData = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
      blankrows: false,
    });

    APP_STORAGE.importdevs.setArrayJsonData(jsonData);
  };

  async uploadfile() {
    APP_STORAGE.importdevs.Uploadfile();
  }

  async handleExportExel() {
    var XLSX = require("xlsx");
    var table_elt = document.getElementById("file_template");
    var workbook = XLSX.utils.table_to_book(table_elt);
    XLSX.writeFile(workbook, "file_template.xlsx");
  }

  async onClose() {
    APP_STORAGE.importdevs.setOpenModal(false);
    APP_STORAGE.importdevs.setSuccessfully_text("");
    APP_STORAGE.importdevs.clearDuplicates();
    APP_STORAGE.importdevs.clearInvalid_devs();
    APP_STORAGE.importdevs.clearValid_devs();
    APP_STORAGE.importdevs.clearErrorSaved_devs();
    APP_STORAGE.shared_store.setErrorResponseMess("");
  }

  render(): React.ReactNode {
    return (
      <React.Fragment>
        <Dialog
          componentsProps={{
            backdrop: { style: { backgroundColor: "rgba(0 0 0 / 35%)" } },
          }}
          open={APP_STORAGE.importdevs.getOpenModal()}
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
              <Typography>Импортировать список устройств</Typography>
              <CloseButton
                onClose={() => {
                  this.onClose();
                }}
              />
            </Box>
            <Divider sx={{ m: "20px 20px" }} />
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                onClick={() => {
                  this.handleExportExel();
                }}
              >
                {" "}
                Скачать шаблон файла
                <FileDownloadIcon sx={{ color: "#1976D2" }} />
              </Button>
            </Box>

            <form className="form-container">
              <div className="upload-files-container">
                <div className="drag-file-area">
                  {/* <span className="material-icons-outlined upload-icon">
                    
                  </span> */}

                  <label className="label">
                    {" "}
                    <span className="browse-files">
                      <input
                        onInput={(e) => this._handleFile(e)}
                        type="file"
                        id="fileInput"
                        className="default-file-input"
                      />
                      <Box sx={{ display: "flex" }}>
                        <Box sx={{ display: "flex" }}>
                          <Typography
                            sx={{ color: "#038A51", fontWeight: "600" }}
                          >
                            {" "}
                            выберите файл (Excel)
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
                              fill="#3FAE7F"
                            />
                            <path
                              d="M10.4801 12.0808L9.26892 13.9112L10.5911 15.9139H9.60212L8.77706 14.5841L7.94142 15.9139H7L8.3275 13.9112L7.10049 12.0808H8.06306L8.81408 13.3136L9.57039 12.0808H10.4801Z"
                              fill="white"
                            />
                            <path
                              d="M13.5952 15.1925V15.9139H10.9296V12.0808H11.7546V15.1925H13.5952Z"
                              fill="white"
                            />
                            <path
                              d="M16.8519 13.2221H16.0692C16.0374 12.8416 15.7994 12.6514 15.3552 12.6514C15.1648 12.6514 15.0149 12.6909 14.9056 12.7699C14.7998 12.8452 14.7469 12.9511 14.7469 13.0875C14.7469 13.1341 14.754 13.1754 14.7681 13.2113C14.7822 13.2472 14.8086 13.2813 14.8474 13.3136C14.8862 13.3423 14.925 13.3674 14.9638 13.389C15.0026 13.4069 15.059 13.4284 15.133 13.4536C15.2106 13.4751 15.2794 13.4948 15.3393 13.5128C15.4028 13.5307 15.4909 13.5541 15.6037 13.5828C15.7166 13.6115 15.8153 13.6384 15.8999 13.6635C16.2701 13.7712 16.5452 13.9058 16.725 14.0673C16.9083 14.2288 17 14.4603 17 14.7618C17 14.9807 16.9559 15.1727 16.8678 15.3378C16.7796 15.4993 16.6597 15.6285 16.5081 15.7254C16.36 15.8188 16.1961 15.8869 16.0163 15.93C15.84 15.9767 15.6513 16 15.4504 16C14.9391 16 14.5389 15.8816 14.2498 15.6447C13.9642 15.4042 13.8196 15.0668 13.8161 14.6326H14.6359C14.65 15.1135 14.9338 15.354 15.4874 15.354C15.7025 15.354 15.8717 15.3091 15.9951 15.2194C16.122 15.1261 16.1855 15.0004 16.1855 14.8425C16.1855 14.7097 16.1273 14.6128 16.011 14.5518C15.8982 14.4908 15.6584 14.4065 15.2917 14.2988C15.2705 14.2952 15.2547 14.2916 15.2441 14.288C15.2335 14.2844 15.2194 14.2808 15.2018 14.2773C15.1842 14.2701 15.1683 14.2647 15.1542 14.2611C15.0273 14.2252 14.9391 14.2001 14.8897 14.1857C14.8404 14.1678 14.761 14.1391 14.6517 14.0996C14.546 14.0601 14.4684 14.0242 14.419 13.9919C14.3697 13.9596 14.308 13.9148 14.2339 13.8573C14.1634 13.7999 14.1123 13.7407 14.0805 13.6797C14.0488 13.6151 14.0188 13.5379 13.9906 13.4482C13.966 13.3549 13.9536 13.2544 13.9536 13.1467C13.9536 12.7986 14.0858 12.5204 14.3503 12.3122C14.6147 12.1041 14.9656 12 15.4028 12C15.8259 12 16.1714 12.1023 16.4394 12.3069C16.7073 12.5079 16.8449 12.8129 16.8519 13.2221Z"
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
                {/* {APP_STORAGE.importdevs.getSuccessfully_text() && (
                  <Typography
                    sx={{
                      p: "4px",
                      m: "8px",
                      textAlign: "center",
                      color: "#FF0000",
                      border: "1px solid #DF4040",
                      borderColor: "#DF4040",
                      borderRadius: "4px",
                      background: "#FFD4D4",
                      fontSize: "small",
                    }}
                  >
                    {" "}
                    {APP_STORAGE.importdevs.getSuccessfully_text()}
                  </Typography>
                )} */}

                {/* <button type="button" className="upload-button" onClick={() => (this.uploadfile())}> Загрузить файл </button> */}
                <Button
                  onClick={() => this.uploadfile()}
                  variant="contained"
                  sx={{ marginBottom: "15px" }}
                >
                  {" "}
                  Импортировать файл
                </Button>
                {APP_STORAGE.importdevs.getValid_devs().length !== 0 &&
                  APP_STORAGE.importdevs.getErrorSaved_devs().length === 0 && (
                    <Stack sx={{ width: "100%" }} spacing={2}>
                      <Alert severity="success">
                        Устройства с номерами:&nbsp;
                        {APP_STORAGE.importdevs.getValid_devs().map((item) => {
                          return `${item}, `;
                        })}
                        успешно добавлены
                      </Alert>
                    </Stack>
                  )}

                {APP_STORAGE.shared_store.getErrorResponseMess().length > 0 &&
                  APP_STORAGE.importdevs.getDuplicates().length === 0 && (
                    <Stack sx={{ width: "100%" }} spacing={2}>
                      <Alert severity="error">
                        {APP_STORAGE.shared_store.getErrorResponseMess()}
                      </Alert>
                    </Stack>
                  )}
                {APP_STORAGE.importdevs.getErrorSaved_devs().length !== 0 && (
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">
                      Произошла ошибка при добавлении устройств с
                      номерами:&nbsp;
                      {APP_STORAGE.importdevs
                        .getErrorSaved_devs()
                        .map((item) => {
                          return `${item}, `;
                        })}
                    </Alert>
                  </Stack>
                )}
                {APP_STORAGE.importdevs.getDuplicates().length !== 0 && (
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">
                      Устройства с номерами:&nbsp;
                      {APP_STORAGE.importdevs.getDuplicates().map((item) => {
                        return `${item}, `;
                      })}
                      уже существуют и не будут добавлены
                    </Alert>
                  </Stack>
                )}

                {APP_STORAGE.importdevs.getInvalid_devs().length !== 0 && (
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">
                      Устройства с номерами:&nbsp;
                      {APP_STORAGE.importdevs.getInvalid_devs().map((item) => {
                        return `${item}, `;
                      })}
                      не соответствуют шаблону и не будут добавлены
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

        <Table key="my-table-id" id="file_template" sx={{ display: "none" }}>
          <TableBody key={"dsafsafasfd" + 8888}>
            <TableRow key={"dsafsafasfd" + 1}>
              <TableCell key="121212"> 300001 </TableCell>
              <TableCell key="12121ewe2"> 300001 - УПСВм (ТС №4)</TableCell>
              <TableCell key="121u"> 7</TableCell>
              <TableCell key="121weeew212"> 55.455900</TableCell>
              <TableCell key="121weeew21212">65.349242</TableCell>
              <TableCell key="qw1"> 0.1</TableCell>
              <TableCell key="qw2"> 0.2</TableCell>
              <TableCell key="qw3"> 0.3</TableCell>
              <TableCell key="qw4"> 0.4</TableCell>
              <TableCell key="qw5"> 0.5</TableCell>
              <TableCell key="qw6"> 0.6</TableCell>
              <TableCell key="qw7"> 0.7</TableCell>
            </TableRow>
            <TableRow key={"dsafssfd" + 1}>
              <TableCell key="12"> 300002 </TableCell>
              <TableCell key="1212"> 300002 - УПСВм (ТС №4)</TableCell>
              <TableCell key="121"> 31</TableCell>
              <TableCell key="12ew212"> 55.455900 </TableCell>
              <TableCell key="121wew21212"> 65.349242</TableCell>
              <TableCell key="1212eqe2"> 0.1</TableCell>
              <TableCell key="1e2eqe2"> 0.2</TableCell>
              <TableCell key="11e2eqe2"> 0.3</TableCell>
              <TableCell key="122eqe2"> 0.4</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }
}
