import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#f0c040",
        tabBarInactiveTintColor: "#aaa",
        tabBarStyle: {
          backgroundColor: "#0d2137",
          borderTopColor: "#f0c040",
          borderTopWidth: 2,
          height: 65,
          paddingBottom: 10,
        },
        tabBarLabelStyle: { fontSize: 12, fontWeight: "600" },
        headerStyle: { backgroundColor: "#0d2137" },
        headerTintColor: "#f0c040",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Mapa",
          headerTitle: "🗺️ La Salle Oaxaca",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "map" : "map-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="places"
        options={{
          title: "Lugares",
          headerTitle: "📍 Lugares Emblemáticos",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "location" : "location-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
