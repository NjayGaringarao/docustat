import React from "react";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";

type SexPickerProps = {
  value: string;
  onChange: (value: string) => void;
  containerStyle?: string;
};

const SexPicker: React.FC<SexPickerProps> = ({
  value,
  onChange,
  containerStyle,
}) => {
  return (
    <View className={`justify-center h-7 ${containerStyle}`}>
      <Picker
        selectedValue={value}
        onValueChange={onChange}
        className="text-base"
        mode="dropdown"
      >
        <Picker.Item label="Unset" value="" />
        <Picker.Item label="Male" value="Male" />
        <Picker.Item label="Female" value="Female" />
      </Picker>
    </View>
  );
};

export default SexPicker;
