import React from "react";
import { observer } from "mobx-react";

import { Box, Typography, TextField } from "@mui/material";
import { APP_STORAGE } from "../../../storage/AppStorage";

import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";

import { TDevsGroup } from "../../../storage/components/Devs/DevEntityes";
import { TDGroup } from "../../../storage/components/Devs/DevEntityes";

import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface IProps {}

//Устройства
@observer
export class DevLocation extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  async OpenModal(e: any, org_id: any) {
    APP_STORAGE.devs_groups.setOrg(Number(org_id));
    APP_STORAGE.devs_groups.setParentId(e);
    APP_STORAGE.devs_groups.setOpenModal(true);
    APP_STORAGE.reg_user.get_Org("sess_id", APP_STORAGE.auth_form.getdt()); /// получаем все организации
  }
  async UpdateDate() {
    APP_STORAGE.devs.setOpenModal(true);
  }
  async editDeviceLocation() {
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

    return this.getValueCh(DevGr);
  }

  getValueCh(dgrs: TDevsGroup[]) {
    var parent: React.ReactNode[] = new Array();
    for (var ii in dgrs) {
      var dgr: TDevsGroup = dgrs[ii];
      var gr: TDGroup = dgr.group;
      var gr_childs = dgr.childs;

      var childs: React.ReactNode[] = new Array();
      if (gr_childs.length > 0) childs = this.getValueCh(gr_childs);

      parent.push(childs);

      if (APP_STORAGE.devs.getIdDevs() === String(gr.id)) {
        APP_STORAGE.devs_groups.setName(String(gr.g_name)); 
        APP_STORAGE.devs_groups.setLongitude(String(gr.longitude)); 
        APP_STORAGE.devs_groups.setLatitude(String(gr.latitude)); 
        APP_STORAGE.devs_groups.setInfo(String(gr.g_info)); 
        APP_STORAGE.devs_groups.setKeyOrg(String(gr.org_id));
        APP_STORAGE.devs_groups.setParent(String(gr.parent_id));

        APP_STORAGE.change_devs_groups.setOpenModalChDevsGr(true);
      }
    }
    return parent;
  }

  drawDevGroup(dgrs: TDevsGroup[]): React.ReactNode[] {
    var parent: React.ReactNode[] = new Array();
    for (var ii in dgrs) {
      var dgr: TDevsGroup = dgrs[ii];
      var gr: TDGroup = dgr.group;
      var gr_childs = dgr.childs;

      var childs: React.ReactNode[] = new Array();
      if (gr_childs.length > 0) childs = this.drawDevGroup(gr_childs);

      parent.push(
        <React.Fragment key={"_gr_id_key_" + gr.id}>
          <Box sx={{ display: "flex", width: "100%", flexDirection: "column" }}>
            <Box id={String(gr.id)}>{childs}</Box>
          </Box>
        </React.Fragment>
      );

      if (APP_STORAGE.devs.getIdDevs() === String(gr.id)) {
        APP_STORAGE.devs_groups.setOrg(Number(gr.org_id));

        parent.push(
          <React.Fragment key={String(gr.id)}>
            <Box
              id="long-button"
              sx={{
                width: "100%",
                background: "#fff",
                borderRadius: "4px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontWeight: "500",
                      fontSize: "22px",
                    }}
                  >
                    {gr.g_name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: "grey",
                    }}
                  >
                    Место расположения устройства
                  </Typography>
                </Box>
                {APP_STORAGE.getRoleWrite() === 2 && APP_STORAGE.getRoleRead() === 1 &&
                <div>
                  <IconButton
                    onClick={() => {
                      APP_STORAGE.devs_groups.setOpen_menu(true);
                    }}
                    id="long-button_menu"
                    aria-label="more"
                    aria-controls={open ? "long-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-haspopup="true"
                    // onClick={handleClick}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="long-menu"
                    MenuListProps={{
                      "aria-labelledby": "long-button",
                    }}
                    anchorEl={document.getElementById("long-button_menu")}
                    open={APP_STORAGE.devs_groups.getOpen_menu()}
                    onClose={() => {
                      APP_STORAGE.devs_groups.setOpen_menu(false);
                    }}
                  >
                    <MenuItem>
                      <Typography onClick={() => this.editDeviceLocation()}>
                        {" "}
                        Редактировать
                      </Typography>
                      <br />
                    </MenuItem>
                    <MenuItem>
                      <Typography
                        onClick={() => APP_STORAGE.devs.setOpenModal(true)}
                      >
                        {" "}
                        Добавить устройство
                      </Typography>
                    </MenuItem>
                  </Menu>
                </div>
      }
              </Box>
              <Box
                sx={{
                  display: "flex",
                  borderRadius: "4px",
                  flexDirection: "column",
                }}
              >
                <TextField
                  variant="outlined"
                  margin="normal"
                  size="small"
                  required
                  fullWidth
                  id="Долгота"
                  label="Долгота"
                  autoFocus
                  ///onChange={ (e)=>{ APP_STORAGE.auth_form.setLogin(e.target.value); } }
                  value={gr.longitude}
                />

                <TextField
                  variant="outlined"
                  margin="normal"
                  size="small"
                  required
                  fullWidth
                  id="Широта"
                  label="Широта"
                  autoFocus
                  ///onChange={ (e)=>{ APP_STORAGE.auth_form.setLogin(e.target.value); } }
                  value={gr.latitude}
                />
                <Box id={gr.org_id}></Box>
              </Box>

              {APP_STORAGE.getRoleWrite() === 2 && APP_STORAGE.getRoleRead() === 1 &&
          <Box sx={{ display: "flex" }}>
          <Box
            sx={{
              background: "#4891FF",
              width: "180px",
              color: "#fff",
              p: "4px",
              borderRadius: "4px",
            }}
            onClick={() =>
              this.OpenModal(
                APP_STORAGE.devs.getIdDevs(),
                Number(gr.org_id)
              )
            }
          >
            <Box sx={{ display: "flex" }}>
              {" "}
              <AddLocationAltIcon
                fontSize="small"
                sx={{
                  background: "#73ABFF",
                  p: "4px",
                  borderRadius: "4px",
                  color: "#fff",
                  mr: "4px",
                }}
              />
              <Typography sx={{ alignSelf: "center" }}>
                {" "}
                Добавить
              </Typography>
            </Box>
          </Box>
        </Box>
      }

            




            </Box>
          </React.Fragment>
        );
      }
    }
    return parent;
  }

  drawDevLocation(): React.ReactNode {
    let devs_g = [];
    let DevGr = [];

    if (Object.keys(
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
          className="wrapper-devs"
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column;",
            alignItems: "flex-start;",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {APP_STORAGE.getRoleWrite() === 2 && APP_STORAGE.getRoleRead() === 1 
           ? <Box
              sx={{
                color: "#000",
                borderRadius: "4px",
              }}
              onClick={() => this.OpenModal("0", 0)}
            >
              <Typography sx={{ display: "flex" }}>
                {" "}
                Добавить новое расположение
              </Typography>
            </Box>
            : <Box
            sx={{
              color: "#000",
              borderRadius: "4px",
            }}
           
          >
            <Typography sx={{ display: "flex" }}>
              {" "}
              Список пуст или ничего не выбрано
            </Typography>
          </Box>
  }

          </Box>
          {this.drawDevLocation()}
        </Box>
      </React.Fragment>
    );
  }
}
