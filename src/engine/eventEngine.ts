import type { GameState, GameEvent, EventResult, StatEffect } from './types'
import { EVENTS_PER_STAGE } from './types'
import { events } from '@/data/events'
import { applyStatEffects } from './gameState'

// ── Event Selection ─────────────────────────────────────────

/**
 * Filters events compatible with the given stage, then selects
 * EVENTS_PER_STAGE events using weighted random selection.
 *
 * Events without a stages array can appear in any stage.
 * Weight defaults to 1 if not specified.
 */
export function getEventsForStage(stageIndex: number): GameEvent[] {
  // Filter to events that can appear at this stage
  const eligible = events.filter((event) => {
    if (!event.stages || event.stages.length === 0) return true
    return event.stages.includes(stageIndex)
  })

  if (eligible.length === 0) return []

  // Weighted random selection without replacement
  const selected: GameEvent[] = []
  const pool = [...eligible]

  const count = Math.min(EVENTS_PER_STAGE, pool.length)

  for (let i = 0; i < count; i++) {
    const picked = weightedRandomPick(pool)
    if (!picked) break
    selected.push(picked.event)
    pool.splice(picked.index, 1)
  }

  return selected
}

/**
 * Picks one event from the pool using weighted random selection.
 * Returns the event and its index in the pool, or null if pool is empty.
 */
function weightedRandomPick(
  pool: GameEvent[]
): { event: GameEvent; index: number } | null {
  if (pool.length === 0) return null

  const totalWeight = pool.reduce((sum, e) => sum + (e.weight ?? 1), 0)
  let roll = Math.random() * totalWeight

  for (let i = 0; i < pool.length; i++) {
    const weight = pool[i].weight ?? 1
    roll -= weight
    if (roll <= 0) {
      return { event: pool[i], index: i }
    }
  }

  // Fallback: return the last event (should not reach here with valid weights)
  return { event: pool[pool.length - 1], index: pool.length - 1 }
}

// ── Event Resolution ────────────────────────────────────────

/**
 * Resolves an auto event (one without choices).
 * Returns the effect result using the event's autoEffect and autoResultText.
 */
export function resolveAutoEvent(event: GameEvent): EventResult {
  return {
    event,
    resultText: event.autoResultText ?? 'Something happened.',
    effects: event.autoEffect ?? {},
  }
}

/**
 * Resolves a choice event by returning the selected choice's result.
 * Returns a neutral result if the choice index is invalid.
 */
export function resolveChoice(event: GameEvent, choiceIndex: number): EventResult {
  if (!event.choices || choiceIndex < 0 || choiceIndex >= event.choices.length) {
    return {
      event,
      choiceIndex,
      resultText: 'Nothing happened.',
      effects: {},
    }
  }

  const choice = event.choices[choiceIndex]

  return {
    event,
    choiceIndex,
    resultText: choice.resultText,
    effects: choice.effects,
  }
}

// ── Result Application ──────────────────────────────────────

/**
 * Applies an event result's stat effects to the game state.
 * Also adds time effects and logs the event.
 */
export function applyEventResult(state: GameState, result: EventResult): GameState {
  const newStats = applyStatEffects(state.stats, result.effects)
  const timeAdded = result.effects.time ?? 0

  const logEntry = `[Stage ${state.currentStage}] ${result.event.text.slice(0, 60)}...`

  return {
    ...state,
    stats: newStats,
    timeElapsed: state.timeElapsed + timeAdded,
    lastResult: result,
    eventLog: [...state.eventLog, logEntry],
  }
}
