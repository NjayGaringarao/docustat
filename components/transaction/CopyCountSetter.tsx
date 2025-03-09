import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import CustomButton from "../CustomButton";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";

interface ICopyCountSetter {
  copy: number;
  setCopy: (e: number) => void;
}

const CopyCountSetter = ({ copy, setCopy }: ICopyCountSetter) => {
  const handleIncrement = () => {
    setCopy(copy >= 20 ? 1 : copy + 1);
  };

  const handleDecrement = () => {
    setCopy(copy <= 1 ? 20 : copy - 1);
  };

  const handleInputChange = (text: string) => {
    let num = parseInt(text, 10);
    if (isNaN(num)) return;
    if (num < 1) num = 1;
    if (num > 20) num = 20;
    setCopy(num);
  };

  return (
    <View className="flex-row h-10 items-center rounded-xl border border-primary">
      {/* Minus Button */}
      <TouchableOpacity
        onPress={handleDecrement}
        className="rounded-xl items-center rounded-r-none w-10 h-10 justify-center bg-primary"
      >
        <Feather name="minus" size={26} color="black" />
      </TouchableOpacity>

      {/* Input Field */}
      <TextInput
        value={copy.toString()}
        onChangeText={handleInputChange}
        keyboardType="numeric"
        className="text-center w-12"
      />

      {/* Plus Button */}
      <TouchableOpacity
        onPress={handleIncrement}
        className="rounded-xl items-center rounded-l-none w-10 h-10 justify-center bg-primary"
      >
        <MaterialIcons name="add" size={26} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default CopyCountSetter;
