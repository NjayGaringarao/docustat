import { View, Text, ScrollView } from "react-native";
import React from "react";
import Personal from "@/components/settings/Personal";
import Contact from "@/components/settings/Contact";
import Role from "@/components/settings/Role";
import LoginCredentials from "@/components/settings/LoginCredentials";
import DeleteAccount from "@/components/settings/DeleteAccount";
import CustomButton from "@/components/CustomButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";

const userSettings = () => {
  return (
    <View className="flex-1">
      {/* Header */}
      <View className="h-16 w-full flex-row items-center gap-4 bg-primary pr-4">
        <CustomButton
          handlePress={() => router.back()}
          containerStyles="bg-transparent p-2"
        >
          <Ionicons name="arrow-back-sharp" size={24} color="black" />
        </CustomButton>
        <View>
          <Text className="text-xl font-bold text-uBlack">
            Account Settings
          </Text>
        </View>
      </View>
      <ScrollView
        className="flex-1 px-2 py-4 bg-background"
        contentContainerStyle={{
          alignItems: "flex-start",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <Personal />

        <Contact />

        <Role />

        <LoginCredentials />
        <View className="w-full mb-8">
          <DeleteAccount />
        </View>
      </ScrollView>
    </View>
  );
};

export default userSettings;
