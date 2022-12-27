import React from "react";
import { observer } from "mobx-react";


import { Box, Alert, Typography  } from "@mui/material";
import { APP_STORAGE } from "../../../storage/AppStorage";
import { WidthFull } from "@mui/icons-material";

import EdgesensorHighIcon from '@mui/icons-material/EdgesensorHigh';

interface IProps {}

//Устройства
@observer
export class DevsGroups extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  render(): React.ReactNode {
    
    if (APP_STORAGE.auth_form.getUser())
      return (
        <React.Fragment>
          <Box className="wrapper-devs" sx={{ mt: '44px', display: 'flex', flexDirection: 'column;', alignItems: 'flex-start;', ml: '1rem', mr: '32px'}}> 
          <Typography sx={{fontWeight: '500' , pb: '20px'}}>Устройства</Typography>
          
          <Box sx = {{width: '290px', height: '168px', background: '#fff', p: '25px', borderRadius: '4px', display: 'flex', flexDirection: 'column', justifyContent:'center'}}>

          <Box sx={{display: 'flex', alignItems: 'flex-start', pb: '31px'}}>
            <EdgesensorHighIcon fontSize="small"  sx={{pr: '12px', color: '#266BF1'}}/>
            <Typography>000 - Курган</Typography>
          </Box>

          <Box sx={{display: 'flex', alignItems: 'flex-start' , pb: '31px'}}>
            <EdgesensorHighIcon fontSize="small"  sx={{pr: '12px', color: '#266BF1'}}/>
            <Typography>000 - Курган</Typography>
          </Box>

          <Box sx={{display: 'flex', alignItems: 'flex-start'}}>
            <EdgesensorHighIcon fontSize="small"  sx={{pr: '12px', color: '#266BF1'}}/>
            <Typography>Устройства в Кургане в СБИ</Typography>
          </Box>
            
          </Box>

          </Box>
         
        </React.Fragment>
      );
  }
}
