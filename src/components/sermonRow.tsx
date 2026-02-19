import { useState } from "react";
import { useForm } from "react-hook-form";

import { FaPlay } from "react-icons/fa";
import { CiGlobe, CiPen } from "react-icons/ci";
import { FiBook, FiGlobe } from "react-icons/fi";
import { type Sermon } from "@/types";

type TranscriptLink = { language: string; url: string };
import { AudioPlayer } from "@/components";

type NoteForm = {
  note: string;
};

const SermonRow: React.FC<{
  sermon: Sermon;
  onPlay: () => void;
  isActive: boolean;
}> = ({ sermon, onPlay, isActive }) => {
  const [currentTranscript, setCurrentTranscript] = useState<TranscriptLink | null>(null);

  const { register, handleSubmit } = useForm<NoteForm>();

  const handleSaveNote = (data: NoteForm) => {
    console.log("Saved Note:", data.note);
    // FIX -----
  };

  return !isActive ? (
    <div className="flex flex-row w-full h-32 gap-3">
      <div className="flex flex-row justify-between items-center w-1/2 h-full bg-gray-100 rounded p-3 overflow-x-hidden">
        <div className="flex flex-col w-4/5 h-full justify-start gap-2">
          <div className="flex justify-start items-center gap-1 text-xs">
            <div>{(sermon.createdAt ?? "").split("T")[0]}</div>
            <div className="bg-gray-600 px-2 py-1 rounded-xl text-white">
              PASTOR NAME
            </div>
            <div className="bg-primary-50 px-2 py-1 rounded-xl text-white">
              {sermon.originalLanguage.toLocaleUpperCase()}
            </div>
          </div>
          <div className="font-semibold text-gray-800">{sermon.title}</div>
          <div className="text-gray-500 text-xs whitespace-normal break-words">
            {sermon.description}
          </div>
        </div>
        <button
          className="flex w-1/5 h-full justify-center items-center"
          onClick={onPlay}
        >
          <FaPlay className="w-12 h-12 text-gray-600 hover:text-gray-700 transition ease-in-out" />
        </button>
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
  ) : (
    <div className="flex flex-col gap-3 w-full h-full">
      <div className="flex flex-row w-full h-32 gap-3">
        <div className="flex flex-row h-full justify-between items-center w-1/2 rounded p-3 overflow-x-hidden">
          <div className="flex flex-col w-4/5 h-full justify-start gap-2">
            <div className="flex justify-start items-center gap-1 text-xs">
              <div>{(sermon.createdAt ?? "").split("T")[0]}</div>
              <div className="bg-gray-600 px-2 py-1 rounded-xl text-white">
                PASTOR NAME
              </div>
              <div className="bg-primary-50 px-2 py-1 rounded-xl text-white">
                {sermon.originalLanguage.toLocaleUpperCase()}
              </div>
            </div>
            <div className="font-semibold text-gray-800">{sermon.title}</div>
            <div className="text-gray-500 text-xs whitespace-normal break-words">
              {sermon.description}
            </div>
          </div>
        </div>
        <div className="flex-1 h-full">
          {sermon.audioUrl ? <AudioPlayer audioUrl={sermon.audioUrl} /> : <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">No audio available</div>}
        </div>
      </div>
      <div className="flex flex-row w-full h-full max-h-[calc(100%-8rem)] gap-4 rounded justify-center items-center">
        <div className="w-1/2 h-full flex flex-col p-3 bg-gray-50 rounded overflow-hidden">
          <div className="flex items-center">
            {(sermon.transcripts ?? []).map((transcript) => (
              <button
                className={`py-1 px-2 flex items-center gap-1 ${
                  currentTranscript?.language === transcript.language && "bg-gray-700 text-white"
                }`}
                onClick={() => setCurrentTranscript(transcript)}
              >
                {transcript.language === sermon.originalLanguage ? (
                  <FiBook />
                ) : (
                  <FiGlobe />
                )}
                <p>{transcript.language.toLocaleUpperCase()}</p>
              </button>
            ))}
          </div>
          <span className="w-full border-t border-gray-300"></span>
          <div className="mt-2 flex-1 h-full overflow-y-auto text-sm text-gray-800 whitespace-pre-line pr-2">
            {currentTranscript ? currentTranscript.url : null}
          </div>
        </div>
        <form
          onSubmit={handleSubmit(handleSaveNote)}
          className="w-1/2 h-full p-3 bg-gray-50 rounded gap-3 overflow-auto flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <CiPen className="w-6 h-6" />
            <button
              type="submit"
              className="bg-gray-700 text-white hover:bg-gray-800 px-4 py-2 rounded"
            >
              SAVE
            </button>
          </div>

          {/* Textarea */}
          <textarea
            {...register("note")}
            className="mt-3 w-full flex-1 resize-none border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder={`Write your note here...`}
            defaultValue={""}
          />
        </form>
      </div>
    </div>
  );
};

export default SermonRow;
