import React, { FC, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import { APP_STORAGE } from "../../../storage/AppStorage";
import {
  Dialog,
  Box,
  Button,
  Alert,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import { filteredDevs, getGroups } from "../../../../utils/functions";
import { useFormValidation } from "../../../hooks/UseFormValidation";
import { CloseButton } from "../../shared/CloseButton";
import { TextInput } from "../../shared/TextInput";
import { SelectWithSearch } from "../../shared/SelectWithSearch";
import { IDevice } from "../../../models/IDevice";

export const EditWellModal: FC = observer(() => {
  const [validationMessage, setValidationMessage] = useState("");
  const [currentDevs, setCurrentDevs] = useState([]);

  const {
    values,
    setValues,
    errors,
    handleChange,
    handleSelectChange,
    isInValidInput,
    resetForm,
  } = useFormValidation();

  const locations = JSON.parse(
    JSON.stringify(APP_STORAGE.devs_groups.getDevsGroups())
  );
  const allDevs = APP_STORAGE.devs_groups.getAllDevs();

  // Отправка формы
  const handleEditWell = () => {
    let devSelectedWell: IDevice;
    setValidationMessage("");
    const selectedWell = APP_STORAGE.wells.getSelectedWell();
    const {
      editWell_number: number,
      editWell_location: location,
      editWell_dev: dev,
    } = values;

    const {
      number: storeNumber,
      location: storeLocation,
      dev: storeDev,
    } = APP_STORAGE.wells.getSelectedWell();
    const formData = {
      id: APP_STORAGE.wells.getSelectedWell().id,
      editWell_number: number ?? storeNumber,
      editWell_location: location ?? storeLocation.id,
      editWell_org: "",
      editWell_dev: dev ?? storeDev.id,
    };
    const orgId = APP_STORAGE.devs_groups
      .getLocations()
      .find((loc) => loc.id === formData.editWell_location)?.org_id;
    formData.editWell_org = orgId;

    const orgSelectedWell = APP_STORAGE.reg_user
      .getOrgAll()
      .find((org) => org.id === formData.editWell_org);

    const locationSelectedWell = APP_STORAGE.devs_groups
      .getLocations()
      .find((loc) => loc.id === formData.editWell_location);

    if (selectedWell.dev.id) {
      devSelectedWell = APP_STORAGE.devs_groups
        .getAllDevs()
        .find((dev) => dev.id === formData.editWell_dev);
    }
    const newSelectedWell = {
      id: selectedWell.id,
      number: formData.editWell_number,
      location: {
        id: locationSelectedWell.id,
        name: locationSelectedWell.name,
      },
      org: {
        id: orgSelectedWell.id,
        name: orgSelectedWell.full_name,
      },
      dev: {
        id: devSelectedWell?.id || "",
        number: devSelectedWell?.number || "",
      },
    };

    if (formData.editWell_number === "" || formData.editWell_location === "") {
      setValidationMessage("Не заполнены обязательные поля");
    } else {
      APP_STORAGE.wells.changeThermalWell(
        "sess_id",
        APP_STORAGE.auth_form.getdt(),
        newSelectedWell,
        formData
      );
    }
  };
  // Очистка формы при закрытии
  useEffect(() => {
    setValidationMessage("");
    resetForm();
  }, [APP_STORAGE.wells.getOpenModal()]);

  //Получаем Options для списка с устройствами в зависимости от выбранного расположения
  useEffect(() => {
    setValues({ ...values, editWell_dev: "" });
    filteredDevs(allDevs, values.editWell_location, setCurrentDevs);
  }, [values.editWell_location]);

  // Значение выбранной скважины при открытии модалки, пул устройств для выбранного расположения
  useEffect(() => {
    // APP_STORAGE.wells.fetchWells();
    const selectedWell = APP_STORAGE.wells.getSelectedWell();
    setValues({
      editWell_number: selectedWell.number,
      editWell_location: selectedWell.location.id,
      editWell_dev: selectedWell.dev.id,
    });
    filteredDevs(
      allDevs,
      APP_STORAGE.wells.getSelectedWell()?.location.id,
      setCurrentDevs
    );
  }, [APP_STORAGE.wells.getSelectedWell(), APP_STORAGE.wells.getOpenModal()]);

  return (
    <Dialog
      componentsProps={{
        backdrop: { style: { backgroundColor: "rgba(0 0 0 / 35%)" } },
      }}
      PaperProps={{
        component: "form",
      }}
      open={APP_STORAGE.wells.getOpenModal()}
      fullWidth
    >
      <Box sx={{ p: 2 }}>
        <Box
          className="ModalTitle"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>Изменить данные скважины</Typography>
          <CloseButton
            onClose={() => {
              APP_STORAGE.wells.setOpenModal(false);
            }}
          />
        </Box>
        <Divider sx={{ marginBottom: "20px" }} />

        <TextInput
          InputProps={{
            name: "editWell_number",
            style: { fontSize: 12 },
          }}
          error={
            "editWell_number" in isInValidInput &&
            Boolean(isInValidInput.editWell_number)
          }
          helperText={
            "editWell_number" in errors ? String(errors.editWell_number) : ""
          }
          label="Номер скважины"
          onChange={handleChange}
          value={values.editWell_number || ""}
        />
        <SelectWithSearch
          name="editWell_location"
          options={getGroups(locations)}
          label="Расположение*"
          value={values.editWell_location || ""}
          onChange={handleSelectChange}
          onClose={() => {}}
        />
        <SelectWithSearch
          name="editWell_dev"
          options={currentDevs}
          label="Устройство"
          value={values.editWell_dev || ""}
          onChange={handleSelectChange}
          onClose={() => {}}
          isDev
        />

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
            onClick={handleEditWell}
          >
            Сохранить
          </Button>
        </Box>
        {APP_STORAGE.wells.getSuccessSave_mess().length > 0 && (
          <Alert severity="success">
            {APP_STORAGE.wells.getSuccessSave_mess()}
          </Alert>
        )}
        {APP_STORAGE.wells.getErrorSave_mess().length > 0 && (
          <Alert severity="error">
            {APP_STORAGE.wells.getErrorSave_mess()}
          </Alert>
        )}
        {validationMessage.length !== 0 && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="error">{validationMessage}</Alert>
          </Stack>
        )}
      </Box>
    </Dialog>
  );
});
