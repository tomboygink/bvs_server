import React, { useState, useEffect, FC, ChangeEvent } from "react";
import { observer } from "mobx-react";
import {
  Typography,
  Box,
  Divider,
  Paper,
  InputBase,
  IconButton,
} from "@mui/material";
import { TreeView, TreeItem } from "@mui/x-tree-view";
import SearchIcon from "@mui/icons-material/Search";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
import GpsNotFixedIcon from "@mui/icons-material/GpsNotFixed";
import FolderIcon from "@mui/icons-material/Folder";
import { set, toJS } from "mobx";
import { APP_STORAGE } from "../../../storage/AppStorage";
import { handleChange } from "../Devs/StyledMua";
import { IDefaultWell } from "../../../models/IWell";
import { TreeElement } from "../../shared/TreeElement";
import { IGroup } from "../../../models/IDevice";
import { arrayExtensions } from "mobx/dist/internal";

export const WellsMenu: FC = observer(() => {
  const wells = APP_STORAGE.wells.getDefaultWells();
  const groups = toJS(APP_STORAGE.devs_groups.getDevsGroups());
  const [filteredWells, setFilteredWells] = useState<IDefaultWell[]>(wells);
  const [filteredGroup, setFilteredGroup] = useState<IGroup[]>(groups);
  const [searchValue, setSearchValue] = useState<string>("");
  const handleSelect = (e: any, node: any) => {
    APP_STORAGE.reg_user.setNodeIdWell(node.slice(5));
  };
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
  };
  const getFiltredWells = (array: IGroup[], searchValue: string) => {
    return array.filter((location) => {
      if (location.devs.some((dev) => dev.well.includes(searchValue))) {
        return true;
      } else if (location.childs.length > 0) {
        location.childs = getFiltredWells(location.childs, searchValue);
        return location.childs.length > 0;
      }
      return false;
    });
  };

  useEffect(() => setFilteredWells(wells), [wells]);
  useEffect(() => setFilteredGroup(groups), []);
  useEffect(() => {
    setFilteredGroup(getFiltredWells(groups, searchValue));
  }, [searchValue]);

  return (
    <React.Fragment>
      <Typography sx={{ fontWeight: "600", color: "#111111", mb: "8px" }}>
        Скважины
      </Typography>
      <Box
        sx={{
          background: "#fff",
          p: "20px",
          borderRadius: "4px",
        }}
      >
        <Paper
          component="form"
          sx={{
            mb: "22px",
            display: "flex",
            alignItems: "center",
            boxShadow: "none",
            background: "#E3EDFF",
            borderRadius: "100px",
          }}
        >
          <InputBase
            id="search"
            sx={{ ml: 1, flex: 1, fontSize: "14px", pl: "14px" }}
            placeholder="Поиск по номеру"
            inputProps={{ "aria-label": "search google maps" }}
            onChange={handleSearch}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        <TreeView onNodeSelect={handleSelect}>
          {filteredGroup?.map((group) => {
            return <TreeElement key={group.id} location={group} />;
          })}
        </TreeView>
        {/* <TreeView
          className="wrapper_treeviw"
          onNodeSelect={handleSelect}
          aria-label="customized"
          sx={{ flexGrow: 1, maxWidth: 400, overflow: "auto", color: "black" }}
        >
          {filteredWells?.map((item) => {
            return (
              <TreeItem
                key={item.id}
                nodeId={item.number}
                label={item.number}
                icon={<GpsNotFixedIcon sx={{ color: "#266BF1" }} />}
                sx={{
                  color: "#222",
                  fontSize: "14px",
                }}
              ></TreeItem>
            );
          })}
        </TreeView> */}
      </Box>
    </React.Fragment>
  );
});
