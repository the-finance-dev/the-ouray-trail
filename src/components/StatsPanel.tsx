'use client'

import type { PlayerStats } from '@/engine/types'

interface StatsPanelProps {
  stats: PlayerStats
  timeElapsed: number
  cutoffTime: number
  milesTraveled: number
  totalMiles: number
  vertRemaining: number
  totalVert: number
  currentStage: number
}

function getBarColor(value: number): string {
  if (value > 50) return 'bg-crt-green'
  if (value >= 25) return 'bg-crt-amber'
  return 'bg-crt-red'
}

function getBarBorderColor(value: number): string {
  if (value > 50) return 'border-crt-green'
  if (value >= 25) return 'border-crt-amber'
  return 'border-crt-red'
}

function getTextColor(value: number): string {
  if (value > 50) return 'text-crt-green'
  if (value >= 25) return 'text-crt-amber'
  return 'text-crt-red'
}

function StatBar({ label, value }: { label: string; value: number }) {
  const clamped = Math.max(0, Math.min(100, value))
  return (
    <div className="flex items-center gap-3 text-lg">
      <span className={`w-24 text-right ${getTextColor(clamped)}`}>
        {label}
      </span>
      <div className={`stat-bar flex-1 ${getBarBorderColor(clamped)}`}>
        <div
          className={`stat-bar-fill ${getBarColor(clamped)}`}
          style={{ width: `${clamped}%` }}
        />
      </div>
      <span className={`w-10 text-right ${getTextColor(clamped)}`}>
        {Math.round(clamped)}
      </span>
    </div>
  )
}

function formatTime(hours: number): string {
  const h = Math.floor(hours)
  const m = Math.round((hours - h) * 60)
  return `${h}h ${m.toString().padStart(2, '0')}m`
}

export default function StatsPanel({
  stats,
  timeElapsed,
  cutoffTime,
  milesTraveled,
  totalMiles,
  vertRemaining,
  totalVert,
  currentStage,
}: StatsPanelProps) {
  const timeRemaining = cutoffTime - timeElapsed
  const timeColor =
    timeRemaining > 10
      ? 'text-crt-green'
      : timeRemaining > 5
        ? 'text-crt-amber'
        : 'text-crt-red'

  return (
    <div className="terminal-box text-lg">
      {/* Header */}
      <div className="text-center text-xl text-crt-green crt-glow mb-3">
        ════ RUNNER STATUS ════
      </div>

      {/* Stat Bars */}
      <div className="space-y-1">
        <StatBar label="Health" value={stats.health} />
        <StatBar label="Morale" value={stats.morale} />
        <StatBar label="Feet" value={stats.feet} />
        <StatBar label="Stomach" value={stats.stomach} />
        <StatBar label="Hydration" value={stats.hydration} />
      </div>

      {/* Separator */}
      <div className="text-crt-dim my-3">
        ────────────────────────────────
      </div>

      {/* Trail Info */}
      <div className="space-y-1 text-lg">
        <div className="flex justify-between">
          <span className="text-crt-dim">Trail</span>
          <span>
            Mile {Math.round(milesTraveled)} / {totalMiles}
          </span>
        </div>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{
              width: `${(milesTraveled / totalMiles) * 100}%`,
            }}
          />
        </div>
        <div className="flex justify-between">
          <span className="text-crt-dim">Vert Left</span>
          <span>
            {vertRemaining.toLocaleString()} / {totalVert.toLocaleString()} ft
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-crt-dim">Time</span>
          <span className={timeColor}>
            {formatTime(timeElapsed)} / {formatTime(cutoffTime)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-crt-dim">Stage</span>
          <span>{currentStage + 1} / 10</span>
        </div>
      </div>
    </div>
  )
}
