import { UserCredentialType, UserType } from "@/constants/models";
import { GlobalContextInterface } from "./context";

export const emptyUserInfo: UserType = {
  id: "",
  name: ["", "", ""],
  avatar_url: "",
  address: ["", ""],
  created_at: new Date(0),
};

export const emptyUserCredential: UserCredentialType = {
  id: "",
  email: "",
  role: "",
};

export const defaultValue: GlobalContextInterface = {
  setUser: (e) => {},
  setUserInfo: (e) => {},
  setUserCredential: (e) => {},
  setUserRequestList: (e) => {},
  setUserNotificationList: (e) => {},
  refreshUserRecord: (e) => {},
  resetGlobalState: () => {},
  initializeGlobalState: async () => {},
  user: null,
  userInfo: emptyUserInfo,
  userCredential: emptyUserCredential,
  userRequestList: [],
  userNotificationList: [],
  fcmToken: undefined,
  isLoading: false,
  isInternetConnection: null,
};
