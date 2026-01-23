import { roomApis } from "./apis/voice-apis";
import Logger from "../utils/logger";

const logger = new Logger("/src/services/voice-services.ts");

export const createVoiceRoom = async (roomPayload: {}) => {
  try {
    const res = await roomApis.post("/start-room", {
      ...roomPayload,
    });

    const data = res.data;
    logger.debug("VOICE ROOM CREATED - ", data);
    return data;
  } catch (error) {
    logger.error("VOICE ROOM CREATION ERROR - ", error);
    return false;
  }
};
