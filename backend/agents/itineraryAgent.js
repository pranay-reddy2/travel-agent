export const buildItinerary = async ({
  trip,
  flights,
  hotels,
  activities,
  restaurants,
  transport
}) => {
  const selectedFlight = flights[0];
  const selectedHotel = hotels[0];
  const selectedRestaurant =
    restaurants[0];
  const selectedTransport =
    transport[0];

  return {
    generatedAt:
      new Date().toISOString(),

    trip,

    selectedFlight,

    selectedHotel,

    selectedRestaurant,

    selectedTransport,

    budget: {
      totalBudget:
        trip.budget || 150000,

      flightCost:
        selectedFlight.price,

      hotelCost:
        selectedHotel.pricePerNight *
        5
    },

    days: [
      {
        day: 1,
        title: "Arrival Day",

        events: [
          {
            time: "08:00",
            type: "Flight",
            title:
              "Departure"
          },

          {
            time:
              selectedFlight.arrival,

            type: "Flight",

            title:
              "Arrive at Destination"
          },

          {
            time: "14:00",

            type: "Hotel",

            title:
              "Hotel Check-in"
          },

          {
            time: "19:00",

            type:
              "Restaurant",

            title:
              selectedRestaurant.name
          }
        ]
      },

      {
        day: 2,

        title:
          "City Exploration",

        events: [
          {
            time: "09:00",

            type:
              "Activity",

            title:
              activities[0]?.name
          },

          {
            time: "13:00",

            type:
              "Activity",

            title:
              activities[1]?.name
          }
        ]
      },

      {
        day: 3,

        title:
          "Attractions",

        events: [
          {
            time: "10:00",

            type:
              "Activity",

            title:
              activities[2]?.name
          },

          {
            time: "15:00",

            type:
              "Activity",

            title:
              activities[3]?.name
          }
        ]
      }
    ]
  };
};