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
       
  {/* <svg className="svg_well" width="507" height="764" viewBox="0 0 507 764" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_b_7_15)">
<path d="M143 0.5H201C202.933 0.5 204.5 2.067 204.5 4V114.249C204.5 116.182 202.933 117.749 201 117.749H143C141.067 117.749 139.5 116.182 139.5 114.249V4.00001C139.5 2.06701 141.067 0.5 143 0.5Z" stroke="#266BF1"/>
<path d="M143 0.5H201C202.933 0.5 204.5 2.067 204.5 4V114.249C204.5 116.182 202.933 117.749 201 117.749H143C141.067 117.749 139.5 116.182 139.5 114.249V4.00001C139.5 2.06701 141.067 0.5 143 0.5Z" stroke="#565252" strokeOpacity="0.2"/>
</g>
<g filter="url(#filter1_b_7_15)">
<path d="M143 0.5H201C202.933 0.5 204.5 2.067 204.5 4V114.249C204.5 116.182 202.933 117.749 201 117.749H143C141.067 117.749 139.5 116.182 139.5 114.249V4.00001C139.5 2.06701 141.067 0.5 143 0.5Z" stroke="#266BF1"/>
<path d="M143 0.5H201C202.933 0.5 204.5 2.067 204.5 4V114.249C204.5 116.182 202.933 117.749 201 117.749H143C141.067 117.749 139.5 116.182 139.5 114.249V4.00001C139.5 2.06701 141.067 0.5 143 0.5Z" stroke="#565252" strokeOpacity="0.2"/>
</g>
<line y1="-0.5" x2="30.8629" y2="-0.5" transform="matrix(-0.842436 0.538796 -0.599691 -0.800232 204 22.1717)" stroke="black"/>
<line y1="-0.5" x2="30.8629" y2="-0.5" transform="matrix(-0.842436 0.538796 -0.599691 -0.800232 204 27.7147)" stroke="black"/>
<line y1="-0.5" x2="30.8629" y2="-0.5" transform="matrix(-0.842436 0.538796 -0.599691 -0.800232 205 33.2576)" stroke="black"/>
<line y1="-0.5" x2="30.8629" y2="-0.5" transform="matrix(-0.842436 0.538796 -0.599691 -0.800232 204 39.7243)" stroke="black"/>
<line y1="-0.5" x2="30.8629" y2="-0.5" transform="matrix(-0.842436 0.538796 -0.599691 -0.800232 204 46.191)" stroke="black"/>
<line y1="-0.5" x2="30.8629" y2="-0.5" transform="matrix(-0.842436 0.538796 -0.599691 -0.800232 204 52.6578)" stroke="black"/>
<line y1="-0.5" x2="30.8629" y2="-0.5" transform="matrix(-0.842436 0.538796 -0.599691 -0.800232 204 59.1245)" stroke="black"/>
<line y1="-0.5" x2="30.8629" y2="-0.5" transform="matrix(-0.842436 0.538796 -0.599691 -0.800232 204 65.5913)" stroke="black"/>
<line y1="-0.5" x2="30.8629" y2="-0.5" transform="matrix(-0.842436 0.538796 -0.599691 -0.800232 204 72.058)" stroke="black"/>
<line y1="-0.5" x2="30.8629" y2="-0.5" transform="matrix(-0.842436 0.538796 -0.599691 -0.800232 204 77.601)" stroke="black"/>
<path d="M204.285 84.0677L178.285 100.696" stroke="black"/>
<line y1="-0.5" x2="30.8629" y2="-0.5" transform="matrix(-0.842436 0.538796 -0.599691 -0.800232 204 89.6107)" stroke="black"/>
<line y1="-0.5" x2="30.8629" y2="-0.5" transform="matrix(-0.842436 0.538796 -0.599691 -0.800232 204 96.0774)" stroke="black"/>
<path d="M204 101.5L181.5 117" stroke="black"/>
<line y1="-0.5" x2="19.2942" y2="-0.5" transform="matrix(-0.818457 0.574568 -0.635263 -0.772296 203.792 106.239)" stroke="black"/>
<line x1="204.307" y1="110.395" x2="195.307" y2="117.395" stroke="black"/>
<rect x="165.5" y="15.2811" width="12" height="748.219" rx="3.5" fill="white" stroke="#266BF1"/>
<line x1="171.5" y1="23.0955" x2="171.5" y2="732.59" stroke="black"/>
<line y1="37.3766" x2="139" y2="37.3766" stroke="black"/>
<line x1="205" y1="37.3766" x2="507" y2="37.5" stroke="black"/>
<line x1="178" y1="17.0526" x2="204" y2="17.0526" stroke="black"/>
<line x1="140" y1="17.0526" x2="165" y2="17.0526" stroke="black"/>
<line y1="-0.5" x2="9.23776" y2="-0.5" transform="matrix(-0.866011 0.500025 -0.560348 -0.828258 148 17.5526)" stroke="black"/>
<line y1="-0.5" x2="9.23776" y2="-0.5" transform="matrix(-0.866011 0.500025 -0.560348 -0.828258 187 17.5526)" stroke="black"/>
<line y1="-0.5" x2="16.7733" y2="-0.5" transform="matrix(-0.834659 0.550768 -0.611675 -0.791109 154 17.5526)" stroke="black"/>
<line y1="-0.5" x2="16.7733" y2="-0.5" transform="matrix(-0.834659 0.550768 -0.611675 -0.791109 193 17.5526)" stroke="black"/>
<line y1="-0.5" x2="26.0005" y2="-0.5" transform="matrix(-0.846138 0.532964 -0.593824 -0.804595 162 17.5526)" stroke="black"/>
<line y1="-0.5" x2="30.8629" y2="-0.5" transform="matrix(-0.842436 0.538796 -0.599691 -0.800232 165 21.2479)" stroke="black"/>
<line y1="-0.5" x2="30.8629" y2="-0.5" transform="matrix(-0.842436 0.538796 -0.599691 -0.800232 203 16.6288)" stroke="black"/>
<line y1="-0.5" x2="29.5236" y2="-0.5" transform="matrix(-0.846779 0.531945 -0.592798 -0.805351 165 26.7908)" stroke="black"/>
<line y1="-0.5" x2="29.5236" y2="-0.5" transform="matrix(-0.846779 0.531945 -0.592798 -0.805351 165 32.3337)" stroke="black"/>
<line y1="-0.5" x2="29.5236" y2="-0.5" transform="matrix(-0.846779 0.531945 -0.592798 -0.805351 165 38.8005)" stroke="black"/>
<line y1="-0.5" x2="29.5236" y2="-0.5" transform="matrix(-0.846779 0.531945 -0.592798 -0.805351 165 45.2672)" stroke="black"/>
<line y1="-0.5" x2="29.5236" y2="-0.5" transform="matrix(-0.846779 0.531945 -0.592798 -0.805351 165 50.8102)" stroke="black"/>
<line y1="-0.5" x2="29.5236" y2="-0.5" transform="matrix(-0.846779 0.531945 -0.592798 -0.805351 165 56.3531)" stroke="black"/>
<line y1="-0.5" x2="29.5236" y2="-0.5" transform="matrix(-0.846779 0.531945 -0.592798 -0.805351 165 61.896)" stroke="black"/>
<line y1="-0.5" x2="29.5236" y2="-0.5" transform="matrix(-0.846779 0.531945 -0.592798 -0.805351 165 67.4389)" stroke="black"/>
<line y1="-0.5" x2="29.5236" y2="-0.5" transform="matrix(-0.846779 0.531945 -0.592798 -0.805351 165 80.3724)" stroke="black"/>
<line y1="-0.5" x2="29.5236" y2="-0.5" transform="matrix(-0.846779 0.531945 -0.592798 -0.805351 165 85.9153)" stroke="black"/>
<line y1="-0.5" x2="29.5236" y2="-0.5" transform="matrix(-0.846779 0.531945 -0.592798 -0.805351 165 92.3821)" stroke="black"/>
<line y1="-0.5" x2="29.5236" y2="-0.5" transform="matrix(-0.846779 0.531945 -0.592798 -0.805351 165 97.925)" stroke="black"/>
<line y1="-0.5" x2="22.4774" y2="-0.5" transform="matrix(-0.845295 0.534301 -0.595171 -0.803599 165 104.392)" stroke="black"/>
<line y1="-0.5" x2="13.2522" y2="-0.5" transform="matrix(-0.830052 0.557687 -0.618565 -0.785734 165 109.935)" stroke="black"/>
<line y1="-0.5" x2="29.5236" y2="-0.5" transform="matrix(-0.846779 0.531945 -0.592798 -0.805351 165 73.9057)" stroke="black"/>
<line x1="169" y1="128.5" x2="174" y2="128.5" stroke="black"/>
<line x1="169" y1="175.5" x2="174" y2="175.5" stroke="black"/>
<line x1="169" y1="241.5" x2="174" y2="241.5" stroke="black"/>
<line x1="169" y1="306.5" x2="174" y2="306.5" stroke="black"/>
<path d="M174 306.5H169" stroke="black"/>
<path d="M174 372H169" stroke="black"/>
<line x1="169" y1="79.5" x2="174" y2="79.5" stroke="black"/>
<line x1="169" y1="44.5" x2="174" y2="44.5" stroke="black"/>
<defs>
<filter id="filter0_b_7_15" x="135" y="-4" width="74" height="126.249" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feGaussianBlur in="BackgroundImageFix" stdDeviation="2"/>
<feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_7_15"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_7_15" result="shape"/>
</filter>
<filter id="filter1_b_7_15" x="135" y="-4" width="74" height="126.249" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feGaussianBlur in="BackgroundImageFix" stdDeviation="2"/>
<feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_7_15"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_7_15" result="shape"/>
</filter>
</defs>
</svg> */}


      <Box sx ={{mt: '30%'}}>
      <Typography sx={{color: '#00B394', fontSize: '12px', display: 'flex', justifyContent: 'center', ml:' 30px'}}>
      <CommitIcon sx={{fontSize: '16px', color: '#00B394', mr: '4px'}}/>{APP_STORAGE.sensors.getTimeDevSessFirst()}</Typography>  
      <Typography sx={{color: '#8884d8', fontSize: '12px', display: 'flex', justifyContent: 'center', ml:' 30px'}}>
      <CommitIcon sx={{fontSize: '16px', color: '#9747FF', mr: '4px'}}/>{APP_STORAGE.sensors.getTimeDevSessLast()}</Typography>

      <Box sx ={{display: 'flex',  ml:' 30px'}}>
      <BatteryChargingFullIcon sx ={{ color : '#AAAAAA' }}/> 
      
      <Typography sx ={{color :'#AAAAAA'}}> {APP_STORAGE.sensors.getAkbSessLast()} АКБ</Typography>
      </Box>
      </Box>
   
     <ResponsiveContainer width="70%" height={740}>
        <LineChart
          layout="vertical"
          data={toJS(APP_STORAGE.sensors.getSessFirstLast())}
          margin={{
            top: 20,
            right: 120,
            left: 40,
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
  }


  if(!toJS(APP_STORAGE.sensors.getdataCharts()).length && !toJS(APP_STORAGE.sensors.getSessFirstLast().length)){

    return (
      <Box sx={{background: '#f1f5fcb3', borderTopLeftRadius: '48px', pt: '22px', border: '1px solid #8F9DCE', display: 'flex'}}>   
       
      {/* <svg className="svg_well" width="507" height="764" viewBox="0 0 507 764" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_b_7_15)">
    <path d="M143 0.5H201C202.933 0.5 204.5 2.067 204.5 4V114.249C204.5 116.182 202.933 117.749 201 117.749H143C141.067 117.749 139.5 116.182 139.5 114.249V4.00001C139.5 2.06701 141.067 0.5 143 0.5Z" stroke="#266BF1"/>
    <path d="M143 0.5H201C202.933 0.5 204.5 2.067 204.5 4V114.249C204.5 116.182 202.933 117.749 201 117.749H143C141.067 117.749 139.5 116.182 139.5 114.249V4.00001C139.5 2.06701 141.067 0.5 143 0.5Z" stroke="#565252" strokeOpacity="0.2"/>
    </g>
    <g filter="url(#filter1_b_7_15)">
    <path d="M143 0.5H201C202.933 0.5 204.5 2.067 204.5 4V114.249C204.5 116.182 202.933 117.749 201 117.749H143C141.067 117.749 139.5 116.182 139.5 114.249V4.00001C139.5 2.06701 141.067 0.5 143 0.5Z" stroke="#266BF1"/>
    <path d="M143 0.5H201C202.933 0.5 204.5 2.067 204.5 4V114.249C204.5 116.182 202.933 117.749 201 117.749H143C141.067 117.749 139.5 116.182 139.5 114.249V4.00001C139.5 2.06701 141.067 0.5 143 0.5Z" stroke="#565252" strokeOpacity="0.2"/>
    </g>
    <line y1="-0.5" x2="30.8629" y2="-0.5" transform="matrix(-0.842436 0.538796 -0.599691 -0.800232 204 22.1717)" stroke="black"/>
    <line y1="-0.5" x2="30.8629" y2="-0.5" transform="matrix(-0.842436 0.538796 -0.599691 -0.800232 204 27.7147)" stroke="black"/>
    <line y1="-0.5" x2="30.8629" y2="-0.5" transform="matrix(-0.842436 0.538796 -0.599691 -0.800232 205 33.2576)" stroke="black"/>
    <line y1="-0.5" x2="30.8629" y2="-0.5" transform="matrix(-0.842436 0.538796 -0.599691 -0.800232 204 39.7243)" stroke="black"/>
    <line y1="-0.5" x2="30.8629" y2="-0.5" transform="matrix(-0.842436 0.538796 -0.599691 -0.800232 204 46.191)" stroke="black"/>
    <line y1="-0.5" x2="30.8629" y2="-0.5" transform="matrix(-0.842436 0.538796 -0.599691 -0.800232 204 52.6578)" stroke="black"/>
    <line y1="-0.5" x2="30.8629" y2="-0.5" transform="matrix(-0.842436 0.538796 -0.599691 -0.800232 204 59.1245)" stroke="black"/>
    <line y1="-0.5" x2="30.8629" y2="-0.5" transform="matrix(-0.842436 0.538796 -0.599691 -0.800232 204 65.5913)" stroke="black"/>
    <line y1="-0.5" x2="30.8629" y2="-0.5" transform="matrix(-0.842436 0.538796 -0.599691 -0.800232 204 72.058)" stroke="black"/>
    <line y1="-0.5" x2="30.8629" y2="-0.5" transform="matrix(-0.842436 0.538796 -0.599691 -0.800232 204 77.601)" stroke="black"/>
    <path d="M204.285 84.0677L178.285 100.696" stroke="black"/>
    <line y1="-0.5" x2="30.8629" y2="-0.5" transform="matrix(-0.842436 0.538796 -0.599691 -0.800232 204 89.6107)" stroke="black"/>
    <line y1="-0.5" x2="30.8629" y2="-0.5" transform="matrix(-0.842436 0.538796 -0.599691 -0.800232 204 96.0774)" stroke="black"/>
    <path d="M204 101.5L181.5 117" stroke="black"/>
    <line y1="-0.5" x2="19.2942" y2="-0.5" transform="matrix(-0.818457 0.574568 -0.635263 -0.772296 203.792 106.239)" stroke="black"/>
    <line x1="204.307" y1="110.395" x2="195.307" y2="117.395" stroke="black"/>
    <rect x="165.5" y="15.2811" width="12" height="748.219" rx="3.5" fill="white" stroke="#266BF1"/>
    <line x1="171.5" y1="23.0955" x2="171.5" y2="732.59" stroke="black"/>
    <line y1="37.3766" x2="139" y2="37.3766" stroke="black"/>
    <line x1="205" y1="37.3766" x2="507" y2="37.5" stroke="black"/>
    <line x1="178" y1="17.0526" x2="204" y2="17.0526" stroke="black"/>
    <line x1="140" y1="17.0526" x2="165" y2="17.0526" stroke="black"/>
    <line y1="-0.5" x2="9.23776" y2="-0.5" transform="matrix(-0.866011 0.500025 -0.560348 -0.828258 148 17.5526)" stroke="black"/>
    <line y1="-0.5" x2="9.23776" y2="-0.5" transform="matrix(-0.866011 0.500025 -0.560348 -0.828258 187 17.5526)" stroke="black"/>
    <line y1="-0.5" x2="16.7733" y2="-0.5" transform="matrix(-0.834659 0.550768 -0.611675 -0.791109 154 17.5526)" stroke="black"/>
    <line y1="-0.5" x2="16.7733" y2="-0.5" transform="matrix(-0.834659 0.550768 -0.611675 -0.791109 193 17.5526)" stroke="black"/>
    <line y1="-0.5" x2="26.0005" y2="-0.5" transform="matrix(-0.846138 0.532964 -0.593824 -0.804595 162 17.5526)" stroke="black"/>
    <line y1="-0.5" x2="30.8629" y2="-0.5" transform="matrix(-0.842436 0.538796 -0.599691 -0.800232 165 21.2479)" stroke="black"/>
    <line y1="-0.5" x2="30.8629" y2="-0.5" transform="matrix(-0.842436 0.538796 -0.599691 -0.800232 203 16.6288)" stroke="black"/>
    <line y1="-0.5" x2="29.5236" y2="-0.5" transform="matrix(-0.846779 0.531945 -0.592798 -0.805351 165 26.7908)" stroke="black"/>
    <line y1="-0.5" x2="29.5236" y2="-0.5" transform="matrix(-0.846779 0.531945 -0.592798 -0.805351 165 32.3337)" stroke="black"/>
    <line y1="-0.5" x2="29.5236" y2="-0.5" transform="matrix(-0.846779 0.531945 -0.592798 -0.805351 165 38.8005)" stroke="black"/>
    <line y1="-0.5" x2="29.5236" y2="-0.5" transform="matrix(-0.846779 0.531945 -0.592798 -0.805351 165 45.2672)" stroke="black"/>
    <line y1="-0.5" x2="29.5236" y2="-0.5" transform="matrix(-0.846779 0.531945 -0.592798 -0.805351 165 50.8102)" stroke="black"/>
    <line y1="-0.5" x2="29.5236" y2="-0.5" transform="matrix(-0.846779 0.531945 -0.592798 -0.805351 165 56.3531)" stroke="black"/>
    <line y1="-0.5" x2="29.5236" y2="-0.5" transform="matrix(-0.846779 0.531945 -0.592798 -0.805351 165 61.896)" stroke="black"/>
    <line y1="-0.5" x2="29.5236" y2="-0.5" transform="matrix(-0.846779 0.531945 -0.592798 -0.805351 165 67.4389)" stroke="black"/>
    <line y1="-0.5" x2="29.5236" y2="-0.5" transform="matrix(-0.846779 0.531945 -0.592798 -0.805351 165 80.3724)" stroke="black"/>
    <line y1="-0.5" x2="29.5236" y2="-0.5" transform="matrix(-0.846779 0.531945 -0.592798 -0.805351 165 85.9153)" stroke="black"/>
    <line y1="-0.5" x2="29.5236" y2="-0.5" transform="matrix(-0.846779 0.531945 -0.592798 -0.805351 165 92.3821)" stroke="black"/>
    <line y1="-0.5" x2="29.5236" y2="-0.5" transform="matrix(-0.846779 0.531945 -0.592798 -0.805351 165 97.925)" stroke="black"/>
    <line y1="-0.5" x2="22.4774" y2="-0.5" transform="matrix(-0.845295 0.534301 -0.595171 -0.803599 165 104.392)" stroke="black"/>
    <line y1="-0.5" x2="13.2522" y2="-0.5" transform="matrix(-0.830052 0.557687 -0.618565 -0.785734 165 109.935)" stroke="black"/>
    <line y1="-0.5" x2="29.5236" y2="-0.5" transform="matrix(-0.846779 0.531945 -0.592798 -0.805351 165 73.9057)" stroke="black"/>
    <line x1="169" y1="128.5" x2="174" y2="128.5" stroke="black"/>
    <line x1="169" y1="175.5" x2="174" y2="175.5" stroke="black"/>
    <line x1="169" y1="241.5" x2="174" y2="241.5" stroke="black"/>
    <line x1="169" y1="306.5" x2="174" y2="306.5" stroke="black"/>
    <path d="M174 306.5H169" stroke="black"/>
    <path d="M174 372H169" stroke="black"/>
    <line x1="169" y1="79.5" x2="174" y2="79.5" stroke="black"/>
    <line x1="169" y1="44.5" x2="174" y2="44.5" stroke="black"/>
    <defs>
    <filter id="filter0_b_7_15" x="135" y="-4" width="74" height="126.249" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
    <feGaussianBlur in="BackgroundImageFix" stdDeviation="2"/>
    <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_7_15"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_7_15" result="shape"/>
    </filter>
    <filter id="filter1_b_7_15" x="135" y="-4" width="74" height="126.249" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
    <feGaussianBlur in="BackgroundImageFix" stdDeviation="2"/>
    <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_7_15"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_7_15" result="shape"/>
    </filter>
    </defs>
    </svg> */}
         <ResponsiveContainer width="70%" height={740}>
            <LineChart
              layout="vertical"
              data={toJS(APP_STORAGE.sensors.getSessFirstLast())}
              margin={{
                top: 20,
                right: 120,
                left: 40,
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
