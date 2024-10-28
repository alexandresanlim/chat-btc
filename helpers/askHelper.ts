export const getCommand = (text: string) => {
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

export const getCommandAndParameter = (text: string) => {
  const cmd = getCommand(text);

  return {
    command: replaceSpecialCharacter(cmd.firt.toLocaleLowerCase()),
    parameter: cmd.secondary,
  };
};
