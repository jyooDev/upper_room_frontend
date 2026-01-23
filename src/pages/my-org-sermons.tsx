import { useEffect, useMemo, useState } from "react";
import { DateRangePicker, SermonRow } from "@/components";
import { type DateRange } from "react-day-picker";

import { mockSermons as sermons } from "@/mock/sermon-mock";
import { useAuthContext, useOrgContext } from "@/contexts";
import { getUser } from "@/services/user-service";
import { getOrgById } from "@/services/org-service";
import { createVoiceRoom } from "@/services/voice-services";
import Logger from "@/utils/logger";

const MyOrganizationSermons = () => {
  const { user } = useAuthContext();
  const { orgId } = useOrgContext();

  const logger = new Logger("/src/pages/my-org-sermons.tsx");

  const today = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  const [date, setDate] = useState<DateRange | undefined>({
    from: oneYearAgo,
    to: today,
  });

  const [activeSermonId, setActiveSermonId] = useState<string | null>(null);
  const [isSermonLive, setIsSermonLive] = useState<boolean>(false);

  const [userRole, setUserRole] = useState<string>("MEMBER");
  const [isPastor, setIsPastor] = useState<boolean>(false);
  const [isManager, setIsManager] = useState<boolean>(false);
  const [isOrgOrganizer, setIsOrgOrganizer] = useState<boolean>(false);

  const canStartLive = useMemo(() => {
    return (
      isPastor || isManager || (userRole === "ORGANIZER" && isOrgOrganizer)
    );
  }, [isPastor, isManager, userRole, isOrgOrganizer]);

  useEffect(() => {
    if (!user?.uid || !orgId) return;

    const loadPermissions = async () => {
      try {
        const [_user, org] = await Promise.all([
          getUser(user.uid),
          getOrgById(orgId),
        ]);

        if (_user?.userRole) {
          setUserRole(_user.userRole);
        }

        if (org) {
          setIsPastor(org.pastor === user.uid);
          setIsManager(org.managers?.includes(user.uid));
          setIsOrgOrganizer(org.organizer === user.uid);
        }
      } catch (error) {
        logger.error("Failed to load permissions:", error);
      }
    };

    loadPermissions();
  }, [user, orgId]);

  /* -----------------------------
   * Handlers
   * ----------------------------- */
  const handleStartLive = async () => {
    // TODO: backend call to create live sermon + LiveKit room
    const data = await createVoiceRoom({
      roomName: `org-${orgId}-live-sermon`,
    });
    if (data) {
      const token = data["token"];
      setIsSermonLive(true);
    }
  };

  const handleJoinLive = () => {
    // TODO: navigate to live sermon page
    // navigate(`/org/${orgId}/live`)
  };

  /* -----------------------------
   * Render
   * ----------------------------- */
  return (
    <div className="flex flex-col gap-3 w-full h-full overflow-hidden">
      {/* Header Controls */}
      {!activeSermonId ? (
        <DateRangePicker date={date} setDate={setDate} />
      ) : (
        <button
          onClick={() => setActiveSermonId(null)}
          className="w-fit px-4 py-2 bg-gray-700 text-white rounded"
        >
          Back to list
        </button>
      )}

      <span className="w-full border-t border-gray-300" />

      {/* Live Sermon Controls */}
      <div className="flex w-full items-center justify-between gap-3">
        {canStartLive && !isSermonLive && (
          <button
            onClick={handleStartLive}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Start Live Sermon
          </button>
        )}

        {isSermonLive && (
          <button
            onClick={handleJoinLive}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Join Live Sermon
          </button>
        )}

        {!isSermonLive && !canStartLive && (
          <span className="text-sm text-gray-500 italic">
            No live sermon at the moment
          </span>
        )}
      </div>

      {/* Sermon List */}
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
                  activeSermonId === sermon._id ? null : sermon._id,
                )
              }
            />
          ) : null,
        )}
      </div>
    </div>
  );
};

export default MyOrganizationSermons;
