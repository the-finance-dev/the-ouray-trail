'use client'

import { useState } from 'react'
import type { TrailStage } from '@/engine/types'
import TypewriterText from './TypewriterText'

interface TravelingDisplayProps {
  stage: TrailStage
  onContinue: () => void
}

export default function TravelingDisplay({
  stage,
  onContinue,
}: TravelingDisplayProps) {
  const [textComplete, setTextComplete] = useState(false)

  return (
    <div className="terminal-box">
      {/* Stage Header */}
      <div className="text-center mb-4">
        <div className="text-lg text-crt-dim mb-1">
          STAGE {stage.id + 1} / 10
        </div>
        <h2 className="text-3xl text-crt-green crt-glow mb-2">{stage.name}</h2>
        <div className="text-xl text-crt-amber">
          Elevation: {stage.elevation} — Mile {stage.mile}
        </div>
      </div>

      {/* Separator */}
      <div className="text-crt-dim text-center my-4">
        ════════════════════════════════
      </div>

      {/* Description */}
      <div className="mb-4">
        <TypewriterText
          text={stage.description}
          speed={30}
          onComplete={() => setTextComplete(true)}
        />
      </div>

      {/* Aid Station Notice */}
      {stage.hasAidStation && (
        <div className="terminal-box-amber terminal-box text-center my-4">
          <span className="text-xl text-crt-amber">
            AID STATION AVAILABLE
          </span>
        </div>
      )}

      {/* Flavor Text */}
      {textComplete && (
        <p className="text-lg text-crt-dim italic mt-4 mb-6">
          &quot;{stage.flavor}&quot;
        </p>
      )}

      {/* Continue */}
      {textComplete && (
        <div className="text-center mt-6">
          <button
            onClick={onContinue}
            className="terminal-btn text-xl px-6 py-2"
          >
            CONTINUE
          </button>
        </div>
      )}
    </div>
  )
}
