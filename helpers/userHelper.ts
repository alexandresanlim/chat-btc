import { User } from "react-native-gifted-chat";

export const createUser = (
  id: string,
  name: string,
  avatar: string = ""
): User => {
  return {
    _id: id,
    name,
    avatar,
  };
};

export const getSatoshiUser = () =>
  createUser(
    "satoshi-nakamoto",
    "Satoshi Nakamoto",
    "https://livecoins.com.br/wp-content/uploads/2018/04/satoshi.jpg"
  );

  export const getChatBTCUser = () =>
    createUser(
      "chat-btc",
      "ChatBTC",
      "https://github.com/alexandresanlim/chat-btc/blob/master/assets/images/logo/black.png?raw=true"
    );


  