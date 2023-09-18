import React, { useEffect, useState } from 'react'
import CountryCode from '../../../../data/countrycode.json'

// css input
import "../../../Common/ContactPage/ContactUsForm";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { MdOutlineCancel } from 'react-icons/md';
import IconButton from '../../../Common/IconButton';
import { CiSaveUp2 } from 'react-icons/ci';
import { updateProfile } from '../../../../services/oprations/SettingsAPI';
import Error from '../../../../pages/Error';

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

const EditProfile = () => {
  
  // redux state management
  const { user} = useSelector((state) => state.profile);
  const { token,} =  useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log(user)
  
  const [loading, setLoading] = useState(false);

  const passDigital = new RegExp(/^([^0-9, S]*)/)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful } 
  } = useForm() 

  useEffect(() => {
    if(isSubmitSuccessful) {
      reset()
    }
  }, [isSubmitSuccessful, reset])

  const submitAdditionalDetails = (data) => {
    
    data && console.log("data", data);

    try {
      setLoading(false);
      
      dispatch(updateProfile( token, data, navigate ));

    } catch (error) {
      console.log("Error", error.message);
      setLoading(true);
    }
  };

  return (
    <div className='bg-richblack-800 border border-richblack-700 rounded-lg'>
        <div className="flex flex-col gap-5 p-11">
          <p className='text-richblack-5 font-inter text-lg font-semibold'>Profile Information</p>

          {/* form */}
          <form className='flex flex-col gap-5'
            onSubmit={handleSubmit(submitAdditionalDetails)}
          >
            {/* firstname and lastname update input */}
            <div className='w-full flex flex-col md:flex-row justify-center items-center gap-5'>
              <div className='flex flex-col w-full md:w-1/2'>
                <label className='flex w-full' htmlFor="firstName">First Name</label>
                <input
                type="text"
                name='firstName'
                id='firstName'
                placeholder='First Name'
                className='flex w-full text-richblack-200 shadow-[inset_0px_-1px_0px_0px_rgba(255,255,255,0.25)] p-3 rounded-lg bg-richblack-700'
                { ...register('firstName', 
                    { pattern: 
                      { value: passDigital,
                        message:"Please Enter Valid First Name"
                      },
                      required: {
                        value:true,
                        message:"Not Compulsory to Update"
                      }
                    }
                  )
                } 
                defaultValue={user?.firstName}
              />
                {
                  errors.firstName && (
                    <span className='text-yellow-100 text-sm opacity-50'>
                      {errors.firstName.message}
                    </span>
                  )
                }
              </div>
              <div className='flex flex-col w-full md:w-1/2'>
                <label className='flex w-full' htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder='Last Name'
                  className='flex w-full text-richblack-200 shadow-[inset_0px_-1px_0px_0px_rgba(255,255,255,0.25)] p-3 rounded-lg bg-richblack-700'
                  { ...register('lastName', 
                      { pattern: 
                        { value: passDigital,
                         message:"Please Enter Valid Last Name"
                        },
                        required: {
                          value: true,
                          message:"Not Compulsory"
                        }
                      }
                    )
                  }
                  defaultValue={user?.lastName}
                />
                  {
                    errors.lastName && (
                      <span className='text-sm text-yellow-100 opacity-50'>
                        {errors.lastName.message}
                      </span>
                    )
                  }
                                
              </div>
            </div>

            {/* DOB and Gender update input */}
            <div className='w-full flex flex-col md:flex-row justify-center items-center gap-5'>
              <div className='flex flex-col w-full md:w-1/2'>
              <label htmlFor="dateOfBirth"className="lable-style">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                className="text-richblack-200 shadow-[inset_0px_-1px_0px_0px_rgba(255,255,255,0.25)] p-3 rounded-lg bg-richblack-700"
                {...register("dateOfBirth", {
                  required: {
                    value: true,
                    message: "Please enter your Date of Birth.",
                  },
                  max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Date of Birth cannot be in the future.",
                  },
                })}
                defaultValue={user?.additionalDetails?.dateOfBirth}
              />
              {errors.dateOfBirth && (
                <span className="-mt-1 text-sm text-yellow-100 opacity-50">
                  {errors.dateOfBirth.message}
                </span>
              )}
              </div>
              <div className='w-full md:w-1/2'>
                <label htmlFor="gender" className='w-1/2'>Gender</label>
                <select
                  name="gender"
                  id="gender"
                  className='w-full flex text-richblack-200 shadow-[inset_0px_-1px_0px_0px_rgba(255,255,255,0.25)] p-3 rounded-lg bg-richblack-700'
                  {...register("gender", {
                    required: {
                      value: true, message: "Its Not compulsory to fill",
                    },
                    
                  })}
                  defaultValue={user?.additionalDetails?.gender}
                >
                  {genders.map((ele, i) => {
                  return (
                    <option key={i} value={ele}>
                      {ele}
                    </option>
                  )
                })}
                </select>
                {
                  errors.gender && (
                    <span className='text-sm text-yellow-100'>
                      {errors.gender.message}
                    </span>
                  )
                }

              </div>
            </div>

            {/* Contact Number and About update input */}
            <div className='w-full flex flex-col md:flex-row gap-5'>
              <div className='w-full md:w-1/2 flex flex-col'>
                <label htmlFor="contactNumber">Contact Number</label>
                <div className='flex flex-row w-full h-full justify-center items-center gap-5'>

              {/* dropdown - select */}
              <select
                className='w-[19%] text-richblack-200 shadow-[inset_0px_-1px_0px_0px_rgba(255,255,255,0.25)] p-3 rounded-lg bg-richblack-700'
                name="dropdown"
                id="dropdown"
                {...register("countrycode", {
                  required: {
                    value: true, message: "Its Not compulsory to fill"
                  }
                })}
                defaultValue={user?.additionalDetails?.countrycode}
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
              {
                  errors.countrycode && (
                    <span className='text-sm text-yellow-100'>
                      {errors.countrycode.message}
                    </span>
                  )
                }

              {/* Phone Number */}
              <input
                className='w-[87%] inline-flex text-richblack-200 shadow-[inset_0px_-1px_0px_0px_rgba(255,255,255,0.25)] p-3 rounded-lg bg-richblack-700'
                type="number"
                name='phonenumber'
                id='phonenumber'
                placeholder='123-456-7890'
                {...register("contactNumber", 
                {
                  required: {value:true, message:"Please Enter Valid Phone Number"},
                  maxLength: {value:10, message:"Invalid Phone Number"},
                  minLength: {value:8, message:"Invalid Phone Number"},
                  valueAsNumber: {value:true, message:"write valid Phone Number"},
                })}
                defaultValue={user?.additionalDetails?.contactNumber}
              />
              </div>
                {
                  errors.contactNumber && (
                    <span className='text-sm text-yellow-100'>
                      {errors.contactNumber.message}
                    </span>
                  )
                }  
                
              </div>

              <div className='w-full md:w-1/2 flex flex-col'>
                <label htmlFor="about">About</label>
                <input
                  type="text"
                  name="about"
                  id="about"
                  placeholder='Tell me about yourself'
                  className='text-richblack-200 shadow-[inset_0px_-1px_0px_0px_rgba(255,255,255,0.25)] p-3 rounded-lg bg-richblack-700'
                  {...register("about",
                    {
                      required: {value: true, message:"Write something about yourself"},
                    }
                  )}
                  defaultValue={user?.additionalDetails?.about}
                />
                {
                  errors.about && (
                    <span className='text-sm text-yellow-100 opacity-50'>
                      {errors.about.message}
                    </span>
                  )
                } 
              </div>

            </div>

            {/* button cancel & save */}
            <div className='flex w-full flex-row justify-center  md:justify-end items-center gap-5 py-2'>
              <button
                onClick={() => {
                  return navigate("/dashboard/my-profile")}}
                type='reset'
                className='flex items-center bg-richblack-500 text-richblack-5 text-center 
                            font-medium px-4 py-2 rounded-lg hover:bg-richblack-400 border-b border-r border-richblack-100 hover:scale-105 hover:shadow-[2px_2px_5px_1px_rgba(250,250,250,0.2)]'
              >
                <MdOutlineCancel className="w-6 h-6 mr-1"/>
                Cancel
              </button>

              <IconButton
                type={"submit"}
                text={"Save"}
                customClasses={`flex flex-row-reverse justify-center items-center text-center flex text-center
                                py-2 px-4 font-medium rounded-lg border-1 bg-yellow-50 
                                text-richblack-700 hover:bg-yellow-100  hover:bg-yellow-200 border-b border-r border-richblack-100 hover:scale-105 hover:shadow-[2px_2px_5px_1px_rgba(250,250,250,0.2)]`}
              >
                
                <CiSaveUp2 className="w-6 h-6 mr-1"/>
              </IconButton>
            </div>

          </form>

        </div>
    </div>
  )
}

export default EditProfile