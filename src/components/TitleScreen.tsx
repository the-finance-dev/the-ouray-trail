'use client'

interface TitleScreenProps {
  onStart: () => void
}

const ASCII_TITLE = `
  _____ _             ___                          _____          _ _
 |_   _| |__   ___   / _ \\ _   _ _ __ __ _ _   _  |_   _| __ __ _(_) |
   | | | '_ \\ / _ \\ | | | | | | | '__/ _\` | | | |   | || '__/ _\` | | |
   | | | | | |  __/ | |_| | |_| | | | (_| | |_| |   | || | | (_| | | |
   |_| |_| |_|\\___|  \\___/ \\__,_|_|  \\__,_|\\__, |   |_||_|  \\__,_|_|_|
                                            |___/
`.trim()

export default function TitleScreen({ onStart }: TitleScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      {/* ASCII Title */}
      <pre className="text-crt-green crt-glow text-[0.5rem] sm:text-sm md:text-base leading-tight mb-6 select-none overflow-x-auto max-w-full">
        {ASCII_TITLE}
      </pre>

      {/* Subtitle */}
      <p className="text-xl text-crt-dim mb-8">
        A game of mountain suffering and questionable decisions
      </p>

      {/* Tagline */}
      <p className="text-2xl text-crt-amber animate-blink mb-12">
        You have died of vert.
      </p>

      {/* Start Button */}
      <button
        onClick={onStart}
        className="terminal-btn text-2xl px-8 py-3 tracking-widest"
      >
        PRESS START
      </button>

      {/* Footer */}
      <div className="mt-16 space-y-2">
        <p className="text-lg text-crt-dim">
          OURAY, COLORADO — ELEVATION 7,792 FT
        </p>
        <p className="text-lg text-crt-dim">
          Inspired by the Ouray 100 Mile Endurance Run
        </p>
      </div>
    </div>
  )
}
