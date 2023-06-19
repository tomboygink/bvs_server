import * as React from "react";
import { observer } from "mobx-react";
import { APP_STORAGE } from "../../../storage/AppStorage";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { toJS } from "mobx";
import { Box , Divider  } from "@mui/material";
import { Charts } from "./SvgWell";
import { CustomTooltip, customizedGroupTick } from "./recharts";

interface IProps {}

@observer
export class DevSessCharts extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  render(): React.ReactNode {
    if (toJS(APP_STORAGE.sensors.getdataCharts()).length) {
      let tick_yaxis = [];
      let tick_xaxis = [];
      let mintick_y = null;
      let maxtick_y = null;
      let filtered = [];

      let mintick_x = null;
      let maxtick_x = null;

      for (var i in APP_STORAGE.sensors.getdataCharts()) {
        tick_yaxis.push(APP_STORAGE.sensors.getdataCharts()[i].depth);

        tick_xaxis.push(
          APP_STORAGE.sensors.getdataCharts()[i].data_f,
          APP_STORAGE.sensors.getdataCharts()[i].data_s
        );
      }

      if (tick_yaxis.length) {
        maxtick_y = tick_yaxis[tick_yaxis.length - 1];
        mintick_y = tick_yaxis[0];
      }

      if (tick_xaxis.sort().length) {
        filtered = tick_xaxis.sort().filter(function (x) {
          return x !== undefined;
        });
        maxtick_x = filtered[filtered.sort().length - 1];
        mintick_x = filtered.sort()[0];
      }

      let uniqueChars: number[] = [];
      filtered.sort().forEach((element) => {
        if (!uniqueChars.includes(element)) {
          uniqueChars.push(element);
        }
      });

      return (
        <Box
        className="container_charts"
        sx={{
          background: "#fff",
          borderTopLeftRadius: "48px",
          border: "1px solid #eee"
        }}
      >
  <Charts/>

          <ResponsiveContainer className="item-2" width="100%">
            <LineChart
              className="LineChart"
              layout="vertical"
              data={toJS(APP_STORAGE.sensors.getdataCharts())}>
              <CartesianGrid strokeDasharray="2 2" />
              <XAxis 
                type="number"
                strokeWidth={"0.1mm"}
                stroke="rgb(23 21 21)"
                tickCount={19}
                tick={{ fill: "#266BF1", fontSize: "14px" }}
                domain={[-15, 15]}
              />
              <YAxis
                interval={0}
                ticks={tick_yaxis}
                domain={[Number(mintick_y), Number(maxtick_y)]}
                dataKey="depth"
                type="number"
                strokeWidth={"0.1mm"}
                stroke="rgb(255 255 255 / 0%)"
                tick={customizedGroupTick}
              />
              {/* <YAxis data ={toJS(APP_STORAGE.sensors.getSessFirstLast())}  type="category"  stroke="#266BF1"  tickCount={60}   />  */}
              <Tooltip content={<CustomTooltip />} />
              {/* <Legend /> */}

              <Line
                data={toJS(APP_STORAGE.sensors.getSess_middle())}
                strokeWidth={"2"}
                dataKey="град."
                stroke="#FE6F4F"
              >
                {" "}
              </Line>
              <Line
                data={toJS(APP_STORAGE.sensors.getSess_second())}
                strokeWidth={"2"}
                dataKey="data_s"
                stroke="#9566FB"
              />
              <Line
                data={toJS(APP_STORAGE.sensors.getSess_first())}
                strokeWidth={"2"}
                dataKey="data_f"
                stroke="#00B394"
              />
              {/* <Line dataKey="град." stroke="#82ca9d" > <LabelList content={<CustomizedLabel />} /> </Line> */}
            </LineChart>
          </ResponsiveContainer>
        </Box>
      );
    }

