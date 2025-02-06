import { env } from "@/constants/env";
import { _executeFunction, _getDocument, signInUser } from "./appwrite";

interface ICreateStudentAccount {
  student_id: string;
  email: string;
  password: string;
  name: [string, string | undefined, string];
  dept_prog: string;
  year_level: string;
  avatar_url: string;
}
export const createStudentAccount = async (param: ICreateStudentAccount) => {
  try {
    const result = await _executeFunction(
      env.FUNCTION_ACCOUNT,
      "createStudentAccount",
      param
    );
    if (result.responseStatusCode != 200) {
      throw Error("a");
    }
  } catch (error) {
    console.log("auth.createStudentAccount : ", error);
    throw Error("There was a problem creating your account.");
  }
};

interface ICreatepAdminAccount {
  employee_id: string;
  email: string;
  password: string;
  name: [string, string | undefined, string];
  department: string;
  avatar_url: string;
}
export const createAdminAccount = async (param: ICreatepAdminAccount) => {
  try {
    const result = await _executeFunction(
      env.FUNCTION_ACCOUNT,
      "createAdminAccount",
      param
    );

    if (result.responseStatusCode != 200) {
      throw Error("a");
    }
  } catch (error) {
    console.log("auth.createAdminAccount : ", error);
    throw Error("There was a problem creating your account.");
  }
};

export const deleteUserAccount = async (user_id: string, password: string) => {
  try {
    const result = await _executeFunction(
      env.FUNCTION_ACCOUNT,
      "deleteUserAccount",
      {
        user_id: user_id,
        password: password,
      }
    );

    if (result.responseStatusCode == 500) {
      throw Error("a");
    }
  } catch (error) {
    console.log("auth.deleteUserAccount : ", error);
    if (error == "Error: a") {
      throw Error("Wrong password.");
    } else {
      throw Error("There was a problem deleting your account.");
    }
  }
};

export const studentSignIn = async (student_id: string, password: string) => {
  try {
    const credential = await _getDocument(
      env.DATABASE_PRIMARY,
      env.COLLECTION_CREDENTIAL,
      student_id
    );

    if (credential.role != "student") throw Error("a");

    return await signInUser(credential.email, password);
  } catch (error) {
    if (
      error ==
      "AppwriteException: Document with the requested ID could not be found."
    ) {
      throw Error("The provided Student Number is not a registered account.");
    } else if (error == "Error: a") {
      throw Error("Invalid Student Number.");
    } else if (
      error ==
      "AppwriteException: Invalid credentials. Please check the email and password."
    ) {
      throw Error("Incorrect password.");
    } else {
      console.log("auth.studentSignIn : ", error);
      throw Error("There was a problem signing in to your account.");
    }
  }
};

export const adminSignIn = async (admin_id: string, password: string) => {
  try {
    const credential = await _getDocument(
      env.DATABASE_PRIMARY,
      env.COLLECTION_CREDENTIAL,
      admin_id
    );

    if (credential.role != "admin") throw Error("a");

    return await signInUser(credential.email, password);
  } catch (error) {
    if (
      error ==
      "AppwriteException: Document with the requested ID could not be found."
    ) {
      throw Error("Student ID is not a registered account.");
    } else if (error == "Error: a") {
      throw Error("Invalid Employee Number.");
    } else if (
      error ==
      "AppwriteException: Invalid credentials. Please check the email and password."
    ) {
      throw Error("Incorrect password.");
    } else {
      console.log("auth.studentSignIn : ", error);
      throw Error("There was a problem signing in to your account.");
    }
  }
};

export const emailPasswordSignIn = async (email: string, password: string) => {
  try {
    return await signInUser(email, password);
  } catch (error) {
    throw Error("There was a problem signing in to your account.");
  }
};
