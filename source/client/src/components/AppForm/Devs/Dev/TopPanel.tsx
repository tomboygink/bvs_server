import React from "react";
import { observer } from "mobx-react";
import { Box, Button, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";

// import styles from '../../../../../scss/dev.module.scss';
import { style } from "@mui/system";
import { APP_STORAGE } from "../../../../storage/AppStorage";

import '../../.././../../scss/dev.scss'


interface IProps { }

const TopPanel = () => {

  const [alignment, setAlignment] = React.useState('top_menu-1');
 
  const handleChange = (
    
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
    APP_STORAGE.devs.setTopMenuDev(newAlignment)
  };
    return(
             <Box className='top_panel_div' sx ={{height: '50px', background: '#fff', mb: '28px', width: '100%'}}>
        <ToggleButtonGroup  
        color="primary"
        value={APP_STORAGE.devs.getTopMenuDev()}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
        >

     <ToggleButton sx = {{border: 'none', p: '4px', mr: '24px', textTransform: 'none', fontSize: '12px', borderRadius: '4px'}} value="top_menu-1">Устройство</ToggleButton>
      <ToggleButton sx = {{border: 'none', p: '4px', mr: '24px', textTransform: 'none',  fontSize: '12px', borderRadius: '4px'}} value="top_menu-2">Сессии за период</ToggleButton>
      <ToggleButton sx = {{border: 'none', p: '4px', mr: '24px', textTransform: 'none', fontSize: '12px', borderRadius: '4px'}} value="top_menu-3">Контроль критичности отклюнений</ToggleButton>
      <ToggleButton sx = {{border: 'none', p: '4px', mr: '24px', textTransform: 'none', fontSize: '12px', borderRadius: '4px'}} value="top_menu-4">Выбранная сессия</ToggleButton>

      </ToggleButtonGroup>
         </Box>
    )
}

export default TopPanel