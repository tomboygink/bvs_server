import React, { FC, useEffect, useState, useRef } from "react";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import { APP_STORAGE } from "../../../storage/AppStorage";
import {
  Dialog,
  Box,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import { getDevsOptions } from "../../../../utils/functions";
import { useFormValidation } from "../../../hooks/UseFormValidation";
import { Org } from "../../../storage/components/Orgs/OrgStorage";
import { CloseButton } from "../../shared/CloseButton";
import { TextInput } from "../../shared/TextInput";

export const EditWellModal: FC = observer(() => {
  const [validationMessage, setValidationMessage] = useState("");
  const [currentDevs, setCurrentDevs] = useState([]);
  const [currentOrg, setCurrentOrg] = useState([]);
  const {
    values,
    errors,
    handleChange,
    handleSelectChange,
    isInValidInput,
    resetForm,
  } = useFormValidation();
  const orgs = APP_STORAGE.reg_user.getOrgAll();
  const allDevs = APP_STORAGE.devs_groups.getAllDevs();

  // Отправка формы
  const handleEditWell = () => {
    setValidationMessage("");
    const {
      editWell_number: number,
      editWell_location: location,
      editWell_org: org,
      editWell_dev: dev,
    } = values;
    const {
      number: storeNumber,
      location: storeLocation,
      org: storeOrg,
      dev: storeDev,
    } = APP_STORAGE.wells.getSelectedWell();
    const formData = {
      id: APP_STORAGE.wells.getSelectedWell().id,
      editWell_number: number ?? storeNumber,
      editWell_location: location ?? storeLocation.id,
      editWell_org: org ?? storeOrg.id,
      editWell_dev: location ? dev ?? "" : storeDev.id,
    };
    if (formData.editWell_number === "") {
      setValidationMessage("Необходимо указать номер скважины");
    } else {
      APP_STORAGE.wells.changeThermalWell(
        "sess_id",
        APP_STORAGE.auth_form.getdt(),
        formData
      );
    }
  };

  // Очистка формы при закрытии
  useEffect(() => {
    resetForm();
  }, [APP_STORAGE.wells.getOpenModal()]);

  //Получаем Options для списка с устройствами в зависимости от выбранного расположения
  useEffect(() => {
    getDevsOptions(allDevs, values.editWell_location, setCurrentDevs);
  }, [values.editWell_location]);

  // Получаем Options для списка с устройствами в зависимости от выбранной скважины (по умолчанию)
  useEffect(() => {
    getDevsOptions(
      allDevs,
      APP_STORAGE.wells.getSelectedWell()?.location.id,
      setCurrentDevs
    );
  }, [APP_STORAGE.wells.getSelectedWell()]);

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
          defaultValue={APP_STORAGE.wells.getSelectedWell()?.number}
        />
        <FormControl fullWidth size="small" sx={{ mt: "14px" }}>
          <InputLabel className="org" sx={{ fontSize: "12px" }}>
            Расположение
          </InputLabel>

          <Select
            name="editWell_location"
            sx={{ fontSize: "12px" }}
            defaultValue={APP_STORAGE.wells.getSelectedWell()?.location.id}
            label="Расположение"
            onChange={handleSelectChange}
          >
            {APP_STORAGE.devs_groups
              .getLocations()
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
            Организация
          </InputLabel>

          <Select
            name="editWell_org"
            sx={{ fontSize: "12px" }}
            defaultValue={APP_STORAGE.wells.getSelectedWell()?.org.id}
            label="организация"
            onChange={handleSelectChange}
          >
            {orgs.map((org) => (
              <MenuItem key={org.id} value={org.id}>
                {org.full_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth size="small" sx={{ mt: "14px" }}>
          <InputLabel className="org" sx={{ fontSize: "12px" }}>
            Устройство
          </InputLabel>
          <Select
            name="editWell_dev"
            sx={{ fontSize: "12px" }}
            defaultValue={APP_STORAGE.wells.getSelectedWell()?.dev.id || ""}
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

        <Divider sx={{ padding: "12px" }} />
        <Typography sx={{ color: "#999999" }} variant="caption"></Typography>

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
