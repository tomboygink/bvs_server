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
import GpsNotFixedIcon from "@mui/icons-material/GpsNotFixed";
import { set, toJS } from "mobx";
import { APP_STORAGE } from "../../../storage/AppStorage";
import { IDefaultWell } from "../../../models/IWell";

export const WellsMenu: FC = observer(() => {
  const wells = APP_STORAGE.wells.getDefaultWells();
  const [filteredWells, setFilteredWells] = useState<IDefaultWell[]>(wells);
  const [searchValue, setSearchValue] = useState<string>("");
  const handleSelect = (e: any, node: any) => {
    APP_STORAGE.reg_user.setNodeIdWell(node);
  };
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  const getFiltredWells = () => {
    const filteredWells = wells.filter((well) =>
      well.number.includes(searchValue)
    );
    setFilteredWells(filteredWells);
  };
  useEffect(() => setFilteredWells(wells), [wells]);
  useEffect(() => {
    getFiltredWells();
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
        <TreeView
          className="wrapper_treeviw"
          onNodeSelect={handleSelect}
          aria-label="customized"
          sx={{ flexGrow: 1, maxWidth: 400, overflow: "auto" }}
        >
          {/* {APP_STORAGE.wells.getWells().map((well) => {
            return (
              <TreeItem
                key={well.number}
                nodeId={well.number}
                label={well.number}
                icon={<GpsNotFixedIcon sx={{ color: "#266BF1" }} />}
                sx={{
                  color: "#222",
                  fontSize: "14px",
                }} 
              ></TreeItem>
            );
          })} */}
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
        </TreeView>
      </Box>
    </React.Fragment>
  );
});
