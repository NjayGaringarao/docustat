import {
  UserType,
  UserCredentialType,
  RequestType,
  NotificationType,
} from "@/constants/models";
import { _getDocument, _listDocuments } from "./appwrite";
import { env } from "@/constants/env";
import {
  toUserCredential,
  toUserInfo,
  toUserNotificationList,
  toUserRequestList,
} from "@/lib/dataTransferObject";
import { Query } from "react-native-appwrite";

//#region User

export const getUserInfo = async (user_id: string): Promise<UserType> => {
  try {
    const result = await _getDocument(
      env.DATABASE_PRIMARY,
      env.COLLECTION_USER,
      user_id
    );

    return toUserInfo(result);
  } catch (error) {
    console.log(`database.getUserInfo : ${error}`);
    throw error;
  }
};

export const getUserCredential = async (
  user_id: string
): Promise<UserCredentialType> => {
  try {
    const result = await _getDocument(
      env.DATABASE_PRIMARY,
      env.COLLECTION_CREDENTIAL,
      user_id
    );

    return toUserCredential(result);
  } catch (error) {
    console.log(`database.getUserCredential : ${error}`);
    throw error;
  }
};

//#endregion

//#region Request

export const getUserRequestList = async (
  user_id: string
): Promise<RequestType[]> => {
  try {
    const result = await _listDocuments(
      env.DATABASE_PRIMARY,
      env.COLLECTION_REQUEST,
      [Query.contains("user_id", user_id)]
    );

    return toUserRequestList(result);
  } catch (error) {
    console.log(`database.getUserRequestList : ${error}`);
    throw error;
  }
};

//#endregion

//#region Notification

export const getUserNotificationList = async (
  user_id: string
): Promise<NotificationType[]> => {
  try {
    const result = await _listDocuments(
      env.DATABASE_PRIMARY,
      env.COLLECTION_NOTIFICATION,
      [Query.contains("user_id", user_id)]
    );

    return toUserNotificationList(result);
  } catch (error) {
    console.log(`database.getUserNotificationList : ${error}`);
    throw error;
  }
};

//#endregion
