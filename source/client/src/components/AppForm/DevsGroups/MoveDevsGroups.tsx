import React from "react";
import { observer } from "mobx-react";

import {
  TextField,
  Box,
  Dialog,
  Divider,
  Typography,
  TextareaAutosize,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

import CloseIcon from "@mui/icons-material/Close";
import { APP_STORAGE } from "../../../storage/AppStorage";
import FormGroup from "@mui/material/FormGroup";
import Stack from "@mui/material/Stack";

import { AntSwitch } from "../AppBarPanel/LeftPanel/RegistationUsers/switch";

import { TDevsGroup } from "../../../storage/components/Devs/DevEntityes";
import { TDGroup } from "../../../storage/components/Devs/DevEntityes";
import { options } from "../Devs/StyledMua";

import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";

interface IProps {}

//Компонент формы приложения
@observer
export class MoveDevsGroups extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount(): void {
    APP_STORAGE.reg_user.get_Org("sess_id", APP_STORAGE.auth_form.getdt());
  }

  async closeModal() {
    APP_STORAGE.devs_groups.setOpenModalMoveDevsGr(false);
  }

  async SelectedOrg(a: any) {
    //// Сохраняем , то что выбрал пользователь из выпадающего списка Организации
    APP_STORAGE.devs_groups.setKeyOrg(a);
  }

  async SelectedDevsGroups(a: any) {
    APP_STORAGE.devs_groups.setKeyDevsgr(a);
    APP_STORAGE.devs_groups.setParent(a);
    APP_STORAGE.devs.setGroupDevId(a);
  }

  drawDevLocation(): React.ReactNode {
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

  drawDevGroup(dgrs: TDevsGroup[]): React.ReactNode[] {
    let parent: React.ReactNode[] = new Array();

    let options: React.ReactNode[] = new Array();
    for (var ii in dgrs) {
      var dgr: TDevsGroup = dgrs[ii];
      var gr: TDGroup = dgr.group;
      var gr_childs = dgr.childs;

      var childs = new Array();
      if (gr_childs.length > 0) childs = this.drawDevGroup(gr_childs);

      if (Number(APP_STORAGE.devs_groups.getKeyOrg()) === Number(gr.org_id)) {
        if (
          Number(APP_STORAGE.devs_groups.getParentId()) !==
            Number(gr.parent_id) &&
          Number(APP_STORAGE.devs.getIdDevs()) !== Number(gr.id)
        )
          parent.push(
            <React.Fragment key={"_gr_id_key_" + gr.id}>
              <Box sx={{ display: "flex" }}>
                <TreeItem nodeId={String(gr.id)} label={gr.g_name}>
                  {childs}
                </TreeItem>
              </Box>
            </React.Fragment>
          );
      }
    }
    return parent;
  }

  async ChekedForEdit(editing: any) {
    APP_STORAGE.devs_groups.setCheckboxEd(editing.target.checked);
  }

  async SaveChangeDevsGroups(a: any) {
    if (Number(0) === Number(a)) {
      APP_STORAGE.devs_groups.setParent(String(0));
    }

    if (APP_STORAGE.devs.getMenu_devs() === "2") {
      APP_STORAGE.devs.set_ChangeDevs("sess_id", APP_STORAGE.auth_form.getdt());
    }

    if (APP_STORAGE.devs.getMenu_devs() === "3") {
      APP_STORAGE.devs_groups.set_ChangeDevsGroups(
        "sess_id",
        APP_STORAGE.auth_form.getdt()
      );
    }

    setTimeout(() => {
      APP_STORAGE.devs_groups.get_DevsGroups(
        "sess_id",
        APP_STORAGE.auth_form.getdt()
      );
    }, 500);
  }

  render(): React.ReactNode {
    let org = null;
    var options_org = [];
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

    return (
      <React.Fragment>
        <Dialog
          BackdropProps={{ style: { background: "rgba(0 0 0 / 12%)" } }}
          open={APP_STORAGE.devs_groups.getOpenModalMoveDevsGr()}
          fullWidth
        >
          <Box sx={{ p: 2 }}>
            <Box
              className="ModalTitle"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: "12px",
              }}
            >
              <Typography>Переместить</Typography>

              <CloseIcon
                sx={{ color: "#1976D2" }}
                onClick={() => {
                  this.closeModal();
                }}
              />
            </Box>

            <Divider sx={{ marginBottom: "20px" }} />

            <FormControl
              fullWidth
              size="small"
              sx={{ mt: "14px" }}
              error={APP_STORAGE.devs_groups.getOrgError()}
            >
              <InputLabel className="org" sx={{ fontSize: "12px" }}>
                Организация
              </InputLabel>
              <Select
                sx={{ fontSize: "12px" }}
                value={APP_STORAGE.devs_groups.getKeyOrg() || ""}
                label="организация"
                onChange={(e) => {
                  this.SelectedOrg(e.target.value);
                }}
              >
                {options_org}
                <Divider />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    m: 1,
                    borderRadius: "4px",
                  }}
                ></Box>
              </Select>
            </FormControl>
            {APP_STORAGE.devs_groups.getKeyOrg() && (
              <Box
                sx={{
                  background: "#f1f5fcad",
                  p: "20px",
                  borderRadius: "4px",
                }}
              >
                <Typography sx={{}}>Переместить в: </Typography>
                <TreeView
                  aria-label="multi-select"
                  defaultCollapseIcon={<ExpandMoreIcon />}
                  defaultExpandIcon={<ChevronRightIcon />}
                  onNodeSelect={options}
                  multiSelect
                  sx={{ flexGrow: 1, maxWidth: "100%", overflowY: "auto" }}
                >
                  {this.drawDevLocation()}
                </TreeView>
              </Box>
            )}

            <Box sx={{ display: "flex" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "flex-end",
                  mr: "40px",
                }}
                onClick={() => {
                  APP_STORAGE.devs_groups.setParent(String(0));
                }}
              >
                <Button
                  sx={{
                    background: "#F1F5FC",
                    color: "#000;",
                    mt: "18px",
                    mb: "18px",
                    fontSize: "12px",
                  }}
                >
                  Переместить в корень
                </Button>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "flex-end",
                }}
                onClick={() => {
                  this.SaveChangeDevsGroups(1);
                }}
              >
                <Button
                  sx={{
                    background: "#266BF1",
                    color: "#fff;",
                    mt: "18px",
                    mb: "18px",
                    fontSize: "12px",
                  }}
                >
                  Сохранить
                </Button>
              </Box>
            </Box>
          </Box>
        </Dialog>
      </React.Fragment>
    );
  }
}
