import * as React from "react";
import { observer } from "mobx-react";
import { APP_STORAGE } from "../../../storage/AppStorage";

import { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import CommitIcon from '@mui/icons-material/Commit';
import { CustomizedLabel } from "./recharts";
import { toJS } from "mobx";
import { Box, Typography } from "@mui/material";

import {CustomTooltip} from "./../Devs/StyledMua"

interface IProps {}


@observer
export class DevSessCharts extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }




  render(): React.ReactNode {

  

  if(toJS(APP_STORAGE.sensors.getdataCharts()).length){

    return (
      <Box sx={{background: '#f1f5fcb3', borderTopLeftRadius: '48px', pt: '22px', border: '1px solid #eee'}}> 
       <Typography sx={{color: '#1976d2', fontSize: '12px', display: 'flex', justifyContent: 'center'}}>График изменения температуры грунта </Typography>
       <Typography sx={{color: '#FD8A04', fontSize: '12px', display: 'flex', justifyContent: 'center'}}>Сессия - {APP_STORAGE.sensors.getChoseSessTime()}</Typography>  
      <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}> <CommitIcon sx={{fontSize: '16px', color: '#9747FF', mr: '4px'}}/> <Typography sx={{color: '#9747FF', fontSize: '12px',}}>Температура</Typography></Box>
    <ResponsiveContainer width="100%" height={770}> 
     <LineChart
      className="LineChart"
      layout="vertical"
      data={toJS(APP_STORAGE.sensors.getdataCharts())}
      
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5
      }}>

      <CartesianGrid strokeDasharray="2 2" />
      <XAxis type="number" dataKey="град." strokeWidth={'0.1mm'} stroke="rgb(23 21 21)"  tickCount={19}  tick={{ fill: '#266BF1', fontSize: '14px' }} domain={[-12, 12]} />
      <YAxis dataKey="name" type="category" strokeWidth={'0.1mm'} stroke="rgb(23 21 21)"  tick={{ fill: '#266BF1', fontSize: '14px' }} />
      {/* <YAxis data ={toJS(APP_STORAGE.sensors.getSessFirstLast())}  type="category"  stroke="#266BF1"  tickCount={60}   />  */}
      <Tooltip content={<CustomTooltip/>}  />
      {/* <Legend /> */}


    <Line dataKey="град." stroke="#9747FF" > </Line>
    {/* <Line dataKey="град." stroke="#82ca9d" > <LabelList content={<CustomizedLabel />} /> </Line> */}
    </LineChart>
    </ResponsiveContainer>

    </Box>
    );
  }

  if(!toJS(APP_STORAGE.sensors.getdataCharts()).length && toJS(APP_STORAGE.sensors.getSessFirstLast().length)){

    return (
      <Box sx={{background: '#f1f5fcb3', borderTopLeftRadius: '48px', pt: '22px', border: '1px solid #eee'}}>   
      <Typography sx={{color: '#1976d2', fontSize: '12px', display: 'flex', justifyContent: 'center'}}>График изменения температуры грунта </Typography>
    <ResponsiveContainer width="100%" height={760}> 
     <LineChart
      className="LineChart"
      layout="vertical"
      
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}>

      <CartesianGrid strokeDasharray="2 2" />
      <XAxis type="number" strokeWidth={'0.1mm'} stroke="rgb(23 21 21)"  tickCount={19}  tick={{ fill: '#266BF1', fontSize: '14px' }} domain={[-12, 12]}/>
      <YAxis dataKey="name" type="category" strokeWidth={'0.1mm'} stroke="rgb(23 21 21)"  tickCount={19}  tick={{ fill: '#266BF1', fontSize: '14px' }} domain={[-12, 12]} />
      {/* <YAxis dataKey="name" type="category"  stroke="#266BF1"  tickCount={60}   /> */}
      <Tooltip />
      <Legend />

     {/* <Line dataKey="град" stroke="#266BF1" > </Line>
     <Line dataKey="name" stroke="#266BF1" > </Line> */}
    {/* <Line dataKey="град." stroke="#82ca9d" > <LabelList content={<CustomizedLabel />} /> </Line> */}
    </LineChart>
    </ResponsiveContainer>
    </Box>
    );
  }
} 
}
