'use client'

import { useState, useCallback } from 'react'
import type {
  GameState,
  GamePhase,
  Pace,
  OwnedSupply,
  EventResult,
  EndState,
} from '@/engine/types'
import {
  TOTAL_MILES,
  TOTAL_VERT,
  CUTOFF_TIME,
  STAGES_COUNT,
} from '@/engine/types'
import { characters } from '@/data/characters'
import { supplies as allSupplies, paceOptions } from '@/data/supplies'
import { trailStages } from '@/data/locations'
import {
  deathMessages,
  dnfMessages,
  cutoffMessages,
  finishMessages,
} from '@/data/endings'
import {
  createInitialState,
  applyCharacter,
  applyStatEffects,
  applyStageDrain,
  checkEndConditions,
  useSupply as useSupplyEngine,
  getTimeForStage,
} from '@/engine/gameState'
import { getEventsForStage, resolveAutoEvent, resolveChoice, applyEventResult } from '@/engine/eventEngine'
import { calculateScore } from '@/engine/scoring'

// ── Helpers ─────────────────────────────────────────────────

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function getEndingMessage(type: EndState['type']): { message: string; detail: string } {
  switch (type) {
    case 'death':
      return { message: pickRandom(deathMessages), detail: 'The mountain collected its toll.' }
    case 'dnf':
      return { message: pickRandom(dnfMessages), detail: 'You made the call. The mountain will be here next year.' }
    case 'cutoff':
      return { message: pickRandom(cutoffMessages), detail: 'The clock won.' }
    case 'finished':
      return { message: pickRandom(finishMessages), detail: 'Against all odds, you crossed the line.' }
  }
}

function buildEndState(type: EndState['type']): EndState {
  const msg = getEndingMessage(type)
  return { type, message: msg.message, detail: msg.detail }
}

// ── Hook Interface ──────────────────────────────────────────

export interface UseGameReturn {
  state: GameState
  startGame: () => void
  selectCharacter: (id: string) => void
  buySupply: (id: string) => void
  removeSupply: (id: string) => void
  confirmSupplies: () => void
  selectPace: (pace: Pace) => void
  continueJourney: () => void
  makeChoice: (index: number) => void
  acknowledgeResult: () => void
  useSupply: (id: string) => void
  playAgain: () => void
}

// ── Hook ────────────────────────────────────────────────────

