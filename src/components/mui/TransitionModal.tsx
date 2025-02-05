import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import ModalSearch from "./ModalSearch";

const style = {
  position: "absolute",
  top: "0%",
  left: "0%",
  width: "100%",
  bgcolor: "background.paper",
  p: 4,
  outline: "none",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height:"50%"
};

type ModalProps = {
  open: boolean;
  handleClose: () => void;
};

export default function TransitionsModal(props: ModalProps) {
  const { open, handleClose } = props;

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <ModalSearch />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
