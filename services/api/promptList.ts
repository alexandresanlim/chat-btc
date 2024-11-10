export interface IPromptData {
  title: string;
  value: string;
  autoComplete?: string[];
}

export interface IPromptListReturn {
  data: IPromptData[];
  ok: boolean;
}

export const getPromptListAsync = async (
  location: string = "us"
): Promise<IPromptListReturn> => {
  const url = `https://raw.githubusercontent.com/alexandresanlim/chat-btc/refs/heads/master/services/prompts/list/${location}.json`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return {
        ok: false,
        data: [],
      };
    }

    const json = await response.json();

    return {
      ok: true,
      data: json,
    };
  } catch (error) {
    console.log("error", error);
    return {
      ok: false,
      data: [],
    };
  }
};
