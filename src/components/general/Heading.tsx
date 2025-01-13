import BasicButton from "./Button";

type HeadingProps = {
  text: string;
  button?: boolean;
  select?: boolean;
};

const Heading: React.FC<HeadingProps> = ({ text, button, select }) => {
  return (
    <div className="flex justify-between border-b border-b-slate-500 pb-4 items-center">
      <h4 className="font-sans text-slate-700">{text}</h4>
      {button ? (
        <BasicButton text="View More" />
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
