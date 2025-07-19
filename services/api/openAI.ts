import { OPENAI_API_KEY } from "@/constants/Keys";
import { OPENAI_API_URL } from "@/constants/Urls";

function buildPrompt(jsonData: string, currentText: string): string {
  return `
You will receive a JSON structure that contains information intended to be shown to an end user. Your task is to interpret this JSON and generate a clear, human-readable explanation in natural language that is easy to understand.

Guidelines:
- Present the information in a natural, logical, and friendly tone, as if you're explaining it to a non-technical person.
- Use simple, concise language.
- Avoid repeating key or field names from the JSON.
- If a field is missing or null, simply ignore it and do not mention it.
- Keep the output consistent for identical inputs to support caching.
- Do not invent or assume any data that is not explicitly present in the JSON.
- If the JSON contains lists, present them clearly using bullet points or numbered lists when appropriate.
- This data contains Bitcoin infos
- Be direct and to the point, focusing on the most relevant information.
- Convert symbols as currency symbols (e.g., "USD" to "$", "EUR" to "€", etc.) in the output.
- Convert numbers to their respective currency formats (e.g., "1000" to "$1,000", "1234.56" to "$1,234.56").
- Convert dates to a human-readable format (e.g., "2023-10-01" to "October 1, 2023").
- Convert times to a human-readable format (e.g., "14:30:00" to "2:30 PM").
- Convert timestamps to a human-readable format (e.g., "1752936903" to "7/19/2025, 11:55:03 AM").

Now, generate a human-readable explanation for the following JSON, this represents ${currentText} information:
\`\`\`json
${JSON.stringify(jsonData, null, 2)}
\`\`\`
`;
}

export const getHumanizedResponse = async (
  jsonData: string,
  currentText: string
) => {
  const prompt = buildPrompt(jsonData, currentText);

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4.1-nano",
        input: prompt,
        //temperature: 0,
      }),
    });
    const json = await response.json();
    const value = json?.output?.[0]?.content?.[0]?.text ?? "Content not found";

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
