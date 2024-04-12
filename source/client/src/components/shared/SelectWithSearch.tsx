import React, { useState, useMemo, FC } from "react";
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  ListSubheader,
  TextField,
  InputAdornment,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { containsText } from "../../../utils/functions";
import { StringDecoder } from "string_decoder";

type Option = {
  [key: string]: string;
};
interface Props {
  name: string;
  options: Option[];
  label: string;
  isDisabled?: boolean;
  onChange?: (e: SelectChangeEvent) => void;
  value?: string;
  defaultValue?: string;
  onClose?: () => void;
  isDev?: boolean;
}

export const SelectWithSearch: FC<Props> = ({
  name,
  options,
  label,
  isDisabled,
  onChange,
  value,
  defaultValue,
  onClose,
  isDev,
}) => {
  const [searchText, setSearchText] = useState("");
  const displayedOptions = options.filter((option) =>
    containsText(option.name, searchText)
  );
  const handleClose = () => {
    setSearchText("");
    onClose();
  };

  // const displayedOptions = useMemo(
  //   () => allOptions.filter((option) => containsText(option.name, searchText)),
  //   [searchText]
  // );

  return (
    <FormControl
      disabled={isDisabled}
      fullWidth
      size="small"
      sx={{ mt: "14px" }}
    >
      <InputLabel sx={{ fontSize: "12px" }}>{label}</InputLabel>
      <Select
        // Disables auto focus on MenuItems and allows TextField to be in focus
        name={name}
        MenuProps={{ autoFocus: false }}
        sx={{ fontSize: "12px" }}
        value={value}
        defaultValue={defaultValue}
        label={label}
        onChange={onChange}
        onClose={handleClose}

        // This prevents rendering empty string in Select's value
        // if search text would exclude currently selected option.
        //renderValue={() => value}
      >
        {/* TextField is put into ListSubheader so that it doesn't
              act as a selectable item in the menu
              i.e. we can click the TextField without triggering any selection.*/}
        <ListSubheader>
          <TextField
            size="small"
            // Autofocus on textfield
            autoFocus
            placeholder="Начните вводить название..."
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key !== "Escape") {
                // Prevents autoselecting item while typing (default Select behaviour)
                e.stopPropagation();
              }
            }}
          />
        </ListSubheader>
        {isDev && (
          <MenuItem value="">
            <em>Ничего не выбирать</em>
          </MenuItem>
        )}

        {displayedOptions.map((option, i) => (
          <MenuItem
            key={option.id}
            value={option.id}
            sx={{
              fontSize: "12px",
              fontWeight: `${option.parent_id === "0" ? "600" : "400"}`,
              pl: `${option.parent_id === "0" ? "16px" : "32px"}`,
            }}
          >
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
