import { useState } from 'react'
import {
  Plane, Bed, Fork, Car, Camera, MapPin, Sun, Clock, Sparkle, Globe,
} from './Icons'

// Map event "type" -> icon + accent
const TYPE_MAP = {
  flight: { icon: Plane, color: '#B5703F' },
  travel: { icon: Plane, color: '#B5703F' },
  transfer: { icon: Car, color: '#9A5A2E' },
  transport: { icon: Car, color: '#9A5A2E' },
  accommodation: { icon: Bed, color: '#C8865A' },
  hotel: { icon: Bed, color: '#C8865A' },
  dining: { icon: Fork, color: '#B5703F' },
  activity: { icon: Camera, color: '#6B7355' },
  exploration: { icon: MapPin, color: '#6B7355' },
  relaxation: { icon: Sun, color: '#C8865A' },
  leisure: { icon: Sun, color: '#C8865A' },
  shopping: { icon: Sparkle, color: '#9A5A2E' },
  preparation: { icon: Clock, color: '#56603F' },
}

const iconFor = (type) => {
  const k = (type || '').toLowerCase()
  for (const key in TYPE_MAP) if (k.includes(key)) return TYPE_MAP[key]
  return { icon: Globe, color: '#6B7355' }
}

export default function Timeline({ days }) {
  const [active, setActive] = useState(0)
  if (!days?.length) return null

  return (
    <div>
      {/* Day tabs */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
        {days.map((d, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`shrink-0 rounded-2xl border px-4 py-2.5 text-left transition ${
              active === i
                ? 'border-clay-500 bg-clay-500 text-white shadow-soft'
                : 'border-sand-200 bg-white/70 text-espresso-700 hover:border-clay-400'
            }`}
          >
            <span className={`block text-[10px] font-semibold uppercase tracking-wider ${active === i ? 'text-white/70' : 'text-clay-600'}`}>
              Day {d.day}
            </span>
            <span className="block max-w-[150px] truncate text-sm font-medium">
              {d.title}
            </span>
          </button>
        ))}
      </div>

      {/* Active day timeline */}
      <div className="animate-fade-up rounded-3xl border border-sand-200 bg-white/80 p-6 shadow-card backdrop-blur-md sm:p-8">
        <div className="mb-6 flex items-baseline gap-3">
          <span className="font-serif text-4xl text-clay-500">
            {String(days[active].day).padStart(2, '0')}
          </span>
          <h3 className="font-serif text-2xl text-espresso-900">
            {days[active].title}
          </h3>
        </div>

        <ol className="relative space-y-1 pl-2">
          {days[active].events.map((e, i) => {
            const { icon: Icon, color } = iconFor(e.type)
            const last = i === days[active].events.length - 1
            return (
              <li key={i} className="relative flex gap-4 pb-5">
                {/* connector line */}
                {!last && (
                  <span className="absolute left-[18px] top-9 h-full w-px bg-sand-200" />
                )}
                <span
                  className="z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white shadow"
                  style={{ backgroundColor: color }}
                >
                  <Icon width={16} height={16} />
                </span>
                <div className="flex-1 pt-0.5">
                  <div className="flex flex-wrap items-center gap-2">
                    {e.time && (
                      <span className="rounded-md bg-sand-100 px-2 py-0.5 font-mono text-xs text-espresso-700">
                        {e.time}
                      </span>
                    )}
                    <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color }}>
                      {e.type}
                    </span>
                  </div>
                  <p className="mt-1 leading-relaxed text-espresso-800">{e.title}</p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
