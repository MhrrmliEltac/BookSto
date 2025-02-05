import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import TransitionsModal from "../mui/TransitionModal";

const ResponsiveSearch = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="flex">
      <IoSearchSharp
        size={20}
        onClick={handleOpen}
        className="cursor-pointer"
      />
      <TransitionsModal open={open} handleClose={handleClose} />
    </div>
  );
};

export default ResponsiveSearch;
