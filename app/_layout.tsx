import Constants, { ExecutionEnvironment } from "expo-constants";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { Platform } from "react-native";

const isExpoGo =
  Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

// Configure notifications handler only if not in Expo Go on Android
if (Platform.OS !== "android" || !isExpoGo) {
  try {
    const Notifications = require("expo-notifications");
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });
  } catch (error) {
    console.warn("Failed to load expo-notifications:", error);
  }
}

export default function RootLayout() {
  useEffect(() => {
    // Check permissions only if not in Expo Go on Android
    if (Platform.OS !== "android" || !isExpoGo) {
      try {
        const Notifications = require("expo-notifications");
        Notifications.requestPermissionsAsync();
      } catch (error) {
        console.warn("Failed to request permissions:", error);
      }
    }
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="detail"
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#0d2137" },
          headerTintColor: "#f0c040",
          headerTitle: "Detalle del Lugar",
          presentation: "card",
        }}
      />
    </Stack>
  );
}
