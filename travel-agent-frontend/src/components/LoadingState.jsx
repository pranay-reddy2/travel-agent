import { useEffect, useState } from 'react'
import { Sparkle } from './Icons'

const STEPS = [
  'Reading your travel brief…',
  'Scouting flights…',
  'Hand-picking hotels & villas…',
  'Curating activities & experiences…',
  'Reserving dining & transport…',
  'Resolving schedule conflicts…',
  'Composing your day-by-day itinerary…',
]

export default function LoadingState() {
  const [step, setStep] = useState(0)
  useEffect(() => {
    const id = setInterval(
      () => setStep((s) => Math.min(s + 1, STEPS.length - 1)),
      1400
    )
    return () => clearInterval(id)
  }, [])

  return (
    <div className="animate-fade-up rounded-3xl border border-sand-200 bg-white/80 backdrop-blur-md p-7 shadow-card">
      <div className="flex items-center gap-3">
        <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-clay-500/15 text-clay-600">
          <Sparkle />
          <span className="absolute inset-0 animate-ping rounded-full bg-clay-500/20" />
        </span>
        <div>
          <p className="font-serif text-lg text-espresso-900">
            Crafting your journey
          </p>
          <p className="text-sm text-espresso-700/70 transition-all">
            {STEPS[step]}
          </p>
        </div>
      </div>

      <ul className="mt-6 space-y-2.5">
        {STEPS.map((s, i) => (
          <li key={s} className="flex items-center gap-3 text-sm">
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full border transition ${
                i < step
                  ? 'border-olive-500 bg-olive-500 text-white'
                  : i === step
                  ? 'border-clay-500 text-clay-600'
                  : 'border-sand-200 text-transparent'
              }`}
            >
              {i < step ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
              ) : i === step ? (
                <span className="h-2 w-2 animate-pulse rounded-full bg-clay-500" />
              ) : null}
            </span>
            <span className={i <= step ? 'text-espresso-800' : 'text-espresso-700/40'}>
              {s}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="skeleton h-24" />
        <div className="skeleton h-24" />
      </div>
    </div>
  )
}
