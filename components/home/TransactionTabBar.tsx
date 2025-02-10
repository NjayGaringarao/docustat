import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { color } from "@/constants/color";
import { RequestStatusType } from "@/constants/utils";

interface ITabBar {
  containerStyle?: string;
  setActiveTab: (e: RequestStatusType) => void;
  activeTab: RequestStatusType;
  itemCount: {
    pending: number;
    processing: number;
    pickup: number;
  };
}

const TransactionTabBar = ({
  containerStyle,
  setActiveTab,
  activeTab,
  itemCount,
}: ITabBar) => {
  return (
    <View
      className={`w-full flex-row justify-evenly items-center py-2 ${containerStyle}`}
    >
      {/* Pending Tab */}
      <TouchableOpacity
        onPress={() => setActiveTab("pending")}
        className="items-center justify-center"
      >
        <MaterialIcons
          name="pending-actions"
          size={32}
          color={activeTab === "pending" ? color.secondary : color.uGrayLight}
        />
        <Text
          className={`text-sm ${
            activeTab === "pending"
              ? "font-semibold text-secondary"
              : "font-normal text-uGrayLight"
          }`}
        >
          Pending
        </Text>
        {!!(itemCount.pending > 0) && (
          <View className="absolute -top-2 -right-4 w-7 bg-primary items-center justify center rounded-full">
            <Text className="text-base font-black text-uBlack">
              {itemCount.pending > 99 ? "99+" : itemCount.pending}
            </Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Processing Tab */}
      <TouchableOpacity
        onPress={() => setActiveTab("processing")}
        className="items-center justify-center"
      >
        <FontAwesome
          name="spinner"
          size={32}
          color={
            activeTab === "processing" ? color.secondary : color.uGrayLight
          }
        />
        <Text
          className={`text-sm ${
            activeTab === "processing"
              ? "font-semibold text-secondary"
              : "font-normal text-uGrayLight"
          }`}
        >
          Processing
        </Text>
        {!!(itemCount.processing > 0) && (
          <View className="absolute -top-2 -right-4 w-7 bg-primary items-center justify center rounded-full">
            <Text className="text-base font-black text-uBlack">
              {itemCount.processing > 99 ? "99+" : itemCount.processing}
            </Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Pickup Tab */}
      <TouchableOpacity
        onPress={() => setActiveTab("pickup")}
        className="items-center justify-center"
      >
        <FontAwesome5
          name="inbox"
          size={32}
          color={activeTab === "pickup" ? color.secondary : color.uGrayLight}
        />
        <Text
          className={`text-sm ${
            activeTab === "pickup"
              ? "font-semibold text-secondary"
              : "font-normal text-uGrayLight"
          }`}
        >
          For Pickup
        </Text>
        {!!(itemCount.pickup > 0) && (
          <View className="absolute -top-2 -right-4 w-7 bg-primary items-center justify center rounded-full">
            <Text className="text-base font-black text-uBlack">
              {itemCount.pickup > 99 ? "99+" : itemCount.pickup}
            </Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Fulfilled Tab */}
      <TouchableOpacity
        onPress={() => setActiveTab("complete")}
        className="items-center justify-center"
      >
        <MaterialIcons
          name="assignment-turned-in"
          size={32}
          color={activeTab === "complete" ? color.secondary : color.uGrayLight}
        />
        <Text
          className={`text-sm ${
            activeTab === "complete"
              ? "font-semibold text-secondary"
              : "font-normal text-uGrayLight"
          }`}
        >
          Complete
        </Text>
        
      </TouchableOpacity>
    </View>
  );
};

export default TransactionTabBar;
