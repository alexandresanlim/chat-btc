export const getPromptAsync = async (prompt: string) => {
  const url = `https://raw.githubusercontent.com/alexandresanlim/chat-btc/refs/heads/master/services/prompts/${prompt}.json`;

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
      url: json.url,
      parameterDefault: json?.parameters?.default,
      answer: {
        loading: json?.answer?.loading,
      },
      botId: json.botId,
    };
  } catch (error) {
    console.log("error", error);
    return {
      ok: false,
    };
  }
};
