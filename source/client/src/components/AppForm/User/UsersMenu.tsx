import * as React from 'react';
import TreeItem from "@mui/lab/TreeItem";

import TreeView from "@mui/lab/TreeView";

import {Box, Typography} from '@mui/material';


import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';



import { observer } from "mobx-react";



import { APP_STORAGE } from "../../../storage/AppStorage";
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';


interface IProps {}

@observer
export class UsersMenu extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  async handleChange(event: any, node: any){
    APP_STORAGE.reg_user.setNodeidUser(node)
  }
  

  render(): React.ReactNode {  
    let rows_search:React.ReactNode = <></>;
    let table_rows = [];
    if (APP_STORAGE.reg_user.getAllUsers()) {
        let users = JSON.parse(JSON.stringify(APP_STORAGE.reg_user.getAllUsers()));
        for (var key in users) {
          let row = users[key];
            if (row.u_deleted === false) {
             
            table_rows.push(
            // <TableRow
            //     key={row.u_id}
            //     sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            //   >
            //   <TableCell align="center" >{key}</TableCell>              
            //   <TableCell align="center" > {row.u_family} </TableCell>
            //   <TableCell  align="center" > {row.u_name} </TableCell>
            //   <TableCell  align="center">{row.u_father}</TableCell>
            //   <TableCell  align="center">{row.u_login}</TableCell>
            //   <TableCell  align="center">{row.u_telephone}</TableCell>
            //   <TableCell  align="center">{row.u_email}</TableCell>
            //   <TableCell  align="center">{row.u_info}</TableCell>
            //   <TableCell align="center"
            //      onClick={(e) => {APP_STORAGE.edit_user.set_IdRows(row.u_id)}}>
            //     <DriveFileRenameOutlineOutlinedIcon fontSize="small"/>
            //  </TableCell>
            //  <TableCell  align="center">Действующая</TableCell> 
    
            //   </TableRow>



            <React.Fragment key={"_gr_id_key_" + row.u_id}>
            <Box sx={{ display: "flex", flexWrap: 'wrap' }}>
              <TreeItem
                nodeId={String(row.u_id)}
                label= {row.u_family +' ' + row.u_name + ' ' + row.u_father}
                icon ={<AccountCircleOutlinedIcon  />}
                sx={{ color: "#222", borderLeft: '1px solid #c1c1c1' ,  fontSize: '14px'}}
              >
              </TreeItem>
            </Box>
          </React.Fragment>

            )
          }

        else {

          table_rows.push(
            <React.Fragment key={"_gr_id_key_" + row.u_id}>
            <Box sx={{ display: "flex" }}>
              <TreeItem
                draggable="true"
                nodeId={String(row.u_id)}
                label={row.u_family }
                icon ={<AccountCircleOutlinedIcon  />}
                sx={{ color: "#222", borderLeft: '1px solid #c1c1c1' ,  fontSize: '14px'}}
              >
                
              </TreeItem>
            </Box>
          </React.Fragment>
            )

        }
        }
      }



    return (
      <React.Fragment>
      <Typography sx={{ fontWeight: "500" , color: '#111111', mb : '8px'}}>
           {" "}
           Список пользователей {" "}
       </Typography>
       <Box
        sx={{
           background: "#fff",
           p :'20px',
           borderRadius: '4px'
         }}
       >
         <TreeView
           className="wrapper_treeviw"

           onNodeSelect={this.handleChange}
           aria-label="customized"
           sx={{ flexGrow: 1, maxWidth: 400,overflow: 'auto'}}>
            
           
           {table_rows}

         </TreeView>
       </Box>
   </React.Fragment>
    );
  }
}
