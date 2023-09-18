// css
import "./ContactUsForm.css";

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CountryCode from "../../../data/countrycode.json";
import "../../../App.css"
import { apiConnector } from "../../../services/apiconnector";
import {contactusEndpoint} from "../../../services/apis"
import toast from "react-hot-toast";

import Spinner from "../Spinner"


const ContactUsForm = () => {

  const {CONTACT_US_API} = contactusEndpoint;

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors, isSubmitSuccessful
    }
  } = useForm();

  const submitContactForm = async(data) => {
    
    // data && console.log("data log", data);
    const toastId = toast.loading("Loading...")
    
    try {
      setLoading(true);
      const response = await apiConnector("POST", CONTACT_US_API, data);
      // console.log("contactUs response", response);

      if(!response?.data?.success) {
        const message = "Mail Form Data Not Found"
        throw new Error(message)
      };
      
    } catch (error) {
      console.log("Error", error)
      console.log("Error message :", error.message)
      
    } finally {
      toast.dismiss(toastId);
      setLoading(false);
    }
  }

  useEffect(() => {
    if(isSubmitSuccessful) {
      reset({
        email:"",
        firstName:"",
        lastName:"",
        message:"",
        phoneNo:"",
      })
    }
  }, [isSubmitSuccessful, reset])

  return (
    // Submit form
    <form onSubmit={handleSubmit(submitContactForm)}>

      <div className="flex px-[3.25rem] flex-col gap-5">

        {/* firstName && lastName */}
        <div className='flex flex-col sm:flex-row gap-5'>

          {/* firstName */}
          <div className='w-full sm:w-1/2 flex flex-col gap-1'>
            <label className="lable-style" htmlFor="firstName">
              First Name
            </label>
              <input
                type="text"
                name='firstName'
                id='firstName'
                placeholder='Enter first name'
                {...register("firstName", {required:true})}
                className='form-style'
              />
              {
                errors.firstName && (
                  <span className="error-style">
                    Please enter your First Name
                  </span>
                )
              }
          </div>
          
          {/* lastName */}
          <div className='w-full sm:w-1/2 flex flex-col gap-1'>
            <label className="lable-style" htmlFor="lastName">
              Last Name
            </label>
              <input
                type="text"
                name='lastName'
                id='lastName'
                placeholder='Enter first name'
                {...register("lastName",)}
                className='form-style'
              />
              
          </div>

        </div>

        {/* email */}
        <div className='flex flex-col gap-1'>
          
            <label className="lable-style" htmlFor="email">Email Address</label>
            <input
              type="email"
              name='email'
              id='email'
              placeholder='Enter Email Address'
              {...register("email", {required:true})}
              className='form-style'
            />
            {
              errors.email && (
                <span className="error-style">
                  Please enter your email address
                </span>
              )
            }
        </div>

        {/* phoneNo */}
        <div className='flex flex-col gap-1'>

          <label className="lable-style" htmlFor="phonenumber">Phone Number</label>

          <div className='flex flex-row w-full h-full justify-center items-center gap-5'>

            {/* dropdown - select */}
              <select
                className='form-style w-[13%]'
                name="dropdown"
                id="dropdown"
                {...register("countrycode", {required:true})}
              >
                {
                  CountryCode.map((element, index) => {
                    return (
                      <option className='' key={index} value={element.code}>
                        {element.code} - {element.country}
                      </option>
                    )
                  })
                }
              </select>

            {/* Phone Number */}
              <input
                className='w-[87%] inline-flex form-style'
                type="number"
                name='phonenumber'
                id='phonenumber'
                placeholder='12345 67890'
                {...register("phoneNo", 
                {
                  required: {value:true, message:"Please Enter Valid Phone Number"},
                  maxLength: {value:10, message:"Invalid Phone Number"},
                  minLength: {value:8, message:"Invalid Phone Number"},})}
              />
          </div>
          {
            errors.phoneNo && (
              <span className="error-style">
                {errors.phoneNo.message}
              </span>
            )
          }

        </div>

        {/* message */}
        <div className='flex flex-col gap-1 mt-4'>
          <label className="lable-style" htmlFor="message">Message</label>
          <textarea
            name="message"
            id="message"
            cols="30"
            rows="7"
            placeholder='Enter your message here'
            {...register("message", {required:true})}
            className='form-style'
          />
          {
            errors.message && (
              <span className="error-style">
                Please Enter your message
              </span>
            )
          }
        </div>

        {/* Submit button */}
        <button
            type='submit'
            disabled={loading}
            className={`${loading ? "cursor-not-allowed" : "cursor-pointer"} w-full mt-4 rounded-md bg-yellow-100 text-center p-2 text-base font-semibold text-black`}
        >
          {loading 
            ? <div className="flex justify-center items-center gap-x-4">
                <div className={"w-8 h-8 border-6 border-richblack-5 bg-richblack-900 outline-dotted rounded-full animate-spin"}></div>
                Send Message
              </div>

            : "Send Message"
          }
        </button>

      </div>

    </form>
  )
}

export default ContactUsForm