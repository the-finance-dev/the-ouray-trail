import type { GameState, GameScore, EndState } from './types'

// ── Score Calculation ───────────────────────────────────────

/**
 * Calculates the final score based on outcome, remaining stats,
 * time, and suffering.
 *
 * Score formula:
 *   Base:     finished=1000, dnf=300, cutoff=200, death=100
 *   + Stat bonus: average of remaining stats
 *   + Time bonus: (cutoff - elapsed) * 20 (finishers only)
 *   + Suffering index: how much total damage you took
 *   + Style points: based on character archetype
 */
export function calculateScore(state: GameState): GameScore {
  const endState = state.endState!

  // Base score by outcome
  const baseScores: Record<EndState['type'], number> = {
    finished: 1000,
    dnf: 300,
    cutoff: 200,
    death: 100,
  }
  let totalScore = baseScores[endState.type] ?? 0

  // Remaining stats bonus: average of all stats
  const { health, morale, feet, stomach, hydration } = state.stats
  const statSum = health + morale + feet + stomach + hydration
  const statBonus = Math.round(statSum / 5)
  totalScore += statBonus

  // Time bonus: only for finishers, rewarding faster times
  let timeBonus = 0
  if (endState.type === 'finished') {
    timeBonus = Math.max(0, Math.round((state.cutoffTime - state.timeElapsed) * 20))
    totalScore += timeBonus
  }

  // Suffering index: how much total stat damage was endured
  // Base stats sum to 380 (80+75+70+75+80). The lower your remaining stats, the more you suffered.
  const sufferingIndex = Math.round((500 - statSum) / 5)
  totalScore += sufferingIndex

  // Style points: based on character archetype
  const stylePoints = calculateStylePoints(state)
  totalScore += stylePoints

  return {
    characterId: state.character?.id ?? 'unknown',
    characterName: state.character?.name ?? 'Unknown Runner',
    pace: state.pace,
    finalStats: { ...state.stats },
    timeElapsed: state.timeElapsed,
    milesCompleted: state.milesTraveled,
    stagesCompleted: state.currentStage,
    eventsEncountered: state.eventLog.length,
    endState,
    totalScore,
    sufferingIndex,
    stylePoints,
    timestamp: Date.now(),
  }
}

/**
 * Style points based on character choice and how the run went.
 * Some characters get bonus points for suffering in character.
 */
function calculateStylePoints(state: GameState): number {
  const id = state.character?.id ?? ''
  let points = 0

  switch (id) {
    case 'boulder-trail-runner':
      // Bonus if you bonked (low stats) but finished anyway
      if (state.endState?.type === 'finished' && state.stats.health < 30) points += 50
      break

    case 'hardrock-veteran':
      // Bonus for finishing with stats still high (the "not even hard" energy)
      if (state.endState?.type === 'finished') {
        const avg = (state.stats.health + state.stats.feet + state.stats.morale) / 3
        if (avg > 50) points += 40
      }
      break

    case 'spreadsheet-runner':
      // Bonus for finishing despite low morale (plan failed but you persevered)
      if (state.endState?.type === 'finished' && state.stats.morale < 25) points += 60
      break

    case 'first-time-100-miler':
      // Big bonus for actually finishing a first 100
      if (state.endState?.type === 'finished') points += 75
      break

    case 'local-from-ouray':
      // Bonus for finishing fast (under cutoff by 8+ hours)
      if (
        state.endState?.type === 'finished' &&
        state.cutoffTime - state.timeElapsed > 8
      ) {
        points += 45
      }
      break

    case 'signed-up-after-two-beers':
      // Bonus for any outcome — just showing up is the style
      points += 30
      // Extra if finished
      if (state.endState?.type === 'finished') points += 50
      break
  }

  return points
}

// ── Score Breakdown ─────────────────────────────────────────

/**
 * Returns an itemized breakdown of the score for display.
 */
export function getScoreBreakdown(
  score: GameScore
): Array<{ label: string; value: number }> {
  const baseScores: Record<EndState['type'], number> = {
    finished: 1000,
    dnf: 300,
    cutoff: 200,
    death: 100,
  }

  const { health, morale, feet, stomach, hydration } = score.finalStats
  const statSum = health + morale + feet + stomach + hydration
  const statBonus = Math.round(statSum / 5)

  let timeBonus = 0
  if (score.endState.type === 'finished') {
    timeBonus = Math.max(0, Math.round((46 - score.timeElapsed) * 20))
  }

  const breakdown: Array<{ label: string; value: number }> = [
    { label: 'Outcome', value: baseScores[score.endState.type] },
    { label: 'Remaining Stats', value: statBonus },
  ]

  if (timeBonus > 0) {
    breakdown.push({ label: 'Time Bonus', value: timeBonus })
  }

  breakdown.push(
    { label: 'Suffering Index', value: score.sufferingIndex },
    { label: 'Style Points', value: score.stylePoints }
  )

  breakdown.push({ label: 'TOTAL', value: score.totalScore })

  return breakdown
}

// ── Formatting Utilities ────────────────────────────────────

/**
 * Formats a decimal hour value as "Xh Ym".
 */
export function formatTime(hours: number): string {
  const h = Math.floor(hours)
  const m = Math.round((hours - h) * 60)
  if (h === 0) return `${m}m`
  if (m === 0) return `${h}h`
  return `${h}h ${m}m`
}

/**
 * Returns the display title for an end state type.
 */
export function getResultTitle(endState: EndState): string {
  switch (endState.type) {
    case 'finished':
      return 'FINISHER'
    case 'dnf':
      return 'DID NOT FINISH'
    case 'cutoff':
      return 'MISSED CUTOFF'
    case 'death':
      return 'DECEASED'
  }
}
