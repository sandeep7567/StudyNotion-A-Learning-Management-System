import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({children, active, linkto}) => {
  return (
    <div>
      <Link to={linkto} >

        <div className={`text-center text-[13px] px-6 py-3 rounded-md font-bold hover:scale-95
        shadow-[inset_-2px_-2px_0_0_rgba(255,255,255,0.51)] transition-all duration-200
        ${active? ("bg-yellow-50 text-black") : ("bg-richblack-800")}
        `}>
          {children}
        </div>

      </Link>
    </div>
  )
}

export default Button