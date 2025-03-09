import { View, Text, Modal, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import {
  COGType,
  RequestDocumentType,
  RequestLetterType,
} from "@/constants/utils";
import RequestLetterPicker from "./RequestLetterPicker";
import TextBox from "../TextBox";
import CustomButton from "../CustomButton";
import CopyCountSetter from "./CopyCountSetter";
import CertGradeAyPicker from "./CertGradeAyPicker";
import CertGradeSemPicker from "./CertGradeSemPicker";

interface IDocumentConfigModal {
  isVisible: boolean;
  onClose: () => void;
  parentOnClose: () => void;
  document: string | COGType | RequestLetterType;
  addDocument: (e: RequestDocumentType) => void;
}

const DocumentConfigModal = ({
  isVisible,
  onClose,
  document,
  addDocument,
  parentOnClose,
}: IDocumentConfigModal) => {
  const [copy, setCopy] = useState(1);
  const [requestLetterPickerValue, setRequestLetterPickerValue] =
    useState("none");
  const [requestLetterForm, setRequestLetterForm] = useState("");
  const [otherDocumentForm, setOtherDocumentForm] = useState("");
  const [COGForm, setCOGForm] = useState({ ay: "none", sem: "none" });

  const isCOGType = (doc: any): doc is COGType =>
    doc && typeof doc === "object" && "sem" in doc && "ay" in doc;

  const isRequestLetterType = (doc: any): doc is RequestLetterType =>
    doc && typeof doc === "object" && "document_type" in doc;

  const handleClose = () => {
    setCopy(1);
    setCOGForm({ ay: "none", sem: "none" });
    setRequestLetterPickerValue("none");
    setRequestLetterForm("");
    setOtherDocumentForm("");
    onClose();
  };

  const handleAddDocument = (data: RequestDocumentType) => {
    addDocument(data);
    handleClose();
    parentOnClose();
  };

  const renderCOGForm = () => (
    <View className="w-full gap-2">
      <Text className="text-2xl text-secondary font-semibold">
        Certificate of Grade/Unit Earned
      </Text>
      <View className="w-full h-12 justify-center bg-background rounded-xl border border-primary">
        <CertGradeSemPicker
          value={COGForm.sem}
          onChange={(e) => setCOGForm((prev) => ({ ...prev, sem: e }))}
        />
      </View>
      <View className="w-full h-12 justify-center bg-background rounded-xl border border-primary">
        <CertGradeAyPicker
          value={COGForm.ay}
          onChange={(e) => setCOGForm((prev) => ({ ...prev, ay: e }))}
        />
      </View>

      {renderFooter(
        () => handleAddDocument({ copy, document: COGForm }),
        COGForm.ay === "none" || COGForm.sem === "none"
      )}
    </View>
  );

  const renderRequestLetterForm = () => (
    <View className="w-full gap-2">
      <Text className="text-2xl text-secondary font-semibold">
        Request Letter for
      </Text>
      <View className="w-full h-12 justify-center bg-background rounded-xl border border-primary">
        <RequestLetterPicker
          value={requestLetterPickerValue}
          onChange={(e) => {
            setRequestLetterPickerValue(e);
            if (e != "other") {
              setRequestLetterForm(e);
            } else {
              setRequestLetterForm("");
            }
          }}
        />
      </View>
      {requestLetterPickerValue === "other" && (
        <TextBox
          textValue={requestLetterForm}
          placeholder="example: Event Funding"
          handleChangeText={setRequestLetterForm}
          containerStyles="rounded-xl bg-white h-10"
        />
      )}

      {renderFooter(
        () =>
          handleAddDocument({
            copy,
            document: { document_type: requestLetterForm },
          }),
        requestLetterPickerValue === "none" ||
          (requestLetterPickerValue === "other" && requestLetterForm.length < 2)
      )}
    </View>
  );

  const renderOtherDocumentForm = () => (
    <View className="w-full gap-2">
      <Text className="text-2xl text-secondary font-semibold">
        Other Document
      </Text>
      <TextBox
        textValue={otherDocumentForm}
        placeholder="example: Dropping Form"
        handleChangeText={setOtherDocumentForm}
        containerStyles="rounded-xl bg-white h-10"
      />

      {renderFooter(
        () => handleAddDocument({ copy, document: otherDocumentForm }),
        otherDocumentForm.length < 2
      )}
    </View>
  );

  const renderNormalDocument = () => (
    <View className="w-full gap-2">
      <Text className="text-2xl text-secondary font-semibold">
        {document.toString()}
      </Text>

      {renderFooter(() =>
        handleAddDocument({ copy, document: document.toString() })
      )}
    </View>
  );

  const renderFooter = (onPress: () => void, isLoading = false) => (
    <View className="flex-row w-full mt-4 items-center justify-between">
      <CopyCountSetter copy={copy} setCopy={setCopy} />
      <CustomButton handlePress={onPress} isLoading={isLoading}>
        <Text className="text-center font-semibold text-lg w-12">Add</Text>
      </CustomButton>
    </View>
  );

  return (
    <Modal visible={isVisible} transparent>
      <View className="flex-1 justify-center">
        <TouchableOpacity
          className="h-full w-full absolute bg-black opacity-80"
          onPress={handleClose}
        />
        <View className="absolute w-11/12 bg-background rounded-lg p-4 self-center">
          {isCOGType(document)
            ? renderCOGForm()
            : isRequestLetterType(document)
            ? renderRequestLetterForm()
            : document.toString().length === 0
            ? renderOtherDocumentForm()
            : renderNormalDocument()}
        </View>
      </View>
    </Modal>
  );
};

export default DocumentConfigModal;
