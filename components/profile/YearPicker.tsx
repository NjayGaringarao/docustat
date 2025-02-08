import React, { useState } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

type YearPickerProps = {
  value?: Date;
  onChange: (value: Date) => void;
  containerStyle?: string;
};

const YearPicker: React.FC<YearPickerProps> = ({
  value,
  onChange,
  containerStyle,
}) => {
  const [showPicker, setShowPicker] = useState(false);

  // Define limits for the year picker
  const minDate = new Date(1900, 0, 1); // January 1, 1900
  const maxDate = new Date(); // Today's date

  const handleYearChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate && value) {
      // Update only the year, keeping the month and day the same
      const updatedDate = new Date(value);
      updatedDate.setFullYear(selectedDate.getFullYear());
      onChange(updatedDate);
    }
  };

  return (
    <View className={`justify-center ${containerStyle}`}>
      <TouchableOpacity onPress={() => setShowPicker(true)} className="p-2">
        <Text className="text-lg">
          {value ? value.getFullYear() : "Select Year"}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={value ? value : new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleYearChange}
          minimumDate={minDate} // Lower limit
          maximumDate={maxDate} // Upper limit
        />
      )}
    </View>
  );
};

export default YearPicker;
