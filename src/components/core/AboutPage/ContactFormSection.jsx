import React from 'react'
import ContactUsForm from '../../Common/ContactPage/ContactUsForm'

const ContactFormSection = () => {
  return (
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col gap-3'>
        <h1 className='text-richblack-5 text-center font-inter text-4xl font-semibold'>
          Get in Touch
        </h1>

        <p className='text-richblack-300 text-center font-inter text-base font-medium'>
          We'd love to here for you, Please fill out this form
        </p>
      </div>
      <div>
        <ContactUsForm/>
      </div>
    </div>
  )
}

export default ContactFormSection