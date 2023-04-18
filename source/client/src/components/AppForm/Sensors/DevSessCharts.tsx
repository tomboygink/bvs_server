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

      <Box sx={{background: '#f1f5fcb3', borderTopLeftRadius: '48px', pt: '22px', border: '1px solid #8F9DCE', display: 'flex', flexDirection: 'column-reverse'}}>   


  <Box sx={{display: 'flex', justifyContent: 'space-around'}}>
 
    <Typography sx={{color: '#FE6F4F', fontSize: '12px', display: 'flex', justifyContent: 'center', ml:' 30px'}}>
      <CommitIcon sx={{fontSize: '16px', color: '#FE6F4F', mr: '4px'}}/>{APP_STORAGE.sensors.getChoseSessTime()}
   </Typography>  

  <Typography sx={{color: '#00B394', fontSize: '12px', display: 'flex', justifyContent: 'center', ml:' 30px'}}>
      <CommitIcon sx={{fontSize: '16px', color: '#00B394', mr: '4px'}}/>{APP_STORAGE.sensors.getTimeDevSessFirst().replace('T',' ')}
   </Typography>  
      <Typography sx={{color: '#8884d8', fontSize: '12px', display: 'flex', justifyContent: 'center', ml:' 30px'}}>
      <CommitIcon sx={{fontSize: '16px', color: '#9747FF', mr: '4px'}}/>{APP_STORAGE.sensors.getTimeDevSessLast().replace('T',' ')}
      </Typography>
