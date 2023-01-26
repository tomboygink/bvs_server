import React from "react";
import { observer } from "mobx-react";

import {
  Box,
  Alert,
  Typography,
  TextField,
  Divider,
  TextareaAutosize,
} from "@mui/material";
import { APP_STORAGE } from "../../../storage/AppStorage";
import { WidthFull } from "@mui/icons-material";

import LongMenu from "./Menu";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";

import { TDevsGroup } from "../../../storage/components/DevEntityes";
import { TDGroup } from "../../../storage/components/DevEntityes";
import { TDevice } from "../../../storage/components/DevEntityes";

// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

interface IProps {}

//Устройства
@observer
export class DevLocation extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  async OpenModal(e: any) {
    alert(e)
    APP_STORAGE.devs_groups.setParentId(e);
    APP_STORAGE.devs_groups.setOpenModal(true);
    APP_STORAGE.reg_user.get_Org("sess_id", APP_STORAGE.auth_form.getdt()); /// получаем все организации
  }

  drawDevGroup(dgrs: TDevsGroup[]): React.ReactNode[] {
    var parent: React.ReactNode[] = new Array();

    for (var ii in dgrs) {
      var dgr: TDevsGroup = dgrs[ii];
      var gr: TDGroup = dgr.group;
      var gr_childs = dgr.childs;
      var gr_devs = dgr.devs;

      var childs: React.ReactNode[] = new Array();
      if (gr_childs.length > 0) childs = this.drawDevGroup(gr_childs);

      parent.push(
        <React.Fragment key={"_gr_id_key_" + gr.id}>
          <Box sx={{ display: "flex" }}>
            <Box id={String(gr.id)}>{childs}</Box>
          </Box>
        </React.Fragment>
      );

      if (APP_STORAGE.devs.getIdDevs() === String(gr.id)) {
        parent.push(
          <React.Fragment key={String(gr.id)}>
            <Box
              sx={{
                width: "1100px;",
                background: "#fff",
                p: "25px",
                borderRadius: "4px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                mb: "16px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography sx={{ fontWeight: "500", fontSize: "22px" }}>
                    {gr.g_name}
                  </Typography>
                  <Typography sx={{ fontSize: "12px", color: "grey" }}>
                    Место расположения устройства
                  </Typography>
                </Box>

                <LongMenu />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  borderRadius: "4px",
                  flexDirection: "column",
                }}
              >
                <TextField
                  variant="outlined"
                  margin="normal"
                  size="small"
                  required
                  fullWidth
                  id="Долгота"
                  label="Долгота"
                  autoFocus
                  ///onChange={ (e)=>{ APP_STORAGE.auth_form.setLogin(e.target.value); } }
                  value={gr.longitude}
                />

                <TextField
                  variant="outlined"
                  margin="normal"
                  size="small"
                  required
                  fullWidth
                  id="Широта"
                  label="Широта"
                  autoFocus
                  ///onChange={ (e)=>{ APP_STORAGE.auth_form.setLogin(e.target.value); } }
                  value={gr.latitude}
                />
              </Box>

              <Box sx={{ display: "flex" }}>
                <Box
                  sx={{
                    background: "#4891FF",
                    width: "180px",
                    color: "#fff",
                    p: "4px",
                    borderRadius: "4px",
                  }}
                  onClick={() => this.OpenModal(APP_STORAGE.devs.getIdDevs())}
                >
                  <Box sx={{ display: "flex" }}>
                    {" "}
                    <AddLocationAltIcon
                      fontSize="small"
                      sx={{
                        background: "#73ABFF",
                        p: "4px",
                        borderRadius: "4px",
                        color: "#fff",
                        mr: "4px",
                      }}
                    />
                    <Typography sx={{ alignSelf: "center" }}>
                      {" "}
                      Добавить
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </React.Fragment>
        );
      }
    }
    return parent;
  }

  drawDevLocation(): React.ReactNode {
    let devs_g = [];
    let DevGr = [];

    if (
      Object.keys(
        JSON.parse(JSON.stringify(APP_STORAGE.devs_groups.getDevsGroups()))
      ).length !== 0 &&
      JSON.parse(JSON.stringify(APP_STORAGE.devs_groups.getDevsGroups()))
        .constructor === Object
    ) {
      devs_g = JSON.parse(
        JSON.stringify(APP_STORAGE.devs_groups.getDevsGroups())
      );
    }

    for (var key in devs_g) {
      if (devs_g.hasOwnProperty(key)) {
        let a = devs_g[key];
        let root = JSON.parse(a);

        if (root.childs.length > 0) {
          for (let i = 0; i < root.childs.length; i++) {
            DevGr.push(root.childs[i]);
          }
        }
      }
    }

    return this.drawDevGroup(DevGr);
  }

  render(): React.ReactNode {
    return (
      <React.Fragment>
        <Box
          className="wrapper-devs"
          sx={{
            mt: "44px",
            display: "flex",
            flexDirection: "column;",
            alignItems: "flex-start;",
            ml: "1rem",
          }}
        >
          <Typography sx={{ fontWeight: "500", pb: "20px" }}>
            Расположение устройств
          </Typography>
          <Box
            sx={{
              width: "1100px;",
              background: "#fff",
              p: "25px",
              borderRadius: "4px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              mb: "16px",
            }}
          >
            <Box
              sx={{
                color: "#000",
                width: "180px",
                p: "3px",
                pl: "20px",
                borderRadius: "4px",
              }}
              onClick={() => this.OpenModal('0')}
            >
              <Typography> Добавить новое </Typography>
            </Box>
          </Box>
          {this.drawDevLocation()}
        </Box>
      </React.Fragment>
    );
  }
}
