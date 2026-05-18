import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system/legacy";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import FileViewer from "react-native-file-viewer";
import { WebView } from "react-native-webview";
import { LucideIcon } from "./ui/LucideIcon";

interface ModelViewerProps {
  /** Asset requerido con require(), e.g. require("../assets/Models/arbol_low_poly.glb") */
  modelAsset: number;
  /** Asset opcional para iOS (.usdz) */
  iosModelAsset?: number;
  /** Nombre para el atributo alt del model-viewer */
  alt?: string;
  /** Color de acento para el spinner y mensajes */
  accentColor?: string;
}

export default function ModelViewer({
  modelAsset,
  iosModelAsset,
  alt = "Modelo 3D",
  accentColor = "#22c55e",
}: ModelViewerProps) {
  const [modelUri, setModelUri] = useState<string | null>(null);
  const [androidUri, setAndroidUri] = useState<string | null>(null);
  const [iosUri, setIosUri] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const asset = Asset.fromModule(modelAsset);
        await asset.downloadAsync();
        if (asset.localUri) {
          setAndroidUri(asset.localUri);
          // Leemos el archivo físico como Base64 para saltarnos el CORS de WebView
          // y evitar que el servidor de desarrollo crashee.
          const base64 = await FileSystem.readAsStringAsync(asset.localUri, {
            encoding: "base64",
          });
          setModelUri(`data:model/gltf-binary;base64,${base64}`);
        } else if (asset.uri) {
          setModelUri(asset.uri);
        } else {
          setError("No se pudo obtener la URI del modelo.");
        }

        // Si hay asset para iOS, lo descargamos también
        if (iosModelAsset) {
          const iosAsset = Asset.fromModule(iosModelAsset);
          await iosAsset.downloadAsync();
          if (iosAsset.localUri) {
            // Para Quick Look en iOS, solemos necesitar la ruta directa
            setIosUri(iosAsset.localUri);
          } else if (iosAsset.uri) {
            setIosUri(iosAsset.uri);
          }
        }
      } catch (err: any) {
        setError("Error al cargar el modelo 3D.");
        console.error(err);
      }
    })();
  }, [modelAsset, iosModelAsset]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!modelUri) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={accentColor} />
        <Text style={[styles.loadingText, { color: accentColor }]}>
          Cargando modelo 3D…
        </Text>
      </View>
    );
  }

  const html = `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <script type="module"
          src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js">
        </script>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          html, body {
            width: 100%; height: 100%;
            background: transparent;
            overflow: hidden;
          }
          model-viewer {
            width: 100vw;
            height: 100vh;
            background-color: transparent;
            --poster-color: transparent;
          }
          /* Estilizamos el botón original de Google usando CSS Parts para subirlo */
          model-viewer::part(default-ar-button) {
            bottom: 100px;
          }
        </style>
      </head>
      <body>
        <model-viewer
          src="${modelUri}"
          alt="${alt}"
          camera-controls
          auto-rotate
          auto-rotate-delay="500"
          rotation-per-second="30deg"
          shadow-intensity="1"
          shadow-softness="1"
          environment-image="neutral"
          exposure="1"
          style="width:100%;height:100%;"
        >
        </model-viewer>
      </body>
    </html>
  `;

  return (
    <View style={{ flex: 1 }}>
      <WebView
        style={styles.webview}
        originWhitelist={["*"]}
        source={{ html, baseUrl: "https://localhost" }}
        javaScriptEnabled
        domStorageEnabled
        allowFileAccessFromFileURLs
        allowUniversalAccessFromFileURLs
        mixedContentMode="always"
        onShouldStartLoadWithRequest={(request) => {
          return true;
        }}
      />

      {((Platform.OS === "ios" && iosUri) ||
        (Platform.OS === "android" && androidUri)) && (
        <TouchableOpacity
          style={styles.floatingArButton}
          onPress={() => {
            const uriToOpen = Platform.OS === "ios" ? iosUri : androidUri;
            if (!uriToOpen) return;

            FileViewer.open(uriToOpen).catch((err) => {
              console.error("Error abriendo Visor Nativo:", err);
              Alert.alert(
                "AR no disponible",
                "No se pudo abrir el visor 3D nativo.",
              );
            });
          }}
        >
          <LucideIcon name="Box" color="#fff" size={24} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  webview: {
    flex: 1,
    backgroundColor: "transparent",
  },
  floatingArButton: {
    position: "absolute",
    bottom: 120, // encima de la tarjeta info
    right: 20,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderColor: "rgba(255,255,255,0.3)",
    borderWidth: 1,
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0f172a",
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 8,
  },
  errorText: {
    color: "#f87171",
    fontSize: 14,
    textAlign: "center",
    paddingHorizontal: 24,
  },
});
