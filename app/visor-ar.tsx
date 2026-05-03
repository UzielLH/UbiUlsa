import { BlurView } from "expo-blur";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { LucideIcon } from "../components/ui/LucideIcon";
import ModelViewer from "../components/ModelViewer";
import { PLACES } from "../data/places";

export default function VisorARScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const place = PLACES.find((p) => p.id === id);

  if (!place || !place.model) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-900">
        <LucideIcon name="AlertTriangle" color="#f87171" size={48} />
        <Text className="text-white text-lg font-bold mt-4">
          Modelo no disponible
        </Text>
        <Text className="text-slate-400 text-sm mt-2 text-center px-8">
          Este lugar no tiene un modelo 3D asignado.
        </Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="mt-8 px-8 py-3 rounded-2xl bg-sky-500"
        >
          <Text className="text-white font-bold">Regresar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-slate-900">
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Header flotante con blur */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 20,
        }}
      >
        <BlurView
          intensity={60}
          tint="dark"
          style={{
            paddingTop: 52,
            paddingBottom: 12,
            paddingHorizontal: 16,
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
          }}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "rgba(255,255,255,0.15)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LucideIcon name="ArrowLeft" color="#fff" size={22} />
          </TouchableOpacity>

          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: "#fff",
                fontWeight: "800",
                fontSize: 16,
                lineHeight: 20,
              }}
              numberOfLines={1}
            >
              {place.name}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginTop: 2 }}>
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "#22c55e",
                }}
              />
              <Text style={{ color: "#94a3b8", fontSize: 12 }}>
                Visor 3D · Toca el botón AR para ver en tu espacio
              </Text>
            </View>
          </View>

          {/* Icono del lugar */}
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              backgroundColor: place.color + "33",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LucideIcon name={place.icon} color={place.color} size={20} />
          </View>
        </BlurView>
      </View>

      {/* Visor 3D */}
      <ModelViewer
        modelAsset={place.model}
        iosModelAsset={place.iosModel}
        alt={place.name}
        accentColor={place.color}
      />

      {/* Hint en la parte inferior */}
      <View
        style={{
          position: "absolute",
          bottom: 32,
          left: 16,
          right: 16,
          zIndex: 20,
          alignItems: "center",
        }}
        pointerEvents="none"
      >
        <BlurView
          intensity={50}
          tint="dark"
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 20,
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.15)",
          }}
        >
          <LucideIcon name="RotateCcw" color="#94a3b8" size={16} />
          <Text style={{ color: "#94a3b8", fontSize: 12 }}>
            Arrastra para rotar · Pellizca para zoom
          </Text>
        </BlurView>
      </View>
    </View>
  );
}
