import type { Character } from '@/engine/types'

// ── Character Archetypes ────────────────────────────────────
// Six runners. Six delusions. One mountain.

export const characters: Character[] = [
  {
    id: 'boulder-trail-runner',
    name: 'Boulder Trail Runner',
    tagline: 'Strava or it didn\'t happen.',
    description:
      'Fast legs, fast start, fast bonk. Has a coach, a nutrition plan, and a VO2max tattoo. ' +
      'Will be in the front for exactly one stage.',
    statModifiers: {
      morale: 10,
      feet: -10,
      health: -5,
    },
    budgetBonus: 0,
  },
  {
    id: 'hardrock-veteran',
    name: 'Hardrock Veteran',
    tagline: 'This isn\'t even the hard part.',
    description:
      'Has finished worse races in worse conditions on worse feet. ' +
      'Moves at a pace that seems insufficient until everyone else drops.',
    statModifiers: {
      health: 10,
      morale: 5,
      feet: 10,
      stomach: 5,
      hydration: 5,
    },
    budgetBonus: 10,
    specialTrait: 'Has done worse.',
  },
  {
    id: 'spreadsheet-runner',
    name: 'Spreadsheet Runner',
    tagline: 'According to my spreadsheet...',
    description:
      'Has a 47-tab race plan with conditional formatting and pivot tables. ' +
      'Calorie targets calculated to the gram. Has not accounted for the mountain.',
    statModifiers: {
      stomach: 10,
      hydration: 10,
      health: 5,
      morale: -10,
    },
    budgetBonus: 15,
    specialTrait: 'Plans for everything except what happens.',
  },
  {
    id: 'first-time-100-miler',
    name: 'First-Time 100 Miler',
    tagline: 'How hard can it be?',
    description:
      'Finished a 50K once. It went well. Has extrapolated from this single data point ' +
      'that a hundred miles at altitude will be fine.',
    statModifiers: {
      morale: 15,
      feet: -15,
      stomach: -5,
      health: -5,
      hydration: -5,
    },
    budgetBonus: -10,
  },
  {
    id: 'local-from-ouray',
    name: 'Local From Ouray',
    tagline: 'Oh, you mean the easy pass?',
    description:
      'Lives at 7,800 feet. Runs these trails to walk the dog. ' +
      'Genuinely confused by other runners\' concern about the terrain.',
    statModifiers: {
      health: 5,
      feet: 10,
      morale: 5,
      hydration: 5,
    },
    budgetBonus: 5,
    specialTrait: 'Knows where the real trail is.',
  },
  {
    id: 'signed-up-after-two-beers',
    name: 'Signed Up After Two Beers',
    tagline: 'I don\'t remember registering.',
    description:
      'Woke up to a confirmation email and a credit card charge. ' +
      'Training has been described as "inconsistent" by people being generous.',
    statModifiers: {
      health: -5,
      morale: 5,
      feet: -5,
      stomach: -5,
      hydration: -5,
    },
    budgetBonus: -5,
    specialTrait: 'Unclear motivation.',
  },
]
