import {
  renderComposer,
  renderInputToolbar,
  renderQuickReplies,
  renderScrollToBottom,
  renderSend,
} from "@/components/src/InputToolbar";
import {
  renderAvatar,
  renderBubble,
  renderChatFooter,
  renderMessageText,
} from "@/components/src/MessageContainer";
import {
  getByApiResponse,
  getLoadingMessage,
  getMessage,
} from "@/helpers/answerHelper";
import { getPromptAndParameter } from "@/helpers/askHelper";

import {
  createUser,
  getChatBTCUser,
  getSatoshiUser,
} from "@/helpers/userHelper";

import { getValueAsync } from "@/services/api/value";
import React, { useState, useCallback, useEffect } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  useColorScheme,
  View,
} from "react-native";
import { GiftedChat, IMessage, User } from "react-native-gifted-chat";
import { Colors } from "@/constants/Colors";

import { getBotAsync } from "@/services/api/bot";
import { getPromptListAsync, IPromptData } from "@/services/api/promptList";
import { getPromptAsync } from "@/services/api/prompt";
import { getHumanizedResponse } from "@/services/api/openAI";

export default function Index() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [currentText, setCurrentText] = useState<string>("");
  const [promptList, setPromptList] = useState<IPromptData[]>([]);
  const [currentPrompt, setCurrentPrompt] = useState<string>("");
  const [currentAutoComplete, setCurrentAutoComplete] = useState<string[]>([]);

  const setPromptListAsync = async () => {
    answerLoading();

    const returnData = await getPromptListAsync();

    if (!returnData.ok) {
      return;
    }

    setPromptList(returnData.data);
  };

  const setQuickReplies = (isHighlight: boolean) => {
    const dataHighlight = promptList.slice(0, 4);

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
          type: "radio",
          keepIt: true,
          values: isHighlight ? dataHighlight : promptList,
        },
        user: getChatBTCUser(),
      },
    ]);
  };

  useEffect(() => {
    if (!(promptList?.length > 0)) {
      setPromptListAsync();
    }
  }, []);

  useEffect(() => {
    if (promptList.length > 0) {
      setQuickReplies(true);
    }
  }, [promptList]);

  useEffect(() => {
    const textToCompare = currentText.split(" ")[0]?.toLowerCase() ?? "";

    if (!textToCompare) {
      setCurrentAutoComplete([]);
      return;
    }

    const autoComplete = promptList.filter(
      (x) => x.title.toLowerCase() === textToCompare
    );

    if (autoComplete) {
      const value = autoComplete?.[0];

      setCurrentAutoComplete(value?.autoComplete ?? []);
      setCurrentPrompt(value?.value);
    }
  }, [currentText]);

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

  const answerPromptNotFound = (log: string) => {
    console.log("error", log);
    answerMessage("Prompt not found, send help or menu to see prompt list");
  };

  const getPrompt = async (prompt: string) => {
    const { ok, url, parameterDefault, answer, botId } = await getPromptAsync(
      prompt
    );

    if (!ok) {
      answerPromptNotFound(url);
    }

    return { ok, url, parameterDefault, answer, botId };
  };

  const getValue = async (url: string, parameter: string) => {
    const { ok, value } = await getValueAsync(url, parameter);

    if (!ok || !value) {
      answerPromptNotFound(url);
    }

    return { ok, value };
  };

  const getUser = async (botId: string) => {
    const { ok, id, name, avatar } = await getBotAsync(botId);

    if (!ok) {
      answerPromptNotFound("getUser");
    }

    return { ok, id, name, avatar };
  };

  const buildAnswer = async (message: string) => {
    const { prompt, parameter: parameterSent } = getPromptAndParameter(message);

    try {
      answerLoading();

      const { ok, url, parameterDefault, answer, botId } = await getPrompt(
        prompt
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

      if (botId) {
        const { ok: okUser, id, name, avatar } = await getUser(botId);

        if (okUser) {
          user = createUser(id, `By: ${name}`, avatar);
        }
      }

      const finalAnswer = await getHumanizedResponse(valueForResponse, message);

      answerMessage(finalAnswer?.value, user);
    } catch (error) {
      const errorMessage = (error as Error)?.message;
      answerPromptNotFound("exception " + errorMessage);
    }
  };

  const cleanAutoComplete = () => setCurrentAutoComplete([]);

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

  const checkIsQuickReply = (value: string): boolean => {
    if (
      value === "more" ||
      value === "clean" ||
      value === "menu" ||
      value === "help"
    ) {
      setQuickReplies(false);
      return true;
    }

    if (value === "less") {
      setQuickReplies(true);
      return true;
    }

    return false;
  };

  return (
    <GiftedChat
      isStatusBarTranslucentAndroid={false}
      messages={messages}
      onSend={(messages) => {
        const value = messages[0].text.toLowerCase();

        const isQuickReply = checkIsQuickReply(value);

        if (isQuickReply) {
          return;
        }

        onSend(messages);

        cleanAutoComplete();
      }}
      onQuickReply={(reply) => {
        const data = reply?.[0] as IPromptData;
        const value = data.value.toLowerCase();

        const isQuickReply = checkIsQuickReply(value);

        if (isQuickReply) {
          return;
        }

        setCurrentText(value);
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
      renderChatFooter={() =>
        renderChatFooter(currentPrompt, currentAutoComplete, setCurrentText)
      }
      scrollToBottomComponent={() => renderScrollToBottom(colors.text)}
      scrollToBottomStyle={{
        backgroundColor: colors.scrollBottom,
        alignSelf: "center",
        justifyContent: "center",
      }}
      renderBubble={(props) => renderBubble(props, colorScheme)}
      renderMessageText={(props) => renderMessageText(props, colorScheme)}
    />
  );
}
