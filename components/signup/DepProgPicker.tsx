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
    <View className={`justify-center h-10 ${containerStyle}`}>
      <Picker selectedValue={value} onValueChange={onChange}>
        <Picker.Item label="Choose Department - Program" value="" />
        <Picker.Item label="CCIT - BSCS" value="ccit-bscs" />
        <Picker.Item label="CTE - BSED" value="cte-bsed" />
        <Picker.Item label="CTE - BEED" value="cte-beed" />
        <Picker.Item label="CBAPA - BSBA" value="cbapa-bsba" />
      </Picker>
    </View>
  );
};

export default DeptProgPicker;
