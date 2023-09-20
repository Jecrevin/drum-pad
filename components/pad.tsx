'use client'

import React, { type FormEvent } from 'react'

export default function Pad ({
  children,
  name,
  source,
  isOn,
  setDisplay
}: {
  children: React.ReactNode
  name: string
  source: string
  isOn: boolean
  setDisplay: React.Dispatch<React.SetStateAction<string>>
}): React.JSX.Element {
  function handleClick (e: FormEvent<HTMLButtonElement>): void {
    const target = e.target as HTMLButtonElement
    const audio = target.children.item(0) as HTMLAudioElement
    if (!isOn) return
    if (!audio.paused) {
      audio.pause()
      audio.currentTime = 0
    }
    audio.play().then(() => { setDisplay(name) },
      () => { alert('failed to play:(') })
  }

  return (
    <button className='drum-pad bg-neutral-400 w-pad h-pad rounded-lg'
    id={children as string} onClick={handleClick}>
      {children}
      <audio className='clap' src={source}></audio>
    </button>
  )
}
