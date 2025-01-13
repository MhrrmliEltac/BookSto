import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

interface Text {
  text: string;
}

const ShortenedText: React.FC<Text> = ({ text }) => {
  const MAX_LENGTH = 14; // Maksimum uzunluq
  const isLong = text.length > MAX_LENGTH;
  const shortenedText = isLong ? text.slice(0, MAX_LENGTH) + "..." : text;

  return (
    <>
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
          style={{ background: "#c9c9c9", fontSize: "10px", right: "0" }}
        />
      )}
    </>
  );
};

export default ShortenedText;
