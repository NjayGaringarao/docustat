import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { color } from "@/constants/color";
import { TabBarType } from "@/constants/utils";

interface ITabBar {
  containerStyle?: string;
  setActiveTab: (e: TabBarType) => void;
  activeTab: TabBarType;
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
          <View
            className={`absolute -top-2 -right-4 w-7 ${
              activeTab === "pending" ? "bg-secondary" : "bg-uGrayLight"
            } items-center justify center rounded-full`}
          >
            <Text className="text-base font-black text-background">
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
          <View
            className={`absolute -top-2 -right-4 w-7 ${
              activeTab === "processing" ? "bg-secondary" : "bg-uGrayLight"
            } items-center justify center rounded-full`}
          >
            <Text className="text-base font-black text-background">
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
          <View
            className={`absolute -top-2 -right-4 w-7 ${
              activeTab === "pickup" ? "bg-secondary" : "bg-uGrayLight"
            } items-center justify center rounded-full`}
          >
            <Text className="text-base font-black text-background">
              {itemCount.pickup > 99 ? "99+" : itemCount.pickup}
            </Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Other Tab */}
      <TouchableOpacity
        onPress={() => setActiveTab("other")}
        className="items-center justify-center"
      >
        <MaterialIcons
          name="assignment-turned-in"
          size={32}
          color={activeTab === "other" ? color.secondary : color.uGrayLight}
        />
        <Text
          className={`text-sm ${
            activeTab === "other"
              ? "font-semibold text-secondary"
              : "font-normal text-uGrayLight"
          }`}
        >
          Other
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TransactionTabBar;
