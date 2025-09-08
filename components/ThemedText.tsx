import { Text, type TextProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { Typography } from "@/constants/Typography";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | "default"
    | "title"
    | "defaultSemiBold"
    | "subtitle"
    | "link"
    | "disable";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const disableColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "disableText"
  );

  return (
    <Text
      style={[
        { color: type === "disable" ? disableColor : color },
        type === "default" ? styles.default : undefined,
        type === "disable" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,

        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: Typography.default,
  defaultSemiBold: Typography.defaultSemiBold,
  title: Typography.title,
  subtitle: Typography.subtitle,
  link: Typography.link,
});
