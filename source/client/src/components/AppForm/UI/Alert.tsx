import * as React from 'react';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Theme } from '@mui/material/styles';
import { Alert } from '@mui/material';

const icon = (
<Alert severity="success">Данные успешно сохранены!</Alert>
);

export default function SlideFromContainer() {
  const [checked, setChecked] = React.useState(true);
  const containerRef = React.useRef(null);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Box
      sx={{
        height: 180,
        width: 240,
        display: 'flex',
        position: 'relative',
        padding: 2,
        borderRadius: 1,
        bgcolor: (theme) =>
          theme.palette.mode === 'light' ? 'grey.100' : 'grey.900',
        overflow: 'hidden',
      }}
      ref={containerRef}
    >
      <Box sx={{ width: 200 }}>
        <FormControlLabel
          control={<Switch checked={checked} onChange={handleChange} />}
          label="Show from target"
        />
        <Slide direction="up" in={checked} container={containerRef.current}>
          {icon}
        </Slide>
      </Box>
    </Box>
  );
}