import { Text, View, Image } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import color from "@/constants/color";
import image from "@/constants/image";
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

            <View>
              <Text
                style={{
                  lineHeight: 20,
                  textShadowRadius: 10,
                  textShadowColor: "#fff",
                  textShadowOffset: { width: 2, height: 2 },
                }}
                className="text-gray-800 text-lg font-semibold"
              >
                {"PRESIDENT RAMON MAGSAYSAY\nSTATE UNIVERSITY"}
              </Text>
              <Text
                className="text-gray-100 text-lg font-semibold"
                style={{
                  lineHeight: 20,
                  textShadowRadius: 10,
                  textShadowColor: "#00000",
                }}
              >
                CASTILLEJOS CAMPUS
              </Text>
            </View>
          </View>
          <View className="flex-1 justify-center items-center">
            <Text
              className="text-7xl text-secondary"
              style={{
                fontFamily: "Merriweather",
                textShadowRadius: 10,
                textShadowColor: "#00000",
                textShadowOffset: { width: 3, height: 3 },
              }}
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
                title="Sign in"
                textStyles="text-white"
                containerStyles="bg-secondary h-11 w-1/2 rounded-xl"
                handlePress={() => {
                  router.push("/(auth)/sign_in");
                }}
              />
              <CustomButton
                title="Sign up"
                textStyles="text-secondary"
                containerStyles="bg-secondary h-11 w-1/2 rounded-xl bg-transparent border border-secondary"
                handlePress={() => {
                  router.push("/(auth)/sign_up");
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
