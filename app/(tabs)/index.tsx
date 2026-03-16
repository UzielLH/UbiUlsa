import Constants, { ExecutionEnvironment } from "expo-constants";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Circle, Marker } from "react-native-maps";
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
                  title: `${place.icon} ${place.name}`,
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
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
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
                  style={[
                    styles.marker,
                    { backgroundColor: place.color },
                    styles.markerActive,
                  ]}
                >
                  <Text style={{ fontSize: 26 }}>{place.icon}</Text>
                </View>
              </Marker>
            )}
          </React.Fragment>
        ))}
      </MapView>

      {/* Botón mi ubicación */}
      <TouchableOpacity style={styles.myLocationBtn} onPress={goToMyLocation}>
        <Text style={{ fontSize: 24 }}>📍</Text>
      </TouchableOpacity>

      {/* Badge de lugar cercano activo */}
      {nearbyPlaceId && (
        <View style={styles.nearbyBadge}>
          <Text style={styles.nearbyText}>
            🔔 {PLACES.find((p) => p.id === nearbyPlaceId)?.icon} ¡Estás cerca!
          </Text>
        </View>
      )}

      <View style={styles.legend}>
        <Text style={styles.legendText}>🏫 La Salle Oaxaca</Text>
      </View>

      {/* Modal de información */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.overlay}>
          <View style={styles.card}>
            <Image
              source={
                typeof selectedPlace?.image === "string"
                  ? { uri: selectedPlace.image }
                  : (selectedPlace?.image ?? undefined)
              }
              style={styles.cardImage}
            />
            <View
              style={[styles.badge, { backgroundColor: selectedPlace?.color }]}
            >
              <Text style={styles.badgeText}>
                {selectedPlace?.icon} Lugar Emblemático
              </Text>
            </View>
            <ScrollView style={{ paddingHorizontal: 20 }}>
              <Text style={styles.cardTitle}>{selectedPlace?.name}</Text>
              <Text style={styles.cardDesc}>{selectedPlace?.description}</Text>
            </ScrollView>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.detailBtn}
                onPress={() => {
                  setModalVisible(false);
                  router.push({
                    pathname: "/detail",
                    params: { id: selectedPlace?.id },
                  });
                }}
              >
                <Text style={styles.detailBtnText}>Ver más →</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeBtnText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  marker: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#fff",
    elevation: 5,
  },
  markerActive: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderColor: "#f0c040",
    borderWidth: 4,
    elevation: 10,
  },
  myLocationBtn: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#0d2137",
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    borderWidth: 2,
    borderColor: "#f0c040",
  },
  nearbyBadge: {
    position: "absolute",
    bottom: 100,
    alignSelf: "center",
    backgroundColor: "#f0c040",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    elevation: 8,
  },
  nearbyText: {
    color: "#0d2137",
    fontWeight: "900",
    fontSize: 14,
  },
  legend: {
    position: "absolute",
    top: 16,
    left: 16,
    backgroundColor: "#0d2137ee",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#f0c040",
  },
  legendText: { color: "#f0c040", fontWeight: "700", fontSize: 13 },
  overlay: { flex: 1, backgroundColor: "#000a", justifyContent: "flex-end" },
  card: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    overflow: "hidden",
    maxHeight: height * 0.75,
  },
  cardImage: { width: "100%", height: 200, resizeMode: "cover" },
  badge: {
    alignSelf: "flex-start",
    margin: 16,
    marginBottom: 0,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: { color: "#fff", fontWeight: "800", fontSize: 12 },
  cardTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "#0d2137",
    marginTop: 10,
    marginBottom: 8,
  },
  cardDesc: { fontSize: 15, color: "#444", lineHeight: 23, marginBottom: 16 },
  modalButtons: { flexDirection: "row", padding: 16, gap: 12 },
  detailBtn: {
    flex: 1,
    backgroundColor: "#0d2137",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  detailBtnText: { color: "#f0c040", fontWeight: "800", fontSize: 15 },
  closeBtn: {
    flex: 1,
    backgroundColor: "#eee",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  closeBtnText: { color: "#333", fontWeight: "700", fontSize: 15 },
});
