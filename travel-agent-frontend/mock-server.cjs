// Local mock of POST /api/travel/plan — for previewing the UI without the real
// backend. NOT part of your app; delete it if you want. Run: node mock-server.cjs
const http = require('http')
const SAMPLE = {
  success: true,
  itinerary: {
    generatedAt: new Date().toISOString(),
    trip: { origin: 'Bangalore', destination: 'Bali', startDate: '15 December 2026', endDate: '22 December 2026', travellers: 2, budget: 250000, hotelPreference: '5 Star Beach Resort', requirements: ['Private villa', 'Spa', 'Romantic dinner', 'Island hopping', 'Airport transfer', 'Photography spots'] },
    selectedFlight: { carrier: 'Singapore Airlines (1 stop)', flightNumber: 'BLR-DPS', departure: 'Bangalore (BLR)', arrival: 'Denpasar (DPS)', departureTime: '08:00', arrivalTime: '20:00', cost: 90000, class: 'Economy', layover: '1 Stop · Singapore' },
    selectedHotel: { name: 'Luxury Private Villa Beach Resort', location: 'Nusa Dua, South Bali', stars: 5, costPerNight: 14285, totalCost: 100000, nights: 7, amenities: 'Private Pool Villa, Beach Access, World-class Spa, Multiple Dining, Airport Shuttle' },
    selectedRestaurant: { name: 'Jimbaran Beachfront Dining', cuisine: 'International, Indonesian', description: 'Romantic private beachfront dinner with sunset views.', costRange: 'Medium to High' },
    selectedTransport: { type: 'Private Car with Driver', description: 'Airport transfers and private transport for all tours.', cost: 3000 },
    budget: { totalBudget: 250000, flightCost: 90000, hotelCost: 100000, activitiesCost: 57000, transportCost: 3000, remaining: 0 },
    days: [
      { day: 1, title: 'Arrival in Paradise', events: [ { time: '10:00 - 18:00', type: 'Travel', title: 'Flight from Bangalore (BLR) to Denpasar (DPS)' }, { time: '18:00 - 19:00', type: 'Transfer', title: 'Private airport transfer to your villa' }, { time: '19:00 - 20:00', type: 'Accommodation', title: 'Check-in to your 5-Star Private Pool Villa' }, { time: '20:00 - 21:30', type: 'Dining', title: 'Relaxed dinner at the resort' } ] },
      { day: 2, title: 'Relaxation & Romantic Evening', events: [ { time: '09:00 - 12:00', type: 'Leisure', title: 'Leisure time at private villa / beach' }, { time: '14:00 - 17:00', type: 'Activity', title: "Couple's Balinese Spa Retreat" }, { time: '19:00 - 21:30', type: 'Dining', title: 'Private romantic beachfront dinner' } ] },
      { day: 3, title: "Ubud's Cultural Gems", events: [ { time: '09:00 - 17:00', type: 'Activity', title: 'Ubud cultural & photography tour: Tegallalang Rice Terraces, Tirta Empul Temple' }, { time: '19:30 - 21:00', type: 'Dining', title: 'Dinner at a specialty resort restaurant' } ] },
      { day: 4, title: 'Island Hopping', events: [ { time: '07:30 - 17:30', type: 'Activity', title: 'Nusa Penida & Lembongan tour: Kelingking Beach, Crystal Bay' }, { time: '19:30 - 21:00', type: 'Dining', title: 'Dinner at the resort' } ] },
      { day: 5, title: 'Departure', events: [ { time: '10:00 - 11:00', type: 'Accommodation', title: 'Check-out' }, { time: '11:00 - 12:00', type: 'Transfer', title: 'Private airport transfer' }, { time: '14:00 - 23:00', type: 'Travel', title: 'Flight DPS → BLR' } ] },
    ],
  },
}
http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') { res.writeHead(204); return res.end() }
  if (req.method === 'POST' && req.url === '/api/travel/plan') {
    setTimeout(() => { res.writeHead(200, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(SAMPLE)) }, 1800)
    return
  }
  res.writeHead(404); res.end('not found')
}).listen(5000, () => console.log('mock backend on :5000'))
