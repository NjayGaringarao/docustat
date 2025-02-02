import React, { useState } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { color } from "@/constants/color";

type BirthDatePickerProps = {
  value: Date;
  onChange: (value: Date) => void;
  containerStyle?: string;
};

const BirthDatePicker: React.FC<BirthDatePickerProps> = ({
  value = new Date(),
  onChange,
  containerStyle,
}) => {
  const [showPicker, setShowPicker] = useState(false);

  // Define limits for the date picker
  const minDate = new Date(1900, 0, 1); // January 1, 1900
  const maxDate = new Date(); // Today's date

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  return (
    <View className={`justify-center ${containerStyle}`}>
      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        className=" p-2 pr-4 flex-row justify-between items-center"
      >
        <Text className="text-lg">
          {value.toISOString().slice(0, 10) || "Select Birthdate"}
        </Text>
        <FontAwesome name="caret-down" size={16} color={color.uGray} />
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={value}
          mode="date"
          display={Platform.OS === "ios" ? "inline" : "default"}
          onChange={handleDateChange}
          minimumDate={minDate} // Lower limit
          maximumDate={maxDate} // Upper limit
        />
      )}
    </View>
  );
};

export default BirthDatePicker;
