import React from 'react'
import Footer from '../components/Common/Footer'
import {
  HiChatBubbleLeftRight  as chat,
  HiGlobeEuropeAfrica as globe,
  HiPhone as phone} from "react-icons/hi2"

import ContactUsForm from '../components/Common/ContactPage/ContactUsForm'
import ReviewSlider from '../components/Common/ReviewSlider'

const contactBy = [
  {
    _id: 1,
    Icon: chat,
    title: "Chat on us",
    description1: "Our friendly team is here to help.",
    description2: "@mail address",
  },
  {
    _id: 2,
    Icon: globe,
    title: "Visit us",
    description1: "Come and say hello at our office HQ.",
    description2: "Here is the location/ address",
  },
  {
    _id: 3,
    Icon: phone,
    title: "Call us",
    description1: "Mon - Fri From 8am to 5pm",
    description2: "+123 456 7890",
  },
]

const Contact = () => {
  return (
    <div className='text-white'>

      {/* Section-1 */}
      <section className='mb-[5.625rem] mt-32 w-11/12 max-w-maxContent mx-auto'>

        <div className='flex flex-col md:flex-row gap-[3.25rem] 
                        justify-center items-center md:justify-center md:items-start'>

          <div className="flex grow flex-col h-full md:h-fit gap-6 p-6 w-[40%] bg-richblack-800 rounded-xl">
                 
              {
                contactBy && contactBy.map((element, index) => {

                  const {_id, Icon, title, description1, description2} = element;

                  return (

                    <div key={_id || index} className='flex flex-col md:flex-row gap-2 p-3'>

                      <Icon size={24} color='#AFB2BF'/>

                      <div className='flex flex-col gap-[0.125rem]'>

                        <h1 className="text-richblack-5 text-lg font-semibold font-inter">
                          {title}
                        </h1>

                        <p className='text-richblack-200 font-inter text-sm font-medium'>
                          {description1}
                        </p>

                        <p className='text-richblack-200 font-inter text-sm font-medium'>
                          {description2}
                        </p>

                      </div>
                      
                    </div>
                  )
                })
              }

          </div>

          <div className='flex flex-col border rounded-xl border-richblack-600 gap-y-8'>

            <div className='flex flex-col pt-[3.25rem] px-[3.25rem] gap-3'>
              <h2 className='text-richblack-5 font-semibold font-inter text-4xl'>Got a Idea? We’ve got the skills. Let’s team up</h2>

              <p>Tall us more about yourself and what you’re got in mind.</p>

            </div>

            <div className='flex justify-center items-center pb-[3.25rem]'>
              <ContactUsForm/>
            </div>
          </div>


        </div>

      </section>

      {/* Section-2 */}
      <section className="relative mx-auto flex my-20 w-11/12 max-w-maxContent flex-col 
      items-center justify-between gap-8 bg-richblack-900 text-white">
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
          {/* <ReviewSlider /> */}
        </h1>
        <ReviewSlider />
      </section>

      {/* Footer */}
      <Footer/>
      
    </div>
  )
}

export default Contact;