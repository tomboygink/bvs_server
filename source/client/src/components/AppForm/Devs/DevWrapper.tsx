import React from "react";
import { observer } from "mobx-react";

import { Box, Typography } from "@mui/material";
import TopPanel from "./Dev/TopPanel";
import { DevSessCharts } from "../GraphSensors/DevSessCharts";
import { Calendar } from "./Dev/Calendar";
import { DevSessWrapper } from "./TableSessByPeriod/DevSessWrapper";
import { APP_STORAGE } from "../../../storage/AppStorage";
import { SelectedSession } from "./Dev/SelectedSession";
import { CriticalityTable } from "./Dev/CriticalityTable";
// import { Devs } from "./Dev/Devs";
import { Devs } from "./Dev/DevsFC";

interface IProps {}

@observer
export class DevWrapper extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }
  render(): React.ReactNode {
    return (
      <>
        <Typography
          id="marker-up"
          sx={{ fontWeight: "600", color: "#111111", mb: "12px" }}
        >
          {" "}
          Данные по устройству{" "}
        </Typography>
        <TopPanel />
        <Box className="chart">
          <Box sx={{ mr: "22px" }} className="wrappert-devs">
            {APP_STORAGE.devs.getTopMenuDev() === "top_menu-1" && <Devs />}

            {APP_STORAGE.devs.getTopMenuDev() === "top_menu-2" && (
              <>
                <Calendar />
                <DevSessWrapper />
              </>
            )}

            {APP_STORAGE.devs.getTopMenuDev() === "top_menu-3" && (
              <CriticalityTable />
            )}

            {APP_STORAGE.devs.getTopMenuDev() === "top_menu-4" && (
              <SelectedSession />
            )}
          </Box>

          <DevSessCharts />
        </Box>
      </>
    );
  }
}
