import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { buyCourse } from "../services/oprations/studentFeatureAPI";
import { fetchCourseDetails } from "../services/oprations/courseDetailsAPI";
import SpecificCourseDetail from "../components/core/Course/SpecificCourseDetail";
import ConfirmationModal from "../components/Common/ConfirmationModal"
import Footer from "../components/Common/Footer";

import { BiLogIn } from "react-icons/bi"
import { ACCOUNT_TYPE } from "../utils/constants";
import toast from "react-hot-toast";

const CourseDetails = () => {
  const [specificCourse, setSpecificCourse] = useState(null);
  const [totalDuration, setTotalDuration] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const [loading, setLoading] = useState(false);
  // console.log(specificCourse);

  const { user } = useSelector((state) => state.profile);
  console.log(user)
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();
  // console.log(courseId);

  const handleBuyCourse = () => {
    if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("you are creater not a consumer")
      return;
    }
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch);
      return;
    } else {
      setConfirmationModal({
        text1:"You are not logged In",
        text2:"Please Login to purchase the course",
        btn1Text:"Login",
        btn2Text:"Cancel",
        Icon: BiLogIn,
        btn1Handler:() => navigate("/login"),
        btn2Handler:() => setConfirmationModal(null),
      })
    }
  };

  const fetchSpecificCourseDetails = async (courseId) => {
    setLoading(true);
    try {
      const res = await fetchCourseDetails(courseId);
      console.log(res.data.courseDetails);
      setSpecificCourse(res.data.courseDetails);
      setTotalDuration(res.data.totalDuration);
    } catch (error) {
      console.log(error.message);
      console.error(
        "Failed to send api call for details for specific category"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpecificCourseDetails(courseId);
  }, [courseId]);

  if (!specificCourse) {
    return (
      <div className="mt-12 flex justify-center items-center w-full h-screen">
        Loading...
      </div>
      )
  }

  if (specificCourse) {
    return (
      <div className="w-full overflow-hidden mt-10 md:mt-5">
        <div className="w-full max-w-sm sm:max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-maxContent mx-auto">
          <SpecificCourseDetail
            specificCourse={specificCourse}
            duration={totalDuration}
            setConfirmationModal={setConfirmationModal}
            handleBuyCourse={handleBuyCourse}            
          />
        </div>
        <Footer/>
        {confirmationModal && <ConfirmationModal {...confirmationModal} />}
      </div>
    );
  }
};

export default CourseDetails;