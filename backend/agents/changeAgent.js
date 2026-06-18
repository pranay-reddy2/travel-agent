export const processChangeRequest =
  async (
    itinerary,
    request
  ) => {
    const updated =
      structuredClone(
        itinerary
      );

    const lower =
      request?.toLowerCase() ||
      "";

    /*
      Flight cancellation
    */

    if (
      lower.includes(
        "cancel"
      ) ||
      lower.includes(
        "cancelled"
      )
    ) {
      updated.selectedFlight =
        {
          airline:
            "Replacement ANA Flight",

          departure:
            "12:00",

          arrival:
            "20:00",

          price: 50000
        };

      return {
        type:
          "Flight Cancellation",

        affectedItems: [
          "Flight",
          "Hotel Check-In",
          "Day 1 Activities"
        ],

        updatedItinerary:
          updated
      };
    }

    /*
      Flight delay
    */

    if (
      lower.includes(
        "delay"
      )
    ) {
      updated.selectedFlight.arrival =
        "21:00";

      return {
        type:
          "Flight Delay",

        affectedItems: [
          "Hotel Check-In",
          "Dinner Reservation"
        ],

        updatedItinerary:
          updated
      };
    }

    /*
      Date change
    */

    if (
      lower.includes(
        "date"
      ) ||
      lower.includes(
        "next week"
      )
    ) {
      updated.trip.startDate =
        "2026-07-17";

      updated.trip.endDate =
        "2026-07-22";

      return {
        type:
          "Date Change",

        affectedItems: [
          "Flights",
          "Hotels",
          "Activities"
        ],

        updatedItinerary:
          updated
      };
    }

    /*
      Cheaper hotel
    */

    if (
      lower.includes(
        "cheaper hotel"
      )
    ) {
      updated.selectedHotel =
        {
          name:
            "Budget Tokyo Stay",

          stars: 3,

          rating: 4.2,

          pricePerNight:
            4500
        };

      return {
        type:
          "Hotel Change",

        affectedItems: [
          "Accommodation"
        ],

        updatedItinerary:
          updated
      };
    }

    return {
      type:
        "General Update",

      affectedItems: [],

      updatedItinerary:
        updated
    };
  };