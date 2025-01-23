import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { useAppSelector } from "../../hook/hooks";
import toast from "react-hot-toast";

interface BasicRatingProps {
  value?: number;
  onChange?: (event: React.SyntheticEvent<Element, Event>, value: number | null) => void;
}

export default function BasicRating({ value, onChange }: BasicRatingProps) {
  const user = useAppSelector((state: any) => state.auth.user);

  const handleChooseRating = () => {
    if (user.length === 0) {
      toast.error("Please, sign in or sign up");
    } else {
      toast.success("Thanks for your review");
    }
  };

  return (
    <Box
      sx={{ "& > legend": { mt: 2 }, cursor: "pointer" }}
      onClick={handleChooseRating}
    >
      <Rating
        disabled={user.length === 0}
        name="simple-controlled"
        value={value}
        onChange={(event, value) => onChange && onChange(event, value)}
      />
    </Box>
  );
}
