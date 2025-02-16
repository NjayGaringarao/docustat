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
            {/* Personal Information */}
            <View className="w-full border-t">
              <Text className="text-lg font-semibold">
                Personal Information
              </Text>

              <View className="flex-row mt-2">
                <Text className="w-1/2 pl-2">LAST NAME</Text>
                <Text className="flex-1">
                  {":\t".concat(userInfo.name[2] ? userInfo.name[2] : "---")}
                </Text>
              </View>

              <View className="flex-row mt-1">
                <Text className="w-1/2 pl-2">FIRST NAME</Text>
                <Text className="flex-1">
                  {":\t".concat(userInfo.name[0] ? userInfo.name[0] : "---")}
                </Text>
              </View>

              <View className="flex-row mt-1">
                <Text className="w-1/2 pl-2">MIDDLE NAME</Text>
                <Text className="flex-1">
                  {":\t".concat(userInfo.name[1] ? userInfo.name[1] : "---")}
                </Text>
              </View>

              <View className="flex-row mt-2">
                <Text className="w-1/2 pl-2">BIRTH DATE</Text>
                <Text className="flex-1">
                  {":\t".concat(
                    userInfo.birthdate
                      ? userInfo.birthdate.toLocaleDateString()
                      : "---"
                  )}
                </Text>
              </View>

              <View className="flex-row mt-2">
                <Text className="w-1/2 pl-2">SEX</Text>
                <Text className="flex-1">
                  {":\t".concat(
                    userInfo.sex ? userInfo.sex.toUpperCase() : "---"
                  )}
                </Text>
              </View>
            </View>

            {/* Contact Information */}
            <View className="w-full border-t">
              <Text className="text-lg font-semibold">Contact Information</Text>
              <View className="flex-row mt-1">
                <Text className="w-1/2 pl-2">CURRENT ADDRESS</Text>
                <Text className="flex-1">
                  {":\t".concat(
                    `${userInfo.address[0]!} ${userInfo.address[1]!}`
                  )}
                </Text>
              </View>
              <View className="flex-row mt-1">
                <Text className="w-1/2 pl-2">CONTACT NUMBER</Text>
                <Text className="flex-1">
                  {":\t".concat(`${userInfo.contact_number?.trim()}`)}
                </Text>
              </View>
            </View>

            {/* Student Information */}
            {userInfo.student_info && (
              <View className="w-full border-t mb-4">
                <Text className="text-lg font-semibold">
                  Student Information
                </Text>
                <View className="flex-row mt-1">
                  <Text className="w-1/2 pl-2">DEPARTMENT</Text>
                  <Text className="flex-1">
                    {":\t".concat(
                      userInfo.student_info.dept_prog.toLocaleUpperCase()
                    )}
                  </Text>
                </View>
                <View className="flex-row mt-1">
                  <Text className="w-1/2 pl-2">YEAR LEVEL</Text>
                  <Text className="flex-1">
                    {":\t".concat(
                      userInfo.student_info.year_level.toUpperCase()
                    )}{" "}
                    YEAR
                  </Text>
                </View>
              </View>
            )}

            {/* Admin Information */}
            {userInfo.admin_info && (
              <View className="w-full border-t mt-5">
                <Text className="text-lg font-semibold">Admin Information</Text>
                <View className="flex-row mt-1">
                  <Text className="w-1/2 pl-2">DEPARTMENT</Text>
                  <Text className="flex-1">
                    {":\t".concat(userInfo.admin_info.department)}
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
