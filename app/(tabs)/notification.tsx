import { View, Text, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { confirmAction, sortByDate } from "@/lib/commonUtil";
import CustomButton from "@/components/CustomButton";
import { NotificationType } from "@/constants/models";
import { color } from "@/constants/color";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useGlobalSearchParams } from "expo-router";
import NotificationItem from "@/components/notification/notificationItem";
import EmptyRequestListItem from "@/components/home/EmptyRequestListItem";

const Notification = () => {
  const searchParams = useGlobalSearchParams();
  // const { refreshUserRecord, userNotification, isInternetConnection } =
  //   useGlobalContext();
  const [notificationList, setNotificationList] = useState<
    NotificationType.Info[]
  >([]);
  const [isSelectionOn, setIsSelectionOn] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<
    NotificationType.Info[]
  >([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleSelectNotification = (notification: NotificationType.Info) => {
    setSelectedNotification((prev) =>
      prev.find(
        (selectedNotification) => selectedNotification.id === notification.id
      )
        ? prev.filter(
            (selectedNotification) =>
              selectedNotification.id !== notification.id
          )
        : [...prev, notification]
    );
  };

  const deleteNotificationHandle = async () => {
    if (
      !(await confirmAction(
        "Delete Notification",
        "You may not be able to access its content again if deleted."
      ))
    )
      return;

    setIsRefreshing(true);

    try {
      // await deleteNotification(selectedNotification);
      setSelectedNotification([]);
    } catch {
      console.log(
        `notification.tsx => deleteNotificationHandle :: ERROR Deleting`
      );
    } finally {
      setIsSelectionOn(false);
      onRefreshHandle();
    }
  };

  const setupHandle = () => {
    // setNotificationList(sortByDate(userNotification));
    setIsRefreshing(false);
  };

  const onRefreshHandle = () => {
    // if (!isInternetConnection) return;
    setIsRefreshing(true);
    // refreshUserRecord({ notification: true });
  };

  // useEffect(() => {
  //   setupHandle();
  // }, [userNotification]);

  useEffect(() => {
    if (selectedNotification.length === 0) setIsSelectionOn(false);
  }, [selectedNotification]);

  useEffect(() => {
    if (!searchParams) return;
    if (searchParams.isRefresh == "true") {
      setIsRefreshing(true);
      // refreshUserRecord({
      //   info: true,
      //   line: true,
      //   post: true,
      //   notification: true,
      // });
    }
  }, [searchParams]);

  return (
    <View className="flex-1 bg-background">
      <View className="flex-row justify-between items-center">
        <Text className="font-bold text-uBlack text-2xl my-4 mx-2">
          NOTIFICATION
        </Text>
        <CustomButton
          handlePress={onRefreshHandle}
          containerStyles="bg-transparent"
        >
          <FontAwesome name="refresh" size={24} color={color.secondary} />
        </CustomButton>
      </View>
      <View className="flex-1 mx-2 mb-4 px-2 py-4 rounded-xl bg-panel ">
        <FlatList
          data={notificationList}
          className="flex-1 mb-2"
          keyExtractor={(notification, index) => index.toString()}
          renderItem={({ item }) => {
            const isSelected = selectedNotification.some(
              (selectedNotification) => selectedNotification.id === item.id
            );

            return (
              <NotificationItem
                notification={item}
                isSelected={isSelected}
                refreshUserRecord={(e) => {}}
                onLongPress={() => {
                  setIsSelectionOn(true);
                  handleSelectNotification(item);
                }}
                handleSelectNotification={(e: NotificationType.Info) => {
                  handleSelectNotification(e);
                }}
                isSelectionOn={isSelectionOn}
              />
            );
          }}
          ListEmptyComponent={
            <EmptyRequestListItem message="You don't have a notification." />
          }
          onRefresh={onRefreshHandle}
          refreshing={isRefreshing}
        />
        {isSelectionOn && (
          <View className="h-auto py-2 flex-row w-full justify-between items-center px-2 bg-panel">
            <Text className="text-base self-center">
              Selected: {selectedNotification.length}
            </Text>
            <View className="flex-row w-fit place-self-end">
              <CustomButton
                title="Delete"
                handlePress={deleteNotificationHandle}
                containerStyles="w-24"
              />
              <CustomButton
                title="Cancel"
                handlePress={() => {
                  setSelectedNotification([]);
                  setIsSelectionOn(false);
                }}
                containerStyles="border-2 border-primary h-10 w-24 bg-transparent"
                textStyles="text-primary"
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default Notification;
