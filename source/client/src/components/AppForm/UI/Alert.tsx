import * as React from 'react';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Theme } from '@mui/material/styles';
import { Alert } from '@mui/material';
import { APP_STORAGE } from '../../../storage/AppStorage';

const icon = (
<Alert sx = {{width: '100%', pb: '4px'}} severity="success">Данные успешно сохранены!</Alert>
);

export default function SlideFromContainer() {
  const [checked, setChecked] = React.useState(true);
  const containerRef = React.useRef(null);

  return (
    <Box
      sx={{
        display: 'flex',
        position: 'relative',
        borderRadius: 1,
        overflow: 'hidden',
      }}
      ref={containerRef}
    >
     
      
        <Slide direction="up" in={APP_STORAGE.getNotifications()} container={containerRef.current}>
          {icon}
        </Slide>

    </Box>
  );
}