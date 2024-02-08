import React, { FC, ChangeEvent, ReactNode } from "react";
import { TextField } from "@mui/material";

interface Props {
  name?: string;
  required?: boolean;
  label: string;
  InputProps?: object;
  InputLabelProps?: object;
  error: boolean;
  helperText: string;
  onChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  value: string;
}
export const TextInput: FC<Props> = ({
  name,
  required = true,
  label,
  InputProps = { style: { fontSize: 12 } },
  InputLabelProps = { style: { fontSize: 12 } },
  error,
  helperText,
  onChange,
  value,
}) => {
  return (
    <TextField
      required={required}
      sx={{ mt: "14px" }}
      variant="outlined"
      label={label}
      size="small"
      fullWidth
      InputLabelProps={InputLabelProps}
      InputProps={InputProps}
      error={error}
      helperText={helperText}
      onChange={onChange}
      value={value}
    />
  );
};
