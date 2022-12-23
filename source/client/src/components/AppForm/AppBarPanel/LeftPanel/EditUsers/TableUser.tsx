import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';


import { observer } from "mobx-react";

import {EditUser} from "./EditUser"

import { APP_STORAGE } from "../../../../../storage/AppStorage";
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';


interface IProps {}

@observer
export class TableUser extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }


  render(): React.ReactNode {
   
 
    let table_rows = []
    if (APP_STORAGE.reg_user.getAllUsers()) {
        let users = JSON.parse(JSON.stringify(APP_STORAGE.reg_user.getAllUsers()));
        for (var key in users) {
          let row = users[key];
            if (row.u_deleted === false) {
            table_rows.push(
            <TableRow
                key={row.u_id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
              <TableCell align="center" >{key}</TableCell>              
              <TableCell align="center" > {row.u_family} </TableCell>
              <TableCell  align="center" > {row.u_name} </TableCell>
              <TableCell  align="center">{row.u_father}</TableCell>
              <TableCell  align="center">{row.u_login}</TableCell>
              <TableCell  align="center">{row.u_telephone}</TableCell>
              <TableCell  align="center">{row.u_email}</TableCell>
              <TableCell  align="center">{row.u_info}</TableCell>
              <TableCell align="center"
                 onClick={(e) => {APP_STORAGE.edit_user.set_IdRows(row.u_id)}}>
                <DriveFileRenameOutlineOutlinedIcon fontSize="small"/>
             </TableCell>
             <TableCell  align="center">Действующая</TableCell> 
    
              </TableRow>

            )
          }

        else {

          table_rows.push(
            <TableRow 
                key={row.u_id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, background : '#b9b3b31f'}}
              >  
              <TableCell align="center" >{key}</TableCell>                 
              <TableCell sx = {{color: '#E31450'}}align="center"> {row.u_family} </TableCell>
              <TableCell sx = {{color: '#E31450'}} align="center" > {row.u_name} </TableCell>
              <TableCell sx = {{color: '#E31450'}} align="center">{row.u_father}</TableCell>
              <TableCell sx = {{color: '#E31450'}} align="center">{row.u_login}</TableCell>
              <TableCell sx = {{color: '#E31450'}} align="center">{row.u_telephone}</TableCell>
              <TableCell sx = {{color: '#E31450'}} align="center">{row.u_email}</TableCell>
              <TableCell sx = {{color: '#E31450'}} align="center">{row.u_info}</TableCell>
              <TableCell align="center"
                 onClick={(e) => {APP_STORAGE.edit_user.set_IdRows(row.u_id)}}>
                <DriveFileRenameOutlineOutlinedIcon fontSize="small"/>
             </TableCell>
             <TableCell  sx = {{color: '#E31450'}}align="center">Закрытая</TableCell>
              </TableRow>

            )

        }
        }
      }

    return (
      <React.Fragment>

<TableContainer component={Paper}>
  
      <Table  aria-label="simple table" id = 'info-table'>
        <TableHead>
          <TableRow key={110}>
            <TableCell align="center" > <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.2665 11.0277C14.303 8.41231 14.119 4.62842 11.7147 2.22411C9.1112 -0.37939 4.8901 -0.379389 2.28661 2.22411C-0.31689 4.8276 -0.31689 9.0487 2.28661 11.6522C4.69092 14.0565 8.47481 14.2405 11.0902 12.204C11.1015 12.2168 11.1132 12.2292 11.1254 12.2415L14.661 15.777C14.9864 16.1024 15.514 16.1024 15.8395 15.777C16.1649 15.4515 16.1649 14.9239 15.8395 14.5985L12.304 11.0629C12.2917 11.0507 12.2793 11.039 12.2665 11.0277ZM10.5362 3.40262C12.4888 5.35524 12.4888 8.52106 10.5362 10.4737C8.58356 12.4263 5.41774 12.4263 3.46512 10.4737C1.5125 8.52106 1.5125 5.35524 3.46512 3.40262C5.41774 1.45 8.58356 1.45 10.5362 3.40262Z" fill="#AAAAAA"/>
            </svg>
            </TableCell>    
            <TableCell align="center">Фамилия</TableCell>
            <TableCell align="center">Имя</TableCell>
            <TableCell align="center">Отчество</TableCell>
            <TableCell align="center">Логин</TableCell>
            <TableCell align="center">Телефон</TableCell>
            <TableCell align="center">Почта</TableCell>
            <TableCell align="center">Информация</TableCell>
            <TableCell align="center">Редактировать</TableCell>
            <TableCell align="center">Состояние</TableCell>
          </TableRow>

       

        </TableHead>
        <TableBody>

          {table_rows}

          <TableRow>
             </TableRow>
        </TableBody>
      </Table>
    </TableContainer>

     
     <EditUser/>
       
      </React.Fragment>
    );
  }
}
