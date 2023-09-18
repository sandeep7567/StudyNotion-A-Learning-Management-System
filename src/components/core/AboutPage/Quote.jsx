import React from 'react'
import { HighlightText } from '../HomePage/HighlightText'

const Quote = () => {
  return (
    <div className='w-10/12 lg:mt-20  pb-20 text-richblack-100 text-center font-inter text-3xl font-semibold'>
      <sup className='text-richblack-600'>"</sup>
      We are passionate about revolutionizing the way we learn. Our innovative platform 
      <HighlightText text={"combines technology"}/>,
      <span className='bg-gradient-to-b from-[#FF512F] via-[#F09819] to-[#F09819_100%] text-transparent bg-clip-text'>
        {" "}
        expertise
      </span>
      ,and community to create an
      <span className='bg-gradient-to-b from-[#E65C00] via-[#F9D423] to-[#F9D423] text-transparent bg-clip-text'>
        {" "}
        unparalleled educational experience.
      </span>
      <sup className='text-richblack-600'>"</sup>
    </div>
  )
}

export default Quote