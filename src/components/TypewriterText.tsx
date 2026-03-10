'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

interface TypewriterTextProps {
  text: string
  speed?: number
  onComplete?: () => void
  className?: string
}

export default function TypewriterText({
  text,
  speed = 30,
  onComplete,
  className = '',
}: TypewriterTextProps) {
  const [displayedLength, setDisplayedLength] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const onCompleteRef = useRef(onComplete)

  // Keep callback ref up to date without triggering effects
  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    if (displayedLength >= text.length) {
      if (!isComplete) {
        setIsComplete(true)
        onCompleteRef.current?.()
      }
      return
    }

    const timer = setTimeout(() => {
      setDisplayedLength((prev) => prev + 1)
    }, speed)

    return () => clearTimeout(timer)
  }, [displayedLength, text.length, speed, isComplete])

  // Reset when text changes
  useEffect(() => {
    setDisplayedLength(0)
    setIsComplete(false)
  }, [text])

  const skipAnimation = useCallback(() => {
    if (!isComplete) {
      setDisplayedLength(text.length)
      setIsComplete(true)
      onCompleteRef.current?.()
    }
  }, [isComplete, text.length])

  return (
    <p
      className={`crt-glow text-xl ${className}`}
      onClick={skipAnimation}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') skipAnimation()
      }}
    >
      {text.slice(0, displayedLength)}
      {!isComplete && (
        <span className="animate-blink text-crt-green">&#9608;</span>
      )}
    </p>
  )
}
