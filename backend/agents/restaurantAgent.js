export const searchRestaurants = async (trip) => {
  const prompt = `
You are a restaurant recommendation agent.

Trip Details:
${JSON.stringify(trip, null, 2)}

Recommend restaurants based on:
- Destination
- Dietary requirements
- Budget

Return JSON only.
`;}