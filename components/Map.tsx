import React, { useRef, useState } from 'react';
import { Dimensions, Platform, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Circle, Marker } from 'react-native-maps';
import { BlurView } from 'expo-blur';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { LucideIcon } from './ui/LucideIcon';
import { PLACES, Place } from '../data/places';
import { MAP_CONFIG } from '../constants/map';
import { useProximityTracker } from '../hooks/useProximityTracker';
import { PlaceModal } from './PlaceModal';
import { LocationPermissionOverlay } from './LocationPermissionOverlay';

export default function MapScreen() {
  const mapRef = useRef<MapView>(null);
  const [mapType, setMapType] = useState<'standard' | 'satellite'>('standard');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const {
    location,
    nearbyPlaceId,
    hideNearbyBadge,
    setHideNearbyBadge,
    permissionStatus,
    getLatestLocation,
  } = useProximityTracker();

  const goToMyLocation = () => {
    const loc = getLatestLocation();
    if (loc && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: loc.latitude,
        longitude: loc.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      });
    }
  };

  if (permissionStatus === 'denied') {
    return <LocationPermissionOverlay />;
  }

  return (
    <View className="flex-1 bg-slate-900">
      <MapView
        ref={mapRef}
        className="flex-1"
        mapType={mapType}
        initialRegion={MAP_CONFIG.INITIAL_REGION}
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
                  ? place.color + '66'
                  : place.color + '33'
              }
              strokeColor={place.color}
              strokeWidth={nearbyPlaceId === place.id ? 3 : 2}
            />

            {nearbyPlaceId === place.id && (
              <Marker
                coordinate={{
                  latitude: place.latitude,
                  longitude: place.longitude,
                }}
                tracksViewChanges={false}
                anchor={{ x: 0.5, y: 0.5 }}
                onPress={(e) => {
                  e.stopPropagation();
                  setSelectedPlace(place);
                  setModalVisible(true);
                }}
              >
                <View
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 3,
                    backgroundColor: place.color,
                    borderColor: '#fff',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.4,
                    shadowRadius: 4,
                    elevation: 5,
                  }}
                >
                  <LucideIcon name={place.icon} size={22} color="#fff" />
                </View>
              </Marker>
            )}
          </React.Fragment>
        ))}
      </MapView>

      <View className="absolute top-16 right-4 z-10 pt-safe">
        <View className="rounded-[20px] overflow-hidden shadow-lg shadow-black/40">
          <BlurView
            intensity={90}
            tint="dark"
            className="w-12 items-center flex-col py-1"
            style={{ backgroundColor: 'rgba(15, 23, 42, 0.4)' }}
          >
            <TouchableOpacity
              className="w-12 h-12 items-center justify-center p-2 mb-1"
              onPress={() =>
                setMapType((prev) =>
                  prev === 'standard' ? 'satellite' : 'standard'
                )
              }
            >
              <LucideIcon name="Map" size={22} color="#f8fafc" />
            </TouchableOpacity>

            <View className="h-[1px] w-8 bg-white/20" />

            <TouchableOpacity
              className="w-12 h-12 items-center justify-center p-2 mt-1"
              onPress={goToMyLocation}
            >
              <LucideIcon name="Navigation" size={22} color="#f8fafc" />
            </TouchableOpacity>
          </BlurView>
        </View>
      </View>

      {nearbyPlaceId && !hideNearbyBadge && (() => {
        const p = PLACES.find((p) => p.id === nearbyPlaceId);
        return p ? (
          <Animated.View
            entering={FadeInDown}
            exiting={FadeOutDown}
            style={{
              position: 'absolute',
              top: 110,
              width: '100%',
              alignItems: 'center',
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
                <Text className="text-white font-bold mr-2">
                  ¡Estás cerca de {p.name}!
                </Text>
                <TouchableOpacity
                  onPress={() => setHideNearbyBadge(true)}
                  className="bg-white/20 rounded-full p-1 ml-1"
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <LucideIcon name="X" size={14} color="#fff" />
                </TouchableOpacity>
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

      <PlaceModal 
        visible={modalVisible} 
        place={selectedPlace} 
        onClose={() => setModalVisible(false)} 
      />
    </View>
  );
}

