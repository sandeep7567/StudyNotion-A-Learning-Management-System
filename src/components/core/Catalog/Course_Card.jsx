import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import RatingStars from "../../Common/RatingStars";
import { useEffect } from 'react';

import "../../../App.css";

import GetAvgRating from "../../../utils/avgRating"

const Course_Card = ({course, height }) => {
  console.log(course);

  const [ avgReviewCount, setAvgReviewCount ] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(course.ratingAndReviews);
    setAvgReviewCount(count);
  }, [course])

  return (
    <>
      <Link to={`/courses/${course._id}`}>
          {/* {JSON.stringify(course)} */}
          
          <img className={`${height} w-full rounded-xl object-cover`} src={course?.thumbnail} alt="image" />
          
          <div>
            <p className='text-richblack-5 text-base font-medium'>
              {course?.courseName}
            </p>
            <p className='text-base font-normal text-richblack-300'>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
            <div className='flex gap-x-3 text-base font-semibold'>
              <RatingStars Review_Count={avgReviewCount} Star_Size={22}/>
              <span className='text-richblack-5 text-base font-normal'>{course?.ratingAndReviews?.length} Ratings</span>
            </div>
            <p className='text-richblack-5 text-xl font-semibold'>Rs. {course?.price}</p>
          </div>
      </Link>
    </>
  )
}

export default Course_Card