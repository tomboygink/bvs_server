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
import { Box } from "@mui/material";

import { CustomTooltip, customizedGroupTick } from "./../Devs/StyledMua";

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
          background: "#f1f5fcb3",
          borderTopLeftRadius: "48px",
          border: "1px solid #8F9DCE"
        }}
      >
               <svg width="51" className="item-1" height="732" viewBox="0 0 51 732" fill="none" xmlns="http://www.w3.org/2000/svg">
<line x1="31.6091" y1="87.0087" x2="50.2144" y2="63.6882" stroke="#BABBBD"/>
<line x1="31.6091" y1="80.0087" x2="50.2144" y2="56.6882" stroke="#BABBBD"/>
<line x1="31.6216" y1="71.6732" x2="50.6216" y2="49.6732" stroke="#BABBBD"/>
<line x1="31.6216" y1="64.6732" x2="50.6216" y2="42.6732" stroke="#BABBBD"/>
<line x1="31.6216" y1="57.6732" x2="50.6216" y2="35.6732" stroke="#BABBBD"/>
<line x1="31.6216" y1="50.6732" x2="50.6216" y2="28.6732" stroke="#BABBBD"/>
<line x1="31.6204" y1="42.6746" x2="49.6204" y2="21.6746" stroke="#BABBBD"/>
<line x1="31.6204" y1="35.6746" x2="43.6204" y2="21.6746" stroke="#BABBBD"/>
<line x1="31.6" y1="29.7" x2="37.6" y2="21.7" stroke="#BABBBD"/>
<path d="M31.6418 92.7143L50.5449 69.7551" stroke="#BABBBD"/>
<line x1="31.6216" y1="98.6732" x2="50.6216" y2="76.6732" stroke="#BABBBD"/>
<line x1="31.6091" y1="106.009" x2="50.2144" y2="82.6882" stroke="#BABBBD"/>
<line x1="31.6091" y1="113.009" x2="50.2144" y2="89.6882" stroke="#BABBBD"/>
<line x1="31.6124" y1="119.005" x2="50.6124" y2="95.6842" stroke="#BABBBD"/>
<line x1="31.606" y1="126.013" x2="50.606" y2="101.692" stroke="#BABBBD"/>
<line x1="31.606" y1="132.013" x2="50.606" y2="107.692" stroke="#BABBBD"/>
<line x1="34.6096" y1="133.688" x2="50.6096" y2="113.688" stroke="#BABBBD"/>
<line x1="11.6464" y1="133.646" x2="19.6464" y2="125.646" stroke="#BABBBD"/>
<line x1="5.64645" y1="133.646" x2="19.6464" y2="119.646" stroke="#BABBBD"/>
<line x1="0.656128" y1="131.637" x2="19.6561" y2="113.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="124.637" x2="19.6561" y2="106.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="124.637" x2="19.6561" y2="106.637" stroke="#BABBBD"/>
<path d="M0.5 118L19.5 100" stroke="#BABBBD"/>
<line x1="0.656128" y1="111.637" x2="19.6561" y2="93.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="104.637" x2="19.6561" y2="86.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="96.637" x2="19.6561" y2="78.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="89.637" x2="19.6561" y2="71.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="81.637" x2="19.6561" y2="63.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="74.637" x2="19.6561" y2="56.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="66.637" x2="19.6561" y2="48.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="58.637" x2="19.6561" y2="40.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="50.637" x2="19.6561" y2="32.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="43.637" x2="19.6561" y2="25.637" stroke="#BABBBD"/>
<line x1="0.646447" y1="36.6464" x2="15.6464" y2="21.6464" stroke="#BABBBD"/>
<line x1="0.646447" y1="30.6464" x2="9.64645" y2="21.6464" stroke="#BABBBD"/>
<line x1="39.5968" y1="133.704" x2="50.5968" y2="118.704" stroke="#BABBBD"/>
<line x1="43.6053" y1="133.693" x2="50.6053" y2="124.693" stroke="#BABBBD"/>
<g filter="url(#filter0_b_107_2)">
<path d="M4 0.5H47C48.933 0.5 50.5 2.067 50.5 4V130C50.5 131.933 48.933 133.5 47 133.5H4C2.067 133.5 0.5 131.933 0.5 130V4C0.5 2.067 2.067 0.5 4 0.5Z" stroke="#BABBBD"/>
</g>
<line x1="25.5" y1="21" x2="25.5" y2="719" stroke="#BABBBD"/>
<line x1="0.000161029" y1="21.5" x2="50.0001" y2="21.5161" stroke="#BABBBD"/>
<path fillRule="evenodd" clipRule="evenodd" d="M28 18.9915H23C21.3431 18.9915 20 20.3233 20 21.9662V717.034C20 718.677 21.3431 720.008 23 720.008H28C29.6569 720.008 31 718.677 31 717.034V21.9661C31 20.3233 29.6569 18.9915 28 18.9915ZM23 18C20.7909 18 19 19.7757 19 21.9662V717.034C19 719.224 20.7909 721 23 721H28C30.2091 721 32 719.224 32 717.034V21.9661C32 19.7757 30.2091 18 28 18H23Z" fill="#BABBBD"/>
<defs>
<filter id="filter0_b_107_2" x="-4" y="-4" width="59" height="142" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feGaussianBlur in="BackgroundImageFix" stdDeviation="2"/>
<feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_107_2"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_107_2" result="shape"/>
</filter>
</defs>
</svg>

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
              background: "#f1f5fcb3",
              borderTopLeftRadius: "48px",
              border: "1px solid #8F9DCE"
            }}
          >
 <svg width="51" className="item-1" height="732" viewBox="0 0 51 732" fill="none" xmlns="http://www.w3.org/2000/svg">
