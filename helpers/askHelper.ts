export const getCommand = (text: string) => {
  const splitText = text.split(" ");

  return {
    firt: splitText?.[0],
    secondary: splitText?.[1],
    third: splitText?.[2],
  };
};

export const getCommandAndParameter = (text: string) => {
  const cmd = getCommand(text);

  return {
    command: cmd.firt.toLocaleLowerCase(),
    parameter: cmd.secondary,
  };
};
