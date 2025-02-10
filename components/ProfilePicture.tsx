import { TouchableOpacity, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { UserType } from "@/constants/models";
import { getImagePreview } from "@/services/storage";

interface IProfilePictureType {
  userInfo: UserType;
  onPress?: () => void;
  onLongPress?: () => void;
  containerStyle?: string;
  imageStyle?: string;
}

const ProfilePicture = ({
  userInfo,
  onPress,
  onLongPress,
  containerStyle,
  imageStyle,
}: IProfilePictureType) => {
  const [imagePreview, setImagePreview] = useState<string>(userInfo.avatar_url);

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

  if (onLongPress || onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        onLongPress={onLongPress}
        className={containerStyle}
      >
        <Image
          className={`flex-1 ${imageStyle}`}
          source={{ uri: imagePreview }}
          resizeMode="cover"
        />
      </TouchableOpacity>
    );
  } else {
    return (
      <View className={containerStyle}>
        <Image
          className={`flex-1 ${imageStyle}`}
          source={{ uri: imagePreview }}
        />
      </View>
    );
  }
};

export default ProfilePicture;
