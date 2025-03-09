import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import TextBox from "@/components/TextBox";
import { color } from "@/constants/color";
import { useGlobalContext } from "@/context/GlobalProvider";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import DocumentPickerModal from "@/components/transaction/DocumentPickerModal";
import {
  COGType,
  RequestDocumentType,
  RequestLetterType,
} from "@/constants/utils";
import Entypo from "@expo/vector-icons/Entypo";
import ParagraphBox from "@/components/ParagraphBox";
import CustomButton from "@/components/CustomButton";
import { confirmAction } from "@/lib/commonUtil";
import { createUserRequest } from "@/services/request";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import Loading from "@/components/Loading";

const newRequest = () => {
  const { userInfo, refreshUserRecord } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);
  const [stageDocument, setStageDocument] = useState<RequestDocumentType[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form, setForm] = useState({
    purpose: "",
    request_note: "",
  });

  const isCOGType = (doc: any): doc is COGType =>
    doc && typeof doc === "object" && "sem" in doc && "ay" in doc;

  const isRequestLetterType = (doc: any): doc is RequestLetterType =>
    doc && typeof doc === "object" && "document_type" in doc;

  const addDocument = (document: RequestDocumentType) => {
    setStageDocument([...stageDocument, document]);
  };

  const removeDocument = (index: number) => {
    setStageDocument((prev) => prev.filter((_, i) => i !== index));
  };

  const clearHandle = () => {
    setStageDocument([]);
    setForm({ purpose: "", request_note: "" });
  };

  const verifyInput = () => {
    if (stageDocument.length === 0) {
      Toast.show({
        type: "error",
        text1: "No Document Added",
        text2: "Please add at least one document.",
      });
      return false;
    }
    if (form.purpose === "") {
      Toast.show({
        type: "error",
        text1: "Purpose is Empty",
        text2: "Please input the purpose of your request.",
      });
      return false;
    }

    return true;
  };

  const composeDocumentList = () => {
    const documentList: string[] = [];

    stageDocument.forEach((document) => {
      if (isRequestLetterType(document.document)) {
        documentList.push(
          `Request Letter for ${document.document.document_type} (${
            document.copy
          } ${document.copy > 1 ? "copies" : "copy"})`
        );
      }
      if (isCOGType(document.document)) {
        documentList.push(
          `Certificate of Grade/Unit Earned for ${document.document.sem.toUpperCase()} Sem, A.Y.${
            document.document.ay
          } (${document.copy} ${document.copy > 1 ? "copies" : "copy"})`
        );
      }
      if (typeof document.document === "string") {
        documentList.push(
          `${document.document} (${document.copy} ${
            document.copy > 1 ? "copies" : "copy"
          })`
        );
      }
    });

    return documentList;
  };

  const submitHandle = async () => {
    if (!verifyInput()) return;

    if (
      !(await confirmAction(
        "Confirm Submission",
        "Are your certain that your input is correct accoding to your knowledge?"
      ))
    )
      return;

    try {
      setIsLoading(true);
      const documentList = composeDocumentList();
      await createUserRequest(
        userInfo.id,
        documentList,
        form.purpose,
        form.request_note
      );
      clearHandle();
      Toast.show({
        type: "success",
        text1: "Submit Successful",
        text2: "Your Request is now pending. We will notify you for updates.",
      });
      refreshUserRecord({ requestList: true });
      router.navigate("/(tabs)/home");
    } catch {
      Toast.show({
        type: "error",
        text1: "Submit Failed",
        text2: "There was an error submitting your request.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderDocument = (document: RequestDocumentType, index: number) => {
    if (isCOGType(document.document)) {
      return (
        <View
          key={index}
          className="flex-row items-center justify-center bg-background gap-2 px-2 py-4 mb-2 rounded-lg shadow shadow-black"
        >
          <View className="w-10 justify-center items-center">
            <Text className="text-lg text-uBlack">{document.copy}</Text>
            <Text className="text-xs text-uBlack -mt-1">
              {document.copy > 1 ? "Copies" : "Copy"}
            </Text>
          </View>
          <View className="flex-1">
            <Text className="text-lg text-uBlack font-semibold">
              Certificate of Grade/Unit Earned
            </Text>
            <Text className="text-base -mt-1 font-light">
              {`${document.document.sem.toUpperCase()} Sem, ${
                document.document.ay
              } A.Y.`}
            </Text>
          </View>
          <TouchableOpacity onPress={() => removeDocument(index)}>
            <Entypo name="cross" size={24} color="black" />
          </TouchableOpacity>
        </View>
      );
    } else if (isRequestLetterType(document.document)) {
      return (
        <View
          key={index}
          className="flex-row items-center justify-center bg-background gap-2 px-2 py-4 mb-2 rounded-lg shadow shadow-black"
        >
          <View className="w-10 justify-center items-center">
            <Text className="text-lg text-uBlack">{document.copy}</Text>
            <Text className="text-xs text-uBlack -mt-1">
              {document.copy > 1 ? "Copies" : "Copy"}
            </Text>
          </View>
          <View className="flex-1">
            <Text className="text-lg text-uBlack font-semibold">
              Request Letter
            </Text>
            <Text className="text-base -mt-1 font-light">
              {document.document.document_type}
            </Text>
          </View>
          <TouchableOpacity onPress={() => removeDocument(index)}>
            <Entypo name="cross" size={24} color="black" />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View
          key={index}
          className="flex-row items-center justify-center bg-background gap-2 px-2 py-4 mb-2 rounded-lg shadow shadow-black"
        >
          <View className="w-10 justify-center items-center">
            <Text className="text-lg text-uBlack">{document.copy}</Text>
            <Text className="text-xs text-uBlack -mt-1">
              {document.copy > 1 ? "Copies" : "Copy"}
            </Text>
          </View>
          <View className="flex-1">
            <Text className="text-lg text-uBlack font-semibold">
              {document.document}
            </Text>
          </View>
          <TouchableOpacity onPress={() => removeDocument(index)}>
            <Entypo name="cross" size={24} color="black" />
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <View className="flex-1 bg-background">
      <View className="flex-row justify-between items-center mx-2">
        <Text className="font-black text-secondary text-3xl mt-4 mb-2">
          Create Request
        </Text>
      </View>
      <ScrollView
        className="flex-1 bg-background px-2 rounded-lg"
        contentContainerStyle={{ gap: 12 }}
      >
        <View className="w-full px-4 py-2 bg-background rounded-lg shadow shadow-black">
          <Text className="text-xl text-uBlack font-black mb-1">
            I. Purpose
          </Text>
          <TextBox
            textValue={form.purpose}
            placeholder="ex : Scholarship"
            handleChangeText={(e) => setForm({ ...form, purpose: e })}
            titleTextStyles="text-uGray text-base font-semibold"
            textInputStyles="text-base text-uBlack"
            boxStyles="w-full bg-white rounded-xl"
            containerStyles="pl-6 mb-2"
          />
        </View>
        <View className="w-full px-4 py-2 bg-background rounded-lg shadow shadow-black">
          <Text className="text-xl text-uBlack font-black mb-1">
            II. Documents
          </Text>
          {/** Can not use Flatlist because it will cause an error:
           *
           *   (NOBRIDGE) ERROR  VirtualizedLists should never be nested
           *   inside plain ScrollViews with the same orientation because
           *   it can break windowing and other functionality - use
           *   another VirtualizedList-backed container instead. [Component Stack]
           */}
          <View className="pl-6 pb-2">
            {stageDocument.length > 0 ? (
              stageDocument.map((item, index) => renderDocument(item, index))
            ) : (
              <View className="w-full h-20 my-2 border-uGray border border-dashed items-center justify-center">
                <Text className="text-uGray text-lg font-semibold">
                  No document added
                </Text>
              </View>
            )}
            <CustomButton
              title="Add Document"
              textStyles="text-uBlack text-xl font-semibold"
              handlePress={() => setIsModalVisible(true)}
            >
              <MaterialIcons name="add-circle" size={24} color={color.uBlack} />
            </CustomButton>
          </View>
        </View>
        <View className="w-full px-4 py-2 bg-background rounded-lg shadow shadow-black">
          <Text className="text-xl text-uBlack font-black mb-1">
            III. Request Note
          </Text>
          <ParagraphBox
            value={form.request_note}
            placeholder="ex: I have an envelop."
            handleChangeText={(e) => setForm({ ...form, request_note: e })}
            containerStyles="bg-white rounded-lg h-28 max-h-40 mb-2 ml-6"
          />
        </View>
      </ScrollView>
      <View className="w-full p-2 flex-row justify-center items-center gap-2">
        <CustomButton
          title="Submit Request"
          textStyles="text-white text-xl font-semibold"
          handlePress={submitHandle}
          containerStyles="bg-secondary flex-1"
        />
        <CustomButton
          title="Clear"
          textStyles="text-uBlack text-xl font-semibold"
          handlePress={clearHandle}
          containerStyles="bg-transparent w-24 border border-secondary"
        />
      </View>

      <DocumentPickerModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        addDocument={addDocument}
        stageDocument={stageDocument}
      />
      {!!isLoading && (
        <View className="absolute w-full h-full items-center justify-center">
          <View className="absolute w-full h-full bg-white opacity-90" />
          <Loading loadingPrompt="Submitting" loadingColor={color.secondary} />
        </View>
      )}
    </View>
  );
};

export default newRequest;
