import * as React from "react";
import { observer } from "mobx-react";
import { APP_STORAGE } from "../../../storage/AppStorage";

import { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import { CustomizedLabel } from "./recharts";
import { toJS } from "mobx";
import { Box } from "@mui/material";

interface IProps {}


@observer
export class DevSessCharts extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }



  render(): React.ReactNode {
  

  if(toJS(APP_STORAGE.sensors.getdataCharts()).length){
    console.log(toJS(APP_STORAGE.sensors.getdataCharts()).length, 'sortedData11')

    return (
      <Box sx={{background: '#f1f5fcb3', borderTopLeftRadius: '48px', pt: '22px'}}>   
    <ResponsiveContainer width="100%" height={800}> 
     <LineChart
      className="LineChart"
      layout="vertical"
      data={toJS(APP_STORAGE.sensors.getdataCharts())}
      
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}>

      <CartesianGrid strokeDasharray="2 2" />
      <XAxis type="number" dataKey="град." tickCount={19}  domain={[-12, 12]} />
      <YAxis dataKey="name" type="category"  stroke="#808080"   />
      {/* <YAxis dataKey="name" type="category"  stroke="#266BF1"  tickCount={60}   /> */}
      <Tooltip />
      <Legend />

    <Line dataKey="град." stroke="#266BF1" > </Line>
    {/* <Line dataKey="град." stroke="#82ca9d" > <LabelList content={<CustomizedLabel />} /> </Line> */}
    </LineChart>
    </ResponsiveContainer>
    </Box>
    );
  }

  if(!toJS(APP_STORAGE.sensors.getdataCharts()).length){
    console.log(toJS(APP_STORAGE.sensors.getdataCharts()).length, 'sortedData11')

    return (
      <Box sx={{background: '#f1f5fcb3', borderTopLeftRadius: '48px', pt: '22px'}}>   
    <ResponsiveContainer width="100%" height={800}> 
     <LineChart
      className="LineChart"
      layout="vertical"
      // data={}
      
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}>

      <CartesianGrid strokeDasharray="2 2" />
      <XAxis type="number" dataKey="град." tickCount={19}  domain={[-12, 12]} />
      <YAxis dataKey="name" type="category"  stroke="#808080" tickCount={19}  domain={[-12, 12]}  />
      {/* <YAxis dataKey="name" type="category"  stroke="#266BF1"  tickCount={60}   /> */}
      <Tooltip />
      <Legend />

    <Line dataKey="град." stroke="#266BF1" > </Line>
    {/* <Line dataKey="град." stroke="#82ca9d" > <LabelList content={<CustomizedLabel />} /> </Line> */}
    </LineChart>
    </ResponsiveContainer>
    </Box>
    );
  }


}

  
}
