import React from 'react'
import { useForm } from 'react-hook-form'
import IconButton from '../../../../Common/IconButton'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice';
import toast from 'react-hot-toast';

import { MdAddCircleOutline } from 'react-icons/md'
import { MdNavigateNext } from 'react-icons/md'
import { createSection, updateSection } from '../../../../../services/oprations/courseDetailsAPI';
import NestedView from './NestedView';

const CourseBuilderForm = () => {

  const {register, handleSubmit, getValues, setValue, formState:{ errors } } = useForm();
  const [editSectionName, setEditSectionName] = useState(null);
  const [loading, setLoading] = useState(false);
  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch();

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  }
  const goBack = () => {
    dispatch(setStep(1))
    dispatch(setEditCourse(true));
  }
  const goToNext = () => {
    if(course?.courseContent?.length === 0) {
      toast.error("Please Add Minimum One Section")
      return;
    }
    
    if(course.courseContent.some((section) => section.subSection.length === 0)) {
      toast.error("Please add minimum one lecture in each section")
      return;
    }
    // if everything is good
    dispatch(setStep(3));
  }

  const onSubmit = async(data) => {
    setLoading(true)
    let result;

    if(editSectionName) {
      // we are editing the section name
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,

        }, token
      )
    }
    else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,

        }, token
      )
    }

    // update value
    if(result) {
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }

    // loading false
    setLoading(false)
  }

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if(editSectionName === sectionId) {
      cancelEdit();
      return;
    };

    setEditSectionName(sectionId);
    setValue("sectionName", sectionName)
    // UI Not Updated
  }

  return (
    <div className='text-white mb-2 flex flex-col gap-y-6 w-full bg-richblack-800 border-richblack-700 border p-6 rounded-lg'>
      <p className='text-richblack-5 font-medium text-2xl'>Course Builder</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-y-2'>
          <label className='text-richblack-5 text-base font-normal ' htmlFor="sectionName">Section Name <sup className='text-pink-200'>*</sup></label>
          <input
            type="text"
            id="sectionName"
            placeholder='Add a section name'
            className='w-full rounded-md outline-none bg-richblack-700 shadow-lg placeholder:focus:translate-x-[0%] placeholder:focus:translate-y-[-80%] pl-2.5 py-3'
            {...register("sectionName", {
                                          required:
                                            {
                                              value:true,
                                              message: "Course section name is required",
                                            },
                                        })}
          />
          {
            errors.sectionName && (
              <span>
                {errors.message}
              </span>
            )
          }
        </div>
        
        <div className='w-fit mt-10 flex gap-4 hover:scale-95'>
          <IconButton
            type="submit"
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            outline={true}
            customClasses={`text-yellow-5 hover:text-yellow-25 border p-2 border-yellow-5 rounded-lg bg-richblack-900 flex items-center gap-2`}
          >
            <MdAddCircleOutline size={20} className='text-yellow-5 hover:text-yellow-25 '/>

          </IconButton>
          {
            editSectionName && (
              <button
                type='button'
                onClick={cancelEdit}
                className='text-sm text-richblack-300 hover:underline'
              >
                Cancel Edit
              </button>
            )
          }
        </div>
      </form>
      {/* if course.courseContent.length > 0 then show Subsection */}
      {course?.courseContent?.length > 0 && (
        <NestedView
          handleChangeEditSectionName={handleChangeEditSectionName}
        />
      )}

      <div className='flex justify-end gap-x-3'>
        <button
          onClick={goBack}
          className={`flex cursor-pointer w-fit px-3 py-0 hover:border-b-2 
                      hover:scale-95 mt-2 bg-richblack-800 text-richblack-50 
                      font-semibold rounded-md justify-center items-center `}
        >
          Back
        </button>
        <IconButton
          text={"Next"}
          onclick={goToNext}
          customClasses={`mt-1 w-fit cursor-pointer flex py-1.5 px-2 border-b-2 
                          hover:scale-95 hover:border-richblack-5 mt-2 bg-yellow-5
                          text-richblack-900 font-semibold rounded-md justify-center
                          items-center `}
        >
          <MdNavigateNext size={20} className='text-richblack-900 font-semibold'/>
        </IconButton>

      </div>

    </div>
  )
}

export default CourseBuilderForm