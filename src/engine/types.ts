// ── Player Stats ──────────────────────────────────────────────

export interface PlayerStats {
  health: number
  morale: number
  feet: number
  stomach: number
  hydration: number
}

export interface StatEffect {
  health?: number
  morale?: number
  feet?: number
  stomach?: number
  hydration?: number
  time?: number // hours added/removed
}

// ── Characters ───────────────────────────────────────────────

export interface Character {
  id: string
  name: string
  tagline: string
  description: string
  statModifiers: Partial<PlayerStats>
  budgetBonus: number
  specialTrait?: string
}

// ── Supplies ─────────────────────────────────────────────────

export interface Supply {
  id: string
  name: string
  description: string
  cost: number
  maxQuantity: number
  effects: StatEffect
  usableInGame: boolean
  useText?: string
}

export interface OwnedSupply {
  supply: Supply
  quantity: number
}

// ── Pace ─────────────────────────────────────────────────────

export type Pace = 'conservative' | 'moderate' | 'aggressive'

export interface PaceOption {
  id: Pace
  name: string
  description: string
  statDrainMultiplier: number
  timePerStage: number // base hours per stage
  bonusText: string
}

// ── Trail ────────────────────────────────────────────────────

export interface TrailStage {
  id: number
  name: string
  description: string
  elevation: string
  mile: number
  hasAidStation: boolean
  flavor: string
  baseDrain: StatEffect
}

// ── Events ───────────────────────────────────────────────────

export type EventCategory =
  | 'weather'
  | 'terrain'
  | 'altitude'
  | 'aidStation'
  | 'fueling'
  | 'mental'
  | 'gear'
  | 'social'
  | 'hallucination'
  | 'cutoff'
  | 'wildlife'

export interface GameEvent {
  id: string
  text: string
  category: EventCategory
  stages?: number[] // which stage indices this event can appear in
  choices?: EventChoice[]
  autoEffect?: StatEffect // applied if no choices
  autoResultText?: string
  weight?: number // likelihood weight, default 1
}

export interface EventChoice {
  text: string
  resultText: string
  effects: StatEffect
}

export interface EventResult {
  event: GameEvent
  choiceIndex?: number
  resultText: string
  effects: StatEffect
}

// ── End States ───────────────────────────────────────────────

export interface EndState {
  type: 'finished' | 'dnf' | 'cutoff' | 'death'
  message: string
  detail: string
}

// ── Scoring ──────────────────────────────────────────────────

export interface GameScore {
  characterId: string
  characterName: string
  pace: Pace
  finalStats: PlayerStats
  timeElapsed: number
  milesCompleted: number
  stagesCompleted: number
  eventsEncountered: number
  endState: EndState
  totalScore: number
  sufferingIndex: number
  stylePoints: number
  timestamp: number
}

// ── Game State ───────────────────────────────────────────────

export type GamePhase =
  | 'title'
  | 'characterSelect'
  | 'supplyShop'
  | 'paceSelect'
  | 'traveling'
  | 'event'
  | 'eventResult'
  | 'stageComplete'
  | 'gameOver'

export interface GameState {
  phase: GamePhase
  character: Character | null
  supplies: OwnedSupply[]
  pace: Pace
  stats: PlayerStats
  currentStage: number
  stageEvents: GameEvent[]
  currentEventIndex: number
  currentEvent: GameEvent | null
  lastResult: EventResult | null
  milesTraveled: number
  totalMiles: number
  timeElapsed: number
  cutoffTime: number
  vertRemaining: number
  totalVert: number
  endState: EndState | null
  score: GameScore | null
  eventLog: string[]
  budget: number
}

// ── Constants ────────────────────────────────────────────────

export const TOTAL_MILES = 100
export const TOTAL_VERT = 40000 // feet of climbing
export const CUTOFF_TIME = 46 // hours
export const BASE_BUDGET = 100
export const STAGES_COUNT = 10
export const EVENTS_PER_STAGE = 3

export const BASE_STATS: PlayerStats = {
  health: 80,
  morale: 75,
  feet: 70,
  stomach: 75,
  hydration: 80,
}
