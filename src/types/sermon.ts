export interface Transcript {
  language: string;
  content: string;
}

export type SermonStatus = "SCHEDULED" | "LIVE" | "ENDED" | "RECORDED";

export interface ISermon {
  _id?: string;
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
  createdAt?: string;
  description?: string;
}

/** Sermon as used by list/row UI (API document shape). */
export type Sermon = ISermon & { _id: string };

export interface StartLiveSermonPayload {
  organizationId: string;
  pastorName: string;
  title: string;
  originalLanguage: string;
  visibility: "PUBLIC" | "PRIVATE";
}

/** Response from Voice API for joining a LiveKit room (start or join). */
export interface VoiceJoinInfo {
  roomName: string;
  token: string;
  livekitUrl: string;
}
