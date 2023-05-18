import * as React from "react";
import { observer } from "mobx-react";
import { APP_STORAGE } from "../../../storage/AppStorage";

import { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList, Label, ReferenceLine, Customized } from 'recharts';
import CommitIcon from '@mui/icons-material/Commit';
import { CustomizedLabel } from "./recharts";
import { toJS } from "mobx";
import { Box, Typography } from "@mui/material";

import {CustomTooltip, customizedGroupTick} from "./../Devs/StyledMua"
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';

interface IProps {}


@observer
export class DevSessCharts extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  render(): React.ReactNode {

  

  if(toJS(APP_STORAGE.sensors.getdataCharts()).length){
    let tick_yaxis = [];
    let tick_xaxis = [];
    let mintick_y = null;
    let maxtick_y= null;
    let filtered = [];
 
    let mintick_x = null;
    let maxtick_x= null;
 
     for ( var i in APP_STORAGE.sensors.getdataCharts()){
       tick_yaxis.push(APP_STORAGE.sensors.getdataCharts()[i].depth);
     
         tick_xaxis.push(
           APP_STORAGE.sensors.getdataCharts()[i].data_f, 
           APP_STORAGE.sensors.getdataCharts()[i].data_s
         )
     }
 
      
     if(tick_yaxis.length){
           maxtick_y = tick_yaxis[tick_yaxis.length - 1];
           mintick_y = tick_yaxis[0];
     }   
     
    if (tick_xaxis.sort().length){
 
     filtered = tick_xaxis.sort().filter(function(x) {
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

      <Box className="container_charts" sx={{background: '#f1f5fcb3', 
      borderTopLeftRadius: '48px', 
      border: '1px solid #8F9DCE', 
      display: 'grid', 
      alignItems: 'center',
      }}>   

<svg width="51" className="item-1" height="716" viewBox="0 0 51 716" fill="none" xmlns="http://www.w3.org/2000/svg">
<line x1="31.6091" y1="71.0087" x2="50.2144" y2="47.6882" stroke="#BABBBD"/>
<line x1="31.6091" y1="64.0087" x2="50.2144" y2="40.6882" stroke="#BABBBD"/>
<line x1="31.6216" y1="55.6732" x2="50.6216" y2="33.6732" stroke="#BABBBD"/>
<line x1="31.6216" y1="48.6732" x2="50.6216" y2="26.6732" stroke="#BABBBD"/>
<line x1="31.6216" y1="41.6732" x2="50.6216" y2="19.6732" stroke="#BABBBD"/>
<line x1="31.6216" y1="34.6732" x2="50.6216" y2="12.6732" stroke="#BABBBD"/>
<line x1="31.6216" y1="26.6732" x2="50.6216" y2="4.67319" stroke="#BABBBD"/>
<line x1="31.6222" y1="19.6725" x2="44.6222" y2="4.67254" stroke="#BABBBD"/>
<line x1="31.6" y1="13.7" x2="37.6" y2="5.7" stroke="#BABBBD"/>
<path d="M31.6418 76.7143L50.5449 53.7551" stroke="#BABBBD"/>
<line x1="31.6216" y1="82.6732" x2="50.6216" y2="60.6732" stroke="#BABBBD"/>
<line x1="31.6091" y1="90.0087" x2="50.2144" y2="66.6882" stroke="#BABBBD"/>
<line x1="31.6091" y1="97.0087" x2="50.2144" y2="73.6882" stroke="#BABBBD"/>
<line x1="31.6124" y1="103.005" x2="50.6124" y2="79.6842" stroke="#BABBBD"/>
<line x1="31.606" y1="110.013" x2="50.606" y2="85.6922" stroke="#BABBBD"/>
<line x1="31.606" y1="116.013" x2="50.606" y2="91.6922" stroke="#BABBBD"/>
<line x1="34.6096" y1="117.688" x2="50.6096" y2="97.6877" stroke="#BABBBD"/>
<line x1="11.6464" y1="117.646" x2="19.6464" y2="109.646" stroke="#BABBBD"/>
<line x1="5.64645" y1="117.646" x2="19.6464" y2="103.646" stroke="#BABBBD"/>
<line x1="0.656128" y1="115.637" x2="19.6561" y2="97.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="108.637" x2="19.6561" y2="90.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="108.637" x2="19.6561" y2="90.637" stroke="#BABBBD"/>
<path d="M0.5 102L19.5 84" stroke="#BABBBD"/>
<line x1="0.656128" y1="95.637" x2="19.6561" y2="77.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="88.637" x2="19.6561" y2="70.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="80.637" x2="19.6561" y2="62.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="73.637" x2="19.6561" y2="55.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="65.637" x2="19.6561" y2="47.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="58.637" x2="19.6561" y2="40.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="50.637" x2="19.6561" y2="32.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="42.637" x2="19.6561" y2="24.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="34.637" x2="19.6561" y2="16.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="27.637" x2="19.6561" y2="9.63702" stroke="#BABBBD"/>
<line x1="0.657318" y1="20.6359" x2="17.6573" y2="4.6359" stroke="#BABBBD"/>
<line x1="0.646447" y1="14.6464" x2="9.64645" y2="5.64645" stroke="#BABBBD"/>
<line x1="39.5968" y1="117.704" x2="50.5968" y2="102.704" stroke="#BABBBD"/>
<line x1="43.6053" y1="117.693" x2="50.6053" y2="108.693" stroke="#BABBBD"/>
<g filter="url(#filter0_b_75_25)">
<path d="M4 0.5H47C48.933 0.5 50.5 2.067 50.5 4V114C50.5 115.933 48.933 117.5 47 117.5H4C2.067 117.5 0.5 115.933 0.5 114V4C0.5 2.067 2.067 0.5 4 0.5Z" stroke="#BABBBD"/>
</g>
<line x1="25.5" y1="5" x2="25.5" y2="703" stroke="#BABBBD"/>
<line x1="0.000322059" y1="5" x2="50.0003" y2="5.0161" stroke="#BABBBD" strokeWidth="2"/>
<path fillRule="evenodd" clipRule="evenodd" d="M28 2.99154H23C21.3431 2.99154 20 4.32332 20 5.96616V701.034C20 702.677 21.3431 704.008 23 704.008H28C29.6569 704.008 31 702.677 31 701.034V5.96615C31 4.32332 29.6569 2.99154 28 2.99154ZM23 2C20.7909 2 19 3.77571 19 5.96616V701.034C19 703.224 20.7909 705 23 705H28C30.2091 705 32 703.224 32 701.034V5.96615C32 3.77571 30.2091 2 28 2H23Z" fill="#BABBBD"/>
<defs>
<filter id="filter0_b_75_25" x="-4" y="-4" width="59" height="126" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feGaussianBlur in="BackgroundImageFix" stdDeviation="2"/>
<feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_75_25"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_75_25" result="shape"/>
</filter>
</defs>
</svg>

     <ResponsiveContainer className="item-2" width="100%">
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
      <YAxis ticks= {tick_yaxis} domain={[Number(mintick_y), Number(maxtick_y)]} dataKey="depth"  type="number" strokeWidth={'0.1mm'} stroke="rgb(255 255 255 / 0%)"  tick={customizedGroupTick} /> 
      {/* <YAxis data ={toJS(APP_STORAGE.sensors.getSessFirstLast())}  type="category"  stroke="#266BF1"  tickCount={60}   />  */}
      <Tooltip content={<CustomTooltip/>}  />
      {/* <Legend /> */}


    <Line  data = {toJS(APP_STORAGE.sensors.getSess_middle())} strokeWidth={'2'}  dataKey="град." stroke="#FE6F4F" > </Line> 
    <Line data = {toJS(APP_STORAGE.sensors.getSess_second())} strokeWidth={'2'}  dataKey="data_s" stroke="#9566FB" />
    <Line data = {toJS(APP_STORAGE.sensors.getSess_first())} strokeWidth={'2'} dataKey="data_f" stroke="#00B394" />
    {/* <Line dataKey="град." stroke="#82ca9d" > <LabelList content={<CustomizedLabel />} /> </Line> */}
    </LineChart>
    </ResponsiveContainer>

    </Box>
    );
  }

  if(!toJS(APP_STORAGE.sensors.getdataCharts()).length && toJS(APP_STORAGE.sensors.getSessFirstLast().length)){
   let tick_yaxis = [];
   let tick_xaxis = [];
   let mintick_y = null;
   let maxtick_y= null;
   let filtered = [];

   let mintick_x = null;
   let maxtick_x= null;

    for ( var i in APP_STORAGE.sensors.getSessFirstLast()){
      tick_yaxis.push(APP_STORAGE.sensors.getSessFirstLast()[i].depth);
      // mintick = APP_STORAGE.sensors.getSessFirstLast()[i].depth[0];
      // maxtick = APP_STORAGE.sensors.getSessFirstLast()[i].depth[-1];

     
        tick_xaxis.push(
          APP_STORAGE.sensors.getSessFirstLast()[i].data_f, 
          APP_STORAGE.sensors.getSessFirstLast()[i].data_s
        )
    }

     
    if(tick_yaxis.length){
          maxtick_y = tick_yaxis[tick_yaxis.length - 1];
          mintick_y = tick_yaxis[0];
    }   
    
   if (tick_xaxis.sort().length){

    filtered = tick_xaxis.sort().filter(function(x) {
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

    if(maxtick_y !== null && mintick_y!== null){
      return (
        <Box className="container_charts" sx={{background: '#f1f5fcb3', 
        borderTopLeftRadius: '48px', 
        border: '1px solid #8F9DCE', 
        display: 'grid', 
        alignItems: 'center',
        }}>   
  
  <svg width="51" className="item-1" height="716" viewBox="0 0 51 716" fill="none" xmlns="http://www.w3.org/2000/svg">
<line x1="31.6091" y1="71.0087" x2="50.2144" y2="47.6882" stroke="#BABBBD"/>
<line x1="31.6091" y1="64.0087" x2="50.2144" y2="40.6882" stroke="#BABBBD"/>
<line x1="31.6216" y1="55.6732" x2="50.6216" y2="33.6732" stroke="#BABBBD"/>
<line x1="31.6216" y1="48.6732" x2="50.6216" y2="26.6732" stroke="#BABBBD"/>
<line x1="31.6216" y1="41.6732" x2="50.6216" y2="19.6732" stroke="#BABBBD"/>
<line x1="31.6216" y1="34.6732" x2="50.6216" y2="12.6732" stroke="#BABBBD"/>
<line x1="31.6216" y1="26.6732" x2="50.6216" y2="4.67319" stroke="#BABBBD"/>
<line x1="31.6222" y1="19.6725" x2="44.6222" y2="4.67254" stroke="#BABBBD"/>
<line x1="31.6" y1="13.7" x2="37.6" y2="5.7" stroke="#BABBBD"/>
<path d="M31.6418 76.7143L50.5449 53.7551" stroke="#BABBBD"/>
<line x1="31.6216" y1="82.6732" x2="50.6216" y2="60.6732" stroke="#BABBBD"/>
<line x1="31.6091" y1="90.0087" x2="50.2144" y2="66.6882" stroke="#BABBBD"/>
<line x1="31.6091" y1="97.0087" x2="50.2144" y2="73.6882" stroke="#BABBBD"/>
<line x1="31.6124" y1="103.005" x2="50.6124" y2="79.6842" stroke="#BABBBD"/>
<line x1="31.606" y1="110.013" x2="50.606" y2="85.6922" stroke="#BABBBD"/>
<line x1="31.606" y1="116.013" x2="50.606" y2="91.6922" stroke="#BABBBD"/>
<line x1="34.6096" y1="117.688" x2="50.6096" y2="97.6877" stroke="#BABBBD"/>
<line x1="11.6464" y1="117.646" x2="19.6464" y2="109.646" stroke="#BABBBD"/>
<line x1="5.64645" y1="117.646" x2="19.6464" y2="103.646" stroke="#BABBBD"/>
<line x1="0.656128" y1="115.637" x2="19.6561" y2="97.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="108.637" x2="19.6561" y2="90.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="108.637" x2="19.6561" y2="90.637" stroke="#BABBBD"/>
<path d="M0.5 102L19.5 84" stroke="#BABBBD"/>
<line x1="0.656128" y1="95.637" x2="19.6561" y2="77.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="88.637" x2="19.6561" y2="70.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="80.637" x2="19.6561" y2="62.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="73.637" x2="19.6561" y2="55.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="65.637" x2="19.6561" y2="47.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="58.637" x2="19.6561" y2="40.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="50.637" x2="19.6561" y2="32.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="42.637" x2="19.6561" y2="24.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="34.637" x2="19.6561" y2="16.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="27.637" x2="19.6561" y2="9.63702" stroke="#BABBBD"/>
<line x1="0.657318" y1="20.6359" x2="17.6573" y2="4.6359" stroke="#BABBBD"/>
<line x1="0.646447" y1="14.6464" x2="9.64645" y2="5.64645" stroke="#BABBBD"/>
<line x1="39.5968" y1="117.704" x2="50.5968" y2="102.704" stroke="#BABBBD"/>
<line x1="43.6053" y1="117.693" x2="50.6053" y2="108.693" stroke="#BABBBD"/>
<g filter="url(#filter0_b_75_25)">
<path d="M4 0.5H47C48.933 0.5 50.5 2.067 50.5 4V114C50.5 115.933 48.933 117.5 47 117.5H4C2.067 117.5 0.5 115.933 0.5 114V4C0.5 2.067 2.067 0.5 4 0.5Z" stroke="#BABBBD"/>
</g>
<line x1="25.5" y1="5" x2="25.5" y2="703" stroke="#BABBBD"/>
<line x1="0.000322059" y1="5" x2="50.0003" y2="5.0161" stroke="#BABBBD" strokeWidth="2"/>
<path fillRule="evenodd" clipRule="evenodd" d="M28 2.99154H23C21.3431 2.99154 20 4.32332 20 5.96616V701.034C20 702.677 21.3431 704.008 23 704.008H28C29.6569 704.008 31 702.677 31 701.034V5.96615C31 4.32332 29.6569 2.99154 28 2.99154ZM23 2C20.7909 2 19 3.77571 19 5.96616V701.034C19 703.224 20.7909 705 23 705H28C30.2091 705 32 703.224 32 701.034V5.96615C32 3.77571 30.2091 2 28 2H23Z" fill="#BABBBD"/>
<defs>
<filter id="filter0_b_75_25" x="-4" y="-4" width="59" height="126" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feGaussianBlur in="BackgroundImageFix" stdDeviation="2"/>
<feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_75_25"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_75_25" result="shape"/>
</filter>
</defs>
</svg>

       <ResponsiveContainer className="item-2" width="100%">
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
            <XAxis type="number" strokeWidth={'0.1mm'} stroke="rgb(255 255 255 / 0%)" tickCount={27}  tick={{ fill: '#7F00FF', fontSize: '14px' }} domain={[-15, 15]} />
          
            <YAxis ticks= {tick_yaxis} domain={[Number(mintick_y), Number(maxtick_y)]} dataKey="depth"  type="number" strokeWidth={'0.1mm'} stroke="rgb(255 255 255 / 0%)"  tick={customizedGroupTick} /> 
            
            <Tooltip content={<CustomTooltip/>}  />
            <ReferenceLine className="y7676" y={Number(mintick_y)} stroke="#BABBBD" />
             {/*
            <ReferenceLine className="y7676" x="-15" stroke="red" /> */}
            {/* <Customized component={customizedGroupTick} /> */}

            <Line data = {toJS(APP_STORAGE.sensors.getSess_second())} strokeWidth={'2'}  dataKey="data_s" stroke="#9566FB" />
            <Line data = {toJS(APP_STORAGE.sensors.getSess_first())} strokeWidth={'2'} dataKey="data_f" stroke="#00B394" />
          </LineChart>
        </ResponsiveContainer>
      </Box>
      );
    }
  
  }


  if(!toJS(APP_STORAGE.sensors.getdataCharts()).length && !toJS(APP_STORAGE.sensors.getSessFirstLast().length)){ 
    return (
      <Box className="container_charts" sx={{background: '#f1f5fcb3', 
      borderTopLeftRadius: '48px', 
      border: '1px solid #8F9DCE', 
      display: 'grid', 
      alignItems: 'center',
      }}>   

<svg width="51" className="item-1" height="716" viewBox="0 0 51 716" fill="none" xmlns="http://www.w3.org/2000/svg">
<line x1="31.6091" y1="71.0087" x2="50.2144" y2="47.6882" stroke="#BABBBD"/>
<line x1="31.6091" y1="64.0087" x2="50.2144" y2="40.6882" stroke="#BABBBD"/>
<line x1="31.6216" y1="55.6732" x2="50.6216" y2="33.6732" stroke="#BABBBD"/>
<line x1="31.6216" y1="48.6732" x2="50.6216" y2="26.6732" stroke="#BABBBD"/>
<line x1="31.6216" y1="41.6732" x2="50.6216" y2="19.6732" stroke="#BABBBD"/>
<line x1="31.6216" y1="34.6732" x2="50.6216" y2="12.6732" stroke="#BABBBD"/>
<line x1="31.6216" y1="26.6732" x2="50.6216" y2="4.67319" stroke="#BABBBD"/>
<line x1="31.6222" y1="19.6725" x2="44.6222" y2="4.67254" stroke="#BABBBD"/>
<line x1="31.6" y1="13.7" x2="37.6" y2="5.7" stroke="#BABBBD"/>
<path d="M31.6418 76.7143L50.5449 53.7551" stroke="#BABBBD"/>
<line x1="31.6216" y1="82.6732" x2="50.6216" y2="60.6732" stroke="#BABBBD"/>
<line x1="31.6091" y1="90.0087" x2="50.2144" y2="66.6882" stroke="#BABBBD"/>
<line x1="31.6091" y1="97.0087" x2="50.2144" y2="73.6882" stroke="#BABBBD"/>
<line x1="31.6124" y1="103.005" x2="50.6124" y2="79.6842" stroke="#BABBBD"/>
<line x1="31.606" y1="110.013" x2="50.606" y2="85.6922" stroke="#BABBBD"/>
<line x1="31.606" y1="116.013" x2="50.606" y2="91.6922" stroke="#BABBBD"/>
<line x1="34.6096" y1="117.688" x2="50.6096" y2="97.6877" stroke="#BABBBD"/>
<line x1="11.6464" y1="117.646" x2="19.6464" y2="109.646" stroke="#BABBBD"/>
<line x1="5.64645" y1="117.646" x2="19.6464" y2="103.646" stroke="#BABBBD"/>
<line x1="0.656128" y1="115.637" x2="19.6561" y2="97.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="108.637" x2="19.6561" y2="90.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="108.637" x2="19.6561" y2="90.637" stroke="#BABBBD"/>
<path d="M0.5 102L19.5 84" stroke="#BABBBD"/>
<line x1="0.656128" y1="95.637" x2="19.6561" y2="77.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="88.637" x2="19.6561" y2="70.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="80.637" x2="19.6561" y2="62.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="73.637" x2="19.6561" y2="55.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="65.637" x2="19.6561" y2="47.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="58.637" x2="19.6561" y2="40.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="50.637" x2="19.6561" y2="32.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="42.637" x2="19.6561" y2="24.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="34.637" x2="19.6561" y2="16.637" stroke="#BABBBD"/>
<line x1="0.656128" y1="27.637" x2="19.6561" y2="9.63702" stroke="#BABBBD"/>
<line x1="0.657318" y1="20.6359" x2="17.6573" y2="4.6359" stroke="#BABBBD"/>
<line x1="0.646447" y1="14.6464" x2="9.64645" y2="5.64645" stroke="#BABBBD"/>
<line x1="39.5968" y1="117.704" x2="50.5968" y2="102.704" stroke="#BABBBD"/>
<line x1="43.6053" y1="117.693" x2="50.6053" y2="108.693" stroke="#BABBBD"/>
<g filter="url(#filter0_b_75_25)">
<path d="M4 0.5H47C48.933 0.5 50.5 2.067 50.5 4V114C50.5 115.933 48.933 117.5 47 117.5H4C2.067 117.5 0.5 115.933 0.5 114V4C0.5 2.067 2.067 0.5 4 0.5Z" stroke="#BABBBD"/>
</g>
<line x1="25.5" y1="5" x2="25.5" y2="703" stroke="#BABBBD"/>
<line x1="0.000322059" y1="5" x2="50.0003" y2="5.0161" stroke="#BABBBD" strokeWidth="2"/>
<path fillRule="evenodd" clipRule="evenodd" d="M28 2.99154H23C21.3431 2.99154 20 4.32332 20 5.96616V701.034C20 702.677 21.3431 704.008 23 704.008H28C29.6569 704.008 31 702.677 31 701.034V5.96615C31 4.32332 29.6569 2.99154 28 2.99154ZM23 2C20.7909 2 19 3.77571 19 5.96616V701.034C19 703.224 20.7909 705 23 705H28C30.2091 705 32 703.224 32 701.034V5.96615C32 3.77571 30.2091 2 28 2H23Z" fill="#BABBBD"/>
<defs>
<filter id="filter0_b_75_25" x="-4" y="-4" width="59" height="126" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feGaussianBlur in="BackgroundImageFix" stdDeviation="2"/>
<feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_75_25"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_75_25" result="shape"/>
</filter>
</defs>
</svg>

     <ResponsiveContainer className="item-2" width="100%">
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
          <XAxis type="number" strokeWidth={'0.1mm'} stroke="rgb(255 255 255 / 0%)"  tickCount={27}  tick={{ fill: '#7F00FF', fontSize: '14px' }} domain={[-15, 15]} />
        
          <YAxis  ticks={ [0, 10, 20, 30, 40]} domain={[-15, 40]} dataKey="depth"  type="number" strokeWidth={'0.1mm'} stroke="rgb(255 255 255 / 0%)"  tick={customizedGroupTick} /> 
          
          <Tooltip content={<CustomTooltip/>}  />
          {/* <ReferenceLine className="y7676"  stroke="#BABBBD" /> */}

          <Line strokeWidth={'2'}  dataKey="data_s" stroke="#9566FB" />
          <Line  strokeWidth={'2'} dataKey="data_f" stroke="#00B394" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
    );
  };
}
}