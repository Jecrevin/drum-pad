'use client'

import React, { useEffect, useState } from 'react'
import { sounds } from './data'
import Pad from '@/components/pad'
import Display from '@/components/display'
import Power from '@/components/power'

export default function Home (): React.JSX.Element {
  const [isOn, setIsOn] = useState(true)
  const [display, setDisplay] = useState('')

  useEffect(() => {
    document.addEventListener('keydown', (e: Event) => {
      const key = (e as KeyboardEvent).key
      const regExp = new RegExp(`${key}`, 'i')
      const name = sounds.find(sound => regExp.test(sound.key))?.name
      const pads = document.querySelectorAll<HTMLButtonElement>('.drum-pad')

      if (isOn && typeof name === 'string') setDisplay(name)
      for (const pad of pads.values()) {
        if (regExp.test(pad.id)) {
          pad.click()
          break
        }
      }
    })
  }, [])

  return (
      <main id='drum-machine' className='w-drum h-drum border-4 border-drum
      bg-gray-500'>
        <div id='keyboard' className='w-keyboard h-keyboard grid grid-cols-3
        justify-items-center items-center'>
          { sounds.map(obj =>
          <Pad key={obj.name} name={obj.name} source={obj.src} isOn={isOn}
          setDisplay={setDisplay}>{obj.key}</Pad>) }
        </div>
        <div id='pannel'>
          <Power isOn={isOn} onClick={() => {
            setDisplay('')
            setIsOn(!isOn)
          }} />
          <Display>{display}</Display>
        </div>
      </main>
  )
}
