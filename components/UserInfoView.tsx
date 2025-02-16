import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { UserType } from "@/constants/models";
import ProfilePicture from "./ProfilePicture";
import Ionicons from "@expo/vector-icons/Ionicons";

interface UserInfoViewProps {
  userInfo: UserType;
  profilePictureStyle?: string;
  nameStyle?: string;
  roleStyle?: string;
}

const UserInfoView = ({
  userInfo,
  profilePictureStyle,
  nameStyle,
  roleStyle,
}: UserInfoViewProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <View className="gap-6 border-b pb-2">
      <View>
        <View className="flex-row gap-2">
          <ProfilePicture
            userInfo={userInfo}
            containerStyle={`w-20 h-20 rounded-xl overflow-hidden ${profilePictureStyle}`}
          />
          <View className="flex-1 justify-end">
            <Text className={`text-xl font-semibold justify-end ${nameStyle}`}>
              {userInfo.name[1]
                ? `${userInfo.name[0]} ${userInfo.name[1]} ${userInfo.name[2]}`
                : `${userInfo.name[0]} ${userInfo.name[2]}`}
            </Text>
            <Text className={`text-sm justify-end ${roleStyle}`}>
              {userInfo.student_info
                ? `${userInfo.student_info.dept_prog.toLocaleUpperCase()} | ${userInfo.student_info.year_level.toUpperCase()} YEAR`
                : userInfo.admin_info
                ? ``
                : ``}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          className="flex-row justify-end items-center gap-2"
          onPress={() => setIsOpen((value) => !value)}
          activeOpacity={0.8}
        >
          <Text className="text-lg font-semibold  text-primary">
            View Details
          </Text>
          <Ionicons
            name={isOpen ? "chevron-up" : "chevron-down"}
            size={18}
            color={"light"}
          />
        </TouchableOpacity>
        {isOpen && (
          <View className={`mt-2 gap-6 mb-2`}>
            <View className="w-full border-t gap-1">
              <Text className="text-lg font-semibold">
                Personal Information
              </Text>
              <View className="flex-row gap-2 items-start justify-start text-sm pl-4">
                <Text>{"LAST NAME\t\t\t\t:"}</Text>
                <Text className="flex-1">{userInfo.name[2]!}</Text>
              </View>
              <View className="flex-row gap-2 items-start justify-start text-sm pl-4">
                <Text>{"FIRST NAME\t\t\t\t:"}</Text>
                <Text className="flex-1">{userInfo.name[0]!}</Text>
              </View>
              <View className="flex-row gap-2 items-start justify-start text-sm pl-4">
                <Text>{"MIDDLE NAME\t\t:"}</Text>
                <Text className="flex-1">
                  {userInfo.name[1] ? userInfo.name[1] : "---"}
                </Text>
              </View>
              <View className="flex-row gap-2 items-start justify-start text-sm pl-4 mt-2">
                <Text>{"BIRTH DATE\t\t\t\t:"}</Text>
                <Text className="flex-1">
                  {userInfo.birthdate
                    ? userInfo.birthdate.toLocaleDateString()
                    : "---"}
                </Text>
              </View>
              <View className="flex-row gap-2 items-start justify-start text-sm pl-4 mt-2">
                <Text>{"SEX\t\t\t\t\t\t\t\t\t\t\t\t:"}</Text>
                <Text className="flex-1">
                  {userInfo.sex ? userInfo.sex.toUpperCase() : "---"}
                </Text>
              </View>
            </View>
            <View className="w-full border-t gap-1">
              <Text className="text-lg font-semibold">Contact Information</Text>
              <View className="flex-row gap-2 items-start justify-start text-sm pl-4">
                <Text>{"CURRENT ADDRESS\t:"}</Text>
                <Text className="flex-1">
                  {`${userInfo.address[0]!} ${userInfo.address[1]!}`}
                </Text>
              </View>
              <View className="flex-row gap-2 items-start justify-start text-sm pl-4">
                <Text>{"CONTACT NUMBER\t:"} </Text>
                <Text className="flex-1">{`${userInfo.contact_number?.trim()}`}</Text>
              </View>
            </View>
            {userInfo.student_info && (
              <View className="w-full border-t gap-1">
                <Text className="text-lg font-semibold">
                  Student Information
                </Text>
                <View className="flex-row gap-2 items-start justify-start text-sm pl-4">
                  <Text>{"DEPARTMENT\t\t\t\t:"}</Text>
                  <Text className="flex-1">
                    {userInfo.student_info.dept_prog.toLocaleUpperCase()}
                  </Text>
                </View>
                <View className="flex-row gap-2 items-start justify-start text-sm pl-4">
                  <Text>{"YEAR LEVEL\t\t\t\t\t\t:"}</Text>
                  <Text className="flex-1">
                    {userInfo.student_info.year_level.toUpperCase()} YEAR
                  </Text>
                </View>
              </View>
            )}
            {userInfo.admin_info && (
              <View className="w-full border-t gap-1">
                <Text className="text-lg font-semibold">Admin Information</Text>
                <View className="flex-row gap-2 items-start justify-start text-sm pl-4">
                  <Text>{"DEPARTMENT\t\t\t\t:"}</Text>
                  <Text className="flex-1">
                    {userInfo.admin_info.department}
                  </Text>
                </View>
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default UserInfoView;
