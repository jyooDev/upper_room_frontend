import { GrView } from "react-icons/gr";

interface ViewButtonProps {
  viewCounts: number;
  open?: () => void;
}

const ViewButton = ({ viewCounts, open }: ViewButtonProps) => {
  return (
    <button
      className="flex items-center space-x-1 transition text-gray-500"
      onClick={open}
      disabled={!open}
    >
      <GrView
        className={`w-3 h-3 text-gray-500 ${open ? "hover:text-gray-600" : ""}`}
      />
      <span>{viewCounts}</span>
    </button>
  );
};

export default ViewButton;
