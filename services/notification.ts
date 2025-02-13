import messaging from "@react-native-firebase/messaging";
import { Models, Query } from "react-native-appwrite";
import * as Notifications from "expo-notifications";
import { NotificationType } from "@/constants/models";
import { _listDocuments } from "./appwrite";
import { env } from "@/constants/env";
import { toUserNotificationList } from "@/lib/dataTransferObject";

// Retrieve FCM token and request permission
export const getFCMToken = async (setFcmToken?: (token: string) => void) => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      const fcmToken = await messaging().getToken();
      if (setFcmToken) setFcmToken(fcmToken);
      console.log(`FCM Token: ${fcmToken}`);
      return fcmToken;
    } else {
      console.log("Notification permission not granted for FCM.");
      return undefined;
    }
  };

  export const requestNotificationPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      console.log("Notification permission not granted!");
    }
  };


  export const setupPushTarget = async (
    user: Models.User<Models.Preferences>,
    fcmToken: string
  ) => {
    // TODO : Implement later
}

export const getUserNotificationList = async (
  user_id: string
): Promise<NotificationType[]> => {
  try {
    const result = await _listDocuments(
      env.DATABASE_PRIMARY,
      env.COLLECTION_NOTIFICATION,
      [Query.contains("user_id", user_id)]
    );

    return toUserNotificationList(result);
  } catch (error) {
    console.log(`notification.getUserNotificationList : ${error}`);
    throw error;
  }
};