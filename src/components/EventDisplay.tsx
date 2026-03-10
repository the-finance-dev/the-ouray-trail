'use client'

import { useState } from 'react'
import type { GameEvent } from '@/engine/types'
import TypewriterText from './TypewriterText'

interface EventDisplayProps {
  event: GameEvent
  onChoice: (index: number) => void
  onContinue: () => void
}

export default function EventDisplay({
  event,
  onChoice,
  onContinue,
}: EventDisplayProps) {
  const [textComplete, setTextComplete] = useState(false)
  const hasChoices = event.choices && event.choices.length > 0

  return (
    <div className="terminal-box">
      {/* Event Category */}
      <div className="text-lg text-crt-dim mb-3 uppercase tracking-widest">
        [{event.category}]
      </div>

      {/* Event Text */}
      <div className="mb-6">
        <TypewriterText
          text={event.text}
          speed={25}
          onComplete={() => setTextComplete(true)}
        />
      </div>

      {/* Choices or Continue */}
      {textComplete && (
        <div className="space-y-3 mt-4">
          {hasChoices ? (
            <>
              <div className="text-xl text-crt-amber mb-2">
                What do you do?
              </div>
              {event.choices!.map((choice, index) => (
                <button
                  key={index}
                  onClick={() => onChoice(index)}
                  className="terminal-btn w-full text-left text-xl py-2 px-4"
                >
                  [{index + 1}] {choice.text}
                </button>
              ))}
            </>
          ) : (
            <div className="text-center">
              <button
                onClick={onContinue}
                className="terminal-btn text-xl px-6 py-2"
              >
                CONTINUE
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
