import { organizationsApi } from "./apis/backend-apis/v1-apis";
import Logger from "../utils/logger";
import { type IOrganization } from "@/types";
const logger = new Logger("/src/services/org-service.ts");

export interface Org {
  _id: string;
  name: string;
  organizer: string;
  pastor?: string;
  managers: [string];
  denomination: string;
  members?: [string];
  logoURL?: string;
}

export const getOrgByName = async (orgName: string): Promise<Org | null> => {
  try {
    const res = await organizationsApi.get(
      `?orgName=${encodeURIComponent(orgName)}`,
    );
    logger.debug(`Organization Search Result for ${orgName} : ${res.data}`);
    return res.data;
  } catch (err) {
    logger.error(err);
    return null;
  }
};

export const getOrgById = async (orgId: string): Promise<Org | null> => {
  try {
    const res = await organizationsApi.get(
      `?orgId=${encodeURIComponent(orgId)}`,
    );
    logger.debug(`Organization Search Result for ${orgId} : ${res.data}`);
    return res.data.org;
  } catch (err) {
    logger.error(err);
    return null;
  }
};

export const getMyOrganizations = async (
  userId: string,
): Promise<IOrganization[] | null> => {
  try {
    const res = await organizationsApi.get(
      `/myorg?userId=${encodeURIComponent(userId)}`,
    );
    logger.debug(
      `Organizations for member ${userId}: ${JSON.stringify(res.data)}`,
    );
    return res.data;
  } catch (err) {
    logger.error(err);
    return null;
  }
};
