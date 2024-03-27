import React, { useState, MouseEvent } from "react";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import {
  Typography,
  Box,
  Stack,
  Menu,
  MenuItem,
  Divider,
  Link,
  IconButton,
  ListItemIcon,
  TextareaAutosize,
} from "@mui/material";
import DirectionsIcon from "@mui/icons-material/Directions";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import PhotoSizeSelectLargeIcon from "@mui/icons-material/PhotoSizeSelectLarge";
import { APP_STORAGE } from "../../../storage/AppStorage";
import { TextInput } from "../../shared/TextInput";

export const Wells = observer(() => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedWell, setSelectedWell] = useState<null | object>(null);
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

  const getSelectedWell = () => {};
  console.log("well", APP_STORAGE.reg_user.getNodeIdWell());
  console.log("locations", toJS(APP_STORAGE.devs_groups.getDevsGroups()));
  return (
    <>
      <Typography sx={{ fontWeight: "600", color: "#111111", mb: "8px" }}>
        {" "}
        Подробная информация{" "}
      </Typography>
      {APP_STORAGE.reg_user.getNodeIdWell() && (
        <>
          <Stack spacing={2} sx={{ backgroundColor: "#fff", padding: "20px" }}>
            {APP_STORAGE.getRoleWrite() === 2 &&
              APP_STORAGE.getRoleRead() === 1 && (
                <>
                  <IconButton
                    sx={{ alignSelf: "flex-end" }}
                    onClick={handleClick}
                    aria-controls={open ? "menuPlace" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="menuPlace"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem
                      onClick={() => {
                        APP_STORAGE.devs_groups.setOpenModalChDevsGr(true);
                        // handleClose();
                      }}
                    >
                      <ListItemIcon>
                        <ModeEditRoundedIcon fontSize="small" />
                      </ListItemIcon>{" "}
                      Редактировать
                    </MenuItem>

                    <MenuItem onClick={() => console.log("3")}>
                      <ListItemIcon>
                        <LogoutRoundedIcon fontSize="small" />
                      </ListItemIcon>{" "}
                      Переместить
                    </MenuItem>

                    <Divider />

                    <MenuItem
                      onClick={() => APP_STORAGE.devs.setOpenModal(true)}
                    >
                      <ListItemIcon>
                        <CrisisAlertIcon fontSize="small" />
                      </ListItemIcon>{" "}
                      Добавить устройство
                    </MenuItem>

                    <MenuItem
                      onClick={() => APP_STORAGE.importdevs.setOpenModal(true)}
                    >
                      <ListItemIcon>
                        <PostAddOutlinedIcon fontSize="small" />
                      </ListItemIcon>{" "}
                      Импортировать список устройств
                    </MenuItem>

                    <MenuItem
                      onClick={() => {
                        APP_STORAGE.importdevs.setOpenModalSvg(true);
                      }}
                    >
                      <ListItemIcon>
                        <PhotoSizeSelectLargeIcon fontSize="small" />
                      </ListItemIcon>{" "}
                      Загрузить схему расположения
                    </MenuItem>

                    <MenuItem onClick={(e) => console.log(e)}>
                      <ListItemIcon>
                        <CreateNewFolderOutlinedIcon fontSize="small" />
                      </ListItemIcon>{" "}
                      Добавить подруппу
                    </MenuItem>
                  </Menu>
                </>
              )}
            <TextInput
              InputProps={{
                readOnly: true,
                style: { fontSize: 12 },
              }}
              label="Место расположения"
            />
            <TextInput
              InputProps={{
                readOnly: true,
                style: { fontSize: 12 },
              }}
              label="Широта"
            />

            <TextInput
              InputProps={{
                readOnly: true,
                style: { fontSize: 12 },
              }}
              label="Долгота"
            />
          </Stack>
        </>
      )}

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
