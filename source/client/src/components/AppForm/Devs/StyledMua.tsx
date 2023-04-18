import * as React from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { alpha, styled,  lighten, darken  } from '@mui/material/styles';
import TreeItem, { TreeItemProps, treeItemClasses } from '@mui/lab/TreeItem';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';

import { useSpring, animated } from '@react-spring/web';
import { TransitionProps } from '@mui/material/transitions';

import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import ShowChartIcon from '@mui/icons-material/ShowChart';



import { APP_STORAGE } from "../../../storage/AppStorage";
import { Box } from '@mui/material';





export function MinusSquare(props: SvgIconProps) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

export function PlusSquare(props: SvgIconProps) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

export function CloseSquare(props: SvgIconProps) {
  return (
    <SvgIcon
      className="close"
      fontSize="inherit"
      style={{ width: 14, height: 14 }}
      {...props}
    >
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
    </SvgIcon>
  );
}

export function TransitionComponent(props: TransitionProps) {
  const style = useSpring({
    from: {
      opacity: 0,
      transform: 'translate3d(20px,0,0)',
    },
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
    },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

export const StyledMua = styled((props: TreeItemProps) => (
  <TreeItem {...props} TransitionComponent={TransitionComponent} />
))(({ theme }) => ({
  [`& .${treeItemClasses.iconContainer}`]: {
    '& .close': {
      opacity: 0.3,
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
}));

export const id_dev_sess = async (event: any, node: any) => { 
 APP_STORAGE.sensors.setIdDevSess(node) 
}

export const handleChange = async (event: any, node: any) => {
  APP_STORAGE.sensors.setActiveButtonSort('sort');
  APP_STORAGE.sensors.setActiveButtonSortDesc('sort');
  APP_STORAGE.sensors.setdataCharts([]);
  APP_STORAGE.sensors.setDevSession(null);
  
   if(node.includes('_dev_id_') === false){
    APP_STORAGE.devs_groups.setParentId(node);
    APP_STORAGE.main.setTitle("Показания устройств");
    APP_STORAGE.devs.setIdDevs(node);
    APP_STORAGE.devs_groups.setMiddleForm(1);
   }
   
   if(node.includes('_dev_id_key_') === true){
    APP_STORAGE.devs.setIdChild(node);
    APP_STORAGE.sensors.setSortDesc('') ;
    
    APP_STORAGE.devs_groups.setMiddleForm(2)
   }  
}


export const GroupHeader = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: '-8px',
  padding: '4px 10px',
  color: theme.palette.primary.main,
  backgroundColor:
    theme.palette.mode === 'light'
      ? lighten(theme.palette.primary.light, 0.85)
      : darken(theme.palette.primary.main, 0.8),
}));

export const options = async (event: any, node: any) => {
APP_STORAGE.devs_groups.setParent(node);
APP_STORAGE.devs.setGroupDevId(String(node));
}

export const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length)
 
  {
    return (
      <Box sx={{background: '#fff', p: '4px', borderRadius:' 4px', boxShadow: '0px 1px 8px 0px rgba(15, 134, 225, 0.2)'}}>
        <Box sx ={{display: 'flex', justifyItems: 'center', alignItems: 'center'}}> 
        <ShowChartIcon sx= {{ color: '#FFAD4E', fontSize: '14px'}}  />
        <Typography sx= {{color:"#808080",  fontSize: '14px',  mr: '2px'}}>Глубина - </Typography>
        <Typography sx= {{color:"#266BF1", fontSize: '14px'}}> {`${label}`}  </Typography>
          </Box>  

          {payload && payload[0]  &&
          <Box sx={{display: 'flex' , justifyItems: 'center', alignItems: 'center'}}> 
          <DeviceThermostatIcon sx={{color: '#8884d8', fontSize: '14px'}}/>
        <Typography sx= {{color:"#808080", fontSize: '14px', mr: '2px'}}>Температура ( последняя сессия ) </Typography>
        <Typography sx= {{color:"#8884d8", fontSize: '14px'}}> {`${payload[0].value}`}  </Typography>
          </Box> 
         }
          {payload && payload[1]  &&

          <Box sx={{display: 'flex' , justifyItems: 'center', alignItems: 'center'}}> 
          <DeviceThermostatIcon sx={{color: '#82ca9d', fontSize: '14px'}}/>
        <Typography sx= {{color:"#808080", fontSize: '14px', mr: '14px'}}>Температура (первая сессия) </Typography>
        <Typography sx= {{color:"#82ca9d", fontSize: '14px'}}>   {`${payload[1].value}`}  </Typography>
          </Box>  }

          {payload && payload[2]  &&

<Box sx={{display: 'flex' , justifyItems: 'center', alignItems: 'center'}}> 
<DeviceThermostatIcon sx={{color: '#FE6F4F', fontSize: '14px'}}/>
<Typography sx= {{color:"#808080", fontSize: '14px', mr: '14px'}}>Температура (первая сессия) </Typography>
<Typography sx= {{color:"#FE6F4F", fontSize: '14px'}}>   {`${payload[2].value}`}  </Typography>
</Box>  }
      </Box>
    );
  }
  return null;
};










