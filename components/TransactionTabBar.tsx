import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { color } from "@/constants/color";
import { TabBarType } from "@/constants/utils";

interface ITabBar {
  containerStyle?: string;
  setActiveTab: (e: TabBarType) => void;
  activeTab: TabBarType;
  itemCount: number;
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
      {/* Active Tab */}
      <TouchableOpacity
        onPress={() => setActiveTab("active")}
        className="items-center justify-center"
      >
        <FontAwesome
          name="spinner"
          size={48}
          color={activeTab === "active" ? color.secondary : color.uGrayLight}
        />
        <Text
          className={`text-sm ${
            activeTab === "active"
              ? "font-semibold text-secondary"
              : "font-normal text-uGrayLight"
          }`}
        >
          Active Request
        </Text>
        {!!(itemCount > 0) && (
          <View
            className={`absolute -top-2 -right-4 w-7 ${
              activeTab === "active" ? "bg-secondary" : "bg-uGrayLight"
            } items-center justify center rounded-full`}
          >
            <Text className="text-base font-black text-background">
              {itemCount > 99 ? "99+" : itemCount}
            </Text>
          </View>
        )}
      </TouchableOpacity>

      {/* other Tab */}
      <TouchableOpacity
        onPress={() => setActiveTab("archive")}
        className="items-center justify-center"
      >
        <FontAwesome
          name="archive"
          size={48}
          color={activeTab === "archive" ? color.secondary : color.uGrayLight}
        />
        <Text
          className={`text-sm ${
            activeTab === "archive"
              ? "font-semibold text-secondary"
              : "font-normal text-uGrayLight"
          }`}
        >
          Archive Request
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TransactionTabBar;
