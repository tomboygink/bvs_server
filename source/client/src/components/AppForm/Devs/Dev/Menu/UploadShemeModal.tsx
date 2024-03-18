import React, { FC, ChangeEvent, FormEvent, useState } from "react";
import { observer } from "mobx-react";
import {
  Box,
  Dialog,
  Typography,
  Divider,
  Alert,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Stack,
  Button as ButtonMui,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { APP_STORAGE } from "../../../../../storage/AppStorage";
import { CloseButton } from "../../../../shared/CloseButton";
import { Button } from "../../../../shared/Button";
import { set } from "mobx";

interface IProps {}

export const UploadShemeModal: FC<IProps> = observer(() => {
  const [key, setKey] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const handleClose = () => {
    APP_STORAGE.devs.setOpenModalUploadSheme(false);
    APP_STORAGE.importdevs.setDevShemeSvgData("");
    APP_STORAGE.importdevs.setErrorSave_mess("");
  };

  const handleUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event: any) => {
      APP_STORAGE.importdevs.setDevShemeSvgData(event.target.result);
    };

    setFileName(file.name);
    setFileSize(`${(file.size / 1024).toFixed(1)} KB`);

    reader.readAsDataURL(file);
  };

  const removeFile = () => {
    const randomString = Math.random().toString(36);
    setKey(randomString);
    setFileName("");
    setFileSize("");
    APP_STORAGE.importdevs.setErrorSave_mess("");
    APP_STORAGE.importdevs.setDevShemeSvgData("");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const svg = atob(
        APP_STORAGE.importdevs
          .getDevShemeSvgData()
          .replace(/data:image\/svg\+xml;base64,/, "")
      );
      if (svg) {
        APP_STORAGE.importdevs.set_DevShemeSvg(APP_STORAGE.auth_form.getdt());
      } else
        APP_STORAGE.importdevs.setErrorSave_mess(
          "Ошибка! Убедитесь, что загружаемый файл в формате .svg"
        );
    } catch (err) {
      APP_STORAGE.importdevs.setErrorSave_mess(
        "Ошибка! Убедитесь, что загружаемый файл в формате .svg"
      );
    }
  };

  return (
    <Dialog
      open={APP_STORAGE.devs.getOpenModalUploadSheme()}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        style: {
          padding: "12px",
          maxWidth: "600px",
          width: "100%",
        },
        onSubmit: handleSubmit,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: "12px",
        }}
      >
        <DialogTitle sx={{ padding: "0px", fontSize: "16px" }}>
          Загрузить схему устройства
        </DialogTitle>
        <CloseButton onClose={handleClose} />
      </Box>
      <Divider sx={{ marginBottom: "20px" }} />

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            border: "2px dashed #266bf1",
            borderRadius: "4px",
            padding: "12px 12px 22px 12px",
            width: "350px",
            textAlign: "center",
            mb: "15px",
          }}
        >
          <label className="label">
            {" "}
            <span className="browse-files">
              <input
                type="file"
                id="uploadShemeInput"
                className="devSheme-input default-file-input"
                key={key}
                onChange={(e) => handleUploadFile(e)}
              />
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Box sx={{ display: "flex" }}>
                  <Typography sx={{ color: "#474747", fontWeight: "600" }}>
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
                    <path d="M10.58 12V16H9.72563V12H10.58Z" fill="white" />
                    <path
                      d="M14.073 15.2472V16H11.3305V12H12.1794V15.2472H14.073Z"
                      fill="white"
                    />
                    <path
                      d="M17.4619 12V12.7191H15.3995V13.5899H17.2932V14.2809H15.3995V15.264H17.5V16H14.5561V12H17.4619Z"
                      fill="white"
                    />
                  </svg>
                </Box>
                <Typography>с устройства</Typography>
              </Box>
            </span>
          </label>
        </Box>
        {fileName && (
          <div className="devSheme-block">
            <div className="devSheme-info">
              <span className="devSheme-name">{fileName}</span> |{" "}
              <span className="devSheme-size">{fileSize}</span>
            </div>
            <span
              className="material-icons remove-file-icon"
              onClick={removeFile}
            >
              <DeleteOutlineOutlinedIcon />
            </span>
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button />
      </DialogActions>
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert severity="warning">
          Внимание! После нажатия на кнопку, отменить операцию будет невозможно.
        </Alert>
      </Stack>
      {APP_STORAGE.importdevs.getErrorSave_mess().length > 0 && (
        <Alert severity="error">
          {APP_STORAGE.importdevs.getErrorSave_mess()}
        </Alert>
      )}
      {APP_STORAGE.importdevs.getSuccessSave_mess().length > 0 && (
        <Alert severity="success">
          {APP_STORAGE.importdevs.getSuccessSave_mess()}
        </Alert>
      )}
    </Dialog>
  );
});
