'use client'

import { useState } from 'react'
import { paceOptions } from '@/data/supplies'
import type { Pace } from '@/engine/types'

interface PaceSelectProps {
  onSelect: (pace: Pace) => void
}

export default function PaceSelect({ onSelect }: PaceSelectProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl text-crt-green crt-glow mb-2">
          CHOOSE YOUR PACE
        </h1>
        <p className="text-xl text-crt-dim">
          How fast do you want to learn your limits?
        </p>
      </div>

      {/* Pace Options */}
      <div className="space-y-4">
        {paceOptions.map((pace) => (
          <button
            key={pace.id}
            className={`terminal-box text-left w-full transition-all ${
              hoveredId === pace.id ? 'selected border-crt-amber' : ''
            }`}
            onMouseEnter={() => setHoveredId(pace.id)}
            onMouseLeave={() => setHoveredId(null)}
            onFocus={() => setHoveredId(pace.id)}
            onClick={() => onSelect(pace.id)}
          >
            <div className="text-2xl text-crt-green crt-glow mb-1">
              {pace.name}
            </div>
            <p className="text-xl text-crt-dim mb-3">{pace.description}</p>
            <div className="text-lg text-crt-amber">{pace.bonusText}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
