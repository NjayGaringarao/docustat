import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import { color } from "@/constants/color";
import { RequestType } from "@/constants/models";
import CustomButton from "../CustomButton";
import { confirmAction } from "@/lib/commonUtil";
import { router } from "expo-router";

interface RequestItemProps {
  request: RequestType;
}
const RequestItem: React.FC<RequestItemProps> = ({ request }) => {
  return (
    <TouchableOpacity
      onPress={() => router.push(`/viewRequest/${request.id}`)}
      className="bg-background my-4 rounded-lg shadow-lg overflow-hidden"
    >
      {/* Header Section */}
      <View className="flex-row justify-between items-center mb-2 bg-secondary px-4 py-2">
        <View className="flex-1 flex-row justify-start">
          <Text className="text-lg font-semibold text-white">
            {request.purpose}
          </Text>
        </View>

        <MaterialIcons
          name={
            request.status === "pending"
              ? "pending-actions"
              : request.status === "processing"
              ? "hourglass-top"
              : request.status === "pickup"
              ? "inbox"
              : "check-circle"
          }
          size={24}
          color={color.white}
        />
      </View>
      <View className="p-4">
        {/* Details Section */}
        <View className="mb-2 text-sm">
          <Text className="text-uGray ">Request Number : {request.id}</Text>
          <Text className="text-uGray ">Requested Document : </Text>

          <View className="ml-4">
            {request.document.map((value, index) => (
              <View
                className="flex-row items-start justify-start gap-2 mb-1"
                key={index}
              >
                <Text className="text-uBlack">{index + 1}.</Text>
                <Text className="flex-1 text-uBlack font-semibold">
                  {value}
                </Text>
              </View>
            ))}
          </View>
          {request.request_note.length > 0 && (
            <>
              <Text className="text-uGray mt-2">Request Note : </Text>
              <Text className="ml-2 italic text-uBlack text-sm">
                {request.request_note}
              </Text>
            </>
          )}
        </View>
        <View className="w-full flex-row justify-between items-center">
          <Text className="text-uGray">
            Created:{" "}
            <Text className="text-black">
              {new Date(request.created_at).toLocaleDateString()}
            </Text>
          </Text>
          <Text className="text-uGray">
            Last Updated:{" "}
            <Text className="text-black">
              {new Date(request.updated_at).toLocaleDateString()}
            </Text>
          </Text>
        </View>
        <View className="w-full flex-row justify-between items-center border-t border-secondary mt-2 pt-2">
          <Text className="text-uBlack font-semibold text-base">Status :</Text>
          <View
            className={`flex-row items-center justify-center h-8 w-40  rounded-lg ${
              request.status === "pending"
                ? "bg-pending"
                : request.status === "processing"
                ? "bg-processing"
                : request.status === "pickup"
                ? "bg-forPickup"
                : "bg-complete"
            }`} // does not work when plug directly to to classname
          >
            <Text className="text-white font-semibold text-base">
              {request.status.toUpperCase()}
            </Text>
          </View>
        </View>

        {request.status === "complete" ? (
          <View className="w-full flex-row justify-end mt-2">
            <Entypo
              name={request.isSuccessful ? "check" : "cross"}
              size={24}
              color={request.isSuccessful ? color.success : color.failed}
            />
            <Text
              className={`text-base text-uGray font-semibold ${
                request.remarks === "complete"
              }`}
            >
              {request.remarks.length > 0
                ? request.remarks
                : "This transaction is succesful"}
            </Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default RequestItem;