</Box>
      
    <ResponsiveContainer width="100%" height={770}> 
     <LineChart
      className="LineChart"
      layout="vertical"
      data={toJS(APP_STORAGE.sensors.getdataCharts())}
      
      margin={{
        top: 20,
        right: 20,
        left: 20,
        bottom: 5
      }}>

      <CartesianGrid strokeDasharray="2 2" />
      <XAxis type="number"  strokeWidth={'0.1mm'} stroke="rgb(23 21 21)"  tickCount={19}  tick={{ fill: '#266BF1', fontSize: '14px' }} domain={[-15, 15]} />
      <YAxis dataKey="depth" type="category" strokeWidth={'0.1mm'} stroke="rgb(23 21 21)"  tick={{ fill: '#266BF1', fontSize: '14px' }} />
      {/* <YAxis data ={toJS(APP_STORAGE.sensors.getSessFirstLast())}  type="category"  stroke="#266BF1"  tickCount={60}   />  */}
      <Tooltip content={<CustomTooltip/>}  />
      {/* <Legend /> */}


    <Line  strokeWidth={'2'} dataKey="град." stroke="#FE6F4F" > </Line>
    <Line strokeWidth={'2'} dataKey="data_s" stroke="#8884d8" > </Line>
    <Line strokeWidth={'2'} dataKey="data_f" stroke="#00B394" > </Line>
    {/* <Line dataKey="град." stroke="#82ca9d" > <LabelList content={<CustomizedLabel />} /> </Line> */}
    </LineChart>
    </ResponsiveContainer>

    </Box>
    );
  }

  if(!toJS(APP_STORAGE.sensors.getdataCharts()).length && toJS(APP_STORAGE.sensors.getSessFirstLast().length)){
     
    return (
      <Box sx={{background: '#f1f5fcb3', borderTopLeftRadius: '48px', p: '12px',pt: '22px', border: '1px solid #8F9DCE', display: 'flex', flexDirection: 'column-reverse'}}>   

      <Box>
        {/* <Box sx={{display: 'flex', justifyContent: 'space-around'}}>
        <Typography sx={{color: '#00B394', fontSize: '12px', display: 'flex', justifyContent: 'center', ml:' 30px'}}>
      <CommitIcon sx={{fontSize: '16px', color: '#00B394', mr: '4px'}}/>{APP_STORAGE.sensors.getTimeDevSessFirst().replace('T',' ')}
      </Typography>  
      <Typography sx={{color: '#8884d8', fontSize: '12px', display: 'flex', justifyContent: 'center', ml:' 30px'}}>
      <CommitIcon sx={{fontSize: '16px', color: '#9747FF', mr: '4px'}}/>{APP_STORAGE.sensors.getTimeDevSessLast().replace('T',' ')}
      </Typography>
        </Box> */}
    

      {/* <Box sx ={{display: 'flex'}}>
      <BatteryChargingFullIcon sx ={{ color : '#AAAAAA' }}/> 
      
      <Typography sx ={{color :'#AAAAAA'}}> {APP_STORAGE.sensors.getAkbSessLast()} АКБ</Typography>
      </Box> */}
      </Box>
 
      <svg className="svg_well" width="50" height="744" viewBox="0 0 50 716" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_b_39_6)">
<path d="M4 0.5H46C47.933 0.5 49.5 2.067 49.5 4V114C49.5 115.933 47.933 117.5 46 117.5H4C2.067 117.5 0.5 115.933 0.5 114V4C0.5 2.067 2.067 0.5 4 0.5Z" stroke="#266BF1"/>
<path d="M4 0.5H46C47.933 0.5 49.5 2.067 49.5 4V114C49.5 115.933 47.933 117.5 46 117.5H4C2.067 117.5 0.5 115.933 0.5 114V4C0.5 2.067 2.067 0.5 4 0.5Z" stroke="#565252" strokeOpacity="0.2"/>
</g>
<line x1="25.5" y1="22" x2="25.5" y2="706" stroke="black"/>
<line x1="23" y1="127.5" x2="28" y2="127.5" stroke="black"/>
<line x1="23" y1="174.5" x2="28" y2="174.5" stroke="black"/>
<line x1="23" y1="240.5" x2="28" y2="240.5" stroke="black"/>
<line x1="23" y1="305.5" x2="28" y2="305.5" stroke="black"/>
<path d="M28 305.5H23" stroke="black"/>
<path d="M28 371H23" stroke="black"/>
<line x1="23" y1="78.5" x2="28" y2="78.5" stroke="black"/>
<line x1="23" y1="43.5" x2="28" y2="43.5" stroke="black"/>
<line y1="21.5" x2="49" y2="21.5" stroke="black"/>
<path d="M19 11C19 8.79087 20.7909 7 23 7H28C30.2091 7 32 8.79086 32 11V712C32 714.209 30.2091 716 28 716H23C20.7909 716 19 714.209 19 712V11Z" fill="white"/>
<path fillRule="evenodd" clipRule="evenodd" d="M28 8H23C21.3431 8 20 9.34315 20 11V712C20 713.657 21.3431 715 23 715H28C29.6569 715 31 713.657 31 712V11C31 9.34315 29.6569 8 28 8ZM23 7C20.7909 7 19 8.79087 19 11V712C19 714.209 20.7909 716 23 716H28C30.2091 716 32 714.209 32 712V11C32 8.79086 30.2091 7 28 7H23Z" fill="#266BF1"/>
<defs>
<filter id="filter0_b_39_6" x="-4" y="-4" width="58" height="126" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feGaussianBlur in="BackgroundImageFix" stdDeviation="2"/>
<feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_39_6"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_39_6" result="shape"/>
</filter>
</defs>
</svg>

     <ResponsiveContainer width="100%" height={740}>
        <LineChart
          layout="vertical"
          data={toJS(APP_STORAGE.sensors.getSessFirstLast())}
          margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" strokeWidth={'0.1mm'} stroke="rgb(23 21 21)"  tickCount={19}  tick={{ fill: '#266BF1', fontSize: '14px' }} domain={[-15, 15]} />
          <YAxis   dataKey='depth' type="category" strokeWidth={'0.1mm'} stroke="rgb(23 21 21)"  tick={{ fill: '#266BF1', fontSize: '14px' }} />
          <Tooltip content={<CustomTooltip/>}  />
          <Line  strokeWidth={'2'}  dataKey="data_s" stroke="#8884d8" />
          <Line strokeWidth={'2'} dataKey="data_f" stroke="#00B394" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
    );
  }


  if(!toJS(APP_STORAGE.sensors.getdataCharts()).length && !toJS(APP_STORAGE.sensors.getSessFirstLast().length)){

    return (
      <Box sx={{background: '#f1f5fcb3', borderTopLeftRadius: '48px', pt: '22px', border: '1px solid #8F9DCE', display: 'flex', flexDirection: 'column-reverse'}}>   
         <ResponsiveContainer width="100%" height={740}>
            <LineChart
              layout="vertical"
              data={toJS(APP_STORAGE.sensors.getSessFirstLast())}
              margin={{
                top: 20,
                right: 20,
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
    );
  };
} 
}
