import React from 'react';
import { HighlightText } from './HighlightText';
import know_your_progress from "../../../assets/Images/Know_your_progress.png";
import compare_with_others from "../../../assets/Images/Compare_with_others.png";
import plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png";
import CTAButton from "../../../components/core/HomePage/Button";

const LearningLanguageSection = () => {
  return (
    <div className='mt-[130px] mb-32'>
      <div className='flex flex-col gap-5 items-center'>

        <div className='text-4xl font-semibold text-center '>
          Your Swiss Knife for{" "}
          <HighlightText text={"learning any language"} />
        </div>

        <div className='text-center text-richblack-600 mx-auto text-base font-medium w-[70%]'>
          Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
        </div>

        <div className='w-fit flex flex-col lg:flex-row justify-center items-center mt-5'>
          <img 
            src={know_your_progress}
            alt="know_your_progress"
            loading='lazy'
            className='object-contain -mb-12 lg:-mr-36'
          />
          <img 
            src={compare_with_others}
            alt="compare_with_others"
            loading='lazy'
            className='object-contain'
          />
          <img 
            src={plan_your_lessons}
            alt="plan_your_lessons"
            loading='lazy'
            className='object-contain -mt-[4.5rem] lg:-ml-36'
          />
        </div>

        <div className='w-fit'>
          <CTAButton
            active={true}
            linkto={"/signup"}
          >
            <div>
              Learn More
            </div>
          </CTAButton>
        </div>
      </div>
    </div>
  )
}

export default LearningLanguageSection