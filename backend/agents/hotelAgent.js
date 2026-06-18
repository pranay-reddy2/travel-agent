import { v4 as uuid } from "uuid";

export const searchHotels =
  async (trip) => {
    return [
      {
        id: uuid(),
        name: "Tokyo Inn",

        stars: 4,

        rating: 4.5,

        pricePerNight: 7000,

        checkIn: "14:00",

        bookingId:
          "HOTEL-" +
          Math.floor(
            Math.random() * 100000
          )
      },

      {
        id: uuid(),

        name:
          "Shibuya Grand Hotel",

        stars: 4,

        rating: 4.7,

        pricePerNight: 8500,

        checkIn: "15:00",

        bookingId:
          "HOTEL-" +
          Math.floor(
            Math.random() * 100000
          )
      }
    ];
  };