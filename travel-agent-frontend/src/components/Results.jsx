import TripHeader from './TripHeader'
import SelectionCards from './SelectionCards'
import BudgetBar from './BudgetBar'
import Timeline from './Timeline'
import ErrorState from './ErrorState'
import { formatINR, tripLength } from '../lib/normalize'

function buildText(d) {
  const L = []
  L.push(`${d.trip.origin} → ${d.trip.destination}`)
  if (d.trip.startDate) L.push(`${d.trip.startDate} - ${d.trip.endDate}`)
  if (d.trip.travellers) L.push(`Travellers: ${d.trip.travellers}`)
  if (d.trip.budget) L.push(`Budget: ${formatINR(d.trip.budget)}`)
  L.push('')
  if (d.flight) L.push(`Flight: ${d.flight.carrier} ${d.flight.from}→${d.flight.to} ${formatINR(d.flight.cost)}`)
  if (d.hotel) L.push(`Stay: ${d.hotel.name}, ${d.hotel.location} ${formatINR(d.hotel.cost)}`)
  if (d.transport) L.push(`Transport: ${d.transport.type} ${formatINR(d.transport.cost)}`)
  L.push('')
  d.days.forEach((day) => {
    L.push(`--- Day ${day.day}: ${day.title} ---`)
    day.events.forEach((e) => L.push(`  ${e.time}  [${e.type}] ${e.title}`))
    L.push('')
  })
  return L.join('\n')
}

export default function Results({ data, onReset }) {
  if (data.failed) {
    return (
      <ErrorState
        message="The AI returned an empty plan — the model was likely overloaded (503) while generating. Please try again."
        onRetry={onReset}
      />
    )
  }

  const download = () => {
    const blob = new Blob([buildText(data)], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `itinerary-${data.trip.destination || 'trip'}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6 animate-fade-up">
      <TripHeader data={data} onReset={onReset} onDownload={download} />

      <SelectionCards data={data} />

      <BudgetBar budget={data.budget} />

      <div>
        <h3 className="mb-1 font-serif text-2xl text-espresso-900">
          Day-by-day plan
        </h3>
        <p className="mb-5 text-sm text-espresso-700/60">
          {tripLength(data.trip, data.days)} days · tap a day to explore
        </p>
        <Timeline days={data.days} />
      </div>
    </div>
  )
}
