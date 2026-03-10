'use client'

import useGame from '@/hooks/useGame'
import TitleScreen from '@/components/TitleScreen'
import CharacterSelect from '@/components/CharacterSelect'
import SupplyShop from '@/components/SupplyShop'
import PaceSelect from '@/components/PaceSelect'
import TravelingDisplay from '@/components/TravelingDisplay'
import EventDisplay from '@/components/EventDisplay'
import EventResultDisplay from '@/components/EventResultDisplay'
import StageCompleteDisplay from '@/components/StageCompleteDisplay'
import ResultScreen from '@/components/ResultScreen'
import StatsPanel from '@/components/StatsPanel'
import { trailStages } from '@/data/locations'

export default function Home() {
  const {
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
  } = useGame()

  const showStats =
    state.phase === 'traveling' ||
    state.phase === 'event' ||
    state.phase === 'eventResult' ||
    state.phase === 'stageComplete'

  const currentStage = trailStages[state.currentStage] ?? trailStages[0]

  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Title Screen */}
        {state.phase === 'title' && <TitleScreen onStart={startGame} />}

        {/* Character Select */}
        {state.phase === 'characterSelect' && (
          <CharacterSelect onSelect={selectCharacter} />
        )}

        {/* Supply Shop */}
        {state.phase === 'supplyShop' && (
          <SupplyShop
            budget={state.budget}
            supplies={state.supplies}
            onBuy={buySupply}
            onRemove={removeSupply}
            onContinue={confirmSupplies}
          />
        )}

        {/* Pace Select */}
        {state.phase === 'paceSelect' && (
          <PaceSelect onSelect={selectPace} />
        )}

        {/* Stats Panel — shown during gameplay phases */}
        {showStats && (
          <div className="mb-6">
            <StatsPanel
              stats={state.stats}
              timeElapsed={state.timeElapsed}
              cutoffTime={state.cutoffTime}
              milesTraveled={state.milesTraveled}
              totalMiles={state.totalMiles}
              vertRemaining={state.vertRemaining}
              totalVert={state.totalVert}
              currentStage={state.currentStage}
            />
          </div>
        )}

        {/* Traveling */}
        {state.phase === 'traveling' && (
          <TravelingDisplay
            key={state.currentStage}
            stage={currentStage}
            onContinue={continueJourney}
          />
        )}

        {/* Event */}
        {state.phase === 'event' && state.currentEvent && (
          <EventDisplay
            key={`${state.currentEvent.id}-${state.currentEventIndex}`}
            event={state.currentEvent}
            onChoice={makeChoice}
            onContinue={acknowledgeResult}
          />
        )}

        {/* Event Result */}
        {state.phase === 'eventResult' && state.lastResult && (
          <EventResultDisplay
            key={`result-${state.currentEventIndex}`}
            result={state.lastResult}
            onContinue={acknowledgeResult}
          />
        )}

        {/* Stage Complete */}
        {state.phase === 'stageComplete' && (
          <StageCompleteDisplay
            key={`stage-${state.currentStage}`}
            stage={currentStage}
            stats={state.stats}
            supplies={state.supplies}
            onContinue={continueJourney}
            onUseSupply={useSupply}
          />
        )}

        {/* Game Over */}
        {state.phase === 'gameOver' && state.endState && state.score && (
          <ResultScreen
            score={state.score}
            endState={state.endState}
            eventLog={state.eventLog}
            onPlayAgain={playAgain}
          />
        )}
      </div>
    </main>
  )
}
