import React, { useRef } from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { RxCross2 } from 'react-icons/rx';
import { useSelector } from 'react-redux';

const ChipInput = ({
  label,
  name,
  placeholder,
  register,
  errors,
  type,
  setValue,
  getValues,
}) => {
  const { editCourse, course } = useSelector((state) => state.course)

  const [tag, setTag] = useState("");
  const [tagList, setTagList] = useState([]);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current = tagList;
  }, [tagList]);

  // console.log(inputRef.current);

  useEffect(() => {
    if (editCourse) {
      // console.log(course)
      setTagList(course?.tag)
    }
    register(name, { required: true, validate: (value) => value.length > 0 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setValue(name, tagList);
  }, [tagList])

  const handleAddTag = () => {
    const newTag = tag.trim()
    if(newTag.length > 0) {
      setTagList([...tagList, newTag]);
      setTag("");
    }
  }

  const handleRemoveTag = (index) => {
    setTagList(tagList.filter((tag, i) => i !== index));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {

      e.preventDefault()

      handleAddTag();
      e.target.value = ""
    }
  }

  return (
    <div>
      <div className='flex flex-col gap-y-2'>

        <label htmlFor={name}>
          {label}<sup className='text-pink-300'>*</sup>
        </label>
        
        {tagList.length > 0 && (
          <ul className='flex flex-wrap gap-1.5'>
            { tagList.map((item, index) => (
              <li
                key={index}
                className='flex justify-center items-center gap-2 cursor-pointer  rounded-full px-2 py-1
                  hover:bg-[rgba(88,93,105,0.3)]
                '>
                  <span
                    ref={inputRef}
                  >
                    #{item}
                  </span>
                <button
                  type="button"
                  onClick={() => handleRemoveTag(index)}
                  className='text-sm text-richblack-900 ml-2 focus:outline-none'
                >
                  <RxCross2 className='rounded-full border-2  w-5 h-5 border-richblack-50 bg-yellow-200 hover:bg-yellow-200 hover:scale-95 text-richblack-5' />
                </button>
              </li>
              ))
            }
          </ul>
          )
        }
        
        <input
          type="text"
          name={name}
          id={name}
          placeholder={placeholder}
          onChange={(e) => setTag(e.target.value)}
          onKeyDown={handleKeyDown}
          className='text-richblack-800 rounded-lg p-2'
        />
        {
        errors[name] && (
          <span>{errors.message || `${label} is required.`}</span>
        )
        }

      </div>
    </div>
  )
}

export default ChipInput