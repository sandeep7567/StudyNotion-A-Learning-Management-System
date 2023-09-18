import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchInstructorCourses } from '../../../services/oprations/courseDetailsAPI';
import toast from 'react-hot-toast';
import IconButton from '../../Common/IconButton';
import CoursesTable from './InstructorCourses/CoursesTable';

const MyCourses = () => {

  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async(token) => {
      setLoading(true)
      try {
        const result = await fetchInstructorCourses(token);
        if(result){
        setCourses(result);
        // console.log("result print", result)
      };  
      } catch (error) {
        throw console.error("fetching failed course List");
        toast.loading("Loading...");
        
      };
      setLoading(false);
    };
    fetchCourses(token);
  }, []);

  return (
    <div className='text-white mt-10 md:mt-0 mb-5 overflow-x-hidden overflow-y-hidden'>
      <div className='flex justify-between my-5'>
        <h1 className='text-2xl text-yellow-50 bg-richblack-800 px-4 py-2 rounded-md'>My Courses</h1>
        <IconButton
          text={"Add Course"}
          onclick={() => navigate("/dashboard/add-course")}
          customClasses={"bg-yellow-300 px-6 py-2 rounded-md text-richblack-800 font-semibold"}
        />
      </div>

      {courses && <CoursesTable courses={courses} setCourses={setCourses}/>}
    </div>
  )
}

export default MyCourses;