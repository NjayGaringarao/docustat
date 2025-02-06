import { View, Text, Image, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import image from "@/constants/image";
import { Picker } from "@react-native-picker/picker";
import TextBox from "@/components/TextBox";
import CustomButton from "@/components/CustomButton";
import { color } from "@/constants/color";
import DeptProgPicker from "@/components/signup/DepProgPicker";
import YearLevelPicker from "@/components/signup/YearLevelPicker";
import AdminDepPicker from "@/components/signup/AdminDepPicker";
import Toast from "react-native-toast-message";
import {
  _createDocument,
  _deleteDocument,
  _listDocuments,
  generateAvatar,
} from "@/services/appwrite";
import { isEmailAvailable, isIDAvailable } from "@/services/database";
import Loading from "@/components/Loading";
import {
  createAdminAccount,
  createStudentAccount,
  emailPasswordSignIn,
} from "@/services/auth";
import { useGlobalContext } from "@/context/GlobalProvider";

const sign_up = () => {
  const { initializeGlobalState } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);
  const [accountType, setAccountType] = useState<"student" | "admin">(
    "student"
  );
  const [nameForm, setNameForm] = useState({
    first: "",
    middle: "",
    last: "",
  });

  const [credentialForm, setCredentialForm] = useState({
    email: "",
    password: "",
    confPassword: "",
  });

  const [studentForm, setStudentForm] = useState({
    student_id: "",
    dept_prog: "",
    year_level: "",
  });

  const [adminForm, setAdminForm] = useState({
    employee_id: "",
    department: "",
  });

  const isInputValid = async () => {
    if (!nameForm.last.length || !nameForm.first.length) {
      Toast.show({
        type: "error",
        text1: "Incomplete Name",
        text2: "Please fillout first and last name.",
      });
      return false;
    }

    if (
      accountType == "admin" &&
      (!adminForm.employee_id.length || !adminForm.department.length)
    ) {
      Toast.show({
        type: "error",
        text1: "Incomplete Admin Details",
        text2: "Please fillout Employee ID and set department.",
      });
      return false;
    }

    if (
      accountType == "student" &&
      (!studentForm.student_id.length ||
        !studentForm.dept_prog.length ||
        !studentForm.year_level.length)
    ) {
      Toast.show({
        type: "error",
        text1: "Incomplete Student Details",
        text2:
          "Please fillout Student ID, set Department-Program, and set Year Level.",
      });
      return false;
    }

    if (!(await isEmailAvailable(credentialForm.email))) {
      Toast.show({
        type: "error",
        text1: "Email Not Available",
        text2:
          "The email you have entered is already being used by the existing account.",
      });
      return false;
    }

    if (
      !(await isIDAvailable(
        accountType == "admin" ? adminForm.employee_id : studentForm.student_id
      ))
    ) {
      Toast.show({
        type: "error",
        text1: `${
          accountType == "admin" ? "Employee" : "Student"
        } ID Not Available`,
        text2: `The ${
          accountType == "admin" ? "Employee" : "Student"
        } ID you have entered is already being used by the existing account.`,
      });
      return false;
    }

    if (credentialForm.password.length < 8) {
      Toast.show({
        type: "error",
        text1: "Weak Password",
        text2: "Password should be not less than 8 characters",
      });
      return false;
    }

    if (credentialForm.password != credentialForm.confPassword) {
      Toast.show({
        type: "error",
        text1: "Password Not Matched",
        text2: "Your password does not matched to your confirmation password.",
      });
      return false;
    }

    return true;
  };

  const signUpStudent = async () => {
    try {
      const avatar = generateAvatar(
        `${nameForm.first.trim()} ${nameForm.last.trim()}`
      );

      await createStudentAccount({
        student_id: studentForm.student_id.trim(),
        email: credentialForm.email.trim(),
        password: credentialForm.password,
        name: [
          nameForm.first.trim(),
          nameForm.middle.trim(),
          nameForm.last.trim(),
        ],
        dept_prog: studentForm.dept_prog,
        year_level: studentForm.year_level,
        avatar_url: avatar.href,
      });

      Toast.show({
        type: "success",
        text1: "Signup Success",
        text2: "Your student account is succesfully created.",
      });

      await emailPasswordSignIn(
        credentialForm.email.trim(),
        credentialForm.password
      );
      await initializeGlobalState();
    } catch (error) {
      console.log("signUp.signUpStudent : ", error);
      Toast.show({
        type: "error",
        text1: "Failed",
        text2:
          "There was an error creating your account. Please try again later.",
      });
      setIsLoading(false);
    }
  };

  const signUpAdmin = async () => {
    try {
      const avatar = generateAvatar(
        `${nameForm.first.slice()} ${nameForm.last.slice()}`
      );
      await createAdminAccount({
        employee_id: adminForm.employee_id.slice(),
        email: credentialForm.email.slice(),
        password: credentialForm.password,
        name: [
          nameForm.first.slice(),
          nameForm.middle.slice(),
          nameForm.last.slice(),
        ],
        department: adminForm.department,
        avatar_url: avatar.href,
      });

      Toast.show({
        type: "success",
        text1: "Signup Success",
        text2: "Your admin account is succesfully created.",
      });

      await emailPasswordSignIn(
        credentialForm.email.trim(),
        credentialForm.password
      );
      await initializeGlobalState();
    } catch (error) {
      console.log("signUp.signUpAdmin : ", error);
      Toast.show({
        type: "error",
        text1: "Failed",
        text2:
          "There was an error creating your account. Please try again later.",
      });
      setIsLoading(false);
    }
  };

  const signUpHandle = async () => {
    setIsLoading(true);
    if (!(await isInputValid())) {
      setIsLoading(false);
      return;
    }

    if (accountType === "admin") {
      signUpAdmin();
    } else {
      signUpStudent();
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
          <View className="flex-1 justify-evenly items-center">
            <View className="w-10/12 -mb-6">
              <Text
                className="text-5xl text-secondary"
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
                className="w-full text-xs text-uBlack text-start"
                style={{
                  fontFamily: "Sarina",
                }}
              >
                {"School Document Request and Status Update"}
              </Text>
            </View>

            <View className="items-center mt-6 gap-2 w-10/12">
              <View className="flex flex-row items-center w-full gap-2">
                <Text className="text-xl text-uGray font-semibold">
                  Sign up as
                </Text>
                <View className="border border-secondary rounded-xl flex-1 justify-center h-12 mt-1">
                  <Picker
                    selectedValue={accountType}
                    onValueChange={(itemValue) => setAccountType(itemValue)}
                    style={{
                      height: 56,
                    }}
                  >
                    <Picker.Item label="Student" value="student" />
                    <Picker.Item label="Admin" value="admin" />
                  </Picker>
                </View>
              </View>

              <ScrollView
                className="w-full border-t-2 border-b-2 py-4 border-secondary h-[50vh]"
                contentContainerStyle={{
                  alignItems: "flex-start",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                {/* Name Section */}
                <View className="w-full">
                  <Text className="text-xl font-black text-uBlack my-2">
                    NAME
                  </Text>
                  <View className="w-full pl-4 gap-2 border-l border-secondary">
                    <TextBox
                      textValue={nameForm.last}
                      title="Surname"
                      placeholder="DELA CRUZ"
                      handleChangeText={(e) =>
                        setNameForm({ ...nameForm, last: e.toUpperCase() })
                      }
                      titleTextStyles="text-uGray text-base font-semibold"
                      textInputStyles="text-base text-uBlack"
                      boxStyles="w-full bg-white rounded-xl border-secondary border "
                    />

                    <TextBox
                      textValue={nameForm.first}
                      title="First Name"
                      placeholder="JUAN"
                      handleChangeText={(e) =>
                        setNameForm({ ...nameForm, first: e.toUpperCase() })
                      }
                      titleTextStyles="text-uGray text-base font-semibold"
                      textInputStyles="text-base text-uBlack"
                      boxStyles="w-full bg-white rounded-xl border-secondary border"
                    />

                    <TextBox
                      textValue={nameForm.middle}
                      title="Middle Name (Optional)"
                      placeholder="Tagailog"
                      handleChangeText={(e) =>
                        setNameForm({ ...nameForm, middle: e.toUpperCase() })
                      }
                      titleTextStyles="text-uGray text-base font-semibold"
                      textInputStyles="text-base text-uBlack"
                      boxStyles="w-full bg-white rounded-xl border-secondary border"
                    />
                  </View>
                </View>

                {/* Student Forms */}
                {accountType === "student" && (
                  <View className="w-full mt-4">
                    <Text className="text-xl font-black text-uBlack my-2">
                      STUDENT DETAILS
                    </Text>
                    <View className="w-full pl-4 gap-2 border-l border-secondary">
                      <TextBox
                        textValue={studentForm.student_id}
                        title="Student ID"
                        placeholder="2022-12345"
                        handleChangeText={(e) =>
                          setStudentForm({ ...studentForm, student_id: e })
                        }
                        titleTextStyles="text-uGray text-base font-semibold"
                        textInputStyles="text-base text-uBlack"
                        boxStyles="w-full bg-white rounded-xl border-secondary border"
                      />

                      <DeptProgPicker
                        value={studentForm.dept_prog}
                        onChange={(value) =>
                          setStudentForm({ ...studentForm, dept_prog: value })
                        }
                        containerStyle="border border-secondary rounded-xl bg-white"
                      />

                      <YearLevelPicker
                        value={studentForm.year_level}
                        onChange={(value) =>
                          setStudentForm({ ...studentForm, year_level: value })
                        }
                        containerStyle="border border-secondary rounded-xl bg-white"
                      />
                    </View>
                  </View>
                )}

                {accountType === "admin" && (
                  <View className="w-full mt-4">
                    <Text className="text-xl font-black text-uBlack my-2">
                      ADMIN DETAILS
                    </Text>
                    <View className="w-full pl-4 gap-2 border-l border-secondary">
                      <TextBox
                        textValue={adminForm.employee_id}
                        title="Employee ID"
                        placeholder="ADMIN-12345"
                        handleChangeText={(e) =>
                          setAdminForm({ ...adminForm, employee_id: e })
                        }
                        titleTextStyles="text-uGray text-base font-semibold"
                        textInputStyles="text-base text-uBlack"
                        boxStyles="w-full bg-white rounded-xl border-secondary border"
                      />
                      <AdminDepPicker
                        value={adminForm.department}
                        onChange={(value) =>
                          setAdminForm({ ...adminForm, department: value })
                        }
                        containerStyle="border border-secondary rounded-xl bg-white"
                      />
                    </View>
                  </View>
                )}

                {/* Credential Section */}
                <View className="w-full mt-4">
                  <Text className="text-xl font-black text-uBlack my-2">
                    CREDENTIALS
                  </Text>
                  <View className="w-full pl-4 gap-2 border-l border-secondary">
                    <TextBox
                      textValue={credentialForm.email}
                      title="Email"
                      placeholder="example@prmsu.edu.ph"
                      handleChangeText={(e) =>
                        setCredentialForm({ ...credentialForm, email: e })
                      }
                      titleTextStyles="text-uGray text-base font-semibold"
                      textInputStyles="text-base text-uBlack"
                      boxStyles="w-full bg-white rounded-xl border-secondary border"
                    />
                    <TextBox
                      textValue={credentialForm.password}
                      title="Password"
                      placeholder="********"
                      handleChangeText={(e) =>
                        setCredentialForm({ ...credentialForm, password: e })
                      }
                      isPassword
                      titleTextStyles="text-uGray text-base font-semibold"
                      textInputStyles="text-base text-uBlack"
                      boxStyles="w-full bg-white rounded-xl border-secondary border"
                    />
                    <TextBox
                      textValue={credentialForm.confPassword}
                      title="Confirm Password"
                      placeholder="********"
                      handleChangeText={(e) =>
                        setCredentialForm({
                          ...credentialForm,
                          confPassword: e,
                        })
                      }
                      isPassword
                      titleTextStyles="text-uGray text-base font-semibold"
                      textInputStyles="text-base text-uBlack"
                      boxStyles="w-full bg-white rounded-xl border-secondary border"
                    />
                  </View>
                </View>

                <CustomButton
                  title="Sign Up"
                  textStyles="text-white"
                  containerStyles="bg-secondary h-11 w-full rounded-xl mt-4 mb-12"
                  handlePress={signUpHandle}
                />
              </ScrollView>
            </View>
          </View>
        </View>
        {!!isLoading && (
          <View className="absolute w-full h-full items-center justify-center">
            <View className="absolute w-full h-full bg-white opacity-95" />
            <Loading
              loadingPrompt="Signing you up"
              loadingColor={color.secondary}
            />
          </View>
        )}
      </View>
      <StatusBar backgroundColor={color.primary} style="auto" />
    </>
  );
};

export default sign_up;
