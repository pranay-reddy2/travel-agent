import { v4 as uuid } from "uuid";

export const searchFlights =
  async (trip) => {
    return [
      {
        id: uuid(),
        airline: "Air India",
        departure: "08:00",
        arrival: "16:00",
        price: 45000,
        bookingId:
          "AI-" +
          Math.floor(
            Math.random() * 100000
          )
      },

      {
        id: uuid(),
        airline:
          "Singapore Airlines",
        departure: "09:30",
        arrival: "17:15",
        price: 52000,
        bookingId:
          "SQ-" +
          Math.floor(
            Math.random() * 100000
          )
      },

      {
        id: uuid(),
        airline: "ANA",
        departure: "11:00",
        arrival: "18:00",
        price: 49000,
        bookingId:
          "ANA-" +
          Math.floor(
            Math.random() * 100000
          )
      }
    ];
  };