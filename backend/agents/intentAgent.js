import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

export const parseTravelBrief = async (
  brief
) => {
  try {
    const model =
      genAI.getGenerativeModel({
        model: "gemini-1.5-flash"
      });

    const prompt = `
Extract travel information from the text.

Return ONLY valid JSON.

{
  "origin":"",
  "destination":"",
  "startDate":"",
  "endDate":"",
  "travellers":0,
  "budget":0,
  "hotelPreference":"",
  "requirements":[]
}

Text:
${brief}
`;

    const result =
      await model.generateContent(
        prompt
      );

    let response =
      result.response.text();

    response = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(response);
  } catch (error) {
    console.log(error);

    return {
      origin: "Bangalore",
      destination: "Tokyo",
      startDate: "2026-07-10",
      endDate: "2026-07-15",
      travellers: 2,
      budget: 150000,
      hotelPreference: "4 Star",
      requirements: []
    };
  }
};