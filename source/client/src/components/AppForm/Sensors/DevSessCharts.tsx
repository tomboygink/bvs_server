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

      <Box sx={{background: '#f1f5fcb3', 
      borderTopLeftRadius: '48px', 
      p: '12px',pt: '22px', 
      border: '1px solid #8F9DCE', 
      display: 'grid', 
      flexDirection: 'column-reverse',
      gridTemplateColumns: '10% 90%',
      alignItems: 'center'
      }}>    
<svg width="51" height="744" viewBox="0 0 51 716" fill="none" xmlns="http://www.w3.org/2000/svg">
<line x1="0.6" y1="25.7" x2="3.6" y2="21.7" stroke="#BABBBD"/>
<line x1="0.434084" y1="29.5616" x2="6.60657" y2="21.6914" stroke="#BABBBD"/>
<line x1="0.613021" y1="32.6834" x2="9.61302" y2="21.6834" stroke="#BABBBD"/>
<line x1="0.609566" y1="36.6877" x2="12.6096" y2="21.6877" stroke="#BABBBD"/>
<line x1="0.607559" y1="40.6902" x2="15.6076" y2="21.6902" stroke="#BABBBD"/>
<line x1="0.806535" y1="44.8484" x2="19.4117" y2="21.5279" stroke="#BABBBD"/>
<line x1="0.609147" y1="49.0087" x2="19.2144" y2="25.6882" stroke="#BABBBD"/>
<line x1="0.609147" y1="53.0087" x2="19.2144" y2="29.6882" stroke="#BABBBD"/>
<line x1="0.609147" y1="62.0087" x2="19.2144" y2="38.6882" stroke="#BABBBD"/>
<line x1="0.609147" y1="67.0087" x2="19.2144" y2="43.6882" stroke="#BABBBD"/>
<line x1="0.609147" y1="72.0087" x2="19.2144" y2="48.6882" stroke="#BABBBD"/>
<line x1="0.609147" y1="77.0087" x2="19.2144" y2="53.6882" stroke="#BABBBD"/>
<line x1="0.609147" y1="82.0087" x2="19.2144" y2="58.6882" stroke="#BABBBD"/>
<line x1="31.6091" y1="71.0087" x2="50.2144" y2="47.6882" stroke="#BABBBD"/>
<line x1="31.6091" y1="64.0087" x2="50.2144" y2="40.6882" stroke="#BABBBD"/>
<line x1="31.6168" y1="55.6788" x2="49.222" y2="34.6788" stroke="#BABBBD"/>
<line x1="31.6168" y1="48.6788" x2="49.222" y2="27.6788" stroke="#BABBBD"/>
<line x1="30.6168" y1="42.6788" x2="48.222" y2="21.6788" stroke="#BABBBD"/>
<line x1="31.6314" y1="33.6621" x2="42.6314" y2="21.6621" stroke="#BABBBD"/>
<line x1="32.6096" y1="27.6877" x2="36.6096" y2="22.6877" stroke="#BABBBD"/>
<line x1="30.6091" y1="78.0087" x2="49.2144" y2="54.6882" stroke="#BABBBD"/>
<line x1="0.609147" y1="87.0087" x2="19.2144" y2="63.6882" stroke="#BABBBD"/>
<line x1="0.609147" y1="92.0087" x2="19.2144" y2="68.6882" stroke="#BABBBD"/>
<line x1="30.6091" y1="85.0087" x2="49.2144" y2="61.6882" stroke="#BABBBD"/>
<line x1="0.609147" y1="97.0087" x2="19.2144" y2="73.6882" stroke="#BABBBD"/>
<line x1="31.6091" y1="90.0087" x2="50.2144" y2="66.6882" stroke="#BABBBD"/>
<line x1="0.609147" y1="102.009" x2="19.2144" y2="78.6882" stroke="#BABBBD"/>
<line x1="0.609147" y1="107.009" x2="19.2144" y2="83.6882" stroke="#BABBBD"/>
<line x1="0.609147" y1="111.009" x2="19.2144" y2="87.6882" stroke="#BABBBD"/>
<line x1="31.6091" y1="97.0087" x2="50.2144" y2="73.6882" stroke="#BABBBD"/>
<line x1="31.6091" y1="103.009" x2="50.2144" y2="79.6882" stroke="#BABBBD"/>
<line x1="0.609147" y1="115.009" x2="19.2144" y2="91.6882" stroke="#BABBBD"/>
<line x1="31.6091" y1="110.009" x2="50.2144" y2="86.6882" stroke="#BABBBD"/>
<line x1="2.60906" y1="117.009" x2="19.6091" y2="95.6883" stroke="#BABBBD"/>
<line x1="31.6091" y1="116.009" x2="48.6091" y2="94.6883" stroke="#BABBBD"/>
<line x1="6.6336" y1="116.66" x2="19.6336" y2="102.66" stroke="#BABBBD"/>
<line x1="34.614" y1="117.682" x2="48.614" y2="100.682" stroke="#BABBBD"/>
<line x1="9.63003" y1="117.664" x2="19.63" y2="106.664" stroke="#BABBBD"/>
<line x1="39.63" y1="116.664" x2="49.63" y2="105.664" stroke="#BABBBD"/>
<line x1="14.6096" y1="116.688" x2="18.6096" y2="111.688" stroke="#BABBBD"/>
<line x1="44.6096" y1="116.688" x2="48.6096" y2="111.688" stroke="#BABBBD"/>
<line x1="0.609147" y1="57.0087" x2="19.2144" y2="33.6882" stroke="#BABBBD"/>
<g filter="url(#filter0_b_58_54)">
<path d="M4 0.5H47C48.933 0.5 50.5 2.067 50.5 4V114C50.5 115.933 48.933 117.5 47 117.5H4C2.067 117.5 0.5 115.933 0.5 114V4C0.5 2.067 2.067 0.5 4 0.5Z" stroke="#BABBBD"/>
</g>
<line x1="25.5" y1="22" x2="25.5" y2="706" stroke="#BABBBD"/>
<line x1="23" y1="127.5" x2="28" y2="127.5" stroke="#BABBBD"/>
<line x1="23" y1="174.5" x2="28" y2="174.5" stroke="#BABBBD"/>
<line x1="23" y1="240.5" x2="28" y2="240.5" stroke="#BABBBD"/>
<line x1="23" y1="305.5" x2="28" y2="305.5" stroke="black"/>
<path d="M28 305.5H23" stroke="#BABBBD"/>
<path d="M28 371H23" stroke="#BABBBD"/>
<line x1="23" y1="78.5" x2="28" y2="78.5" stroke="#BABBBD"/>
<line x1="23" y1="43.5" x2="28" y2="43.5" stroke="#BABBBD"/>
<line x1="1.00017" y1="21.5" x2="49.0002" y2="21.5161" stroke="#BABBBD"/>
<path fillRule="evenodd" clipRule="evenodd" d="M28 8H23C21.3431 8 20 9.34315 20 11V712C20 713.657 21.3431 715 23 715H28C29.6569 715 31 713.657 31 712V11C31 9.34315 29.6569 8 28 8ZM23 7C20.7909 7 19 8.79087 19 11V712C19 714.209 20.7909 716 23 716H28C30.2091 716 32 714.209 32 712V11C32 8.79086 30.2091 7 28 7H23Z" fill="#BABBBD"/>
<defs>
<filter id="filter0_b_58_54" x="-4" y="-4" width="59" height="126" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feGaussianBlur in="BackgroundImageFix" stdDeviation="2"/>
<feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_58_54"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_58_54" result="shape"/>
</filter>
</defs>
</svg>
      
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
      <Box sx={{background: '#f1f5fcb3', 
      borderTopLeftRadius: '48px', 
      p: '12px',pt: '22px', 
      border: '1px solid #8F9DCE', 
      display: 'grid', 
      flexDirection: 'column-reverse',
      gridTemplateColumns: '10% 90%',
      alignItems: 'center'
      }}>   

