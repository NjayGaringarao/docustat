import { Models } from "react-native-appwrite";
import { Dispatch, SetStateAction } from "react";
import { UserCredentialType, RequestType, UserType } from "@/constants/models";
export interface RefreshUserRecordType {
  info?: boolean;
  credential?: boolean;
  requestList?: boolean;
  notificationList?: boolean;
}

export interface GlobalContextInterface {
  setUser: Dispatch<SetStateAction<Models.User<Models.Preferences> | null>>;
  setUserInfo: Dispatch<SetStateAction<UserType>>;
  setUserCredential: Dispatch<SetStateAction<UserCredentialType>>;
  setUserRequestList: Dispatch<SetStateAction<RequestType[]>>;
  setUserNotificationList: Dispatch<SetStateAction<NotificationType.Info[]>>;
  refreshUserRecord: (update: RefreshUserRecordType) => void;
  resetGlobalState: () => void;
  initializeGlobalState: () => Promise<void>;
  user: Models.User<Models.Preferences> | null;
  userInfo: UserType;
  userCredential: UserCredentialType;
  userRequestList: RequestType[];
  userNotificationList: NotificationType.Info[];
  fcmToken?: string;
  isLoading: boolean;
  isInternetConnection: boolean | null;
}
