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
        <Picker.Item label="" value="" />
        <Picker.Item label="First" value="First" />
        <Picker.Item label="Second" value="Second" />
        <Picker.Item label="Midyear" value="Midyear" />
      </Picker>
    </View>
  );
};

export default CertGradeSemPicker;
