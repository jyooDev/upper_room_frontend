export interface Transcript {
  language: string;
  content: string;
}

export interface Sermon {
  _id: string;
  pastorId: string;
  organizationId: string;
  title: string;
  audioUrl: string;
  transcripts: Transcript[];
  originalLanguage: string;
  visibility: "PUBLIC" | "PRIVATE";
  createdAt: string;
  updatedAt: string;
  description?: string;
}
