import { View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedDivisorProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedDivisor({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedDivisorProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "divisor"
  );

  return (
    <View style={[{ backgroundColor, height: 1 }, style]} {...otherProps} />
  );
}
