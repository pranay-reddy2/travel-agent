# Wayfare — Travel Agent Frontend

Premium React + Vite + Tailwind frontend for your multi-agent AI travel planner.

## Run

```bash
npm install
npm run dev
```

Open the printed URL (default http://localhost:5173).

## Connecting to your backend

The frontend calls **`POST /api/travel/plan`** with body `{ "brief": "..." }`.

- In dev, Vite **proxies** `/api` → `http://localhost:5000` (your Express server).
  See `vite.config.js`. So just run your backend on port 5000 and the frontend
  on 5173 — no CORS issues.
- To point somewhere else, create `.env`:

  ```
  VITE_API_BASE=https://your-api.com
  ```

## Resilient by design

The backend's Gemini output drifts between runs. `src/lib/normalize.js` flattens
every variant into one stable shape, handling:

- `cost` vs `estimatedCost`
- `selectedRestaurant` being `null` / `{}`
- itinerary at root vs nested under `.itinerary`
- empty `days[]` (failed AI call) → shows a clean retry screen

503 / 429 errors render a friendly "AI is busy" state with retry — never a blank page.

## Structure

```
src/
  App.jsx                 state machine: idle/loading/done/error
  lib/api.js              fetch wrapper
  lib/normalize.js        defensive response normalizer  ← key file
  components/
    BriefForm.jsx         free-text + guided input
    LoadingState.jsx      animated agent steps
    ErrorState.jsx        friendly errors + retry
    Results.jsx           assembles the itinerary view
    TripHeader.jsx        hero summary + export
    SelectionCards.jsx    flight / hotel / dining / transport
    BudgetBar.jsx         stacked budget breakdown
    Timeline.jsx          day-by-day timeline
    Icons.jsx             inline SVG icons
```
