import { View, Text, Switch } from "react-native";
import React, { useEffect, useState } from "react";
import { RequestType } from "@/constants/models";
import CustomButton from "../CustomButton";
import AntDesign from "@expo/vector-icons/AntDesign";
import { color } from "@/constants/color";
import ParagraphBox from "../ParagraphBox";
import { updateRequestStatus } from "@/services/request";
import Toast from "react-native-toast-message";

interface IStatusSetter {
  request: RequestType;
  setIsChanged: React.Dispatch<React.SetStateAction<boolean>>;
  refreshRequest: () => void;
  resetRef?: React.MutableRefObject<() => void>;
  saveRef?: React.MutableRefObject<() => void>;
}

const StatusSetter = ({
  request,
  setIsChanged,
  resetRef,
  saveRef,
  refreshRequest,
}: IStatusSetter) => {
  const [status, setStatus] = useState<string>(request.status);
  const [remarks, setRemarks] = useState<string>(request.remarks);
  const [isSuccessful, setIsSuccessful] = useState(request.isSuccessful);

  const statuses = ["pending", "processing", "pickup", "complete"];
  const currentIndex = statuses.indexOf(status);

  const changeStatus = (direction: "left" | "right") => {
    let newStatus = status;
    if (direction === "left" && currentIndex > 0) {
      newStatus = statuses[currentIndex - 1];
    } else if (direction === "right" && currentIndex < statuses.length - 1) {
      newStatus = statuses[currentIndex + 1];
    }

    setStatus(newStatus);

    // Reset remarks and isSuccessful when status changes
    if (newStatus === "pending" || newStatus === "processing") {
      setRemarks("");
      setIsSuccessful(request.isSuccessful); // Reset to original value
    }
  };

  const isChanged = () => {
    return (
      status !== request.status ||
      remarks !== request.remarks ||
      isSuccessful !== request.isSuccessful
    );
  };

  const reset = () => {
    setStatus(request.status);
    setRemarks(request.remarks);
    setIsSuccessful(request.isSuccessful);
    setIsChanged(false);
  };

  const saveChanges = async () => {
    try {
      await updateRequestStatus({
        request_id: request.id,
        status: status,
        remarks: remarks,
        isSuccessful: isSuccessful,
        user_id: request.user_id,
      });
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Request Updated successfully!",
      });
      refreshRequest();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "There was an error updating the status.",
      });
    }
  };

  // This will allow parent component to trigger reset and saveChanges
  useEffect(() => {
    if (resetRef) {
      resetRef.current = reset;
    }

    if (saveRef) {
      saveRef.current = saveChanges;
    }

    setIsChanged(isChanged());
  }, [status, remarks, isSuccessful]);

  return (
    <View className="p-4 bg-panel rounded-2xl shadow-md items-center mb-20">
      <View className="w-full flex-row justify-between items-center">
        <Text className="text-lg font-semibold">STATUS</Text>
        <View className="flex-row gap-2 items-center">
          {/* Left Button */}
          <CustomButton
            handlePress={() => changeStatus("left")}
            containerStyles={`${
              currentIndex === 0 ? "bg-gray-300" : "bg-primary"
            } p-2 rounded-lg`}
            isLoading={currentIndex === 0}
          >
            <AntDesign
              name="left"
              size={24}
              color={currentIndex === 0 ? color.uGray : color.white}
            />
          </CustomButton>

          {/* Status Indicator */}
          <View
            className={`w-32 py-2 items-center rounded-lg ${
              status === "pending"
                ? "bg-pending"
                : status === "processing"
                ? "bg-processing"
                : status === "pickup"
                ? "bg-forPickup"
                : "bg-complete"
            }`}
          >
            <Text className="text-white font-semibold">
              {status.toUpperCase()}
            </Text>
          </View>

          {/* Right Button */}
          <CustomButton
            handlePress={() => changeStatus("right")}
            containerStyles={`${
              currentIndex === statuses.length - 1
                ? "bg-gray-300"
                : "bg-primary"
            } p-2 rounded-lg`}
            isLoading={currentIndex === statuses.length - 1}
          >
            <AntDesign
              name="right"
              size={24}
              color={
                currentIndex === statuses.length - 1 ? color.uGray : color.white
              }
            />
          </CustomButton>
        </View>
      </View>

      {/* Remarks when status is 'pickup' or 'complete' */}
      {["pickup", "complete"].includes(status) && (
        <View className="gap-2 mt-4 items-start w-full">
          <Text className="text-lg font-semibold">Status Remarks</Text>
          <ParagraphBox
            value={remarks}
            placeholder={
              status === "pickup"
                ? "Please bring 2 valid ID"
                : "Claimed by John Doe"
            }
            handleChangeText={(e) => setRemarks(e)}
            containerStyles="rounded-xl bg-white min-h-40"
          />
        </View>
      )}

      {/* Switch for 'complete' status */}
      {status === "complete" && (
        <View className="flex-row items-center gap-2 place-self-end">
          <Switch
            trackColor={{ false: color.failed, true: color.success }}
            thumbColor={color.white}
            onValueChange={() => setIsSuccessful((prev) => !prev)}
            value={isSuccessful}
          />
          <Text className="text-lg font-semibold">
            {`Transaction ${isSuccessful ? "Successful" : "Failed"}`}
          </Text>
        </View>
      )}
    </View>
  );
};

export default StatusSetter;
