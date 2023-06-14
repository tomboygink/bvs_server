import React from "react";

export const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
export const [idEl, setIdEl] = React.useState('');




export const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>{
  setIdEl(event.currentTarget.id)
  setAnchorEl(event.currentTarget)
  document.getElementById(event.currentTarget.id).style.background  = "#1659DB";
}

export const handleClose =() => {
  setAnchorEl(null)
  document.getElementById(idEl).style.background  = "#266BF1";
}