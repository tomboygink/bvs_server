
import { Box, Typography } from "@mui/material";
import React, { FunctionComponent } from "react";

import ShowChartIcon from '@mui/icons-material/ShowChart';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';



export const CustomizedLabel: FunctionComponent<any> = (props: any) => {
  const { x, y, stroke, value } = props;
    if(Number(1.44) === Number(value)){
      return (
        <text x={x} y={y} dy={-4} fill={'#FF0404'} fontSize={14} color={'red'} textAnchor="middle">
         {value} Критично
        </text>
      );
    }
 
  

};

export const customizedGroupTick = (props: any) => {
  const { index, x, y, payload } = props;

  return (
   
          <g>
         <rect x={x} y ={y}  className ='map'  width="4" height="8" fill="#808080" fontFamily="Verdana" fontSize="14px" />
        <text dx={x - 35} dy={y + 10} fill="blue" fontSize="12px" textAnchor="middle">
           {payload.value}
        </text>
  </g>
  ); 
};

export const CustomTooltip = ({ active, payload, label, props }: any) => {

  
  if (active && payload && payload.length)
  {
    return (
      <> 
      <Box sx={{background: '#fff', p: '4px', borderRadius:' 4px', boxShadow: '0px 1px 8px 0px rgba(15, 134, 225, 0.2)'}}>
        <Box sx ={{display: 'flex', justifyItems: 'center', alignItems: 'center'}}> 
        <ShowChartIcon sx= {{ color: '#FFAD4E', fontSize: '14px'}}  />
        <Typography sx= {{color:"#808080",  fontSize: '14px',  mr: '2px'}}>Глубина - </Typography>
        <Typography sx= {{color:"#266BF1", fontSize: '14px'}}> {`${label}`}  </Typography>
          </Box>  

          {payload && payload[0]  &&
          <Box sx={{display: 'flex' , justifyItems: 'center', alignItems: 'center'}}> 
          <DeviceThermostatIcon sx={{color: '#8884d8', fontSize: '14px'}}/>
        <Typography sx= {{color:"#808080", fontSize: '14px', mr: '2px'}}>Температура </Typography>
        <Typography sx= {{color:"#8884d8", fontSize: '14px'}}> {`${payload[0].value}`}  </Typography>
          </Box> 
         }
          {payload && payload[1]  &&

          <Box sx={{display: 'flex' , justifyItems: 'center', alignItems: 'center'}}> 
          <DeviceThermostatIcon sx={{color: '#82ca9d', fontSize: '14px'}}/>
        <Typography sx= {{color:"#808080", fontSize: '14px', mr: '14px'}}>Температура</Typography>
        <Typography sx= {{color:"#82ca9d", fontSize: '14px'}}>   {`${payload[1].value}`}  </Typography>
          </Box>  }

          {payload && payload[2]  &&

<Box sx={{display: 'flex' , justifyItems: 'center', alignItems: 'center'}}> 
<DeviceThermostatIcon sx={{color: '#FE6F4F', fontSize: '14px'}}/>
<Typography sx= {{color:"#808080", fontSize: '14px', mr: '14px'}}>Температура </Typography>
<Typography sx= {{color:"#FE6F4F", fontSize: '14px'}}>   {`${payload[2].value}`}  </Typography>
</Box>  }
      </Box>
      </>
    );
  }
  return null;
};



