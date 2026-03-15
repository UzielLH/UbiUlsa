import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { PLACES } from "../data/places";

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const place = PLACES.find((p) => p.id === id);

  if (!place)
    return (
      <View style={styles.container}>
        <Text>Lugar no encontrado</Text>
      </View>
    );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image source={{ uri: place.image }} style={styles.hero} />
      <View style={[styles.badge, { backgroundColor: place.color }]}>
        <Text style={styles.badgeText}>{place.icon} Lugar Emblemático</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{place.name}</Text>
        <View style={styles.coordsBox}>
          <Text style={styles.coordsTitle}>📍 Ubicación GPS</Text>
          <Text style={styles.coordsText}>
            Latitud: {place.latitude.toFixed(6)}
          </Text>
          <Text style={styles.coordsText}>
            Longitud: {place.longitude.toFixed(6)}
          </Text>
          <Text style={styles.coordsText}>
            Radio de detección: {place.radius} metros
          </Text>
        </View>
        <Text style={styles.sectionTitle}>Acerca del lugar</Text>
        <Text style={styles.description}>{place.description}</Text>
        <View style={styles.lasalleBox}>
          <Text style={styles.lasalleTitle}>
            🏫 Universidad La Salle Oaxaca
          </Text>
          <Text style={styles.lasalleText}>
            Institución de educación superior con valores lasallistas de fe,
            servicio y comunidad.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f6fa" },
  hero: { width: "100%", height: 280, resizeMode: "cover" },
  badge: {
    alignSelf: "flex-start",
    margin: 20,
    marginBottom: 0,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  badgeText: { color: "#fff", fontWeight: "800", fontSize: 13 },
  content: { padding: 20 },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#0d2137",
    marginBottom: 20,
    lineHeight: 34,
  },
  coordsBox: {
    backgroundColor: "#0d2137",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  coordsTitle: {
    color: "#f0c040",
    fontWeight: "800",
    fontSize: 15,
    marginBottom: 8,
  },
  coordsText: { color: "#aac4e0", fontSize: 13, lineHeight: 22 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0d2137",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: "#444",
    lineHeight: 26,
    marginBottom: 24,
  },
  lasalleBox: {
    backgroundColor: "#f0c04022",
    borderLeftWidth: 4,
    borderLeftColor: "#f0c040",
    padding: 16,
    borderRadius: 12,
    marginBottom: 40,
  },
  lasalleTitle: {
    fontWeight: "800",
    color: "#0d2137",
    fontSize: 15,
    marginBottom: 8,
  },
  lasalleText: { color: "#555", fontSize: 14, lineHeight: 22 },
});
