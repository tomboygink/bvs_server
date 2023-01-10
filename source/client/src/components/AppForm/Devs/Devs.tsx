import * as React from "react";
import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";
import { alpha, styled } from "@mui/material/styles";
import TreeView from "@mui/lab/TreeView";
import TreeItem, { TreeItemProps, treeItemClasses } from "@mui/lab/TreeItem";
import Collapse from "@mui/material/Collapse";
// web.cjs is required for IE11 support
import { useSpring, animated } from "@react-spring/web";
import { TransitionProps } from "@mui/material/transitions";
import { Box, Alert, Typography } from "@mui/material";

import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
import SensorsIcon from "@mui/icons-material/Sensors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import { observer } from "mobx-react";
import { APP_STORAGE } from "../../../storage/AppStorage";

import { StyledTreeItem } from "./StyledTreeItem";
import { TransitionComponent } from "./StyledTreeItem";
import { CloseSquare } from "./StyledTreeItem";
import { PlusSquare } from "./StyledTreeItem";
import { MinusSquare } from "./StyledTreeItem";

interface IProps {}

//Компонент формы приложения
@observer
export class Devs extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  async closeModal() {
    APP_STORAGE.devs_groups.setOpenModal(false);
  }

  async SelectedOrg(a: any) {
    //// Сохраняем , то что выбрал пользователь из выпадающего списка Организации
    APP_STORAGE.devs_groups.setKeyOrg(a);
  }

  async OpenModal(){
    
    APP_STORAGE.devs.setOpenModal(true);
  }

  render(): React.ReactNode {
    let org = null;
    var options_org = [];

    return (
      <React.Fragment>
        <Box
          className="wrapper-devs"
          sx={{
            mt: "44px",
            display: "flex",
            flexDirection: "column;",
            alignItems: "flex-start;",
            ml: "1rem",
          }}
        >
          <Typography sx={{ fontWeight: "500", pb: "20px" }}>
            Список устройств
          </Typography>

          <TreeView
            aria-label="customized"
            defaultExpanded={["1"]}
            defaultCollapseIcon={<MinusSquare />}
            defaultExpandIcon={<PlusSquare />}
            defaultEndIcon={<CloseSquare />}
            // sx={{ height: 264, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
          >
            <StyledTreeItem nodeId="1" label="">
              <Box
                sx={{
                  boxShadow: "4px 6px 14px 2px rgb(0 0 0 / 4%);",
                  width: "790px",
                  background: "#fff",
                  p: "25px",
                  borderRadius: "4px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  mb: "16px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography>000-Курган</Typography>
                  <Typography sx={{}}>Заводской номер - 5005</Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    background: "aliceblue",
                    borderRadius: "4px",
                    p: "18px",
                  }}
                >
                  {/* <TreeView
                    aria-label="customized"
                    defaultExpanded={["1"]}
                    defaultCollapseIcon={<ExpandLessIcon />}
                    defaultExpandIcon={<ExpandMoreIcon />}
                    defaultEndIcon={<CrisisAlertIcon />}
                  >
                    <StyledTreeItem nodeId="1" label="Устройства">
                      <StyledTreeItem nodeId="2" label="0001" />
                      <StyledTreeItem
                        nodeId="7"
                        sx={{ fontSize: "small" }}
                        label="Список сенсоров на устройстве "
                      >
                        <Box sx={{ display: "flex", color: "#4ECB71" }}>
                          {" "}
                          <SensorsIcon fontSize="small" /> 0001
                        </Box>
                        <Box sx={{ display: "flex", color: "#4ECB71" }}>
                          {" "}
                          <SensorsIcon fontSize="small" />
                          0001
                        </Box>
                      </StyledTreeItem>
                      <StyledTreeItem nodeId="4" label="0002" />
                      <StyledTreeItem nodeId="5" label="0003" />
                    </StyledTreeItem>
                  </TreeView> */}

                  <Box
                    sx={{
                      background: "#F1F5FC",
                      width: "180px",
                      color: "#000",
                      p: "8px",
                      borderRadius: "4px",
                    }}
                    onClick={() => {
                      this.OpenModal();
                    }}
                  >
                    <Typography 
                      
                    > Добавить устройство1</Typography>
                  </Box>
                </Box>
              </Box>

              <StyledTreeItem nodeId="2" label="" />
            </StyledTreeItem>
          </TreeView>
        </Box>
      </React.Fragment>
    );
  }
}
