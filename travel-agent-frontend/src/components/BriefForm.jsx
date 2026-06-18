import { useState } from 'react'
import { Sparkle, MapPin, Calendar, Wallet, Users, ArrowRight } from './Icons'

const EXAMPLES = [
  'Plan a luxury honeymoon from Bangalore to Bali. Dates: 15 Dec 2026 - 22 Dec 2026. Budget: 250000 INR. Hotel Preference: 5 Star Beach Resort. Include private villa, spa, romantic dinner, island hopping and photography spots.',
  'Plan a family trip from Bangalore to Goa. Dates: 1 Oct 2026 - 4 Oct 2026. Budget: 50000 INR. Travellers: 5 Adults. Beach, water sports and seafood.',
  'Plan a 5-day Tokyo trip from Bangalore. Dates: 10 Jul 2026 - 15 Jul 2026. Budget: 150000 INR. Travellers: 2. 4 Star hotel, food tour and culture.',
]

// Optional structured helper -> builds a brief string for the user.
export default function BriefForm({ onSubmit, loading }) {
  const [mode, setMode] = useState('brief') // 'brief' | 'guided'
  const [brief, setBrief] = useState('')
  const [f, setF] = useState({
    origin: '',
    destination: '',
    start: '',
    end: '',
    budget: '',
    travellers: '2',
    hotel: '',
    notes: '',
  })

  const buildFromGuided = () => {
    const parts = []
    parts.push(
      `Plan a trip from ${f.origin || '—'} to ${f.destination || '—'}.`
    )
    if (f.start || f.end) parts.push(`Dates: ${f.start || '?'} - ${f.end || '?'}.`)
    if (f.budget) parts.push(`Budget: ${f.budget} INR.`)
    if (f.travellers) parts.push(`Travellers: ${f.travellers}.`)
    if (f.hotel) parts.push(`Hotel Preference: ${f.hotel}.`)
    if (f.notes) parts.push(f.notes)
    return parts.join(' ')
  }

  const submit = (e) => {
    e.preventDefault()
    const text = mode === 'brief' ? brief.trim() : buildFromGuided().trim()
    if (!text || loading) return
    onSubmit(text)
  }

  const canSubmit =
    mode === 'brief'
      ? brief.trim().length > 8
      : f.origin && f.destination

  return (
    <form
      onSubmit={submit}
      className="rounded-3xl border border-sand-200 bg-white/80 backdrop-blur-md p-5 sm:p-7 shadow-card"
    >
      {/* Mode toggle */}
      <div className="mb-5 inline-flex rounded-full bg-sand-100 p-1 text-sm">
        {[
          ['brief', 'Free text'],
          ['guided', 'Guided'],
        ].map(([k, label]) => (
          <button
            key={k}
            type="button"
            onClick={() => setMode(k)}
            className={`px-4 py-1.5 rounded-full font-medium transition ${
              mode === k
                ? 'bg-espresso-900 text-sand-50 shadow'
                : 'text-espresso-700 hover:text-espresso-900'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {mode === 'brief' ? (
        <>
          <label className="block text-sm font-medium text-espresso-700 mb-2">
            Describe your dream trip
          </label>
          <textarea
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            rows={4}
            placeholder="Plan a luxury honeymoon from Bangalore to Bali. Dates: 15 Dec 2026 - 22 Dec 2026. Budget: 250000 INR. 5 Star Beach Resort, spa, island hopping…"
            className="w-full resize-none rounded-2xl border border-sand-200 bg-sand-50/70 px-4 py-3 text-espresso-900 placeholder:text-espresso-700/40 focus:border-clay-500 focus:ring-2 focus:ring-clay-500/20 focus:outline-none transition"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="text-xs text-espresso-700/60 self-center">Try:</span>
            {['Bali honeymoon', 'Goa family', 'Tokyo'].map((label, i) => (
              <button
                key={label}
                type="button"
                onClick={() => setBrief(EXAMPLES[i])}
                className="text-xs px-3 py-1.5 rounded-full bg-sand-100 hover:bg-sand-200 text-espresso-700 transition"
              >
                {label}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field icon={<MapPin />} label="From">
            <input
              className={inp}
              value={f.origin}
              onChange={(e) => setF({ ...f, origin: e.target.value })}
              placeholder="Bangalore"
            />
          </Field>
          <Field icon={<MapPin />} label="To">
            <input
              className={inp}
              value={f.destination}
              onChange={(e) => setF({ ...f, destination: e.target.value })}
              placeholder="Bali"
            />
          </Field>
          <Field icon={<Calendar />} label="Start date">
            <input
              type="date"
              className={inp}
              value={f.start}
              onChange={(e) => setF({ ...f, start: e.target.value })}
            />
          </Field>
          <Field icon={<Calendar />} label="End date">
            <input
              type="date"
              className={inp}
              value={f.end}
              onChange={(e) => setF({ ...f, end: e.target.value })}
            />
          </Field>
          <Field icon={<Wallet />} label="Budget (INR)">
            <input
              type="number"
              className={inp}
              value={f.budget}
              onChange={(e) => setF({ ...f, budget: e.target.value })}
              placeholder="250000"
            />
          </Field>
          <Field icon={<Users />} label="Travellers">
            <input
              type="number"
              min="1"
              className={inp}
              value={f.travellers}
              onChange={(e) => setF({ ...f, travellers: e.target.value })}
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Hotel preference & notes">
              <input
                className={inp}
                value={f.hotel}
                onChange={(e) => setF({ ...f, hotel: e.target.value })}
                placeholder="5 Star Beach Resort, private villa, spa, romantic dinner…"
              />
            </Field>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={!canSubmit || loading}
        className="mt-6 group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-clay-500 px-7 py-3.5 font-semibold text-white shadow-soft transition hover:bg-clay-600 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            Planning your trip…
          </>
        ) : (
          <>
            <Sparkle width={18} height={18} />
            Generate Itinerary
            <ArrowRight
              width={18}
              height={18}
              className="transition group-hover:translate-x-0.5"
            />
          </>
        )}
      </button>
    </form>
  )
}

const inp =
  'w-full rounded-xl border border-sand-200 bg-sand-50/70 px-3.5 py-2.5 text-espresso-900 placeholder:text-espresso-700/40 focus:border-clay-500 focus:ring-2 focus:ring-clay-500/20 focus:outline-none transition'

function Field({ icon, label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-espresso-700">
        {icon && <span className="text-clay-500">{icon}</span>}
        {label}
      </span>
      {children}
    </label>
  )
}
