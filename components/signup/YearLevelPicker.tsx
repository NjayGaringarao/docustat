import React from "react";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import color from "@/constants/color";

type YearLevelPickerProps = {
  value: string;
  onChange: (value: string) => void;
  containerStyle?: string;
};

const YearLevelPicker: React.FC<YearLevelPickerProps> = ({
  value,
  onChange,
  containerStyle,
}) => {
  return (
    <View className={`justify-center h-12 ${containerStyle}`}>
      <Picker selectedValue={value} onValueChange={onChange}>
        <Picker.Item label="Choose Year Level" value="" />
        <Picker.Item label="First Year" value="first" />
        <Picker.Item label="Second Year" value="second" />
        <Picker.Item label="Third Year" value="third" />
        <Picker.Item label="Fourth Year" value="fourth" />
        <Picker.Item label="Fifth Year" value="fifth" />
      </Picker>
    </View>
  );
};

export default YearLevelPicker;