<svg width="51" height="744" viewBox="0 0 51 716" fill="none" xmlns="http://www.w3.org/2000/svg">
<line x1="0.6" y1="25.7" x2="3.6" y2="21.7" stroke="#BABBBD"/>
<line x1="0.434084" y1="29.5616" x2="6.60657" y2="21.6914" stroke="#BABBBD"/>
<line x1="0.613021" y1="32.6834" x2="9.61302" y2="21.6834" stroke="#BABBBD"/>
<line x1="0.609566" y1="36.6877" x2="12.6096" y2="21.6877" stroke="#BABBBD"/>
<line x1="0.607559" y1="40.6902" x2="15.6076" y2="21.6902" stroke="#BABBBD"/>
<line x1="0.806535" y1="44.8484" x2="19.4117" y2="21.5279" stroke="#BABBBD"/>
<line x1="0.609147" y1="49.0087" x2="19.2144" y2="25.6882" stroke="#BABBBD"/>
<line x1="0.609147" y1="53.0087" x2="19.2144" y2="29.6882" stroke="#BABBBD"/>
<line x1="0.609147" y1="62.0087" x2="19.2144" y2="38.6882" stroke="#BABBBD"/>
<line x1="0.609147" y1="67.0087" x2="19.2144" y2="43.6882" stroke="#BABBBD"/>
<line x1="0.609147" y1="72.0087" x2="19.2144" y2="48.6882" stroke="#BABBBD"/>
<line x1="0.609147" y1="77.0087" x2="19.2144" y2="53.6882" stroke="#BABBBD"/>
<line x1="0.609147" y1="82.0087" x2="19.2144" y2="58.6882" stroke="#BABBBD"/>
<line x1="31.6091" y1="71.0087" x2="50.2144" y2="47.6882" stroke="#BABBBD"/>
<line x1="31.6091" y1="64.0087" x2="50.2144" y2="40.6882" stroke="#BABBBD"/>
<line x1="31.6168" y1="55.6788" x2="49.222" y2="34.6788" stroke="#BABBBD"/>
<line x1="31.6168" y1="48.6788" x2="49.222" y2="27.6788" stroke="#BABBBD"/>
<line x1="30.6168" y1="42.6788" x2="48.222" y2="21.6788" stroke="#BABBBD"/>
<line x1="31.6314" y1="33.6621" x2="42.6314" y2="21.6621" stroke="#BABBBD"/>
<line x1="32.6096" y1="27.6877" x2="36.6096" y2="22.6877" stroke="#BABBBD"/>
<line x1="30.6091" y1="78.0087" x2="49.2144" y2="54.6882" stroke="#BABBBD"/>
<line x1="0.609147" y1="87.0087" x2="19.2144" y2="63.6882" stroke="#BABBBD"/>
<line x1="0.609147" y1="92.0087" x2="19.2144" y2="68.6882" stroke="#BABBBD"/>
<line x1="30.6091" y1="85.0087" x2="49.2144" y2="61.6882" stroke="#BABBBD"/>
<line x1="0.609147" y1="97.0087" x2="19.2144" y2="73.6882" stroke="#BABBBD"/>
<line x1="31.6091" y1="90.0087" x2="50.2144" y2="66.6882" stroke="#BABBBD"/>
<line x1="0.609147" y1="102.009" x2="19.2144" y2="78.6882" stroke="#BABBBD"/>
<line x1="0.609147" y1="107.009" x2="19.2144" y2="83.6882" stroke="#BABBBD"/>
<line x1="0.609147" y1="111.009" x2="19.2144" y2="87.6882" stroke="#BABBBD"/>
<line x1="31.6091" y1="97.0087" x2="50.2144" y2="73.6882" stroke="#BABBBD"/>
<line x1="31.6091" y1="103.009" x2="50.2144" y2="79.6882" stroke="#BABBBD"/>
<line x1="0.609147" y1="115.009" x2="19.2144" y2="91.6882" stroke="#BABBBD"/>
<line x1="31.6091" y1="110.009" x2="50.2144" y2="86.6882" stroke="#BABBBD"/>
<line x1="2.60906" y1="117.009" x2="19.6091" y2="95.6883" stroke="#BABBBD"/>
<line x1="31.6091" y1="116.009" x2="48.6091" y2="94.6883" stroke="#BABBBD"/>
<line x1="6.6336" y1="116.66" x2="19.6336" y2="102.66" stroke="#BABBBD"/>
<line x1="34.614" y1="117.682" x2="48.614" y2="100.682" stroke="#BABBBD"/>
<line x1="9.63003" y1="117.664" x2="19.63" y2="106.664" stroke="#BABBBD"/>
<line x1="39.63" y1="116.664" x2="49.63" y2="105.664" stroke="#BABBBD"/>
<line x1="14.6096" y1="116.688" x2="18.6096" y2="111.688" stroke="#BABBBD"/>
<line x1="44.6096" y1="116.688" x2="48.6096" y2="111.688" stroke="#BABBBD"/>
<line x1="0.609147" y1="57.0087" x2="19.2144" y2="33.6882" stroke="#BABBBD"/>
<g filter="url(#filter0_b_58_54)">
<path d="M4 0.5H47C48.933 0.5 50.5 2.067 50.5 4V114C50.5 115.933 48.933 117.5 47 117.5H4C2.067 117.5 0.5 115.933 0.5 114V4C0.5 2.067 2.067 0.5 4 0.5Z" stroke="#BABBBD"/>
</g>
<line x1="25.5" y1="22" x2="25.5" y2="706" stroke="#BABBBD"/>
<line x1="23" y1="127.5" x2="28" y2="127.5" stroke="#BABBBD"/>
<line x1="23" y1="174.5" x2="28" y2="174.5" stroke="#BABBBD"/>
<line x1="23" y1="240.5" x2="28" y2="240.5" stroke="#BABBBD"/>
<line x1="23" y1="305.5" x2="28" y2="305.5" stroke="black"/>
<path d="M28 305.5H23" stroke="#BABBBD"/>
<path d="M28 371H23" stroke="#BABBBD"/>
<line x1="23" y1="78.5" x2="28" y2="78.5" stroke="#BABBBD"/>
<line x1="23" y1="43.5" x2="28" y2="43.5" stroke="#BABBBD"/>
<line x1="1.00017" y1="21.5" x2="49.0002" y2="21.5161" stroke="#BABBBD"/>
<path fillRule="evenodd" clipRule="evenodd" d="M28 8H23C21.3431 8 20 9.34315 20 11V712C20 713.657 21.3431 715 23 715H28C29.6569 715 31 713.657 31 712V11C31 9.34315 29.6569 8 28 8ZM23 7C20.7909 7 19 8.79087 19 11V712C19 714.209 20.7909 716 23 716H28C30.2091 716 32 714.209 32 712V11C32 8.79086 30.2091 7 28 7H23Z" fill="#BABBBD"/>
<defs>
<filter id="filter0_b_58_54" x="-4" y="-4" width="59" height="126" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feGaussianBlur in="BackgroundImageFix" stdDeviation="2"/>
<feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_58_54"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_58_54" result="shape"/>
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
