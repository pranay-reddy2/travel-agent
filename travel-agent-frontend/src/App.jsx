import { useState, useRef, useEffect } from 'react'
import BriefForm from './components/BriefForm'
import LoadingState from './components/LoadingState'
import ErrorState from './components/ErrorState'
import Results from './components/Results'
import { Plane, Sparkle, MapPin } from './components/Icons'
import { planTrip } from './lib/api'
import { normalize } from './lib/normalize'

export default function App() {
  const [status, setStatus] = useState('idle') // idle | loading | done | error
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [lastBrief, setLastBrief] = useState('')
  const resultRef = useRef(null)

  const run = async (brief) => {
    setLastBrief(brief)
    setStatus('loading')
    setError(null)
    setData(null)
    try {
      const raw = await planTrip(brief)
      const norm = normalize(raw)
      if (!norm) throw new Error('Could not read the response from the server.')
      setData(norm)
      setStatus('done')
    } catch (e) {
      setError(e.message)
      setStatus('error')
    }
  }

  useEffect(() => {
    if (status === 'done' || status === 'error') {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [status])

  const reset = () => {
    setStatus('idle')
    setData(null)
    setError(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <header className="sticky top-0 z-20 border-b border-sand-200/70 bg-sand-50/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
          <a href="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-espresso-900 text-clay-400">
              <Plane width={18} height={18} />
            </span>
            <span className="font-serif text-xl font-semibold tracking-tight text-espresso-900">
              Wayfare
            </span>
          </a>
          <span className="hidden items-center gap-1.5 rounded-full bg-clay-500/10 px-3 py-1.5 text-xs font-medium text-clay-600 sm:flex">
            <Sparkle width={13} height={13} /> AI Multi-Agent Planner
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 pb-24">
        {/* Hero */}
        <section className="py-12 text-center sm:py-16">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-sand-200 bg-white/60 px-3.5 py-1.5 text-xs font-medium text-espresso-700">
            <MapPin width={13} height={13} className="text-clay-500" />
            Flights · Stays · Activities · Dining — planned in seconds
          </span>
          <h1 className="mx-auto mt-5 max-w-3xl font-serif text-4xl leading-[1.1] text-espresso-900 sm:text-6xl">
            Tell us your trip.
            <br />
            <span className="italic text-clay-500">We’ll craft the journey.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-espresso-700/70">
            Describe where you want to go and your budget. Our AI agents scout
            flights, hotels, activities and dining, then compose a day-by-day
            itinerary — conflict-free.
          </p>
        </section>

        {/* Form */}
        <section className="mx-auto max-w-3xl">
          <BriefForm onSubmit={run} loading={status === 'loading'} />
        </section>

        {/* Output */}
        <section ref={resultRef} className="mt-10 scroll-mt-24">
          {status === 'loading' && (
            <div className="mx-auto max-w-3xl">
              <LoadingState />
            </div>
          )}
          {status === 'error' && (
            <div className="mx-auto max-w-3xl">
              <ErrorState message={error} onRetry={() => run(lastBrief)} />
            </div>
          )}
          {status === 'done' && data && <Results data={data} onReset={reset} />}
        </section>
      </main>

      <footer className="border-t border-sand-200/70 py-8">
        <div className="mx-auto max-w-5xl px-5 text-center text-sm text-espresso-700/50">
          Wayfare · AI travel itineraries · Built with React + Vite
        </div>
      </footer>
    </div>
  )
}
