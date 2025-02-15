import { Modal, TouchableOpacity, View, Image } from "react-native";
import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import { ImagePickerAsset, launchImageLibraryAsync } from "expo-image-picker";
import { convertToBase64, getHTMLImageRender } from "@/lib/commonUtil";
import WebView from "react-native-webview";
import CustomButton from "./CustomButton";
import { color } from "@/constants/color";
import { getImagePreview } from "@/services/storage";
import { UserType } from "@/constants/models";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";

interface ProfilePicturePickerType {
  containerStyle?: string;
  userInfo: UserType;
  imageStyle?: string;
  setNewProfilePicture: (image: ImagePickerAsset | undefined) => void;
  newProfilePicture: ImagePickerAsset | undefined;
}

const ProfilePicturePicker = forwardRef(
  (
    {
      containerStyle,
      userInfo,
      setNewProfilePicture,
      newProfilePicture,
      imageStyle,
    }: ProfilePicturePickerType,
    ref
  ) => {
    const [pickerImage, setPickerImage] = useState<
      ImagePickerAsset | undefined
    >();
    const [imageSource, setImageSource] = useState<string | undefined>();
    const [isImagePreviewVisible, setIsImagePreviewVisible] = useState(false);

    const clearHandle = () => {
      setPickerImage(undefined);
      setImageSource(
        userInfo.picture_id
          ? getImagePreview(userInfo.picture_id)
          : userInfo.avatar_url!
      );
      setNewProfilePicture(undefined);
    };

    const pickImagehandle = async (): Promise<void> => {
      const result = await launchImageLibraryAsync({
        mediaTypes: "images",
        quality: 1,
        allowsEditing: true,
        allowsMultipleSelection: false,
      });

      if (!result.canceled && result.assets) {
        setPickerImage(result.assets[0]);
      } else {
        console.log("Image picker was canceled or no assets selected.");
      }
    };

    useEffect(() => {
      const changeSourceHandle = async () => {
        if (pickerImage) {
          setImageSource(await convertToBase64(pickerImage.uri));
          setNewProfilePicture(pickerImage);
        }
      };

      changeSourceHandle();
    }, [pickerImage]);

    // Expose the clearHandle function to the parent via ref
    useImperativeHandle(ref, () => ({
      clear: clearHandle,
    }));

    return (
      <>
        <TouchableOpacity
          onPress={() => setIsImagePreviewVisible(true)}
          onLongPress={pickImagehandle}
          className={`bg-panel ${containerStyle}`}
        >
          <Image className={imageStyle} source={{ uri: imageSource }} />
          <View className="absolute top-0 -right-3">
            {!!newProfilePicture && (
              <TouchableOpacity
                className="w-8 h-8 justify-center items-center bg-gray-400 border-2 border-gray-400 rounded-lg overflow-hidden"
                onPress={clearHandle}
              >
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              className="w-8 h-8 justify-center items-center bg-primary rounded-lg overflow-hidden shadow shadow-black"
              onPress={pickImagehandle}
            >
              <FontAwesome5
                name="exchange-alt"
                size={24}
                color={color.uBlack}
              />
            </TouchableOpacity>
          </View>
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
                  html: getHTMLImageRender(imageSource!),
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
                <Ionicons name="arrow-back-sharp" size={24} color="black" />
              </CustomButton>
            </View>
          </Modal>
        )}
      </>
    );
  }
);

export default ProfilePicturePicker;
