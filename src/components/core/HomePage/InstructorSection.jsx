import React from "react";
import Instructor from "../../../assets/Images/Instructor.png";
import { HighlightText } from "../HomePage/HighlightText";
import CTAButton from "../HomePage/Button";
import { FaArrowRight } from "react-icons/fa";

const InstructorSection = () => {
  return (
    <div className="mt-14">
      <div className="flex flex-col sm:flex-row gap-24 justify-center items-center">
        {/* Left Box */}
        <div className="w-full px-4 md:w-1/2">
          <img
            src={Instructor}
            alt="Instructor"
            loading="lazy"
            className="shadow-[8px_8px_0px_0px_rgba(250,250,250,1)] lg:shadow-[20px_20px_0px_0px_rgba(250,250,250,1)]" />
        </div>
        {/* Right Box */}
        <div className="flex flex-col justify-center items-center w-full lg:w-[50%] gap-10">
          <div className="text-2xl text-center lg:self-start sm:text-4xl font-semibold w-[80%] lg:w-[50%]">
            Become <span className="text-center inline">{`a ${" "}`}</span>
            <HighlightText text={"Instructor"} />
          </div>

          <p className="font-medium text-[16px] w-[80%] text-richblack-300">
            Instructors from around the world teach millions of students on
            StudyNotion. We provide the tools and skills to teach what you love.
          </p>

          <div className="w-fit">
            <CTAButton active={true} linkto={"/signup"}>
              <div className="flex flex-row gap-2 font-bold items-center">
                Start Learning Today
                <FaArrowRight />
              </div>
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorSection;
