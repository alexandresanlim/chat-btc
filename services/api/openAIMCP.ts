import { OPENAI_API_KEY } from "@/constants/Keys";
import { OPENAI_API_URL } from "@/constants/Urls";

export const getHumanizedMCPResponse = async (currentText: string) => {
  console.log("currentText", currentText);

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4.1",
        tools: [
          {
            type: "mcp",
            server_label: "coingecko",
            server_description:
              "MCP Server for Crypto Price & Market Data. MCP (Model Context Protocol) is an open standard that allows Large Language Model (LLM) and other AI agents to securely and intelligently interact with external data sources and tools.",
            server_url: "https://mcp.api.coingecko.com/sse",
            require_approval: "never",
            allowed_tools: [
              "get_simple_price",
              "get_coins_markets",
              "get_id_coins",
              "get_search_trending",
              "get_list_nfts",
            ],
          },
        ],
        input: currentText,
        //temperature: 0,
      }),
    });
    const json = await response.json();

    const value = json?.output?.[2]?.content?.[0]?.text ?? "Content not found";

    return {
      ok: response.ok,
      value: value,
    };
  } catch (error) {
    console.log("error", error);
    return {
      ok: false,
    };
  }
};
