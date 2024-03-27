import React from "react";
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
import { set } from "mobx";
import { APP_STORAGE } from "../../../storage/AppStorage";
const wells = [
  {
    id: "11",
    number: "4556",
    location: "1",
    org: "1",
    dev: "45",
  },
  {
    id: "12",
    number: "4596879",
  },
  {
    id: "13",
    number: "7845",
  },
  {
    id: "14",
    number: "1658",
  },
  {
    id: "15",
    number: "754546",
  },
];

export const WellsMenu = () => {
  const handleSelect = (e: any, node: any) => {
    APP_STORAGE.reg_user.setNodeIdWell(node);
  };

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
            onChange={(e) => {
              console.log(e.target.value);
            }}
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
          {wells.map((well) => {
            return (
              <TreeItem
                key={well.id}
                nodeId={well.id}
                label={well.number}
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
};
