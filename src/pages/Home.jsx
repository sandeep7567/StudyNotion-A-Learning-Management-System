// Home css;
import "../components/core/HomePage/Home.css";
import "../App.css";

import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { HighlightText } from "../components/core/HomePage/HighlightText";

import CTAButton from "../components/core/HomePage/Button";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import Footer from "../components/Common/Footer";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import ReviewSlider from "../components/Common/ReviewSlider";

const Home = () => {
  return (
    <div>
      {/* Section-1 */}
      <div className="relative mt-20 mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between ">
        <Link to={"/signup"}>
          <div
            className="group p-1 mx-auto shadow-[inset_0_-1px_0_0_rgba(255,255,255,0.18)] rounded-full bg-richblack-800 font-bold text-richblack-200
          transition-all duration-200 hover:scale-95 w-fit"
          >
            <div className="group-hover:bg-richblack-900 flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200">
              <p className="text-[16px] leading-6 font-medium text-center text-richblack-200">
                Become an Instructor
              </p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className="text-center text-2xl lg:text-4xl mt-6  font-semibold">
          <span className="space-x-48">Empower Your Future with</span>{" "}
          <span>
            <HighlightText text={"Coding Skills"} />
          </span>
        </div>

        <div className="mt-4 w-[90%] text-center text-base lg:text-lg font-medium text-richblack-300">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        <div className="flex flex-row gap-7 mt-8">
          <CTAButton
            active={true}
            linkto={"/signup"}
            className="text-base leading-6 text-center text-richblack-900 font-medium"
          >
            Learn More
          </CTAButton>

          <CTAButton
            active={false}
            linkto={"/login"}
            className="text-base leading-6 text-center text-black-5 font-medium"
          >
            Book a Demo
          </CTAButton>
        </div>

        {/* video-drop-shadow --> css clss to set backdrop-shadow css */}
        <div className="mx-3 my-16 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
          <video
            className="shadow-[8px_8px_rgba(255,255,255)] lg:shadow-[20px_20px_rgba(255,255,255)]"
            muted
            loop
            autoPlay
          >
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        {/* auto-typing coding block */}
        <div className="flex flex-col w-full h-full justify-center items-center">
          {/* Code Section 1 Typing Animation*/}
          <div>
            <CodeBlocks
              position={`flex-col lg:flex-row`}
              heading={
                <div className="text-3xl lg:text-4xl font-semibold">
                  <span>Unlock Your</span>{" "}
                  <HighlightText text={"coding potential"} />{" "}
                  <span>with our online courses</span>
                </div>
              }
              subheading={
                "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
              }
              ctabtn1={{
                btnText: "Try it yourself",
                linkto: "/signup",
                active: true,
              }}
              ctabtn2={{
                btnText: "Learn more",
                linkto: "/signup",
                active: false,
              }}
              codeblock={`<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1\nnav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n/nav>`}
              codeColor={`text-yellow-50 text-[16px] leading-[22px] font-mono font-bold`}
              backgroundGradient={
                <div className="codeblock1 absolute w-[60%] h-4/5 -top-[37px] -left-[35px] opacity-20 shadow-2xl filter blur-3xl"></div>
              }
            />
          </div>

          {/* Code Section 2 Typing Animation*/}
          <div>
            <CodeBlocks
              position={`flex-col lg:flex-row-reverse`}
              heading={
                <div className="text-3xl lg:text-4xl font-semibold">
                  <span>Start</span>{" "}
                  <HighlightText text={"coding in seconds "} />
                </div>
              }
              subheading={
                "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
              }
              ctabtn1={{
                btnText: "Continue Lesson",
                linkto: "/signup",
                active: true,
              }}
              ctabtn2={{
                btnText: "Learn More",
                linkto: "/signup",
                active: false,
              }}
              codeblock={`<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1\nnav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n/nav>`}
              codeColor={`text-white text-[16px] leading-[22px] font-mono font-bold`}
              backgroundGradient={
                <div className="codeblock2 absolute w-[60%] h-4/5 -top-[37px] -left-[35px] opacity-20 shadow-2xl filter blur-3xl"></div>
              }
            />
          </div>
        </div>

        {/* ExploreMore */}
        <ExploreMore />
      </div>

      {/* Section-2 */}
      <div className="bg-pure-greys-5 text-black-700">
        {/* bg-image Section */}
        <div className="homepage_bg h-[310px]">
          <div className="w-11/12 max-w-maxContent flex flex-col justify-center items-center gap-5 mx-auto">
            <div className="h-[45rem] lg:h-[150px]"></div>

            <div className="flex flex-row gap-7 text-white">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-3">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={"/signup"}>
                <div className="flex items-center gap-3">Learn More</div>
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7 mx-auto">
          <div className="flex flex-col md:flex-row gap-5 md:mb-10 mt-[500px] lg:mt-24">
            <div className="text-4xl block font-semibold w-full md:w-[60%]">
              Get the skills you need for a{" "}
              {<HighlightText text={"job that is in demand."} />}
            </div>

            <div className="flex flex-col gap-10 w-full md:w-2/5 items-start">
              <div className="text-[16px]">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <CTAButton active={true} linkto={"/signup"}>
                Learn More
              </CTAButton>
            </div>
          </div>

          <TimelineSection />
          <LearningLanguageSection />
        </div>
      </div>

      {/* Section-3 */}
      <div
        className="w-11/12 mx-auto max-w-maxContent flex flex-col items-stretch justify-center gap-8
      bg-richblack-900 text-white"
      >
        <InstructorSection />

        <h2 className="text-center mt-10 text-3xl md:text-4xl font-semibold">
          Reviews from other learners
        </h2>
        {/* Review Slider here */}
        <ReviewSlider />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
