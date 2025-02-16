import React from "react";
import { ScrollView, View } from "react-native";
import Personal from "@/components/settings/Personal";
import Contact from "@/components/settings/Contact";
import Role from "@/components/settings/Role";
import LoginCredentials from "@/components/settings/LoginCredentials";

const profile = () => {
  return (
    <>
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

        <View className="w-full mb-8">
          <LoginCredentials />
        </View>
      </ScrollView>
    </>
  );
};

export default profile;
