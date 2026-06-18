export const searchHotels = async (trip) => {
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

Return JSON only.
`;}