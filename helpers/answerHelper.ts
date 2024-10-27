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

  export const getMessage = (text: string, user: User = getSatoshiUser()): IMessage => {
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

  export const getByApiResponse = (
    text: string,
    parameter: string,
    value: string
  ) => {
    return text.replace(/{parameter}/g, parameter).replace(/{value}/g, value);
  };