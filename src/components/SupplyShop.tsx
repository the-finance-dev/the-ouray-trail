'use client'

import { supplies as allSupplies } from '@/data/supplies'
import type { OwnedSupply } from '@/engine/types'

interface SupplyShopProps {
  budget: number
  supplies: OwnedSupply[]
  onBuy: (supplyId: string) => void
  onRemove: (supplyId: string) => void
  onContinue: () => void
}

export default function SupplyShop({
  budget,
  supplies: ownedSupplies,
  onBuy,
  onRemove,
  onContinue,
}: SupplyShopProps) {
  function getOwnedQuantity(supplyId: string): number {
    const owned = ownedSupplies.find((s) => s.supply.id === supplyId)
    return owned?.quantity ?? 0
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl text-crt-green crt-glow mb-1">
          OURAY GENERAL STORE
        </h1>
        <p className="text-xl text-crt-dim">Choose wisely. Or don&apos;t.</p>
      </div>

      {/* Budget */}
      <div className="terminal-box-amber terminal-box text-center mb-6">
        <span className="text-2xl text-crt-amber">
          TRAIL CREDITS: ${budget}
        </span>
      </div>

      {/* Supply List */}
      <div className="space-y-3 mb-8">
        {allSupplies.map((supply) => {
          const qty = getOwnedQuantity(supply.id)
          const canBuy = budget >= supply.cost && qty < supply.maxQuantity
          const canRemove = qty > 0

          return (
            <div key={supply.id} className="terminal-box">
              <div className="flex justify-between items-start mb-1">
                <span className="text-xl text-crt-green crt-glow">
                  {supply.name}
                </span>
                <span className="text-xl text-crt-amber ml-4 shrink-0">
                  ${supply.cost}
                </span>
              </div>
              <p className="text-lg text-crt-dim mb-2">{supply.description}</p>

              {/* Effects preview */}
              <div className="flex flex-wrap gap-2 mb-2">
                {Object.entries(supply.effects)
                  .filter(([, v]) => v !== 0)
                  .map(([stat, value]) => {
                    const sign = (value as number) > 0 ? '+' : ''
                    const color =
                      (value as number) > 0 ? 'text-crt-green' : 'text-crt-red'
                    return (
                      <span key={stat} className={`${color} text-lg`}>
                        {sign}
                        {value} {stat}
                      </span>
                    )
                  })}
              </div>

              {/* Quantity and Buttons */}
              <div className="flex items-center justify-between">
                <span className="text-lg text-crt-dim">
                  Owned: {qty} / {supply.maxQuantity}
                  {supply.usableInGame && (
                    <span className="text-crt-blue ml-2">[usable]</span>
                  )}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => onRemove(supply.id)}
                    disabled={!canRemove}
                    className={`terminal-btn text-lg px-3 py-1 ${
                      canRemove
                        ? 'terminal-btn-amber'
                        : 'opacity-30 cursor-not-allowed border-crt-dim text-crt-dim'
                    }`}
                  >
                    -
                  </button>
                  <button
                    onClick={() => onBuy(supply.id)}
                    disabled={!canBuy}
                    className={`terminal-btn text-lg px-3 py-1 ${
                      canBuy
                        ? ''
                        : 'opacity-30 cursor-not-allowed border-crt-dim text-crt-dim'
                    }`}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Continue Button */}
      <div className="text-center">
        <button
          onClick={onContinue}
          className="terminal-btn text-2xl px-8 py-3 tracking-wider"
        >
          HIT THE TRAIL
        </button>
      </div>
    </div>
  )
}
