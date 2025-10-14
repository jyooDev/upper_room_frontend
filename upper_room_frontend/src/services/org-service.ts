import { organizationsApi } from "./api";
import Logger from "../utils/logger";

const logger = new Logger("/src/services/org-service.ts");

export interface Org {
  _id: string;
  name: string;
  organizer: string;
  pastor?: string;
  managers?: [string];
  denomination: string;
  members?: [string];
  logoURL?: string;
}

export const getOrgByName = async (orgName: string): Promise<Org | null> => {
  try {
    const res = await organizationsApi.get(
      `?orgName=${encodeURIComponent(orgName)}`
    );
    logger.debug(`Organization Search Result for ${orgName} : ${res.data}`);
    return res.data;
  } catch (err) {
    logger.error(err);
    return null;
  }
};

export const getOrgByMemberId = async (
  userId: string
): Promise<Org[] | null> => {
  try {
    const res = await organizationsApi.get(
      `/myorg?userId=${encodeURIComponent(userId)}`
    );
    logger.debug(
      `Organizations for member ${userId}: ${JSON.stringify(res.data)}`
    );
    return res.data;
  } catch (err) {
    logger.error(err);
    return null;
  }
};

export const getMyOrganizations = async (userId: string) => {
  try {
    const res = await organizationsApi.get(`/${userId}`);
    return res.data;
  } catch (err) {
    logger.error(err);
    return null;
  }
};
