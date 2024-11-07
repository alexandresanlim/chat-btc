import { Colors } from "@/constants/Colors";
import React from "react";
import { View, Text, useColorScheme, ColorSchemeName } from "react-native";
import {
  Avatar,
  Bubble,
  MessageText,
  AvatarProps,
  IMessage,
  MessageTextProps,
  BubbleProps,
} from "react-native-gifted-chat";

export const renderAvatar = (
  props: AvatarProps<IMessage>,
  colorScheme: ColorSchemeName
) => {
  const colors = Colors[colorScheme ?? "light"];

  return (
    <Avatar
      {...props}
      // containerStyle={{
      //   left: { borderWidth: 3, borderColor: "red" },
      //   right: {},
      // }}
      imageStyle={{
        left: {
          borderWidth: 2,
          borderColor: colors.border,
          width: 30,
          height: 30,
        },
        right: {},
      }}
    />
  );
};

export const renderBubble = (
  props: BubbleProps<IMessage>,
  colorScheme: ColorSchemeName
) => {
  const colors = Colors[colorScheme ?? "light"];

  return (
    <Bubble
      {...props}
      renderTime={() => null}
      wrapperStyle={{
        left: { backgroundColor: colors.background },
        right: {
          borderColor: colors.foreground,
          borderWidth: 4,
          backgroundColor: colors.foreground,
        },
      }}
      bottomContainerStyle={{
        left: { backgroundColor: colors.background },
        right: { backgroundColor: colors.foreground },
      }}
      usernameStyle={{ color: colors.text, fontWeight: "700", marginTop: 4 }}
    />
  );
};

export const renderMessageText = (
  props: MessageTextProps<IMessage>,
  colorScheme: ColorSchemeName
) => {
  const colors = Colors[colorScheme ?? "light"];

  return (
    <MessageText
      {...props}
      containerStyle={{
        left: { backgroundColor: colors.background },
        right: {
          backgroundColor: colors.foreground,
        },
      }}
      textStyle={{
        left: { color: colors.text },
        right: { color: colors.text },
      }}
      linkStyle={{
        left: { color: colors.link },
        right: { color: colors.link },
      }}
      // customTextStyle={{ fontSize: 24, lineHeight: 24 }}
    />
  );
};

export const renderFooter = () => (
  <View style={{ minHeight: 20, alignItems: "center", backgroundColor: "red" }}>
    <Text>footer here</Text>
  </View>
);
