// API base. In dev, Vite proxies /api -> http://localhost:5000 (see vite.config.js).
// To hit the backend directly, set VITE_API_BASE in a .env file, e.g.
//   VITE_API_BASE=http://localhost:5000
const API_BASE = import.meta.env.VITE_API_BASE || ''

export async function planTrip(brief) {
  const res = await fetch(`${API_BASE}/api/travel/plan`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ brief }),
  })

  let data = null
  try {
    data = await res.json()
  } catch {
    // backend returned non-JSON (e.g. crash HTML)
  }

  if (!res.ok) {
    const msg =
      (data && (data.error || data.message)) ||
      `Server error (${res.status}). The AI service may be overloaded — try again.`
    const err = new Error(msg)
    err.status = res.status
    throw err
  }

  if (!data) throw new Error('Empty response from server.')
  return data
}
