import * as Location from 'expo-location';
import { useEffect, useRef, useState } from 'react';
import { PLACES } from '../data/places';
import { getDistance } from '../utils/location';
import Constants, { ExecutionEnvironment } from 'expo-constants';
import { Platform } from 'react-native';

const isExpoGo = Constants.executionEnvironment === ExecutionEnvironment.StoreClient;
const isAndroidExpoGo = Platform.OS === 'android' && isExpoGo;

export function useProximityTracker() {
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [nearbyPlaceId, setNearbyPlaceId] = useState<string | null>(null);
  const [hideNearbyBadge, setHideNearbyBadge] = useState<boolean>(false);
  const [permissionStatus, setPermissionStatus] = useState<Location.PermissionStatus | 'loading'>('loading');
  
  const currentNearbyIdRef = useRef<string | null>(null);
  const notifiedPlacesRef = useRef<Set<string>>(new Set());
  const locationRef = useRef<Location.LocationObjectCoords | null>(null);

  useEffect(() => {
    let subscription: Location.LocationSubscription;

    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        setPermissionStatus(status);
        
        if (status !== 'granted') return;

        const initial = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.BestForNavigation,
        });
        setLocation(initial.coords);
        locationRef.current = initial.coords;

        subscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.BestForNavigation,
            distanceInterval: 0,
            timeInterval: 500,
            mayShowUserSettingsDialog: true,
          },
          (loc) => {
            if (loc.coords.accuracy && loc.coords.accuracy <= 10) {
              locationRef.current = loc.coords;
              checkProximity(loc.coords);
            }
          }
        );
      } catch (error) {
        console.warn('Error starting location tracking:', error);
      }
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
        place.longitude
      );

      if (dist <= place.radius) {
        foundNearby = true;

        if (currentNearbyIdRef.current !== place.id) {
          currentNearbyIdRef.current = place.id;
          setNearbyPlaceId(place.id);
          setHideNearbyBadge(false);
          
          // Opcional: Actualizar el estado de la ubicación solo cuando hay un cambio de lugar
          // para forzar un re-render si es necesario mostrar algo en el mapa basado en 'location'
          setLocation(coords);
        }

        if (!notifiedPlacesRef.current.has(place.id)) {
          notifiedPlacesRef.current.add(place.id);

          if (!isAndroidExpoGo) {
            try {
              const Notifications = require('expo-notifications');
              Notifications.scheduleNotificationAsync({
                content: {
                  title: `Emblemático: ${place.name}`,
                  body: place.shortDesc,
                },
                trigger: null,
              });
            } catch (error) {
              console.warn('Failed to schedule notification:', error);
            }
          }
        }
      } else {
        if (notifiedPlacesRef.current.has(place.id)) {
          notifiedPlacesRef.current.delete(place.id);
        }
        if (currentNearbyIdRef.current === place.id) {
          currentNearbyIdRef.current = null;
          setNearbyPlaceId(null);
        }
      }
    }

    if (!foundNearby && currentNearbyIdRef.current !== null) {
      currentNearbyIdRef.current = null;
      setNearbyPlaceId(null);
    }
  };

  const getLatestLocation = () => locationRef.current;

  return {
    location,
    nearbyPlaceId,
    hideNearbyBadge,
    setHideNearbyBadge,
    permissionStatus,
    getLatestLocation,
  };
}

