import { Colors } from "@/constants/Colors";
import React from "react";
import { View, Text, useColorScheme, ColorSchemeName } from "react-native";
import {
  Avatar,
  Bubble,
  SystemMessage,
  Message,
  MessageText,
  AvatarProps,
  IMessage,
  MessageTextProps,
  TimeProps,
  Time,
  Day,
  DayProps,
  BubbleProps,
} from "react-native-gifted-chat";
import { blue } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

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
      // renderTicks={() => <Text>Ticks</Text>}

      // containerStyle={{
      //   left: { borderColor: "teal", borderWidth: 8 },
      //   right: {},
      // }}
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
      // containerToNextStyle={{
      //   left: { borderColor: "navy", borderWidth: 4 },
      //   right: {},
      // }}
      // containerToPreviousStyle={{
      //   left: { borderColor: "mediumorchid", borderWidth: 4 },
      //   right: {},
      // }}
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

export const renderCustomView = () => (
  <View
    style={{ minHeight: 20, alignItems: "center", backgroundColor: "blue" }}
  >
    <Text>Current user:</Text>
    <Text>From CustomView</Text>
  </View>
);
