import messaging from "@react-native-firebase/messaging";
import { Models } from "react-native-appwrite";

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



  export const setupPushTarget = async (
    user: Models.User<Models.Preferences>,
    fcmToken: string
  ) => {
    // TODO : Implement later
  }