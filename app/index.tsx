import {
  getByApiResponse,
  getLoadingMessage,
  getMessage,
} from "@/helpers/answerHelper";
import { getCommandAndParameter } from "@/helpers/askHelper";

import { createUser, getSatoshiUser } from "@/helpers/userHelper";
import { getCommandAsync } from "@/services/api/command";
import { getUserAsync } from "@/services/api/user";
import { getValueAsync } from "@/services/api/value";
import React, { useState, useCallback, useEffect } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { GiftedChat, IMessage, User } from "react-native-gifted-chat";

export default function Index() {
  const [messages, setMessages] = useState<IMessage[]>([]);

  const answerMessage = (message: string, user: User = getSatoshiUser()) => {
    setMessages((previousMessages) => {
      const filteredItems = previousMessages.filter(
        (item) => !String(item._id).includes("loading")
      );

      return GiftedChat.append(filteredItems, [getMessage(message, user)]);
    });
  };

  const answerLoading = (user: User = getSatoshiUser()) => {
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

    if (!ok || !url) {
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

      const { ok: okValue, value } = await getValue(url, parameter);

      if (!okValue) {
        return;
      }

      let user = getSatoshiUser();

      if (userId) {
        const { ok: okUser, id, name, avatar } = await getUser(userId);

        if (okUser) {
          user = createUser(id, `By: ${name}`, avatar);
        }
      }

      const finalAnswer = getByApiResponse(answer?.success, parameter, value);

      answerMessage(finalAnswer, user);
    } catch (error) {
      const errorMessage = (error as Error)?.message;
      answerCommandNotFound("exception " + errorMessage);
    }
  };

  const onSend = useCallback(async (messages: IMessage[] = []) => {
    const message = messages[0].text;

    console.log("mesage", message);

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );

    await buildAnswer(message);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        //messageIdGenerator={generateRandomId}
        user={{
          _id: "me",
        }}
        renderUsernameOnMessage={true}
        showUserAvatar={true}
        renderAvatarOnTop={true}
      />
    </View>
  );
}
