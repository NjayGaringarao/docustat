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
}

const TransactionTabBar = ({
  containerStyle,
  setActiveTab,
  activeTab,
}: ITabBar) => {
  return (
    <View
      className={`w-full flex-row justify-evenly items-center py-2 ${containerStyle}`}
    >
      {/* Pending Tab */}
      <TouchableOpacity
        onPress={() => setActiveTab("pending")}
        className="flex-1 items-center justify-center"
      >
        <MaterialIcons
          name="pending-actions"
          size={32}
          color={activeTab === "pending" ? color.secondary : color.uGray}
        />
        <Text
          className={`text-sm ${
            activeTab === "pending"
              ? "font-semibold text-secondary"
              : "font-normal text-uGray"
          }`}
        >
          Pending
        </Text>
      </TouchableOpacity>

      {/* Processing Tab */}
      <TouchableOpacity
        onPress={() => setActiveTab("processing")}
        className="flex-1 items-center justify-center"
      >
        <FontAwesome
          name="spinner"
          size={32}
          color={activeTab === "processing" ? color.secondary : color.uGray}
        />
        <Text
          className={`text-sm ${
            activeTab === "processing"
              ? "font-semibold text-secondary"
              : "font-normal text-uGray"
          }`}
        >
          Processing
        </Text>
      </TouchableOpacity>

      {/* Pickup Tab */}
      <TouchableOpacity
        onPress={() => setActiveTab("pickup")}
        className="flex-1 items-center justify-center"
      >
        <FontAwesome5
          name="inbox"
          size={32}
          color={activeTab === "pickup" ? color.secondary : color.uGray}
        />
        <Text
          className={`text-sm ${
            activeTab === "pickup"
              ? "font-semibold text-secondary"
              : "font-normal text-uGray"
          }`}
        >
          For Pickup
        </Text>
      </TouchableOpacity>

      {/* Fulfilled Tab */}
      <TouchableOpacity
        onPress={() => setActiveTab("complete")}
        className="flex-1 items-center justify-center"
      >
        <MaterialIcons
          name="assignment-turned-in"
          size={32}
          color={activeTab === "complete" ? color.secondary : color.uGray}
        />
        <Text
          className={`text-sm ${
            activeTab === "complete"
              ? "font-semibold text-secondary"
              : "font-normal text-uGray"
          }`}
        >
          Complete
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TransactionTabBar;
