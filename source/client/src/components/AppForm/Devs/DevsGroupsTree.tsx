import React from "react";

import { observer } from "mobx-react";

import { Box, Typography } from "@mui/material";
import { APP_STORAGE } from "../../../storage/AppStorage";

import { TreeView, TreeItem } from "@mui/x-tree-view";

import { handleChange } from "./StyledMua";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import FolderIcon from "@mui/icons-material/Folder";
import Skeleton from "@mui/material/Skeleton";
import CircularProgress from "@mui/material/CircularProgress";

import { TDevsGroup } from "../../../storage/components/Devs/DevEntityes";
import { TDGroup } from "../../../storage/components/Devs/DevEntityes";
import { TDevice } from "../../../storage/components/Devs/DevEntityes";

interface IProps {
  devs_tree: TDevsGroup;
  onSelect: (dev: TDevice) => void;
}

//Устройства
@observer
export class DevsGroupsTree extends React.Component<IProps> {
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
    if (APP_STORAGE.getRoleRead() === 1 && APP_STORAGE.getRoleWrite() === 2) {
      if (dev.deleted === true) {
        return (
          <React.Fragment key={"_dev_id_key_" + dev.id}>
            <TreeItem
              nodeId={"_dev_id_key_" + dev.id}
              label={dev.number}
              icon={
                <CrisisAlertIcon fontSize="small" sx={{ color: "#808080" }} />
              }
              sx={{ color: "#808080" }}
            ></TreeItem>
          </React.Fragment>
        );
      }
      if (dev.deleted === false) {
        if (dev.time === null && dev.period_sess !== 0) {
          return (
            <React.Fragment key={"_dev_id_key_" + dev.id}>
              <TreeItem
                nodeId={"_dev_id_key_" + dev.id}
                label={dev.number}
                icon={
                  <CrisisAlertIcon fontSize="small" sx={{ color: "#EA4335" }} />
                }
                sx={{ color: "#EA4335" }}
              ></TreeItem>
            </React.Fragment>
          );
        }

        if (dev.time !== "" && Number(dev.period_sess) !== Number(0)) {
          //////----------------------------------Определяем сколько дней прошло с даты otherDate по nowDate
          let otherDate = new Date(dev.time);
          let passed_day = dev.period_sess;
          let nowDate = new Date();

          let delta = nowDate.getTime() - otherDate.getTime();

          var passedDay = Math.floor(delta / 1000 / 60 / 60 / 24); ///////////////////( new Date( ( new Date() ).toDateString() ) - 86400000 ); // 24*60*60*1000

          if (passedDay <= Number(dev.period_sess)) {
            return (
              <React.Fragment key={"_dev_id_key_" + dev.id}>
                <TreeItem
                  nodeId={"_dev_id_key_" + dev.id}
                  label={dev.number}
                  icon={
                    <CrisisAlertIcon
                      fontSize="small"
                      sx={{ color: "#0FA958" }}
                    />
                  }
                  sx={{ color: "black" }}
                ></TreeItem>
              </React.Fragment>
            );
          }
          if (passedDay < Number(dev.period_sess) * 2) {
            return (
              <React.Fragment key={"_dev_id_key_" + dev.id}>
                <TreeItem
                  nodeId={"_dev_id_key_" + dev.id}
                  label={dev.number}
                  icon={
                    <CrisisAlertIcon
                      fontSize="small"
                      sx={{ color: "#FBBC05" }}
                    />
                  }
                  sx={{ color: "black" }}
                ></TreeItem>
              </React.Fragment>
            );
          }

          if (
            passedDay >= Number(dev.period_sess) * 2 &&
            passedDay < Number(dev.period_sess) * 3
          ) {
            return (
              <React.Fragment key={"_dev_id_key_" + dev.id}>
                <TreeItem
                  nodeId={"_dev_id_key_" + dev.id}
                  label={dev.number}
                  icon={
                    <CrisisAlertIcon
                      fontSize="small"
                      sx={{ color: "#FC8904" }}
                    />
                  }
                  sx={{ color: "black" }}
                ></TreeItem>
              </React.Fragment>
            );
          }
          if (passedDay >= Number(dev.period_sess) * 3) {
            return (
              <React.Fragment key={"_dev_id_key_" + dev.id}>
                <TreeItem
                  nodeId={"_dev_id_key_" + dev.id}
                  label={dev.number}
                  icon={
                    <CrisisAlertIcon
                      fontSize="small"
                      sx={{ color: "#EA4335" }}
                    />
                  }
                  sx={{ color: "black" }}
                ></TreeItem>
              </React.Fragment>
            );
          }
        }
      }
    }

