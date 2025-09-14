export interface Sermon {
  _id: string;
  pastorId: string;
  organizationId: string;
  title: string;
  audioUrl: string;
  transcripts: string[];
  originalLanguage: string;
  visibility: "PUBLIC" | "PRIVATE";
  createdAt: string;
  updatedAt: string;
}
