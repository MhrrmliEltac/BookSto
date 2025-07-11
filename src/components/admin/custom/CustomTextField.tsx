import { styled, TextField } from "@mui/material";
import React from "react";

const MuiTextField = styled(TextField)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: "transparent",
  borderRadius: theme.shape.borderRadius,
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#000",
      border: "3px solid",
    },
  },
  "& label.Mui-focused": {
    color: "#000",
  },
}));

const CustomTextField = ({
  type = "text",
  fullwidth = false,
  name,
  label,
  value,
  onChange,
  ...others
}: {
  type?: string;
  fullwidth?: boolean;
  name: string;
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: any;
}) => {
  return (
    <MuiTextField
      fullWidth={fullwidth}
      type={type}
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      {...others}
    />
  );
};

export default CustomTextField;
