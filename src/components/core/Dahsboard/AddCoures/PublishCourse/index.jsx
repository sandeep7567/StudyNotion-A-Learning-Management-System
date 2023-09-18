import React, { useState, useEffect } from 'react'
import { resetCourseState, setStep } from '../../../../../slices/courseSlice'
import { useDispatch, useSelector } from 'react-redux'
import IconButton from '../../../../Common/IconButton'
import { useForm } from 'react-hook-form';

import {COURSE_STATUS} from '../../../../../utils/constants'
import {editCourseDetails} from '../../../../../services/oprations/courseDetailsAPI'
import { useNavigate } from 'react-router-dom';

const PublishCourse = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { step, course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth);
  
  const {register, handleSubmit, setValue, getValues,  formState:{errors,}} = useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true)
    }
  }, []);

  const goToCourse = () => {
    dispatch(resetCourseState());
    navigate("/dashboard/my-courses")
  };

  const handleCoursePublish = async() => {
    // already course is published || 
    if(course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true ||
    course.status === COURSE_STATUS.DRAFT && getValues("public") === false) {
      // no updation in form
      // no need to make api call
      goToCourse();
      return;
    }

    // if course is update from draft to publish
    const formData = new FormData();
    formData.append("courseId", course._id)
    const CourseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
    formData.append("status", CourseStatus);
    
    setLoading(true);
    const result = await editCourseDetails(formData, token)
    console.log(result)

    if(result) {
      goToCourse();
    }

    setLoading(false);
  };

  const onSubmit = () => {
    handleCoursePublish();
  };

  
  return (
    <div className='text-white p-4 border border-richblack-700 bg-richblack-800 rounded-md'>
      <p>
        Public Course
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>

        
        
        <label htmlFor="public">
          <input
            type="checkbox"
            id='public'
            {...register("public") } 
            className='rounded h-4 w-4'
          />
          <span className='ml-3'>Make this Course as Public</span>
        </label>

        </div>

        <div className='flex justify-end gap-x-3'>
          <button disabled={loading}
            type="button"
            className='ml-2 px-6 py-2  bg-richblack-300 rounded-md text-richblack-5'
            onClick={() => dispatch(setStep(step - 1))}
          >
              Back
          </button>
          <IconButton
            disabled={loading}
            type={"submit"}
            text={"Save changes"}
            customClasses={"px-6 py-2 bg-yellow-300 rounded-md text-richblack-5"}
          />
        </div>

      </form>
    </div>
  )
}

export default PublishCourse;