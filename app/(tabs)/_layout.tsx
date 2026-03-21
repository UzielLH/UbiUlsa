import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import { LucideIcon } from "../../components/ui/LucideIcon";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#38bdf8", // Sky blue for active
        tabBarInactiveTintColor: "#94a3b8", // Slate 400 for inactive
        tabBarStyle: {
          position: "absolute",
          borderTopWidth: 0,
          elevation: 0,
          height: 65,
          backgroundColor: "rgba(15, 23, 42, 0.85)", // Transparent slate-900
        },
        tabBarBackground: () => (
          <BlurView
            tint="dark"
            intensity={80}
            style={StyleSheet.absoluteFill}
          />
        ),
        tabBarLabelStyle: { fontSize: 12, fontWeight: "600", paddingBottom: 8 },
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
