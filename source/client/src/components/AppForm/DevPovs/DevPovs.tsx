import * as React from "react";
import { Box, Typography } from "@mui/material";

import { observer } from "mobx-react";
import { APP_STORAGE } from "../../../storage/AppStorage";


import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CommitIcon from "@mui/icons-material/Commit";

interface IProps { }

@observer
export class DevPovs extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  render(): React.ReactNode {

  
    let StartPovs = APP_STORAGE.sensors.getStartPovs().split("T")[0]; ///////// Перевернуть дату
    const [year_startPovs, month_startPovs, day_startPovs] = StartPovs.split("-");
    let StartPovsDate = `${day_startPovs}.${month_startPovs}.${year_startPovs}`;
    let StartPovsTime = APP_STORAGE.sensors.getTimeDevSessFirst().split("T")[1];

    let EndPovs = APP_STORAGE.sensors.getEndPovs().split("T")[0]; ///////// Перевернуть дату
    const [year_endPovs, month_endPovs, day_endPovs] = EndPovs.split("-");
    let EndPovsDate = `${day_endPovs}.${month_endPovs}.${year_endPovs}`;
    let EndPovsTime = APP_STORAGE.sensors.getTimeDevSessFirst().split("T")[1];
   
    return (
      <div className="wrapper-sensors">
    {APP_STORAGE.sensors.getStartPovs() !== '' && APP_STORAGE.sensors.getEndPovs() !== '' && APP_STORAGE.devs_groups.getMiddleForm() === 2 &&
<>
 <Typography sx={{ fontWeight: "500" , color: '#0D1C52', mb : '12px', mt: '40px' }}>  Поверочный интервал </Typography>
 <Box
    sx={{
     width: "100%",
     height: '100%',
     background: "#fff",
     borderRadius: "4px",
     display: "flex",
     padding: '16px',
     flexDirection: 'column',
     overflow: "auto",
   }}
 >

<Box  sx = {{fontSize: '15px', color:'#000', display: 'flex', pb: '12px', justifyContent: 'flex-start', alignItems: 'center'}} >
<AccessTimeIcon sx ={{color: '#eee',  mr: '4px'}}/> 
{StartPovsDate} {' '} {StartPovsTime} 
<Typography sx ={{color: '#808080', fontSize: '12px', ml : '8px'}}>  Начало</Typography> </Box>

<Box sx = {{fontSize: '15px', color:'#000', display: 'flex' , pb: '12px' , justifyContent: 'flex-start', alignItems: 'center'}} >
  <AccessTimeIcon sx ={{color: '#eee', mr: '4px'}}/>
  {EndPovsDate} {' '} {EndPovsTime}
  <Typography sx ={{color: '#808080', fontSize: '12px', ml : '8px'}}>  Завершение </Typography></Box>

 </Box>
 </>
}


      </div>
    );
  }
}
