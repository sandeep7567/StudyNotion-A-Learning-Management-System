import React from 'react'
import IconButton from './IconButton'
// import { VscSignOut, VscTrash } from 'react-icons/vsc'
import { MdOutlineCancel } from 'react-icons/md'

const ConfirmationModal = ({
  id,
  children,
  text1,
  text2,
  text3,
  text4,
  text1Classes,
  text2AND3Classes,
  text4Classes,
  btn1Text,
  btn2Text,
  btn1Handler,
  btn2Handler,
  btn1Classes,
  btn2Classes,
  Icon,
  IconSymbol,
  customClasses,
}) => {
  
  return (
    <div className='z-[100] flex w-full fixed overflow-y-hidden overflow-x-auto border-2 border-white inset-0 justify-center items-center backdrop-blur-sm filter  text-white'>
      <div className={`${customClasses && id === 2 && `${customClasses}` || `bg-richblack-900
      tracking-widest w-11/12 max-w-lg h-2/5 flex flex-col gap-10 aspect-square
      py-16 justify-center items-center rounded-3xl border-b border-r 
      border-richblack-100 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] 
      hover:scale-110 transition-all duration-200`}`}
    >
        {
          IconSymbol && 
            <div className='p-3 mb-4 bg-pink-700 flex mx-auto my-auto w-fit rounded-full'>
              <Icon fontSize={35} fill="#EF476F" />
            </div>
        }
        {text1 && <p className={`${text1Classes && id === 2 && `${text1Classes}` || "text-4xl font-inter leading-6 text-richblack-5 font-bold"} `}>
          {text1}
        </p>}
        {text2 && <p className={`${text2AND3Classes && id === 2 && `${text2AND3Classes}`}`}>
          {text2}
        </p>}
        {text3 && <p className={`${text2AND3Classes && id === 2 && `${text2AND3Classes}`}`}>
          {text3}
        </p>}
        {text4 && <p className={`${text4Classes && id === 2 && `${text4Classes}` || 'text-richblack-300 tracking-wider text-lg font-extralight font-inter leading-6'}`}>
          {text4}
        </p>}
        <div className='flex gap-10 w-full mt-10 justify-center items-center'>

          <IconButton
            onclick={btn1Handler}
            text={btn1Text}
            customClasses={`${btn1Classes && id === 2 && `${btn1Classes}`
            || `bg-yellow-50 text-richblack-900 text-base font-medium 
            flex flex-row-reverse px-5 py-2 my-auto rounded-lg shadow-[-0.5px_-1.5px_0px_0px_rgba(0,0,0,1)_inset]
            justify-center items-center gap-2 transition-all duration-200 hover:bg-yellow-100` } `}
          >
            {<Icon size={"1.125rem"}/>}
          </IconButton>

          <button
            onClick={btn2Handler}
            className={`${btn2Classes && id === 2 && `${btn2Classes}` || `bg-yellow-50 text-richblack-900 text-base font-medium flex flex-row-reverse px-5 py-2 my-auto rounded-lg shadow-[-0.5px_-1.5px_0px_0px_rgba(0,0,0,1)_inset] justify-center items-center gap-2 transition-all duration-200 hover:bg-yellow-100`} `}
          >
            {btn2Text}
            <MdOutlineCancel size={"1.125rem"}/>
          </button>
        </div>
      </div>

    </div>
  )
}

export default ConfirmationModal