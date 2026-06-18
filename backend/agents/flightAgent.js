export const searchFlights = async (trip) => {
  const prompt = `
You are a flight planning agent.

Trip Details:
${JSON.stringify(trip, null, 2)}

Generate realistic flight options.

Return JSON only.
`;}