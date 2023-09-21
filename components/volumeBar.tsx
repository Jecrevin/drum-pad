/* eslint-disable @typescript-eslint/no-non-null-assertion */
'use client'

import React, { useEffect, useState } from 'react'

export default function VolumeBar ({
  isOn,
  setVolume,
  setDisplay
}: {
  isOn: boolean
  setVolume: React.Dispatch<React.SetStateAction<number>>
  setDisplay: React.Dispatch<React.SetStateAction<string>>
}): React.JSX.Element {
  // An variable shows if the volume will be changed by slide the volume bar.
  const [mouseDown, setMouseDown] = useState(false)
  /** To show the current volume on `Display`. Usefull when changing the volume
   * frequently */
  const [displayTask, setDisplayTask] = useState<NodeJS.Timeout>()

  useEffect(() => {
    window.addEventListener('mouseup', () => { setMouseDown(false) })
  }, [])

  /** When the mouse is pressed, making the volume can be continuously changed
   * when slide the bar. To avoid permanently changing the volume, remove the
   * `event listener` when the mouse is released. */
  useEffect(() => {
    if (mouseDown) { window.addEventListener('mousemove', changeVolume) }
    return () => { window.removeEventListener('mousemove', changeVolume) }
  }, [mouseDown])

  /** A function that realy do the part of changing the volume and the position
   * of slide bar. */
  function changeVolume (e: MouseEvent | React.MouseEvent): void {
    if (!isOn) return
    if (displayTask !== undefined) clearTimeout(displayTask)

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
    setDisplayTask(setTimeout(() => { setDisplay('') }, 2000))
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
