import React from "react";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";

type AdminDepPickerProps = {
  value: string;
  onChange: (value: string) => void;
  containerStyle?: string;
};

const AdminDepPicker: React.FC<AdminDepPickerProps> = ({
  value,
  onChange,
  containerStyle,
}) => {
  return (
    <View className={`justify-center h-10 ${containerStyle}`}>
      <Picker selectedValue={value} onValueChange={onChange}>
        <Picker.Item label="Choose Department" value="" />
        <Picker.Item label="Registrar" value="Registrar" />
      </Picker>
    </View>
  );
};

export default AdminDepPicker;
