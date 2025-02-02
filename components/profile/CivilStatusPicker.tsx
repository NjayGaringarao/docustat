import React from "react";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";

type CivilStatusPickerProps = {
  value: string;
  onChange: (value: string) => void;
  containerStyle?: string;
};

const CivilStatusPicker: React.FC<CivilStatusPickerProps> = ({
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
        <Picker.Item label="Single" value="Single" />
        <Picker.Item label="Married" value="Married" />
        <Picker.Item label="Widowed" value="Widowed" />
      </Picker>
    </View>
  );
};

export default CivilStatusPicker;
