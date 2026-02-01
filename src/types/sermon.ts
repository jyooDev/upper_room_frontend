export interface Transcript {
  language: string;
  content: string;
}

export type SermonStatus = "SCHEDULED" | "LIVE" | "ENDED" | "RECORDED";

export interface ISermon {
  pastorId?: string;
  pastorName: string;
  organizationId: string;

  title: string;
  originalLanguage: string;
  visibility: "PUBLIC" | "PRIVATE";

  status: SermonStatus;

  roomName?: string;

  audioUrl?: string;
  transcripts?: {
    language: string;
    url: string;
  }[];

  scheduledAt?: Date;
  startedAt?: Date;
  endedAt?: Date;
}

export interface StartLiveSermonPayload {
  organizationId: string;

  pastorName: string;
  title: string;

  originalLanguage: string;
  visibility: "PUBLIC" | "PRIVATE";
}
