import {
  data,
  renderAccessory,
  renderActions,
  renderChatEmpty,
  renderComposer,
  renderInputToolbar,
  renderQuickReplies,
  renderScrollToBottom,
  renderSend,
} from "@/components/src/InputToolbar";
import {
  renderAvatar,
  renderBubble,
  renderCustomView,
  renderFooter,
  renderMessageText,
} from "@/components/src/MessageContainer";
import {
  getByApiResponse,
  getLoadingMessage,
  getMessage,
} from "@/helpers/answerHelper";
import { getCommandAndParameter } from "@/helpers/askHelper";

import {
  createUser,
  getChatBTCUser,
  getSatoshiUser,
} from "@/helpers/userHelper";
import { getCommandAsync } from "@/services/api/command";
import { getUserAsync } from "@/services/api/user";
import { getValueAsync } from "@/services/api/value";
import React, { useState, useCallback, useEffect } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  useColorScheme,
  View,
} from "react-native";
import {
  GiftedChat,
  IMessage,
  InputToolbar,
  User,
} from "react-native-gifted-chat";
import { Colors } from "@/constants/Colors";
import { blue } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
import { ScrollView } from "react-native-gesture-handler";

export default function Index() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [currentText, setCurrentText] = useState<string>("");

  const setQuickReplies = (isHighlight: boolean) => {
    const dataHighlight = data.slice(0, 3);
    dataHighlight.push({
      title: "More",
      value: "more",
    });

    setMessages([
      {
        _id: 1,
        text: "What can I help with?",
        createdAt: new Date(),
        quickReplies: {
          type: "radio", // or 'checkbox',
          keepIt: true,
          values: isHighlight ? dataHighlight : data,
        },
        user: getChatBTCUser(),
      },
    ]);
  };

  useEffect(() => {
    setQuickReplies(true);
  }, []);

  const answerMessage = (message: string, user: User = getChatBTCUser()) => {
    setMessages((previousMessages) => {
      const filteredItems = previousMessages.filter(
        (item) => !String(item._id).includes("loading")
      );

      return GiftedChat.append(filteredItems, [getMessage(message, user)]);
    });
  };

  const answerLoading = (user: User = getChatBTCUser()) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [getLoadingMessage(user)])
    );
  };

  const answerCommandNotFound = (log: string) => {
    console.log("error", log);
    answerMessage("Command not found");
  };

  const getCommand = async (command: string) => {
    const { ok, url, parameterDefault, answer, userId } = await getCommandAsync(
      command
    );

    if (!ok) {
      answerCommandNotFound(url);
    }

    return { ok, url, parameterDefault, answer, userId };
  };

  const getValue = async (url: string, parameter: string) => {
    const { ok, value } = await getValueAsync(url, parameter);

    if (!ok || !value) {
      answerCommandNotFound(url);
    }

    return { ok, value };
  };

  const getUser = async (userId: string) => {
    const { ok, id, name, avatar } = await getUserAsync(userId);

    if (!ok) {
      answerCommandNotFound("getUser");
    }

    return { ok, id, name, avatar };
  };

  const buildAnswer = async (message: string) => {
    const { command, parameter: parameterSent } =
      getCommandAndParameter(message);

    try {
      answerLoading();

      const { ok, url, parameterDefault, answer, userId } = await getCommand(
        command
      );

      if (!ok) {
        return;
      }

      const parameter = parameterSent || parameterDefault;

      let valueForResponse;

      if (url) {
        const { ok: okValue, value } = await getValue(url, parameter);

        valueForResponse = value;

        if (!okValue) {
          return;
        }
      }

      let user = getSatoshiUser();

      if (userId) {
        const { ok: okUser, id, name, avatar } = await getUser(userId);

        if (okUser) {
          user = createUser(id, `By: ${name}`, avatar);
        }
      }

      const finalAnswer = getByApiResponse(
        answer?.success,
        parameter,
        valueForResponse
      );

      answerMessage(finalAnswer, user);
    } catch (error) {
      const errorMessage = (error as Error)?.message;
      answerCommandNotFound("exception " + errorMessage);
    }
  };

  const onSend = useCallback(async (messages: IMessage[] = []) => {
    const message = messages[0].text;

    setCurrentText("");

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );

    await buildAnswer(message);
  }, []);

  const colorScheme = useColorScheme();

  const colors = Colors[colorScheme ?? "light"];

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      onQuickReply={(reply) => {
        const value = reply[0].value;

        if (value === "more") {
          setQuickReplies(false);
          return;
        }

        setCurrentText(value);
        console.log("reply", reply);
      }}
      //messageIdGenerator={generateRandomId}
      user={{
        _id: "me",
      }}
      renderUsernameOnMessage={true}
      showUserAvatar={true}
      renderAvatarOnTop={true}
      renderSend={(props) => renderSend(props, colorScheme)}
      renderComposer={(props) => renderComposer(props, colorScheme)}
      renderInputToolbar={(props) => renderInputToolbar(props, colorScheme)}
      renderAvatar={(props) => renderAvatar(props, colorScheme)}
      keyboardShouldPersistTaps="always"
      placeholder="Message"
      onInputTextChanged={setCurrentText}
      text={currentText}
      scrollToBottom={true}
      renderQuickReplies={(props) => renderQuickReplies(props, colorScheme)}
      // renderActions={renderActions}
      // renderAccessory={(props) => renderAccessory(props, colorScheme)}
      // maxComposerHeight={300}
      // renderFooter={renderFooter}
      scrollToBottomComponent={() => renderScrollToBottom(colors.text)}
      scrollToBottomStyle={{
        backgroundColor: colors.scrollBottom,
        alignSelf: "center",
        justifyContent: "center",
      }}
      // renderCustomView={renderCustomView}
      // isCustomViewBottom
      renderBubble={(props) => renderBubble(props, colorScheme)}
      renderMessageText={(props) => renderMessageText(props, colorScheme)}
    />
  );
}
