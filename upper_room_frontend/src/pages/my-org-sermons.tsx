import { useState } from "react";
import { DateRangePicker, SermonRow } from "@/components";
import { type DateRange } from "react-day-picker";
import { type Sermon } from "@/types";
const MyOrganizationSermons = () => {
  const today = new Date();

  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  const [date, setDate] = useState<DateRange | undefined>({
    from: oneYearAgo,
    to: today,
  });

  // TO DO:
  // Implement filtering by date range selected in ASC
  //
  return (
    <div className="flex flex-col gap-3 w-full h-full">
      <DateRangePicker date={date} setDate={setDate} />
      <span className="flex w-full border-t border-gray-300"></span>
      <div id="main-sermons-tab" className="">
        <SermonRow sermon={mockSermon} />
      </div>
    </div>
  );
};

// ---- UI MOCK
const mockSermon: Sermon = {
  _id: "614c1b9f1c4ae85a1c8b4567",
  pastorId: "5f4d4c3b2a1b9e0017f4a123",
  organizationId: "5f4d4c3b2a1b9e0017f4a456",
  title: "Walking by Faith, Not by Sight",
  audioUrl: "https://example.com/audio/walking-by-faith.mp3",
  transcripts: [
    "Welcome to today’s sermon.",
    "Today, we’re talking about walking by faith...",
    "Let’s turn to 2 Corinthians 5:7...",
    "Faith is not about what we see, but what we believe...",
  ],
  originalLanguage: "en",
  visibility: "PUBLIC",
  createdAt: "2025-08-20T10:30:00.000Z",
  updatedAt: "2025-08-22T14:45:00.000Z",
};

export default MyOrganizationSermons;
