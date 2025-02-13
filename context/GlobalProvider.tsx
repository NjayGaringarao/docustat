import { Models } from "react-native-appwrite";
import { GlobalContextInterface, RefreshUserRecordType } from "./context";
import { defaultValue, emptyUserCredential, emptyUserInfo } from "./values";
import { router } from "expo-router";
import { useNetInfo } from "@react-native-community/netinfo";
import { getCurrentUser, getSession } from "@/services/appwrite";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  UserType,
  UserCredentialType,
  RequestType,
  NotificationType,
} from "@/constants/models";
import Toast from "react-native-toast-message";
import {
  getFCMToken,
  getUserNotificationList,
  requestNotificationPermissions,
  setupPushTarget,
} from "@/services/notification";
import handleNotification from "./NotificationHandler";
import { getUserCredential, getUserInfo } from "@/services/user";
import { getUserRequestList } from "@/services/request";

export const GlobalContext =
  createContext<GlobalContextInterface>(defaultValue);

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const { isInternetReachable } = useNetInfo();
  const [isInternetConnection, setIsInternetConnection] =
    useState<boolean>(false);
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );
  const [userInfo, setUserInfo] = useState<UserType>(emptyUserInfo);
  const [userCredential, setUserCredential] =
    useState<UserCredentialType>(emptyUserCredential);
  const [userRequestList, setUserRequestList] = useState<RequestType[]>([]);
  const [userNotificationList, setUserNotificationList] = useState<
    NotificationType[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fcmToken, setFcmToken] = useState<string>();

  const initializeGlobalState = async () => {
    try {
      setIsLoading(true);

      await requestNotificationPermissions();

      const currentUser = await getCurrentUser();

      if (currentUser) {
        setUser(currentUser);
        const fcm = await getFCMToken(setFcmToken);
        if (fcm) await setupPushTarget(await getSession(), fcm);
        handleNotification(async () => {
          setUserNotificationList(
            await getUserNotificationList(currentUser.$id)
          );
        });
        const [_info, _userCredential, _userRequestList, _notificationsList] =
          await Promise.all([
            getUserInfo(currentUser.$id),
            getUserCredential(currentUser.$id),
            getUserRequestList(currentUser.$id),
            getUserNotificationList(currentUser.$id),
          ]);

        setUserInfo(_info);
        setUserCredential(_userCredential);
        setUserRequestList(_userRequestList);
        setUserNotificationList(_notificationsList);

        if (currentUser) {
          console.log("User role:", _userCredential.role);
          if (_userCredential.role == "admin") {
            router.replace("/(tabsAdmin)/home");
          } else {
            router.replace("/(tabs)/home");
          }
        } else {
          router.replace("/(auth)/sign_in");
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initializeGlobalState();
  }, []);

  useEffect(() => {
    const promptInternetStatus = async () => {
      if (isInternetReachable === null) return;
      if (isInternetReachable) {
        setIsInternetConnection(true);
      } else {
        Toast.show({
          type: "info",
          text1: "No Internet",
          text2: "Please Connect to the internet",
        });

        setIsInternetConnection(false);
      }
    };

    promptInternetStatus();
  }, [isInternetReachable]);

  const refreshUserRecord = async ({
    info,
    credential,
    requestList,
    notificationList,
  }: RefreshUserRecordType) => {
    if (!user?.$id) return;

    const updates = [];

    if (info) updates.push(getUserInfo(user.$id).then(setUserInfo));
    if (credential)
      updates.push(getUserCredential(user.$id).then(setUserCredential));
    if (requestList)
      updates.push(getUserRequestList(user.$id).then(setUserRequestList));
    if (notificationList) {
      updates.push(
        getUserNotificationList(user.$id).then(setUserNotificationList)
      );
    }

    await Promise.all(updates);
  };

  const resetGlobalState = () => {
    setUser(null);
    setUserInfo(emptyUserInfo);
    setUserCredential(emptyUserCredential);
    setUserRequestList([]);
    setUserNotificationList([]);
    setIsLoading(false);
    setFcmToken(undefined);
  };

  return (
    <GlobalContext.Provider
      value={{
        setUser,
        setUserInfo,
        setUserCredential,
        setUserRequestList,
        setUserNotificationList,
        refreshUserRecord,
        resetGlobalState,
        initializeGlobalState,
        user,
        userInfo,
        userCredential,
        userRequestList,
        userNotificationList,
        fcmToken,
        isLoading,
        isInternetConnection,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
