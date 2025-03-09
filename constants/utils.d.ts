export type RequestStatusType =
  | "pending"
  | "processing"
  | "pickup"
  | "complete";

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
