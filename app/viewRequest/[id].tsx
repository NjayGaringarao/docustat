import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useGlobalSearchParams } from "expo-router";
import Loading from "@/components/Loading";
import { color } from "@/constants/color";
import { RequestType } from "@/constants/models";
import Toast from "react-native-toast-message";
import CustomButton from "@/components/CustomButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import { deleteRequest, getRequest } from "@/services/request";
import StatusView from "@/components/StatusView";
import { useGlobalContext } from "@/context/GlobalProvider";
import UserInfoView from "@/components/UserInfoView";
import { confirmAction } from "@/lib/commonUtil";

const viewRequest = () => {
  const { userInfo, refreshUserRecord } = useGlobalContext();
  const searchParams = useGlobalSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState<string>();
  const [request, setRequest] = useState<RequestType>();

  const fetchRequest = async (id: string) => {
    try {
      setIsLoading(true);
      const request = await getRequest(id);
      setRequest(request);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "There was an error fetching the request.",
      });
      router.back();
    } finally {
      setIsLoading(false);
    }
  };

  const deleteHandle = async () => {
    try {
      if (
        !(await confirmAction(
          "Confirm Delete",
          "Do you want to delete this request?"
        ))
      )
        return;

      setIsLoading(true);
      const _request = await getRequest(request?.id!);

      if (_request.status != "pending")
        throw Error("The request is not pending and cannot be deleted.");

      await deleteRequest(request?.id!);
      refreshUserRecord({ requestList: true });
      Toast.show({
        type: "success",
        text1: "Request Deleted",
        text2:
          "Your request is succesfully deleted and will not be process anymore.",
      });
      router.back();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Failed to delete",
        text2: `${error}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchRequest(id);
    }
  }, [id]);

  useEffect(() => {
    if (searchParams) {
      setId(searchParams.id.toString());
    }
  }, [searchParams]);

  if (request && userInfo) {
    return (
      <View className="flex-1 bg-background">
        {/* Header */}
        <View className="h-16 w-full flex-row items-center gap-4 bg-primary pr-4">
          <CustomButton
            handlePress={() => router.back()}
            containerStyles="bg-transparent p-2"
          >
            <Ionicons name="arrow-back-sharp" size={24} color="black" />
          </CustomButton>
          <View>
            <Text className="text-xl font-bold text-uBlack">
              Request Details
            </Text>
            <Text className="text-sm text-uGray">Request ID: {request.id}</Text>
          </View>
        </View>

        {/* Content */}
        <ScrollView
          className="flex-1 px-4 py-6 gap-4mb-16"
          contentContainerStyle={{
            gap: 16,
          }}
        >
          <UserInfoView userInfo={userInfo} />
          {/* Request Info */}
          <View className="p-4 bg-background rounded-2xl shadow-md">
            <Text className="text-lg font-semibold mb-2">
              Request Information
            </Text>
            <Text className="text-uGray mb-1">
              <Text className="font-medium text-uBlack">Purpose:</Text>{" "}
              {request.purpose}
            </Text>
            <Text className="text-uGray mb-1">
              <Text className="font-medium text-uBlack">Created On:</Text>{" "}
              {new Date(request.created_at).toLocaleDateString()}
            </Text>
            <Text className="text-uGray">
              <Text className="font-medium text-uBlack">Last Updated:</Text>{" "}
              {new Date(request.updated_at).toLocaleDateString()}
            </Text>
          </View>

          {/* Document List */}
          <View className="p-4 bg-background rounded-2xl shadow-md">
            <Text className="text-lg font-semibold mb-2">
              Requested Documents
            </Text>
            {request.document.map((doc, index) => (
              <View key={index} className="flex-row items-start gap-2 mb-1">
                <Ionicons
                  name="document-text-outline"
                  size={20}
                  color={color.secondary}
                />
                <Text className="flex-1 text-uBlack font-medium">{doc}</Text>
              </View>
            ))}
          </View>

          {/* Request Note */}
          {request.request_note.length > 0 && (
            <View className="p-4 bg-background rounded-2xl shadow-md">
              <Text className="text-lg font-semibold mb-2">Request Note</Text>
              <Text className="text-sm italic text-uGray">
                "{request.request_note}"
              </Text>
            </View>
          )}

          {/* Status */}
          <StatusView request={request} />
        </ScrollView>
        {/* Footer */}
        <View className="w-full flex-row items-center justify-end bg-primary px-4 py-4 gap-2">
          <CustomButton
            title="Delete Request"
            textStyles="text-secondary"
            handlePress={deleteHandle}
            containerStyles="bg-transparent border-secondary border"
            isLoading={isLoading || request.status != "pending"}
          ></CustomButton>
        </View>

        {isLoading && (
          <View className="absolute w-full h-full items-center justify-center">
            <View className="absolute w-full h-full bg-white opacity-95" />
            <Loading
              loadingPrompt="Please wait"
              loadingColor={color.secondary}
            />
          </View>
        )}
      </View>
    );
  }
};
export default viewRequest;
