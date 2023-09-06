import React from "react";
import { observer } from "mobx-react";

import DoneIcon from "@mui/icons-material/Done";
import * as XLSX from "xlsx";

import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import {
  TextField,
  Box,
  Dialog,
  Divider,
  Typography,
  Button,
  FormHelperText,
  Table,
  TableBody,
  TableRow,
  TableCell
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { APP_STORAGE } from "../../../../storage/AppStorage";
import { toJS } from "mobx";

import FileDownloadIcon from "@mui/icons-material/FileDownload";

interface IProps {}

//Компонент формы приложения
@observer
export class Opensvgfile extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  async uploadfile() {
    APP_STORAGE.importdevs.set_SchemeSvg(APP_STORAGE.auth_form.getdt());
    var element = document.createElement("div");
    element.id = "svg";
    document.getElementsByClassName("svg-container")[0].innerHTML = "";
    document.getElementsByClassName("svg-container")[0].appendChild(element);
    var newSvg = document.getElementById("svg");
    newSvg.outerHTML = APP_STORAGE.importdevs.getSvg();
    APP_STORAGE.importdevs.setOpenModalSvg(false);
    var hrefs = document.getElementsByClassName("well");

    for (let i in hrefs) {
      hrefs.item(Number(i)).addEventListener("mouseout", function (e) {
        e.preventDefault(); /*use if you want to prevent the original link following action*/
        var tooltip = document.getElementById("tooltip");
        tooltip.style.display = "none";
      });

      hrefs.item(Number(i)).addEventListener("mousemove", function (e) {
        e.preventDefault(); /*use if you want to prevent the original link following action*/

        for (var j in APP_STORAGE.devs.getChangeSensors2()) {
          if (
            String(hrefs[i].id) ===
            String(APP_STORAGE.devs.getChangeSensors2()[j].id)
          ) {
            var clientRectangle = document
              .getElementById(hrefs[i].id)
              .getBoundingClientRect();
            let tooltip = document.getElementById("tooltip");
            tooltip.innerHTML =
              "Номер косы" +
              "-" +
              APP_STORAGE.devs.getChangeSensors2()[j].number;
            tooltip.style.display = "block";
            tooltip.style.left = clientRectangle.left + "px";
            tooltip.style.top = clientRectangle.top + "px";
          }
        }
      });

      hrefs.item(Number(i)).addEventListener("click", function (e) {
        e.preventDefault(); /*use if you want to prevent the original link following action*/

        for (var j in APP_STORAGE.devs.getChangeSensors2()) {
          if (
            String(hrefs[i].id) ===
            String(APP_STORAGE.devs.getChangeSensors2()[j].id)
          ) {
            APP_STORAGE.devs.setIdChild("_dev_id_key_" + hrefs[i].id);
            APP_STORAGE.sensors.setEmptySession("");
            APP_STORAGE.sensors.setSessFirstLast([]);
            APP_STORAGE.sensors.setSessFirstLastCharts([]);
            APP_STORAGE.sensors.setSess_first([]);
            APP_STORAGE.sensors.setSess_second([]);
            APP_STORAGE.sensors.setSortDesc("");
            APP_STORAGE.sensors.setAkbSessChose("");
            APP_STORAGE.sensors.setChoseSessTime("");
            APP_STORAGE.sensors.setAkbSessLast("");
            APP_STORAGE.devs_groups.setMiddleForm(2);

            APP_STORAGE.devs.setTopMenuDev("top_menu-1");
          }
        }
      });
    }
  }

  private _handleFile = async (e: any) => {
    let fileToUpload = e.target.files[0];
    var xlinkNS = "http://www.w3.org/1999/xlink";
    //Show image preview
    let reader = new FileReader();
    reader.onload = (event: any) => {
      var svg = atob(
        event.target.result.replace(/data:image\/svg\+xml;base64,/, "")
      ); ///// SVG
      // var doc = new DOMParser().parseFromString(svg, "text/xml");
      APP_STORAGE.importdevs.setSvg(svg);
    };
    reader.readAsDataURL(fileToUpload);

    ///setTimeout(() => this.uploadfile(), 500);
  };

  async onClose() {
    APP_STORAGE.importdevs.setOpenModalSvg(false);
  }

  render(): React.ReactNode {
    return (
      <React.Fragment>
        <Dialog
          BackdropProps={{ style: { background: "rgba(0 0 0 / 12%)" } }}
          open={APP_STORAGE.importdevs.getOpenModalSvg()}
          fullWidth
        >
          <Box>
            <Box
              className="ModalTitle"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                m: "12px"
              }}
            >
              <Typography>Загрузить схему расположения</Typography>

              <CloseIcon
                sx={{ color: "#1976D2" }}
                onClick={() => {
                  this.onClose();
                }}
              />
            </Box>
            <Divider sx={{ m: "20px 20px" }} />
            <Box sx={{ display: "flex", alignItems: "center" }}></Box>

            <form className="form-container">
              <div className="upload-files-container">
                <div className="drag-file-area">
                  {/* <span className="material-icons-outlined upload-icon">  </span> */}

                  <label className="label">
                    {" "}
                    <span className="browse-files">
                      <input
                        onInput={e => this._handleFile(e)}
                        type="file"
                        id="fileInput"
                        className="default-file-input"
                      />
                      <Box sx={{ display: "flex" }}>
                        <Box sx={{ display: "flex" }}>
                          <Typography
                            sx={{ color: "#1976D2", fontWeight: "600" }}
                          >
                            {" "}
                            выберите файл (SVG)
                          </Typography>
                        </Box>{" "}
                        <Typography sx={{ pl: "4px" }}>с устройства</Typography>
                      </Box>
                    </span>{" "}
                  </label>
                </div>

                {/* <button type="button" className="upload-button" onClick={() => (this.uploadfile())}> Загрузить файл </button> */}
                <Button onClick={() => this.uploadfile()} variant="contained">
                  {" "}
                  Сохранить
                </Button>
                {/* 
                <Box
                  sx={{
                    m: "8px",
                    background: "#eee",
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "4px",
                    p: "8px"
                  }}
                ></Box> */}
              </div>
            </form>
          </Box>
        </Dialog>
      </React.Fragment>
    );
  }
}
