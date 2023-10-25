import * as React from "react";
import { observer } from "mobx-react";
import { CONFIG } from "../../../../../../xcore/config";

import { APP_STORAGE } from "../../../../storage/AppStorage";

import {
  Box,
  Typography,
  TextField,
  Link,
  TextareaAutosize
} from "@mui/material";

import { TDevsGroup } from "../../../../storage/components/Devs/DevEntityes";
import { TDGroup } from "../../../../storage/components/Devs/DevEntityes";

import IconButton from "@mui/material/IconButton";

import DirectionsIcon from "@mui/icons-material/Directions";
import { MenuDevs } from "./Menu/MenuDevs";

import Collapse from "@mui/material/Collapse";
import { LeafletMap } from "./Map";

interface IProps {}

interface IState {
  dev_number: any;
  dev_id: any;
}

@observer
export class Devs extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  async setDevNumber(a: any, id: any, dev: boolean, time_dev: string) {
    APP_STORAGE.sensors.setNumber(a);
    APP_STORAGE.sensors.setIdDev(id);
    APP_STORAGE.sensors.setDeletedDev(dev);
    if (time_dev !== "") {
      let otherDate = new Date(time_dev);
      let nowDate = new Date();
      let delta = nowDate.getTime() - otherDate.getTime();

      var passedDay = Math.floor(delta / 1000 / 60 / 60 / 24);
    }
    APP_STORAGE.devs.setPassedDay(String(passedDay));
  }

  drawDevs(dgrs: TDevsGroup[]): React.ReactNode[] {
    let dev_number: any = 0;
    let dev_id: any = 0;
    let del: any = Boolean;
    let time_dev: string = "";
    let period_ses: number = 0;
    var dev = APP_STORAGE.devs;
    var devs: React.ReactNode[] = new Array();
    for (var ii in dgrs) {
      var dgr: TDevsGroup = dgrs[ii];
      var gr: TDGroup = dgr.group;
      var gr_childs = dgr.childs;
      var gr_devs = dgr.devs;

      for (var key in gr_devs) {
        ///////////////////////////////////////////////// Все устройства
        if ("_dev_id_key_" + gr_devs[key].id === dev.getIdChild()) {
          dev_number = gr_devs[key].number;
          dev_id = gr_devs[key].id;
          del = gr_devs[key].deleted;
          period_ses = gr_devs[key].period_sess;
          time_dev = gr_devs[key].time;

          let longitude = gr_devs[key].longitude;
          let latitude = gr_devs[key].latitude;

          setTimeout(() => {
            this.setDevNumber(dev_number, dev_id, del, time_dev);
          }, 0);

          setTimeout(() => {
            APP_STORAGE.sensors.get_DevFirstLastSessions(
              "sess_id",
              APP_STORAGE.auth_form.getdt()
            );
            APP_STORAGE.sensors.get_DevPovs(APP_STORAGE.auth_form.getdt());
            APP_STORAGE.devs.setPeriodSess(period_ses);
          }, 0);

          if (gr_devs[key].deleted === true) {
            devs.push(
              <React.Fragment key={"_gr_id_key_" + gr_devs[key].id}>
                {APP_STORAGE.devs.getTopMenuDev() === "top_menu-1" && (
                  <>
                    <Box
                      className="right_wrapper_dev"
                      sx={{ display: "flex", flexDirection: "row-reverse" }}
                    >
                      {APP_STORAGE.getRoleWrite() === 2 &&
                        APP_STORAGE.getRoleRead() === 1 && <MenuDevs />}
                    </Box>

                    <Box sx={{ width: "100%" }}>
                      <Collapse in={false} timeout="auto" unmountOnExit />
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
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start"
                        }}
                      >
                        <TextField
                          sx={{ pt: "0px", mt: "4px", mr: "16px" }}
                          className="box_info"
                          inputProps={{ style: { fontSize: 12 } }}
                          InputLabelProps={{ style: { fontSize: 12 } }}
                          variant="outlined"
                          margin="normal"
                          label="Долгота"
                          size="small"
                          value={gr_devs[key].longitude.trim() || ""}
                        />

                        <TextField
                          sx={{ pt: "0px", mt: "4px", mr: "16px" }}
                          inputProps={{ style: { fontSize: 12 } }}
                          InputLabelProps={{ style: { fontSize: 12 } }}
                          variant="outlined"
                          label="Широта"
                          margin="normal"
                          size="small"
                          value={gr_devs[key].latitude.trim() || ""}
                        />
                        <Link
                          sx={{
                            fontSize: "1rem",
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "row-reverse"
                          }}
                          onClick={() => {
                            window.open(
                              `http://${CONFIG.host}:${CONFIG.port}/show-map?lat=` +
                                latitude.trim() +
                                "&lng=" +
                                longitude.trim()
                            );
                          }}
                        >
                          Показать на карте (на отдельной странице)
                          <IconButton
                            color="primary"
                            sx={{ p: "0px" }}
                            aria-label="directions"
                          >
                            <DirectionsIcon />
                          </IconButton>
                        </Link>
                      </Box>
                    </Box>

                    <TextareaAutosize
                      className="info"
                      aria-label="minimum height"
                      minRows={4}
                      style={{ width: "100%", marginTop: "12px" }}
                      value={gr_devs[key].info || ""}
                    />
                    {APP_STORAGE.devs.setLongitude && (
                      <Box sx={{ height: "400px", width: "100%" }}>
                        <LeafletMap longitude={longitude} latitude={latitude} />
                        {/* <MapStations latlons={[]}/> */}
                      </Box>
                    )}
                  </>
                )}
              </React.Fragment>
            );
          }
          /////////////////////////// Устройство  `` действующее ( deleted - false)
          if (gr_devs[key].deleted === false) {
            devs.push(
              <React.Fragment key={"_gr_id_key_" + gr_devs[key].id}>
                {APP_STORAGE.devs.getTopMenuDev() === "top_menu-1" && (
                  <>
                    <Box
                      className="right_wrapper_dev"
                      sx={{ display: "flex", flexDirection: "row-reverse" }}
                    >
                      {APP_STORAGE.getRoleWrite() === 2 &&
                        APP_STORAGE.getRoleRead() === 1 && <MenuDevs />}
                    </Box>

                    <Box sx={{ width: "100%" }}>
                      <Collapse in={false} timeout="auto" unmountOnExit />
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
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start"
                        }}
                      >
                        <TextField
                          sx={{ pt: "0px", mt: "4px", mr: "16px" }}
                          className="box_info"
                          inputProps={{ style: { fontSize: 12 } }}
                          InputLabelProps={{ style: { fontSize: 12 } }}
                          variant="outlined"
                          margin="normal"
                          label="Долгота"
                          size="small"
                          value={gr_devs[key].longitude.trim() || ""}
                        />

                        <TextField
                          sx={{ pt: "0px", mt: "4px", mr: "16px" }}
                          inputProps={{ style: { fontSize: 12 } }}
                          InputLabelProps={{ style: { fontSize: 12 } }}
                          variant="outlined"
                          label="Широта"
                          margin="normal"
                          size="small"
                          value={gr_devs[key].latitude.trim() || ""}
                        />
                        <Link
                          sx={{
                            fontSize: "1rem",
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "row-reverse"
                          }}
                          onClick={() => {
                            window.open(
                              `http://${CONFIG.host}:${CONFIG.port}/show-map?lat=` +
                                latitude.trim() +
                                "&lng=" +
                                longitude.trim()
                            );
                          }}
                        >
                          Показать на карте (на отдельной странице)
                          <IconButton
                            color="primary"
                            sx={{ p: "0px" }}
                            aria-label="directions"
                          >
                            <DirectionsIcon />
                          </IconButton>
                        </Link>
                      </Box>
                    </Box>

                    <TextareaAutosize
                      className="info"
                      aria-label="minimum height"
                      minRows={4}
                      style={{ width: "100%", marginTop: "12px" }}
                      value={gr_devs[key].info || ""}
                    />
                    {APP_STORAGE.devs.setLongitude && (
                      <Box sx={{ height: "400px", width: "100%" }}>
                        <LeafletMap longitude={longitude} latitude={latitude} />
                        {/* <MapStations latlons={[]}/> */}
                      </Box>
                    )}
                  </>
                )}
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
    return <>{this.drawDevsFunction()}</>;
  }
}
