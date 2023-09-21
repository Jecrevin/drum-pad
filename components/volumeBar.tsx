/* eslint-disable @typescript-eslint/no-non-null-assertion */
'use client'

import React, { useEffect, useState } from 'react'

export default function VolumeBar ({
  setVolume,
  setDisplay
}: {
  setVolume: React.Dispatch<React.SetStateAction<number>>
  setDisplay: React.Dispatch<React.SetStateAction<string>>
}): React.JSX.Element {
  const [mouseDown, setMouseDown] = useState(false)
  let displayTask: NodeJS.Timeout

  useEffect(() => {
    window.addEventListener('mouseup', () => {
      setMouseDown(false)
    })
  }, [])

  useEffect(() => {
    if (mouseDown) { window.addEventListener('mousemove', changeVolume) }
    return () => { window.removeEventListener('mousemove', changeVolume) }
  }, [mouseDown])

  function changeVolume (e: MouseEvent | React.MouseEvent): void {
    console.log(displayTask)
    if (displayTask != null) {
      console.log('clearing time out!')
      clearTimeout(displayTask)
    }
    const bar = document.getElementById('volume-bar')!
    const barRect = bar.getBoundingClientRect()
    const slider = bar.firstElementChild as HTMLElement
    const sliderWidth = slider.getBoundingClientRect().width
    const pos = e.clientX

    if (pos < barRect.left || pos > barRect.right) return
    slider.style.left = pos - sliderWidth / 2 - barRect.left + 'px'
    const volume = parseFloat(((pos - barRect.left) / barRect.width).toFixed(2))
    setVolume(volume)
    setDisplay(`Volume: ${Math.ceil(volume * 100)}%`)
    displayTask = setTimeout(() => { setDisplay('') }, 1000)
    console.log(displayTask)
  }

  return (
    <div className='w-volume h-volume shadow rounded-sm bg-gradient-to-b
    from-neutral-600 via-neutral-500 to-neutral-600 hover:cursor-pointer'
    id='volume-bar' onMouseDown={(e: React.MouseEvent) => {
      changeVolume(e)
      setMouseDown(true)
    }}>
      <div className='w-2 h-bar bg-blue-700 rounded-sm relative left-full
      top-[-7.5px] shadow-[0_0_5px_rgba(0,0,0,0.5)]' id='volume-slider' />
    </div>
  )
}
