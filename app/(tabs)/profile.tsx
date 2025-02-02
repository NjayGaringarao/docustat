import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import TextBox from "@/components/TextBox";
import CustomButton from "@/components/CustomButton";
import { UserType, Credential } from "@/constants/models";
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
import {
  generateDummyStudent,
  generateDummyStudentCredentials,
} from "@/services/dummyData";

interface FormType {
  name: string[];
  sex: string;
  birthdate: Date;
  civil_status: string;
  address: [string, string];
  department: string;
  dept_prog: string;
  year_level: string;
  year_graduated: Date;
}

const profile = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [_userInfo, _setUserInfo] = useState<UserType.Info>();
  const [userCredential, setUserCredential] = useState<Credential>();

  const [form, setForm] = useState<FormType>(Object);

  const resetHandle = () => {
    setForm({
      name: [_userInfo?.name[0]!, _userInfo?.name[1]!, _userInfo?.name[2]!],
      sex: _userInfo?.sex!,
      birthdate: _userInfo?.birthdate || new Date(0),
      civil_status: _userInfo?.civil_status!,
      address: [_userInfo?.address[0]!, _userInfo?.address[1]!],
      department: _userInfo?.admin_info?.department || "",
      dept_prog: _userInfo?.student_info?.dept_prog || "",
      year_level: _userInfo?.student_info?.year_level || "",
      year_graduated: _userInfo?.alumni_info?.year_graduated || new Date(0),
    });
    setUserCredential({
      id: "",
      email: "",
      role: "",
    });
  };

  const verifyInput = () => {
    return true;
  };

  const saveHandle = async () => {
    setIsSubmitting(true);
    if (!verifyInput()) {
      setIsSubmitting(false);
      return;
    }

    if (
      await confirmAction(
        "Confirm Changes",
        "Do you want to apply the changes you've made?"
      )
    ) {
      setIsSubmitting(false);
      return;
    }
  };

  useEffect(() => {
    if (_userInfo)
      setForm({
        name: _userInfo.name || [],
        sex: _userInfo.sex!,
        birthdate: _userInfo.birthdate || new Date(0),
        civil_status: _userInfo.civil_status!,
        address: [_userInfo.address[0], _userInfo.address[1]],
        department: _userInfo.admin_info?.department || "",
        dept_prog: _userInfo.student_info?.dept_prog || "",
        year_level: _userInfo.student_info?.year_level || "",
        year_graduated: _userInfo.alumni_info?.year_graduated || new Date(0),
      });
  }, [_userInfo]);

  useEffect(() => {
    const queryUser = async () => {
      _setUserInfo(await generateDummyStudent());
      setUserCredential(await generateDummyStudentCredentials());
    };

    queryUser();
  }, []);

  if (form && userCredential) {
    return (
      <View className="flex-1 px-2 py-4 gap-4">
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
              title="Last"
              textValue={form.name[0]}
              placeholder="Unset"
              handleChangeText={(e) =>
                setForm({ ...form, name: [e, form.name[1], form.name[2]] })
              }
              containerStyles="w-full "
              titleTextStyles="text-uGray text-base font-semibold"
              textInputStyles="text-sm text-uBlack"
              boxStyles="w-full bg-white rounded-xl "
            />
            <TextBox
              title="First"
              textValue={form.name[1]}
              placeholder="Unset"
              handleChangeText={(e) =>
                setForm({ ...form, name: [form.name[0], e, form.name[2]] })
              }
              containerStyles="w-full "
              titleTextStyles="text-uGray text-base font-semibold"
              textInputStyles="text-sm text-uBlack"
              boxStyles="w-full bg-white rounded-xl "
            />
            <TextBox
              title="Middle"
              textValue={form.name[2]}
              placeholder="Unset"
              handleChangeText={(e) =>
                setForm({ ...form, name: [form.name[0], form.name[1], e] })
              }
              containerStyles="w-full "
              titleTextStyles="text-uGray text-base font-semibold"
              textInputStyles="text-sm text-uBlack"
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
                value={form.sex}
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
                value={form.civil_status}
                onChange={(e) => setForm({ ...form, civil_status: e })}
                containerStyle="flex-1 border-b border-secondary h-10"
              />
            </View>
          </View>

          {/* Address Fields */}
          <Text className="text-lg text-uBlack font-semibold mt-4">
            Address
          </Text>
          <View className="w-full px-4 mx-2 gap-2 border-l border-secondary">
            <Text className="text-base text-uGray font-semibold -mb-1">
              Complete Address
            </Text>
            <ParagraphBox
              value={form.address[0]}
              placeholder="112 Magsaysay st. San Pablo, Castillejos, Zambales"
              handleChangeText={(e) =>
                setForm({ ...form, address: [form.address[0], e] })
              }
              containerStyles="bg-white rounded-lg h-16 "
            />
            <TextBox
              textValue={form.address[1]}
              title="Zip Code"
              placeholder="2208"
              handleChangeText={(e) =>
                setForm({ ...form, address: [form.address[1], e] })
              }
              titleTextStyles="text-uGray text-base font-semibold"
              textInputStyles="text-sm text-uBlack"
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
                <Text className="text-sm text-uBlack font-semibold">
                  Department
                </Text>
                <AdminDepPicker
                  value={form.department}
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
                  value={form.dept_prog}
                  onChange={(value) => setForm({ ...form, dept_prog: value })}
                  containerStyle="rounded-xl bg-white"
                />
                <Text className="text-base text-uGray font-semibold -mb-1">
                  Year Level
                </Text>
                <YearLevelPicker
                  value={form.year_level}
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
              textInputStyles="text-sm text-uBlack"
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
              textInputStyles="text-sm text-uBlack"
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
                textInputStyles="text-sm text-uBlack"
                boxStyles="w-full bg-white rounded-xl "
                isDisabled
                isPassword
              />
            ) : null}
          </View>

          {/* Created At */}
          <Text className="text-lg text-uBlack mt-8 mb-14 font-semibold">
            You are Docustat member since:{" "}
            {_userInfo?.created_at.toISOString().slice(0, 10)}
          </Text>
        </ScrollView>

        <View className="flex-row gap-2 justify-end items-center">
          <CustomButton
            title="Save Changes"
            handlePress={saveHandle}
            containerStyles="flex-1 bg-secondary"
            isLoading={isSubmitting}
          />
          <CustomButton
            title="Reset"
            textStyles="text-secondary"
            handlePress={resetHandle}
            containerStyles="w-24 border-secondary border bg-transparent"
          />
        </View>
      </View>
    );
  } else {
    return (
      <View className="flex-1 items-center justify-center rounded-xl mx-2 my-4 gap-4 bg-panel">
        <Loading loadingPrompt="Please wait" loadingColor={color.secondary} />
      </View>
    );
  }
};

export default profile;
