export const getValueAsync = async (url: string, parameter: string) => {
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
        value: json[parameter]
      };
    } catch {
      return {
        ok: false,
      };
    }
  };
  