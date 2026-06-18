import { Plane, Bed, Fork, Car } from './Icons'
import { formatINR } from '../lib/normalize'

function Stars({ n }) {
  if (!n) return null
  return (
    <span className="text-clay-400" aria-label={`${n} stars`}>
      {'★'.repeat(Math.min(5, n))}
    </span>
  )
}

function Card({ icon, tag, title, cost, children }) {
  return (
    <div className="group flex flex-col rounded-2xl border border-sand-200 bg-white/80 p-5 shadow-card backdrop-blur-md transition hover:-translate-y-0.5 hover:shadow-soft">
      <div className="mb-3 flex items-center justify-between">
        <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-clay-600">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-clay-500/12 text-clay-600">
            {icon}
          </span>
          {tag}
        </span>
        {cost != null && (
          <span className="rounded-full bg-sand-100 px-3 py-1 text-sm font-semibold text-espresso-900">
            {formatINR(cost)}
          </span>
        )}
      </div>
      <h4 className="font-serif text-lg leading-snug text-espresso-900">{title}</h4>
      <div className="mt-2 space-y-1 text-sm text-espresso-700/80">{children}</div>
    </div>
  )
}

export default function SelectionCards({ data }) {
  const { flight, hotel, restaurant, transport } = data
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {flight && (
        <Card icon={<Plane width={16} height={16} />} tag="Flight" title={flight.carrier} cost={flight.cost}>
          <p className="font-medium text-espresso-800">
            {flight.from} → {flight.to}
          </p>
          <p className="flex flex-wrap gap-x-3 text-espresso-700/70">
            {flight.class && <span>{flight.class}</span>}
            {flight.layover && <span>· {flight.layover}</span>}
            {(flight.departureTime || flight.arrivalTime) && (
              <span>· {flight.departureTime} – {flight.arrivalTime}</span>
            )}
          </p>
        </Card>
      )}

      {hotel && (
        <Card icon={<Bed width={16} height={16} />} tag="Stay" title={hotel.name} cost={hotel.cost}>
          <p className="flex items-center gap-2 font-medium text-espresso-800">
            {hotel.location} <Stars n={hotel.stars} />
          </p>
          {hotel.roomType && <p className="text-espresso-700/70">{hotel.roomType}</p>}
          {hotel.nights != null && hotel.costPerNight != null && (
            <p className="text-espresso-700/70">
              {hotel.nights} nights · {formatINR(hotel.costPerNight)}/night
            </p>
          )}
          {hotel.amenities && (
            <p className="line-clamp-2 text-espresso-700/60">{hotel.amenities}</p>
          )}
        </Card>
      )}

      {restaurant && (
        <Card icon={<Fork width={16} height={16} />} tag="Dining" title={restaurant.name} cost={restaurant.cost}>
          {restaurant.cuisine && (
            <p className="font-medium text-espresso-800">{restaurant.cuisine}</p>
          )}
          {restaurant.description && (
            <p className="line-clamp-3 text-espresso-700/70">{restaurant.description}</p>
          )}
          {restaurant.costRange && (
            <p className="text-espresso-700/60">Price range: {restaurant.costRange}</p>
          )}
        </Card>
      )}

      {transport && (
        <Card icon={<Car width={16} height={16} />} tag="Transport" title={transport.type} cost={transport.cost}>
          {transport.description && (
            <p className="line-clamp-3 text-espresso-700/70">{transport.description}</p>
          )}
        </Card>
      )}
    </div>
  )
}