<line x1="31.6091" y1="87.0087" x2="50.2144" y2="63.6882" stroke="#BABBBD"/>
<line x1="31.6091" y1="80.0087" x2="50.2144" y2="56.6882" stroke="#BABBBD"/>
<line x1="31.6216" y1="71.6732" x2="50.6216" y2="49.6732" stroke="#BABBBD"/>
<line x1="31.6216" y1="64.6732" x2="50.6216" y2="42.6732" stroke="#BABBBD"/>
<line x1="31.6216" y1="57.6732" x2="50.6216" y2="35.6732" stroke="#BABBBD"/>
<line x1="31.6216" y1="50.6732" x2="50.6216" y2="28.6732" stroke="#BABBBD"/>
<line x1="31.6204" y1="42.6746" x2="49.6204" y2="21.6746" stroke="#BABBBD"/>
<line x1="31.6204" y1="35.6746" x2="43.6204" y2="21.6746" stroke="#BABBBD"/>
<line x1="31.6" y1="29.7" x2="37.6" y2="21.7" stroke="#BABBBD"/>
<path d="M31.6418 92.7143L50.5449 69.7551" stroke="#BABBBD"/>
<line x1="31.6216" y1="98.6732" x2="50.6216" y2="76.6732" stroke="#BABBBD"/>
<line x1="31.6091" y1="106.009" x2="50.2144" y2="82.6882" stroke="#BABBBD"/>
<line x1="31.6091" y1="113.009" x2="50.2144" y2="89.6882" stroke="#BABBBD"/>
<line x1="31.6124" y1="119.005" x2="50.6124" y2="95.6842" stroke="#BABBBD"/>
<line x1="31.606" y1="126.013" x2="50.606" y2="101.692" stroke="#BABBBD"/>
<line x1="31.606" y1="132.013" x2="50.606" y2="107.692" stroke="#BABBBD"/>
<line x1="34.6096" y1="133.688" x2="50.6096" y2="113.688" stroke="#BABBBD"/>
<line x1="11.6464" y1="133.646" x2="19.6464" y2="125.646" stroke="#BABBBD"/>
<line x1="5.64645" y1="133.646" x2="19.6464" y2="119.646" stroke="#BABBBD"/>
<line x1="0.656128" y1="131.637" x2="19.6561" y2="113.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="124.637" x2="19.6561" y2="106.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="124.637" x2="19.6561" y2="106.637" stroke="#BABBBD"/>
<path d="M0.5 118L19.5 100" stroke="#BABBBD"/>
<line x1="0.656128" y1="111.637" x2="19.6561" y2="93.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="104.637" x2="19.6561" y2="86.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="96.637" x2="19.6561" y2="78.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="89.637" x2="19.6561" y2="71.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="81.637" x2="19.6561" y2="63.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="74.637" x2="19.6561" y2="56.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="66.637" x2="19.6561" y2="48.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="58.637" x2="19.6561" y2="40.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="50.637" x2="19.6561" y2="32.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="43.637" x2="19.6561" y2="25.637" stroke="#BABBBD"/>
<line x1="0.646447" y1="36.6464" x2="15.6464" y2="21.6464" stroke="#BABBBD"/>
<line x1="0.646447" y1="30.6464" x2="9.64645" y2="21.6464" stroke="#BABBBD"/>
<line x1="39.5968" y1="133.704" x2="50.5968" y2="118.704" stroke="#BABBBD"/>
<line x1="43.6053" y1="133.693" x2="50.6053" y2="124.693" stroke="#BABBBD"/>
<g filter="url(#filter0_b_107_2)">
<path d="M4 0.5H47C48.933 0.5 50.5 2.067 50.5 4V130C50.5 131.933 48.933 133.5 47 133.5H4C2.067 133.5 0.5 131.933 0.5 130V4C0.5 2.067 2.067 0.5 4 0.5Z" stroke="#BABBBD"/>
</g>
<line x1="25.5" y1="21" x2="25.5" y2="719" stroke="#BABBBD"/>
<line x1="0.000161029" y1="21.5" x2="50.0001" y2="21.5161" stroke="#BABBBD"/>
<path fillRule="evenodd" clipRule="evenodd" d="M28 18.9915H23C21.3431 18.9915 20 20.3233 20 21.9662V717.034C20 718.677 21.3431 720.008 23 720.008H28C29.6569 720.008 31 718.677 31 717.034V21.9661C31 20.3233 29.6569 18.9915 28 18.9915ZM23 18C20.7909 18 19 19.7757 19 21.9662V717.034C19 719.224 20.7909 721 23 721H28C30.2091 721 32 719.224 32 717.034V21.9661C32 19.7757 30.2091 18 28 18H23Z" fill="#BABBBD"/>
<defs>
<filter id="filter0_b_107_2" x="-4" y="-4" width="59" height="142" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feGaussianBlur in="BackgroundImageFix" stdDeviation="2"/>
<feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_107_2"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_107_2" result="shape"/>
</filter>
</defs>
</svg>


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
              background: "#f1f5fcb3",
              borderTopLeftRadius: "48px",
              border: "1px solid #8F9DCE"
            }}
          >
          <svg width="51" className="item-1" height="732" viewBox="0 0 51 732" fill="none" xmlns="http://www.w3.org/2000/svg">
