import React from "react";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";

type CertGradeSemPickerProps = {
  value: string;
  onChange: (value: string) => void;
  containerStyle?: string;
};

const CertGradeSemPicker: React.FC<CertGradeSemPickerProps> = ({
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
        <Picker.Item label="Select Semester" value="none" />
        <Picker.Item label="First" value="first" />
        <Picker.Item label="Second" value="second" />
        <Picker.Item label="Midyear" value="midyear" />
      </Picker>
    </View>
  );
};

export default CertGradeSemPicker;
