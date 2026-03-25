import React from 'react';
import { BlurView } from 'expo-blur';
import { Linking, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LucideIcon } from './ui/LucideIcon';

export function LocationPermissionOverlay() {
  const openSettings = () => {
    Linking.openSettings();
  };

  return (
    <View className="absolute inset-0 z-50 flex-1 justify-center items-center px-6">
      <View className="absolute inset-0 bg-slate-900/80" />
      
      <Animated.View entering={FadeInDown.springify()}>
        <View className="rounded-3xl overflow-hidden w-full max-w-sm shadow-2xl shadow-black">
          <BlurView intensity={80} tint="dark" className="p-8 items-center border border-white/10 bg-slate-800/50">
            <View className="w-20 h-20 rounded-full bg-blue-500/20 items-center justify-center mb-6 border border-blue-500/30">
              <LucideIcon name="MapPinOff" size={36} color="#3b82f6" />
            </View>
            
            <Text className="text-white text-2xl font-bold mb-3 text-center">
              Ubicación Requerida
            </Text>
            
            <Text className="text-slate-300 text-center mb-8 leading-relaxed">
              Para que UbiUlsa pueda notificarte cuando estés cerca de un lugar emblemático, necesitamos acceso a tu ubicación.
            </Text>
            
            <TouchableOpacity 
              className="bg-blue-600 w-full py-4 rounded-xl items-center flex-row justify-center gap-2 active:bg-blue-700"
              onPress={openSettings}
            >
              <LucideIcon name="Settings" size={20} color="#ffffff" />
              <Text className="text-white font-bold text-base">
                Abrir Configuración
              </Text>
            </TouchableOpacity>
          </BlurView>
        </View>
      </Animated.View>
    </View>
  );
}

