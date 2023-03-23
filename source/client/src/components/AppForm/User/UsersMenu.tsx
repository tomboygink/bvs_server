import * as React from "react";
import TreeItem from "@mui/lab/TreeItem";

import TreeView from "@mui/lab/TreeView";

import { Box, Typography } from "@mui/material";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

import { observer } from "mobx-react";

import { APP_STORAGE } from "../../../storage/AppStorage";


import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

interface IProps {}

@observer
export class UsersMenu extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  async handleChange(event: any, node: any) {
    APP_STORAGE.reg_user.setNodeidUser(node);
  }

  render(): React.ReactNode {
    let rows_search: React.ReactNode = <></>;
    let table_rows = [];
    if (APP_STORAGE.reg_user.getAllUsers()) {
      let users = JSON.parse(
        JSON.stringify(APP_STORAGE.reg_user.getAllUsers())
      );
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
              <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                <TreeItem
                  nodeId={String(row.u_id)}
                  label={row.u_family + " " + row.u_name + " " + row.u_father}
                  icon={<AccountCircleOutlinedIcon />}
                  sx={{
                    color: "#222",
                    fontSize: "14px",
                  }}
                ></TreeItem>
              </Box>
            </React.Fragment>
          );
        } else {
          table_rows.push(
            <React.Fragment key={"_gr_id_key_" + row.u_id}>
              <Box sx={{ display: "flex" }}>
                <TreeItem
                  draggable="true"
                  nodeId={String(row.u_id)}
                  label={row.u_family}
                  icon={<AccountCircleOutlinedIcon />}
                  sx={{
                    color: "#222",
                    fontSize: "14px",
                  }}
                ></TreeItem>
              </Box>
            </React.Fragment>
          );
        }
      }
    }

    return (
      <React.Fragment>
        <Typography sx={{ fontWeight: "500", color: "#111111", mb: "8px" }}>
          {" "}
          Список пользователей{" "}
        </Typography>
        <Box
          sx={{
            background: "#fff",
            p: "20px",
            borderRadius: "4px",
          }}
        >
              <Paper
      component="form"
      sx={{ mb: '22px', display: 'flex', alignItems: 'center', boxShadow: 'none', background: '#F3F3F3', borderRadius: '100px' }}
    >
    
      <InputBase
        sx={{ ml: 1, flex: 1 , fontSize: '14px', pl: '14px'}}
        placeholder="Поиск по пользователям"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      
  
    </Paper>
          <TreeView
            className="wrapper_treeviw"
            onNodeSelect={this.handleChange}
            aria-label="customized"
            sx={{ flexGrow: 1, maxWidth: 400, overflow: "auto" }}
          >
            {table_rows}
          </TreeView>
        </Box>
      </React.Fragment>
    );
  }
}
