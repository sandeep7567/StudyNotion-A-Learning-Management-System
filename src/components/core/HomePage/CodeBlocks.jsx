import React from "react";
import CTAButton from "../HomePage/Button";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

const CodeBlocks = ({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
  backgroundGradient,
  codeColor,
}) => {
  return (
    <div
      className={`flex items-center ${position} my-16 justify-between gap-10`}
    >
      {/* Section 1 */}
      <div className="w-full lg:w-[50%] flex flex-col gap-8">
        {heading}
        <div className="text-richblack-300 text-base font-bold">
          {subheading}
        </div>

        <div className="flex gap-7 mt-7">
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className="flex gap-2 items-center">
              {ctabtn1.btnText}
              <FaArrowRight />
            </div>
          </CTAButton>
          <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
            <div className="flex gap-2 items-center">{ctabtn2.btnText}</div>
          </CTAButton>
        </div>
      </div>

      {/* Section 2 autoCode */}
      <div
        className="relative h-fit flex flex-row w-[100%] justify-start filter backdrop:blur-[52px] px-4 py-8 gap-2 lg:w-[500px] 
      border-[0.5px] border-solid border-t-[rgba(255,255,255,0.22)] border-l-[rgba(255,255,255,0.22)] border-r-0 border-b-0
      bg-gradient-to-tl from-[rgba(14,26,45,0.24)]  via-[rgba(17,30,50,0.38)] to-[rgba(17,30,50,0.22)]"
      >
        {/* HW BG gradient 2 */}
        {backgroundGradient}
        <div className="text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold">
          {/* serial-no --> App.css */}
          <p className="serial-no">1</p>
          <p className="serial-no">2</p>
          <p className="serial-no">3</p>
          <p className="serial-no">4</p>
          <p className="serial-no">5</p>
          <p className="serial-no">6</p>
          <p className="serial-no">7</p>
          <p className="serial-no">8</p>
          <p className="serial-no">9</p>
          <p className="serial-no">10</p>
          <p className="serial-no">11</p>
        </div>

        <div
          className={`w-full md:w-[90%] flex flex-col gap-2 font-bold text-[16px] font-mono ${codeColor} pr-2`}
        >
          <TypeAnimation
            sequence={[codeblock, 1000, ""]}
            cursor={true}
            repeat={Infinity}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
            omitDeletionAnimation={true}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;
