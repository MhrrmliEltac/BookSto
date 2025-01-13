import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

export default function BasicRating() {
  const [value, setValue] = React.useState<number | null>(2);
  const handleChangeRating = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: number | null
  ) => {
    event.preventDefault();
    setValue(newValue);
  };

  return (
    <Box sx={{ "& > legend": { mt: 2 } }}>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={handleChangeRating}
      />
    </Box>
  );
}
