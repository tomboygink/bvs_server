import { observer } from "mobx-react";
import { toJS } from "mobx";

import React, { FC, useEffect, useState } from "react";
import { APP_STORAGE } from "../../../../storage/AppStorage";
import { CONFIG } from "../../../../../../xcore/config";
import { IDevice, IGroup } from "../../../../models/IDevice";
import { Box, Stack, Link, TextareaAutosize, Typography } from "@mui/material";
import DirectionsIcon from "@mui/icons-material/Directions";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { getSelectedGroup } from "../../../../../utils/functions";
import { LeafletMap } from "./Map";
import { MenuDevs } from "./Menu/MenuDevs";
import { TextInput } from "../../../shared/TextInput";
import "../../../../../scss/dev.scss";

interface IProps {}
interface Dictionary {
  [key: number]: SVGElement[];
}

export const Devs: FC<IProps> = observer(() => {
  const [selectedGroup, setSelectedGroup] = useState<IGroup | null>(null);

  const devs = JSON.parse(JSON.stringify(APP_STORAGE.devs_groups.getAllDevs()));
  const groups = JSON.parse(
    JSON.stringify(APP_STORAGE.devs_groups.getDevsGroups())
  );
  const sensors = APP_STORAGE.sensors;
  const sessId = APP_STORAGE.auth_form.getdt();
  const selectedDevId = APP_STORAGE.devs
    .getIdChild()
    .replace("_dev_id_key_", "");

  const currentDev = devs.find((dev: IDevice) => {
    return dev.id === selectedDevId;
  });

  const setDataOfCurrentDev = (
    number: string,
    id: string,
    isDeleted: boolean,
    time: string
  ) => {
    sensors.setNumber(number);
    sensors.setIdDev(id);
    sensors.setDeletedDev(isDeleted);

    if (time) {
      let delta = new Date().getTime() - new Date(time).getTime();
      const passedDays = Math.floor(delta / 1000 / 60 / 60 / 24);
      APP_STORAGE.devs.setPassedDay(String(passedDays));
    } else {
      APP_STORAGE.devs.setPassedDay("");
    }
  };

  const drawSheme = () => {
    const element = document.createElement("div");
    element.id = "devSheme";
    document.getElementsByClassName("sheme-container")[0].innerHTML = "";
    document.getElementsByClassName("sheme-container")[0].appendChild(element);
    const newSvg = document.getElementById("devSheme");
    newSvg.outerHTML = sensors.getSheme();
    newSvg.classList.add("dev-sheme");
    const hrefs: SVGElement[] = Array.from(document.querySelectorAll(".ds"));
    const tooltip: HTMLElement = document.querySelector("#tooltipDevSheme");
    const textContolSession = document.querySelector(".control-session");
    const textLastSession = document.querySelector(".last-session");
    const textDepth = document.querySelector(".depth");
    const dictionary: Dictionary = {};
    const indexArr: Array<number> = [];
    hrefs.forEach((item, i) => {
      const classList = item.classList;

      if (classList.value.includes("kosa")) {
        indexArr.push(i);
      }
    });
    indexArr.push(hrefs.length);

    indexArr.forEach((item, i) => {
      if (i !== indexArr.length - 1) {
        dictionary[i] = hrefs.slice(item, indexArr[i + 1]);
      }
    });

    for (let key in dictionary) {
      dictionary[key].forEach((item, i) => {
        const index = Number(item.id.replace("ds_", ""));

        item.addEventListener("mousemove", () => {
          textDepth.textContent = ` ${
            toJS(APP_STORAGE.sensors.getSessFirstLast())[index - 1]?.depth
              ? toJS(APP_STORAGE.sensors.getSessFirstLast())[index - 1]?.depth -
                toJS(APP_STORAGE.sensors.getSessFirstLast())[indexArr[key]]
                  ?.depth
              : "нет данных"
          } `;
        });
      });
    }
    hrefs.forEach((item, i) => {
      const sensor: HTMLElement = document.querySelector(`#ds_${i + 1}`);

      item.addEventListener("mouseout", () => {
        sensor.style.fill = "";
        tooltip.style.display = "none";
      });
      item.addEventListener("mousemove", () => {
        sensor.style.fill = "#0500FF";
        const clientRectangle = document
          .getElementById(hrefs[i].id)
          .getBoundingClientRect();

        textContolSession.textContent = ` ${
          toJS(APP_STORAGE.sensors.getSessFirstLast())[i]?.data_f
            ? toJS(APP_STORAGE.sensors.getSessFirstLast())[i]?.data_f
            : "нет данных"
        } `;

        textLastSession.textContent = ` ${
          toJS(APP_STORAGE.sensors.getSessFirstLast())[i]?.data_s
            ? toJS(APP_STORAGE.sensors.getSessFirstLast())[i]?.data_s
            : "нет данных"
        } `;

        tooltip.style.display = "block";
        tooltip.style.left = clientRectangle.left + "px";
        tooltip.style.top = clientRectangle.top + "px";
      });
    });
  };

  useEffect(() => {
    drawSheme();
  }, [sensors.getSheme(), selectedDevId]);

  useEffect(() => {
    const { number, id, deleted, time, period_sess } = currentDev;
    setDataOfCurrentDev(number, id, deleted, time);
    sensors.get_DevFirstLastSessions("sess_id", sessId);

    sensors.get_DevPovs(sessId);
    APP_STORAGE.devs.setPeriodSess(period_sess);
    getSelectedGroup(groups, id, setSelectedGroup);
  }, [selectedDevId]);

  return (
    <section>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        {APP_STORAGE.getRoleWrite() === 2 &&
          APP_STORAGE.getRoleRead() === 1 && <MenuDevs />}
      </Box>
      <Stack sx={{ width: "100%" }} spacing={2}>
        <TextInput
          label="Место расположения"
          value={selectedGroup ? selectedGroup.group.g_name : ""}
        />

        <TextInput label="Название устройства" value={currentDev.name || ""} />

        <TextInput label="Номер устройства" value={currentDev.number || ""} />
        <Stack spacing={2} direction="row">
          <TextInput
            fullWidth={false}
            label="Долгота"
            value={currentDev.longitude.trim() || ""}
          />

          <TextInput
            fullWidth={false}
            label="Широта"
            value={currentDev.latitude.trim() || ""}
          />
          <Link
            underline="hover"
            href={`http://${CONFIG.host}:${
              CONFIG.port
            }/show-map?lat=${currentDev.latitude.trim()}&lng=${currentDev.latitude.trim()}`}
            target="_blank"
            sx={{
              fontSize: "1rem",
              display: "flex",
              alignItems: "center",
              flexDirection: "row-reverse",
            }}
          >
            Показать на карте (на отдельной странице)
            <DirectionsIcon />
          </Link>
        </Stack>
      </Stack>
      <TextareaAutosize
        className="info"
        aria-label="minimum height"
        minRows={4}
        style={{ width: "100%", marginTop: "12px" }}
        value={currentDev.info || ""}
      />
      {sensors.getSheme() && (
        <Typography
          sx={{ fontWeight: "600", color: "#0D1C52", mb: "12px", mt: "12px" }}
        >
          Схема устройства
        </Typography>
      )}
      <Box
        className="sheme-container"
        sx={{ width: "100%", padding: "12px" }}
      ></Box>
      <Stack id="tooltipDevSheme" className="tooltip-dev-sheme">
        <Stack direction="row" alignItems="center">
          <ShowChartIcon sx={{ color: "#FFAD4E", fontSize: "medium" }} />
          <Typography sx={{ color: "#808080", fontSize: "14px" }}>
            Глубина
            <span className="devsheme-text depth"></span>м
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center">
          <DeviceThermostatIcon
            style={{ color: "#00B394", fontSize: "medium" }}
          />
          <Typography sx={{ color: "#808080", fontSize: "14px" }}>
            Температура:
            <span className="devsheme-text control-session"></span>
            (контрольная сессия)
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center">
          <DeviceThermostatIcon
            style={{ color: "#A178FB", fontSize: "medium" }}
          />
          <Typography sx={{ color: "#808080", fontSize: "14px" }}>
            Температура:
            <span className="devsheme-text last-session"></span>
            (последняя сессия)
          </Typography>
        </Stack>
      </Stack>

      <Box sx={{ height: "400px", width: "100%" }}>
        <LeafletMap
          longitude={currentDev.longitude}
          latitude={currentDev.latitude}
        />
      </Box>
    </section>
  );
});
