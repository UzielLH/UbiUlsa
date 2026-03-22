import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import { Platform, StyleSheet } from "react-native";
import { LucideIcon } from "../../components/ui/LucideIcon";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#38bdf8", // Sky blue for active
        tabBarInactiveTintColor: "#94a3b8", // Slate 400 for inactive
        tabBarStyle: {
          position: "absolute",
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: "rgba(255, 255, 255, 0.15)", // La delgada línea superior característica de iOS
          elevation: 0,
          backgroundColor: "transparent",
          ...(Platform.OS === "android" ? { height: 65, paddingBottom: 8 } : {}),
        },
        tabBarBackground: () => (
          <BlurView
            // systemChromeMaterialDark es el material EXACTO que usa Apple nativamente en el TabBar y NavBars para el "Liquid Glass"
            tint={Platform.OS === "ios" ? "systemChromeMaterialDark" : "dark"}
            intensity={Platform.OS === "ios" ? 100 : 80}
            style={StyleSheet.absoluteFill}
          />
        ),
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600"
        },
        headerStyle: {
          backgroundColor: "#0f172a",
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTintColor: "#f8fafc",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Mapa",
          headerTitle: "Campus",
          tabBarIcon: ({ color, size }) => (
            <LucideIcon name="Map" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="places"
        options={{
          title: "Lugares",
          headerTitle: "Lugares Emblemáticos",
          tabBarIcon: ({ color, size }) => (
            <LucideIcon name="MapPin" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
