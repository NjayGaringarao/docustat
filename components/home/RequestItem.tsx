import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import { color } from "@/constants/color";
import { RequestType } from "@/constants/models";
import CustomButton from "../CustomButton";
import { confirmAction } from "@/lib/commonUtil";

interface IRequestItem {
  request: RequestType;
  onPress?: () => void;
}

const RequestItem = ({ request, onPress }: IRequestItem) => {
  const deleteHandle = async () => {
    if (
      !(await confirmAction(
        "Confim Deletion",
        `Do you want to delete your request for your '${request.purpose}' purposes?`
      ))
    )
      return;
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white my-2 rounded-lg shadow-sm overflow-hidden"
    >
      {/* Header Section */}
      <View className="flex-row justify-between items-center mb-2 bg-secondary px-4 py-2">
        <Text className="text-lg font-semibold text-white flex-1">
          {request.document[0].concat(
            `${
              request.document.length > 1
                ? `, and ${request.document.length - 1} more`
                : ""
            }`
          )}
        </Text>

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
          <Text className=" text-uGray">
            Purpose: <Text className="text-black">{request.purpose}</Text>
          </Text>
          <Text className="text-uGray">
            Last Updated:{" "}
            <Text className="text-black">
              {new Date(request.updated_at).toLocaleDateString()}
            </Text>
          </Text>

          <Text className="text-uGray mt-2">Requested Document : </Text>

          {request.document.map((value, index) => (
            <Text className="text-uBlack font-semibold" key={index}>
              {"- ".concat(value)}
            </Text>
          ))}
          <Text className="text-uGray mt-2">Request Note : </Text>
          <Text className="ml-2 italic text-uBlack text-sm">
            {request.request_note}
          </Text>
        </View>
        {request.status === "pending" ? (
          <View className="w-full flex-row justify-end">
            {/* <CustomButton
              handlePress={() => {}}
              containerStyles="bg-transparent"
            >
              <MaterialIcons name="edit" size={24} color="black" />
            </CustomButton> */}
            <CustomButton
              handlePress={deleteHandle}
              containerStyles="bg-transparent"
            >
              <MaterialIcons name="delete" size={24} color="black" />
            </CustomButton>
          </View>
        ) : null}

        {request.status === "complete" ? (
          <View className="w-full flex-row justify-end">
            <Entypo
              name={request.remarks === "Document Claimed" ? "check" : "cross"}
              size={24}
              color={
                request.remarks === "Document Claimed"
                  ? color.success
                  : color.failed
              }
            />
            <Text
              className={`text-base text-uGray font-semibold ${
                request.remarks === "complete"
              }`}
            >
              {request.remarks}
            </Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default RequestItem;
