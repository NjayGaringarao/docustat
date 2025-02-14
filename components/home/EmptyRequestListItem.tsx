import { View, Text } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { color } from "@/constants/color";

interface EmptyRequestListItemProps {
  message?: string;
}

const EmptyRequestListItem: React.FC<EmptyRequestListItemProps> = ({
  message = "No requests available.",
}) => {
  return (
    <View className="flex items-center justify-center p-6 bg-background mx-4 my-4 rounded-lg shadow-xl">
      {/* Icon Section */}
      <MaterialIcons
        name="hourglass-empty"
        size={48}
        color={color.uGrayLight}
      />

      {/* Message Section */}
      <Text className="text-lg font-medium text-uGray mt-4 text-center">
        {message}
      </Text>
    </View>
  );
};

export default EmptyRequestListItem;
