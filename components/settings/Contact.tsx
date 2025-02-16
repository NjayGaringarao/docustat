import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import ParagraphBox from "../ParagraphBox";
import TextBox from "../TextBox";
import { useGlobalContext } from "@/context/GlobalProvider";
import CustomButton from "../CustomButton";
import Loading from "../Loading";
import { color } from "@/constants/color";
import Toast from "react-native-toast-message";
import { confirmAction } from "@/lib/commonUtil";
import { updateContactInformation } from "@/services/user";

interface IForm {
  address?: string;
  zip_code?: string;
  contact_number?: string;
}

const Contact = () => {
  const { userInfo, isInternetConnection, refreshUserRecord } =
    useGlobalContext();
  const [form, setForm] = useState<IForm>();
  const [isModified, setIsModified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const resetHandle = () => {
    setForm({
      address: userInfo.address[0],
      zip_code: userInfo.address[1],
      contact_number: userInfo.contact_number,
    });
  };

  const updateHandle = async () => {
    if (
      !(await confirmAction(
        "Confirm Changes",
        "Save changes that you've made?"
      ))
    )
      return;
    try {
      setIsLoading(true);
      if (
        !(await updateContactInformation(
          userInfo.id,
          [form?.address, form?.zip_code],
          form?.contact_number
        ))
      ) {
        throw Error;
      }

      Toast.show({
        type: "success",
        text1: "Update Success",
        text2: "Successfully updated contact information",
      });

      await refreshUserRecord({
        info: true,
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Update Failed",
        text2: `${error}`,
      });
      resetHandle();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsModified(
      userInfo.address[0] != form?.address ||
        userInfo.address[1] != form?.zip_code ||
        userInfo.contact_number != form?.contact_number
    );
  }, [form]);

  useEffect(() => {
    resetHandle();
  }, [userInfo]);

  return (
    <View className="w-full">
      <View className=" w-full px-4 py-4 rounded-xl bg-background shadow-lg shadow-black">
        <Text className="text-xl text-uBlack font-black my-2">
          II. CONTACT INFORMATION
        </Text>
        <View className="w-full px-4 mx-2 gap-2">
          <Text className="text-base text-uGray font-semibold -mb-1">
            Complete Address
          </Text>
          <ParagraphBox
            value={form?.address!}
            placeholder="112 Magsaysay st. San Pablo, Castillejos, Zambales"
            handleChangeText={(e) =>
              setForm({ ...form, address: e.toUpperCase() })
            }
            containerStyles="bg-white rounded-lg h-20 "
          />
          <TextBox
            textValue={form?.zip_code!}
            title="Zip Code"
            placeholder="2208"
            handleChangeText={(e) => setForm({ ...form, zip_code: e })}
            titleTextStyles="text-uGray text-base font-semibold"
            textInputStyles="text-base text-uBlack"
            boxStyles="w-full bg-white rounded-xl "
          />
          <TextBox
            textValue={form?.contact_number!}
            title="Contact Number"
            placeholder="09123456789"
            handleChangeText={(e) =>
              setForm({ ...form, contact_number: e.toUpperCase() })
            }
            titleTextStyles="text-uGray text-base font-semibold"
            textInputStyles="text-base text-uBlack"
            boxStyles="w-full bg-white rounded-xl "
          />
        </View>

        {!!isModified && (
          <View className="self-end mt-4 flex-row">
            <CustomButton
              title="Update"
              handlePress={updateHandle}
              containerStyles="bg-secondary"
              isLoading={!isInternetConnection}
            />
            <CustomButton
              title="Reset"
              handlePress={resetHandle}
              containerStyles="ml-2 border border-secondary bg-transparent"
              textStyles="text-secondary"
            />
          </View>
        )}
      </View>
      {!!isLoading && (
        <View className="absolute items-center justify-center h-full w-full rounded-xl overflow-hidden">
          <View className="absolute h-full w-full bg-background opacity-90"></View>
          <Loading
            loadingPrompt="Applying Changes"
            containerStyles="absolute"
            loadingColor={color.secondary}
          />
        </View>
      )}
    </View>
  );
};

export default Contact;
