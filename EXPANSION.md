# Expansion Plan

How to add the planned features to The Ouray Trail.

## Google SSO / User Accounts

1. Add `next-auth` with Google provider
2. Create `src/app/api/auth/[...nextauth]/route.ts`
3. Add a `User` model: `{ id, googleId, email, displayName, avatar, createdAt }`
4. Wrap the app in a `SessionProvider`
5. Add optional sign-in button to title screen and result screen
6. The game remains playable without sign-in — auth only needed for leaderboard/saves

## Persistent Leaderboard

1. Add a database (SQLite via Prisma for simplicity, or Postgres for scale)
2. Create a `Score` table mirroring the `GameScore` type (already fully defined)
3. Add `POST /api/scores` — submit a score (requires auth)
4. Add `GET /api/scores` — fetch top scores, recent runs, funniest deaths
5. Add `GET /api/scores/daily` — daily challenge leaderboard
6. Create a `Leaderboard` component for the landing page
7. Add score submission to the result screen (if signed in)

The `GameScore` interface is already designed for this — it includes character, pace, time, stats, suffering index, style points, and timestamp.

## Public High Scores on Landing Page

1. Create a `src/app/leaderboard/page.tsx`
2. Fetch scores server-side with ISR (revalidate every 60s)
3. Display tabs: Top Finishers, Funniest Deaths, Recent Runs, Daily Challenge
4. Link from title screen: "VIEW LEADERBOARD"
5. Each entry shows: character, time/cause, score, date

## Saved Games / Profiles

1. Add a `SavedGame` table: `{ userId, gameState (JSON), createdAt, updatedAt }`
2. Add `POST /api/saves` and `GET /api/saves` endpoints
3. Auto-save game state between stages
4. Add "Continue" option on title screen (if signed in with a save)
5. Keep localStorage save for non-authenticated play

## Daily Challenge

1. Use the date as a random seed: `seed = hash(YYYY-MM-DD)`
2. Deterministic event selection using seeded RNG instead of `Math.random()`
3. Lock character/supplies/pace for the daily challenge
4. Separate leaderboard filtered by daily seed
5. Add "DAILY CHALLENGE" button to title screen

## Additional Game Modes

- **Pacer Mode**: Join a runner mid-race, manage their morale, different event pool
- **Volunteer Mode**: Manage an aid station, serve runners, handle logistics
- **Race Director Mode**: Strategic mode — set up course, manage weather contingencies, handle runner emergencies
- **Spectator Mode**: Follow a simulated race with commentary

Each mode would be a separate game loop in `src/engine/` with its own event pool in `src/data/`.

## Analytics / Admin

1. Add an admin dashboard at `/admin` (protected by role check)
2. Track: games played, completion rate, popular characters, common death causes
3. Use the existing `GameScore` data for analytics
4. Add content moderation for any user-generated content (future)

## Seasonal Content

1. Add an `eventSeason` field to `GameEvent`
2. Filter events by current date/season
3. Examples: winter storm events in December, wildflower events in June, Halloween special deaths in October
4. Seasonal leaderboards with special scoring