export default function useGame(): UseGameReturn {
  const [state, setState] = useState<GameState>(createInitialState)

  const startGame = useCallback(() => {
    setState((prev) => ({ ...prev, phase: 'characterSelect' as GamePhase }))
  }, [])

  const selectCharacter = useCallback((id: string) => {
    const character = characters.find((c) => c.id === id)
    if (!character) return

    setState((prev) => {
      const withCharacter = applyCharacter(prev, character)
      return { ...withCharacter, phase: 'supplyShop' as GamePhase }
    })
  }, [])

  const buySupply = useCallback((id: string) => {
    setState((prev) => {
      const supply = allSupplies.find((s) => s.id === id)
      if (!supply) return prev
      if (prev.budget < supply.cost) return prev

      const existing = prev.supplies.find((s) => s.supply.id === id)
      if (existing && existing.quantity >= supply.maxQuantity) return prev

      let newSupplies: OwnedSupply[]
      if (existing) {
        newSupplies = prev.supplies.map((s) =>
          s.supply.id === id ? { ...s, quantity: s.quantity + 1 } : s
        )
      } else {
        newSupplies = [...prev.supplies, { supply, quantity: 1 }]
      }

      return {
        ...prev,
        supplies: newSupplies,
        budget: prev.budget - supply.cost,
      }
    })
  }, [])

  const removeSupply = useCallback((id: string) => {
    setState((prev) => {
      const existing = prev.supplies.find((s) => s.supply.id === id)
      if (!existing) return prev

      let newSupplies: OwnedSupply[]
      if (existing.quantity <= 1) {
        newSupplies = prev.supplies.filter((s) => s.supply.id !== id)
      } else {
        newSupplies = prev.supplies.map((s) =>
          s.supply.id === id ? { ...s, quantity: s.quantity - 1 } : s
        )
      }

      return {
        ...prev,
        supplies: newSupplies,
        budget: prev.budget + existing.supply.cost,
      }
    })
  }, [])

  const confirmSupplies = useCallback(() => {
    setState((prev) => {
      // Apply passive supply effects (non-usable supplies grant their bonus at start)
      let newStats = { ...prev.stats }
      for (const owned of prev.supplies) {
        if (!owned.supply.usableInGame) {
          for (let i = 0; i < owned.quantity; i++) {
            newStats = applyStatEffects(newStats, owned.supply.effects)
          }
        }
      }
      return {
        ...prev,
        phase: 'paceSelect' as GamePhase,
        stats: newStats,
      }
    })
  }, [])

  const selectPace = useCallback((pace: Pace) => {
    setState((prev) => {
      const paceOption = paceOptions.find((p) => p.id === pace)
      if (!paceOption) return prev

      const stageEvents = getEventsForStage(0)
      const stateWithPace = { ...prev, pace, currentStage: 0 }
      const drained = applyStageDrain(stateWithPace)
      const stage = trailStages[0]

      return {
        ...drained,
        phase: 'traveling' as GamePhase,
        stageEvents,
        currentEventIndex: 0,
        currentEvent: null,
        milesTraveled: stage.mile,
        vertRemaining: Math.round(TOTAL_VERT * ((STAGES_COUNT - 1) / STAGES_COUNT)),
        eventLog: [...prev.eventLog, `Started at ${stage.name} — Pace: ${paceOption.name}`],
      }
    })
  }, [])

  const continueJourney = useCallback(() => {
    setState((prev) => {
      if (prev.phase === 'traveling') {
        // Show first event of the stage
        const event = prev.stageEvents[0]
        if (!event) {
          return { ...prev, phase: 'stageComplete' as GamePhase }
        }

        // For auto-events, apply effect immediately but still show the event text
        if (!event.choices && event.autoEffect) {
          const result = resolveAutoEvent(event)
          const afterResult = applyEventResult(prev, result)

          const endCheck = checkEndConditions(afterResult)
          if (endCheck) {
            const endState = buildEndState(endCheck.type)
            const finalState = { ...afterResult, endState }
            const score = calculateScore(finalState)
            return {
              ...finalState,
              phase: 'gameOver' as GamePhase,
              currentEvent: event,
              score,
            }
          }
          return {
            ...afterResult,
            phase: 'event' as GamePhase,
            currentEvent: event,
            currentEventIndex: 0,
          }
        }

        return {
          ...prev,
          phase: 'event' as GamePhase,
          currentEvent: event,
          currentEventIndex: 0,
        }
      }

      if (prev.phase === 'stageComplete') {
        const nextStageIndex = prev.currentStage + 1

        // Check if all stages done
        if (nextStageIndex >= STAGES_COUNT) {
          // Check time cutoff
          if (prev.timeElapsed > CUTOFF_TIME) {
            const endState = buildEndState('cutoff')
            const finalState = { ...prev, milesTraveled: TOTAL_MILES, endState }
            const score = calculateScore(finalState)
            return { ...finalState, phase: 'gameOver' as GamePhase, score }
          }
          // Finished!
          const endState = buildEndState('finished')
          const finalState = {
            ...prev,
            milesTraveled: TOTAL_MILES,
            vertRemaining: 0,
            currentStage: STAGES_COUNT,
            endState,
          }
          const score = calculateScore(finalState)
          return { ...finalState, phase: 'gameOver' as GamePhase, score }
        }

        // Advance to next stage
        const timePerStage = getTimeForStage(prev.pace)
        const stage = trailStages[nextStageIndex]
        const stageEvents = getEventsForStage(nextStageIndex)
        const newTime = prev.timeElapsed + timePerStage

        // Check time cutoff
        if (newTime > CUTOFF_TIME) {
          const endState = buildEndState('cutoff')
          const finalState = {
            ...prev,
            timeElapsed: newTime,
            currentStage: nextStageIndex,
            endState,
          }
          const score = calculateScore(finalState)
          return { ...finalState, phase: 'gameOver' as GamePhase, score }
        }

        // Apply stage drain
        const stateAtNewStage = {
          ...prev,
          currentStage: nextStageIndex,
          timeElapsed: newTime,
        }
        const drained = applyStageDrain(stateAtNewStage)

        // Check end conditions from stage drain
        const endCheck = checkEndConditions(drained)
        if (endCheck) {
          const endState = buildEndState(endCheck.type)
          const finalState = { ...drained, endState }
          const score = calculateScore(finalState)
          return {
            ...finalState,
            phase: 'gameOver' as GamePhase,
            score,
            eventLog: [...drained.eventLog, `Stage drain at ${stage.name} was too much.`],
          }
        }

        const vertPerStage = TOTAL_VERT / STAGES_COUNT
        return {
          ...drained,
          phase: 'traveling' as GamePhase,
          stageEvents,
          currentEventIndex: 0,
          currentEvent: null,
          milesTraveled: stage.mile,
          vertRemaining: Math.max(0, Math.round(TOTAL_VERT - vertPerStage * (nextStageIndex + 1))),
          eventLog: [
            ...drained.eventLog,
            `Arrived at ${stage.name} — Mile ${stage.mile}`,
          ],
        }
      }

      return prev
    })
  }, [])

  const makeChoice = useCallback((choiceIndex: number) => {
    setState((prev) => {
      const event = prev.currentEvent
      if (!event?.choices?.[choiceIndex]) return prev

      const result = resolveChoice(event, choiceIndex)
      const afterResult = applyEventResult(prev, result)

      // Check end conditions
      const endCheck = checkEndConditions(afterResult)
      if (endCheck) {
        const endState = buildEndState(endCheck.type)
        const finalState = { ...afterResult, endState }
        const score = calculateScore(finalState)
        return {
          ...finalState,
          phase: 'gameOver' as GamePhase,
          score,
        }
      }

      return {
        ...afterResult,
        phase: 'eventResult' as GamePhase,
      }
    })
  }, [])

  const acknowledgeResult = useCallback(() => {
    setState((prev) => {
      // If still in 'event' phase with an auto-event, show the result first
      if (prev.phase === 'event' && prev.lastResult) {
        return { ...prev, phase: 'eventResult' as GamePhase }
      }

      const nextIndex = prev.currentEventIndex + 1

      if (nextIndex < prev.stageEvents.length) {
        // More events in this stage
        const nextEvent = prev.stageEvents[nextIndex]

        // Handle auto-events
        if (!nextEvent.choices && nextEvent.autoEffect) {
          const result = resolveAutoEvent(nextEvent)
          const afterResult = applyEventResult(prev, result)

          const endCheck = checkEndConditions(afterResult)
          if (endCheck) {
            const endState = buildEndState(endCheck.type)
            const finalState = { ...afterResult, endState }
            const score = calculateScore(finalState)
            return {
              ...finalState,
              phase: 'gameOver' as GamePhase,
              currentEvent: nextEvent,
              currentEventIndex: nextIndex,
              score,
            }
          }
          return {
            ...afterResult,
            phase: 'event' as GamePhase,
            currentEvent: nextEvent,
            currentEventIndex: nextIndex,
          }
        }

        return {
          ...prev,
          phase: 'event' as GamePhase,
          currentEvent: nextEvent,
          currentEventIndex: nextIndex,
        }
      }

      // No more events — stage complete
      return {
        ...prev,
        phase: 'stageComplete' as GamePhase,
        lastResult: null,
      }
    })
  }, [])

  const useSupply = useCallback((id: string) => {
    setState((prev) => useSupplyEngine(prev, id))
  }, [])

  const playAgain = useCallback(() => {
    setState(createInitialState())
  }, [])

  return {
    state,
    startGame,
    selectCharacter,
    buySupply,
    removeSupply,
    confirmSupplies,
    selectPace,
    continueJourney,
    makeChoice,
    acknowledgeResult,
    useSupply,
    playAgain,
  }
}
