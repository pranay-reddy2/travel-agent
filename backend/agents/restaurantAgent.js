import { model } from "../utils/gemini.js";

export const searchRestaurants = async (trip) => {
  try {
    const prompt = `
You are a restaurant recommendation agent.

Trip Details:
${JSON.stringify(trip, null, 2)}

Recommend 5 restaurants based on:
- Destination
- Dietary requirements
- Budget

Return ONLY a JSON array.

DO NOT explain.
DO NOT use markdown.
DO NOT add text before or after JSON.

Example:

[
  {
    "name":"Ichiran Ramen",
    "cuisine":"Japanese Ramen",
    "description":"Famous tonkotsu ramen chain",
    "costRange":"800-1500 INR per meal",
    "estimatedCost":1200,
    "reason":"Must-try local food"
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
      "Restaurants Raw Response:",
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
      "Restaurant Agent Error:",
      error.message
    );

    return [
      {
        name:
          "Local Restaurant",
        cuisine:
          "Local Cuisine",
        description:
          "Popular local dining spot",
        costRange:
          "500-1500 INR",
        estimatedCost:
          1000,
        reason:
          "Fallback Restaurant"
      }
    ];
  }
};