'use client'

import { useState } from 'react'
import { characters } from '@/data/characters'
import type { Character } from '@/engine/types'

interface CharacterSelectProps {
  onSelect: (characterId: string) => void
}

function StatModifier({ stat, value }: { stat: string; value: number }) {
  const color = value > 0 ? 'text-crt-green' : 'text-crt-red'
  const sign = value > 0 ? '+' : ''
  return (
    <span className={`${color} text-lg`}>
      {sign}{value} {stat}
    </span>
  )
}

function CharacterCard({
  character,
  isHovered,
  onHover,
  onSelect,
}: {
  character: Character
  isHovered: boolean
  onHover: (id: string | null) => void
  onSelect: (id: string) => void
}) {
  const modifiers = Object.entries(character.statModifiers).filter(
    ([, v]) => v !== 0
  )

  return (
    <button
      className={`terminal-box text-left w-full transition-all ${
        isHovered ? 'selected border-crt-amber' : ''
      }`}
      onMouseEnter={() => onHover(character.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(character.id)}
      onClick={() => onSelect(character.id)}
    >
      {/* Name and tagline */}
      <div className="text-2xl text-crt-green crt-glow mb-1">
        {character.name}
      </div>
      <div className="text-lg text-crt-amber mb-2 italic">
        &quot;{character.tagline}&quot;
      </div>

      {/* Description */}
      <p className="text-lg text-crt-dim mb-3">{character.description}</p>

      {/* Stat modifiers */}
      <div className="flex flex-wrap gap-3 mb-2">
        {modifiers.map(([stat, value]) => (
          <StatModifier key={stat} stat={stat} value={value as number} />
        ))}
        {character.budgetBonus !== 0 && (
          <StatModifier stat="budget" value={character.budgetBonus} />
        )}
      </div>

      {/* Special trait */}
      {character.specialTrait && (
        <div className="text-lg text-crt-blue mt-1">
          [{character.specialTrait}]
        </div>
      )}
    </button>
  )
}

export default function CharacterSelect({ onSelect }: CharacterSelectProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl text-crt-green crt-glow mb-2">
          CHOOSE YOUR RUNNER
        </h1>
        <p className="text-xl text-crt-dim">
          Each one is a different kind of wrong.
        </p>
      </div>

      {/* Character Grid */}
      <div className="space-y-4">
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            isHovered={hoveredId === character.id}
            onHover={setHoveredId}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  )
}
