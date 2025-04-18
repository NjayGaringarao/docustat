import { View, Text, Modal, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { NotificationType, RequestType } from "@/constants/models";
import Octicons from "@expo/vector-icons/Octicons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Loading from "../Loading";
import { getRequest } from "@/services/request";
import { color } from "@/constants/color";
import dayjs from "dayjs";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import CustomButton from "../CustomButton";
import { Href } from "expo-router";

interface IModalRequestNotification {
  notification: NotificationType;
  isVisible: boolean;
  handleOnClose: () => void;
  handleOnNavigate: (href: Href) => void;
}

const ModalRequestNotification = ({
  notification,
  isVisible,
  handleOnClose,
  handleOnNavigate,
}: IModalRequestNotification) => {
  const [request, setRequest] = useState<RequestType>();
  const [isLoading, setIsLoading] = useState(false);

  const queryRequest = async () => {
    try {
      setIsLoading(true);
      const fetchedRequest = await getRequest(notification.content[1]);
      setRequest(fetchedRequest);
    } catch (error) {
      console.error("Error fetching request:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (notification && notification.content[0] === "REQUEST") {
      queryRequest();
    }
  }, [notification]);

  const renderContent = () => {
    if (!request) return null;

    // Status Handling
    let statusText = (
      <View className={`px-4 py-2 rounded-xl bg-pending`}>
        <Text className="text-white font-bold">Request is Pending</Text>
      </View>
    );
    let icon = (
      <MaterialIcons name="pending-actions" size={84} color={color.pending} />
    );

    switch (notification.title) {
      case "Request PENDING":
        statusText = (
          <Text className="text-2xl text-gray-600 font-bold">
            Request is Pending
          </Text>
        );
        icon = (
          <MaterialIcons name="pending-actions" size={84} color={"#4b5563"} />
        );
        break;
      case "Request PROCESSING":
        statusText = (
          <Text className="text-2xl text-processing font-bold">
            Request is on Process
          </Text>
        );
        icon = (
          <FontAwesome name="spinner" size={84} color={color.processing} />
        );
        break;
      case "Request PICKUP":
        statusText = (
          <Text className="text-2xl text-forPickup font-bold">
            Ready for Pickup
          </Text>
        );
        icon = <FontAwesome5 name="inbox" size={84} color={color.pickup} />;
        break;
      case "Request SUCCESS":
        statusText = (
          <Text className="text-2xl text-complete font-bold">
            Transaction Success
          </Text>
        );
        icon = (
          <MaterialIcons
            name="assignment-turned-in"
            size={84}
            color={color.success}
          />
        );
        break;
      case "Request FAILED":
        statusText = (
          <Text className="text-2xl text-complete font-bold">
            Transaction Failed
          </Text>
        );
        icon = <MaterialIcons name="error" size={84} color={color.failed} />;
        break;
    }

    return (
      <View className="w-full items-start gap-4 px-4 pt-4">
        {/* Status Section */}
        <View className="items-center w-full">
          <View className="w-full items-center justify-center">
            {icon}
            {statusText}
          </View>
        </View>

        {/* Request Details */}
        <View className="w-full bg-background shadow-lg shadow-black pt-4 rounded-lg px-4 py-4">
          <Text className="text-lg font-bold text-uBlack">Request Details</Text>

          <ScrollView className="w-full max-h-72">
            {/* Purpose */}
            <View className="mt-2">
              <Text className="text-base font-semibold text-uGray">
                Purpose:
              </Text>
              <Text className="text-base text-uBlack">{request.purpose}</Text>
            </View>

            {/* Documents Requested */}
            <View className="mt-2">
              <Text className="text-base font-semibold text-uGray">
                Documents:
              </Text>
              {request.document.map((document, index) => (
                <View
                  key={index}
                  className="flex-row gap-4 text-base text-uBlack"
                >
                  <Text>{(index + 1).toString().concat(".")}</Text>
                  <Text>{document}</Text>
                </View>
              ))}
            </View>
            {/* Request Note */}
            {request.request_note && (
              <View className="mt-2">
                <Text className="text-base font-semibold text-uGray">
                  Request Note:
                </Text>
                <Text className="text-base text-uBlack">
                  "{request.request_note}"
                </Text>
              </View>
            )}
            {/* Remarks (Only for 'complete' or 'pickup' status) */}
            {(notification.title === "Request COMPLETE" ||
              request.status === "Request PICKUP") &&
              request.remarks && (
                <View className="w-full pt-4">
                  <Text className="text-base font-semibold text-uGray">
                    Remarks:
                  </Text>
                  <Text className="text-base text-uBlack">
                    "{request.remarks}"
                  </Text>
                </View>
              )}
          </ScrollView>
        </View>

        {/* Request Created At */}
        <View className="w-full">
          <Text className="text-base font-semibold text-uGray">
            Notification Issued At:
          </Text>
          <Text className="text-base text-uBlack">
            {dayjs(request.created_at).format("MMMM D, YYYY h:mm A")}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <View className="flex-1 justify-center items-center">
        <TouchableOpacity
          onPress={handleOnClose}
          className="absolute w-full h-full bg-black opacity-70"
        />
        {/* Main Modal */}
        <View className="bg-background py-6 px-4 w-11/12 rounded-xl items-center">
          {/* Close Button */}
          <TouchableOpacity
            className="absolute top-2 right-2 p-2"
            onPress={handleOnClose}
          >
            <Ionicons name="close" size={24} color={color.secondary} />
          </TouchableOpacity>

          {/* Content */}
          {isLoading ? (
            <View className="w-full h-24">
              <Loading
                loadingPrompt="Fetching request..."
                loadingColor={color.secondary}
              />
            </View>
          ) : request ? (
            renderContent()
          ) : (
            <View className="w-11/12 flex-row justify-center items-center gap-4">
              <Octicons name="repo-deleted" size={56} color={color.failed} />
              <Text className="text-lg text-center text-uBlack">
                The request you're querying no longer exists.
              </Text>
            </View>
          )}

          {/* OK Button */}
          {request && (
            <View className="w-full justify-items-end mt-6">
              <CustomButton
                title="View Request"
                handlePress={() =>
                  handleOnNavigate(`/viewRequest/${request.id}`)
                }
                containerStyles="bg-secondary"
              />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ModalRequestNotification;
