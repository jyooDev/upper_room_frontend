import { FaPlay } from "react-icons/fa";
import { CiGlobe, CiPen } from "react-icons/ci";
import { FiBook } from "react-icons/fi";
import { type Sermon } from "@/types";

const SermonRow: React.FC<{ sermon: Sermon }> = ({ sermon }) => {
  return (
    <div className="flex flex-row w-full h-32 gap-3">
      <div className="flex flex-row justify-between items-center w-1/2 h-full bg-gray-100 rounded p-3 overflow-x-hidden">
        <div className="flex flex-col w-4/5 h-full justify-start gap-2">
          <div className="flex justify-start items-center gap-1 text-xs">
            <div>{sermon.createdAt.split("T")[0]}</div>
            <div className="bg-gray-600 px-2 py-1 rounded-xl text-white">
              PASTOR NAME
            </div>
            <div className="bg-primary-50 px-2 py-1 rounded-xl text-white">
              {sermon.originalLanguage.toLocaleUpperCase()}
            </div>
          </div>
          <div className="font-semibold text-gray-800">{sermon.title}</div>
          <div className="text-gray-500 text-xs whitespace-normal break-words">
            {/* IMPLEMENT SERMON DESCRIPTION*/} description
          </div>
        </div>
        <div className="flex w-1/5 h-full justify-center items-center">
          <FaPlay className="w-12 h-12 text-gray-600" />
        </div>
      </div>
      <div className="flex w-1/2 flex-row gap-2">
        <div className="relative flex w-1/3 bg-gray-100 rounded p-2 justify-end flex-col gap-6 items-center">
          <FiBook className="w-12 h-12 text-gray-600" />
          <span className="text-xs">Original Script</span>
        </div>
        <div className="relative flex w-1/3 bg-gray-100 rounded p-2 justify-end flex-col gap-6 items-center">
          <CiGlobe className="w-12 h-12 text-gray-600" />
          <span className="text-xs">Translation</span>
        </div>
        <div className="relative flex w-1/3 bg-gray-100 rounded p-2 justify-end flex-col gap-6 items-center">
          <CiPen className="w-12 h-12 text-gray-600" />
          <span className="text-xs">Note</span>
        </div>
      </div>
    </div>
  );
};

export default SermonRow;
