// The backend response shape drifts between runs (Gemini output varies):
//  - cost vs estimatedCost
//  - selectedRestaurant may be null / {}
//  - itinerary may sit at root or under .itinerary
//  - empty days[] when the AI call fails
// This module flattens everything into one predictable view-model.

const num = (v) => {
  if (typeof v === 'number' && !Number.isNaN(v)) return v
  if (typeof v === 'string') {
    const n = Number(v.replace(/[^0-9.]/g, ''))
    return Number.isNaN(n) ? null : n
  }
  return null
}

const pick = (obj, keys) => {
  for (const k of keys) {
    if (obj && obj[k] !== undefined && obj[k] !== null && obj[k] !== '') return obj[k]
  }
  return undefined
}

const isEmpty = (o) =>
  o == null || (typeof o === 'object' && Object.keys(o).length === 0)

export function normalize(raw) {
  if (!raw || typeof raw !== 'object') return null

  // The itinerary block can be at the root, or nested.
  // Backend sends it as "finalItinerary" after conflict resolution.
  const it =
    raw.finalItinerary && typeof raw.finalItinerary === 'object'
      ? raw.finalItinerary
      : raw.itinerary && typeof raw.itinerary === 'object'
        ? raw.itinerary
        : raw
  const trip = it.trip || raw.tripDetails || raw.trip || {}

  const flightRaw = !isEmpty(it.selectedFlight) ? it.selectedFlight : raw.selectedFlight || {}
  const hotelRaw = !isEmpty(it.selectedHotel) ? it.selectedHotel : raw.selectedHotel || {}
  const restRaw = !isEmpty(it.selectedRestaurant)
    ? it.selectedRestaurant
    : raw.selectedRestaurant || {}
  const transRaw = !isEmpty(it.selectedTransport)
    ? it.selectedTransport
    : raw.selectedTransport || {}
  const budgetRaw = it.budget || raw.budget || {}
  const days = Array.isArray(it.days) ? it.days : []

  const trip_ = {
    origin: pick(trip, ['origin', 'from']) || '—',
    destination: pick(trip, ['destination', 'to']) || '—',
    startDate: pick(trip, ['startDate', 'start']) || '',
    endDate: pick(trip, ['endDate', 'end']) || '',
    travellers: num(pick(trip, ['travellers', 'travelers'])) ?? null,
    budget: num(pick(trip, ['budget', 'totalBudget'])),
    hotelPreference: pick(trip, ['hotelPreference', 'hotelPref']) || '',
    requirements: Array.isArray(trip.requirements) ? trip.requirements : [],
  }

  const flight = isEmpty(flightRaw)
    ? null
    : {
        carrier: pick(flightRaw, ['carrier', 'airline', 'name']) || 'Flight',
        flightNumber: pick(flightRaw, ['flightNumber']) || '',
        from: pick(flightRaw, ['departure', 'origin']) || trip_.origin,
        to: pick(flightRaw, ['arrival', 'destination']) || trip_.destination,
        departureTime: pick(flightRaw, ['departureTime']) || '',
        arrivalTime: pick(flightRaw, ['arrivalTime']) || '',
        cost: num(pick(flightRaw, ['cost', 'estimatedCost', 'price'])),
        class: pick(flightRaw, ['class']) || '',
        layover: pick(flightRaw, ['layover']) || '',
        reason: pick(flightRaw, ['reason']) || '',
      }

  const hotel = isEmpty(hotelRaw)
    ? null
    : {
        name: pick(hotelRaw, ['name']) || 'Hotel',
        location: pick(hotelRaw, ['location']) || '',
        stars: num(pick(hotelRaw, ['stars'])),
        roomType: pick(hotelRaw, ['roomType']) || '',
        nights: num(pick(hotelRaw, ['nights'])),
        costPerNight: num(pick(hotelRaw, ['costPerNight'])),
        cost: num(pick(hotelRaw, ['totalCost', 'estimatedCost', 'cost', 'price'])),
        amenities: pick(hotelRaw, ['amenities']) || '',
        reason: pick(hotelRaw, ['reason']) || '',
      }

  const restaurant = isEmpty(restRaw)
    ? null
    : {
        name: pick(restRaw, ['name']) || 'Dining',
        cuisine: pick(restRaw, ['cuisine']) || '',
        description: pick(restRaw, ['description']) || '',
        costRange: pick(restRaw, ['costRange']) || '',
        cost: num(pick(restRaw, ['cost', 'estimatedCost'])),
      }

  const transport = isEmpty(transRaw)
    ? null
    : {
        type: pick(transRaw, ['type', 'name']) || 'Transport',
        description: pick(transRaw, ['description', 'reason']) || '',
        cost: num(pick(transRaw, ['cost', 'estimatedCost'])),
      }

  const budget = {
    total: num(pick(budgetRaw, ['totalBudget', 'total'])) ?? trip_.budget,
    flight: num(pick(budgetRaw, ['flightCost', 'flight'])),
    hotel: num(pick(budgetRaw, ['hotelCost', 'hotel'])),
    activities: num(pick(budgetRaw, ['activitiesCost', 'activities'])),
    transport: num(pick(budgetRaw, ['transportCost', 'transport'])),
    remaining: num(pick(budgetRaw, ['remaining'])),
  }

  const days_ = days.map((d, i) => ({
    day: num(d.day) ?? i + 1,
    title: d.title || `Day ${i + 1}`,
    events: Array.isArray(d.events)
      ? d.events.map((e) => ({
          time: e.time || '',
          type: e.type || 'Activity',
          title: e.title || e.name || '',
        }))
      : [],
  }))

  const failed = days_.length === 0 && !flight && !hotel

  return {
    generatedAt: it.generatedAt || raw.generatedAt || null,
    trip: trip_,
    flight,
    hotel,
    restaurant,
    transport,
    budget,
    days: days_,
    failed,
  }
}

export const formatINR = (n) => {
  if (n == null) return '—'
  return '₹' + Number(n).toLocaleString('en-IN')
}

export const tripLength = (trip, days) => {
  if (days?.length) return days.length
  const a = new Date(trip.startDate)
  const b = new Date(trip.endDate)
  if (!isNaN(a) && !isNaN(b)) {
    return Math.max(1, Math.round((b - a) / 86400000) + 1)
  }
  return null
}
