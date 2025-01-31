import { Models } from "react-native-appwrite";
import { Dispatch, SetStateAction } from "react";
import { RequestType, UserType } from "@/constants/models";
export interface RefreshUserRecordType {
  info?: boolean;
  credential?: boolean;
  request?: boolean;
  notification?: boolean;
}

export interface GlobalContextInterface {
  setUser: Dispatch<SetStateAction<Models.User<Models.Preferences> | null>>;
  setUserInfo: Dispatch<SetStateAction<UserType.Info>>;
  setUserCredential: Dispatch<SetStateAction<UserType.Credentials>>;
  setUserRequest: Dispatch<SetStateAction<RequestType.Info[]>>;
  setUserNotification: Dispatch<SetStateAction<NotificationType.Info[]>>;
  refreshUserRecord: (update: RefreshUserRecordType) => void;
  resetGlobalState: () => void;
  initializeGlobalState: () => Promise<void>;
  user: Models.User<Models.Preferences> | null;
  userInfo: UserType.Info;
  userCredential: UserType.Credential;
  userRequest: RequestType.Info[];
  userNotification: NotificationType.Info[];
  fcmToken?: string;
  isLoading: boolean;
  isInternetConnection: boolean | null;
}
