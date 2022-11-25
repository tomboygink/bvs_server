import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { APP_STORAGE } from '../../../storage/AppStorage';


const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 420,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));


export default function CustomizedTooltips() {
  return (
    <div>
      <HtmlTooltip
        title={
          <React.Fragment>
            <Typography color="inherit">Необходимо подтвердить почту</Typography>
          </React.Fragment>
        }
      >
       <Button onClick={(e) => {APP_STORAGE.modal.set_ActMail('sess_id', APP_STORAGE.auth_form.getdt())}}>Подтвердить почту</Button>
      </HtmlTooltip>
    </div>
  );
}