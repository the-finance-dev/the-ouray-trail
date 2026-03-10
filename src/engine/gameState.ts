import type {
  GameState,
  Character,
  OwnedSupply,
  Pace,
  PlayerStats,
  StatEffect,
  EndState,
} from './types'
import {
  BASE_STATS,
  TOTAL_MILES,
  TOTAL_VERT,
  CUTOFF_TIME,
  BASE_BUDGET,
} from './types'
import { trailStages } from '@/data/locations'
import { paceOptions } from '@/data/supplies'

// ── State Factory ───────────────────────────────────────────

/**
 * Creates a fresh game state at the 'title' phase.
 * All stats at base values, empty inventory, no character selected.
 */
export function createInitialState(): GameState {
  return {
    phase: 'title',
    character: null,
    supplies: [],
    pace: 'moderate',
    stats: { ...BASE_STATS },
    currentStage: 0,
    stageEvents: [],
    currentEventIndex: 0,
    currentEvent: null,
    lastResult: null,
    milesTraveled: 0,
    totalMiles: TOTAL_MILES,
    timeElapsed: 0,
    cutoffTime: CUTOFF_TIME,
    vertRemaining: TOTAL_VERT,
    totalVert: TOTAL_VERT,
    endState: null,
    score: null,
    eventLog: [],
    budget: BASE_BUDGET,
  }
}

// ── Character Application ───────────────────────────────────

/**
 * Applies a character's stat modifiers to the current base stats
 * and sets the budget including the character's bonus.
 */
export function applyCharacter(state: GameState, character: Character): GameState {
  const modifiedStats: PlayerStats = {
    health: BASE_STATS.health + (character.statModifiers.health ?? 0),
    morale: BASE_STATS.morale + (character.statModifiers.morale ?? 0),
    feet: BASE_STATS.feet + (character.statModifiers.feet ?? 0),
    stomach: BASE_STATS.stomach + (character.statModifiers.stomach ?? 0),
    hydration: BASE_STATS.hydration + (character.statModifiers.hydration ?? 0),
  }

  return {
    ...state,
    character,
    stats: modifiedStats,
    budget: BASE_BUDGET + character.budgetBonus,
  }
}

// ── Stat Effects ────────────────────────────────────────────

/**
 * Applies stat effects and clamps all values to 0-100.
 */
export function applyStatEffects(stats: PlayerStats, effects: StatEffect): PlayerStats {
  const clamp = (val: number) => Math.max(0, Math.min(100, val))

  return {
    health: clamp(stats.health + (effects.health ?? 0)),
    morale: clamp(stats.morale + (effects.morale ?? 0)),
    feet: clamp(stats.feet + (effects.feet ?? 0)),
    stomach: clamp(stats.stomach + (effects.stomach ?? 0)),
    hydration: clamp(stats.hydration + (effects.hydration ?? 0)),
  }
}

// ── Stage Drain ─────────────────────────────────────────────

/**
 * Applies the current trail stage's base drain, scaled by pace multiplier.
 */
export function applyStageDrain(state: GameState): GameState {
  const stage = trailStages[state.currentStage]
  if (!stage) return state

  const paceOption = paceOptions.find((p) => p.id === state.pace)
  const multiplier = paceOption?.statDrainMultiplier ?? 1.0

  // Scale drain effects by pace multiplier (drain values are negative, so
  // multiplying makes them more negative for aggressive pace)
  const scaledDrain: StatEffect = {
    health: Math.round((stage.baseDrain.health ?? 0) * multiplier),
    morale: Math.round((stage.baseDrain.morale ?? 0) * multiplier),
    feet: Math.round((stage.baseDrain.feet ?? 0) * multiplier),
    stomach: Math.round((stage.baseDrain.stomach ?? 0) * multiplier),
    hydration: Math.round((stage.baseDrain.hydration ?? 0) * multiplier),
  }

  return {
    ...state,
    stats: applyStatEffects(state.stats, scaledDrain),
  }
}

// ── End Condition Checks ────────────────────────────────────

/**
 * Checks if any end condition is met.
 * Priority: death (health/hydration) > dnf (feet/stomach/morale) > cutoff (time)
 * Returns null if the runner is still alive and moving.
 */
