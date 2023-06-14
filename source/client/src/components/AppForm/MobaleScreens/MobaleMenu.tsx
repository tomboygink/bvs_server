import { Button, Menu, MenuItem, Box } from '@mui/material';
import React from 'react';

import {APP_STORAGE} from '../../../storage/AppStorage'

import {DevsGroupsTree} from '../../AppForm/DevsContainer/DevsGroupsTree';
import {LeftPanelAdditionalInformation} from '../Sensors/LeftPanelAdditionalInformation'




const MobaleMenu = () => {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [idEl, setIdEl] = React.useState('');


  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>{
    setIdEl(event.currentTarget.id)
    setAnchorEl(event.currentTarget)
    document.getElementById(event.currentTarget.id).style.background  = "#1659DB";
    APP_STORAGE.mobale.setOpenModalMenu(true);
  }

  const handleClose =() => {
    setAnchorEl(null)
    document.getElementById(idEl).style.background  = "#266BF1";0
    APP_STORAGE.mobale.setOpenModalMenu(false);
  }

  return (
    <div className='warapper-menu-mobale' >
    <Box 
    className='menu-mobale'
    >

    <Button
     className='menu-mobale-button'     
     id="basic-button1"
     aria-controls={open ? 'basic-menu' : undefined}
     onClick={handleClick}         
    >
    Устройства
    </Button>

    <Button
     className='menu-mobale-button'  
     id="basic-button2"
     aria-controls={open ? 'basic-menu' : undefined}
     onClick={handleClick}     
        >
    Сенсоры
    </Button>

    <Button
     className='menu-mobale-button'
     id="basic-button3"
     aria-controls={open ? 'basic-menu' : undefined}
     onClick={handleClick}       
             >
    Дополнительно
    </Button>

    <Menu
        id="basic-menu"
        className='menu-list'
        anchorEl={anchorEl}
        open={APP_STORAGE.mobale.getOpenModalMenu()}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >

        <MenuItem  >
        {idEl === 'basic-button1' &&
        <DevsGroupsTree/> 
        }
         {idEl === 'basic-button2' &&
        <LeftPanelAdditionalInformation/> 
        }
        {idEl === 'basic-button3' &&
        
        <>
        
        </>
        }
        </MenuItem>
      </Menu>
   </Box>
</div>
  )
}

export default MobaleMenu