import React from 'react'
import CTAButton from "../HomePage/Button"
import { HighlightText } from "../HomePage/HighlightText"

const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere",
    description: "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description: "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description: "The learning process uses the namely online and offline.",
  },
  {
    order: 3,
    heading: "Certification",
    description: "You will get a certificate that can be used as a certification during job hunting.",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description: "You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor.",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description: "Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program.",
  },
]

const LearningGrid = () => {
  return (
    <div className='grid mx-auto grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mb-10 w-11/12 max-w-maxContent'>
      {
        LearningGridArray.map((card, index) => {
          return (
            <div
              key={index}
              className={`${index === 0 && card.order === -1 && "lg:col-span-2 lg:h-72 p-5 bg-transparent"}
                ${card.order % 2 === 1 ? "bg-richblack-700 lg:h-72 p-5" : "bg-richblack-800 lg:h-72 p-5" }
                ${card.order === 3 && index === 3 && "lg:col-start-2 p-5"}
              `}
            >
              {
                card.order < 0 
                ? (
                  <div className='lg:w-11/12 flex flex-col pb-5 gap-3'>
                    <div className='text-4xl font-semibold'>
                      {card.heading}
                      <HighlightText text={card.highlightText}/>
                    </div>

                    <p className='text-base text-richblack-100 font-medium font-inter'>
                      {card.description}
                    </p>

                    <div className='w-fit mt-4'>
                      <CTAButton active={true} linkto={card.BtnLink}>
                        {card.BtnText}
                      </CTAButton>

                    </div>
                  </div>
                )

                : (
                  <div className='flex flex-col p-7 gap-8'>
                    <h1 className='text-richblack-5 text-lg font-inter font-semibold'>
                      {card.heading}
                    </h1>
                    <p className='text-sm text-richblack-100 font-medium font-inter'>
                      {card.description}
                    </p>
                  </div>
                )
              }
            </div>
          )
        })
      }

    </div>
  )
}

export default LearningGrid