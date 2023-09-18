import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import { HighlightText } from "./HighlightText";
import CourseCard from "./CourseCard";

const tabName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCurrentCard(result[0].courses[0].heading);
  
    const newCourse = [];
    result.forEach((ele) => {
      ele.courses.forEach((item) => {
        newCourse.push(item);
      });
    });
  
    setCourses(newCourse);
  };
  
  return (
    <div className="relative w-full mb-36 sm:mb-28 md:mb-10 lg:mb-0">
      <div className="font-semibold text-4xl text-center">
        <span>Unlock the</span>
        {" "}
        <HighlightText text={"Power of Code"} />
      </div>

      <p className="text-center text-sm text-[16px] text-richblack-300 mt-3">
        Learn to build anything that you can imagine
      </p>

      {/* tab */}
      <div
        className="flex flex-1 flex-col md:flex-row md:rounded-full md:hover:border-2 md:border-opacity-30 border-richblack-800
                  md:bg-richblack-800 lg:border-richblack-100 gap-3 mb-40 mt-10 md:px-2 py-[0.35rem] 
                  w-full lg:w-fit xl:w-3/5 mx-auto justify-center items-center">
        {tabName.map((element, index) => {
          return (
            <div
              onClick={() => setMyCards(element)}
              key={index}
              className={`text-base w-[80%] md:text-sm lg:text-base odd:bg-richblack-100 even:bg-richblack-600 flex flex-row items-center
              ${currentTab === element 
                ? (`hover:bg-yellow-100 odd:hover:text-richblack-900 even:text-richblack-5 
                      even:hover:text-richblack-5 even:bg-yellow-100 odd:bg-yellow-100 
                      odd:text-richblack-500 font-medium scale-110`)
                : (`text-richblack-200`)}
                    odd:text-richblack-900 w-10/12 md:w-fit justify-center rounded-full cursor-pointer transition-all 
                    duration-200 even:hover:bg-yellow-200 odd:hover:bg-yellow-200 px-4 py-2 hover:scale-110
                    even:text-richblack-5 even:hover:text-richblack-5 odd:hover:text-richblack-900
                    `}
            >
              {element}
            </div>
          );
        })}
      </div>

      <div className="lg:h-[150px]"></div>

      {/*course card ka group */}
      <div className="absolute flex flex-col flex-1 sm:flex-col lg:flex-row gap-10
       -translate-y-[15%]
      lg:top-[50%] lg:left-1/2 mx-auto lg:-translate-x-1/2 lg:-translate-y-[12%]  pt-8 px-14 w-full">
        {
          courses.map((element, index) => {
            // console.log(element)
            return (
              <CourseCard
                key={index}
                {...element}
                currentCard={currentCard}
                setCurrentCard={setCurrentCard}
              />
            )
          })
        }
      </div>
    </div>
  );
};

export default ExploreMore;
