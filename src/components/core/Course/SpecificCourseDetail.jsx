import React, { useState } from "react";
import { useEffect } from "react";

import Accordion from "./Accordion";
import GetAvgRating from "../../../utils/avgRating";
import RatingStars from "../../Common/RatingStars";
import BuyCard from "./BuyCard";

const SpecificCourseDetail = ({
  specificCourse,
  setConfirmationModal,
  handleBuyCourse,
  duration,
}) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);

  const firstName = specificCourse?.instructor?.firstName;
  const updatedFirstName =
    firstName.charAt(0).toUpperCase() + firstName.slice(1);
  const lastName = specificCourse?.instructor?.lastName;
  const updatedLastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);

  const createdAt = specificCourse?.instructor?.createdAt.split(":")[0];
  const courseDate = createdAt.split("-").reverse()[0].slice(0, 2);
  const courseMMYY = createdAt.slice(0, 7).split("-").reverse().join("-");
  const courseCreatedAt = courseDate + "-" + courseMMYY;

  const accordionData = specificCourse?.courseContent || [];

  const initialAccordionState = Array(accordionData.length).fill(false);

  const [accordionOpenStates, setAccordionOpenStates] = useState(
    initialAccordionState
  );

  const toggleAccordion = (index) => {
    const newOpenStates = accordionOpenStates.map((isOpen, i) =>
      i === index ? !isOpen : false
    );
    setAccordionOpenStates(newOpenStates);
  };

  useEffect(() => {
    const count = GetAvgRating(specificCourse?.ratingAndReviews);
    setAvgReviewCount(count);
  }, [specificCourse]);

  useEffect(() => {
    let lectures = 0;
    specificCourse?.courseContent?.forEach((sec) => {
      lectures += sec?.subSection.length || 0;
    });
    setTotalNoOfLectures(lectures);
  }, [specificCourse]);
  
  return (
    <div className="flex flex-col text-white gap-y-10">
      {/* Section 1 Home/Leanign/{category}*/}
      <div className="relative w-full rounded-lg bg-opacity-80 bg-richblack-800 flex flex-col py-8 gap-y-3">
        <div className="lg:w-3/4 flex flex-col gap-y-3 p-4 border-r border-solid border-richblack-700">
          <p className="flex gap-x-4 items-center">
            <span className="text-sm text-richblack-300 cursor-pointer">Home</span> /{" "}
            <span className="text-sm text-richblack-300 cursor-pointer">Learning</span> /{" "}
            <span className="text-sm text-yellow-5 cursor-pointer">
              {specificCourse?.category?.name}
            </span>
          </p>

          <div className="lg:hidden flex justify-center items-center">

            <BuyCard
                specificCourse={specificCourse}
                setConfirmationModal={setConfirmationModal}
                handleBuyCourse={handleBuyCourse}
            />
            
          </div>

          <h1 className="text-2xl lg:text-3xl font-semibold text-richblack-5">
            {specificCourse?.courseName}
          </h1>
          <p className="text-lg font-light text-richblack-200">
            {specificCourse?.courseDescription}
          </p>
          {/* Rating and Reviews */}
          <div className="flex items-center gap-x-2">
            <span className="text-yellow-100 text-lg font-semibold">
              {avgReviewCount}
            </span>
            <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
            <span className="text-xs sm:text-base text-richblack-25 font-normal">{`(${specificCourse?.ratingAndReviews.length} ratings)`}</span>
            <span className="text-xs sm:text-base text-richblack-25 font-normal">{`(${specificCourse?.studentsEnrolled.length} students enrolled)`}</span>
          </div>

          <div>
            <p className="text-base text-richblack-25 font-normal">
              Created by {updatedFirstName + " " + updatedLastName}
            </p>
          </div>

          <div className="flex gap-4">
            <p className="text-base text-richblack-25 font-normal">
              Created At {courseCreatedAt}
            </p>
            <p className="text-base text-richblack-25 font-normal">English</p>
          </div>
        </div>

        <div className="w-1/4 hidden lg:flex absolute top-8 right-0 pl-6 pr-6">

          <BuyCard
              specificCourse={specificCourse}
              setConfirmationModal={setConfirmationModal}
              handleBuyCourse={handleBuyCourse}
          />

        </div>
      </div>

      {/* Section 2 What You Will Learn*/}
      <div className="lg:w-3/4 flex flex-col gap-y-3 border border-solid border-richblack-700 p-8">
        <h1 className="text-3xl font-semibold text-richblack-5 ">
          What You Will Learn
        </h1>
        <div className="text-richblack-50 text-sm font-medium">
          <ul>
            {specificCourse && specificCourse?.whatYouWillLearn[0].split("\r\n").map((item, index) => (
              <li className="text-richblack-50 flex justify-start mb-2 items-center font-medium text-sm font-inter" key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Section 3 Course Content */}
      <div className="lg:w-3/4 flex flex-col gap-y-4">
        <div className="flex w-full flex-col gap-y-2">
          <h1 className="text-2xl text-richblack-5 font-semibold">
            Course Content
          </h1>
          <div className="flex gap-x-4">
            <ul className="flex gap-x-6 grow list-disc list-outside items-center">
              <li className="text-richblack-50 text-sm font-normal list-none">
                {specificCourse?.courseContent.length} sections
              </li>
              <li className="text-richblack-50 text-sm font-normal">
                {totalNoOfLectures} lectures
              </li>
              <li className="text-richblack-50 text-sm font-normal">
                {duration} total length
              </li>
            </ul>
          </div>
        </div>

        <div>
          {/* Accordion Section Subsection Component Course Content */}
          {accordionData.map((item, index) => (
            <Accordion
              key={index}
              sectionName={item.sectionName}
              subSection={item.subSection}
              isOpen={accordionOpenStates[index]}
              onClick={() => toggleAccordion(index)}
            />
          ))}
        </div>
      </div>

      {/* section-04 Author */}
      <div className="lg:w-3/4 flex flex-col gap-y-4">
        <h1 className="text-richblack-5 text-2xl font-normal">Author</h1>
        <div className="flex justify-start items-center gap-4">
          <img
            src={specificCourse?.instructor?.image}
            alt="image"
            className="rounded-full overflow-hidden lg:w-12 lg:h-12 w-10 h-10 bg-white aspect-square"
          />
          <div className="text-richblack-5 text-base font-medium">
            {specificCourse?.instructor?.firstName.toUpperCase()}{" "}
            {specificCourse?.instructor?.lastName.toUpperCase()}
          </div>
        </div>
        <p className="text-richblack-50 text-sm font-normal">
          {specificCourse?.instructor?.additionalDetails?.about ??
            "Lorem ipsum dolor sit amet consectetur adipisicing elit."}
        </p>
      </div>
    </div>
  );
};

export default SpecificCourseDetail;
