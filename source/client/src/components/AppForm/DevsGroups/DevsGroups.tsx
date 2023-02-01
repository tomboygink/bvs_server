import React from "react";
import { observer } from "mobx-react";

import { Box, Typography } from "@mui/material";
import { APP_STORAGE } from "../../../storage/AppStorage";

import TreeItem from "@mui/lab/TreeItem";

import TreeView from "@mui/lab/TreeView";

import { handleChange } from "../Devs/StyledTreeItem";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SensorsIcon from "@mui/icons-material/Sensors";


import FolderIcon from "@mui/icons-material/Folder";

import { TDevsGroup } from "../../../storage/components/Devs/DevEntityes";
import { TDGroup } from "../../../storage/components/Devs/DevEntityes";
import { TDevice } from "../../../storage/components/Devs/DevEntityes";

import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import FolderZipIcon from '@mui/icons-material/FolderZip';

interface IProps {
  devs_tree: TDevsGroup;
  onSelect: (dev: TDevice) => void;
}

//Устройства
@observer
export class DevsGroups extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  static defaultProps: IProps = {
    devs_tree: null,
    onSelect: (dev: TDevice) => {},
  };
  

  componentDidMount(): void {
    APP_STORAGE.devs_groups.get_DevsGroups(
      "sess_id",
      APP_STORAGE.auth_form.getdt()
    );
  }



  drawDeviceItem(dev: TDevice): React.ReactNode {
    return (
      <React.Fragment key={"_dev_id_key_" + dev.id}>
        <TreeItem
          nodeId={"_dev_id_key_" + dev.id}
          label={dev.name}
          icon={<CrisisAlertIcon fontSize="small" sx={{color: '#266BF1'}}/>}
          sx={{ color: "#266BF1" }}></TreeItem>
      </React.Fragment>
    );
  }

  drawDevGroup(dgrs: TDevsGroup[]): React.ReactNode[] {
    var parent: React.ReactNode[] = new Array();
    for (var ii in dgrs) {
      var dgr: TDevsGroup = dgrs[ii];
      var gr: TDGroup = dgr.group;
      var gr_childs = dgr.childs;
      var gr_devs = dgr.devs;

      var childs: React.ReactNode[] = new Array();
      if (gr_childs.length > 0) childs = this.drawDevGroup(gr_childs);

      if (gr_devs.length > 0) {
        for (var dii in gr_devs) childs.push(this.drawDeviceItem(gr_devs[dii]));
      }

      var icon = <FolderIcon fontSize="small" sx={{ color: "#FFE2C0"}} />;
      if (gr_childs.length > 0) icon = <FolderZipIcon fontSize="small" sx ={{color: '#FFAD4E'}}/>;
      if (gr_devs.length > 0) icon = <FolderIcon fontSize="small" sx={{ color: "#FFE2C0" }} />;
      if (gr_childs.length > 0 && gr_devs.length > 0)
        icon = <FolderIcon fontSize="small" sx={{ color: "#FFE2C0" }} />;

      parent.push(
        <React.Fragment key={"_gr_id_key_" + gr.id}>
          <Box sx={{ display: "flex" }}>
            <TreeItem
              nodeId={String(gr.id)}
              label={gr.g_name}
              icon={icon}
              sx={{ color: "#222", borderLeft: '1px solid #c1c1c1' }}
            >
              {childs}
            </TreeItem>
          </Box>
        </React.Fragment>
      );
    }
    return parent;
  }

  drawDevsTree(): React.ReactNode {
    let devs_g = [];
    let DevGr = [];

    if (
      Object.keys(
        JSON.parse(JSON.stringify(APP_STORAGE.devs_groups.getDevsGroups()))
      ).length !== 0 &&
      JSON.parse(JSON.stringify(APP_STORAGE.devs_groups.getDevsGroups()))
        .constructor === Object
    ) {
      devs_g = JSON.parse(
        JSON.stringify(APP_STORAGE.devs_groups.getDevsGroups())
      );
    }

    for (var key in devs_g) {
      if (devs_g.hasOwnProperty(key)) {
        let a = devs_g[key];
        let root = JSON.parse(a);

        if (root.childs.length > 0) {
          for (let i = 0; i < root.childs.length; i++) {
            DevGr.push(root.childs[i]);
          }
        }
      }
    }
    return this.drawDevGroup(DevGr);
  }

  render(): React.ReactNode {
    return (
      <React.Fragment>
        <Box
          
          sx={{
            mt: "44px",
            display: "flex",
            flexDirection: "column;",
            alignItems: "flex-start;",
            ml: "1rem",
          }}
        >
          {/* <Typography sx={{ fontWeight: "500", pb: "20px" }}>
            Список групп устройств
          </Typography> */}

          <Box
            sx={{
              width: "290px",
              borderRadius: "4px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              background: "#fff",
            }}
          >
            <TreeView
            className="wrapper_treeviw"
              onNodeSelect={handleChange}
              defaultExpanded={["1", '2', '3', '4', '5']}
              aria-label="customized"
              sx={{ flexGrow: 1, maxWidth: 400, p: "25px" , maxHeight: "85vh", height: '100',overflow: 'auto'}}
            >
              {this.drawDevsTree()}

            </TreeView>
            {/* <Box
              sx={{
                background: "#d5e3fda6",
                borderTopRightRadius: "48px",
                backgroundImage: 'linear-gradient(to bottom, #d5e3fd, #dce8fd, #e3ecfd, #eaf1fc, #f1f5fc);',
                p: "25px",
              }}
            >
              <WorkingWithDev />
            </Box> */}
          </Box>
        </Box>
      </React.Fragment>
    );
  }
}
