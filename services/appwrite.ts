import { env } from "@/constants/env";
import {
  ID,
  Account,
  Client,
  Avatars,
  Databases,
  Storage,
  Functions,
  Messaging,
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
    client.setProject(env.APPWRITE_PROJECT).setPlatform(env.APPWRITE_PLATFORM);

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
export const _createAccount = async (
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
    console.log(`ERROR (appwrite.ts => createAccount) :: ${error}`);
    throw error;
  }
};

export const _generateAvatar = (username: string) => {
  return appwriteService.avatars.getInitials(username);
};

export const _loginUser = async (email: string, password: string) => {
  try {
    const session = await appwriteService.account.createEmailPasswordSession(
      email,
      password
    );
    return session;
  } catch (error) {
    console.log(`ERROR (appwrite.ts => loginUser) :: ${error}`);
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
    console.log(`ERROR (appwrite.ts => _createEmailVerification) :: ${error}`);
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
    console.log(`ERROR (appwrite.ts => _createRecovery) :: ${error}`);
    throw error;
  }
};

export const _updatePassword = async (
  oldPassword: string,
  newPassword: string
) => {
  try {
    return await appwriteService.account.updatePassword(
      newPassword,
      oldPassword
    );
  } catch (error) {
    console.log(`ERROR (appwrite.ts => _updatePassword) :: ${error}`);
    throw error;
  }
};

export const _logoutUser = async (session_id?: string) => {
  try {
    if (session_id) {
      return await appwriteService.account.deleteSession(session_id);
    } else {
      return await appwriteService.account.deleteSession("current");
    }
  } catch (error) {
    console.log(`ERROR (appwrite.ts => logoutUser) :: ${error}`);
    throw error;
  }
};

export const _getCurrentUser = async () => {
  try {
    const res = await appwriteService.account.get();
    return res;
  } catch (error) {
    console.log(`ERROR (appwrite.ts => getCurrentUser) :: ${error}`);
    throw error;
  }
};

export const _getSession = async () => {
  try {
    const res = await appwriteService.account.getSession("current");
    return res;
  } catch (error) {
    console.log(`ERROR (appwrite.ts => getSession) :: ${error}`);
    throw error;
  }
};

export const _listSession = async () => {
  try {
    const res = await appwriteService.account.listSessions();
    return res;
  } catch (error) {
    console.log(`ERROR (appwrite.ts => listSession) :: ${error}`);
    throw error;
  }
};

export const _createTarget = async (sessionId: string, fcmToken: string) => {
  try {
    const target = await appwriteService.account.createPushTarget(
      sessionId,
      fcmToken
    );
    return target;
  } catch (error) {
    console.log(`ERROR (appwrite.ts => createTarget) :: ${error}`);
    throw error;
  }
};

export const _deleteTarget = async (targetId: string) => {
  try {
    return appwriteService.account.deletePushTarget(targetId);
  } catch (error) {
    console.log(`ERROR (appwrite.ts => deleteTarget) :: ${error}`);
    throw error;
  }
};

export const _updateTarget = async (targetId: string, fcmToken: string) => {
  try {
    return await appwriteService.account.updatePushTarget(targetId, fcmToken);
  } catch (error) {
    console.log(`ERROR (appwrite.ts => updateTarget) :: ${error}`);
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
    console.log(`ERROR (appwrite.ts => createDocument) :: ${error}`);
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
    console.log(`ERROR (appwrite.ts => getDocument) :: ${error}`);
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
    console.log(`ERROR (appwrite.ts => listDocuments) :: ${error}`);
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
    console.log(`ERROR (appwrite.ts => updateDocument) :: ${error}`);
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
    console.log(`ERROR (appwrite.ts => deleteDocument) :: ${error}`);
    throw error;
  }
};
//#endregion
