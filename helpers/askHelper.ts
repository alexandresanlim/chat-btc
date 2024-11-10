export const getPrompt = (text: string) => {
  const splitText = text.split(" ");

  return {
    firt: splitText?.[0],
    secondary: splitText?.[1],
    third: splitText?.[2],
  };
};

const replaceSpecialCharacter = (text: string) => {
  return text.replace(/ç/gi, "c");
};

export const getPromptAndParameter = (text: string) => {
  const cmd = getPrompt(text);

  return {
    prompt: replaceSpecialCharacter(cmd.firt.toLocaleLowerCase()),
    parameter: cmd.secondary,
  };
};