export function checkEndConditions(state: GameState): EndState | null {
  // Death conditions — health or hydration hitting zero
  if (state.stats.health <= 0) {
    return {
      type: 'death',
      message: 'Your body has stopped cooperating entirely.',
      detail: 'Health reached zero.',
    }
  }
  if (state.stats.hydration <= 0) {
    return {
      type: 'death',
      message: 'Dehydration. The desert wins again, even when there is no desert.',
      detail: 'Hydration reached zero.',
    }
  }

  // DNF conditions — feet, stomach, or morale giving out
  if (state.stats.feet <= 0) {
    return {
      type: 'dnf',
      message: 'Your feet have formally seceded from the rest of your body.',
      detail: 'Feet reached zero.',
    }
  }
  if (state.stats.stomach <= 0) {
    return {
      type: 'dnf',
      message: 'Your digestive system has declared independence.',
      detail: 'Stomach reached zero.',
    }
  }
  if (state.stats.morale <= 0) {
    return {
      type: 'dnf',
      message: 'Your will to continue has packed its bags and left.',
      detail: 'Morale reached zero.',
    }
  }

  // Cutoff — time exceeded
  if (state.timeElapsed >= state.cutoffTime) {
    return {
      type: 'cutoff',
      message: 'Time has run out. The course has closed.',
      detail: `Elapsed: ${state.timeElapsed.toFixed(1)}h / Cutoff: ${state.cutoffTime}h`,
    }
  }

  return null
}

// ── Stage Advancement ───────────────────────────────────────

/**
 * Advances to the next stage, updating mileage, vert, and time.
 */
export function advanceStage(state: GameState): GameState {
  const nextStage = state.currentStage + 1
  const miles = calculateMileage(state.currentStage)
  const time = getTimeForStage(state.pace)

  // Calculate vert consumed this stage (rough proportional split)
  const vertPerStage = Math.round(state.totalVert / trailStages.length)

  return {
    ...state,
    currentStage: nextStage,
    milesTraveled: state.milesTraveled + miles,
    vertRemaining: Math.max(0, state.vertRemaining - vertPerStage),
    timeElapsed: state.timeElapsed + time,
    stageEvents: [],
    currentEventIndex: 0,
    currentEvent: null,
    lastResult: null,
  }
}

// ── Supply Usage ────────────────────────────────────────────

/**
 * Uses a supply from inventory: applies its effects and decrements quantity.
 * Only works for supplies marked as usableInGame.
 * Returns the state unchanged if supply not found or not usable.
 */
export function useSupply(state: GameState, supplyId: string): GameState {
  const supplyIndex = state.supplies.findIndex(
    (s) => s.supply.id === supplyId && s.quantity > 0 && s.supply.usableInGame
  )

  if (supplyIndex === -1) return state

  const owned = state.supplies[supplyIndex]
  const newStats = applyStatEffects(state.stats, owned.supply.effects)

  const newSupplies = [...state.supplies]
  const newQuantity = owned.quantity - 1

  if (newQuantity <= 0) {
    // Remove the supply entirely
    newSupplies.splice(supplyIndex, 1)
  } else {
    newSupplies[supplyIndex] = {
      ...owned,
      quantity: newQuantity,
    }
  }

  const logEntry = owned.supply.useText ?? `Used ${owned.supply.name}.`

  return {
    ...state,
    stats: newStats,
    supplies: newSupplies,
    eventLog: [...state.eventLog, logEntry],
  }
}

// ── Utility Functions ───────────────────────────────────────

/**
 * Returns the miles covered in a given stage (distance to next stage).
 */
export function calculateMileage(stage: number): number {
  const currentMile = trailStages[stage]?.mile ?? 0
  const nextMile = trailStages[stage + 1]?.mile ?? TOTAL_MILES
  return nextMile - currentMile
}

/**
 * Returns hours per stage for the given pace.
 */
export function getTimeForStage(pace: Pace): number {
  const option = paceOptions.find((p) => p.id === pace)
  return option?.timePerStage ?? 4.5
}
