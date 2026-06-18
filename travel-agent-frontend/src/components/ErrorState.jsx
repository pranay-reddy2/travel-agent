import { Alert, Refresh } from './Icons'

export default function ErrorState({ message, onRetry }) {
  const overloaded = /503|429|overload|demand|quota|unavailable/i.test(
    message || ''
  )
  return (
    <div className="animate-fade-up rounded-3xl border border-clay-500/30 bg-clay-400/5 p-7 shadow-card">
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-clay-500/15 text-clay-600">
          <Alert />
        </span>
        <div className="flex-1">
          <h3 className="font-serif text-xl text-espresso-900">
            {overloaded ? 'The AI is a little busy' : 'Something went wrong'}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-espresso-700/80">
            {overloaded
              ? 'The travel AI is experiencing high demand right now (it can also be a rate limit). This is usually temporary — give it a moment and try again.'
              : message ||
                'We couldn’t reach the planning service. Check that the backend is running on port 5000 and try again.'}
          </p>
          {message && overloaded && (
            <p className="mt-2 font-mono text-xs text-espresso-700/50">{message}</p>
          )}
          <button
            onClick={onRetry}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-espresso-900 px-5 py-2.5 text-sm font-semibold text-sand-50 transition hover:bg-espresso-800"
          >
            <Refresh width={16} height={16} />
            Try again
          </button>
        </div>
      </div>
    </div>
  )
}
