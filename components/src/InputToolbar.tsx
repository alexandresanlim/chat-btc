import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ColorSchemeName, StatusBar } from "react-native";

import {
  InputToolbar,
  Composer,
  Send,
  InputToolbarProps,
  IMessage,
  ComposerProps,
  QuickRepliesProps,
} from "react-native-gifted-chat";
import { QuickReplies } from "react-native-gifted-chat/lib/QuickReplies";

export const renderInputToolbar = (
  props: InputToolbarProps<IMessage>,
  colorScheme: ColorSchemeName
) => {
  const colors = Colors[colorScheme ?? "light"];

  return (
    <InputToolbar
      {...props}
      containerStyle={{
        backgroundColor: colors.foreground,
        paddingBottom: 4,
        marginHorizontal: 8,
        marginLeft: 8,
        marginBottom: StatusBar.currentHeight,
        borderRadius: 32,
        borderColor: colors.background,
      }}
      primaryStyle={{ alignItems: "center" }}
    />
  );
};

export const renderAccessory = (
  props: InputToolbarProps<IMessage>,
  colorScheme: ColorSchemeName
) => {
  const colors = Colors[colorScheme ?? "light"];

  return (
    <InputToolbar
      {...props}
      containerStyle={{
        backgroundColor: "red",
        paddingBottom: 4,
        marginHorizontal: 8,
        marginLeft: 8,
        marginBottom: 8,
        height: 10,
        borderRadius: 32,
        borderColor: colors.background,
      }}
      primaryStyle={{ alignItems: "center" }}
    />
  );
};

export const renderComposer = (
  props: ComposerProps,
  colorScheme: ColorSchemeName
) => {
  const colors = Colors[colorScheme ?? "light"];

  return (
    <Composer
      {...props}
      textInputStyle={{
        color: colors.text,
        backgroundColor: colors.foreground,
        paddingHorizontal: 12,
        marginHorizontal: 8,
        marginTop: 8,
      }}
    />
  );
};

export const renderSend = (
  props: ComposerProps,
  colorScheme: ColorSchemeName
) => {
  const colors = Colors[colorScheme ?? "light"];

  return (
    <Send
      {...props}
      disabled={!props.text}
      containerStyle={{
        width: 44,
        height: 44,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 4,
        backgroundColor: colors.text,
        borderRadius: 32,
        marginRight: 16,
      }}
    >
      <Ionicons
        size={24}
        name="arrow-up"
        style={{ color: colors.background }}
      />
    </Send>
  );
};

export const renderQuickReplies = (
  props: QuickRepliesProps,
  colorScheme: ColorSchemeName
) => {
  const colors = Colors[colorScheme ?? "light"];

  return (
    <QuickReplies
      {...props}
      quickReplyContainerStyle={{
        justifyContent: "center",
        paddingTop: 8,
      }}
      color={colors.foreground}
      quickReplyStyle={{
        backgroundColor: colors.foreground,
        paddingHorizontal: 24,
        borderRadius: 32,
      }}
      quickReplyTextStyle={{ color: colors.text }}
    />
  );
};

export const renderScrollToBottom = (color: string) => {
  return <Ionicons name="arrow-down" size={16} color={color} />;
};
