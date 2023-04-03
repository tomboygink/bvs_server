import * as React from "react";
import { observer } from "mobx-react";
import { CONFIG } from "../../../../../xcore/config";

import { APP_STORAGE } from "../../../storage/AppStorage";

import {
  Box,
  Typography,
  TextField,
  Link, TextareaAutosize
} from "@mui/material";
import { TDevsGroup } from "../../../storage/components/Devs/DevEntityes";
import { TDGroup } from "../../../storage/components/Devs/DevEntityes";

import IconButton from "@mui/material/IconButton";

import DirectionsIcon from "@mui/icons-material/Directions";
import { MenuDevs } from "./MenuDevs";
import { Calendar } from "./Calendar";
import { DevSessCharts } from "../Sensors/DevSessCharts";
import { DevSess } from "./DevSess";
import { toJS } from "mobx";
interface IProps {}

@observer
export class Devs extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  drawDevs(dgrs: TDevsGroup[]): React.ReactNode[] {
    var dev = APP_STORAGE.devs;
    var devGr = APP_STORAGE.devs_groups;
    var devs: React.ReactNode[] = new Array();
    for (var ii in dgrs) {
      var dgr: TDevsGroup = dgrs[ii];
      var gr: TDGroup = dgr.group;
      var gr_childs = dgr.childs;
      var gr_devs = dgr.devs;

      // if(APP_STORAGE.sensors.getSessFirstLast()){
      //   console.log(toJS(APP_STORAGE.sensors.getSessFirstLast()))
      // }

      for (var key in gr_devs) {
        
        ////////////////////////////////// Все устройства
        if ("_dev_id_key_" + gr_devs[key].id === dev.getIdChild()) {
          APP_STORAGE.sensors.setNumber(gr_devs[key].number);
         
          setTimeout(() => { ///////////////////////////////////////////Функция дял орисовки графика при нажатии на устройству
            APP_STORAGE.sensors.get_DevFirstLastSessions("sess_id", APP_STORAGE.auth_form.getdt(),  gr_devs[key].number);

          }, 100);


          let longitude = gr_devs[key].longitude;
          let latitude = gr_devs[key].latitude;

          if (gr_devs[key].deleted === true) {
            devs.push(
              <React.Fragment key={"_gr_id_key_" + gr_devs[key].id}>
                <Box
                  className="wrappert-devs"
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    columnGap: "12px",
                  }}>
                  <Box>
                    <Box
                      className="right_wrapper_dev"
                      sx={{ display: "flex", flexDirection: "row-reverse" }}>
                      {APP_STORAGE.getRoleWrite() === 2 &&
                      APP_STORAGE.getRoleRead() === 1 && <MenuDevs />}
                    </Box>

                    <Box>
                      <TextField
                        disabled={true}
                        sx={{ pt: "0px", mt: "4px" }}
                        className="box_info"
                        fullWidth
                        inputProps={{ style: { fontSize: 12 } }}
                        InputLabelProps={{ style: { fontSize: 12 } }}
                        variant="outlined"
                        margin="normal"
                        label="Место расположения"
                        size="small"
                        value={gr.g_name || ""}
                      />

                      <TextField
                        disabled={true}
                        sx={{ pt: "0px", mt: "4px" }}
                        className="box_info"
                        fullWidth
                        inputProps={{ style: { fontSize: 12 } }}
                        InputLabelProps={{ style: { fontSize: 12 } }}
                        variant="outlined"
                        margin="normal"
                        size="small"
                        label="Название устройства"
                        value={gr_devs[key].name || ""}
                      />

                      <TextField
                        disabled={true}
                        sx={{ pt: "0px", mt: "4px" }}
                        className="box_info"
                        fullWidth
                        inputProps={{ style: { fontSize: 12 } }}
                        InputLabelProps={{ style: { fontSize: 12 } }}
                        variant="outlined"
                        margin="normal"
                        label="Номер устройства"
                        size="small"
                        value={gr_devs[key].number || ""}
                      />

                      <TextField
                        disabled={true}
                        sx={{ pt: "0px", mt: "4px" }}
                        className="box_info"
                        fullWidth
                        inputProps={{ style: { fontSize: 12 } }}
                        InputLabelProps={{ style: { fontSize: 12 } }}
                        variant="outlined"
                        margin="normal"
                        label="Долгота"
                        size="small"
                        value={gr_devs[key].longitude || ""}
                      />

                      <TextField
                        disabled={true}
                        sx={{ pt: "0px", mt: "4px" }}
                        fullWidth
                        inputProps={{ style: { fontSize: 12 } }}
                        InputLabelProps={{ style: { fontSize: 12 } }}
                        variant="outlined"
                        label="Широта"
                        margin="normal"
                        size="small"
                        value={gr_devs[key].latitude || ""}
                      />
                    </Box>

                    <Link
                      sx={{
                        color: '#808080',
                        fontSize: "1rem",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row-reverse",
                      }}
                      onClick={() => {
                        window.open(
                          `http://${CONFIG.host}:${CONFIG.port}/show-map?lng=` +
                            longitude +
                            "&lat=" +
                            latitude
                        );
                      }}> Показать на карте
                      <IconButton
                        color="primary"
                        sx={{ p: "0px" , color: '#808080'}}
                        aria-label="directions"
                      >
                        <DirectionsIcon />
                      </IconButton>

                    </Link>
                    <TextareaAutosize
                      disabled={true}
                      className="info"
                      aria-label="minimum height"
                      minRows={4}
                      style={{ width: "100%", marginTop: "12px" }}
                      value={gr_devs[key].info || ""}
                    />
                    <Calendar />
                    <DevSess />
                  </Box>
                  <DevSessCharts />
                </Box>
              </React.Fragment>
            );
          }
          /////////////////////////// Устройство  `` действующее ( deleted - false)
          if (gr_devs[key].deleted === false) {
            devs.push(
              <React.Fragment key={"_gr_id_key_" + gr_devs[key].id}>
                <Box
                  className="wrappert-devs"
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    columnGap: "12px",
                  }}
                >
                  <Box>
                    <Box
                      className="right_wrapper_dev"
                      sx={{ display: "flex", flexDirection: "row-reverse" }}
                    >
          

                      {APP_STORAGE.getRoleWrite() === 2 &&
                        APP_STORAGE.getRoleRead() === 1 && <MenuDevs />}
                    </Box>

                    <Box>
                      <TextField
                        sx={{ pt: "0px", mt: "4px" }}
                        className="box_info"
                        fullWidth
                        inputProps={{ style: { fontSize: 12 } }}
                        InputLabelProps={{ style: { fontSize: 12 } }}
                        variant="outlined"
                        margin="normal"
                        label="Место расположения"
                        size="small"
                        value={gr.g_name || ""}
                      />

                      <TextField
                        sx={{ pt: "0px", mt: "4px" }}
                        className="box_info"
                        fullWidth
                        inputProps={{ style: { fontSize: 12 } }}
                        InputLabelProps={{ style: { fontSize: 12 } }}
                        variant="outlined"
                        margin="normal"
                        size="small"
                        label="Название устройства"
                        value={gr_devs[key].name || ""}
                      />

                      <TextField
                        sx={{ pt: "0px", mt: "4px" }}
                        className="box_info"
                        fullWidth
                        inputProps={{ style: { fontSize: 12 } }}
                        InputLabelProps={{ style: { fontSize: 12 } }}
                        variant="outlined"
                        margin="normal"
                        label="Номер устройства"
                        size="small"
                        value={gr_devs[key].number || ""}
                      />

                      <TextField
                        sx={{ pt: "0px", mt: "4px" }}
                        className="box_info"
                        fullWidth
                        inputProps={{ style: { fontSize: 12 } }}
                        InputLabelProps={{ style: { fontSize: 12 } }}
                        variant="outlined"
                        margin="normal"
                        label="Долгота"
                        size="small"
                        value={gr_devs[key].longitude || ""}
                      />

                      <TextField
                        sx={{ pt: "0px", mt: "4px" }}
                        fullWidth
                        inputProps={{ style: { fontSize: 12 } }}
                        InputLabelProps={{ style: { fontSize: 12 } }}
                        variant="outlined"
                        label="Широта"
                        margin="normal"
                        size="small"
                        value={gr_devs[key].latitude || ""}
                      />
                    </Box>

                    <Link
                      sx={{
                        fontSize: "1rem",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row-reverse",
                      }}
                      onClick={() => {
                        window.open(
                          `http://${CONFIG.host}:${CONFIG.port}/show-map?lng=` +
                            longitude +
                            "&lat=" +
                            latitude
                        );
                      }}
                    >
                      Показать на карте
                      <IconButton
                        color="primary"
                        sx={{ p: "0px" }}
                        aria-label="directions"
                      >
                        <DirectionsIcon />
                      </IconButton>
                    </Link>
                    <TextareaAutosize
                      className="info"
                      aria-label="minimum height"
                      minRows={4}
                      style={{ width: "100%", marginTop: "12px" }}
                      value={gr_devs[key].info || ""}
                    />
                    <Calendar />
                    <DevSess />
                  </Box>
                  <DevSessCharts />
                </Box>
              </React.Fragment>
            );
          }
        }
      }
      var childs: React.ReactNode[] = new Array();
      if (gr_childs.length > 0) childs = this.drawDevs(gr_childs);
      devs.push(childs);
    }
    return devs;
  }
  drawDevsFunction(): React.ReactNode {
    let Dev: any;
    Dev = APP_STORAGE.devs_groups.getDevsGroups();
    return this.drawDevs(Dev); 
  }
  render(): React.ReactNode {

   
    return (
      <>
        <Typography sx={{ fontWeight: "500", color: "#111111", mb: "8px" }}>
          {" "}
          Данные по устройству{" "}
        </Typography>

        {this.drawDevsFunction()}
      </>
    );
  }
}
