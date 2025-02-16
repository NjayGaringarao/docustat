import React, { useState } from "react";
import { ScrollView, View, Text } from "react-native";
import ProfilePicture from "@/components/ProfilePicture";
import { useGlobalContext } from "@/context/GlobalProvider";
import CustomButton from "@/components/CustomButton";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { color } from "@/constants/color";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { signOutUser } from "@/services/auth";
import { confirmAction } from "@/lib/commonUtil";

const profile = () => {
  const { userInfo, isInternetConnection, resetGlobalState } =
    useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);

  const signOutHandle = async () => {
    try {
      if (
        !(await confirmAction(
          "Confirm Logout",
          "You won't recieve a notification while being logged out."
        ))
      )
        return;
      setIsLoading(true);
      await signOutUser();
      resetGlobalState();
      router.navigate("/");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Submit Failed",
        text2: `There was an error signing out your account.`,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View className="flex-1 px-2 py-4 bg-background items-center gap-4">
      <ProfilePicture
        userInfo={userInfo}
        containerStyle="bg-background rounded-3xl overflow-hidden w-48 h-48 shadow-xl shadow-black"
      />
      <View className="w-full items-center">
        <Text className="text-3xl text-secondary font-semibold justify-end">
          {userInfo.name[1]
            ? `${userInfo.name[0]} ${userInfo.name[1]} ${userInfo.name[2]}`
            : `${userInfo.name[0]} ${userInfo.name[2]}`}
        </Text>
        <Text className="text-lg justify-end">
          {userInfo.student_info
            ? `${userInfo.student_info.dept_prog.toLocaleUpperCase()} | ${userInfo.student_info.year_level.toUpperCase()} YEAR`
            : userInfo.admin_info
            ? ``
            : ``}
        </Text>
      </View>
      <View className="self-end mt-4 flex-row">
        <CustomButton
          title="Settings"
          handlePress={() => router.push("/userSettings")}
          containerStyles="bg-transparent"
          isLoading={!isInternetConnection}
          textStyles="text-secondary"
        >
          <MaterialCommunityIcons
            name="account-settings"
            size={24}
            color={color.secondary}
          />
        </CustomButton>
        <CustomButton
          title="Sign-out"
          handlePress={signOutHandle}
          containerStyles="bg-transparent"
          textStyles="text-secondary"
          isLoading={isLoading || !isInternetConnection}
        >
          <MaterialCommunityIcons
            name="logout"
            size={24}
            color={color.secondary}
          />
        </CustomButton>
      </View>
      <ScrollView
        className="flex-1 w-full p-4 rounded-xl bg-background shadow-xl shadow-black"
        contentContainerStyle={{
          rowGap: 16,
          paddingTop: 8,
          paddingBottom: 32,
          paddingHorizontal: 16,
        }}
      >
        {/* Personal Information */}
        <View className="w-full">
          <Text className="text-lg font-semibold">Personal Information</Text>

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
              {":\t".concat(userInfo.sex ? userInfo.sex.toUpperCase() : "---")}
            </Text>
          </View>
        </View>

        {/* Contact Information */}
        <View className="w-full border-t">
          <Text className="text-lg font-semibold">Contact Information</Text>
          <View className="flex-row mt-1">
            <Text className="w-1/2 pl-2">CURRENT ADDRESS</Text>
            <Text className="flex-1">
              {":\t".concat(`${userInfo.address[0]!} ${userInfo.address[1]!}`)}
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
            <Text className="text-lg font-semibold">Student Information</Text>
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
                {":\t".concat(userInfo.student_info.year_level.toUpperCase())}{" "}
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
      </ScrollView>
    </View>
  );
};

export default profile;
