import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { JSX, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast, {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from "react-native-toast-message";
import "../global.css";
import GlobalProvider from "@/context/GlobalProvider";
import { color } from "@/constants/color";
import { View, Text } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function RootLayout() {
  const [loaded] = useFonts({
    Sarina: require("@/assets/fonts/sarina/Sarina-Regular.ttf"),
    Merriweather: require("@/assets/fonts/merriweather/Merriweather-Bold.ttf"),
    Mono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
  });

  const toastConfig = {
    success: ({ text1, text2 }: BaseToastProps) => (
      <View
        style={{
          height: 96,
          width: "100%",
          paddingHorizontal: 16,
          marginTop: 64,
        }}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: color.background,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <View
            style={{
              height: 96,
              width: 96,
              backgroundColor: color.success,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AntDesign name="checkcircle" size={42} color={color.white} />
          </View>
          <View
            style={{
              flex: 1,
              gap: 4,
            }}
          >
            <Text
              style={{ fontSize: 18, fontWeight: "600", color: color.uBlack }}
            >
              {text1}
            </Text>
            <Text style={{ fontSize: 12, color: color.uBlack, lineHeight: 12 }}>
              {text2}
            </Text>
          </View>
        </View>
      </View>
    ),

    error: ({ text1, text2 }: BaseToastProps) => (
      <View
        style={{
          height: 96,
          width: "100%",
          paddingHorizontal: 16,
          marginTop: 64,
        }}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: color.background,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <View
            style={{
              height: 96,
              width: 96,
              backgroundColor: color.failed,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AntDesign name="exclamationcircle" size={42} color={color.white} />
          </View>
          <View
            style={{
              flex: 1,
              gap: 4,
            }}
          >
            <Text
              style={{ fontSize: 18, fontWeight: "600", color: color.uBlack }}
            >
              {text1}
            </Text>
            <Text style={{ fontSize: 12, color: color.uBlack, lineHeight: 12 }}>
              {text2}
            </Text>
          </View>
        </View>
      </View>
    ),
  };

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView className="flex flex-1">
      <GlobalProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabsAdmin)" options={{ headerShown: false }} />
          <Stack.Screen
            name="manageRequest/[id]"
            options={{ headerShown: false }}
          />
        </Stack>
      </GlobalProvider>
      <Toast config={toastConfig} />
    </SafeAreaView>
  );
}
