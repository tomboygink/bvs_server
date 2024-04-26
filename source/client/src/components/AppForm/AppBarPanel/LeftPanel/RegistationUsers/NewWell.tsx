import React, { FC, useEffect, useState, useMemo } from "react";
import { observer } from "mobx-react";
import { set, toJS } from "mobx";
import { Box, Button, Alert, Stack } from "@mui/material";
import { IWSQuery, WSQuery, api } from "../../../../../api/api";
import { APP_STORAGE } from "../../../../../storage/AppStorage";
import { getGroups, filteredDevs } from "../../../../../../utils/functions";
import { useFormValidation } from "../../../../../hooks/UseFormValidation";
import { TextInput } from "../../../../shared/TextInput";
import { SelectWithSearch } from "../../../../shared/SelectWithSearch";

interface IProps {}

export const NewWell: FC<IProps> = observer(() => {
  const {
    values,
    setValues,
    errors,
    handleChange,
    handleSelectChange,
    isInValidInput,
    isValid,
  } = useFormValidation();

  const [validationMessage, setValidationMessage] = useState("");
  const [currentDevs, setCurrentDevs] = useState([]);
  const [isDisabledDev, setIsDisabledDev] = useState(true);

  const locations = JSON.parse(
    JSON.stringify(APP_STORAGE.devs_groups.getDevsGroups())
  );
  const allDevs = toJS(APP_STORAGE.devs_groups.getAllDevs());

  // Получаем значения: форма валидна или нет
  const isValidForm = () => {
    return isValid && Boolean(values.addWell_location);
  };

  // Обработчик закрытия поля выбора расположения (разблокируем следующее поле для редактирования)
  const handleClose = (setFunc: (state: boolean) => void) => {
    setFunc(false);
  };

  function sayHello() {
    console.log("Hello");
  }

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
    // const validation = () => {
    //   let hasWell;
    //   if (APP_STORAGE.wells.getDefaultWells()) {
    //     hasWell = APP_STORAGE.wells
    //       .getDefaultWells()
    //       .find((item) => item.dev_id === values.addWell_dev);
    //   }

    //   hasWell
    //     ? setValidationMessage("Устройство уже используется в другой скважине")
    //     : isValidForm()
    //     ? APP_STORAGE.reg_user.set_NewThermalWell(
    //         "sess_id",
    //         APP_STORAGE.auth_form.getdt(),
    //         values
    //       )
    //     : setValidationMessage("Не заполнены обязательные поля");
    // };
    // APP_STORAGE.wells.fetchWells(validation);
  };

  useEffect(() => {
    //Очищаем значение полей Устройства, если выбрано другое расположение
    setValues({ ...values, addWell_dev: "" });
    filteredDevs(allDevs, values.addWell_location, setCurrentDevs);
  }, [values.addWell_location]);
  // useEffect(() => {
  //   APP_STORAGE.wells.fetchWells();
  // }, []);

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
      {/* <FormControl fullWidth size="small" sx={{ mt: "14px" }}>
        <InputLabel className="org" sx={{ fontSize: "12px" }}>
          Организация*
        </InputLabel>
        <Select
          name="addWell_org"
          sx={{ fontSize: "12px" }}
          value={values.addWell_org || ""}
          label="организация"
          onChange={hahdleChange}
          onClose={() => handleClose(setIsDisabledGroup)}
        >
          {orgs.map((item) => {
            return (
              <MenuItem key={item.id} sx={{ fontSize: "12px" }} value={item.id}>
                {item.full_name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl> */}

      <SelectWithSearch
        name="addWell_location"
        options={getGroups(locations)}
        label="Расположение*"
        //isDisabled={isDisabledGroup}
        value={values.addWell_location || ""}
        onChange={handleSelectChange}
        onClose={() => handleClose(setIsDisabledDev)}
      />
      <SelectWithSearch
        name="addWell_dev"
        options={currentDevs}
        label="Устройство"
        isDisabled={isDisabledDev}
        value={values.addWell_dev || ""}
        onChange={handleSelectChange}
        onClose={() => {}}
      />

      {/* <FormControl
        disabled={isDisabledDev}
        fullWidth
        size="small"
        sx={{ mt: "14px" }}
      >
        <InputLabel className="org" sx={{ fontSize: "12px" }}>
          Устройство
        </InputLabel>
        <Select
          name="addWell_dev"
          sx={{ fontSize: "12px" }}
          value={values.addWell_dev || ""}
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
      </FormControl> */}
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
