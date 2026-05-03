// metro.config.js
// Permite que Metro bundler reconozca archivos .glb y .gltf como assets estáticos
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Agregar extensiones de modelos 3D a la lista de assets conocidos por Metro
config.resolver.assetExts.push("glb", "gltf", "bin", "usdz");

module.exports = config;
