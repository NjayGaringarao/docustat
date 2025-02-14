import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { NotificationType } from "@/constants/models";
import AdaptiveTime from "@/components/AdaptiveTime";
import { RefreshUserRecordType } from "@/context/context";
import ModalUpdate from "./ModalUpdate";
import { setNotificationViewed } from "@/services/notification";
import ModalRequestNotification from "./ModalRequestNotification";

interface NotificationItemProps {
  notification: NotificationType;
  isSelected: boolean;
  onLongPress: () => void;
  handleSelectNotification: (notification: NotificationType) => void;
  isSelectionOn: boolean;
  handleOnOpen: (notification: NotificationType) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  isSelected,
  onLongPress,
  handleSelectNotification,
  isSelectionOn,
  handleOnOpen,
}) => {
  return (
    <>
      <View className="h-auto w-fit rounded-md overflow-hidden">
        <TouchableOpacity
          onLongPress={onLongPress}
          onPress={
            isSelectionOn
              ? () => handleSelectNotification(notification)
              : () => handleOnOpen(notification)
          }
          className={`px-2 py-3 flex flex-row items-center gap-2 justify-between ${
            isSelected ? "bg-panel" : "bg-background"
          } ${!isSelected && !notification.isViewed && "bg-yellow-100"}`}
        >
          <View className="flex-1">
            <Text className="text-lg font-semibold text-gray-800">
              {notification.title}
            </Text>
            <Text
              className="text-sm font-light text-gray-800"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {notification.description?.replace(/\n/g, " ")}
            </Text>
          </View>
          <View className="items-center justify-center">
            <AdaptiveTime
              isoDate={notification.created_at.toISOString()}
              textStyles="text-sm text-gray-600"
              isIntervalShort
            />
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default NotificationItem;
