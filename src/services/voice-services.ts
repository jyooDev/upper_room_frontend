import { roomApis } from "./apis/voice-apis";
import Logger from "../utils/logger";
import type { VoiceJoinInfo } from "@/types";

const logger = new Logger("voice-services");

/**
 * Get LiveKit join info for the host who just created a sermon.
 * Call after Backend POST /sermons/start-live returns sermonId.
 */
export async function getJoinInfoForHost(
  sermonId: string,
): Promise<VoiceJoinInfo | null> {
  try {
    const { data } = await roomApis.post<VoiceJoinInfo>("/start-room", {
      sermonId,
    });
    logger.debug("Voice API start-room:", { roomName: data.roomName });
    return data;
  } catch (error) {
    logger.error("getJoinInfoForHost failed:", error);
    return null;
  }
}

/**
 * Get LiveKit join info to join an existing live sermon as a participant.
 * Voice API verifies sermon is LIVE via backend.
 */
export async function getJoinInfoForSermon(
  sermonId: string,
): Promise<VoiceJoinInfo | null> {
  try {
    const { data } = await roomApis.post<VoiceJoinInfo>("/join", {
      sermonId,
    });
    logger.debug("Voice API join:", { roomName: data.roomName });
    return data;
  } catch (error) {
    logger.error("getJoinInfoForSermon failed:", error);
    return null;
  }
}