    if (
      APP_STORAGE.getRoleRead() === 1 &&
      !APP_STORAGE.getRoleWrite() &&
      dev.deleted === false
    ) {
      if (dev.time === null) {
        return (
          <React.Fragment key={"_dev_id_key_" + dev.id}>
            <TreeItem
              nodeId={"_dev_id_key_" + dev.id}
              label={dev.number}
              icon={
                <CrisisAlertIcon fontSize="small" sx={{ color: "#EA4335" }} />
              }
              sx={{ color: "#EA4335" }}
            ></TreeItem>
          </React.Fragment>
        );
      }

      if (dev.time !== "") {
        //////----------------------------------Определяем сколько дней прошло с даты otherDate по nowDate
        let otherDate = new Date(dev.time);
        let nowDate = new Date();
        let delta = nowDate.getTime() - otherDate.getTime();

        var passedDay = Math.floor(delta / 1000 / 60 / 60 / 24); ///////////////////( new Date( ( new Date() ).toDateString() ) - 86400000 ); // 24*60*60*1000

        if (passedDay <= Number(dev.period_sess)) {
          return (
            <React.Fragment key={"_dev_id_key_" + dev.id}>
              <TreeItem
                nodeId={"_dev_id_key_" + dev.id}
                label={dev.number}
                icon={
                  <CrisisAlertIcon fontSize="small" sx={{ color: "#0FA958" }} />
                }
                sx={{ color: "black" }}
              ></TreeItem>
            </React.Fragment>
          );
        }
        if (passedDay < Number(dev.period_sess) * 2) {
          return (
            <React.Fragment key={"_dev_id_key_" + dev.id}>
              <TreeItem
                nodeId={"_dev_id_key_" + dev.id}
                label={dev.number}
                icon={
                  <CrisisAlertIcon fontSize="small" sx={{ color: "#FBBC05" }} />
                }
                sx={{ color: "black" }}
              ></TreeItem>
            </React.Fragment>
          );
        }

        if (
          passedDay >= Number(dev.period_sess) * 2 &&
          passedDay < Number(dev.period_sess) * 3
        ) {
          return (
            <React.Fragment key={"_dev_id_key_" + dev.id}>
              <TreeItem
                nodeId={"_dev_id_key_" + dev.id}
                label={dev.number}
                icon={
                  <CrisisAlertIcon fontSize="small" sx={{ color: "#FC8904" }} />
                }
                sx={{ color: "black" }}
              ></TreeItem>
            </React.Fragment>
          );
        }

        if (passedDay >= Number(dev.period_sess) * 3) {
          return (
            <React.Fragment key={"_dev_id_key_" + dev.id}>
              <TreeItem
                nodeId={"_dev_id_key_" + dev.id}
                label={dev.number}
                icon={
                  <CrisisAlertIcon fontSize="small" sx={{ color: "#EA4335" }} />
                }
                sx={{ color: "black" }}
              ></TreeItem>
            </React.Fragment>
          );
        }

        APP_STORAGE.devs.setPassedDay(String(passedDay));
      }
    }
  }

  drawDevGroup(dgrs: any): React.ReactNode[] {
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

      var icon = <FolderIcon fontSize="small" sx={{ color: "#FFE2C0" }} />;
      if (gr_childs.length > 0)
        icon = <FolderZipIcon fontSize="small" sx={{ color: "#FFAD4E" }} />;
      if (gr_devs.length > 0)
        icon = <FolderIcon fontSize="small" sx={{ color: "#FFE2C0" }} />;
      if (gr_childs.length > 0 && gr_devs.length > 0)
        icon = <FolderIcon fontSize="small" sx={{ color: "#FFE2C0" }} />;

      if (
        Number(gr.org_id) === Number(APP_STORAGE.getIdOrgUser()) &&
        APP_STORAGE.getRoleRead() === 1 &&
        !APP_STORAGE.getRoleWrite() &&
        gr.deleted === false
      ) {
        ////// Условие для пользователя с правами "только чтение"
        parent.push(
          <React.Fragment key={"_gr_id_key_" + gr.id}>
            <Box sx={{ display: "flex" }}>
              <TreeItem
                nodeId={String(gr.id)}
                label={gr.g_name}
                icon={icon}
                sx={{ color: "#222", borderLeft: "1px solid #c1c1c1" }}
              >
                {childs}
              </TreeItem>
            </Box>
          </React.Fragment>
        );
      }

      if (APP_STORAGE.getRoleRead() === 1 && APP_STORAGE.getRoleWrite() === 2) {
        ////// Условие для пользователя с правами администратора

        if (gr.deleted === false) {
          parent.push(
            <React.Fragment key={"_gr_id_key_" + gr.id}>
              <Box sx={{ display: "flex" }}>
                <TreeItem
                  nodeId={String(gr.id)}
                  label={gr.g_name}
                  icon={icon}
                  sx={{
                    color: "#222",
                    borderLeft: "1px solid #c1c1c1",
                    fontSize: "14px",
                  }}
                >
                  {childs}
                </TreeItem>
              </Box>
            </React.Fragment>
          );
        } else {
          parent.push(
            <React.Fragment key={"_gr_id_key_" + gr.id}>
              <Box sx={{ display: "flex" }}>
                <TreeItem
                  nodeId={String(gr.id)}
                  label={gr.g_name}
                  icon={
                    <FolderIcon fontSize="small" sx={{ color: "#808080" }} />
                  }
                  sx={{
                    color: "#808080",
                    borderLeft: "1px solid #c1c1c1",
                    fontSize: "14px",
                  }}
                >
                  {childs}
                </TreeItem>
              </Box>
            </React.Fragment>
          );
        }
      }
    }
    return parent;
  }

  drawDevsTree(): React.ReactNode {
    ////////////////////////////// Функция отрисовки дерева
    let DevGr: any;
    DevGr = APP_STORAGE.devs_groups.getDevsGroups();
    return this.drawDevGroup(DevGr);
  }

  render(): React.ReactNode {
    return (
      <React.Fragment>
        <div id="wrapper-devgr-tree">
          <Typography sx={{ fontWeight: "600", color: "#111111", mb: "8px" }}>
            Список устройств
          </Typography>

          <Box
            sx={{
              background: "#fff",
              p: "20px",
              borderRadius: "4px",
            }}
          >
            <TreeView
              className="wrapper_treeviw"
              onNodeSelect={handleChange}
              aria-label="customized"
              sx={{ flexGrow: 1, maxWidth: 400, overflow: "auto" }}
            >
              {APP_STORAGE.devs_groups.getIsLoading() && (
                <Box>
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" />
                </Box>
              )}

              {this.drawDevsTree()}
            </TreeView>
          </Box>
        </div>
      </React.Fragment>
    );
  }
}
