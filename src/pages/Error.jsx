import React from 'react'
import Spinner from '../components/Common/Spinner'

const Error = () => {
  return (
    <div className='flex flex-col justify-center items-center w-screen h-screen'>
      <Spinner className={""}/>
      <div className='flex justify-center items-center text-3xl 
                      text-richblack-5 bg-richblack-900'>
        Error 404 - Page Not Found
      </div>
    </div>
  )
}

export default Error