import { model } from "../utils/gemini.js";

export const buildItinerary = async ({
  trip,
  flights,
  hotels,
  activities,
  restaurants,
  transport
}) => {
  try {

    const prompt = `
You are an expert travel itinerary planner.

Trip Details:
${JSON.stringify(trip, null, 2)}

Available Flights:
${JSON.stringify(flights, null, 2)}

Available Hotels:
${JSON.stringify(hotels, null, 2)}

Available Activities:
${JSON.stringify(activities, null, 2)}

Available Restaurants:
${JSON.stringify(restaurants, null, 2)}

Available Transport:
${JSON.stringify(transport, null, 2)}

Your tasks:

1. Choose the best flight.
2. Choose the best hotel.
3. Choose the best restaurant.
4. Choose the best transport.
5. Create a complete day-by-day itinerary.
6. Stay within budget.
7. Avoid scheduling conflicts.

Return ONLY valid JSON.

{
  "generatedAt": "",
  "trip": {},
  "selectedFlight": {},
  "selectedHotel": {},
  "selectedRestaurant": {},
  "selectedTransport": {},
  "budget": {
    "totalBudget": 0,
    "flightCost": 0,
    "hotelCost": 0,
    "remaining": 0
  },
  "days": [
    {
      "day": 1,
      "title": "",
      "events": [
        {
          "time": "",
          "type": "",
          "title": ""
        }
      ]
    }
  ]
}

DO NOT return markdown.
DO NOT return explanations.
ONLY return JSON.
`;

    const result =
      await model.generateContent(
        prompt
      );

    let text =
      result.response.text();

    console.log(
      "ITINERARY RAW RESPONSE:"
    );

    console.log(text);

    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const jsonStart =
      text.indexOf("{");

    const jsonEnd =
      text.lastIndexOf("}");

    if (
      jsonStart === -1 ||
      jsonEnd === -1
    ) {
      throw new Error(
        "No JSON object found"
      );
    }

    const jsonText =
      text.substring(
        jsonStart,
        jsonEnd + 1
      );

    const itinerary =
      JSON.parse(jsonText);

    return itinerary;

  } catch (error) {

    console.log(
      "Itinerary Agent Error:",
      error.message
    );

    return {
      generatedAt:
        new Date().toISOString(),

      trip,

      selectedFlight:
        flights?.[0] || {},

      selectedHotel:
        hotels?.[0] || {},

      selectedRestaurant:
        restaurants?.[0] || {},

      selectedTransport:
        transport?.[0] || {},

      budget: {
        totalBudget:
          trip?.budget || 0,

        flightCost:
          flights?.[0]?.price || 0,

        hotelCost:
          (hotels?.[0]?.pricePerNight || 0) * 5,

        remaining: 0
      },

      days: []
    };
  }
};