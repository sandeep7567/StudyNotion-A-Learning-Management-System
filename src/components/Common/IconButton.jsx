import React from 'react'

const IconButton = ({
  text,
  onclick,
  children,
  disabled,
  outline=false,
  customClasses,
  type,
}) => {
  
  return (
    <button
      disabled={disabled}
      onClick={onclick}
      type={type}
      className={customClasses}
    >
      {
        children 
          ? (
            <>
              <span>
                {text}
              </span>
              {children}
            </>
          ) 
          : (text)
      }
    </button>
  )
}

export default IconButton