import { model } from "../utils/gemini.js";

export const searchTransport = async (trip) => {
  try {
    const prompt = `
You are a local transportation expert.

Trip Details:
${JSON.stringify(trip, null, 2)}

Recommend:
- Airport transfer
- Public transport
- Tourist passes

Return ONLY a JSON array.

DO NOT explain.
DO NOT use markdown.
DO NOT add text before or after JSON.

Example:

[
  {
    "type":"Airport Limousine Bus",
    "description":"Direct bus from airport to city center",
    "estimatedCost":2000,
    "reason":"Affordable and convenient"
  }
]
`;

    const result =
      await model.generateContent(
        prompt
      );

    let text =
      result.response.text();

    console.log(
      "Transport Raw Response:",
      text
    );

    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const jsonStart =
      text.indexOf("[");

    const jsonEnd =
      text.lastIndexOf("]");

    if (
      jsonStart === -1 ||
      jsonEnd === -1
    ) {
      throw new Error(
        "No JSON array found"
      );
    }

    const jsonText =
      text.substring(
        jsonStart,
        jsonEnd + 1
      );

    return JSON.parse(
      jsonText
    );

  } catch (error) {

    console.log(
      "Transport Agent Error:",
      error.message
    );

    return [
      {
        type:
          "Metro Pass",
        description:
          "City metro day pass",
        estimatedCost:
          1500,
        reason:
          "Fallback Transport"
      }
    ];
  }
};