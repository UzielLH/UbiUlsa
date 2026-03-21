import { BlurView } from "expo-blur";
import Constants, { ExecutionEnvironment } from "expo-constants";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
    Dimensions,
    Image,
    Modal,
    Platform,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import MapView, { Circle, Marker } from "react-native-maps";
import Animated, {
    FadeInDown,
    FadeOutDown
} from "react-native-reanimated";
import { LucideIcon } from "../../components/ui/LucideIcon";
import { PLACES, Place } from "../../data/places";

const { height } = Dimensions.get("window");
const isExpoGo =
  Constants.executionEnvironment === ExecutionEnvironment.StoreClient;
const isAndroidExpoGo = Platform.OS === "android" && isExpoGo;

function getDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function MapScreen() {
  const router = useRouter();
  const mapRef = useRef<MapView>(null);
  const notifiedPlaces = useRef<Set<string>>(new Set());
  const [location, setLocation] =
    useState<Location.LocationObjectCoords | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [nearbyPlaceId, setNearbyPlaceId] = useState<string | null>(null);

  useEffect(() => {
    let subscription: Location.LocationSubscription;
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      // Obtener posición inicial
      const initial = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
      });
      setLocation(initial.coords);

      // Escuchar cambios de posición
      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          distanceInterval: 0, // actualiza aunque no te muevas
          timeInterval: 500, // cada medio segundo
          mayShowUserSettingsDialog: true, // pide activar GPS de alta precisión
        },
        (loc) => {
          // Solo actualiza si la precisión es buena (menos de 10 metros)
          if (loc.coords.accuracy && loc.coords.accuracy <= 10) {
            setLocation(loc.coords);
            checkProximity(loc.coords);
          }
        },
      );
    })();
    return () => subscription?.remove();
  }, []);

  const checkProximity = (coords: Location.LocationObjectCoords) => {
    let foundNearby = false;

    for (const place of PLACES) {
      const dist = getDistance(
        coords.latitude,
        coords.longitude,
        place.latitude,
        place.longitude,
      );

      if (dist <= place.radius) {
        foundNearby = true;
        setNearbyPlaceId(place.id);

        // Solo mostrar modal si no se ha notificado antes
        if (!notifiedPlaces.current.has(place.id)) {
          notifiedPlaces.current.add(place.id);

          if (!isAndroidExpoGo) {
            try {
              const Notifications = require("expo-notifications");
              Notifications.scheduleNotificationAsync({
                content: {
                  title: `Emblemático: ${place.name}`,
                  body: place.shortDesc,
                },
                trigger: null,
              });
            } catch (error) {
              console.warn("Failed to schedule notification:", error);
            }
          }

          setSelectedPlace(place);
          setModalVisible(true);

          // Centrar mapa en el lugar detectado
          mapRef.current?.animateToRegion({
            latitude: place.latitude,
            longitude: place.longitude,
            latitudeDelta: 0.0005,
            longitudeDelta: 0.0005,
          });
        }
      } else {
        // Si salió del radio, resetear para que pueda volver a activarse
        if (notifiedPlaces.current.has(place.id)) {
          notifiedPlaces.current.delete(place.id);
        }
        if (nearbyPlaceId === place.id) {
          setNearbyPlaceId(null);
        }
      }
    }

    if (!foundNearby) {
      setNearbyPlaceId(null);
    }
  };

  const goToMyLocation = () => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      });
    }
  };

  return (
    <View className="flex-1 bg-slate-900">
      <MapView
        ref={mapRef}
        className="flex-1"
        mapType="satellite"
        initialRegion={{
          latitude: 17.022111,
          longitude: -96.72075,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        }}
        showsUserLocation
        showsMyLocationButton={false}
      >
        {PLACES.map((place) => (
          <React.Fragment key={place.id}>
            <Circle
              center={{ latitude: place.latitude, longitude: place.longitude }}
              radius={place.radius}
              fillColor={
                nearbyPlaceId === place.id
                  ? place.color + "66"
                  : place.color + "33"
              }
              strokeColor={place.color}
              strokeWidth={nearbyPlaceId === place.id ? 3 : 2}
            />

            {/* Solo muestra el Marker si estás cerca */}
            {nearbyPlaceId === place.id && (
              <Marker
                coordinate={{
                  latitude: place.latitude,
                  longitude: place.longitude,
                }}
                onPress={() => {
                  setSelectedPlace(place);
                  setModalVisible(true);
                }}
              >
                <View
                  className="w-14 h-14 rounded-full items-center justify-center border-4 shadow-xl"
                  style={{ backgroundColor: place.color, borderColor: "#fff" }}
                >
                  <LucideIcon name={place.icon} size={28} color="#fff" />
                </View>
              </Marker>
            )}
          </React.Fragment>
        ))}
      </MapView>

      {/* Botón mi ubicación */}
      <View className="absolute bottom-[85px] right-6 z-10 shadow-lg shadow-black/50">
        <TouchableOpacity
          className="w-14 h-14 rounded-full overflow-hidden"
          onPress={goToMyLocation}
        >
          <BlurView
            intensity={70}
            tint="light"
            className="flex-1 items-center justify-center bg-white/20"
          >
            <LucideIcon name="LocateFixed" size={24} color="#0f172a" />
          </BlurView>
        </TouchableOpacity>
      </View>

      {/* Badge de lugar cercano activo */}
      {nearbyPlaceId &&
        (() => {
          const p = PLACES.find((p) => p.id === nearbyPlaceId);
          return p ? (
            <Animated.View
              entering={FadeInDown}
              exiting={FadeOutDown}
              style={{
                position: "absolute",
                top: 64,
                width: "100%",
                alignItems: "center",
                zIndex: 10,
                paddingHorizontal: 16,
              }}
            >
              <View className="rounded-full overflow-hidden shadow-lg shadow-black/30">
                <BlurView
                  intensity={80}
                  tint="dark"
                  className="px-5 py-3 flex-row items-center gap-3"
                >
                  <LucideIcon name={p.icon} size={20} color={p.color} />
                  <Text className="text-white font-bold">
                    ¡Estás cerca de {p.name}!
                  </Text>
                </BlurView>
              </View>
            </Animated.View>
          ) : null;
        })()}

      <View className="absolute top-16 left-4 z-10 rounded-full overflow-hidden">
        <BlurView
          intensity={60}
          tint="light"
          className="px-4 py-2 flex-row items-center gap-2"
        >
          <LucideIcon name="GraduationCap" size={18} color="#0f172a" />
          <Text className="font-bold text-slate-800">La Salle Oaxaca</Text>
        </BlurView>
      </View>

      {/* Modal de información Glassmorphism */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View
          className="flex-1 justify-end p-4 pb-8"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <Animated.View entering={FadeInDown.springify()}>
            <View className="rounded-[32px] overflow-hidden">
              <BlurView
                intensity={90}
                tint="dark"
                className="w-full bg-slate-900/60 border border-white/20 pb-6"
              >
                {selectedPlace && (
                  <View>
                    <Image
                      source={
                        typeof selectedPlace.image === "string"
                          ? { uri: selectedPlace.image }
                          : selectedPlace.image
                      }
                      className="w-full h-48"
                    />

                    <View className="px-6 -mt-8 mb-4 flex-row items-center space-x-3">
                      <View
                        className="w-16 h-16 rounded-2xl items-center justify-center shadow-lg"
                        style={{ backgroundColor: selectedPlace.color }}
                      >
                        <LucideIcon
                          name={selectedPlace.icon}
                          size={32}
                          color="#fff"
                        />
                      </View>
                    </View>

                    <View className="px-6">
                      <Text className="text-2xl font-bold text-white mb-2">
                        {selectedPlace.name}
                      </Text>
                      <Text
                        className="text-slate-300 text-sm leading-relaxed mb-6"
                        numberOfLines={3}
                      >
                        {selectedPlace.description}
                      </Text>

                      <View className="flex-row gap-4">
                        <TouchableOpacity
                          className="flex-1 py-4 rounded-2xl"
                          style={{ backgroundColor: selectedPlace.color }}
                          onPress={() => {
                            setModalVisible(false);
                            router.push({
                              pathname: "/detail",
                              params: { id: selectedPlace.id },
                            });
                          }}
                        >
                          <Text className="text-white text-center font-bold text-base">
                            Ver detalles
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          className="py-4 px-6 rounded-2xl bg-white/10"
                          onPress={() => setModalVisible(false)}
                        >
                          <Text className="text-white font-semibold">
                            Cerrar
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )}
              </BlurView>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}
