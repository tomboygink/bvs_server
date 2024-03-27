import React, { FC, useEffect, useState, useRef } from "react";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import {
  Box,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  Stack,
} from "@mui/material";

import { Org } from "../../../../../storage/components/Orgs/OrgStorage";
import { APP_STORAGE } from "../../../../../storage/AppStorage";
import { useFormValidation } from "../../../../../hooks/UseFormValidation";
import { TextInput } from "../../../../shared/TextInput";
import { IGroup } from "../../../../../models/IDevice";

interface IProps {}

export const NewWell: FC<IProps> = observer(() => {
  const {
    values,
    errors,
    handleChange,
    handleSelectChange,
    isInValidInput,
    isValid,
  } = useFormValidation();

  const [validationMessage, setValidationMessage] = useState("");
  const [group, setGroup] = useState([]);
  const [currentDevs, setCurrentDevs] = useState([]);

  const orgs: Org[] = JSON.parse(
    JSON.stringify(APP_STORAGE.reg_user.getOrgAll())
  );
  const locations = JSON.parse(
    JSON.stringify(APP_STORAGE.devs_groups.getDevsGroups())
  );
  const allDevs = toJS(APP_STORAGE.devs_groups.getAllDevs());

  // Получение значения: форма валидна или нет
  const isValidForm = () => {
    return (
      isValid && Boolean(values.addWell_location) && Boolean(values.addWell_org)
    );
  };

  // Options для списка с расположением
  const getGroups = (locations: IGroup[]) => {
    let allLocations: any[] = [];
    const recursion = (arr: IGroup[]) => {
      arr.forEach((item) => {
        if (item.childs.length > 0) {
          recursion(item.childs);
        }

        allLocations = [
          ...allLocations,
          {
            id: item.group.id,
            name: item.group.g_name,
            parent_id: item.group.parent_id,
            org_id: item.group.org_id,
          },
        ];
      });
      // const groups = arr.reduce((acc, { group: { g_name, id } }) => {
      //   return [...acc, { id, name: g_name }];
      // }, []);
      // setGroup(groups);
    };
    recursion(locations);
    setGroup(allLocations);
  };

  //Options для списка с организация и устройствами в зависимости от выбранного расположения
  const getOrg = (arr: Org[]) => {
    let selectedLocation: {
      id: string;
      name: string;
      parent_id: string;
      org_id: string;
    };
    selectedLocation = group.find((item) => {
      return item.id === values.addWell_location;
    });
    const org = arr.find((item) => {
      return item.id === selectedLocation?.org_id;
    });
    const devs = allDevs.filter(
      (item) => item.group_dev_id === values.addWell_location
    );
    if (org) {
      values.addWell_org = org.id;
    }
    if (devs.length !== 0) {
      setCurrentDevs(devs);
    } else setCurrentDevs([]);
  };

  // Отправка формы
  const handleAddWell = () => {
    setValidationMessage("");
    isValidForm()
      ? APP_STORAGE.reg_user.set_NewThermalWell(
          "sess_id",
          APP_STORAGE.auth_form.getdt(),
          values
        )
      : setValidationMessage("Не заполнены обязательные поля");
  };

  useEffect(() => {
    values.addWell_dev = "";
    getOrg(orgs);
    getGroups(locations);
  }, [APP_STORAGE.devs_groups.getDevsGroups(), values.addWell_location]);

  return (
    <React.Fragment>
      <TextInput
        InputProps={{
          name: "addWell_number",
          style: { fontSize: 12 },
        }}
        error={
          "addWell_number" in isInValidInput &&
          Boolean(isInValidInput.addWell_number)
        }
        helperText={
          "addWell_number" in errors ? String(errors.addWell_number) : ""
        }
        label="Номер скважины"
        value={values.addWell_number || ""}
        onChange={handleChange}
      />

      <FormControl fullWidth size="small" sx={{ mt: "14px" }}>
        <InputLabel className="org" sx={{ fontSize: "12px" }}>
          Расположение*
        </InputLabel>

        <Select
          name="addWell_location"
          sx={{ fontSize: "12px" }}
          label="расположение"
          value={values.addWell_location || ""}
          onChange={handleSelectChange}
        >
          {group
            .map((item) => {
              return (
                <MenuItem
                  id={`optionOrg_${item.id}`}
                  key={item.id}
                  sx={{
                    fontSize: "12px",
                    fontWeight: `${item.parent_id === "0" ? "600" : "400"}`,
                    pl: `${item.parent_id === "0" ? "16px" : "32px"}`,
                  }}
                  value={item.id}
                >
                  {item.name}
                </MenuItem>
              );
            })
            .reverse()}
        </Select>
      </FormControl>
      <FormControl fullWidth size="small" sx={{ mt: "14px" }}>
        <InputLabel className="org" sx={{ fontSize: "12px" }}>
          Организация*
        </InputLabel>
        <Select
          name="addWell_org"
          sx={{ fontSize: "12px" }}
          value={values.addWell_org || ""}
          label="организация"
          onChange={handleSelectChange}
        >
          {orgs.map((item) => {
            return (
              <MenuItem key={item.id} sx={{ fontSize: "12px" }} value={item.id}>
                {item.full_name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl fullWidth size="small" sx={{ mt: "14px" }}>
        <InputLabel className="org" sx={{ fontSize: "12px" }}>
          Устройство
        </InputLabel>
        <Select
          name="addWell_dev"
          sx={{ fontSize: "12px" }}
          value={currentDevs.length === 0 ? "" : values.addWell_dev}
          onChange={handleSelectChange}
          label="Устройство"
        >
          <MenuItem value="">
            <em>Ничего не выбирать</em>
          </MenuItem>
          {currentDevs.map((item) => {
            return (
              <MenuItem key={item.id} value={item.id}>
                {item.number}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <Box
        sx={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "flex-end",
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
          onClick={handleAddWell}
        >
          Сохранить
        </Button>
      </Box>
      {APP_STORAGE.reg_user.getSuccessSave_mess().length > 0 && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success">
            {APP_STORAGE.reg_user.getSuccessSave_mess()}
          </Alert>
        </Stack>
      )}
      {APP_STORAGE.reg_user.getErrorSave_mess().length > 0 && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">
            {APP_STORAGE.reg_user.getErrorSave_mess()}
          </Alert>
        </Stack>
      )}
      {validationMessage.length !== 0 && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">{validationMessage}</Alert>
        </Stack>
      )}
    </React.Fragment>
  );
});
