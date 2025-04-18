import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { color } from "@/constants/color";
import { RequestType } from "@/constants/models";

interface ProcessingItemProps {
  request: RequestType;
  onPress: () => void;
}
const ProcessingItem: React.FC<ProcessingItemProps> = ({
  request,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-background my-2 rounded-lg shadow-lg overflow-hidden border border-processing"
    >
      {/* Header Section */}
      <View className="flex-row justify-between items-center mb-2 bg-processing px-4 py-2">
        <View className="flex-1 justify-start">
          <Text className="text-lg font-semibold text-white">
            {request.purpose}
          </Text>
          <Text className="text-gray-200 text-sm -mt-1">{request.id}</Text>
        </View>

        <MaterialIcons name="hourglass-top" size={32} color={color.white} />
      </View>
      <View className="px-4">
        {/* Details Section */}
        <View className="mb-2">
          <Text className="text-uGray text-sm">Requested Document : </Text>

          <View className="flex-1 ml-4 flex-row justify-between">
            <View className="flex-row items-start justify-start gap-2 px-4">
              <Text className="text-uBlack text-sm">1.</Text>
              <Text className=" text-uBlack font-semibold text-sm">
                {request.document[0]}
              </Text>
            </View>
            {request.document.length > 1 && (
              <View className="border-l border-uGrayLight flex-1 justify-center">
                <Text className="text-uGray text-sm text-center">
                  and {request.document.length - 1} more document/s.
                </Text>
              </View>
            )}
          </View>
        </View>
        <View className="w-full flex-row justify-between items-center border-t border-uGrayLight py-2">
          <Text className="text-uGray text-sm">
            Created:{" "}
            <Text className="text-uBlack text-sm">
              {new Date(request.created_at).toLocaleDateString()}
            </Text>
          </Text>

          <Text className="text-uGray text-sm">
            Last Updated:{" "}
            <Text className="text-uBlack">
              {new Date(request.updated_at).toLocaleDateString()}
            </Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProcessingItem;
