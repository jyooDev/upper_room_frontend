import { sermonsApi } from "@/services/apis/backend-apis/v1-apis";
import { type StartLiveSermonPayload, type ISermon } from "@/types";
import Logger from "@/utils/logger";

const logger = new Logger("sermon-service");

/** POST api/v1/sermons/start-live — backend creates sermon and returns sermonId */
export async function startLiveSermon(
  payload: StartLiveSermonPayload,
): Promise<{ sermonId: string } | null> {
  try {
    const res = await sermonsApi.post<{ sermonId: string }>("/start-live", {
      sermon: { ...payload },
    });
    logger.debug("Live sermon created:", res.data.sermonId);
    return res.data;
  } catch (error) {
    logger.error("startLiveSermon failed:", error);
    return null;
  }
}

/** GET api/v1/sermons?orgId= — fetch sermons for an organization */
export async function getSermonsByOrg(
  orgId: string,
): Promise<{ sermons: ISermon[]; message: string } | null> {
  try {
    const res = await sermonsApi.get<{ sermons: ISermon[]; message: string }>(
      "",
      { params: { orgId } },
    );
    return res.data;
  } catch (error) {
    logger.error("getSermonsByOrg failed:", error);
    return null;
  }
}
