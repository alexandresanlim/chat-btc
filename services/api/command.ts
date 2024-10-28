export const getCommandAsync = async (command: string) => {
  const url = `https://raw.githubusercontent.com/alexandresanlim/chat-btc/refs/heads/master/services/commands/${command}.json`;

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
        loading: json.answer.loading,
        success: json.answer.success,
        error: json.answer.error,
      },
      userId: json.userId,
    };
  } catch {
    return {
      ok: false,
    };
  }
};