<line x1="31.6091" y1="87.0087" x2="50.2144" y2="63.6882" stroke="#BABBBD"/>
<line x1="31.6091" y1="80.0087" x2="50.2144" y2="56.6882" stroke="#BABBBD"/>
<line x1="31.6216" y1="71.6732" x2="50.6216" y2="49.6732" stroke="#BABBBD"/>
<line x1="31.6216" y1="64.6732" x2="50.6216" y2="42.6732" stroke="#BABBBD"/>
<line x1="31.6216" y1="57.6732" x2="50.6216" y2="35.6732" stroke="#BABBBD"/>
<line x1="31.6216" y1="50.6732" x2="50.6216" y2="28.6732" stroke="#BABBBD"/>
<line x1="31.6204" y1="42.6746" x2="49.6204" y2="21.6746" stroke="#BABBBD"/>
<line x1="31.6204" y1="35.6746" x2="43.6204" y2="21.6746" stroke="#BABBBD"/>
<line x1="31.6" y1="29.7" x2="37.6" y2="21.7" stroke="#BABBBD"/>
<path d="M31.6418 92.7143L50.5449 69.7551" stroke="#BABBBD"/>
<line x1="31.6216" y1="98.6732" x2="50.6216" y2="76.6732" stroke="#BABBBD"/>
<line x1="31.6091" y1="106.009" x2="50.2144" y2="82.6882" stroke="#BABBBD"/>
<line x1="31.6091" y1="113.009" x2="50.2144" y2="89.6882" stroke="#BABBBD"/>
<line x1="31.6124" y1="119.005" x2="50.6124" y2="95.6842" stroke="#BABBBD"/>
<line x1="31.606" y1="126.013" x2="50.606" y2="101.692" stroke="#BABBBD"/>
<line x1="31.606" y1="132.013" x2="50.606" y2="107.692" stroke="#BABBBD"/>
<line x1="34.6096" y1="133.688" x2="50.6096" y2="113.688" stroke="#BABBBD"/>
<line x1="11.6464" y1="133.646" x2="19.6464" y2="125.646" stroke="#BABBBD"/>
<line x1="5.64645" y1="133.646" x2="19.6464" y2="119.646" stroke="#BABBBD"/>
<line x1="0.656128" y1="131.637" x2="19.6561" y2="113.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="124.637" x2="19.6561" y2="106.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="124.637" x2="19.6561" y2="106.637" stroke="#BABBBD"/>
<path d="M0.5 118L19.5 100" stroke="#BABBBD"/>
<line x1="0.656128" y1="111.637" x2="19.6561" y2="93.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="104.637" x2="19.6561" y2="86.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="96.637" x2="19.6561" y2="78.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="89.637" x2="19.6561" y2="71.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="81.637" x2="19.6561" y2="63.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="74.637" x2="19.6561" y2="56.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="66.637" x2="19.6561" y2="48.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="58.637" x2="19.6561" y2="40.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="50.637" x2="19.6561" y2="32.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="43.637" x2="19.6561" y2="25.637" stroke="#BABBBD"/>
<line x1="0.646447" y1="36.6464" x2="15.6464" y2="21.6464" stroke="#BABBBD"/>
<line x1="0.646447" y1="30.6464" x2="9.64645" y2="21.6464" stroke="#BABBBD"/>
<line x1="39.5968" y1="133.704" x2="50.5968" y2="118.704" stroke="#BABBBD"/>
<line x1="43.6053" y1="133.693" x2="50.6053" y2="124.693" stroke="#BABBBD"/>
<g filter="url(#filter0_b_107_2)">
<path d="M4 0.5H47C48.933 0.5 50.5 2.067 50.5 4V130C50.5 131.933 48.933 133.5 47 133.5H4C2.067 133.5 0.5 131.933 0.5 130V4C0.5 2.067 2.067 0.5 4 0.5Z" stroke="#BABBBD"/>
</g>
<line x1="25.5" y1="21" x2="25.5" y2="719" stroke="#BABBBD"/>
<line x1="0.000161029" y1="21.5" x2="50.0001" y2="21.5161" stroke="#BABBBD"/>
<path fillRule="evenodd" clipRule="evenodd" d="M28 18.9915H23C21.3431 18.9915 20 20.3233 20 21.9662V717.034C20 718.677 21.3431 720.008 23 720.008H28C29.6569 720.008 31 718.677 31 717.034V21.9661C31 20.3233 29.6569 18.9915 28 18.9915ZM23 18C20.7909 18 19 19.7757 19 21.9662V717.034C19 719.224 20.7909 721 23 721H28C30.2091 721 32 719.224 32 717.034V21.9661C32 19.7757 30.2091 18 28 18H23Z" fill="#BABBBD"/>
<defs>
<filter id="filter0_b_107_2" x="-4" y="-4" width="59" height="142" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feGaussianBlur in="BackgroundImageFix" stdDeviation="2"/>
<feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_107_2"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_107_2" result="shape"/>
</filter>
</defs>
</svg>

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
