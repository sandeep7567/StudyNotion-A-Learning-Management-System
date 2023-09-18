import React from 'react'

export const HighlightText = ({text}) => {
  return (
    <span className='font-bold inline-block  bg-richblack-5 bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text'>
      {text}
    </span>
  )
}
