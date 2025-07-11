import type { ButtonProps } from "@mui/material";
import { ReactNode } from "react";

export type CustomButtonProps = Omit<ButtonProps, "title"> & {
  onClick?: () => void;
  title: string;
  icon?: ReactNode;
  loading?: boolean;
};
