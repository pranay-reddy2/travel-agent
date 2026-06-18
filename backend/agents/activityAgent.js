import { model } from "../utils/gemini.js";

export const searchActivities = async (trip) => {
  try {
    const prompt = `
You are an expert travel activities planner.

Trip Details:
${JSON.stringify(trip, null, 2)}

Generate 5 travel activities.

Return ONLY a JSON array.

DO NOT explain.
DO NOT use markdown.
DO NOT add text before or after JSON.

Example:

[
  {
    "name":"Tokyo Tower",
    "duration":"2 Hours",
    "estimatedCost":1000,
    "reason":"Popular attraction"
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
      "Activities Raw Response:",
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
      "Activity Agent Error:",
      error.message
    );

    return [
      {
        name:
          "City Tour",
        duration:
          "3 Hours",
        estimatedCost:
          1000,
        reason:
          "Fallback Activity"
      },
      {
        name:
          "Local Market",
        duration:
          "2 Hours",
        estimatedCost:
          500,
        reason:
          "Fallback Activity"
      }
    ];
  }
};