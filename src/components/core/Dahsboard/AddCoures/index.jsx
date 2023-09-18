import React from 'react'
import DashboardHeading from '../../../Common/DashboardHeading'
import RenderSteps from './RenderSteps'

const courseTips = [
  "Set the Course Price option or make it free.",
  "Standard size for the course thumbnail is 1024x576.",
  "Video section controls the course overview video.",
  "Course Builder is where you create & organize a course.",
  "Add Topics in the Course Builder section to create lessons, quizzes, and assignments.",
  "Information from the Additional Data section shows up on the course single page.",
  "Make Announcements to notify any important",
  "Notes to all enrolled students at once.",
]

const AddCourse = () => {
  return (
    <>
      <div className='text-white scroll-smooth flex flex-col lg:flex-row gap-x-10 overflow-x-hidden overflow-y-hidden
                        max-w-sm sm:max-w-md md:max-w-lg lg:max-w-4xl mx-auto gap-y-10 mb-8'>
        <div className=''>

          <DashboardHeading customClasses={`hidden md:flex w-fit px-8 py-2.5 shadow-[0px_1px_0px_0px_rgba(255,255,255,0.5)] hover:shadow-[0px_2px_10px_1px_rgba(255,255,255,0.8)] bg-yellow-600 bg-opacity-60 hover:bg-opacity-70 rounded-full`}>
            <h1>Add Course</h1>
          </DashboardHeading>

          <div className='mt-16 mx-auto'>
            <RenderSteps/>
          </div>
        </div>

        <div className='bg-richblack-800 h-fit rounded-md flex flex-col justify-center items-start gap-y-5'>
          <p className='text-lg font-semibold pt-6 px-6 text-richblack-5'>⚡ Code Upload Tips</p>
          <div className='flex flex-col  pb-6 px-12 justify-center items-start'>
            {
              courseTips.map((courseTip, index) => (
                <ul className='list-disc' key={index}>
                  <li
                    className='list-outside mb-2.5 text-xs font-medium text-richblack-5'
                  >
                    {courseTip}
                  </li>
                </ul>
              ))
            }
          </div>
        </div>
        
      </div>
      
    </>
  )
}

export default AddCourse