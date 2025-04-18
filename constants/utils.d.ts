export type RequestStatusType =
  | "pending"
  | "processing"
  | "pickup"
  | "success"
  | "failed";

export type TabBarType = "pending" | "processing" | "pickup" | "other";

export type COGType = {
  sem: "first" | "second" | "midyear";
  ay: string;
};

export type RequestLetterType = {
  document_type: string;
};

export type RequestDocumentType = {
  copy: number;
  document: COG | RequestLetter | string;
};
