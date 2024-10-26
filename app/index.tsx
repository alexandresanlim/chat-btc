import React, { useState, useCallback, useEffect } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { GiftedChat, IMessage, User } from "react-native-gifted-chat";

export default function Index() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const generateRandomId = () => {
    return Math.floor(Math.random() * 1000000).toString();
  };

  const getStartMessage = (): IMessage[] => {
    return [
      {
        _id: generateRandomId(),
        text: "O que gostaria para hoje?",
        createdAt: new Date(),
        quickReplies: {
          type: "radio",
          keepIt: true,
          values: [
            {
              title: "😋 Yes",
              value: "yes",
            },
            {
              title: "📷 Yes, let me show you with a picture!",
              value: "yes_picture",
            },
            {
              title: "😞 Nope. What?",
              value: "no",
            },
          ],
        },
        user: {
          _id: 3,
          name: "React Native",
        },
      },
    ];
  };

  const satoshiUser = {
    _id: "satoshi-nakamoto",
    name: "Satoshi Nakamoto",
    avatar: "https://livecoins.com.br/wp-content/uploads/2018/04/satoshi.jpg",
  };

  const mempoolUser = {
    _id: "mempool",
    name: "Mempool (mempool.space)",
    avatar:
      "https://mempool.space/resources/previews/mempool-space-preview.jpg",
  };

  const getBtCMessage = (text: string, user: User = satoshiUser): IMessage => {
    return {
      _id: generateRandomId(),
      text,
      createdAt: new Date(),
      user,
    };
  };

  const getLoadingMessage = (user: User = satoshiUser): IMessage => {
    return {
      _id: generateRandomId() + "loading",
      text: "Loading...",
      createdAt: new Date(),
      user,
    };
  };

  const answerMessage = (message: string, user: User = satoshiUser) => {
    setMessages((previousMessages) => {
      const filteredItems = previousMessages.filter(
        (item) => !String(item._id).includes("loading")
      );

      return GiftedChat.append(filteredItems, [getBtCMessage(message, user)]);
    });
  };

  useEffect(() => {
    const startMessages = getStartMessage();

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [...messages, ...startMessages])
    );
  }, []);

  const answerLoading = (user: User = satoshiUser) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [getLoadingMessage(user)])
    );
  };

  const fetchPrices = async (fiat: string) => {
    try {
      answerLoading(mempoolUser);

      setTimeout(async () => {
        const response = await fetch("https://mempool.space/api/v1/prices");
        if (!response.ok) {
          answerMessage("Network response was not ok", mempoolUser);
          return;
        }
        const data = await response.json();
        const fiatPath = fiat.toUpperCase();
        const price = data[fiatPath];

        if (!price) {
          answerMessage(`Not found answer to ${fiat} parameter`, mempoolUser);
          return;
        }

        answerMessage(
          `The actual Bitcoin price in ${fiatPath} is ${price} ${fiatPath}`,
          mempoolUser
        );
      }, 150);
    } catch (error) {
      answerMessage("Sorry, not found", mempoolUser);
    } finally {
      setLoading(false);
    }
  };

  const answerCommandNotFound = () => {
    answerMessage("Command not found");
  };

  const getParameter = (text: string): string => {
    if (text.includes("--")) {
      return text.split("--")[1];
    } else if (text.includes("-")) {
      return text.split("-")[1];
    }
    return "";
  };

  const proccessMeessage = async (message: string) => {
    const parameter = getParameter(message);

    if (message.toLowerCase().includes("price")) {
      const fiat = parameter ? parameter : "USD";
      await fetchPrices(fiat);
      return;
    }

    answerCommandNotFound();
  };

  const onSend = useCallback(async (messages: IMessage[] = []) => {
    const message = messages[0].text;

    console.log("mesage", message);

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );

    await proccessMeessage(message);
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
        renderUsernameOnMessage={false}
        showUserAvatar={true}
        renderAvatarOnTop={true}
        isStatusBarTranslucentAndroid={false}
      />
    </View>
  );
}
