import { useState } from "react";
import { DateRangePicker, SermonRow } from "@/components";
import { type DateRange } from "react-day-picker";

// mock
import { mockSermons as sermons } from "@/mock/sermon-mock";

const MyOrganizationSermons = () => {
  const today = new Date();

  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  const [date, setDate] = useState<DateRange | undefined>({
    from: oneYearAgo,
    to: today,
  });
  const [activeSermonId, setActiveSermonId] = useState<string | null>(null);

  // TO DO:
  // Implement filtering by date range selected in ASC
  //
  return (
    <div className="flex flex-col gap-3 w-full h-full overflow-hidden">
      {!activeSermonId ? (
        <DateRangePicker date={date} setDate={setDate} />
      ) : (
        <button
          onClick={() => setActiveSermonId(null)}
          className="flex w-fit justify-start px-4 py-2 bg-gray-700 text-white rounded"
        >
          Back to list
        </button>
      )}
      <span className="flex w-full border-t border-gray-300"></span>
      <div
        id="main-sermons-tab"
        className="flex flex-col flex-1 overflow-y-auto gap-3"
      >
        {sermons.map((sermon) =>
          activeSermonId === null || activeSermonId === sermon._id ? (
            <SermonRow
              key={sermon._id}
              sermon={sermon}
              isActive={activeSermonId === sermon._id}
              onPlay={() =>
                setActiveSermonId(
                  activeSermonId === sermon._id ? null : sermon._id
                )
              }
            />
          ) : null
        )}
      </div>
    </div>
  );
};

export default MyOrganizationSermons;
