'use client'

import React, { useEffect, useState } from 'react'
import { sounds } from './data'
import Pad from '@/components/pad'
import Display from '@/components/display'
import Power from '@/components/power'
import VolumeBar from '@/components/volumeBar'

export default function Home (): React.JSX.Element {
  // An variable shows if the drum turns on.
  const [isOn, setIsOn] = useState(true)
  // The content to display.
  const [display, setDisplay] = useState('')
  // The current volume of pad drum.
  const [volume, setVolume] = useState(1.0)

  // Add an event listener to beat the drum when the corresponding key is down.
  useEffect(() => {
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      const key = e.key
      const regExp = new RegExp(`${key}`, 'i')
      const pads = document.querySelectorAll<HTMLButtonElement>('.drum-pad')

      for (const pad of pads.values()) {
        if (regExp.test(pad.id)) {
          pad.click()
          break
        }
      }
    })
  }, [])

  /** Change the volume of every `audio` element when the drum pad's volume
   * changing. */
  useEffect(() => {
    const pads = document.querySelectorAll<HTMLButtonElement>('.drum-pad')
    for (const pad of pads.values()) {
      const audio = pad.children.item(0) as HTMLAudioElement
      audio.volume = volume
    }
  }, [volume])

  return (
      <main id='drum-machine' className='md:w-drum md:h-drum w-3/5
      p-10 border-4 border-drum bg-gray-500 flex flex-wrap items-center
      justify-evenly'>
        <div id='keyboard' className='w-keyboard h-keyboard grid grid-cols-3
        justify-items-center items-center'>
          { sounds.map(obj =>
          <Pad key={obj.name} name={obj.name} source={obj.src} isOn={isOn}
          setDisplay={setDisplay}>{obj.key}</Pad>) }
        </div>
        <div id='pannel' className='md:h-full h-[300px] flex flex-col
        justify-evenly items-center'>
          <Power isOn={isOn} onClick={() => {
            setDisplay('')
            setIsOn(!isOn)
          }} />
          <Display>{display}</Display>
          <VolumeBar setVolume={setVolume} setDisplay={setDisplay}
          isOn={isOn} />
        </div>
      </main>
  )
}
