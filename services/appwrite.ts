import { env } from "@/constants/env";
import { hashId } from "@/lib/commonUtil";
import {
  ID,
  Account,
  Client,
  Avatars,
  Databases,
  Storage,
  Functions,
  Messaging,
  ExecutionMethod,
} from "react-native-appwrite";

const client = new Client();

class AppwriteService {
  account;
  avatars;
  databases;
  functions;
  storage;
  messaging;
  constructor() {
    client
      .setProject(env.APPWRITE_PROJECT)
      .setPlatform(env.APPWRITE_PLATFORM)
      .setEndpoint(env.APPWRITE_ENDPOINT);

    this.account = new Account(client);
    this.avatars = new Avatars(client);
    this.databases = new Databases(client);
    this.storage = new Storage(client);
    this.functions = new Functions(client);
    this.messaging = new Messaging(client);
  }
}

const appwriteService = new AppwriteService();

//#region Authentication
export const signUpAccount = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const userAccount = await appwriteService.account.create(
      ID.unique(),
      email,
      password,
      username
    );

    return userAccount;
  } catch (error) {
    console.log(`appwrite.signUpAccount : ${error}`);
    throw error;
  }
};

export const generateAvatar = (username: string) => {
  return appwriteService.avatars.getInitials(username);
};

export const signInUser = async (email: string, password: string) => {
  try {
    const session = await appwriteService.account.createEmailPasswordSession(
      email,
      password
    );
    return session;
  } catch (error) {
    console.log(`appwrite.signInUser : ${error}`);
    throw error;
  }
};

export const _createEmailVerification = async (
  verificationPageLink: string
) => {
  try {
    return await appwriteService.account.createVerification(
      verificationPageLink
    );
  } catch (error) {
    console.log(`appwrite._createEmailVerification : ${error}`);
    throw error;
  }
};

export const _createRecovery = async (
  email: string,
  recoveryPageLink: string
) => {
  try {
    return await appwriteService.account.createRecovery(
      email,
      recoveryPageLink
    );
  } catch (error) {
    console.log(`appwrite._createRecovery :${error}`);
    throw error;
  }
};

export const updatePassword = async (
  oldPassword: string,
  newPassword: string
) => {
  try {
    return await appwriteService.account.updatePassword(
      newPassword,
      oldPassword
    );
  } catch (error) {
    console.log(`appwrite._updatePassword : ${error}`);
    if (
      error ==
        "AppwriteException: Invalid `oldPassword` param: Password must be between 8 and 256 characters long." ||
      error ==
        "AppwriteException: Invalid credentials. Please check the email and password."
    ) {
      throw Error("Incorrect old password.");
    } else {
      throw Error("There was a problem updating your password");
    }
  }
};

export const _signOutUser = async (session_id?: string) => {
  try {
    if (session_id) {
      return await appwriteService.account.deleteSession(session_id);
    } else {
      return await appwriteService.account.deleteSession("current");
    }
  } catch (error) {
    console.log(`appwrite.signOutUser : ${error}`);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const res = await appwriteService.account.get();
    return res;
  } catch (error) {
    if (
      (error = "AppwriteException: User (role: guests) missing scope (account)")
    ) {
      throw "No Account Currently Logged in";
    } else {
      console.log(`appwrite.getCurrentUser : ${error}`);
      throw Error("Something went wrong getting login Information");
    }
  }
};

export const getSession = async () => {
  try {
    const res = await appwriteService.account.getSession("current");
    return res;
  } catch (error) {
    console.log(`appwrite.getSession : ${error}`);
    throw error;
  }
};

export const listSession = async () => {
  try {
    const res = await appwriteService.account.listSessions();
    return res;
  } catch (error) {
    console.log(`appwrite.listSession : ${error}`);
    throw error;
  }
};

export const createPushTarget = async (
  session_id: string,
  fcmToken: string
) => {
  try {
    const target = await appwriteService.account.createPushTarget(
      hashId(session_id),
      fcmToken
    );
    return target;
  } catch (error) {
    throw error;
  }
};

export const deletePushTarget = async (session_id: string) => {
  try {
    return appwriteService.account.deletePushTarget(hashId(session_id));
  } catch (error) {
    console.log(`appwrite.deletePushTarget : ${error}`);
    throw error;
  }
};

