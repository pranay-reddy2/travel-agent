import { MapPin, Calendar, Users, Wallet, Download, Refresh } from './Icons'
import { formatINR, tripLength } from '../lib/normalize'

export default function TripHeader({ data, onReset, onDownload }) {
  const { trip, days } = data
  const len = tripLength(trip, days)

  const meta = [
    { icon: <Calendar width={15} height={15} />, label: trip.startDate && trip.endDate ? `${trip.startDate} → ${trip.endDate}` : len ? `${len} days` : null },
    { icon: <Users width={15} height={15} />, label: trip.travellers ? `${trip.travellers} traveller${trip.travellers > 1 ? 's' : ''}` : null },
    { icon: <Wallet width={15} height={15} />, label: trip.budget ? formatINR(trip.budget) : null },
  ].filter((m) => m.label)

  return (
    <div className="relative overflow-hidden rounded-3xl shadow-soft">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/img/hero.jpg)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-espresso-900/90 via-espresso-900/55 to-espresso-900/30" />

      <div className="relative p-7 sm:p-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-sand-50 backdrop-blur">
              <MapPin width={13} height={13} /> Your curated itinerary
            </span>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-sand-50 sm:text-5xl">
              {trip.origin}{' '}
              <span className="text-clay-400">→</span>{' '}
              {trip.destination}
            </h2>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-sand-100">
              {meta.map((m, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <span className="text-clay-400">{m.icon}</span>
                  {m.label}
                </span>
              ))}
            </div>
            {trip.requirements?.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {trip.requirements.map((r) => (
                  <span key={r} className="rounded-full bg-white/12 px-3 py-1 text-xs text-sand-50 backdrop-blur">
                    {r}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={onDownload}
              className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2.5 text-sm font-medium text-sand-50 backdrop-blur transition hover:bg-white/25"
            >
              <Download width={16} height={16} /> Export
            </button>
            <button
              onClick={onReset}
              className="inline-flex items-center gap-2 rounded-full bg-clay-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-clay-600"
            >
              <Refresh width={16} height={16} /> New trip
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
