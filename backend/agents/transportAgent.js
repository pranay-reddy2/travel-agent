export const searchTransport = async (trip) => {
  const prompt = `
You are a local transportation expert.

Trip Details:
${JSON.stringify(trip, null, 2)}

Recommend:
- Airport transfer
- Public transport
- Tourist passes

Return JSON only.
`;  }