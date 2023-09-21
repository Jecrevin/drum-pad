import './globals.sass'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Jecrevin: Drum Machine',
  description: 'Jecrevin\'s online drum pad'
}

export default function RootLayout ({ children }: {
  children: React.ReactNode
}): React.JSX.Element {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
