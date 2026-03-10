'use client'

import type { TrailStage, PlayerStats, OwnedSupply } from '@/engine/types'

interface StageCompleteDisplayProps {
  stage: TrailStage
  stats: PlayerStats
  supplies: OwnedSupply[]
  onContinue: () => void
  onUseSupply: (id: string) => void
}

export default function StageCompleteDisplay({
  stage,
  stats,
  supplies,
  onContinue,
  onUseSupply,
}: StageCompleteDisplayProps) {
  const usableSupplies = supplies.filter(
    (s) => s.supply.usableInGame && s.quantity > 0
  )

  // Quick stat check for warnings
  const warnings: string[] = []
  if (stats.health < 25) warnings.push('Health is critically low!')
  if (stats.feet < 25) warnings.push('Your feet are destroyed.')
  if (stats.stomach < 25) warnings.push('Your stomach is revolting.')
  if (stats.hydration < 25) warnings.push('Dangerously dehydrated.')
  if (stats.morale < 25) warnings.push('Why are you even out here?')

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="terminal-box text-center">
        <div className="text-3xl text-crt-green crt-glow mb-2">
          STAGE COMPLETE
        </div>
        <div className="text-xl text-crt-dim">
          {stage.name} — Mile {stage.mile}
        </div>
      </div>

      {/* Warnings */}
      {warnings.length > 0 && (
        <div className="terminal-box terminal-box-red">
          <div className="text-xl text-crt-red mb-2">WARNING</div>
          {warnings.map((w, i) => (
            <p key={i} className="text-lg text-crt-red">
              {w}
            </p>
          ))}
        </div>
      )}

      {/* Usable Supplies */}
      {usableSupplies.length > 0 && (
        <div className="terminal-box">
          <div className="text-xl text-crt-amber mb-3">
            USE SUPPLIES
          </div>
          <div className="space-y-2">
            {usableSupplies.map((owned) => {
              const effectList = Object.entries(owned.supply.effects)
                .filter(([, v]) => v !== 0)
                .map(([stat, value]) => {
                  const sign = (value as number) > 0 ? '+' : ''
                  return `${sign}${value} ${stat}`
                })
                .join(', ')

              return (
                <div
                  key={owned.supply.id}
                  className="flex items-center justify-between py-1"
                >
                  <div>
                    <span className="text-xl text-crt-green">
                      {owned.supply.name}
                    </span>
                    <span className="text-lg text-crt-dim ml-2">
                      x{owned.quantity}
                    </span>
                    <span className="text-lg text-crt-dim ml-3">
                      ({effectList})
                    </span>
                  </div>
                  <button
                    onClick={() => onUseSupply(owned.supply.id)}
                    className="terminal-btn text-lg px-3 py-1"
                  >
                    USE
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Continue */}
      <div className="text-center">
        <button
          onClick={onContinue}
          className="terminal-btn text-2xl px-8 py-3 tracking-wider"
        >
          CONTINUE TO NEXT STAGE
        </button>
      </div>
    </div>
  )
}
