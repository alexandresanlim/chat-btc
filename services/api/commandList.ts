export interface ICommandData {
  title: string;
  value: string;
  autoComplete?: string[];
}

export interface ICommandListReturn {
  data: ICommandData[];
  ok: boolean;
}

export const getCommandListAsync = async (
  location: string = "us"
): Promise<ICommandListReturn> => {
  const url = `https://raw.githubusercontent.com/alexandresanlim/chat-btc/refs/heads/master/services/commands/commandList/list_${location}.json`;

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
  } catch {
    return {
      ok: false,
      data: [],
    };
  }
};
