import { Colors } from "@/constants/Colors";
import React from "react";
import {
  View,
  Text,
  useColorScheme,
  ColorSchemeName,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import {
  Avatar,
  Bubble,
  MessageText,
  AvatarProps,
  IMessage,
  MessageTextProps,
  BubbleProps,
} from "react-native-gifted-chat";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
} from "react-native-reanimated";

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

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "#f9f9f9", // Fundo claro
    padding: 10, // Padding ao redor do texto
    borderRadius: 10, // Bordas arredondadas
    marginVertical: 5, // Espaço entre os itens
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});

export const renderChatFooter = (
  comamand: string = "cmd",
  autoCompleteList: string[],
  onPress: (text: string) => void
) => {
  if (!comamand || !autoCompleteList) {
    return null;
  }

  const data = autoCompleteList.map((item) => ({
    title: item,
    command: comamand,
  }));

  return (
    <GestureHandlerRootView style={{ height: "auto", marginBottom: 2 }}>
      <FlatList
        data={data}
        scrollEnabled={false}
        renderItem={({ item, index }) => (
          <Animated.View // Componente animado
            entering={FadeInUp.delay((data.length - 1 - index) * 50).duration(
              500
            )}
          >
            <TouchableOpacity
              onPress={() => onPress(`${item.command} ${item.title}`)}
              activeOpacity={0.3}
            >
              <View style={{ marginHorizontal: 24 }}>
                <ThemedView
                  style={{ flexDirection: "row", gap: 4, paddingVertical: 16 }}
                >
                  <ThemedText type="disable">{item.command}</ThemedText>
                  <ThemedText>{item.title}</ThemedText>
                </ThemedView>
                {index !== data.length - 1 && (
                  <ThemedView style={styles.divider} />
                )}
              </View>
            </TouchableOpacity>
          </Animated.View>
        )}
        // keyExtractor={(item) => item.command}
      />
    </GestureHandlerRootView>
  );
};
