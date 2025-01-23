import BasicButton from "./Button";

type HeadingProps = {
  text: string;
  button?: boolean;
  select?: boolean;
  onClick?: () => void;
  className?: string;
  color?: boolean;
  border?: boolean;
  padding?: boolean;
  small?: boolean;
};

const Heading: React.FC<HeadingProps> = ({
  text,
  button,
  select,
  onClick,
  color,
  border,
  padding,
  small,
}) => {
  return (
    <div
      className={`flex justify-between ${
        border ? "border-b border-b-slate-500" : "border-none"
      } ${padding ? "pb-4" : ""} items-center`}
    >
      <h4
        className={`font-sans text-slate-700 ${color && "text-white"} ${
          small && "text-[20px]"
        }`}
      >
        {text}
      </h4>
      {button ? (
        <BasicButton onClick={onClick} text="View More" />
      ) : select ? (
        <select className="border-none outline-none flex">
          <option defaultValue="This Week">This Week</option>
          <option value="2">1</option>
          <option value="3">2</option>
        </select>
      ) : null}
    </div>
  );
};

export default Heading;
