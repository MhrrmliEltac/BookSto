import { Button } from "react-bootstrap";
import { IconType } from "react-icons/lib";
interface BtnProps {
  text: string;
  Icon?: IconType;
  onClick?: () => void;
  small?: boolean;
  green?: boolean;
  white?: boolean;
  check?: boolean;
  search?: boolean;
}

const BasicButton: React.FC<BtnProps> = ({
  text,
  Icon,
  onClick,
  small,
  green,
  white,
  check,
  search,
}) => {
  return (
    <Button
      onClick={onClick}
      style={{
        backgroundColor: "#0DD6B8",
        fontWeight: "600",
        border: "none",
        display: "flex",
        gap: "15px",
        alignItems: "center",
        justifyContent: "center",
      }}
      className={`md:py-3 md:px-4 py-2 px-2 flex items-center md:w-44 w-32 font-bold ${
        small && "md:w-32"
      } ${green && "bg-[#0DD6B8]"} ${white && "border-gradient"} ${
        check && "w-full"
      }
      ${search && "width-20"}`}
    >
      <p className={`mb-0 md:text-lg text-[10px] ${search && "text-10"}`}>
        {text}
      </p>
      {Icon && <Icon size={25} />}
    </Button>
  );
};

export default BasicButton;
