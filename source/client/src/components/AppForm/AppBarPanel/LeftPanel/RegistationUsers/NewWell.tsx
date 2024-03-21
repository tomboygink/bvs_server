import React, { FC, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import {
  Box,
  Link,
  TextField,
  Button,
  FormHelperText,
  TextareaAutosize,
  Typography,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Org } from "../../../../../storage/components/Orgs/OrgStorage";
import { APP_STORAGE } from "../../../../../storage/AppStorage";
import { TextInput } from "../../../../shared/TextInput";
import { IGroup } from "../../../../../models/IDevice";

interface IProps {}
export const NewWell: FC<IProps> = observer(() => {
  const orgs: Org[] = JSON.parse(
    JSON.stringify(APP_STORAGE.reg_user.getOrgAll())
  );
  const locations = JSON.parse(
    JSON.stringify(APP_STORAGE.devs_groups.getDevsGroups())
  );
  const [group, setGroup] = useState([]);

  const handleAddWell = () => {
    APP_STORAGE.reg_user.set_NewThermalWell(
      "sess_id",
      APP_STORAGE.auth_form.getdt()
    );
  };

  const getGroups = (locations: IGroup[]) => {
    // const arr = locations.reduce((acc, { group: { g_name } }) => {
    //   return [...acc, g_name];
    // }, []);
    let allLocations: any[] = [];
    const recursion = (arr: any[]) => {
      for (let elem of arr) {
        allLocations.push({ id: elem.group.id, name: elem.group.g_name });
        if (elem.childs.length !== 0) {
          recursion(elem.childs);
        }
      }
    };
    recursion(locations);

    setGroup(allLocations);
  };

  useEffect(() => {
    getGroups(locations);
  }, []);

  return (
    <React.Fragment>
      <TextInput
        // error={APP_STORAGE.reg_user.getErrorJobs()}
        // helperText={APP_STORAGE.reg_user.getTextHelpJobs()}
        label="Номер скважины"
        onChange={(e) => {
          APP_STORAGE.reg_user.setNumberWell(e.target.value);
        }}
        value={APP_STORAGE.reg_user.getNumberWell() || ""}
      />

      <FormControl
        fullWidth
        size="small"
        sx={{ mt: "14px" }}
        // error={APP_STORAGE.reg_user.getErrorOrg()}
      >
        <InputLabel className="org" sx={{ fontSize: "12px" }}>
          Организация*
        </InputLabel>
        <Select
          sx={{ fontSize: "12px" }}
          value={APP_STORAGE.reg_user.getOrgId() || ""}
          label="организация"
          onChange={(e) => {
            APP_STORAGE.reg_user.setOrgId(e.target.value);
          }}
        >
          {orgs.map((item) => {
            return (
              <MenuItem key={item.id} sx={{ fontSize: "12px" }} value={item.id}>
                {item.full_name}
              </MenuItem>
            );
          })}
          <Divider />

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              m: 1,
              borderRadius: "4px",
            }}
          >
            <MenuItem
            //   onClick={() => this.OpenModalRegUser(2, "Добавить организацию")}
            >
              <AddIcon sx={{ fontSize: "17px", mt: 1, color: "#266BF1" }} />
              <Typography sx={{ fontSize: "12px", mt: 1 }}>
                Добавить организацию
              </Typography>
            </MenuItem>
          </Box>
        </Select>
        <FormHelperText>
          {/* {APP_STORAGE.reg_user.getTextHelpOrg()} */}
        </FormHelperText>
      </FormControl>
      <FormControl
        fullWidth
        size="small"
        sx={{ mt: "14px" }}
        // error={APP_STORAGE.reg_user.getErrorOrg()}
      >
        <InputLabel className="org" sx={{ fontSize: "12px" }}>
          Расположение*
        </InputLabel>
        <Select
          sx={{ fontSize: "12px" }}
          value={APP_STORAGE.reg_user.getGroupId() || ""}
          label="расположение"
          onChange={(e) => APP_STORAGE.reg_user.setGroupId(e.target.value)}
        >
          {group.map((item) => {
            return (
              <MenuItem key={item.id} sx={{ fontSize: "12px" }} value={item.id}>
                {item.name}
              </MenuItem>
            );
          })}
          <Divider />

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              m: 1,
              borderRadius: "4px",
            }}
          >
            <MenuItem
            //   onClick={() => this.OpenModalRegUser(2, "Добавить организацию")}
            >
              <AddIcon sx={{ fontSize: "17px", mt: 1, color: "#266BF1" }} />
              <Typography sx={{ fontSize: "12px", mt: 1 }}>
                Добавить организацию
              </Typography>
            </MenuItem>
          </Box>
        </Select>
        <FormHelperText>
          {/* {APP_STORAGE.reg_user.getTextHelpOrg()} */}
        </FormHelperText>
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
    </React.Fragment>
  );
});
