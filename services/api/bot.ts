export const getBotAsync = async (botId: string) => {
  const url = `https://raw.githubusercontent.com/alexandresanlim/chat-btc/refs/heads/master/services/bots/${botId}.json`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return {
        ok: false,
      };
    }

    const json = await response.json();

    return {
      ok: true,
      id: json.id,
      name: json.name,
      avatar: json.avatar,
    };
  } catch {
    return {
      ok: false,
    };
  }
};
