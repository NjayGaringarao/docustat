import { View, Text, Modal, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { NotificationType, RequestType } from "@/constants/models";
import RequestItem from "../home/RequestItem";

interface IModalRequestNotification {
  notification: NotificationType;
  isVisible: boolean;
  handleOnClose: () => void;
}

const ModalRequestNotification = ({
  notification,
  isVisible,
  handleOnClose,
}: IModalRequestNotification) => {
  const [request, setRequest] = useState<RequestType>();
  const [isLoading, setIsLoading] = useState(false);

  const queryData = async () => {
    setIsLoading(true);
    try {
    } catch {}
    setIsLoading(false);
  };

  useEffect(() => {
    queryData();
  }, []);

  if (notification.content[0] == "request")
    return (
      <Modal visible={isVisible} transparent animationType="none">
        <View className="flex-1 justify-center items-center">
          <TouchableOpacity
            className="h-full w-full absolute items-center justify-center bg-black opacity-80"
            onPress={handleOnClose}
          />
          <View className="bg-background h-96 w-11/12 rounded-xl"></View>
          {/* {request && (

            )} */}
        </View>
      </Modal>
    );
};

export default ModalRequestNotification;
