import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PLACES } from "../../data/places";

export default function PlacesScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <FlatList
        data={PLACES}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, gap: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/detail" as any,
                params: { id: item.id },
              })
            }
            activeOpacity={0.85}
          >
            <Image
              source={
                typeof item.image === "string"
                  ? { uri: item.image }
                  : item.image
              }
              style={styles.image}
            />
            <View style={[styles.colorBar, { backgroundColor: item.color }]} />
            <View style={styles.row}>
              <Text style={styles.emoji}>{item.icon}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.desc}>{item.shortDesc}</Text>
              </View>
              <Text style={styles.arrow}>→</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f6fa" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  image: { width: "100%", height: 160, resizeMode: "cover" },
  colorBar: { height: 4 },
  row: { flexDirection: "row", alignItems: "center", padding: 14, gap: 12 },
  emoji: { fontSize: 28 },
  name: { fontSize: 16, fontWeight: "800", color: "#0d2137" },
  desc: { fontSize: 13, color: "#666", marginTop: 2 },
  arrow: { fontSize: 20, color: "#0d2137", fontWeight: "900" },
});
