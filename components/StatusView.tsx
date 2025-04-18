import { View, Text, ScrollView } from "react-native";
import React from "react";
import { RequestType } from "@/constants/models";

interface IStatusView {
  request: RequestType;
}

const StatusView = ({ request }: IStatusView) => {
  return (
    <View className="p-4 bg-background rounded-2xl shadow-md items-center mb-20">
      <View className="w-full flex-row justify-between items-center">
        <Text className="text-uBlack text-lg font-black">STATUS</Text>
        <View className="flex-row items-center">
          {/* Status Indicator */}
          <View
            className={`w-32 py-2 items-center ${
              request.status === "pending"
                ? "bg-pending"
                : request.status === "processing"
                ? "bg-processing"
                : request.status === "pickup"
                ? "bg-pickup"
                : request.status == "success"
                ? "bg-success"
                : "bg-failed"
            }`}
          >
            <Text className="text-white font-semibold">
              {request.status.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>

      {/* Remarks when status is 'pickup', 'failed' or 'success' */}
      {["pickup", "failed", "success"].includes(request.status) &&
        request.remarks.length > 0 && (
          <View className="gap-2 mt-4 items-start w-full">
            <View className="gap-2 flex-row w-full">
              <Text className="text-base font-medium text-uGray">
                Admin Message :
              </Text>
              <Text className="flex-1 text-uBlack text-base font-semibold">
                {request.remarks}
              </Text>
            </View>

            <View className="gap-2 flex-row w-full">
              <Text className="text-base font-medium text-uGray">
                Amount Payable :
              </Text>
              <Text className="flex-1 text-uBlack text-base font-semibold">
                {"PHP ".concat(request.price)}
              </Text>
            </View>
          </View>
        )}
    </View>
  );
};

export default StatusView;