    if (
      !toJS(APP_STORAGE.sensors.getdataCharts()).length &&
      toJS(APP_STORAGE.sensors.getSessFirstLast().length)
    ) {
      let tick_yaxis = [];
      let tick_xaxis = [];
      let mintick_y = null;
      let maxtick_y = null;
      let filtered = [];

      let mintick_x = null;
      let maxtick_x = null;

      for (var i in APP_STORAGE.sensors.getSessFirstLast()) {
        tick_yaxis.push(APP_STORAGE.sensors.getSessFirstLast()[i].depth);
        // mintick = APP_STORAGE.sensors.getSessFirstLast()[i].depth[0];
        // maxtick = APP_STORAGE.sensors.getSessFirstLast()[i].depth[-1];

        tick_xaxis.push(
          APP_STORAGE.sensors.getSessFirstLast()[i].data_f,
          APP_STORAGE.sensors.getSessFirstLast()[i].data_s
        );
      }

      if (tick_yaxis.length) {
        maxtick_y = tick_yaxis[tick_yaxis.length - 1];
        mintick_y = tick_yaxis[0];
      }

      if (tick_xaxis.sort().length) {
        filtered = tick_xaxis.sort().filter(function (x) {
          return x !== undefined;
        });
        maxtick_x = filtered[filtered.sort().length - 1];
        mintick_x = filtered.sort()[0];
      }

      let uniqueChars: number[] = [];
      filtered.sort().forEach((element) => {
        if (!uniqueChars.includes(element)) {
          uniqueChars.push(element);
        }
      });

      if (maxtick_y !== null && mintick_y !== null) {
        return (
          <Box
            className="container_charts"
            sx={{
              background: "#fff",
              borderTopLeftRadius: "48px",
              border: "1px solid #eee"
            }}
          >
 <Charts/>

 {/* < Box className="item-3" /> */}

            <ResponsiveContainer className="item-2" width="100%">
              <LineChart
                layout="vertical"
                data={toJS(APP_STORAGE.sensors.getSessFirstLast())}
                // margin={{
                //   top: 20,
                //   right: 20,
                //   left: 20,
                //   bottom: 5,
                // }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  type="number"
                  strokeWidth={"0.1mm"}
                  stroke="rgb(255 255 255 / 0%)"
                  tickCount={27}
                  tick={{ fill: "#7F00FF", fontSize: "14px" }}
                  domain={[-15, 15]}
                />

                <YAxis
                  ticks={tick_yaxis}
                  interval={0}
                  domain={[Number(mintick_y), Number(maxtick_y)]}
                  dataKey="depth"
                  type="number"
                  strokeWidth={"0.1mm"}
                  stroke="rgb(255 255 255 / 0%)"
                  tick={customizedGroupTick}
                  className="yAxis"
                />

                <Tooltip content={<CustomTooltip />} />
             
                {/*
            <ReferenceLine className="y7676" x="-15" stroke="red" /> */}
                {/* <Customized component={customizedGroupTick} /> */}

                <Line
                  data={toJS(APP_STORAGE.sensors.getSess_second())}
                  strokeWidth={"2"}
                  dataKey="data_s"
                  stroke="#9566FB"
                />
                <Line
                  data={toJS(APP_STORAGE.sensors.getSess_first())}
                  strokeWidth={"2"}
                  dataKey="data_f"
                  stroke="#00B394"
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        );
      }
    }

    if (
      !toJS(APP_STORAGE.sensors.getdataCharts()).length &&
      !toJS(APP_STORAGE.sensors.getSessFirstLast().length)
    ) {
      return (
        <Box
            className="container_charts"
            sx={{
              background: "#fff",
              borderTopLeftRadius: "48px",
              border: "1px solid #eee"
            }}
          >
    <Charts/>

          <ResponsiveContainer className="item-2" width="100%">
            <LineChart
              layout="vertical"
              data={toJS(APP_STORAGE.sensors.getSessFirstLast())}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                strokeWidth={"0.1mm"}
                stroke="rgb(255 255 255 / 0%)"
                tickCount={27}
                tick={{ fill: "#7F00FF", fontSize: "14px" }}
                domain={[-15, 15]}
              />

              <YAxis
                interval={0}
                ticks={[0, 10, 20, 30, 40]}
                domain={[0, 40]}
                dataKey="depth"
                type="number"
                strokeWidth={"0.1mm"}
                stroke="rgb(255 255 255 / 0%)"
                tick={customizedGroupTick}
              />

              <Tooltip content={<CustomTooltip />} />

              <Line strokeWidth={"2"} dataKey="data_s" stroke="#9566FB" />
              <Line strokeWidth={"2"} dataKey="data_f" stroke="#00B394" />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      );
    }
  }
}
