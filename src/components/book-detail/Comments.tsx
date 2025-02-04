import { FaUser } from "react-icons/fa";

type CommentProps = {
  comment: string;
};

const Comments: React.FC<CommentProps> = ({ comment }) => {
  return (
    <div className="mt-3 md:mt-5 flex gap-2 items-center shadow-sm py-2 px-2">
      <div className="flex items-center justify-center rounded-full p-2 bg-black text-white">
        <FaUser size={12} />
      </div>
      <p className="mb-0">{comment}</p>
    </div>
  );
};

export default Comments;
