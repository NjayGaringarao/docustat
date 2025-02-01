import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import TextBox from "@/components/TextBox";
import ParagraphBox from "@/components/ParagraphBox";
import Checkbox from "expo-checkbox";
import RequestLetterPicker from "@/components/transaction/RequestLetterPicker";
import CertGradeSemPicker from "@/components/transaction/CertGradeSemPicker";
import CertGradeAyPicker from "@/components/transaction/CertGradeAyPicker";
import CustomButton from "@/components/CustomButton";

const transaction = () => {
  const [form, setForm] = useState({
    academic_year: "",
    semester: "",
    purpose: "",
    request_note: "",
    others: "",
  });

  const [checkbox, setCheckbox] = useState({
    tor: false,
    request_letter: false,
    cert_grade: false,
    cert_enrollment: false,
    ctc_tor: false,
    ctc_cor: false,
    others: false,
  });

  const [request_letter, setRequest_letter] = useState("");
  const [cert_grade, setCert_grade] = useState({
    sem: "",
    ay: "",
  });

  const clearHandle = () => {
    setForm({
      academic_year: "",
      semester: "",
      purpose: "",
      request_note: "",
      others: "",
    });
    setCheckbox({
      tor: false,
      request_letter: false,
      cert_grade: false,
      cert_enrollment: false,
      ctc_tor: false,
      ctc_cor: false,
      others: false,
    });
    setRequest_letter("");
    setCert_grade({
      sem: "",
      ay: "",
    });
  };

  return (
    <View className="flex-1 px-2 py-4 gap-4">
      <ScrollView
        className="flex-1 bg-panel border-secondary border-2 rounded-xl px-2 py-4"
        contentContainerStyle={{
          alignItems: "flex-start",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <Text className="text-lg text-uBlack font-semibold">
          Documents to be Requested (Please Check)
        </Text>
        <View className="px-4 gap-2">
          <View className="flex-row items-center gap-2">
            <Checkbox
              value={checkbox.tor}
              onValueChange={(e) => setCheckbox({ ...checkbox, tor: e })}
            />
            <Text className="text-base text-uBlack">
              Official Transcript of Records
            </Text>
          </View>
          <View className="flex-row items-center gap-2 w-full">
            <Checkbox
              value={checkbox.request_letter}
              onValueChange={(e) =>
                setCheckbox({ ...checkbox, request_letter: e })
              }
            />
            <Text className="text-base text-uBlack">Request Letter for</Text>
            <RequestLetterPicker
              value={request_letter}
              onChange={setRequest_letter}
              containerStyle="flex-1 border-b border-secondary"
            />
          </View>
        </View>
        <Text className="text-lg text-uBlack font-semibold">
          Certifications
        </Text>
        <View className="px-4 gap-2 w-full">
          <View className="flex-row items-center gap-2">
            <Checkbox
              value={checkbox.cert_grade}
              onValueChange={(e) => setCheckbox({ ...checkbox, cert_grade: e })}
            />
            <Text className="text-base text-uBlack">Grade/Units Earned</Text>
          </View>
          {checkbox.cert_grade ? (
            <View className="items-center gap-2 w-8/12 self-end">
              <View className="flex-row">
                <Text className="text-base text-uBlack">{"Semester\t\t:"}</Text>
                <CertGradeSemPicker
                  value={cert_grade.sem}
                  onChange={(e) => setCert_grade({ ...cert_grade, sem: e })}
                  containerStyle="flex-1 border-b border-secondary"
                />
              </View>
              <View className="flex-row">
                <Text className="text-base text-uBlack">
                  {"A.Y.\t\t\t\t\t\t:"}
                </Text>
                <CertGradeAyPicker
                  value={cert_grade.ay}
                  onChange={(e) => setCert_grade({ ...cert_grade, ay: e })}
                  containerStyle="flex-1 border-b border-secondary"
                />
              </View>
            </View>
          ) : null}

          <View className="flex-row items-center gap-2">
            <Checkbox
              value={checkbox.cert_enrollment}
              onValueChange={(e) =>
                setCheckbox({ ...checkbox, cert_enrollment: e })
              }
            />
            <Text className="text-base text-uBlack">Enrollment</Text>
          </View>
        </View>
        <Text className="text-lg text-uBlack font-semibold">
          Certified True Copy of
        </Text>
        <View className="px-4 gap-2 w-full">
          <View className="flex-row items-center gap-2">
            <Checkbox
              value={checkbox.ctc_tor}
              onValueChange={(e) => setCheckbox({ ...checkbox, ctc_tor: e })}
            />
            <Text className="text-base text-uBlack">
              Official Transcript of Records
            </Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Checkbox
              value={checkbox.ctc_cor}
              onValueChange={(e) => setCheckbox({ ...checkbox, ctc_cor: e })}
            />
            <Text className="text-base text-uBlack">
              Certificate of Registration
            </Text>
          </View>
        </View>
        <Text className="text-lg text-uBlack font-semibold">Other</Text>
        <ParagraphBox
          value={form.others}
          placeholder="ex: Certificate of Participation"
          handleChangeText={(e) => setForm({ ...form, others: e })}
          containerStyles="bg-white border border-secondary rounded-lg max-h-16 mx-4"
        />
        <Text className="text-lg text-uBlack font-semibold">Purpose</Text>
        <TextBox
          textValue={form.purpose}
          placeholder="ex: Scholarship Grant"
          handleChangeText={(e) => setForm({ ...form, purpose: e })}
          textInputStyles="text-sm text-uBlack"
          boxStyles="w-full bg-white rounded-xl border-secondary border "
          containerStyles="mx-4"
        />
        <Text className="text-lg text-uBlack font-semibold">Request Note</Text>

        <ParagraphBox
          value={form.request_note}
          placeholder="ex: I need 2 copies of each document."
          handleChangeText={(e) => setForm({ ...form, request_note: e })}
          containerStyles="bg-white border border-secondary rounded-lg max-h-40 mx-4"
        />
      </ScrollView>

      <View className="px-2 flex-row gap-2 justify-end items-center">
        <CustomButton
          title="Request"
          handlePress={() => {}}
          containerStyles="flex-1 bg-secondary"
        />
        <CustomButton
          title="Clear"
          textStyles="text-secondary"
          handlePress={clearHandle}
          containerStyles="w-24 border-secondary border bg-transparent"
        />
      </View>
    </View>
  );
};

export default transaction;
