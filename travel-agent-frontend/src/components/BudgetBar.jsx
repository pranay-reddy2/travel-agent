import { Wallet } from './Icons'
import { formatINR } from '../lib/normalize'

const SEGMENTS = [
  { key: 'flight', label: 'Flights', color: '#B5703F' },
  { key: 'hotel', label: 'Stay', color: '#C8865A' },
  { key: 'activities', label: 'Activities', color: '#6B7355' },
  { key: 'transport', label: 'Transport', color: '#9A5A2E' },
]

export default function BudgetBar({ budget }) {
  if (!budget || budget.total == null) return null
  const total = budget.total || 1
  const spent =
    (budget.flight || 0) +
    (budget.hotel || 0) +
    (budget.activities || 0) +
    (budget.transport || 0)
  const remaining =
    budget.remaining != null ? budget.remaining : Math.max(0, total - spent)

  return (
    <div className="rounded-3xl border border-sand-200 bg-white/80 p-6 shadow-card backdrop-blur-md">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-serif text-xl text-espresso-900">
          <span className="text-clay-500"><Wallet /></span>
          Budget breakdown
        </h3>
        <span className="text-sm text-espresso-700/70">
          Total <strong className="text-espresso-900">{formatINR(total)}</strong>
        </span>
      </div>

      {/* Stacked bar */}
      <div className="flex h-4 w-full overflow-hidden rounded-full bg-sand-100">
        {SEGMENTS.map((s) => {
          const v = budget[s.key] || 0
          const pct = (v / total) * 100
          if (pct <= 0) return null
          return (
            <div
              key={s.key}
              style={{ width: `${pct}%`, backgroundColor: s.color }}
              title={`${s.label}: ${formatINR(v)}`}
              className="h-full transition-all"
            />
          )
        })}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {SEGMENTS.map((s) => (
          <div key={s.key} className="rounded-xl bg-sand-50 p-3">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
              <span className="text-xs font-medium text-espresso-700/70">{s.label}</span>
            </div>
            <p className="mt-1 font-semibold text-espresso-900">
              {budget[s.key] != null ? formatINR(budget[s.key]) : '—'}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between rounded-xl bg-olive-500/10 px-4 py-3">
        <span className="text-sm font-medium text-olive-600">Remaining balance</span>
        <span className="font-serif text-lg text-olive-600">{formatINR(remaining)}</span>
      </div>
    </div>
  )
}
