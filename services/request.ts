import { RequestType } from "@/constants/models";
import {
  _createDocument,
  _deleteDocument,
  _executeFunction,
  _getDocument,
  _listDocuments,
  _updateDocument,
} from "./appwrite";
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
    console.log(`request.getRequestList : ${error}`);
    throw error;
  }
};

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
    console.log(`request.getUserRequestList : ${error}`);
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
    console.log(`request.getRequest : ${error}`);
    throw error;
  }
};

export const deleteRequest = async (request_id: string) => {
  try {
    const result = await _deleteDocument(
      env.DATABASE_PRIMARY,
      env.COLLECTION_REQUEST,
      request_id
    );

    return result;
  } catch (error) {
    console.log(`request.deleteRequest : ${error}`);
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
        price: "0.00",
        isSuccessful: true,
      }
    );

    return result;
  } catch (error) {
    console.log(`request.createUserRequest : ${error}`);
    throw error;
  }
};

interface IUpdateRequestStatus {
  request_id: string;
  status: string;
  remarks: string;
  price: string;
  user_id: string;
}
export const updateRequestStatus = async (param: IUpdateRequestStatus) => {
  try {
    const result = await _executeFunction(
      env.FUNCTION_REQUEST,
      "updateRequest",
      param
    );

    if (result.responseStatusCode != 200) {
      throw Error("a");
    }
  } catch (error) {
    console.log("request.updateRequestStatus : ", error);
    if (error === "a") {
      throw Error("There was a problem updating a request.");
    }
  }
};
