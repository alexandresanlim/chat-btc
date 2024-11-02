import { IMessage, User } from "react-native-gifted-chat";
import { generateRandomId } from "./idHelper";
import { getSatoshiUser } from "./userHelper";
import { getLocales, getCalendars } from "expo-localization";

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

const getPercentStyle = (value: string, languageTag: string) => {
  return ((parseFloat(value) || 0) / 100).toLocaleString(languageTag, {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const getCurrencyStyle = (value: string, languageTag: string) => {
  return (parseFloat(value) || 0).toLocaleString(languageTag, {
    style: "currency",
    currency: "USD",
  });
};

const getDecimalStyle = (value: string, languageTag: string) => {
  return (parseFloat(value) || 0).toLocaleString(languageTag, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const getDateStyle = (value: string, languageTag: string) => {
  return new Date(Number(value)).toLocaleDateString(languageTag, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

const getTimeStyle = (value: string, languageTag: string) => {
  return new Date(Number(value)).toLocaleTimeString(languageTag, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

const getStyle = (style: string, value: string, languageTag: string) => {
  if (!style) {
    return value;
  }

  const styleFunctions: Record<
    string,
    (value: string, languageTag: string) => string
  > = {
    percent: getPercentStyle,
    currency: getCurrencyStyle,
    decimal: getDecimalStyle,
    date: getDateStyle,
    time: getTimeStyle,
  };

  return styleFunctions[style]?.(value, languageTag) ?? value;
};

const getValueFromPath = (json: any, path: string[]) => {
  return path.reduce((value, key) => value?.[key], json);
};

const getValuePath = (text: string, json: any) => {
  const regex = /\[(.*?)\]/g;
  const location = getLocales()?.[0];
  const languageTag = location?.languageTag ?? "en-US";

  return text.replace(regex, (match, key) => {
    const [pathStr, style] = key.split(":");
    const path = pathStr.split(".");
    const actualValue = getValueFromPath(json, path);

    if (!actualValue) {
      return match;
    }

    return getStyle(style, actualValue.toString(), languageTag);
  });
};

export const getByApiResponse = (
  text: string,
  parameter: string,
  value: string
) => {
  const textWithValue = getValuePath(text, value);
  return textWithValue;
};
