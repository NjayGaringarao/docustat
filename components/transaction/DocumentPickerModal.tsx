import { View, Text, Modal, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "../CustomButton";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { color } from "@/constants/color";
import {
  COGType,
  RequestDocumentType,
  RequestLetterType,
} from "@/constants/utils";
import DocumentConfigModal from "./DocumentConfigModal";

interface IDocumentPickerModal {
  isVisible: boolean;
  onClose: () => void;
  addDocument: (e: RequestDocumentType) => void;
  stageDocument: RequestDocumentType[];
}

const DocumentPickerModal = ({
  isVisible,
  onClose,
  addDocument,
  stageDocument,
}: IDocumentPickerModal) => {
  const [currentDoc, setCurrentDoc] = useState<
    RequestLetterType | COGType | string
  >("");
  const [isConfigVisible, setIsConfigVisible] = useState(false);
  const [isTORDisabled, setIsTORDisabled] = useState(false);
  const [isRLDisabled, setIsRLDisabled] = useState(false);
  const [isCOGDisabled, setIsCOGDisabled] = useState(false);
  const [isCOEDisabled, setIsCOEDisabled] = useState(false);
  const [isCTC_TORDisabled, setIsCTC_TORDisabled] = useState(false);
  const [isCTC_CORDisabled, setIsCTC_CORDisabled] = useState(false);

  const isCOGType = (doc: any): doc is COGType =>
    doc && typeof doc === "object" && "sem" in doc && "ay" in doc;

  const isRequestLetterType = (doc: any): doc is RequestLetterType =>
    doc && typeof doc === "object" && "document_type" in doc;

  const torHandle = () => {
    setCurrentDoc("Official Transcript of Records");
    setIsConfigVisible(true);
  };

  const rlHandle = () => {
    setCurrentDoc({ document_type: "tor" });
    setIsConfigVisible(true);
  };

  const cogHandle = () => {
    setCurrentDoc({ sem: "first", ay: "" });
    setIsConfigVisible(true);
  };

  const coeHandle = () => {
    setCurrentDoc("Certificate of Enrollment");
    setIsConfigVisible(true);
  };

  const ctc_torHandle = () => {
    setCurrentDoc("CTC of Transcript of Records");
    setIsConfigVisible(true);
  };

  const ctc_corHandle = () => {
    setCurrentDoc("CTC of Certificate of Registration");
    setIsConfigVisible(true);
  };

  const otherHandle = () => {
    setCurrentDoc("");
    setIsConfigVisible(true);
  };

  useEffect(() => {
    setIsTORDisabled(
      stageDocument.some(
        (doc) =>
          typeof doc.document === "string" &&
          doc.document === "Official Transcript of Records"
      )
    );

    setIsRLDisabled(
      stageDocument.some((doc) => isRequestLetterType(doc.document))
    );

    setIsCOGDisabled(stageDocument.some((doc) => isCOGType(doc.document)));

    setIsCOEDisabled(
      stageDocument.some(
        (doc) =>
          typeof doc.document === "string" &&
          doc.document === "Certificate of Enrollment"
      )
    );

    setIsCTC_TORDisabled(
      stageDocument.some(
        (doc) =>
          typeof doc.document === "string" &&
          doc.document === "CTC of Transcript of Records"
      )
    );

    setIsCTC_CORDisabled(
      stageDocument.some(
        (doc) =>
          typeof doc.document === "string" &&
          doc.document === "CTC of Certificate of Registration"
      )
    );
  }, [stageDocument]);

  return (
    <>
      <Modal visible={isVisible} onRequestClose={onClose} transparent>
        <View className="flex-1 justify-center">
          <TouchableOpacity
            className="h-full w-full absolute bg-black opacity-80"
            onPress={onClose}
          />
          <View className="absolute w-11/12 bg-background rounded-lg p-4 self-center">
            <View className="w-full flex-row justify-between items-center">
              <Text className="text-2xl text-secondary font-semibold">
                Select Document
              </Text>
              <CustomButton
                handlePress={onClose}
                containerStyles="w-16 bg-transparent items-end -mr-4"
              >
                <MaterialIcons name="close" size={24} color={color.uBlack} />
              </CustomButton>
            </View>
            <View className="pl-2">
              <Text className="text-xl text-uBlack mt-4 font-medium">
                I. Official Documents
              </Text>
              <View className="pl-6 w-full gap-2">
                {/** TOR */}
                <CustomButton
                  handlePress={torHandle}
                  containerStyles="w-full bg-transparent border border-primary"
                  isLoading={isTORDisabled}
                >
                  <View className="w-full flex-row items-center justify-between">
                    <Text className="text-lg text-uBlack">
                      Official Transcript of Records
                    </Text>

                    <MaterialIcons name="add" size={24} color={color.uBlack} />
                  </View>
                </CustomButton>

                {/** RL */}
                <CustomButton
                  handlePress={rlHandle}
                  containerStyles="w-full bg-transparent border border-primary"
                  isLoading={isRLDisabled}
                >
                  <View className="w-full flex-row items-center justify-between">
                    <Text className="text-lg text-uBlack">Request Letter</Text>

                    <MaterialIcons name="add" size={24} color={color.uBlack} />
                  </View>
                </CustomButton>
              </View>

              <Text className="text-xl text-uBlack mt-4 font-medium">
                II. Certifications
              </Text>

              <View className="pl-6 w-full gap-2">
                {/** COG */}
                <CustomButton
                  handlePress={cogHandle}
                  containerStyles="w-full bg-transparent border border-primary"
                  isLoading={isCOGDisabled}
                >
                  <View className="w-full flex-row items-center justify-between">
                    <Text className="text-lg text-uBlack">
                      Grade / Unit Earned
                    </Text>

                    <MaterialIcons name="add" size={24} color={color.uBlack} />
                  </View>
                </CustomButton>

                {/** COE */}
                <CustomButton
                  handlePress={coeHandle}
                  containerStyles="w-full bg-transparent border border-primary"
                  isLoading={isCOEDisabled}
                >
                  <View className="w-full flex-row items-center justify-between">
                    <Text className="text-lg text-uBlack">
                      Certificate of Enrollment
                    </Text>

                    <MaterialIcons name="add" size={24} color={color.uBlack} />
                  </View>
                </CustomButton>
              </View>
              <Text className="text-xl text-uBlack mt-4 font-medium">
                III. Certified True Copy (CTC)
              </Text>
              <View className="pl-6 w-full gap-2">
                {/** CTC_TOR */}
                <CustomButton
                  handlePress={ctc_torHandle}
                  containerStyles="w-full bg-transparent border border-primary"
                  isLoading={isCTC_TORDisabled}
                >
                  <View className="w-full flex-row items-center justify-between">
                    <Text className="text-lg text-uBlack">
                      Official Transcript of Record
                    </Text>

                    <MaterialIcons name="add" size={24} color={color.uBlack} />
                  </View>
                </CustomButton>

                {/** CTC_COR */}
                <CustomButton
                  handlePress={ctc_corHandle}
                  containerStyles="w-full bg-transparent border border-primary"
                  isLoading={isCTC_CORDisabled}
                >
                  <View className="w-full flex-row items-center justify-between">
                    <Text className="text-lg text-uBlack">
                      Certificate of Registration
                    </Text>

                    <MaterialIcons name="add" size={24} color={color.uBlack} />
                  </View>
                </CustomButton>
              </View>
              <Text className="text-xl text-uBlack mt-4 font-medium">
                IV. Other
              </Text>
              <View className="pl-6 w-full gap-2 mb-2">
                {/** Other */}
                <CustomButton
                  handlePress={otherHandle}
                  containerStyles="w-full bg-transparent border border-primary"
                >
                  <View className="w-full flex-row items-center justify-between">
                    <Text className="text-lg text-uBlack">Other Documents</Text>

                    <MaterialIcons name="add" size={24} color={color.uBlack} />
                  </View>
                </CustomButton>
              </View>
            </View>
          </View>
        </View>
        <DocumentConfigModal
          isVisible={isConfigVisible}
          onClose={() => setIsConfigVisible(false)}
          parentOnClose={onClose}
          document={currentDoc}
          addDocument={addDocument}
        />
      </Modal>
    </>
  );
};

export default DocumentPickerModal;
