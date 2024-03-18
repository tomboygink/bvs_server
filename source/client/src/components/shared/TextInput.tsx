import React, { FC, ChangeEvent, ReactNode } from "react";
import { TextField } from "@mui/material";

interface Props {
  id?: string;
  name?: string;
  required?: boolean;
  label?: string;
  InputProps?: object;
  InputLabelProps?: object;
  error?: boolean;
  helperText?: string;
  onChange?: (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  value?: string;
  variant?: "outlined" | "filled" | "standard";
  fullWidth?: boolean;
  disabled?: boolean;
}
export const TextInput: FC<Props> = ({
  id,
  name,
  required = true,
  label,
  InputProps = { style: { fontSize: 12 } },
  InputLabelProps = { style: { fontSize: 12 } },
  error,
  helperText,
  onChange,
  value,
  variant = "outlined",
  fullWidth = true,
  disabled = false,
}) => {
  return (
    <TextField
      id={id}
      required={required}
      sx={{ mt: "14px" }}
      variant={variant}
      label={label}
      size="small"
      fullWidth={fullWidth}
      InputLabelProps={InputLabelProps}
      InputProps={InputProps}
      error={error}
      helperText={helperText}
      onChange={onChange}
      value={value}
      disabled={disabled}
    />
  );
};
