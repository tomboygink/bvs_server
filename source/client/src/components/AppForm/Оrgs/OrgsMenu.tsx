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
export class OrgsMenu extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  async handleChange(event: any, node: any) {
    APP_STORAGE.reg_user.setNodeidOrg(node);
  }

  async SeachFamily(a: any) { 

  let filter = (document.getElementById('search') as HTMLInputElement).value.toUpperCase();
  let lis = document.getElementsByTagName('li');
  for (var i = 0; i < lis.length; i++) {
    var name = lis[i].innerText;
    if (name.toUpperCase().indexOf(filter) == 0) 
      lis[i].style.display = 'list-item';
    else
      lis[i].style.display = 'none';
}
  }

  render(): React.ReactNode {
    let rows_search: React.ReactNode = <></>;
    let table_rows = [];
    if (APP_STORAGE.reg_user.getOrgAll()) {
      let org = JSON.parse(
        JSON.stringify(APP_STORAGE.reg_user.getOrgAll())
      );
      for (var key in org) {
        let row = org[key];
       
          table_rows.push(
       
            <React.Fragment key={"_org_id_key_" + row.id}>
            
                <TreeItem
                  nodeId={String(row.id)}
                  label={row.name}
                  icon={<AccountCircleOutlinedIcon sx ={{color: '#266BF1'}}/>}
                  sx={{
                    color: "#222",
                    fontSize: "14px",
                  }}
                >
                </TreeItem> 
            </React.Fragment>
          )
        
      }
    }

    return (
      <React.Fragment>
        <Typography sx={{ fontWeight: "500", color: "#111111", mb: "8px" }}>
          {" "}
          Список организаций{" "}
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
      sx={{ mb: '22px', display: 'flex', alignItems: 'center', boxShadow: 'none', background: '#E3EDFF', borderRadius: '100px' }}
    >
    
      <InputBase
        id="search"
        sx={{ ml: 1, flex: 1 , fontSize: '14px', pl: '14px'}}
        placeholder="Поиск по организациям"
        inputProps={{ 'aria-label': 'search google maps' }}
        onChange={(e) => {
          this.SeachFamily(e.target.value);
          }} 
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
