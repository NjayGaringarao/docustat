import { View, Text, Switch } from "react-native";
import React, { useEffect, useState } from "react";
import { RequestType } from "@/constants/models";
import CustomButton from "../CustomButton";
import AntDesign from "@expo/vector-icons/AntDesign";
import { color } from "@/constants/color";
import ParagraphBox from "../ParagraphBox";
import { updateRequestStatus } from "@/services/request";
import Toast from "react-native-toast-message";
import { confirmAction } from "@/lib/commonUtil";
import TextBox from "../TextBox";

interface IStatusSetter {
  request: RequestType;
  setIsChanged: React.Dispatch<React.SetStateAction<boolean>>;
  refreshRequest: () => void;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  resetRef?: React.MutableRefObject<() => void>;
  saveRef?: React.MutableRefObject<() => void>;
}

const StatusSetter = ({
  request,
  resetRef,
  saveRef,
  setIsChanged,
  refreshRequest,
  setIsLoading,
}: IStatusSetter) => {
  const [status, setStatus] = useState<string>(request.status);
  const [amount, setAmount] = useState<string>(request.price);
  const [remarks, setRemarks] = useState<string>(request.remarks);

  const statuses = ["pending", "processing", "pickup", "success", "failed"];
  const currentIndex = statuses.indexOf(status);

  const changeStatus = (direction: "left" | "right") => {
    let newStatus = status;
    if (direction === "left" && currentIndex > 0) {
      newStatus = statuses[currentIndex - 1];
    } else if (direction === "right" && currentIndex < statuses.length - 1) {
      newStatus = statuses[currentIndex + 1];
    }

    setStatus(newStatus);

    if (newStatus === request.status) {
      setRemarks(request.remarks);
    } else {
      if (newStatus == "pickup") {
        setRemarks("Please bring one valid ID.");
      } else if (newStatus == "success") {
        setRemarks("Document is claimed.");
      } else {
        setRemarks("Transaction Failed.");
      }
    }
  };

  const isChanged = () => {
    return (
      status !== request.status ||
      remarks !== request.remarks ||
      amount !== request.price
    );
  };

  const reset = () => {
    setStatus(request.status);
    setRemarks(request.remarks);
    setIsChanged(false);
  };

  const saveChanges = async () => {
    if (
      !(await confirmAction(
        "Confirm Update",
        "This will notify the client. Do you want to proceed?"
      ))
    )
      return;

    try {
      setIsLoading(true);
      await updateRequestStatus({
        request_id: request.id,
        status: status,
        remarks: remarks,
        price: amount,
        user_id: request.user_id,
      });
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Request Updated successfully!",
      });

      request = {
        ...request,
        status: status,
        remarks: remarks,
      };

      setIsChanged(false);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "There was an error updating the status.",
      });
    } finally {
      setIsLoading(false);
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
  }, [status, remarks, amount]);

  return (
    <View className="p-4 bg-background rounded-2xl shadow-md items-center mb-20">
      <View className="w-full flex-row justify-between items-center">
        <Text className="text-uBlack text-lg font-black">STATUS</Text>
        <View className="flex-row items-center">
          {/* Left Button */}
          <CustomButton
            handlePress={() => changeStatus("left")}
            containerStyles={`${
              currentIndex === 0 ? "bg-gray-300" : "bg-primary"
            } rounded-r-none rounded-l-lg`}
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
            className={`w-32 py-2 items-center ${
              status === "pending"
                ? "bg-pending"
                : status === "processing"
                ? "bg-processing"
                : status === "pickup"
                ? "bg-pickup"
                : status === "success"
                ? "bg-success"
                : "bg-failed"
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
            } p-2 rounded-l-none rounded-r-lg `}
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
      {status === "pickup" && (
        <View className="gap-2 mt-6 items-start w-full">
          <View className="w-full flex-row justify-between items-center gap-2">
            <Text className="text-lg italic">Payment Upon Pickup</Text>
            <View className="flex-1 flex-row items-center justify-end bg-white rounded-xl px-2">
              <Text className="text-lg">PHP</Text>
              <TextBox
                textValue={amount}
                handleChangeText={(e) => e.length < 9 && setAmount(e)}
                placeholder="100.00"
                keyboardType="numeric"
                containerStyles="flex-1 h-11 bg-white rounded-xl"
              />
            </View>
          </View>
          <View>
            <Text className="text-lg italic">Remarks</Text>
            <ParagraphBox
              value={remarks}
              placeholder={"Please bring 2 valid ID"}
              handleChangeText={(e) => setRemarks(e)}
              containerStyles="rounded-xl bg-white min-h-20 max-h-40"
            />
          </View>
        </View>
      )}

      {/* Switch for 'complete' status */}
      {(status === "success" || status === "failed") && (
        <View className="gap-2 mt-6 items-start w-full">
          <View className="w-full flex-row justify-between items-center gap-2">
            <Text className="text-lg italic">Payment Upon Pickup</Text>
            <View className="flex-1 flex-row items-center justify-end bg-white rounded-xl overflow-hidden">
              <View className="flex-1 flex-row items-center justify-center px-2">
                <Text className="text-lg">PHP</Text>
                <TextBox
                  textValue={amount}
                  handleChangeText={(e) => e.length < 9 && setAmount(e)}
                  keyboardType="numeric"
                  containerStyles="flex-1 h-11 bg-white rounded-xl"
                />
              </View>
              <View className="absolute h-full w-full bg-gray-400 opacity-50" />
            </View>
          </View>
          <View>
            <Text className="text-lg italic">Remarks</Text>
            <ParagraphBox
              value={remarks}
              placeholder={"Claimed by John Doe"}
              handleChangeText={(e) => setRemarks(e)}
              containerStyles="rounded-xl bg-white min-h-20 max-h-40"
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default StatusSetter;
