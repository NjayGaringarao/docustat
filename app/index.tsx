import { Text, View, Image } from "react-native";
import { BlurView } from "expo-blur";
import React from "react";
import { StatusBar } from "expo-status-bar";
import color from "@/constant/color";
import image from "@/constant/image";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

export default function Index() {
  return (
    <>
      <View className="flex-1 justify-center items-center">
        <Image
          className="absolute flex-1 opacity-15 bg-gray-500"
          source={image.building}
        />
        <View className="absolute h-full w-full justify-around">
          <View className="h-40 w-full gap-2 bg-primary p-4 rounded-b-2xl flex-row justify-center items-center">
            <Image className="w-28 h-28" source={image.prmsu} />

            <Text
              style={{
                lineHeight: 20,
              }}
              className="text-gray-800 text-lg font-semibold"
            >
              {"PRESIDENT RAMON MAGSAYSAY\nSTATE UNIVERSITY"}
              <Text className="text-gray-200">{"\nCASTILLEJOS CAMPUS"}</Text>
            </Text>
          </View>
          <View className="flex-1 justify-center items-center">
            <Text
              className="text-7xl text-secondary"
              style={{ fontFamily: "Merriweather" }}
            >
              DocuStats
            </Text>
            <Text
              className=" text-xl text-uBlack text-center -mt-2 w-"
              style={{
                fontFamily: "Sarina",
              }}
            >
              {"School Document Request and\nStatus Update"}
            </Text>
            <View className="w-full items-center mt-6 gap-2">
              <CustomButton
                title="Administrator"
                textStyles="text-white"
                containerStyles="bg-secondary h-11 w-1/2 rounded-xl"
                handlePress={() => {}}
              />
              <CustomButton
                title="Student"
                textStyles="text-white"
                containerStyles="bg-secondary h-11 w-1/2 rounded-xl"
                handlePress={() => {
                  router.push("/(auth)/student_signin");
                }}
              />
            </View>
          </View>
        </View>
      </View>
      <StatusBar backgroundColor={color.primary} style="auto" />
    </>
  );
}
