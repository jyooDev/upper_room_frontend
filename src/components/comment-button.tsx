import { LuMessageCircle } from "react-icons/lu";
interface CommentButtonProps {
  commentCounts: number;
  open?: () => void;
}

const CommentButton = ({ commentCounts, open }: CommentButtonProps) => {
  return (
    <button
      className="flex items-center space-x-1 transition text-gray-500"
      onClick={open}
      disabled={!open}
    >
      <LuMessageCircle
        className={`w-3 h-3 text-gray-500 ${open ? "hover:text-gray-600" : ""}`}
      />{" "}
      <span>{commentCounts}</span>
    </button>
  );
};

export default CommentButton;
