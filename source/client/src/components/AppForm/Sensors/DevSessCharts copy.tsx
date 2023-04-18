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
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';

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
      <XAxis type="number"  strokeWidth={'0.1mm'} stroke="rgb(23 21 21)"  tickCount={19}  tick={{ fill: '#266BF1', fontSize: '14px' }} domain={[-12, 12]} />
      <YAxis dataKey="depth" type="category" strokeWidth={'0.1mm'} stroke="rgb(23 21 21)"  tick={{ fill: '#266BF1', fontSize: '14px' }} />
      {/* <YAxis data ={toJS(APP_STORAGE.sensors.getSessFirstLast())}  type="category"  stroke="#266BF1"  tickCount={60}   />  */}
      <Tooltip content={<CustomTooltip/>}  />
      {/* <Legend /> */}


    <Line dataKey="град." stroke="#9747FF" > </Line>

    <Line dataKey="data_s" stroke="red" > </Line>

    <Line dataKey="data_f" stroke="green" > </Line>
    {/* <Line dataKey="град." stroke="#82ca9d" > <LabelList content={<CustomizedLabel />} /> </Line> */}
    </LineChart>
    </ResponsiveContainer>

    </Box>
    );
  }

  if(!toJS(APP_STORAGE.sensors.getdataCharts()).length && toJS(APP_STORAGE.sensors.getSessFirstLast().length)){
     
    return (
      <Box sx={{background: '#f1f5fcb3', borderTopLeftRadius: '48px', pt: '22px', border: '1px solid #8F9DCE', display: 'flex'}}>   
       
 


      <Box sx ={{mt: '10%'}}>
      <Typography sx={{color: '#00B394', fontSize: '12px', display: 'flex', justifyContent: 'center', ml:' 30px'}}>
      <CommitIcon sx={{fontSize: '16px', color: '#00B394', mr: '4px'}}/>{APP_STORAGE.sensors.getTimeDevSessFirst()}</Typography>  
      <Typography sx={{color: '#8884d8', fontSize: '12px', display: 'flex', justifyContent: 'center', ml:' 30px'}}>
      <CommitIcon sx={{fontSize: '16px', color: '#9747FF', mr: '4px'}}/>{APP_STORAGE.sensors.getTimeDevSessLast()}</Typography>

      <Box sx ={{display: 'flex'}}>
      <BatteryChargingFullIcon sx ={{ color : '#AAAAAA' }}/> 
      
      <Typography sx ={{color :'#AAAAAA'}}> {APP_STORAGE.sensors.getAkbSessLast()}</Typography>
      </Box>
      </Box>

      
   <Box>
   <svg className="svg_well" width="649" height="827" viewBox="0 0 649 827" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_b_4_45)">
<path d="M139.5 0.5H204.5V127.5H139.5V0.5Z" stroke="#266BF1"/>
<path d="M139.5 0.5H204.5V127.5H139.5V0.5Z" stroke="#565252" stroke-opacity="0.2"/>
</g>
<g filter="url(#filter1_b_4_45)">
<path d="M139.5 0.5H204.5V127.5H139.5V0.5Z" stroke="#266BF1"/>
<path d="M139.5 0.5H204.5V127.5H139.5V0.5Z" stroke="#565252" stroke-opacity="0.2"/>
</g>
<line x1="204.285" y1="24.4111" x2="178.285" y2="42.4111" stroke="black"/>
<line x1="204.285" y1="30.4111" x2="178.285" y2="48.4111" stroke="black"/>
<line x1="205.285" y1="36.4111" x2="179.285" y2="54.4111" stroke="black"/>
<line x1="204.285" y1="43.4111" x2="178.285" y2="61.4111" stroke="black"/>
<line x1="204.285" y1="50.4111" x2="178.285" y2="68.4111" stroke="black"/>
<line x1="204.285" y1="57.4111" x2="178.285" y2="75.4111" stroke="black"/>
<line x1="204.285" y1="64.4111" x2="178.285" y2="82.4111" stroke="black"/>
<line x1="204.285" y1="71.4111" x2="178.285" y2="89.4111" stroke="black"/>
<line x1="204.285" y1="78.4111" x2="178.285" y2="96.4111" stroke="black"/>
<line x1="204.285" y1="84.4111" x2="178.285" y2="102.411" stroke="black"/>
<path d="M204.285 91L178.285 109" stroke="black"/>
<line x1="204.285" y1="97.4111" x2="178.285" y2="115.411" stroke="black"/>
<line x1="204.285" y1="104.411" x2="178.285" y2="122.411" stroke="black"/>
<line x1="205.285" y1="109.411" x2="179.285" y2="127.411" stroke="black"/>
<line x1="204.094" y1="115.398" x2="188.303" y2="127.398" stroke="black"/>
<rect x="165.5" y="16.5" width="12" height="810" fill="white" stroke="#266BF1"/>
<line x1="171.5" y1="25" x2="171.5" y2="793" stroke="black"/>
<line y1="40.5" x2="139" y2="40.5" stroke="black"/>
<line x1="205" y1="40.5" x2="649" y2="40.5" stroke="black"/>
<line x1="178" y1="18.5" x2="204" y2="18.5" stroke="black"/>
<line x1="140" y1="18.5" x2="165" y2="18.5" stroke="black"/>
<line x1="148.265" y1="19.424" x2="140.265" y2="24.424" stroke="black"/>
<line x1="187.265" y1="19.424" x2="179.265" y2="24.424" stroke="black"/>
<line x1="154.291" y1="19.4069" x2="140.291" y2="29.4069" stroke="black"/>
<line x1="193.291" y1="19.4069" x2="179.291" y2="29.4069" stroke="black"/>
<line x1="162.282" y1="19.4131" x2="140.282" y2="34.4131" stroke="black"/>
<line x1="165.285" y1="23.4111" x2="139.285" y2="41.4111" stroke="black"/>
<line x1="203.285" y1="18.4111" x2="177.285" y2="36.4111" stroke="black"/>
<line x1="165.281" y1="29.4135" x2="140.281" y2="46.4135" stroke="black"/>
<line x1="165.281" y1="35.4135" x2="140.281" y2="52.4135" stroke="black"/>
<line x1="165.281" y1="42.4135" x2="140.281" y2="59.4135" stroke="black"/>
<line x1="165.281" y1="49.4135" x2="140.281" y2="66.4135" stroke="black"/>
<line x1="165.281" y1="55.4135" x2="140.281" y2="72.4135" stroke="black"/>
<line x1="165.281" y1="61.4135" x2="140.281" y2="78.4135" stroke="black"/>
<line x1="165.281" y1="67.4135" x2="140.281" y2="84.4135" stroke="black"/>
<line x1="165.281" y1="73.4135" x2="140.281" y2="90.4135" stroke="black"/>
<line x1="165.281" y1="87.4135" x2="140.281" y2="104.413" stroke="black"/>
<line x1="165.281" y1="93.4135" x2="140.281" y2="110.413" stroke="black"/>
<line x1="165.281" y1="100.413" x2="140.281" y2="117.413" stroke="black"/>
<line x1="165.281" y1="106.413" x2="140.281" y2="123.413" stroke="black"/>
<line x1="165.282" y1="113.413" x2="146.282" y2="126.413" stroke="black"/>
<line x1="165.294" y1="119.404" x2="154.294" y2="127.404" stroke="black"/>
<line x1="165.281" y1="80.4135" x2="140.281" y2="97.4135" stroke="black"/>
<defs>
<filter id="filter0_b_4_45" x="135" y="-4" width="74" height="136" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feGaussianBlur in="BackgroundImageFix" stdDeviation="2"/>
<feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_4_45"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_4_45" result="shape"/>
</filter>
<filter id="filter1_b_4_45" x="135" y="-4" width="74" height="136" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feGaussianBlur in="BackgroundImageFix" stdDeviation="2"/>
<feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_4_45"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_4_45" result="shape"/>
</filter>
</defs>
</svg>

<ResponsiveContainer width="70%" height={740}>
      
      <LineChart
        layout="vertical"
        data={toJS(APP_STORAGE.sensors.getSessFirstLast())}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" strokeWidth={'0.1mm'} stroke="rgb(23 21 21)"  tickCount={19}  tick={{ fill: '#266BF1', fontSize: '14px' }} domain={[-12, 12]} />
        <YAxis   dataKey='depth' type="category" strokeWidth={'0.1mm'} stroke="rgb(23 21 21)"  tick={{ fill: '#266BF1', fontSize: '14px' }} />
        <Tooltip content={<CustomTooltip/>}  />
        <Line  strokeWidth={'2'}  dataKey="data_s" stroke="#8884d8" />
        <Line strokeWidth={'2'} dataKey="data_f" stroke="#00B394" />
      </LineChart>
      
    </ResponsiveContainer>
   </Box>
    </Box>
    );
  }


  if(!toJS(APP_STORAGE.sensors.getdataCharts()).length && !toJS(APP_STORAGE.sensors.getSessFirstLast().length)){

    return (
      <Box sx={{background: '#f1f5fcb3', borderTopLeftRadius: '48px', pt: '22px', border: '1px solid #eee'}}>   
      <Typography sx={{color: '#1976d2', fontSize: '12px', display: 'flex', justifyContent: 'center'}}>График изменения температуры грунта </Typography>
      <ResponsiveContainer width="100%" height={770}>
        <LineChart
          layout="vertical"
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" strokeWidth={'0.1mm'} stroke="rgb(23 21 21)"  tickCount={19}  tick={{ fill: '#266BF1', fontSize: '14px' }} domain={[-12, 12]} />
          <YAxis domain={[-12, 60]} type="category" strokeWidth={'0.1mm'} stroke="rgb(23 21 21)"  tick={{ fill: '#266BF1', fontSize: '14px' }} />
          <Tooltip />
    
        </LineChart>
      </ResponsiveContainer>
    </Box>
    );
  };
} 
}
