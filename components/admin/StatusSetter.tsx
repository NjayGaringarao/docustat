import { View, Text, Switch } from "react-native";
import React, { useEffect, useState } from "react";
import { RequestType } from "@/constants/models";
import CustomButton from "../CustomButton";
import AntDesign from "@expo/vector-icons/AntDesign";
import { color } from "@/constants/color";
import ParagraphBox from "../ParagraphBox";

interface IStatusSetter {
  request: RequestType;
  setIsChanged: React.Dispatch<React.SetStateAction<boolean>>;
}

const StatusSetter = ({ request, setIsChanged }: IStatusSetter) => {
  const [status, setStatus] = useState<string>(request.status);
  const [remarks, setRemarks] = useState<string>(request.remarks);
  const statuses = ["pending", "processing", "pickup", "complete"]; // Possible statuses
  const currentIndex = statuses.indexOf(status);
  const [isSuccessful, setIsSuccessful] = useState(request.isSuccessful);

  const changeStatus = (direction: "left" | "right") => {
    if (direction === "left" && currentIndex > 0) {
      setStatus(statuses[currentIndex - 1]); // Move to the previous status
    } else if (direction === "right" && currentIndex < statuses.length - 1) {
      setStatus(statuses[currentIndex + 1]); // Move to the next status
    }

    if (status === "pending" || status === "processing") {
      setRemarks("---");
    }
    if (
      status === "pending" ||
      status === "processing" ||
      status === "pickup"
    ) {
      setIsSuccessful(request.isSuccessful);
    }
  };

  const isChanged = () => {
    return (
      status != request.status ||
      remarks != request.remarks ||
      isSuccessful != request.isSuccessful
    );
  };

  useEffect(() => {
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

      {status == "pickup" && (
        <View className="gap-2 mt-4 items-start">
          <Text className="text-lg font-semibold">Status Remarks</Text>
          <ParagraphBox
            value={remarks}
            placeholder={"Please bring 2 valid ID"}
            handleChangeText={(e) => setRemarks(e)}
            containerStyles="rounded-xl bg-white min-h-40"
          />
        </View>
      )}

      {status == "complete" && (
        <View className="gap-2 mt-4 items-start w-full">
          <Text className="text-lg font-semibold">Status Remarks</Text>
          <ParagraphBox
            value={remarks}
            placeholder={"Claimed by John Doe"}
            handleChangeText={(e) => setRemarks(e)}
            containerStyles="rounded-xl bg-white min-h-40"
          />
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
        </View>
      )}
    </View>
  );
};

export default StatusSetter;
