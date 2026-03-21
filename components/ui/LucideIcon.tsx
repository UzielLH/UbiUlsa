import * as Icons from "lucide-react-native";
import React from "react";

interface LucideIconProps {
  name: string;
  size?: number;
  color?: string;
  className?: string; // Optional class for NativeWind (wait, nativewind wrapper for svg is slightly different, better use color/size)
}

export const LucideIcon = ({
  name,
  size = 24,
  color = "black",
  ...props
}: LucideIconProps) => {
  const IconComponent = (Icons as any)[name];

  if (!IconComponent) {
    return <Icons.HelpCircle size={size} color={color} {...props} />;
  }

  return <IconComponent size={size} color={color} {...props} />;
};
