import type { Metadata } from 'next'
import './globals.css'
import CRTEffect from '@/components/CRTEffect'

export const metadata: Metadata = {
  title: 'The Ouray Trail',
  description: 'You have died of low vert.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <CRTEffect />
        {children}
      </body>
    </html>
  )
}
