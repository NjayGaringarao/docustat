export type RequestStatusType =
  | "pending"
  | "processing"
  | "pickup"
  | "success"
  | "failed";

export type AdminTabBarType = "pending" | "processing" | "pickup" | "other";

export type TabBarType = "active" | "archive";

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
