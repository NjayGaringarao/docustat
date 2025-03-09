import React from "react";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";

type CertGradeAyPickerProps = {
  value: string;
  onChange: (value: string) => void;
  containerStyle?: string;
};

const CertGradeAyPicker: React.FC<CertGradeAyPickerProps> = ({
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
        <Picker.Item label="Select Academic Year" value="none" />
        <Picker.Item label="2024-2025" value="2024-2025" />
        <Picker.Item label="2023-2024" value="2023-2024" />
        <Picker.Item label="2022-2023" value="2022-2023" />
        <Picker.Item label="2021-2022" value="2021-2022" />
        <Picker.Item label="2020-2021" value="2020-2021" />
      </Picker>
    </View>
  );
};

export default CertGradeAyPicker;
