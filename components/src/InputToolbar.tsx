import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ColorSchemeName,
  Image,
  InputAccessoryView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import {
  InputToolbar,
  Actions,
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
        marginBottom: 8,
        // height: 120,
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

export const renderActions = (props) => (
  <Actions
    {...props}
    containerStyle={{
      width: 44,
      height: 44,
      alignItems: "center",
      justifyContent: "center",
      marginLeft: 4,
      marginRight: 4,
      marginBottom: 0,
      backgroundColor: "blue",
    }}
    icon={() => (
      <Image
        style={{ width: 32, height: 32 }}
        source={{
          uri: "https://placeimg.com/32/32/any",
        }}
      />
    )}
    options={{
      "Choose From Library": () => {
        console.log("Choose From Library");
      },
      Cancel: () => {
        console.log("Cancel");
      },
    }}
    optionTintColor="#222B45"
  />
);

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
        // borderWidth: 1,
        // borderRadius: 5,
        // borderColor: "#E4E9F2",

        paddingHorizontal: 12,
        marginHorizontal: 8,
        marginTop: 8,
      }}
    />
  );
};

// export const renderAccessory = (
//   props: ComposerProps,
//   colorScheme: ColorSchemeName
// ) => {

//   const colors = Colors[colorScheme ?? "light"];

//   return (
//     <InputAccessoryView
//       {...props}
//       textInputStyle={{
//         color: colors.text,
//         backgroundColor: colors.foreground,
//         // borderWidth: 1,
//         // borderRadius: 5,
//         // borderColor: "#E4E9F2",

//         paddingHorizontal: 12,
//         marginHorizontal: 8,
//         marginTop: 8,
//       }}
//     />
//   );
// };

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

export const data = [
  {
    id: "1",
    title: "Create image",
    icon: "image",
    color: "#4CAF50",
    value: "a",
  },
  {
    id: "2",
    title: "Summarize text",
    icon: "file-document",
    color: "#FF5722",
    value: "b",
  },
  {
    id: "3",
    title: "Make a plan",
    icon: "lightbulb-outline",
    color: "#FFC107",
    value: "c",
  },
  {
    id: "4",
    title: "Help me write",
    icon: "pencil",
    color: "#9C27B0",
    value: "c",
  },
  {
    id: "5",
    title: "Analyze images",
    icon: "eye",
    color: "#3F51B5",
    value: "c",
  },
  { id: "6", title: "Surprise me", icon: "gift", color: "#00BCD4", value: "c" },
  { id: "7", title: "Brainstorm", icon: "brain", color: "#FFC107", value: "c" },
  { id: "8", title: "Code", icon: "code-tags", color: "#3F51B5", value: "c" },
  {
    id: "9",
    title: "Get advice",
    icon: "account-question",
    color: "#607D8B",
    value: "c",
  },
  {
    id: "10",
    title: "Analyze data",
    icon: "chart-bar",
    color: "#009688",
    value: "c",
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    color: "#FFF",
    marginBottom: 20,
  },
  list: {
    alignItems: "center",
  },
  item: {
    backgroundColor: "#333",
    borderRadius: 10,
    width: 150,
    height: 100,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  itemText: {
    color: "#FFF",
    marginTop: 10,
    fontSize: 14,
    textAlign: "center",
  },
});

const renderItem = ({ item }) => (
  <TouchableOpacity style={styles.item}>
    <Ionicons name={item.icon} size={30} color={item.color} />
    <Text style={styles.itemText}>{item.title}</Text>
  </TouchableOpacity>
);

export const renderScrollToBottom = (color: string) => {
  return (
    <Ionicons name='arrow-down' size={16} color={color} />
  );
};

export const renderChatEmpty = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>What can I help with?</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};
