import React from "react";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";

type DeptProgPickerProps = {
  value: string;
  onChange: (value: string) => void;
  containerStyle?: string;
};

const DeptProgPicker: React.FC<DeptProgPickerProps> = ({
  value,
  onChange,
  containerStyle,
}) => {
  return (
    <View className={`justify-center h-12 ${containerStyle}`}>
      <Picker selectedValue={value} onValueChange={onChange}>
        <Picker.Item label="Choose Department - Program" value="" />
        <Picker.Item label="CCIT - BSCS" value="CCIT - BSCS" />
        <Picker.Item label="CTE - BSED" value="CTE - BSED" />
        <Picker.Item label="CTE - BEED" value="CTE - BEED" />
      </Picker>
    </View>
  );
};

export default DeptProgPicker;
