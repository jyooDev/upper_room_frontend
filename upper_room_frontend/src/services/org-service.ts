import { organizationsApi } from "./api";
import Logger from "../utils/logger";

const logger = new Logger("/src/services/org-service.ts");

export interface Org {
  _id: string;
  name: string;
  // add other fields if needed
}

export const getOrgByName = async (orgName: string): Promise<Org | null> => {
  try {
    const res = await organizationsApi.get(`/${encodeURIComponent(orgName)}`);
    return res.data;
  } catch (err) {
    logger.error(err);
    return null;
  }
};
