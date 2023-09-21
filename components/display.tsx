import React from 'react'

export default function Display ({ children }: {
  children: React.ReactNode
}): React.JSX.Element {
  return (
    <div className='w-display h-display bg-neutral-400 text-center flex
    justify-center items-center shadow-[0_0_5px_rgba(0,0,0,0.5)]' id='display'>
      <p>{children}</p>
    </div>
  )
}
