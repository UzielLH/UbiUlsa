import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import React from "react";
import {
    FlatList,
    ImageBackground,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { LucideIcon } from "../../components/ui/LucideIcon";
import { PLACES } from "../../data/places";

export default function PlacesScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-slate-900">
      <FlatList
        data={PLACES}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 100, gap: 20 }}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInDown.delay(index * 100).springify()}>
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/detail",
                  params: { id: item.id },
                })
              }
              activeOpacity={0.8}
              className="rounded-3xl overflow-hidden overflow-visible shadow-lg shadow-black/50"
            >
              <ImageBackground
                source={
                  typeof item.image === "string"
                    ? { uri: item.image }
                    : item.image
                }
                className="w-full h-60 justify-end overflow-hidden rounded-3xl"
                imageStyle={{ borderRadius: 24 }}
              >
                <BlurView
                  intensity={60}
                  tint="dark"
                  className="overflow-hidden p-4 rounded-b-3xl border-t border-white/20"
                >
                  <View className="flex-row items-center gap-4">
                    <View className="p-3 rounded-full bg-white/20 border border-white/30">
                      <LucideIcon
                        name={item.icon}
                        size={28}
                        color={item.color}
                      />
                    </View>
                    <View className="flex-1">
                      <Text className="text-white font-bold text-lg">
                        {item.name}
                      </Text>
                      <Text className="text-white/80 text-sm mt-1">
                        {item.shortDesc}
                      </Text>
                    </View>
                    <LucideIcon name="ChevronRight" size={24} color="#fff" />
                  </View>
                </BlurView>
              </ImageBackground>
            </TouchableOpacity>
          </Animated.View>
        )}
      />
    </View>
  );
}