export const updatePushTarget = async (targetId: string, fcmToken: string) => {
  try {
    return await appwriteService.account.updatePushTarget(targetId, fcmToken);
  } catch (error) {
    console.log(`appwrite.updatePushTarget: ${error}`);
    throw error;
  }
};

//#endregion

//#region Document

export const _createDocument = async (
  DATABASE_ID: string,
  COLLECTION_ID: string,
  document_ID: string,
  data: object
) => {
  try {
    const result = await appwriteService.databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      document_ID,
      data
    );
    return result;
  } catch (error) {
    console.log(`appwrite._createDocument : ${error}`);
    throw error;
  }
};

export const _getDocument = async (
  DATABASE_ID: string,
  COLLECTION_ID: string,
  document_ID: string
) => {
  try {
    const document = await appwriteService.databases.getDocument(
      DATABASE_ID,
      COLLECTION_ID,
      document_ID
    );
    return document;
  } catch (error) {
    console.log(`appwrite._getDocument : ${error}`);
    throw error;
  }
};

export const _listDocuments = async (
  DATABASE_ID: string,
  COLLECTION_ID: string,
  query?: string[]
) => {
  try {
    const documentList = await appwriteService.databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      query
    );
    return documentList;
  } catch (error) {
    console.log(`appwrite._listDocuments : ${error}`);
    throw error;
  }
};

export const _updateDocument = async (
  DATABASE_ID: string,
  COLLECTION_ID: string,
  document_ID: string,
  data: object
) => {
  try {
    const result = await appwriteService.databases.updateDocument(
      DATABASE_ID,
      COLLECTION_ID,
      document_ID,
      data
    );
    return result;
  } catch (error) {
    console.log(`appwrite._updateDocument : ${error}`);
    throw error;
  }
};

export const _deleteDocument = async (
  DATABASE_ID: string,
  COLLECTION_ID: string,
  document_ID: string
) => {
  try {
    return await appwriteService.databases.deleteDocument(
      DATABASE_ID,
      COLLECTION_ID,
      document_ID
    );
  } catch (error) {
    console.log(`appwrite.deleteDocument : ${error}`);
    throw error;
  }
};
//#endregion

//#region Functions

export const _executeFunction = async (
  FUNCTION_ID: string,
  operation: string,
  parameter: object
) => {
  const bodyRequest = {
    operation: operation,
    parameter: parameter,
  };

  const result = await appwriteService.functions.createExecution(
    FUNCTION_ID,
    JSON.stringify(bodyRequest),
    false,
    undefined,
    ExecutionMethod.POST
  );

  return result;
};
//#endregion

//#region File
export const _uploadFile = async (
  BUCKET_ID: string,
  asset: {
    name: string;
    type: string;
    size: number;
    uri: string;
  },
  file_ID?: string
) => {
  console.log(asset.uri);
  try {
    const uploadedFile = await appwriteService.storage.createFile(
      BUCKET_ID,
      file_ID ? file_ID : ID.unique(),
      asset
    );
    return uploadedFile;
  } catch (error) {
    console.log(`appwrite._uploadFile : ${error}`);
    throw error;
  }
};

export const _updateFile = async (
  BUCKET_ID: string,
  file_ID: string,
  data: {
    name?: string;
    permissions?: string[];
  }
) => {
  try {
    await appwriteService.storage.updateFile(
      BUCKET_ID,
      file_ID,
      data.name,
      data.permissions
    );
  } catch (error) {
    console.log(`appwrite._updateFile : ${error}`);
    throw error;
  }
};

export const _getFilePreview = (
  BUCKET_ID: string,
  file_ID: string,
  quality?: number,
  width?: number,
  height?: number
) => {
  try {
    const preview_src = appwriteService.storage.getFilePreview(
      BUCKET_ID,
      file_ID,
      width,
      height,
      undefined,
      quality
    );
    return preview_src;
  } catch (error) {
    console.log(`appwrite._getFilePreview : ${error}`);
    throw error;
  }
};

export const _deleteFile = async (BUCKET_ID: string, file_ID: string) => {
  try {
    await appwriteService.storage.deleteFile(BUCKET_ID, file_ID);
  } catch (error) {
    console.log(`appwrite._deleteFile : ${error}`);
    throw error;
  }
};

//#endregion
