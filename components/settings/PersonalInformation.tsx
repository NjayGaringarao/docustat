import { View, Text } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { UserType } from "@/constants/models";
import ProfilePicturePicker from "../ProfilePicturePicker";
import { useGlobalContext } from "@/context/GlobalProvider";
import { ImagePickerAsset } from "expo-image-picker";
import BirthDatePicker from "../profile/BirthDatePicker";
import CivilStatusPicker from "../profile/CivilStatusPicker";
import SexPicker from "../profile/SexPicker";
import TextBox from "../TextBox";
import Loading from "../Loading";
import { color } from "@/constants/color";
import CustomButton from "../CustomButton";
import { confirmAction } from "@/lib/commonUtil";
import Toast from "react-native-toast-message";
import { updateUserInformation } from "@/services/user";

interface IForm {
  firstName: string;
  middleName?: string;
  lastName: string;
  sex?: string;
  birthdate?: Date;
  civil_status?: string;
}

const PersonalInformation = () => {
  const { userInfo, refreshUserRecord, isInternetConnection } =
    useGlobalContext();
  const [isModified, setIsModified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newProfilePicture, setNewProfilePicture] = useState<
    ImagePickerAsset | undefined
  >();
  const [form, setForm] = useState<IForm>({
    firstName: "",
    middleName: "",
    lastName: "",
    sex: "",
    birthdate: new Date(),
    civil_status: "",
  });
  const profilePickerRef = useRef<{ clear: () => void }>(null);

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
        !(await updateUserInformation(userInfo.id, form, newProfilePicture))
      ) {
        throw Error;
      }

      Toast.show({
        type: "success",
        text1: "Update Success",
        text2: "Successfully updated personal information",
      });

      refreshUserRecord({
        info: true,
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Update Failed",
        text2: `${error}`,
      });
      clearHandle();
    } finally {
      setIsLoading(false);
    }
  };

  const clearHandle = () => {
    if (userInfo.name) {
      setForm({
        firstName: userInfo.name[0] ? userInfo.name[0] : "",
        middleName: userInfo.name[1] ? userInfo.name[1] : "",
        lastName: userInfo.name[2] ? userInfo.name[2] : "",
        sex: userInfo.sex,
        birthdate: userInfo.birthdate,
        civil_status: userInfo.civil_status,
      });
    }
    clearProfilePicture();
  };

  const clearProfilePicture = () => {
    profilePickerRef.current?.clear();
  };

  useEffect(() => {
    clearHandle();
  }, [userInfo]);

  useEffect(() => {
    if (userInfo.name) {
      if (
        form.firstName !== userInfo.name[0] ||
        form.middleName !== userInfo.name[1] ||
        form.lastName !== userInfo.name[2] ||
        form.birthdate !== userInfo.birthdate ||
        form.civil_status !== userInfo.civil_status ||
        form.sex !== userInfo.sex ||
        newProfilePicture
      ) {
        setIsModified(true);
      } else {
        setIsModified(false);
      }
    }
  }, [form, newProfilePicture]);

  return (
    <View className="w-full">
      <View className="w-full px-4 py-4 rounded-xl bg-background shadow-lg shadow-black mt-1">
        <Text className="text-xl text-uBlack font-black">
          I. PERSONAL INFORMATION
        </Text>
        <View className="flex-row gap-4 mt-4">
          <ProfilePicturePicker
            ref={profilePickerRef}
            userInfo={userInfo}
            setNewProfilePicture={(e) => setNewProfilePicture(e)}
            newProfilePicture={newProfilePicture}
            containerStyle=" w-40 h-full shadow-lg shadow-primary rounded-xl"
            imageStyle="bg-panel flex-1 rounded-xl"
          />
          <View className="flex-1 mx-2 gap-2">
            <TextBox
              title="Last Name"
              textValue={form.lastName!}
              placeholder="Enter your last name"
              handleChangeText={(e) =>
                setForm({ ...form, lastName: e.toLocaleUpperCase() })
              }
              containerStyles="w-full "
              titleTextStyles="text-uGray text-base font-semibold"
              textInputStyles="text-base text-uBlack"
              boxStyles="w-full bg-white rounded-xl "
            />
            <TextBox
              title="First Name"
              textValue={form.firstName!}
              placeholder="Enter your first name"
              handleChangeText={(e) =>
                setForm({ ...form, firstName: e.toLocaleUpperCase() })
              }
              containerStyles="w-full "
              titleTextStyles="text-uGray text-base font-semibold"
              textInputStyles="text-base text-uBlack"
              boxStyles="w-full bg-white rounded-xl "
            />
            <TextBox
              title="Middle Name"
              textValue={form.middleName!}
              placeholder="Enter your middle name"
              handleChangeText={(e) =>
                setForm({ ...form, middleName: e.toLocaleUpperCase() })
              }
              containerStyles="w-full "
              titleTextStyles="text-uGray text-base font-semibold"
              textInputStyles="text-base text-uBlack"
              boxStyles="w-full bg-white rounded-xl "
            />
          </View>
        </View>

        <View className="w-full px-4 mx-2 gap-4 flex-row mt-4">
          <View className="flex-1">
            <Text className="text-lg text-uBlack font-semibold -mb-2">Sex</Text>
            <SexPicker
              value={form.sex!}
              onChange={(e) => setForm({ ...form, sex: e })}
              containerStyle="flex-1 border-b border-secondary h-10"
            />
          </View>
          <View className="flex-1">
            <Text className="text-lg text-uBlack font-semibold -mb-2">
              Birthdate
            </Text>
            <BirthDatePicker
              value={form.birthdate}
              onChange={(e) => setForm({ ...form, birthdate: e })}
              containerStyle="flex-1 border-b border-secondary h-10"
            />
          </View>
        </View>

        <View className="w-full px-4 mx-2 gap-4 flex-row mt-2">
          <View className="w-1/2">
            <Text className="text-lg text-uBlack font-semibold ">
              Civil Status
            </Text>

            <CivilStatusPicker
              value={form.civil_status!}
              onChange={(e) => setForm({ ...form, civil_status: e })}
              containerStyle="flex-1 border-b border-secondary h-10"
            />
          </View>
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
              handlePress={clearHandle}
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

export default PersonalInformation;
