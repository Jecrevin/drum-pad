'use client'

import React, { type MouseEventHandler, useEffect } from 'react'

export default function Power ({
  isOn,
  onClick
}: {
  isOn: boolean
  onClick: MouseEventHandler<HTMLButtonElement>
}): React.JSX.Element {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const power = document.getElementById('power')!
    const [color1, color2] = isOn ? ['black', 'blue'] : ['blue', 'black']
    power.style.background = `linear-gradient(90deg, ${color1} 0%,
      ${color1} 50%, ${color2} 50%, ${color2} 100%)`
  }, [isOn])

  return (
    <div className='flex flex-col justify-center'>
      <p>Power</p>
      <button id='power' className='w-power h-power border-black border-4'
      onClick={onClick}/>
    </div>
  )
}
