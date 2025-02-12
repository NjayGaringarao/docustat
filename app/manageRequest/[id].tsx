import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { router, useGlobalSearchParams } from "expo-router";
import Loading from "@/components/Loading";
import { color } from "@/constants/color";
import { RequestType, UserType } from "@/constants/models";
import { getRequest, getUserInfo } from "@/services/database";
import Toast from "react-native-toast-message";
import CustomButton from "@/components/CustomButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import UserInfoView from "@/components/UserInfoView";
import StatusSetter from "@/components/admin/StatusSetter";

const manageRequest = () => {
  const searchParams = useGlobalSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isChanged, setIsChanged] = useState(false);
  const [id, setId] = useState<string>();
  const [request, setRequest] = useState<RequestType>();
  const [userInfo, setUserInfo] = useState<UserType>();
  const resetRef = useRef<() => void>(() => {});
  const saveRef = useRef<() => void>(() => {});

  const fetchRequest = async (id: string) => {
    try {
      setIsLoading(true);
      const request = await getRequest(id);
      setRequest(request);
      const userInfo = await getUserInfo(request.user_id);
      setUserInfo(userInfo);
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

  if (request && userInfo && !isLoading) {
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
          <View className="p-4 bg-panel rounded-2xl shadow-md">
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
          <View className="p-4 bg-panel rounded-2xl shadow-md">
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
            <View className="p-4 bg-panel rounded-2xl shadow-md">
              <Text className="text-lg font-semibold mb-2">Request Note</Text>
              <Text className="text-sm italic text-uGray">
                "{request.request_note}"
              </Text>
            </View>
          )}

          {/* Status */}
          <StatusSetter
            request={request}
            setIsChanged={setIsChanged}
            resetRef={resetRef}
            saveRef={saveRef}
            refreshRequest={() => (id ? fetchRequest(id) : {})}
          />
        </ScrollView>

        {/* Footer */}
        <View className="w-full flex-row items-center justify-end bg-primary px-4 py-4 gap-2">
          <CustomButton
            title="Save Changes"
            handlePress={() => saveRef.current?.()}
            containerStyles="bg-secondary"
            isLoading={!isChanged || isLoading}
          ></CustomButton>
          <CustomButton
            title="Reset"
            textStyles="text-secondary"
            handlePress={() => resetRef.current?.()}
            containerStyles="bg-transparent border-secondary border"
          ></CustomButton>
        </View>
      </View>
    );
  } else {
    return (
      <View className="absolute w-full h-full items-center justify-center">
        <View className="absolute w-full h-full bg-white opacity-95" />
        <Loading loadingPrompt="Please wait" loadingColor={color.secondary} />
      </View>
    );
  }
};
export default manageRequest;
