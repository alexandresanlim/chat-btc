import { Colors } from "@/constants/Colors";
import { Spacing, BorderRadius, Sizes } from "@/constants/Spacing";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ColorSchemeName, Image, StatusBar } from "react-native";

import {
  InputToolbar,
  Composer,
  Send,
  InputToolbarProps,
  IMessage,
  ComposerProps,
  QuickRepliesProps,
  Actions,
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
        paddingVertical: Spacing.md,
        marginHorizontal: Spacing.md,
        marginBottom: StatusBar.currentHeight ?? Spacing.xxxxl,
        borderRadius: BorderRadius.round,
        borderColor: colors.background,
      }}
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
      textInputAutoFocus={true}
      textInputStyle={{
        color: colors.text,
        backgroundColor: colors.foreground,
        paddingHorizontal: Spacing.lg,
        marginHorizontal: Spacing.md,
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
        width: Sizes.icon.xxlarge,
        height: Sizes.icon.xxlarge,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: Spacing.sm,
        backgroundColor: colors.text,
        borderRadius: BorderRadius.round,
        marginRight: Spacing.md,
      }}
    >
      <Ionicons
        size={Sizes.icon.medium}
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
        paddingTop: Spacing.md,
      }}
      color={colors.foreground}
      quickReplyStyle={{
        backgroundColor: colors.foreground,
        paddingHorizontal: Spacing.xxl,
        borderRadius: BorderRadius.round,
      }}
      quickReplyTextStyle={{ color: colors.text, fontWeight: '600' }}
    />
  );
};

export const renderScrollToBottom = (color: string) => {
  return <Ionicons name="arrow-down" size={Sizes.icon.small} color={color} />;
};
