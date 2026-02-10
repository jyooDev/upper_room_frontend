import { useEffect, useMemo, useRef, useState } from "react";
import { DateRangePicker, SermonRow } from "@/components";
import { type DateRange } from "react-day-picker";
import { Room } from "livekit-client";

import { useAuthContext, useOrgContext } from "@/contexts";
import { getUser } from "@/services/user-service";
import { getOrgById } from "@/services/org-service";
import {
  getJoinInfoForHost,
  getJoinInfoForSermon,
} from "@/services/voice-services";
import { startLiveSermon, getSermonsByOrg } from "@/services/sermon-service";
import Logger from "@/utils/logger";
import StartLiveSessionDialog from "@/components/start-live-sermon";
import type { StartLiveSermonPayload, ISermon } from "@/types";

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
  const [sermons, setSermons] = useState<ISermon[]>([]);
  const [sermonsLoading, setSermonsLoading] = useState(false);
  const [activeSermonId, setActiveSermonId] = useState<string | null>(null);
  const [openStartLive, setOpenStartLive] = useState(false);
  const [startLiveSubmitting, setStartLiveSubmitting] = useState(false);

  const [permissions, setPermissions] = useState({
    role: "MEMBER",
    isPastor: false,
    isManager: false,
    isOrganizer: false,
  });

  const canStartLive = useMemo(
    () =>
      permissions.isPastor ||
      permissions.isManager ||
      (permissions.role === "ORGANIZER" && permissions.isOrganizer),
    [permissions],
  );

  const liveSermons = useMemo(
    () => sermons.filter((s) => s.status === "LIVE"),
    [sermons],
  );

  const roomRef = useRef<Room | null>(null);

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

  useEffect(() => {
    if (!orgId) return;

    const loadSermons = async () => {
      setSermonsLoading(true);
      try {
        const result = await getSermonsByOrg(orgId);
        if (result?.sermons) {
          setSermons(result.sermons);
        }
      } catch (err) {
        logger.error("Failed to load sermons", err);
      } finally {
        setSermonsLoading(false);
      }
    };

    loadSermons();
  }, [orgId]);

  const handleStartLive = async (payload: StartLiveSermonPayload) => {
    setStartLiveSubmitting(true);
    try {
      // 1) Backend: create LIVE sermon
      const data = await startLiveSermon(payload);
      if (!data?.sermonId) {
        logger.error("Backend did not return sermonId");
        return;
      }
      const { sermonId } = data;

      // 2) Voice API: get join info for host (no room created yet)
      const joinInfo = await getJoinInfoForHost(sermonId);
      if (!joinInfo) {
        logger.error("Voice API did not return join info");
        return;
      }
      const { roomName, token, livekitUrl } = joinInfo;

      logger.debug("ROOM NAME - ", roomName);

      // 3) LiveKit: connect (room is created on first connect)
      const room = new Room();
      roomRef.current = room;
      await room.connect(livekitUrl, token);

      logger.debug("Connected to room:", roomName);
      setOpenStartLive(false);
      setSermons((prev) => [
        ...prev,
        {
          _id: sermonId,
          pastorName: payload.pastorName,
          organizationId: payload.organizationId,
          title: payload.title,
          originalLanguage: payload.originalLanguage,
          visibility: payload.visibility,
          status: "LIVE",
          roomName,
          createdAt: new Date().toISOString(),
        } as ISermon,
      ]);
    } catch (err) {
      logger.error("Start live failed:", err);
    } finally {
      setStartLiveSubmitting(false);
    }
  };

  const handleJoinLive = async (sermonId: string) => {
    try {
      const joinInfo = await getJoinInfoForSermon(sermonId);
      if (!joinInfo) {
        logger.error("Voice API did not return join info");
        return;
      }
      const { token, livekitUrl } = joinInfo;

      const room = new Room();
      roomRef.current = room;
      await room.connect(livekitUrl, token);
      logger.debug("Joined room for sermon:", sermonId);
    } catch (err) {
      logger.error("Join live failed:", err);
    }
  };

  useEffect(() => {
    return () => {
      if (roomRef.current) {
        roomRef.current.disconnect();
      }
    };
  }, []);

  return (
    <>
      <StartLiveSessionDialog
        open={openStartLive}
        onClose={() => setOpenStartLive(false)}
        onStartLive={handleStartLive}
        organizationId={orgId ?? ""}
        isSubmitting={startLiveSubmitting}
      />
      <div className="flex flex-col gap-3 w-full h-full overflow-hidden">
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

        <div className="flex items-center gap-3">
          {canStartLive && (
            <button
              onClick={() => setOpenStartLive(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            >
              Start Live Sermon
            </button>
          )}
          {!canStartLive && (
            <span className="text-sm text-gray-500 italic">
              Only organizer, pastor, or manager can start a live sermon.
            </span>
          )}
        </div>

        {liveSermons.length > 0 && (
          <section className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold text-gray-700">
              Active live sermons
            </h3>
            <div className="flex flex-wrap gap-3">
              {liveSermons.map((sermon) => {
                const id = String(
                  typeof sermon._id === "string"
                    ? sermon._id
                    : ((
                        sermon._id as unknown as { toString?: () => string }
                      )?.toString?.() ?? sermon._id),
                );
                return (
                  <div
                    key={id}
                    className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3"
                  >
                    <div>
                      <p className="font-medium">{sermon.title}</p>
                      <p className="text-sm text-gray-500">
                        {sermon.pastorName}
                      </p>
                    </div>
                    <button
                      onClick={() => handleJoinLive(id)}
                      className="px-3 py-1.5 bg-green-600 text-white text-sm rounded"
                    >
                      Join Live
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        <section className="flex flex-col flex-1 overflow-y-auto gap-3">
          <h3 className="text-sm font-semibold text-gray-700">Sermons</h3>
          {sermonsLoading ? (
            <p className="text-sm text-gray-500">Loading…</p>
          ) : sermons.length === 0 ? (
            <p className="text-sm text-gray-500">No sermons yet.</p>
          ) : (
            sermons.map((sermon) => {
              const id = String(
                typeof sermon._id === "string"
                  ? sermon._id
                  : ((
                      sermon._id as unknown as { toString?: () => string }
                    )?.toString?.() ?? sermon._id),
              );
              const created =
                "createdAt" in sermon && typeof sermon.createdAt === "string"
                  ? sermon.createdAt
                  : "startedAt" in sermon && sermon.startedAt
                    ? new Date(sermon.startedAt).toISOString()
                    : new Date().toISOString();
              const rowSermon = {
                ...sermon,
                _id: id,
                createdAt: created,
                description:
                  "description" in sermon ? (sermon.description ?? "") : "",
              };
              return (
                <SermonRow
                  key={id}
                  sermon={rowSermon}
                  isActive={activeSermonId === id}
                  onPlay={() =>
                    setActiveSermonId(activeSermonId === id ? null : id)
                  }
                />
              );
            })
          )}
        </section>
      </div>
    </>
  );
};

export default MyOrganizationSermons;
