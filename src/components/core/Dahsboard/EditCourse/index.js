import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DashboardHeading from '../../../Common/DashboardHeading';
import RenderSteps from '../AddCoures/RenderSteps';
import { getFullDetailsOfCourse } from '../../../../services/oprations/courseDetailsAPI';
import { setCourse, setEditCourse } from '../../../../slices/courseSlice';
import toast from 'react-hot-toast';

const EditCourse = () => {

  const { courseId } = useParams();
  // console.log(useParams());
  const dispatch = useDispatch();
  const {course} = useSelector((state) => state.course);
  const {token} = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const populateCourseDetails = async() => {
      setLoading(true);
      
      // console.log("courseIdtoken", courseId, token)
      const result = await getFullDetailsOfCourse(courseId, token);

      console.log(result)

      if(result?.courseDetails) {
        dispatch(setEditCourse(true));
        dispatch(setCourse(result?.courseDetails))
      }
      if(!result?.courseDetails) {
        toast.error("no course found")
      }
      setLoading(false);
    };
    populateCourseDetails();
  }, []);
  

  if(loading) {
    return (
      <div>
        Loading...
      </div>
    )
  };

  return (
    <div className='text-white'>
      <DashboardHeading customClasses={""}>
        <h1>Edit Course</h1>
      </DashboardHeading>
      <div>
        {console.log(course)}
        {
          course ? (<RenderSteps/>) : (<p>Course Not Found</p>)
        }
      </div>
    </div>
  )
}

export default EditCourse;