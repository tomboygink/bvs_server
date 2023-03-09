import * as React from "react";
import { observer } from "mobx-react";
import { APP_STORAGE } from "../../../storage/AppStorage";

import { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import { CustomizedLabel } from "./recharts";
import { toJS } from "mobx";

interface IProps {}


@observer
export class DevSessCharts extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }



  render(): React.ReactNode {

  if(toJS(APP_STORAGE.sensors.getdataCharts()).length){
    return (
      <ResponsiveContainer width="100%" height={600}> 
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
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis type="number" dataKey="град." tickCount={19}  domain={[-6, 20]} />
      <YAxis dataKey="name" type="category"  stroke="#266BF1"  tickCount={60}   />
      <Tooltip />
      <Legend />

      <Line dataKey="град." stroke="#82ca9d" > <LabelList content={<CustomizedLabel />} /> </Line>
       
    </LineChart>
    </ResponsiveContainer>
    );
  }}
}
