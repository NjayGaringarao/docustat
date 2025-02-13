import { View, Text, Modal, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { NotificationType, RequestType } from "@/constants/models";
import RequestItem from "../home/RequestItem";

interface ModalLinePostType {
  notification: NotificationType;
  isVisible: boolean;
  onClose: () => void;
}

const ModalLinePost = ({
  notification,
  isVisible,
  onClose,
}: ModalLinePostType) => {
  // const [post, setpost] = useState<PostType.Info>();
  const [request, setRequest] = useState<RequestType>(Object);
  const [isLoading, setIsLoading] = useState(false);

  const queryData = async () => {
    setIsLoading(true);
    try {
      setRequest({
        id: "2",
        document: ["Good Moral Certificate"],
        purpose: "Scholarship Application",
        request_note: "Needs to be ready by next week.",
        user_id: "user_002",
        status: "processing",
        remarks: "---",
        isSuccessful: false,
        updated_at: new Date(),
        created_at: new Date(),
      });
    } catch {}
    setIsLoading(false);
  };

  useEffect(() => {
    queryData();
  }, []);

  return (
    <Modal visible={isVisible} transparent animationType="none">
      <View className="flex-1 justify-center">
        <TouchableOpacity
          className="h-full w-full flex-1 absolute items-center bg-black opacity-80"
          onPress={onClose}
        />
        <RequestItem request={request} />
      </View>
    </Modal>
  );
};

export default ModalLinePost;
