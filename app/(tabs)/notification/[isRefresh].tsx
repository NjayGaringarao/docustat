import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { confirmAction, sortByDate } from "@/lib/commonUtil";
import CustomButton from "@/components/CustomButton";
import { NotificationType } from "@/constants/models";
import { color } from "@/constants/color";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Href, router, useGlobalSearchParams } from "expo-router";
import NotificationItem from "@/components/notification/notificationItem";
import EmptyRequestListItem from "@/components/requestItem/EmptyRequestListItem";
import { useGlobalContext } from "@/context/GlobalProvider";
import Loading from "@/components/Loading";
import {
  deleteNotification,
  setNotificationViewed,
} from "@/services/notification";
import ModalRequestNotification from "@/components/notification/ModalRequestNotification";

const Notification = () => {
  const searchParams = useGlobalSearchParams();
  const {
    refreshUserRecord,
    initializeGlobalState,
    userNotificationList,
    isInternetConnection,
  } = useGlobalContext();
  const [notificationList, setNotificationList] = useState<NotificationType[]>(
    []
  );
  const [isSelectionOn, setIsSelectionOn] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<
    NotificationType[]
  >([]);
  const [isRefreshing, setIsRefreshing] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [onViewNotification, setOnViewNotification] =
    useState<NotificationType>();

  const handleSelectNotification = (notification: NotificationType) => {
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
      await deleteNotification(selectedNotification);
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
    setNotificationList(sortByDate(userNotificationList));
    setIsRefreshing(false);
  };

  const onRefreshHandle = () => {
    if (!isInternetConnection) return;
    setIsRefreshing(true);
    refreshUserRecord({ notificationList: true });
  };

  useEffect(() => {
    setupHandle();
  }, [userNotificationList]);

  useEffect(() => {
    if (selectedNotification.length === 0) setIsSelectionOn(false);
  }, [selectedNotification]);

  useEffect(() => {
    if (!searchParams) return;
    if (searchParams.isRefresh == "true") {
      setIsRefreshing(true);
      initializeGlobalState();
    }
  }, [searchParams]);

  const handleOnOpen = async (notification: NotificationType) => {
    if (!notification.isViewed) {
      await setNotificationViewed(notification.id);
      onRefreshHandle();
    }
    setIsModalVisible(true);
    setOnViewNotification(notification);
  };

  const handleClose = async () => {
    setOnViewNotification(undefined);
    setIsModalVisible(false);
  };

  const handleOnNavigate = (href: Href) => {
    setOnViewNotification(undefined);
    setIsModalVisible(false);
    router.push(href);
  };

  return (
    <View className="flex-1 bg-background">
      <View className="flex-row justify-between items-center mx-2">
        <Text className="font-black text-secondary text-3xl mt-4 mb-2">
          Notification
        </Text>
        <CustomButton
          handlePress={onRefreshHandle}
          containerStyles="bg-transparent"
        >
          <FontAwesome name="refresh" size={24} color={color.secondary} />
        </CustomButton>
      </View>
      <View className="flex-1 mx-2 mb-4 rounded-xl ">
        {!isRefreshing && (
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
                  onLongPress={() => {
                    setIsSelectionOn(true);
                    handleSelectNotification(item);
                  }}
                  handleSelectNotification={(e: NotificationType) => {
                    handleSelectNotification(e);
                  }}
                  isSelectionOn={isSelectionOn}
                  handleOnOpen={handleOnOpen}
                />
              );
            }}
            ListEmptyComponent={
              <EmptyRequestListItem message="You don't have a notification." />
            }
            onRefresh={onRefreshHandle}
            refreshing={isRefreshing}
          />
        )}
      </View>
      {isSelectionOn && (
        <View className="h-auto py-2 flex-row w-full justify-between items-center px-2 bg-panel">
          <Text className="text-lg self-center font-semibold">
            Selected: {selectedNotification.length}
          </Text>
          <View className="flex-row w-fit place-self-end gap-2">
            <CustomButton
              title="Delete"
              handlePress={deleteNotificationHandle}
              containerStyles="w-24 bg-secondary"
            />
            <CustomButton
              title="Cancel"
              handlePress={() => {
                setSelectedNotification([]);
                setIsSelectionOn(false);
              }}
              containerStyles="border border-secondary h-10 w-24 bg-transparent"
              textStyles="text-secondary"
            />
          </View>
        </View>
      )}

      {isModalVisible && onViewNotification && (
        <ModalRequestNotification
          notification={onViewNotification}
          isVisible={isModalVisible}
          handleOnClose={handleClose}
          handleOnNavigate={handleOnNavigate}
        />
      )}
      {isRefreshing && (
        <View className="absolute h-full w-full items-center justify-center">
          <View className=" absolute h-full w-full bg-background opacity-90 " />
          <View className="items-center justify-center">
            <Loading
              loadingPrompt="Please wait"
              loadingColor={color.secondary}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default Notification;
