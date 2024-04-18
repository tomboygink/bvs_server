import React, { useState, useEffect, MouseEvent } from "react";
import { observer } from "mobx-react";
import { set, toJS } from "mobx";
import {
  Typography,
  Box,
  Stack,
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
} from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import { APP_STORAGE } from "../../../storage/AppStorage";
import { TextInput } from "../../shared/TextInput";
import { EditWellModal } from "./EditWellModal";
import { IWell } from "../../../models/IWell";
import { IDevice } from "../../../models/IDevice";

export const Wells = observer(() => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedWell, setSelectedWell] = useState<null | IWell>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpenModalNewWell = () => {
    APP_STORAGE.reg_user.setModalRegUser(true);
    APP_STORAGE.reg_user.setTakeModal(4);
    APP_STORAGE.reg_user.setTittleModal("Добавить скважину");
  };

  const getSelectedWell = () => {
    let dev: IDevice;
    let selectedWell = {
      id: "",
      number: "",
      location: {
        id: "",
        name: "",
      },
      org: {
        id: "",
        name: "",
      },
      dev: {
        id: "",
        number: "",
      },
    };

    const well = APP_STORAGE.wells
      .getDefaultWells()
      ?.find((well) => well.number === APP_STORAGE.reg_user.getNodeIdWell());

    if (well) {
      const org = APP_STORAGE.reg_user
        .getOrgAll()
        .find((org) => org.id === well.org_id);

      const location = APP_STORAGE.devs_groups
        .getLocations()
        .find((loc) => loc.id === well.group_id);

      if (well.dev_id) {
        dev = APP_STORAGE.devs_groups
          .getAllDevs()
          .find((dev) => dev.id === well.dev_id);
      }
      selectedWell = {
        id: well.id,
        number: well.number,
        location: {
          id: location.id,
          name: location.name,
        },
        org: {
          id: org.id,
          name: org.full_name,
        },
        dev: {
          id: dev?.id || "",
          number: dev?.number || "",
        },
      };
      //setSelectedWell(selectedWell);
      APP_STORAGE.wells.setSelectedWell(selectedWell);
    } else APP_STORAGE.wells.setSelectedWell(selectedWell);
  };

  useEffect(() => {
    getSelectedWell();
  }, [APP_STORAGE.reg_user.getNodeIdWell()]);

  return (
    <>
      <Typography sx={{ fontWeight: "600", color: "#111111", mb: "8px" }}>
        {" "}
        Подробная информация{" "}
      </Typography>
      {APP_STORAGE.reg_user.getNodeIdWell() && (
        <>
          <Stack
            spacing={2}
            sx={{ backgroundColor: "#fff", padding: "20px", mb: "20px" }}
          >
            {APP_STORAGE.getRoleWrite() === 2 &&
              APP_STORAGE.getRoleRead() === 1 && (
                <>
                  <IconButton
                    sx={{ alignSelf: "flex-end" }}
                    onClick={handleClick}
                    aria-controls={open ? "menuWell" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="menuWell"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem
                      onClick={() => {
                        APP_STORAGE.wells.setOpenModal(true);
                        handleClose();
                      }}
                    >
                      <ListItemIcon>
                        <ModeEditRoundedIcon fontSize="small" />
                      </ListItemIcon>{" "}
                      Редактировать
                    </MenuItem>
                  </Menu>
                </>
              )}
            <TextInput
              InputProps={{
                readOnly: true,
                style: { fontSize: 12 },
              }}
              label="Номер скважины"
              value={APP_STORAGE.wells.getSelectedWell()?.number || ""}
            />
            <TextInput
              InputProps={{
                readOnly: true,
                style: { fontSize: 12 },
              }}
              label="Расположение"
              value={APP_STORAGE.wells.getSelectedWell()?.location.name || ""}
            />

            <TextInput
              InputProps={{
                readOnly: true,
                style: { fontSize: 12 },
              }}
              label="Организация"
              value={APP_STORAGE.wells.getSelectedWell()?.org.name || ""}
            />
            <TextInput
              InputProps={{
                readOnly: true,
                style: { fontSize: 12 },
              }}
              label="Устройство"
              value={APP_STORAGE.wells.getSelectedWell()?.dev?.number || ""}
            />
          </Stack>
        </>
      )}
      <EditWellModal />
      <Box
        sx={{
          borderRadius: "4px",
          width: "100%",
          background: "#E3EDFF",
          p: 2,
          cursor: "pointer",
          transition: "0.3s",
          ":hover": {
            opacity: "0.6",
          },
        }}
        onClick={handleOpenModalNewWell}
      >
        <Typography
          sx={{ display: "flex", color: "#266BF1", justifyContent: "center" }}
        >
          {" "}
          Добавить скважину
        </Typography>
      </Box>
    </>
  );
});
