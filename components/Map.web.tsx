/* eslint-disable react/display-name */
import React, { forwardRef, useImperativeHandle } from "react";
import { StyleSheet, Text, View } from "react-native";

const MapView = forwardRef<any, any>((props, ref) => {
  useImperativeHandle(ref, () => ({
    animateToRegion: (region: any) => {
      console.log("animateToRegion called on web", region);
    },
    getCamera: async () => ({
      center: { latitude: 0, longitude: 0 },
      heading: 0,
      pitch: 0,
      zoom: 0,
      altitude: 0,
    }),
    fitToCoordinates: () => {},
    fitToSuppliedMarkers: () => {},
    fitToElements: () => {},
    setCamera: () => {},
    animateCamera: () => {},
    setMapBoundaries: () => {},
  }));

  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.text}>Maps are not supported on web yet.</Text>
      {/* We render children but they won't show anything meaningful if components are null */}
      {props.children}
    </View>
  );
});

export const Circle = (props: any) => null;
export const Marker = (props: any) => null;
export const Callout = (props: any) => null;
export const Polygon = (props: any) => null;
export const Polyline = (props: any) => null;
export const PROVIDER_GOOGLE = "google";
export const PROVIDER_DEFAULT = "default";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    minHeight: 200,
  },
  text: {
    padding: 20,
    textAlign: "center",
    color: "#666",
  },
});

export default MapView;
