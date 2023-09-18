import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { RxCross2 } from "react-icons/rx"
 
const RequirementField = ({label, name, type, register, errors, setValue, getValues}) => {

  const [requirement, setRequirement] = useState("");
  const [requirementList, setRequirementList] = useState([]);

  useEffect(() => {
    register(name, {
      required: true,
      validate: (value) => value.length > 0
    })
  }, [])
  
  useEffect(() => {
    setValue(name, requirementList);
  }, [requirementList])

  // handleAddRequirement
  const handleAddRequirement = () => {
    
    if(requirement) {
      setRequirementList([...requirementList, requirement]);
      setRequirement("");
    }
  }

  // handleRemoveRequirement
  const handleRemoveRequirement = (index) => {
    const updatedRequirementList = [...requirementList]
    updatedRequirementList.splice(index, 1);
    setRequirementList(updatedRequirementList)
  }

  return (
    <div>

      <label htmlFor={name}>{label}<sup>*</sup></label>
      <div className='flex flex-col gap-y-2 mt-1'>
        <input
          type={type}
          id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          className='w-full rounded-md p-2 inline-block text-richblack-800'
        />

        <button
          type='button'
          onClick={handleAddRequirement}
          className='font-semibold w-fit text-yellow-500 text-base bg-richblack-5 rounded-md px-1.5 py-1.5'>
            Add
        </button>
      </div>

      {
        requirementList.length > 0 && (
          <ul>
            {
              requirementList.map((requirement, index) => (
                <li key={index} className='flex items-center text-richblack-200 gap-x-2'>
                  <span className='flex justify-center items-center gap-y-4 
                    cursor-pointer rounded-md px-2 py-1 border-b border-spacing-y-5
                  hover:bg-[rgba(88,93,105,0.3)]'>{requirement}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveRequirement(index)}
                    className='text-sm text-pure-greys-300'
                  >
                    <RxCross2 className='rounded-full border w-5 h-5 border-richblack-800 bg-yellow-50 hover:bg-yellow-200 hover:scale-95 text-richblack-800' />
                  </button>
                </li>
              ))
            }
          </ul>
        )
      }
      {
        errors[name] && (
          <span className='text-xs font-thin italic text-pink-500'>{errors.message || `${label} is required.`}</span>
        )
      }

    </div>
  )
}

export default RequirementField;