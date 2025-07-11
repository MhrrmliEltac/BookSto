import { Button, CircularProgress, styled } from "@mui/material";
import { CustomButtonProps } from "../types/CustomButtonProps";

const CustomButtonComp = styled(Button)(({ theme }) => ({
  backgroundColor: "#000",
  fontSize: "0.9rem",
  textTransform: "none",
  color: "#fff",
  fontFamily: "Inter",
  "&:hover": {
    backgroundColor: "#222",
  },
  "&.Mui-disabled": {
    backgroundColor: "#9e9e9e",
    color: "#fff",
  },
}));

const CustomButton = ({
  title,
  icon,
  onClick,
  loading,
  ...other
}: CustomButtonProps) => {
  return (
    <CustomButtonComp startIcon={icon} onClick={onClick} {...other}>
      {loading ? (
        <CircularProgress size={20} sx={{ color: "white", mr: 1 }} />
      ) : (
        ""
      )}
      {title}
    </CustomButtonComp>
  );
};

export default CustomButton;
