import React, { FC, MouseEvent, useState, useEffect } from "react";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import {
  Stack,
  Typography,
  Box,
  Link,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
} from "@mui/material";
import DirectionsIcon from "@mui/icons-material/Directions";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import { TextInput } from "../../../shared/TextInput";
import { CONFIG } from "../../../../../../xcore/config";
import { APP_STORAGE } from "../../../../storage/AppStorage";
import { IGroup, IGroupData } from "../../../../models/IDevice";

interface IProps {}
export const DevLocationFC: FC<IProps> = observer(() => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentGroup, setCurrentGroup] = useState({
    name: "",
    latitude: "",
    longitude: "",
  });
  const open = Boolean(anchorEl);
  const groups: IGroup[] = JSON.parse(
    JSON.stringify(APP_STORAGE.devs_groups.getDevsGroups())
  );
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getCurrentGroup = (id: string, locations: IGroup[]) => {
    locations.forEach((item) => {
      const {
        id,
        deleted,
        g_info,
        g_name,
        latitude,
        longitude,
        parent_id,
        org_id,
      } = item.group;
      if (item.childs.length > 0) {
        getCurrentGroup(APP_STORAGE.devs.getIdDevs(), item.childs);
      }

      if (id === APP_STORAGE.devs.getIdDevs()) {
        APP_STORAGE.devs_groups.setName(String(g_name));
        APP_STORAGE.devs_groups.setLongitude(String(longitude));
        APP_STORAGE.devs_groups.setLatitude(String(latitude));
        APP_STORAGE.devs_groups.setInfo(String(g_info));
        APP_STORAGE.devs_groups.setKeyOrg(String(org_id));
        APP_STORAGE.devs_groups.setParent(String(parent_id));
        APP_STORAGE.devs_groups.setCheckboxEd(deleted);
        setCurrentGroup({
          name: g_name,
          latitude,
          longitude,
        });
      }
    });
  };

  const moveLocation = (numberCase: string) => {
    APP_STORAGE.devs.setMenu_devs(numberCase);
    APP_STORAGE.devs_groups.setOpenModalMoveDevsGr(true);
    handleClose();
  };
  useEffect(() => {
    getCurrentGroup(APP_STORAGE.devs.getIdDevs(), groups);
  }, [APP_STORAGE.devs.getIdDevs(), APP_STORAGE.devs_groups.getDevsGroups()]);

  return (
    <Stack>
      <Typography sx={{ fontWeight: "600", color: "#0D1C52", mb: "12px" }}>
        Данные по расположению устройства
      </Typography>
      {APP_STORAGE.devs.getIdDevs() && (
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
                      handleClose();
                    }}
                  >
                    <ListItemIcon>
                      <ModeEditRoundedIcon fontSize="small" />
                    </ListItemIcon>{" "}
                    Редактировать
                  </MenuItem>

                  <MenuItem onClick={() => moveLocation("3")}>
                    <ListItemIcon>
                      <LogoutRoundedIcon fontSize="small" />
                    </ListItemIcon>{" "}
                    Переместить
                  </MenuItem>

                  <Divider />

                  <MenuItem onClick={() => APP_STORAGE.devs.setOpenModal(true)}>
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

                  <MenuItem>
                    <ListItemIcon>
                      <PostAddOutlinedIcon fontSize="small" />
                    </ListItemIcon>{" "}
                    Загрузить схему расположения
                  </MenuItem>

                  <MenuItem onClick={() => console.log()}>
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
            value={currentGroup.name}
          />
          <TextInput
            InputProps={{
              readOnly: true,
              style: { fontSize: 12 },
            }}
            label="Широта"
            value={currentGroup.latitude}
          />

          <TextInput
            InputProps={{
              readOnly: true,
              style: { fontSize: 12 },
            }}
            label="Долгота"
            value={currentGroup.longitude}
          />
          <Link
            underline="hover"
            href={`http://${CONFIG.host}:${
              CONFIG.port
            }/show-map?lng=${APP_STORAGE.devs_groups.getLatitude()}&lat=${APP_STORAGE.devs_groups.getLongitude()}`}
            target="_blank"
            sx={{
              fontSize: "1rem",
              display: "flex",
              alignItems: "center",
              flexDirection: "row-reverse",
            }}
          >
            Показать на карте
            <DirectionsIcon />
          </Link>
        </Stack>
      )}
    </Stack>
  );
});
