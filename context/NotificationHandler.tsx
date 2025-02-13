import { getCurrentUser } from "@/services/appwrite";
import { getUserCredential } from "@/services/user";
import messaging from "@react-native-firebase/messaging";
import * as Notifications from "expo-notifications";
import { router } from "expo-router";

const handleNotification = (refreshNotificationHandler: () => void) => {
  // Handle notifications when the app is in the foreground
  messaging().onMessage(async (remoteMessage) => {
    refreshNotificationHandler();
  });

  // Handle notifications that open the app from the background
  messaging().onNotificationOpenedApp(async (remoteMessage) => {
    console.log(
      "Notification caused app to open from background:",
      remoteMessage.notification
    );
    const user = await getCurrentUser();

    if (user) {
      const userCredential = await getUserCredential(user.$id);
      if (userCredential.role == "student") {
        router.navigate("/(tabs)/notification/true");
      } else {
        router.navigate("/(tabsAdmin)/home");
      }
    } else {
      router.navigate("/");
    }
  });

  // Handle notifications when the app is in a quit state
  messaging()
    .getInitialNotification()
    .then(async (remoteMessage) => {
      if (remoteMessage) {
        console.log(
          "Notification caused the app to open from quit state:",
          remoteMessage.notification
        );
        const user = await getCurrentUser();

        if (user) {
          const userCredential = await getUserCredential(user.$id);
          if (userCredential.role == "student") {
            router.navigate("/(tabs)/notification/true");
          } else {
            router.navigate("/(tabsAdmin)/home");
          }
        } else {
          router.navigate("/");
        }
      }
    });

  // Handle notifications through Expo Notifications API
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  return null;
};

export default handleNotification;
