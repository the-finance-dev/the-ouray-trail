'use client'

import type { GameScore, EndState } from '@/engine/types'

interface ResultScreenProps {
  score: GameScore
  endState: EndState
  eventLog: string[]
  onPlayAgain: () => void
}

function getHeaderStyle(type: EndState['type']): {
  title: string
  color: string
  border: string
} {
  switch (type) {
    case 'finished':
      return {
        title: 'FINISHER',
        color: 'text-crt-green',
        border: '',
      }
    case 'dnf':
      return {
        title: 'DNF',
        color: 'text-crt-amber',
        border: 'terminal-box-amber',
      }
    case 'cutoff':
      return {
        title: 'MISSED CUTOFF',
        color: 'text-crt-amber',
        border: 'terminal-box-amber',
      }
    case 'death':
      return {
        title: 'DECEASED',
        color: 'text-crt-red',
        border: 'terminal-box-red',
      }
  }
}

function formatTime(hours: number): string {
  const h = Math.floor(hours)
  const m = Math.round((hours - h) * 60)
  return `${h}h ${m.toString().padStart(2, '0')}m`
}

export default function ResultScreen({
  score,
  endState,
  eventLog,
  onPlayAgain,
}: ResultScreenProps) {
  const style = getHeaderStyle(endState.type)

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      {/* Result Header */}
      <div className={`terminal-box ${style.border} text-center`}>
        <div className={`text-4xl crt-glow mb-3 ${style.color}`}>
          {style.title}
        </div>
        <p className={`text-2xl ${style.color} mb-2`}>{endState.message}</p>
        <p className="text-xl text-crt-dim">{endState.detail}</p>
      </div>

      {/* Score Breakdown */}
      <div className="terminal-box">
        <div className="text-xl text-crt-green crt-glow mb-3">
          ════ SCORE ════
        </div>
        <div className="space-y-2 text-xl">
          <div className="flex justify-between">
            <span className="text-crt-dim">Character</span>
            <span>{score.characterName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-crt-dim">Pace</span>
            <span className="capitalize">{score.pace}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-crt-dim">Miles Completed</span>
            <span>{score.milesCompleted} / 100</span>
          </div>
          <div className="flex justify-between">
            <span className="text-crt-dim">Stages Completed</span>
            <span>{score.stagesCompleted} / 10</span>
          </div>
          <div className="flex justify-between">
            <span className="text-crt-dim">Time</span>
            <span>{formatTime(score.timeElapsed)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-crt-dim">Events Faced</span>
            <span>{score.eventsEncountered}</span>
          </div>

          <div className="text-crt-dim my-2">
            ────────────────────────────
          </div>

          <div className="flex justify-between">
            <span className="text-crt-dim">Suffering Index</span>
            <span className="text-crt-red">{score.sufferingIndex}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-crt-dim">Style Points</span>
            <span className="text-crt-amber">{score.stylePoints}</span>
          </div>
          <div className="flex justify-between text-2xl">
            <span className="text-crt-green crt-glow">Total Score</span>
            <span className="text-crt-green crt-glow">
              {score.totalScore}
            </span>
          </div>
        </div>
      </div>

      {/* Final Stats */}
      <div className="terminal-box">
        <div className="text-xl text-crt-green crt-glow mb-3">
          ════ FINAL STATS ════
        </div>
        <div className="grid grid-cols-2 gap-2 text-xl">
          {Object.entries(score.finalStats).map(([stat, value]) => {
            const color =
              value > 50
                ? 'text-crt-green'
                : value >= 25
                  ? 'text-crt-amber'
                  : 'text-crt-red'
            return (
              <div key={stat} className="flex justify-between">
                <span className="text-crt-dim capitalize">{stat}</span>
                <span className={color}>{Math.round(value)}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Event Log */}
      {eventLog.length > 0 && (
        <div className="terminal-box">
          <div className="text-xl text-crt-green crt-glow mb-3">
            ════ TRAIL LOG ════
          </div>
          <div className="max-h-48 overflow-y-auto space-y-1">
            {eventLog.map((entry, i) => (
              <p key={i} className="text-lg text-crt-dim">
                &gt; {entry}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Play Again */}
      <div className="text-center space-y-4">
        <button
          onClick={onPlayAgain}
          className="terminal-btn text-2xl px-8 py-3 tracking-wider"
        >
          RIDE AGAIN
        </button>
        <p className="text-lg text-crt-dim italic">
          &quot;Every finisher was once someone who didn&apos;t quit. Every
          DNF was someone who made a sensible decision.&quot;
        </p>
      </div>
    </div>
  )
}
