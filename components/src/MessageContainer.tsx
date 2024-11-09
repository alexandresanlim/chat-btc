import { Colors } from "@/constants/Colors";
import React from "react";
import { View, Text, useColorScheme, ColorSchemeName, StyleSheet } from "react-native";
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
    backgroundColor: '#f9f9f9', // Fundo claro
    padding: 10, // Padding ao redor do texto
    borderRadius: 10, // Bordas arredondadas
    marginVertical: 5, // Espaço entre os itens
  },
  itemText: {
    fontSize: 16,
    color: '#333', // Cor do texto
  },
  divider: {
    marginTop: 5, // Espaço após o texto
    borderBottomWidth: 1,
    borderBottomColor: '#ddd', // Cor do divisor
  },
});

export const renderChatFooter = () => {
  const data = [
    { id: '1', title: 'Primeira linha de texto' },
    { id: '2', title: 'Segunda linha de texto' },
    { id: '3', title: 'Terceira linha de texto' },
  ];

  return (
    <GestureHandlerRootView style={{ height: 'auto'}}>
       <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={{marginHorizontal: 24  }}>
            <Text style={[styles.itemText, { paddingVertical: 12, color:'white'}]}>{item.title}</Text>
            <View style={styles.divider} />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </GestureHandlerRootView>
  );
}
