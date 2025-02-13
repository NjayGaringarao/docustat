import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import TextBox from "@/components/TextBox";
import CustomButton from "@/components/CustomButton";
import SexPicker from "@/components/profile/SexPicker";
import BirthDatePicker from "@/components/profile/BirthDatePicker";
import CivilStatusPicker from "@/components/profile/CivilStatusPicker";
import ParagraphBox from "@/components/ParagraphBox";
import YearLevelPicker from "@/components/signup/YearLevelPicker";
import DeptProgPicker from "@/components/signup/DepProgPicker";
import YearPicker from "@/components/profile/YearPicker";
import AdminDepPicker from "@/components/signup/AdminDepPicker";
import { confirmAction } from "@/lib/commonUtil";
import Loading from "@/components/Loading";
import { color } from "@/constants/color";
import { useGlobalContext } from "@/context/GlobalProvider";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Toast from "react-native-toast-message";
import { updateUserInfo } from "@/services/user";

interface FormType {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  sex?: string;
  birthdate?: Date;
  civil_status?: string;
  address?: string;
  zipCode?: string;
  contact_number?: string;
  department?: string;
  dept_prog?: string;
  year_level?: string;
  year_graduated?: Date;
}

const profile = () => {
  const { userInfo, userCredential, refreshUserRecord } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState<FormType>();

  const resetHandle = () => {
    setForm({
      firstName: userInfo.name[0],
      middleName: userInfo.name[1],
      lastName: userInfo.name[2],
      sex: userInfo.sex,
      birthdate: userInfo.birthdate,
      civil_status: userInfo.civil_status,
      address: userInfo.address[0],
      zipCode: userInfo.address[1],
      contact_number: userInfo.contact_number,
      department: userInfo.admin_info?.department,
      dept_prog: userInfo.student_info?.dept_prog,
      year_level: userInfo.student_info?.year_level,
      year_graduated: userInfo.alumni_info?.year_graduated,
    });
  };

  const verifyInput = () => {
    if (!form) return false;
    if (!form.firstName?.length || !form.lastName?.length) {
      Toast.show({
        type: "error",
        text1: "Incomplete Name",
        text2: "Please fill out first and last name.",
      });
      return false;
    } else if (!form.sex) {
      Toast.show({
        type: "error",
        text1: "Unset Sex",
        text2: "Please set your sex.",
      });
      return false;
    } else if (!form.birthdate) {
      Toast.show({
        type: "error",
        text1: "Unset Birthdate",
        text2: "Please set your birthdate.",
      });
      return false;
    } else if (
      new Date().getTime() - new Date(form.birthdate).getTime() <
      12 * 365.25 * 24 * 60 * 60 * 1000
    ) {
      Toast.show({
        type: "error",
        text1: "Invalid Age due to Birthdate",
        text2: "Age should not be less than 12 years old",
      });
      return false;
    } else if (!form.civil_status) {
      Toast.show({
        type: "error",
        text1: "Unset Civil Status",
        text2: "Please set your civil status.",
      });
      return false;
    } else if (!(form.address && form.address.length > 10)) {
      Toast.show({
        type: "error",
        text1: "Incomplete Address",
        text2: "Please provide your complete address.",
      });
      return false;
    } else if (!(form.zipCode && form.zipCode.length === 4)) {
      Toast.show({
        type: "error",
        text1: "Invalid Zip Code",
        text2: "Please provide the correct zip code for your address.",
      });
      return false;
    } else if (!(form.contact_number && form.contact_number.length > 10)) {
      Toast.show({
        type: "error",
        text1: "Invalid Contact Number",
        text2: "Please provide a valid mobile number.",
      });
      return false;
    }

    if (userCredential.role === "admin") {
      if (!form.department) {
        Toast.show({
          type: "error",
          text1: "Unset Department",
          text2: "Please set the department to which you belong.",
        });
        return false;
      }
    } else {
      if (!form.dept_prog) {
        Toast.show({
          type: "error",
          text1: "Unset Department - Program",
          text2: "Please set the Department - Program you are enrolled in.",
        });
        return false;
      } else if (!form.year_level) {
        Toast.show({
          type: "error",
          text1: "Unset Year Level",
          text2: "Please set your current year level.",
        });
        return false;
      }
    }

    return true;
  };

  const saveHandle = async () => {
    setIsLoading(true);
    if (!verifyInput()) {
      setIsLoading(false);
      return;
    }

    if (
      !(await confirmAction(
        "Confirm Changes",
        "Do you want to apply the changes you've made?"
      ))
    ) {
      setIsLoading(false);
      return;
    }

    try {
      if (form) {
        await updateUserInfo(userInfo.id, userCredential.role, form);
      } else {
        throw Error("There was a system error.");
      }
      Toast.show({
        type: "success",
        text1: "Update Success",
        text2: "Successfully updated user information",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Failed",
        text2: `${error}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    resetHandle();
    setIsLoading(false);
  }, [userInfo]);

  const refreshUserInfoHandle = () => {
    setIsLoading(true);
    refreshUserRecord({ info: true });
  };

  if (!form || !userCredential) {
    return (
      <View className="flex-1 items-center justify-center rounded-xl mx-2 my-4 gap-4 bg-panel">
        <Loading loadingPrompt="Please wait" loadingColor={color.secondary} />
      </View>
    );
  }

  return (
    <>
      <View className="flex-1 px-2 py-4 gap-4 bg-background">
        <View className=" justify-between items-center flex-row">
          <Text className="font-black text-secondary text-3xl -mb-2">
            PROFILE
          </Text>
          <CustomButton
            handlePress={refreshUserInfoHandle}
            containerStyles="bg-transparent"
          >
            <FontAwesome name="refresh" size={28} color={color.secondary} />
          </CustomButton>
        </View>
        <ScrollView
          className="flex-1 bg-panel rounded-xl px-2 py-4"
          contentContainerStyle={{
            alignItems: "flex-start",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {/* Name Fields */}
          <Text className="text-lg text-uBlack font-semibold">Name</Text>
          <View className="w-full px-4 mx-2 gap-2 border-l border-secondary">
            <TextBox
              title="Last Name"
              textValue={form.lastName!}
              placeholder="Enter your last name"
              handleChangeText={(e) => setForm({ ...form, lastName: e })}
              containerStyles="w-full "
              titleTextStyles="text-uGray text-base font-semibold"
              textInputStyles="text-base text-uBlack"
              boxStyles="w-full bg-white rounded-xl "
            />
            <TextBox
              title="First Name"
              textValue={form.firstName!}
              placeholder="Enter your first name"
              handleChangeText={(e) => setForm({ ...form, firstName: e })}
              containerStyles="w-full "
              titleTextStyles="text-uGray text-base font-semibold"
              textInputStyles="text-base text-uBlack"
              boxStyles="w-full bg-white rounded-xl "
            />
            <TextBox
              title="Middle Name"
              textValue={form.middleName!}
              placeholder="Enter your middle name"
              handleChangeText={(e) => setForm({ ...form, middleName: e })}
              containerStyles="w-full "
              titleTextStyles="text-uGray text-base font-semibold"
              textInputStyles="text-base text-uBlack"
              boxStyles="w-full bg-white rounded-xl "
            />
          </View>

          {/* Sex and Birthdate */}
          <View className="w-full px-4 mx-2 gap-4 flex-row mt-2">
            <View className="flex-1">
              <Text className="text-lg text-uBlack font-semibold -mb-2">
                Sex
              </Text>
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

          {/* Address Fields */}
          <Text className="text-lg text-uBlack font-semibold mt-4">
            Contact Information
          </Text>
          <View className="w-full px-4 mx-2 gap-2 border-l border-secondary">
            <Text className="text-base text-uGray font-semibold -mb-1">
              Complete Address
            </Text>
            <ParagraphBox
              value={form.address!}
              placeholder="112 Magsaysay st. San Pablo, Castillejos, Zambales"
              handleChangeText={(e) =>
                setForm({ ...form, address: e.toUpperCase() })
              }
              containerStyles="bg-white rounded-lg h-20 "
            />
            <TextBox
              textValue={form.zipCode!}
              title="Zip Code"
              placeholder="2208"
              handleChangeText={(e) => setForm({ ...form, zipCode: e })}
              titleTextStyles="text-uGray text-base font-semibold"
              textInputStyles="text-base text-uBlack"
              boxStyles="w-full bg-white rounded-xl "
            />
            <TextBox
              textValue={form.contact_number!}
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

          {/* Role-Specific Fields */}
          {userCredential.role === "admin" && (
            <>
              <Text className="text-lg text-uBlack font-semibold mt-4">
                Admin Information
              </Text>
              <View className="w-full px-4 mx-2 gap-2 border-l border-secondary">
                <Text className="text-base text-uBlack font-semibold">
                  Department
                </Text>
                <AdminDepPicker
                  value={form.department || ""}
                  onChange={(e) => setForm({ ...form, department: e })}
                  containerStyle="rounded-xl bg-white"
                />
              </View>
            </>
          )}
          {userCredential.role === "student" && (
            <>
              <Text className="text-lg text-uBlack font-semibold mt-4">
                Student Information
              </Text>
              <View className="w-full px-4 mx-2 gap-2 border-l border-secondary">
                <Text className="text-base text-uGray font-semibold -mb-1">
                  Department - Program
                </Text>
                <DeptProgPicker
                  value={form.dept_prog!}
                  onChange={(value) => setForm({ ...form, dept_prog: value })}
                  containerStyle="rounded-xl bg-white"
                />
                <Text className="text-base text-uGray font-semibold -mb-1">
                  Year Level
                </Text>
                <YearLevelPicker
                  value={form.year_level!}
                  onChange={(value) => setForm({ ...form, year_level: value })}
                  containerStyle="rounded-xl bg-white"
                />
              </View>
            </>
          )}
          {userCredential.role === "alumni" && (
            <>
              <Text className="text-lg text-uBlack font-semibold mt-4">
                Alumni Information
              </Text>
              <View className="w-full px-4 mx-2 gap-2 border-l border-secondary">
                <Text className="text-base text-uGray font-semibold -mb-1">
                  Year Graduated
                </Text>
                <YearPicker
                  value={form.year_graduated}
                  onChange={(e) => setForm({ ...form, birthdate: e })}
                  containerStyle="flex-1 border-b border-secondary h-10"
                />
              </View>
            </>
          )}

          {/* Credentials */}
          <Text className="text-lg text-uBlack font-semibold mt-4">
            Login Credentials
          </Text>
          <View className="w-full px-4 mx-2 gap-2 border-l border-secondary">
            <TextBox
              title="Role"
              textValue={userCredential.role.toUpperCase()}
              placeholder="Unset"
              handleChangeText={() => {}}
              containerStyles="w-full "
              titleTextStyles="text-uGray text-base font-semibold"
              textInputStyles="text-base text-uBlack"
              boxStyles="w-full bg-white rounded-xl "
              isDisabled
            />
            <TextBox
              title="Email"
              textValue={userCredential.email}
              placeholder="Unset"
              handleChangeText={() => {}}
              isDisabled
              containerStyles="w-full "
              titleTextStyles="text-uGray text-base font-semibold"
              textInputStyles="text-base text-uBlack"
              boxStyles="w-full bg-white rounded-xl "
              isPassword
            />

            {userCredential.role != "alumni" ? (
              <TextBox
                title={
                  userCredential.role === "admin"
                    ? "Employee ID"
                    : "Student Number"
                }
                textValue={userCredential.id}
                placeholder="Unset"
                handleChangeText={() => {}}
                containerStyles="w-full "
                titleTextStyles="text-uGray text-base font-semibold"
                textInputStyles="text-base text-uBlack"
                boxStyles="w-full bg-white rounded-xl "
                isDisabled
                isPassword
              />
            ) : null}
          </View>

          {/* Created At */}
          <View className="w-11/12 self-center mt-8 mb-14 py-4 items-center justify-center rounded-xl bg-background">
            <Text className="text-lg text-uBlack font-semibold">
              Docustat member since:{" "}
              {userInfo?.created_at.toISOString().slice(0, 10)}
            </Text>
          </View>
        </ScrollView>

        <View className="flex-row gap-2 justify-end items-center">
          <CustomButton
            title="Save Changes"
            handlePress={saveHandle}
            containerStyles="flex-1 bg-secondary"
            isLoading={isLoading}
          />
          <CustomButton
            title="Reset"
            textStyles="text-secondary"
            handlePress={resetHandle}
            containerStyles="w-24 border-secondary border bg-transparent"
          />
        </View>
      </View>
      {!!isLoading && (
        <View className="absolute w-full h-full items-center justify-center">
          <View className="absolute w-full h-full bg-white opacity-95" />
          <Loading loadingPrompt="Please wait" loadingColor={color.secondary} />
        </View>
      )}
    </>
  );
};

export default profile;
