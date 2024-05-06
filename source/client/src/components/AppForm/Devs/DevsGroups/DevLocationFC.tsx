import React, { FC, MouseEvent, useState, useEffect, useRef } from "react";
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
import { TextInput } from "../../../shared/TextInput";
import { CONFIG } from "../../../../../../xcore/config";
import { APP_STORAGE } from "../../../../storage/AppStorage";
import { IGroup } from "../../../../models/IDevice";

interface IProps {}
interface MutableRefObject<T> {
  current: T;
}
export const DevLocationFC: FC<IProps> = observer(() => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentGroup, setCurrentGroup] = useState({
    name: "",
    latitude: "",
    longitude: "",
    info: "",
    parentId: "",
    orgId: "",
    devs: [],
    svg: "",
  });
  const open = Boolean(anchorEl);
  const svgRef: MutableRefObject<SVGElement> = useRef();
  const groups: IGroup[] = JSON.parse(
    JSON.stringify(APP_STORAGE.devs_groups.getDevsGroups())
  );
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Получим данные выбранной группы устройств
  const getCurrentGroup = (locations: IGroup[]) => {
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
        svg,
      } = item.group;
      if (item.childs.length > 0) {
        getCurrentGroup(item.childs);
      }

      if (id === APP_STORAGE.devs.getIdDevs()) {
        APP_STORAGE.devs_groups.setName(String(g_name));
        APP_STORAGE.devs_groups.setLongitude(String(longitude));
        APP_STORAGE.devs_groups.setLatitude(String(latitude));
        APP_STORAGE.devs_groups.setInfo(String(g_info));
        APP_STORAGE.devs_groups.setKeyOrg(String(org_id));
        APP_STORAGE.devs_groups.setParent(String(parent_id));
        APP_STORAGE.devs_groups.setCheckboxEd(deleted);
        APP_STORAGE.devs.setChangeSensors2(item.devs);
        setCurrentGroup({
          name: g_name,
          latitude,
          longitude,
          info: g_info,
          parentId: parent_id,
          orgId: org_id,
          devs: item.devs,
          svg,
        });
      }
    });
  };

  // Перемещение группы устройств
  const moveLocation = (numberCase: string) => {
    APP_STORAGE.devs.setMenu_devs(numberCase);
    APP_STORAGE.devs_groups.setOpenModalMoveDevsGr(true);
    handleClose();
  };

  // Добавление подгруппы
  const addSubgroup = () => {
    APP_STORAGE.devs_groups.setOrg(Number(currentGroup.orgId));
    APP_STORAGE.devs_groups.setParent(APP_STORAGE.devs.getIdDevs());
    APP_STORAGE.devs_groups.setOpenModal(true);
    APP_STORAGE.reg_user.get_Org("sess_id", APP_STORAGE.auth_form.getdt()); /// получаем все организации
  };

  //Отправляем в стор данные svg
  const setSvg = () => {
    if (currentGroup.svg) {
      const svgSheme = atob(
        currentGroup.svg.replace(/data:image\/svg\+xml;base64,/, "")
      );
      APP_STORAGE.importdevs.setSvg(svgSheme);
      setTimeout(() => {
        drawShemeSvg();
        //APP_STORAGE.importdevs.uploadfile();
      }, 100);
    } else APP_STORAGE.importdevs.setSvg("");
  };

  // Отрисовка схемы расположения
  const drawShemeSvg = () => {
    let tooltip = document.getElementById("tooltip");
    const devTooltip = tooltip.querySelector(".tooltip__dev");
    const wellTooltip = tooltip.querySelector(".tooltip__well");

    APP_STORAGE.importdevs.setOpenModalSvg(false);
    const hrefs: SVGElement[] = Array.from(
      svgRef.current.querySelectorAll(".well")
    );

    hrefs.forEach((item, i) => {
      item.addEventListener("mouseout", () => {
        item.style.stroke = "";
        tooltip.style.display = "none";
      });
      item.addEventListener("mousemove", () => {
        APP_STORAGE.devs.getChangeSensors2().forEach((dev, j) => {
          if (item.id.slice(5) === dev.id) {
            item.style.stroke = "#25E48B";
            const clientRectangle = item.getBoundingClientRect();
            devTooltip.textContent = `Номер косы - ${
              APP_STORAGE.devs.getChangeSensors2()[j].number
            }`;
            if (APP_STORAGE.devs.getChangeSensors2()[j].well) {
              wellTooltip.textContent = `Номер скважины - ${
                APP_STORAGE.devs.getChangeSensors2()[j].well
              }`;
            } else {
              wellTooltip.textContent = "";
            }

            // tooltip.innerHTML = `Номер косы - ${
            //   APP_STORAGE.devs.getChangeSensors2()[j].number
            // }. Номер скважины - ${
            //   APP_STORAGE.devs.getChangeSensors2()[j].well
            // }`;

            tooltip.style.display = "block";
            tooltip.style.left = clientRectangle.left + "px";
            tooltip.style.top = clientRectangle.top + "px";
          }
        });
      });
      item.addEventListener("click", () => {
        APP_STORAGE.devs.getChangeSensors2().forEach((dev, j) => {
          if (item.id.slice(5) === dev.id) {
            APP_STORAGE.devs.setIdChild("_dev_id_key_" + item.id.slice(5));
            APP_STORAGE.sensors.setEmptySession("");
            APP_STORAGE.sensors.setSessFirstLast([]);
            APP_STORAGE.sensors.setSessFirstLastCharts([]);
            APP_STORAGE.sensors.setSess_first([]);
            APP_STORAGE.sensors.setSess_second([]);
            APP_STORAGE.sensors.setSortDesc("");
            APP_STORAGE.sensors.setAkbSessChose("");
            APP_STORAGE.sensors.setChoseSessTime("");
            APP_STORAGE.sensors.setAkbSessLast("");
            APP_STORAGE.devs_groups.setMiddleForm(2);
            APP_STORAGE.devs.setTopMenuDev("top_menu-1");
          }
        });
      });
    });
  };
  useEffect(() => {
    getCurrentGroup(groups);
  }, [APP_STORAGE.devs.getIdDevs(), APP_STORAGE.devs_groups.getDevsGroups()]);

  useEffect(() => {
    setSvg();
  }, [currentGroup]);

  return (
    <Stack>
      <Typography sx={{ fontWeight: "600", color: "#0D1C52", mb: "12px" }}>
        Данные по расположению устройства
      </Typography>
      {APP_STORAGE.devs.getIdDevs() && (
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

                    <MenuItem onClick={addSubgroup}>
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
            {currentGroup.info && (
              <TextareaAutosize
                className="info"
                aria-label="minimum height"
                minRows={4}
                style={{ width: "100%", marginTop: "12px" }}
                value={currentGroup.info || ""}
              />
            )}
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
          {APP_STORAGE.importdevs.getSvg() && (
            <>
              <Typography
                sx={{ fontWeight: "600", color: "#0D1C52", mb: "12px" }}
              >
                Схема изделий на полигоне
              </Typography>
              <Box
                className="svg-container"
                dangerouslySetInnerHTML={{
                  __html: APP_STORAGE.importdevs.getSvg(),
                }}
                ref={svgRef}
                sx={{
                  borderRadius: "4px",

                  background: "#fff",
                  display: "flex",
                  padding: "8px",
                  pl: "22px",
                  mb: "22px",
                }}
              ></Box>
              <Box id="tooltip" sx={{ position: "absolute", display: "none" }}>
                <Typography
                  sx={{ fontSize: "12px", fontWeight: "700" }}
                  className="tooltip__well"
                ></Typography>
                <Typography
                  sx={{ fontSize: "12px", fontWeight: "700" }}
                  className="tooltip__dev"
                ></Typography>
              </Box>
            </>
          )}
        </>
      )}
    </Stack>
  );
});
