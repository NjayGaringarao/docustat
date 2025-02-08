import {
  NotificationType,
  RequestType,
  UserCredentialType,
  UserType,
} from "@/constants/models";
import { Models } from "react-native-appwrite";

// User

export const toUserInfo = (document: Models.Document): UserType => {
  return {
    id: document.$id,
    name: document.name,
    avatar_url: document.avatar_url,
    address: document.address,
    sex: document.sex,
    birthdate: document.birthdate ? new Date(document.birthdate) : undefined,
    civil_status: document.civil_status,
    contact_number: document.contact_number,
    created_at: new Date(document.created_at),
    admin_info: document.admin_info,
    student_info: document.student_info,
    alumni_info: document.alumni_info,
  };
};

export const toUserCredential = (
  document: Models.Document
): UserCredentialType => {
  return {
    id: document.$id,
    email: document.email,
    role: document.role,
  };
};

// Request

export const toUserRequest = (document: Models.Document): RequestType => {
  return {
    id: document.$id,
    document: document.document,
    purpose: document.purpose,
    request_note: document.request_note,
    user_id: document.user_id,
    status: document.status,
    remarks: document.remarks,
    updated_at: new Date(document.updated_at),
    created_at: new Date(document.created_At),
  };
};

export const toUserRequestList = (
  documentList: Models.DocumentList<Models.Document>
): RequestType[] => {
  const requestList: RequestType[] = [];

  documentList.documents.forEach((document) => {
    requestList.push(toUserRequest(document));
  });

  return requestList;
};

// Notification

export const toNotification = (document: Models.Document): NotificationType => {
  return {
    id: document.$id,
    title: document.title,
    description: document.description,
    origin: document.origin,
    content: document.content,
    user_id: document.user_id,
    isViewed: document.isViewed,
    created_at: new Date(document.created_at),
  };
};

export const toUserNotificationList = (
  documentList: Models.DocumentList<Models.Document>
): NotificationType[] => {
  const requestList: NotificationType[] = [];

  documentList.documents.forEach((document) => {
    requestList.push(toNotification(document));
  });

  return requestList;
};
