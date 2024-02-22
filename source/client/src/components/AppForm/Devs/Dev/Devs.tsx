import * as React from "react";
import { observer } from "mobx-react";
import { CONFIG } from "../../../../../../xcore/config";

import { APP_STORAGE } from "../../../../storage/AppStorage";

import {
  Box,
  Typography,
  TextField,
  Link,
  TextareaAutosize,
  Stack,
} from "@mui/material";

import { TDevsGroup } from "../../../../storage/components/Devs/DevEntityes";
import { TDGroup } from "../../../../storage/components/Devs/DevEntityes";

import IconButton from "@mui/material/IconButton";

import DirectionsIcon from "@mui/icons-material/Directions";
import { MenuDevs } from "./Menu/MenuDevs";

import Collapse from "@mui/material/Collapse";
import { LeafletMap } from "./Map";
import { TextInput } from "../../../shared/TextInput";
import LatInput from "../../../shared/LatInput";
import LongInput from "../../../shared/LongInput";

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

                    <Stack sx={{ width: "100%" }} spacing={2}>
                      <Collapse in={false} timeout="auto" unmountOnExit />
                      <TextInput
                        label="Место расположения"
                        value={gr.g_name || ""}
                      />

                      <TextInput
                        label="Название устройства"
                        value={gr_devs[key].name || ""}
                      />

                      <TextInput
                        label="Номер устройства"
                        value={gr_devs[key].number || ""}
                      />
                      <Stack spacing={2} direction="row">
                        <TextInput
                          fullWidth={false}
                          label="Долгота"
                          value={gr_devs[key].longitude.trim() || ""}
                        />

                        <TextInput
                          fullWidth={false}
                          label="Широта"
                          value={gr_devs[key].latitude.trim() || ""}
                        />
                        <Link
                          underline="hover"
                          href={`http://${CONFIG.host}:${
                            CONFIG.port
                          }/show-map?lat=${latitude.trim()}&lng=${longitude.trim()}`}
                          target="_blank"
                          sx={{
                            fontSize: "1rem",
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "row-reverse",
                          }}
                        >
                          Показать на карте (на отдельной странице)
                          <DirectionsIcon />
                        </Link>
                      </Stack>
                    </Stack>

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

                    <Stack sx={{ width: "100%" }} spacing={2}>
                      <Collapse in={false} timeout="auto" unmountOnExit />

                      <TextInput
                        label="Место расположения"
                        value={gr.g_name || ""}
                      />

                      <TextInput
                        label="Название устройства"
                        value={gr_devs[key].name || ""}
                      />

                      <TextInput
                        label="Номер устройства"
                        value={gr_devs[key].number || ""}
                      />
                      <Stack spacing={2} direction="row">
                        <TextInput
                          label="Долгота"
                          value={gr_devs[key].longitude.trim() || ""}
                          fullWidth={false}
                        />

                        <TextInput
                          label="Широта"
                          value={gr_devs[key].latitude.trim() || ""}
                          fullWidth={false}
                        />
                        <Link
                          underline="hover"
                          href={`http://${CONFIG.host}:${
                            CONFIG.port
                          }/show-map?lat=${latitude.trim()}&lng=${longitude.trim()}`}
                          target="_blank"
                          sx={{
                            fontSize: "1rem",
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "row-reverse",
                          }}
                        >
                          Показать на карте (на отдельной странице)
                          <DirectionsIcon />
                        </Link>
                      </Stack>
                    </Stack>

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
