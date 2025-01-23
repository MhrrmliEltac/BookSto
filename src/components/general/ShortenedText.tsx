import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

interface Text {
  text: string;
  length?: number;
}

const ShortenedText: React.FC<Text> = ({ text, length }) => {
  const MAX_LENGTH = length || 14;
  const isLong = text.length > MAX_LENGTH;
  const shortenedText = isLong ? text.slice(0, MAX_LENGTH) + "..." : text;

  return (
    <div>
      <span
        data-tooltip-id="tooltip"
        data-tooltip-content={text}
        data-tooltip-place="right-start"
      >
        {shortenedText}
      </span>
      {isLong && (
        <Tooltip
          id="tooltip"
          style={{
            background: "#c9c9c9",
            fontSize: "10px",
            width: "300px",
          }}
        />
      )}
    </div>
  );
};

export default ShortenedText;
