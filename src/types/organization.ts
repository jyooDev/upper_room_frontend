export interface IOrganization {
  _id: string;
  organizer: string;
  pastor?: string;
  managers?: [string];
  name: string;
  denomination: string;
  members?: [string];
  logoURL?: string;
}
