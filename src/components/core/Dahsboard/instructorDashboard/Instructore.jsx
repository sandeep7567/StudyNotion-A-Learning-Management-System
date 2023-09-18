import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchInstructorCourses } from '../../../../services/oprations/courseDetailsAPI';
import { getInstructorData } from '../../../../services/oprations/profileAPI';
import Spinner from '../../../Common/Spinner';
import { Link } from 'react-router-dom';
import InstructorChart from './InstructorChart';
import DashboardHeding from "../../../Common/DashboardHeading";

const Instructor = () => {
  const {token} = useSelector((state) => state.auth);
  const {user} = useSelector((state) => state.profile);

  const [loading, setLoading] = useState(false);
  const [instructorData, setInstructorData] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getCourseDataWithStats = async() => {
      setLoading(true)
      try {
        // pending instructorData
        const instructorApiData = await getInstructorData(token);
        const allCoursesData = await fetchInstructorCourses(token);

        console.log(instructorApiData);

        if(instructorApiData.length) {
          setInstructorData(instructorApiData);
        }
        if(allCoursesData.length) {
          setCourses(allCoursesData);
        }
      } catch (error) {
        console.error("Internal Client Server Error", error);
      } finally {
        setLoading(false);
      }
    }
    getCourseDataWithStats();
  }, []);

  // helpers
  const totalAmount = instructorData?.reduce((acc, curr) => acc + curr.totalAmountGenerated, 0);
  const totalStudents = instructorData?.reduce((acc, curr) => acc + curr.totalStudentsEnrolled, 0);

  const userName = user?.firstName + " " + user?.lastName;
  
  return (
    <div className='text-white flex flex-col gap-y-5 mt-10 md:mt-0 mb-10 overflow-x-hidden overflow-y-hidden '>
      <div className='bg-richblack-800 p-6 rounded-md'>
        <h1 className='text-xl md:text-2xl font-semibold text-richblack-5'>Hi 
          <span className='text-yellow-50 uppercase text-xl md:text-2xl font-bold'>
            {" " + userName}
          </span>
        </h1>
        <p className='text-sm md:text-base font-normal text-richblack-300'>Let's start something new</p>
      </div>

      {loading
        ? <Spinner/>
        : courses.length > 0
          ? (
            <div className='flex flex-col gap-y-5'>
              <div className='flex flex-col gap-x-6 gap-y-6 p-6 bg-richblack-800 rounded-md justify-around overflow-x-hidden md:flex-row'>
                
                {/* stastical data represent in pie chart */}
                {instructorData.length &&
                  <InstructorChart courses={instructorData}/>
                }
                {/* stastical data represent in text */}
                <div className='relative flex flex-col text-richblack-50 items-center shadow-4xl'>
                  <header className='flex justify-center items-center pb-3 w-full pt-3 rounded-t-lg bg-richblack-900'>
                    <p className='text-2xl sm:text-4xl bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-center font-bold'>
                      Statistics
                    </p>
                  </header>
                  <section className='bg-gradient-to-b  from-[#bbe0f5] via-[#79a2ab] to-[#79b4dc] flex gap-y-6 flex-col sm:justify-between rounded-b-lg h-full px-36 sm:px-44 overflow-x-hidden md:px-6 pb-6 pt-3'>
                    <div className='flex flex-col'>
                      <p className='font-normal text-lg sm:text-2xl text-opacity-60 text-richblack-800 font-inter'>Total Courses:</p>
                      <p className='font-bold text-opacity-75 text-lg sm:text-2xl text-richblack-900 font-inter'>{courses.length} courses</p>
                    </div>
                    <div className='flex flex-col'>
                      <p className='font-normal text-lg sm:text-2xl  text-opacity-60 text-richblack-800 font-inter'>Total Students</p>
                      <p className='font-bold text-opacity-75 text-lg sm:text-2xl text-richblack-900 font-inter'>{totalStudents} students</p>
                    </div>
                    <div className='flex flex-col'>
                      <p className='font-normal text-lg sm:text-2xl  text-opacity-60 text-richblack-800 font-inter'>Total Income Generated</p>
                      <p className='font-bold text-opacity-75 text-lg sm:text-2xl text-richblack-900 font-inter'>Rs.{" " + totalAmount}</p>
                    </div>
                  </section>

                </div>
              </div>
              {/* Render 3 courses */}
              <div className='flex flex-col gap-6 p-6 bg-richblack-800 rounded-md justify-around'>
                <div className='flex flex-row'>
                  <p className='flex-grow text-richblack-5 text-xl font-bold'>Your Courses</p>
                  <Link
                    to={"/dashboard/my-courses"}
                    className='text-yellow-50 text-base font-semibold'
                  >
                    <p>View All</p>
                  </Link>
                </div>
                <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3'>
                  {courses.slice(0,3).map((course, index) => (
                    
                    <div key={index} className='shadow-2xl p-6 flex-col flex gap-y-6'>
                      <img
                        src={course?.thumbnail}
                        alt="thumbnail"
                        className='w-full h-[10rem] sm:h-[14rem]'
                      />
                        
                      <h2 className='text-richblack-50 text-lg sm:text-xl font-inter font-bold'>
                        {course?.courseName.toString().split(" ").length > 5 
                          ? `${course?.courseName.toString().split(" ").slice(0, 6).join(" ")}.....` 
                          : course?.courseName.toString() }
                      </h2>
                        
                      <div className='flex w-full justify-between mt-auto'>
                          <p className='text-richblack-600 text-base sm:text-lg font-inter font-normal'>{course?.studentsEnrolled.length} students</p>
                          <p className='text-richblack-50 text-base sm:text-lg font-inter font-bold'>Rs. {course?.price}</p>
                      </div>
                      
                    </div>
                    
                  ))}
                </div>
              </div>
            </div>
          )
          : (
            <div className='flex flex-col p-6 gap-y-6 bg-richblack-800 rounded-md justify-around'>
              <p className='text-richblack-400 text-xl sm:text-3xl text-center'>You have not created any courses yet</p>
              <Link
                to={"/dashboard/add-course"}
                className='text-center text-richblack-300 text-opacity-50 hover:text-opacity-100 hover:text-richblack-900 text-xl sm:text-2xl hover:bg-richblack-300 hover:bg-opacity-30 rounded-full border border-opacity-30 border-richblack-50 p-2'
              >
                Create Your StudyNotion Course
              </Link>
            </div>
          )
      }
    </div>
  )
}

export default Instructor;