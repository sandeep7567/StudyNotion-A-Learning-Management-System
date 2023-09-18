import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams, useSearchParams } from 'react-router-dom'
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice';
import { getFullDetailsOfCourse } from '../services/oprations/courseDetailsAPI';
import VideoDetailsSidebar from '../components/core/viewCourse/VideoDetailsSidebar';
import CourseReviewModal from '../components/core/viewCourse/CourseReviewModal';

const ViewCourse = () => {
  const [ reviewModal, setReviewModal ] = useState(false);
  const {courseId} = useParams();
  const {token} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const setCourseSpecificDetails = async() => {
      const courseData = await getFullDetailsOfCourse(courseId, token);
      console.log("data course", courseData);
      dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
      dispatch(setEntireCourseData(courseData.courseDetails));
      dispatch(setCompletedLectures(courseData.completedVideos));
      let lectures = 0;
      courseData?.courseDetails?.courseContent.forEach((sec) => {
        lectures += sec.subSection.length
      })
      dispatch(setTotalNoOfLectures(lectures));
    }
    setCourseSpecificDetails();
  }, [])
  
  
  return (
    <div className="mt-14 text-white relative flex min-h-[calc(100vh-3.5rem)]">
      <VideoDetailsSidebar setReviewModal={setReviewModal} />

      <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
        <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
          <Outlet />
        </div>
      </div>
      
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </div>
  )
}

export default ViewCourse