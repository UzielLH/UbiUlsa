import { BlurView } from "expo-blur";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
    ActivityIndicator,
    Dimensions,
    ImageBackground,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import YoutubePlayer from "react-native-youtube-iframe";
import { LucideIcon } from "../components/ui/LucideIcon";
import { PLACES } from "../data/places";

const { width } = Dimensions.get("window");

function getYoutubeId(url: string): string {
  const match = url.match(
    /(?:youtube\.be\/|v=|\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  );
  return match ? match[1] : "";
}

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const place = PLACES.find((p) => p.id === id);
  const [playing, setPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const onStateChange = useCallback((state: string) => {
    if (state === "ended") setPlaying(false);
  }, []);

  if (!place)
    return (
      <View className="flex-1 items-center justify-center bg-slate-900">
        <Text className="text-white text-lg">Lugar no encontrado</Text>
      </View>
    );

  const videoId = getYoutubeId(place.video);

  return (
    <View className="flex-1 bg-slate-900">
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Superior con imagen y botón regresar */}
        <ImageBackground
          source={
            typeof place.image === "string" ? { uri: place.image } : place.image
          }
          className="w-full h-80 justify-between"
        >
          {/* Capa de protección para leer iconos arriba, opcional */}
          <View className="absolute inset-0 bg-black/20" />

          <Animated.View entering={FadeInUp.delay(100).springify()}>
            <TouchableOpacity
              onPress={() => router.back()}
              className="mt-12 ml-6 w-12 h-12 rounded-full items-center justify-center overflow-hidden"
            >
              <BlurView
                intensity={40}
                tint="dark"
                className="absolute inset-0"
              />
              <LucideIcon name="ArrowLeft" color="#fff" size={24} />
            </TouchableOpacity>
          </Animated.View>
        </ImageBackground>

        {/* Contenido tipo Glass superpuesto */}
        <Animated.View
          entering={FadeInDown.delay(200).springify()}
          style={{ marginTop: -48 }}
        >
          <View className="bg-slate-900 rounded-t-[40px] px-6 pt-8 pb-12">
            <View className="flex-row items-center space-x-3 mb-4">
              <View
                className="w-12 h-12 rounded-2xl items-center justify-center"
                style={{ backgroundColor: place.color + "33" }}
              >
                <LucideIcon name={place.icon} color={place.color} size={28} />
              </View>
              <View
                style={{ backgroundColor: place.color }}
                className="px-4 py-2 rounded-full"
              >
                <Text className="text-white font-bold text-xs uppercase tracking-wider">
                  Lugar Emblemático
                </Text>
              </View>
            </View>

            <Text className="text-4xl font-extrabold text-white mb-6 tracking-tight">
              {place.name}
            </Text>

            {/* Coordenadas Glass Box */}
            <View className="rounded-3xl overflow-hidden mb-8 border border-white/10">
              <BlurView intensity={20} tint="light" className="p-6">
                <View className="flex-row items-center gap-2 mb-4">
                  <LucideIcon name="MapPin" color={place.color} size={20} />
                  <Text className="text-white font-bold text-lg">
                    Ubicación GPS
                  </Text>
                </View>
                <View className="pl-7">
                  <Text className="text-slate-300 mb-1">
                    Lat:{" "}
                    <Text className="text-white font-mono">
                      {place.latitude.toFixed(6)}
                    </Text>
                  </Text>
                  <Text className="text-slate-300 mb-1">
                    Lon:{" "}
                    <Text className="text-white font-mono">
                      {place.longitude.toFixed(6)}
                    </Text>
                  </Text>
                  <Text className="text-slate-300">
                    Radio:{" "}
                    <Text className="text-white font-mono">
                      {place.radius}m
                    </Text>
                  </Text>
                </View>
              </BlurView>
            </View>

            <Text className="text-xl font-bold text-white mb-4">
              Acerca del lugar
            </Text>
            <Text className="text-slate-300 text-base leading-relaxed mb-8">
              {place.description}
            </Text>

            {videoId && (
              <View className="mb-8">
                <View className="flex-row items-center gap-2 mb-4">
                  <LucideIcon name="Youtube" color="#ef4444" size={24} />
                  <Text className="text-xl font-bold text-white">Video</Text>
                </View>
                <View className="rounded-3xl overflow-hidden bg-slate-800/80 border border-white/10 min-h-[220px] justify-center items-center">
                  {!isReady && (
                    <View className="absolute z-10 items-center justify-center">
                      <ActivityIndicator size="large" color="#38bdf8" />
                      <Text className="text-slate-400 mt-3 font-medium">
                        Cargando video...
                      </Text>
                    </View>
                  )}
                  <View style={{ opacity: isReady ? 1 : 0 }}>
                    <YoutubePlayer
                      height={220}
                      width={width - 48}
                      play={playing}
                      videoId={videoId}
                      onChangeState={onStateChange}
                      onReady={() => setIsReady(true)}
                      initialPlayerParams={{
                        preventFullScreen: true,
                      }}
                    />
                  </View>
                </View>
              </View>
            )}

            <View
              className="px-5 py-6 rounded-3xl mb-8"
              style={{
                backgroundColor: place.color + "15",
                borderLeftWidth: 4,
                borderLeftColor: place.color,
              }}
            >
              <View className="flex-row items-center gap-2 mb-2">
                <LucideIcon
                  name="GraduationCap"
                  color={place.color}
                  size={24}
                />
                <Text className="font-bold text-white text-lg">
                  Universidad La Salle Oaxaca
                </Text>
              </View>
              <Text className="text-slate-300 text-base">
                Institución de educación superior con valores lasallistas de fe,
                servicio y comunidad.
              </Text>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}
