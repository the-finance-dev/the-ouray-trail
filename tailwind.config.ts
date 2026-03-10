import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        crt: {
          green: '#33ff33',
          amber: '#ffb000',
          red: '#ff4444',
          dark: '#0a0a0a',
          darkgreen: '#0d3d0d',
          dim: '#1a8a1a',
          blue: '#4488ff',
        },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        scanline: 'scanline 8s linear infinite',
        flicker: 'flicker 0.15s infinite',
        typewriter: 'typewriter 0.05s steps(1)',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        flicker: {
          '0%': { opacity: '0.97' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0.98' },
        },
      },
    },
  },
  plugins: [],
}
export default config
