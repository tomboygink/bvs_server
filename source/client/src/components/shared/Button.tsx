import React, { FC, FormEvent } from "react";
import { Button as ButtonMui } from "@mui/material";

interface IProps {}

export const Button: FC<IProps> = () => {
  return (
    <ButtonMui
      type="submit"
      sx={{
        background: "#266BF1",
        color: "#fff;",
        mt: "18px",
        mb: "18px",
        fontSize: "12px",
      }}
    >
      Сохранить
    </ButtonMui>
  );
};
