import React from "react";
import { HighlightText } from "../components/core/HomePage/HighlightText";
import BannerImage1 from "../assets/Images/aboutus1.webp";
import BannerImage2 from "../assets/Images/aboutus2.webp";
import BannerImage3 from "../assets/Images/aboutus3.webp";
import Quote from "../components/core/AboutPage/Quote";
import FoundingStory from "../assets/Images/FoundingStory.png";
import StatsComponent from "../components/core/AboutPage/StatsComponent";
import LearningGrid from "../components/core/AboutPage/LearningGrid";
import ContactFormSection from "../components/core/AboutPage/ContactFormSection";
import Footer from "../components/Common/Footer"
import ReviewSlider from "../components/Common/ReviewSlider";

const About = () => {
  return (
    <div className="">
      {/* Section-1 */}
      <section className="bg-richblack-800 pt-24">  
        <div className="relative max-w-7xl w-11/12 gap-12 mx-auto flex flex-col text-center
                        justify-center items-center pb-[64rem] sm:pb-[60rem] lg:pb-72">

          <header className="flex flex-col gap-9">

            <p className="font-inter text-base font-normal text-richblack-200 text-center">About us</p>

            <div className="px-16">
              <h1 className="text-richblack-5 text-center font-inter text-4xl leading-tight">
                Driving Innovation in Online Education for a
              </h1>
              <span className="inline-flex text-richblack-5 text-center font-inter text-4xl leading-tight mb-4">
                  <HighlightText text={"Brighter Future"} />
              </span>
              <p className="lg:w-[64%] mx-auto text-richblack-300 font-inter flex justify-center items-center text-base font-medium text-center">
                Studynotion is at the forefront of driving innovation in online
                education. We're passionate about creating a brighter future by
                offering cutting-edge courses, leveraging emerging technologies,
                and nurturing a vibrant learning community.
              </p>
            </div>

          </header>

          <div className="absolute top-[38%] md:top-[25%] lg:top-[50%] sm:top-[30%] flex flex-col sm:flex-col md:flex-col lg:flex-row mx-auto 
                          gap-y-6 gap-x-6 justify-center items-center ">
            <img className="bg-no-repeat bg-cover bg-center" src={BannerImage1} alt="BannerImage-1" />
            <img className="bg-no-repeat bg-cover bg-center" src={BannerImage2} alt="BannerImage-2" />
            <img className="bg-no-repeat bg-cover bg-center" src={BannerImage3} alt="BannerImage-3" />
          </div>

        </div>
      </section>

      {/* <div className="h-32 sm:h-36 md:h-32 lg:h-24"></div>   */}

      {/* Section-2 */}
      <section className="mt-10 mx-auto min-[420px]:mt-44 sm:mt-40 md:mt-40 lg:mt-12 border-b border-richblack-700">
        <div className="flex w-11/12 max-w-maxContent  justify-center items-center mx-auto">
          <Quote />
        </div>
      </section>

      {/* Section-3 */}
      <section className="py-[5.625rem]">
        <div className="flex w-11/12 max-w-maxContent  justify-center items-center mx-auto flex-col gap-[5.625rem]">

            {/* Foundry story wala div */}
            <div className="flex w-11/12 flex-col md:flex-col lg:flex-row justify-center items-center gap-24">

                {/* Founding story left box */}
                <div className="flex flex-col w-full lg:w-1/2 gap-6">
                    <h1 className="font-inter text-4xl font-semibold bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-transparent">
                      Our Founding Story
                    </h1>
                    <div className="flex flex-col justify-center items-center gap-4">
                      <p className="text-richblack-300 text-base font-inter font-medium">
                        Our e-learning platform was born out of a shared vision and passion for transforming 
                        education. It all began with a group of educators, technologists, and lifelong learners 
                        who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                      </p>
                      <p className="text-richblack-300 text-base font-inter font-medium">
                        As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We
                        believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We
                        envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full
                        potential.
                      </p>
                    </div>
                </div>

                  {/* Founding story right box */}
                <div className="w-11/12 md:w-3/5 lg:w-1/2 p-8">
                    <img className="bg-cover bg-center bg-no-repeat lg:w-full" src={FoundingStory} alt="Founding-Story" />
                </div>
                
            </div>

            {/* vision and mission wala parent dive */}
            <div className="flex w-11/12 flex-col sm:flex-row justify-center items-center gap-24">

              {/* left box */}
              <div className="flex flex-col gap-6 w-full lg:w-1/2">

                <h1 className="font-inter text-4xl font-semibold bg-gradient-to-bl from-[#E65C00] to-[#F9D423] bg-clip-text text-transparent">
                  Our Vision
                </h1>

                <p className="text-richblack-300 text-base font-inter font-medium">With this vision in mind, we set out on a journey to create an e-learning platform that 
                  would revolutionize the way people learn. Our team of dedicated experts worked tirelessly 
                  to develop a robust and intuitive platform that combines cutting-edge technology with engaging 
                  content, fostering a dynamic and interactive learning experience.
                </p>

              </div>

              {/* right wala box */}
              <div className="flex flex-col gap-6 lg:w-1/2 w-full">

                <h1 className="font-inter text-4xl font-semibold ">
                  <HighlightText text={"Our Mission"}/>
                </h1>

                <p className="text-richblack-300 text-base font-inter font-medium">
                  our mission goes beyond just delivering courses online. We wanted to create a vibrant community
                   of learners, where individuals can connect, collaborate, and learn from one another. 
                   We believe that knowledge thrives in an environment of sharing and dialogue, and we foster 
                   this spirit of collaboration through forums, live sessions, and networking opportunities.
                </p>

              </div>

            </div>

        </div>
      </section>

      {/* Section-4 */}
      <StatsComponent />

      {/* Section-5 */}
      <section className="mx-auto flex flex-col justify-center items-center gap-44 my-20">
        <LearningGrid />
        <ContactFormSection />
      </section>

      {/* Section-6 */}
      <section className="relative mx-auto flex my-20 w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
          {/* <ReviewSlider /> */}
        </h1>
        <ReviewSlider />
      </section>

      {/* Section-7 */}
      <Footer />
    </div>
  );
};

export default About;
