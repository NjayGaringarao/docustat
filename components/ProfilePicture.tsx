import { TouchableOpacity, View, Image, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import { UserType } from "@/constants/models";
import { getImagePreview } from "@/services/storage";
import WebView from "react-native-webview";
import { getHTMLImageRender } from "@/lib/commonUtil";
import CustomButton from "./CustomButton";
import Ionicons from "@expo/vector-icons/Ionicons";

interface IProfilePictureType {
  userInfo: UserType;
  containerStyle?: string;
  imageStyle?: string;
}

const ProfilePicture = ({
  userInfo,
  containerStyle,
  imageStyle,
}: IProfilePictureType) => {
  const [imagePreview, setImagePreview] = useState<string>(userInfo.avatar_url);
  const [isImagePreviewVisible, setIsImagePreviewVisible] = useState(false);

  const onPressHandle = () => {
    setIsImagePreviewVisible(true);
  };

  useEffect(() => {
    const initialize = async () => {
      if (userInfo.picture_id && userInfo.picture_id.length > 19) {
        setImagePreview(getImagePreview(userInfo.picture_id, 10));
      } else {
        setImagePreview(userInfo.avatar_url);
      }
    };

    initialize();
  }, [userInfo]);

  return (
    <>
      <TouchableOpacity onPress={onPressHandle} className={containerStyle}>
        <Image
          className={`flex-1 ${imageStyle}`}
          source={{ uri: imagePreview }}
          resizeMode="cover"
        />
      </TouchableOpacity>

      {isImagePreviewVisible && (
        <Modal
          visible={isImagePreviewVisible}
          transparent={false}
          animationType="slide"
        >
          <TouchableOpacity
            className="flex-1 absolute items-center"
            onPress={() => setIsImagePreviewVisible(false)}
          />
          <View className="bg-black w-full h-full relative">
            <WebView
              originWhitelist={["*"]}
              source={{
                html: getHTMLImageRender(imagePreview),
              }}
              scalesPageToFit={true}
              bounces={true}
              showsVerticalScrollIndicator={false}
            />
            <View className="absolute top-0 w-full h-16 bg-black opacity-70" />
            <CustomButton
              handlePress={() => setIsImagePreviewVisible(false)}
              containerStyles="absolute top-5 left-0 bg-transparent"
            >
              <Ionicons name="arrow-back-sharp" size={24} color="white" />
            </CustomButton>
          </View>
        </Modal>
      )}
    </>
  );
};

export default ProfilePicture;
