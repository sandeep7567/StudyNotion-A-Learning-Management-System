import React from "react";
import { HiMiniUsers } from "react-icons/hi2";
import { ImTree } from "react-icons/im";

const CourseCard = ({
  heading,
  description,
  level,
  lessionNumber,
  currentCard,
  setCurrentCard,
  className
}) => {
  return (
    <div
      className={`${
        currentCard === heading
          ? "bg-white shadow-[12px_12px_0_0_rgba(255,214,10,1)]"
          : "bg-richblack-600"
      } text-richblack-25 w-full box-border cursor-pointer`}
      onClick={() => {
        setCurrentCard(heading);
      }}
    >
      <div className="flex flex-col gap-10 w-full h-full">
        <div className="gap-y-3 h-[80%] pt-8 px-6 pb-14 gap-3">
          <div className={`${currentCard === heading && "text-richblack-800"}
           font-inter text-lg font-semibold`}>
            {heading}
          </div>
          <div className="font-inter text-[16px] leading-6 font-normal text-richblack-400">
            {description}
          </div>
        </div>

        <div
          className={`${currentCard === heading && "text-blue-500"} text-richblack-300
          flex flex-row gap-14 w-full h-[20%] items-center border-t-2 border-richblack-400 border-dashed
        `}
        >
          <p className="flex flex-row w-[40%] py-4 px-6 gap-2">
            <HiMiniUsers
              size={"20px"}
              className=""
            />
            {level}
          </p>
          <p className="flex flex-row w-[60%] py-4 px-6 gap-2">
            <ImTree size={"20px"} className="" />
            {`${lessionNumber} Lessons`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
