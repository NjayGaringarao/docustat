import { RequestType } from "@/constants/models";
import { _createDocument, _getDocument, _listDocuments, _updateDocument } from "./appwrite";
import { env } from "@/constants/env";
import { toUserRequest, toUserRequestList } from "@/lib/dataTransferObject";
import { ID, Query } from "react-native-appwrite";

export const getRequestList = async (): Promise<RequestType[]> => {
  try {
    const result = await _listDocuments(
      env.DATABASE_PRIMARY,
      env.COLLECTION_REQUEST
    );

    return toUserRequestList(result);
  } catch (error) {
    console.log(`database.getRequestList : ${error}`);
    throw error;
  }
}

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

export const getRequest = async (request_id: string): Promise<RequestType> => {
  try {
    const result = await _getDocument(
      env.DATABASE_PRIMARY,
      env.COLLECTION_REQUEST,
      request_id
    );

    return toUserRequest(result);
  } catch (error) {
    console.log(`database.getRequest : ${error}`);
    throw error;
  }
};

export const createUserRequest = async (
  user_id: string,
  document: string[],
  purpose: string,
  request_note: string
) => {
  try {
    const result = await _createDocument(
      env.DATABASE_PRIMARY,
      env.COLLECTION_REQUEST,
      ID.unique(),
      {
        document: document,
        purpose: purpose,
        request_note: request_note,
        user_id: user_id,
        status: "pending",
        updated_at: new Date(),
        created_at: new Date(),
        remarks: "",
        isSuccessful : true
      }
    );

    return result;
  } catch (error) {
    console.log(`database.createUserRequest : ${error}`);
    throw error;
  }
};

export const updateRequestStatus = async ( request_id: string, status: string, remarks: string, isSuccessful: boolean) => {
  try {
    const result = await _updateDocument(
      env.DATABASE_PRIMARY,
      env.COLLECTION_REQUEST,
      request_id,
      {
        status: status,
        remarks: remarks,
        isSuccessful: isSuccessful,
        updated_at: new Date(),
      }
    );
    return result;
  } catch (error) {
    console.log(`database.updateRequestStatus : ${error}`);
    throw error;
  }
}