import { IMessage, User } from "react-native-gifted-chat";
import { generateRandomId } from "./idHelper";
import { getSatoshiUser } from "./userHelper";

export const getStartMessage = (): IMessage[] => {
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

export const getMessage = (
  text: string,
  user: User = getSatoshiUser()
): IMessage => {
  return {
    _id: generateRandomId(),
    text,
    createdAt: new Date(),
    user,
  };
};

export const getLoadingMessage = (user: User = getSatoshiUser()): IMessage => {
  return {
    _id: generateRandomId() + "loading",
    text: "Loading...",
    createdAt: new Date(),
    user,
  };
};

const getValuePath = (text: string, json: any) => {
  const regex = /\[(.*?)\]/g;
  let textWithValues = text;
  const results = [...textWithValues.matchAll(regex)];

  results.forEach((result) => {
    if (result[1]) {
      const key = result[1];
      const path = key.split(".");

      let valorAtual = json;

      for (const part of path) {
        valorAtual = valorAtual?.[part];
      }

      textWithValues = textWithValues.replace(
        `[${key}]`,
        valorAtual.toString()
      );
    }
  });

  return textWithValues;
};

export const getByApiResponse = (
  text: string,
  parameter: string,
  value: string
) => {
  const textWithValue = getValuePath(text, value);
  return textWithValue;
};
