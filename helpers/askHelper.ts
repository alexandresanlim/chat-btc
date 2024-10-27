export const getCommand = (text: string): string => {
  return text.split(" ")[0];
};

export const getParameter = (text: string): string => {
  if (text.includes("--")) {
    return text.split("--")[1];
  } else if (text.includes("-")) {
    return text.split("-")[1];
  }
  return "";
};

export const getCommandAndParameter = (text: string) => {
  return {
    command: getCommand(text).toLocaleLowerCase(),
    parameter: getParameter(text).toUpperCase(),
  };
};
