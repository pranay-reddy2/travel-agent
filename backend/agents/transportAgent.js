export const searchTransport =
  async () => {
    return [
      {
        route:
          "Airport → Hotel",

        mode:
          "Narita Express",

        duration:
          "40 Minutes",

        price: 1200
      },

      {
        route:
          "Hotel → City Center",

        mode: "Metro",

        duration:
          "15 Minutes",

        price: 300
      }
    ];
  };