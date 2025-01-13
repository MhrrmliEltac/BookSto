import { Button } from "react-bootstrap";
import { IconType } from "react-icons/lib";
interface BtnProps {
  text: string;
  Icon?: IconType;
  onClick?: () => void;
}

const BasicButton: React.FC<BtnProps> = ({ text, Icon, onClick }) => {
  return (
    <Button
      onClick={onClick}
      style={{
        backgroundColor: "#0DD6B8",
        border: "none",
        fontWeight: "600",
        display: "flex",
        gap: "15px",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="py-3 px-4 flex items-center text-lg w-44 font-bold"
    >
      <p className="mb-0">{text}</p>
      {Icon && <Icon size={25} />}
    </Button>
  );
};

export default BasicButton;
