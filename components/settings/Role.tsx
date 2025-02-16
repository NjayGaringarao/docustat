import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/context/GlobalProvider";
import AdminDepPicker from "../signup/AdminDepPicker";
import DeptProgPicker from "../signup/DepProgPicker";
import YearLevelPicker from "../signup/YearLevelPicker";
import Loading from "../Loading";
import { color } from "@/constants/color";
import CustomButton from "../CustomButton";
import { confirmAction } from "@/lib/commonUtil";
import Toast from "react-native-toast-message";
import {
  updateAdminInformation,
  updateStudentInformation,
} from "@/services/user";

interface IStudentForm {
  dept_prog?: string;
  year_level?: string;
}

interface IAdminForm {
  department?: string;
}
const Role = () => {
  const { userCredential, userInfo, isInternetConnection, refreshUserRecord } =
    useGlobalContext();
  const [studentForm, setStudentForm] = useState<IStudentForm>();
  const [adminForm, setAdminForm] = useState<IAdminForm>();
  const [isLoading, setIsLoading] = useState(false);
  const [isModified, setIsModified] = useState(false);

  const resetHandle = () => {
    if (userCredential.role === "admin") {
      setAdminForm({ department: userInfo.admin_info?.department });
    } else {
      setStudentForm({
        dept_prog: userInfo.student_info?.dept_prog,
        year_level: userInfo.student_info?.year_level,
      });
    }
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

      if (userCredential.role == "admin") {
        if (
          !(await updateAdminInformation(userInfo.id, adminForm?.department!))
        )
          throw Error;
      } else {
        if (
          !(await updateStudentInformation(
            userInfo.id,
            studentForm?.dept_prog!,
            studentForm?.year_level!
          ))
        )
          throw Error;
      }

      Toast.show({
        type: "success",
        text1: "Update Success",
        text2: `Successfully updated ${userCredential.role} information`,
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
    if (userCredential.role === "admin") {
      setIsModified(userInfo.admin_info?.department !== adminForm?.department);
    } else {
      setIsModified(
        userInfo.student_info?.dept_prog !== studentForm?.dept_prog ||
          userInfo.student_info?.year_level !== studentForm?.year_level
      );
    }
  }, [adminForm, studentForm]);

  useEffect(() => {
    resetHandle();
  }, [userInfo]);

  return (
    <View className="w-full">
      <View className=" w-full px-4 py-4 rounded-xl bg-background shadow-lg shadow-black">
        {userCredential.role === "admin" && (
          <>
            <Text className="text-xl text-uBlack font-black my-2">
              IV. ADMIN INFORMATION
            </Text>

            <View className="w-full px-4 mx-2 gap-2">
              <Text className="text-base text-uBlack font-semibold">
                Department
              </Text>
              <AdminDepPicker
                value={adminForm?.department || ""}
                onChange={(e) => setAdminForm({ ...adminForm, department: e })}
                containerStyle="rounded-xl bg-white"
              />
            </View>
          </>
        )}
        {userCredential.role === "student" && (
          <>
            <Text className="text-xl text-uBlack font-black my-2">
              IV. STUDENT INFORMATION
            </Text>
            <View className="w-full px-4 mx-2 gap-2">
              <Text className="text-base text-uGray font-semibold -mb-1">
                Department - Program
              </Text>
              <DeptProgPicker
                value={studentForm?.dept_prog!}
                onChange={(value) =>
                  setStudentForm({ ...adminForm, dept_prog: value })
                }
                containerStyle="rounded-xl bg-white"
              />
              <Text className="text-base text-uGray font-semibold -mb-1">
                Year Level
              </Text>
              <YearLevelPicker
                value={studentForm?.year_level!}
                onChange={(value) =>
                  setStudentForm({ ...studentForm, year_level: value })
                }
                containerStyle="rounded-xl bg-white"
              />
            </View>
          </>
        )}
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

export default Role;
