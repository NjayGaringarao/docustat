import { UserCredentialType, UserType } from "@/constants/models";
import { _getDocument, _listDocuments, _updateDocument } from "./appwrite";
import { env } from "@/constants/env";
import { toUserCredential, toUserInfo } from "@/lib/dataTransferObject";
import { Query } from "react-native-appwrite";

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

export const isEmailAvailable = async (email: string) => {
  try {
    const result = await _listDocuments(
      env.DATABASE_PRIMARY,
      env.COLLECTION_CREDENTIAL,
      [Query.contains("email", email)]
    );

    if (result.total == 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(`database.isEmailAvailable : ${error}`);
    throw error;
  }
};

export const isIDAvailable = async (user_id: string) => {
  try {
    const result = await _getDocument(
      env.DATABASE_PRIMARY,
      env.COLLECTION_CREDENTIAL,
      user_id
    );

    if (result) return false;
  } catch (error) {
    if (
      error ==
      "AppwriteException: Document with the requested ID could not be found."
    ) {
      return true;
    } else {
      throw Error("There was an error checking the validity of your ID.");
    }
  }
};

interface IFormUpdateUserInfo {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  sex?: string;
  birthdate?: Date;
  civil_status?: string;
  address?: string;
  zipCode?: string;
  contact_number?: string;
  department?: string;
  dept_prog?: string;
  year_level?: string;
  year_graduated?: Date;
}
export const updateUserInfo = async (
  user_id: string,
  role: string,
  form: IFormUpdateUserInfo
) => {
  try {
    const userInfo = await _updateDocument(
      env.DATABASE_PRIMARY,
      env.COLLECTION_USER,
      user_id,
      {
        name: [form.firstName, form.middleName, form.lastName],
        sex: form.sex,
        birthdate: form.birthdate?.toISOString(),
        civil_status: form.civil_status,
        address: [form.address, form.zipCode],
        contact_number: form.contact_number,
      }
    );

    if (role == "admin") {
      await _updateDocument(
        env.DATABASE_PRIMARY,
        env.COLLECTION_ADMIN_INFO,
        user_id,
        {
          department: form.department,
        }
      );
    } else {
      await _updateDocument(
        env.DATABASE_PRIMARY,
        env.COLLECTION_STUDENT_INFO,
        user_id,
        {
          year_level: form.year_level,
          dept_prog: form.dept_prog,
        }
      );
    }

    return userInfo;
  } catch (error) {
    console.log(`database.updateUserInfo : ${error}`);
    throw Error("There was an error updating user information.");
  }
};