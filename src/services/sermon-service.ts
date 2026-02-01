import { sermonsApi } from "@/services/apis/backend-apis/v1-apis";
import { type StartLiveSermonPayload } from "@/types";
import Logger from "@/utils/logger";

const logger = new Logger("/src/services/sermon-service.ts");

// POST api/v1/sermons/start-live
export const startLiveSermon = async (
  payload: StartLiveSermonPayload,
): Promise<{ sermonId: string } | null> => {
  try {
    const res = await sermonsApi.post("/start-live", {
      sermon: {
        ...payload,
      },
    });

    logger.debug("LIVE SERMON STARTED - ", res.data);

    return res.data; // { sermonId }
  } catch (error) {
    logger.error("START LIVE SERMON ERROR - ", error);
    return null;
  }
};
