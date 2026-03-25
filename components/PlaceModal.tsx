import React from 'react';
import { BlurView } from 'expo-blur';
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LucideIcon } from './ui/LucideIcon';
import { Place } from '../data/places';
import { useRouter } from 'expo-router';

interface PlaceModalProps {
  visible: boolean;
  place: Place | null;
  onClose: () => void;
}

export function PlaceModal({ visible, place, onClose }: PlaceModalProps) {
  const router = useRouter();

  if (!place) return null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View
        className="flex-1 justify-end p-4 pb-8"
        style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
      >
        <Animated.View entering={FadeInDown.springify()}>
          <View className="rounded-[32px] overflow-hidden">
            <BlurView
              intensity={90}
              tint="dark"
              className="w-full bg-slate-900/60 border border-white/20 pb-6"
            >
              <View>
                <Image
                  source={
                    typeof place.image === 'string'
                      ? { uri: place.image }
                      : place.image
                  }
                  className="w-full h-48"
                />

                <View className="px-6 -mt-8 mb-4 flex-row items-center space-x-3">
                  <View
                    className="w-16 h-16 rounded-2xl items-center justify-center shadow-lg"
                    style={{ backgroundColor: place.color }}
                  >
                    <LucideIcon
                      name={place.icon}
                      size={32}
                      color="#fff"
                    />
                  </View>
                </View>

                <View className="px-6">
                  <Text className="text-2xl font-bold text-white mb-2">
                    {place.name}
                  </Text>
                  <Text
                    className="text-slate-300 text-sm leading-relaxed mb-6"
                    numberOfLines={3}
                  >
                    {place.description}
                  </Text>

                  <View className="flex-row gap-4">
                    <TouchableOpacity
                      className="flex-1 py-4 rounded-2xl"
                      style={{ backgroundColor: place.color }}
                      onPress={() => {
                        onClose();
                        router.push({
                          pathname: '/detail',
                          params: { id: place.id },
                        });
                      }}
                    >
                      <Text className="text-white text-center font-bold text-base">
                        Ver detalles
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      className="py-4 px-6 rounded-2xl bg-white/10"
                      onPress={onClose}
                    >
                      <Text className="text-white font-semibold">
                        Cerrar
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </BlurView>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

