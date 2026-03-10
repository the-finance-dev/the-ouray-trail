'use client'

import { useState } from 'react'
import type { EventResult } from '@/engine/types'
import TypewriterText from './TypewriterText'

interface EventResultDisplayProps {
  result: EventResult
  onContinue: () => void
}

function StatChange({ stat, value }: { stat: string; value: number }) {
  if (value === 0) return null
  const sign = value > 0 ? '+' : ''
  const color = value > 0 ? 'text-crt-green' : 'text-crt-red'
  return (
    <span className={`${color} text-xl`}>
      {sign}{value} {stat}
    </span>
  )
}

export default function EventResultDisplay({
  result,
  onContinue,
}: EventResultDisplayProps) {
  const [textComplete, setTextComplete] = useState(false)

  const effects = Object.entries(result.effects).filter(
    ([, v]) => v !== undefined && v !== 0
  )

  return (
    <div className="terminal-box">
      {/* Result Text */}
      <div className="mb-6">
        <TypewriterText
          text={result.resultText}
          speed={25}
          onComplete={() => setTextComplete(true)}
        />
      </div>

      {/* Stat Changes */}
      {textComplete && (
        <>
          {effects.length > 0 && (
            <div className="flex flex-wrap gap-4 mb-6 p-3 border border-crt-dim">
              {effects.map(([stat, value]) => (
                <StatChange key={stat} stat={stat} value={value as number} />
              ))}
            </div>
          )}

          <div className="text-center">
            <button
              onClick={onContinue}
              className="terminal-btn text-xl px-6 py-2"
            >
              CONTINUE
            </button>
          </div>
        </>
      )}
    </div>
  )
}
