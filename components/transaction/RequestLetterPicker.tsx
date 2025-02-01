import React from "react";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";

type RequestLetterPickerProps = {
  value: string;
  onChange: (value: string) => void;
  containerStyle?: string;
};

const RequestLetterPicker: React.FC<RequestLetterPickerProps> = ({
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
        <Picker.Item label="TOR" value="TOR" />
        <Picker.Item label="Form 137" value="Form 137" />
        <Picker.Item
          label="other (please specify on the request note)"
          value="other"
        />
      </Picker>
    </View>
  );
};

export default RequestLetterPicker;
