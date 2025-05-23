import { Text, View, Image } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { color } from "@/constants/color";
import image from "@/constants/image";
import CustomButton from "@/components/CustomButton";
import TextBox from "@/components/TextBox";
import { Picker } from "@react-native-picker/picker";
import Toast from "react-native-toast-message";
import { adminSignIn, studentSignIn } from "@/services/auth";
import { useGlobalContext } from "@/context/GlobalProvider";
import Loading from "@/components/Loading";

interface IFormType {
  id: string;
  password: string;
}

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const { initializeGlobalState } = useGlobalContext();
  const [accountType, setAccountType] = useState<"student" | "admin">(
    "student"
  );
  const [form, setForm] = useState<IFormType>({
    id: "",
    password: "",
  });

  const adminSignInHandle = async () => {
    try {
      await adminSignIn(form.id.trim(), form.password);
      await initializeGlobalState();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Sign in Failed",
        text2: `${error}`,
      });
      setIsLoading(false);
    }
  };

  const studentSignInHandle = async () => {
    try {
      await studentSignIn(form.id.trim(), form.password);
      await initializeGlobalState();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Sign in Failed",
        text2: `${error}`,
      });
      setIsLoading(false);
    }
  };

  const signInHandle = async () => {
    setForm({ ...form, id: form.id.trim() });
    setIsLoading(true);
    if (accountType == "admin") {
      await adminSignInHandle();
    } else {
      await studentSignInHandle();
    }
  };

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
            <View className="items-center mt-6 gap-2 w-10/12">
              <View className="flex flex-row items-center w-full gap-2">
                <Text className="text-xl text-uGray font-semibold">
                  Sign in as
                </Text>
                <View className="border border-secondary rounded-xl flex-1 justify-center h-12 mt-1">
                  <Picker
                    selectedValue={accountType}
                    onValueChange={(itemValue) => setAccountType(itemValue)}
                  >
                    <Picker.Item label="Student" value="student" />
                    <Picker.Item label="Admin" value="admin" />
                  </Picker>
                </View>
              </View>

              <TextBox
                title={
                  accountType === "admin" ? "Employee Number" : "Student Number"
                }
                textValue={form.id}
                placeholder="XX-X-X-XXXX"
                handleChangeText={(e) => setForm({ ...form, id: e })}
                titleTextStyles="text-uGray text-base font-semibold"
                textInputStyles="text-base text-uBlack"
                boxStyles="w-full bg-white rounded-xl border-secondary border h-11"
                containerStyles="pt-4"
              />

              <TextBox
                title="Password"
                textValue={form.password}
                placeholder="#Docustat!"
                handleChangeText={(e) => setForm({ ...form, password: e })}
                isPassword={true}
                titleTextStyles="text-uGray text-base font-semibold"
                textInputStyles="text-base text-uBlack"
                boxStyles="w-full bg-white rounded-xl border-secondary border h-11"
              />

              <CustomButton
                title="Sign In"
                textStyles="text-white"
                containerStyles="bg-secondary h-11 w-full rounded-xl mt-4"
                handlePress={signInHandle}
                isLoading={isLoading}
              />
            </View>
          </View>
          {!!isLoading && (
            <View className="absolute w-full h-full items-center justify-center">
              <View className="absolute w-full h-full bg-white opacity-95" />
              <Loading
                loadingPrompt="Signing you in"
                loadingColor={color.secondary}
              />
            </View>
          )}
        </View>
      </View>
      <StatusBar backgroundColor={color.primary} style="auto" />
    </>
  );
}
