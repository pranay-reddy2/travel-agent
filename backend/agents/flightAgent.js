import { model } from "../utils/gemini.js";

export const searchFlights = async (trip) => {
  try {
    const prompt = `
You are a flight planning agent.

Trip Details:
${JSON.stringify(trip, null, 2)}

Generate 3 realistic flight options.

Return ONLY a JSON array.

DO NOT explain.
DO NOT use markdown.
DO NOT add text before or after JSON.

Example:

[
  {
    "airline":"Air India",
    "flightNumber":"AI-302",
    "departure":"BLR",
    "arrival":"NRT",
    "departureTime":"06:00",
    "arrivalTime":"18:00",
    "class":"Economy",
    "layover":"1 stop via Delhi",
    "price":45000,
    "reason":"Best value direct route"
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
      "Flights Raw Response:",
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
      "Flight Agent Error:",
      error.message
    );

    return [
      {
        airline:
          "Air India",
        flightNumber:
          "AI-302",
        departure:
          trip?.origin || "BLR",
        arrival:
          trip?.destination || "NRT",
        departureTime:
          "06:00",
        arrivalTime:
          "18:00",
        class:
          "Economy",
        layover:
          "1 stop",
        price:
          45000,
        reason:
          "Fallback Flight"
      }
    ];
  }
};