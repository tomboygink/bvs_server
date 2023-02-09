import React from "react";
import { observer } from "mobx-react";

import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


interface IProps {}

//Компонент формы приложения
@observer
export class SensorsMenu extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  render(): React.ReactNode {
   
      return (
        <React.Fragment>
              <div>
     
      <Menu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={document.getElementById('demo-customized-button123')}
        open={false}
        //onClose={false}
      >
        <MenuItem  disableRipple>
          <EditIcon />
          Edit
        </MenuItem>
        <MenuItem  disableRipple>
          <FileCopyIcon />
          Duplicate
        </MenuItem>

    
      </Menu>
    </div>

        </React.Fragment>
      );
  }
}
