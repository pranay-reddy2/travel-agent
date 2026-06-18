import { model } from "../utils/gemini.js";

export const searchHotels = async (trip) => {
  try {
    const prompt = `
You are a hotel recommendation agent.

Trip Details:
${JSON.stringify(trip, null, 2)}

Find 5 hotel recommendations.

Consider:
- Destination
- Budget
- Hotel preference
- Requirements

Return ONLY a JSON array.

DO NOT explain.
DO NOT use markdown.
DO NOT add text before or after JSON.

Example:

[
  {
    "name":"Hotel Gracery Shinjuku",
    "location":"Shinjuku, Tokyo",
    "stars":4,
    "roomType":"Deluxe Double",
    "pricePerNight":6000,
    "amenities":"WiFi, Breakfast, Near Metro",
    "reason":"Great location and value"
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
      "Hotels Raw Response:",
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
      "Hotel Agent Error:",
      error.message
    );

    return [
      {
        name:
          "City Hotel",
        location:
          trip?.destination || "City Center",
        stars:
          4,
        roomType:
          "Standard Double",
        pricePerNight:
          5000,
        amenities:
          "WiFi, Breakfast",
        reason:
          "Fallback Hotel"
      }
    ];
  }
};