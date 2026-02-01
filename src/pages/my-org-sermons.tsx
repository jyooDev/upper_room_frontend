import { useEffect, useMemo, useRef, useState } from "react";
import { DateRangePicker, SermonRow } from "@/components";
import { type DateRange } from "react-day-picker";
import { Room } from "livekit-client";

import { mockSermons as sermons } from "@/mock/sermon-mock";
import { useAuthContext, useOrgContext } from "@/contexts";
import { getUser } from "@/services/user-service";
import { getOrgById } from "@/services/org-service";
// import { joinVoiceRoom } from "@/services/voice-services";
import { startLiveSermon } from "@/services/sermon-service";
import Logger from "@/utils/logger";
import StartLiveSessionDialog from "@/components/start-live-sermon";
import type { StartLiveSermonPayload } from "@/types";

const MyOrganizationSermons = () => {
  const logger = new Logger("MyOrganizationSermons");

  const { user } = useAuthContext();
  const { orgId } = useOrgContext();

  const today = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  const [date, setDate] = useState<DateRange | undefined>({
    from: oneYearAgo,
    to: today,
  });

  const [activeSermonId, setActiveSermonId] = useState<string | null>(null);
  const [isSermonLive, setIsSermonLive] = useState(false);
  const [openStartLive, setOpenStartLive] = useState(false);

  const [permissions, setPermissions] = useState({
    role: "MEMBER",
    isPastor: false,
    isManager: false,
    isOrganizer: false,
  });

  const canStartLive = useMemo(() => {
    return (
      permissions.isPastor ||
      permissions.isManager ||
      (permissions.role === "ORGANIZER" && permissions.isOrganizer)
    );
  }, [permissions]);

  const livekitRoomRef = useRef<Room | null>(null);

  useEffect(() => {
    if (!user?.uid || !orgId) return;

    const loadPermissions = async () => {
      try {
        const [_user, org] = await Promise.all([
          getUser(user.uid),
          getOrgById(orgId),
        ]);

        setPermissions({
          role: _user?.role ?? "MEMBER",
          isPastor: org?.pastor === user.uid,
          isManager: org?.managers?.includes(user.uid) ?? false,
          isOrganizer: org?.organizer === user.uid,
        });
      } catch (err) {
        logger.error("Failed to load permissions", err);
      }
    };

    loadPermissions();
  }, [user?.uid, orgId]);

  const handleStartLive = async (payload: StartLiveSermonPayload) => {
    /*
    1. Create sermon in backend server (Authorization via middleware)
    2. Create voice room in voice server -> returns roomName, token
    3. Connect to voice room using Livekit client SDK (room.connect)
     */

    const data = await startLiveSermon(payload);
    if (!data?.sermonId) {
      logger.error("Failed to start live sermon - no sermonId returned");
      return;
    }
    const { sermonId } = data;
    console.debug("Live sermon created with ID:", sermonId);

    // 2. voice api: get token
    // const joinData = await joinVoiceRoom(sermonId);

    // 3. connect to LiveKit
    // const room = new Room();
    // await room.connect(joinData.livekitUrl, joinData.token);

    setOpenStartLive(false);
  };

  const handleJoinLive = () => {
    // TODO: navigate to live sermon page
    // navigate(`/org/${orgId}/live/${activeSermonId}`);
  };

  return (
    <>
      <StartLiveSessionDialog
        open={openStartLive}
        onClose={() => setOpenStartLive(false)}
        onStartLive={handleStartLive}
        organizationId={orgId}
      />
      <div className="flex flex-col gap-3 w-full h-full overflow-hidden">
        {/* Header */}
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

        {/* Live Controls */}
        <div className="flex items-center gap-3">
          {canStartLive && !isSermonLive && (
            <button
              onClick={() => setOpenStartLive(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            >
              Start Live Sermon
            </button>
          )}

          {isSermonLive && (
            <button
              onClick={handleJoinLive}
              className="px-4 py-2 bg-green-600 text-white rounded"
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
        <div className="flex flex-col flex-1 overflow-y-auto gap-3">
          {sermons.map((sermon) => (
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
          ))}
        </div>
      </div>
    </>
  );
};

export default MyOrganizationSermons;
