export const getValueAsync = async (url: string, parameter: string) => {
  const isParameterRequired = url.includes("{");

  if (isParameterRequired && !parameter) {
    return {
      ok: false,
      error: "parameter is required",
    };
  }

  const urlWithParameter = url.replace("{0}", parameter?.toLocaleLowerCase());

  try {
    const response = await fetch(urlWithParameter);

    const json = await response.json();

    return {
      ok: response.ok,
      value: json,
    };
  } catch (error) {
    console.log("error", error);
    return {
      ok: false,
    };
  }
};
