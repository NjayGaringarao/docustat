import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Tabs } from "expo-router";
import { color } from "@/constants/color";
import { StatusBar } from "expo-status-bar";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NotificationType } from "@/constants/models";
import { useGlobalContext } from "@/context/GlobalProvider";

const layout = () => {
  const { userNotificationList } = useGlobalContext();
  const [totalUnread, setTotalUnread] = useState(0);

  useEffect(() => {
    setTotalUnread(
      userNotificationList.filter(
        (notif: NotificationType) => notif.isViewed === false
      ).length
    );
  }, [userNotificationList]);

  return (
    <>
      <View className="p-4 h-20 bg-primary justify-center items-end">
        <Text
          className="text-4xl text-secondary"
          style={{
            fontFamily: "Merriweather",
            textShadowRadius: 10,
            textShadowColor: "#4b5563",

            textShadowOffset: { width: 2, height: 2 },
          }}
        >
          DocuStats
        </Text>
      </View>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: color.primary,
            height: 64,
          },
          tabBarShowLabel: false,
          tabBarIconStyle: {
            height: 42,
            width: 42,
            margin: 8,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "home-sharp" : "home-outline"}
                size={36}
                color={color.secondary}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="newRequest"
          options={{
            title: "Add",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "add-circle-sharp" : "add-circle-outline"}
                size={36}
                color={color.secondary}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "person-sharp" : "person-outline"}
                size={36}
                color={color.secondary}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="notification/[isRefresh]"
          options={{
            title: "Notification",
            tabBarIcon: ({ focused }) => (
              <View className="relative">
                <Ionicons
                  name={
                    focused ? "notifications-sharp" : "notifications-outline"
                  }
                  size={36}
                  color={color.secondary}
                />
                {!!(totalUnread > 0) && (
                  <View className="absolute -top-2 -right-2 w-5 bg-panel items-center justify center rounded-full">
                    <Text className="text-sm font-black text-primary">
                      {totalUnread > 99 ? "99+" : totalUnread}
                    </Text>
                  </View>
                )}
              </View>
            ),
          }}
        />
      </Tabs>

      <StatusBar backgroundColor={color.primary} style="auto" />
    </>
  );
};

export default layout;
