// Lightweight inline SVG icons — no dependency needed.
const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export const Plane = (p) => (
  <svg {...base} {...p}><path d="M17.8 19.2 16 11l3.5-3.5a2.12 2.12 0 0 0-3-3L13 8 4.8 6.2a.5.5 0 0 0-.5.8l3.9 5.2-1.4 1.4-1.8-.6-.9.9 2.4 1.6 1.6 2.4.9-.9-.6-1.8 1.4-1.4 5.2 3.9a.5.5 0 0 0 .8-.5z"/></svg>
)
export const Bed = (p) => (
  <svg {...base} {...p}><path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8V6a2 2 0 0 1 2-2h3v4"/></svg>
)
export const Fork = (p) => (
  <svg {...base} {...p}><path d="M3 2v7c0 1.1.9 2 2 2h0a2 2 0 0 0 2-2V2M5 2v20M19 15V2a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3zM19 15v7"/></svg>
)
export const Car = (p) => (
  <svg {...base} {...p}><path d="M5 17H3v-5l2-5h14l2 5v5h-2M5 17a2 2 0 1 0 4 0M15 17a2 2 0 1 0 4 0M5 17h10M5 12h16"/></svg>
)
export const Camera = (p) => (
  <svg {...base} {...p}><path d="M14.5 4h-5L8 6H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-4l-1.5-2z"/><circle cx="12" cy="13" r="3"/></svg>
)
export const Wallet = (p) => (
  <svg {...base} {...p}><path d="M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5"/><path d="M16 12h.01"/></svg>
)
export const MapPin = (p) => (
  <svg {...base} {...p}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>
)
export const Calendar = (p) => (
  <svg {...base} {...p}><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
)
export const Users = (p) => (
  <svg {...base} {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
)
export const Sparkle = (p) => (
  <svg {...base} {...p}><path d="M12 3l1.9 5.3L19 10l-5.1 1.7L12 17l-1.9-5.3L5 10l5.1-1.7L12 3zM5 18l.8 2.2L8 21l-2.2.8L5 24l-.8-2.2L2 21l2.2-.8L5 18z"/></svg>
)
export const ArrowRight = (p) => (
  <svg {...base} {...p}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
)
export const Alert = (p) => (
  <svg {...base} {...p}><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/></svg>
)
export const Refresh = (p) => (
  <svg {...base} {...p}><path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5"/></svg>
)
export const Leaf = (p) => (
  <svg {...base} {...p}><path d="M11 20A7 7 0 0 1 4 13c0-5 5-9 16-9 0 9-5 16-9 16zM4 21c4-8 9-11 13-12"/></svg>
)
export const Sun = (p) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
)
export const Clock = (p) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
)
export const Globe = (p) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z"/></svg>
)
export const Download = (p) => (
  <svg {...base} {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
)
