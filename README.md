# The Ouray Trail

A browser-based parody survival game inspired by Oregon Trail, themed around the Ouray 100 ultramarathon and the general absurdity of mountain ultrarunning.

> "You have died of vert."

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- Client-side game state (React hooks)
- No database required for MVP

## Architecture

```
src/
├── app/              # Next.js pages and layout
├── components/       # UI components (one per screen/widget)
├── engine/           # Game logic, separated from UI
│   ├── types.ts      # All type definitions and constants
│   ├── gameState.ts  # State management, stat effects, end conditions
│   ├── eventEngine.ts # Event selection and resolution
│   └── scoring.ts    # Score calculation and formatting
├── data/             # Content (easily expandable)
│   ├── characters.ts # 6 runner archetypes
│   ├── events.ts     # 69 random events with choices
│   ├── supplies.ts   # 13 supplies + 3 pace options
│   ├── locations.ts  # 10 trail stages
│   └── endings.ts    # Death/DNF/cutoff/finish messages
└── hooks/
    └── useGame.ts    # Main game orchestration hook
```

Key design decisions:
- **Engine separated from UI** — game logic is pure functions, easily testable
- **Data-driven content** — events, characters, supplies are data files, not embedded in components
- **Typed models** — Player, GameState, GameEvent, GameScore all fully typed
- **Score interface abstracted** — ready for persistence layer

## Running

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## Game Flow

1. Title screen
2. Choose runner archetype (6 types)
3. Buy supplies at the Ouray General Store
4. Choose pace (conservative / moderate / aggressive)
5. Progress through 10 trail stages
6. Face 3 random events per stage (69 event pool)
7. Manage stats: health, morale, feet, stomach, hydration
8. Either finish, DNF, miss cutoff, or die hilariously
9. See score breakdown and trail log

## Content

- **69 random events** across 11 categories (weather, terrain, aid stations, fueling, mental, gear, social, hallucinations, cutoffs, altitude, wildlife)
- **6 character archetypes** with stat modifiers and special traits
- **13 supplies** in a parody general store
- **47 ending messages** (19 deaths, 10 DNFs, 8 cutoffs, 10 finishes)
- **10 trail stages** from town start to finish line

## Building for Production

```bash
npm run build
npm start
```

The app is fully static and can be exported for CDN deployment:

```js
// next.config.js
const nextConfig = { output: 'export' }
```
