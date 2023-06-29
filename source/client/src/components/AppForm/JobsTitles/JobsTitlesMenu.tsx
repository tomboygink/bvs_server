import * as React from "react";
import TreeItem from "@mui/lab/TreeItem";

import TreeView from "@mui/lab/TreeView";

import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";

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
export class JobsTitlesMenu extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  async handleChange(event: any, node: any) {
    APP_STORAGE.reg_user.setNodeidJobsTitles(node);
  }

  async SelectedOrg(a: any) {
    //// Сохраняем , то что выбрал пользователь из выпадающего списка Организации
    APP_STORAGE.edit_user.setKeyOrg(a);
    APP_STORAGE.edit_user.setKeyJobs(null);
    APP_STORAGE.reg_user.setJobsAll([]);
    APP_STORAGE.edit_user.get_Jobs("sess_id", APP_STORAGE.auth_form.getdt()); // должность
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

    let options_org = [];
    let options_jobs = [];
    let org = null;
    let jobs = null;

    if (APP_STORAGE.reg_user.getOrgAll()) {
      org = JSON.parse(JSON.stringify(APP_STORAGE.reg_user.getOrgAll()));
      for (var key in org) {
        if (org.hasOwnProperty(key)) {
          let a = org[key];

          options_org.push(
            /// создаем опции выбора для выпадающего списка - организации
            <MenuItem key={a.id} sx={{ fontSize: "12px" }} value={a.id}>
              {a.full_name}
            </MenuItem>
          );
        }
      }
    }
    let rows_search: React.ReactNode = <></>;
    let table_rows = [];
    if (APP_STORAGE.reg_user.getOrgAll()) {
      let org = JSON.parse(
        JSON.stringify(APP_STORAGE.reg_user.getOrgAll())
      );
      

      if (APP_STORAGE.reg_user.getJobsAll()) {
        jobs = JSON.parse(JSON.stringify(APP_STORAGE.reg_user.getJobsAll()));
        for (var key in jobs) {
          if (jobs.hasOwnProperty(key)) {
            let a = jobs[key];
  
            table_rows.push(
       
              <React.Fragment key={"_org_id_key_" + a.id}>
              
                  <TreeItem
                    nodeId={String(a.id)}
                    label={a.name}
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
    
    <FormControl fullWidth size="small" sx={{ mt: "14px" }}>
              <InputLabel className="org" sx={{ fontSize: "12px" }}>
                Организация
              </InputLabel>

              <Select
                sx={{ fontSize: "12px" }}
                value={APP_STORAGE.edit_user.getKeyOrg()}
                label="организация"
                onChange={(e) => {
                  this.SelectedOrg(e.target.value);
                }}
              >
                {options_org}
                <Divider />
              </Select>
              
            </FormControl>
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
