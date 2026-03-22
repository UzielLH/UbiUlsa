import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import { Platform, StyleSheet } from "react-native";
import { LucideIcon } from "../../components/ui/LucideIcon";

// Importación dinámica para prevenir errores en Android o si no está soportado (Expo Go)
let Host: any, Spacer: any, glassEffect: any;
if (Platform.OS === "ios") {
  try {
    const ExpoUISwiftUI = require("@expo/ui/swift-ui");
    const ExpoUIModifiers = require("@expo/ui/swift-ui/modifiers");
    Host = ExpoUISwiftUI.Host;
    Spacer = ExpoUISwiftUI.Spacer;
    glassEffect = ExpoUIModifiers.glassEffect;
  } catch(e) {}
}

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
        tabBarBackground: () => {
          // El nuevo Liquid Glass de iOS 26 usando Expo UI (Swift UI Primitives)
          if (Platform.OS === "ios" && Host && Spacer && glassEffect) {
            return (
              <Host style={StyleSheet.absoluteFill}>
                <Spacer 
                  modifiers={[
                    glassEffect({
                      glass: {
                        variant: "clear", // Propiedad liquid glass documentada
                      },
                    })
                  ]}
                />
              </Host>
            );
          }

          // Fallback en Android/Web
          return (
            <BlurView
              tint={Platform.OS === "ios" ? "systemChromeMaterialDark" : "dark"}
              intensity={Platform.OS === "ios" ? 100 : 80}
              style={StyleSheet.absoluteFill}
            />
          );
        },
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
