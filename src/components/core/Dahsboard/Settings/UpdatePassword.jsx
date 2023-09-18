import React, { useEffect, useState } from 'react'

// react icon
import { CiSaveUp2 } from 'react-icons/ci';
import { AiOutlineEyeInvisible } from "react-icons/ai"
import { AiOutlineEye } from "react-icons/ai"

// IconButton
import IconButton from '../../../Common/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { MdOutlineCancel } from 'react-icons/md';
import { changePassword } from '../../../../services/oprations/SettingsAPI';

const UpdatePassword = () => {

  // redux state management
  const { token, loading: authLoading} =  useSelector((state) => state.auth);
  const { user, loading: profileLoading} = useSelector((state) => state.profile);
  const dispatch = useDispatch()
  const navigate = useNavigate();
    
  // console.log(user, token)

  const [loading, setLoading] = useState(false)
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showConfirmChangePassword, setShowConfirmChangePassword] = useState(false);

  const passDigital = new RegExp(/^([^0-9, S]*)/)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful } 
  } = useForm({defaultValues:
      { 
        currentPassword: "",
        changePassword: "",
        confirmChangePassword: "",  
      }
    }
  )

  useEffect(() => {
    if(isSubmitSuccessful) {
      reset({
        currentPassword: "",
        changePassword: "",
        confirmChangePassword: "",
      })
    }
  }, [isSubmitSuccessful, reset])

  const submitPasswordForm = (formData) => {
    // console.log("password Data - ", formData)
    try {
      dispatch(changePassword(token, formData, navigate))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }
  
  return (
    <div className=' bg-richblack-800 border border-richblack-700 rounded-lg'>
        <div className="flex flex-col gap-5 p-11">
          <p className='text-richblack-5 font-inter text-lg font-semibold'>Password</p>

          {/* form */}
          <form
            onSubmit={handleSubmit(submitPasswordForm)}
            className='flex flex-col gap-5'>
            {/* confirmChangePassword and confirmChangePassword update input */}
            <div className='w-full flex flex-col lg:flex-row justify-center items-center gap-5'>
              <div className='relative flex flex-col w-full gap-y-2 lg:w-1/3'>
                <label className='flex w-full' htmlFor="currentPassword">Current Password</label>
                <input
                  className='flex w-full text-richblack-200 shadow-[inset_0px_-1px_0px_0px_rgba(255,255,255,0.25)] p-3 rounded-lg bg-richblack-700'
                  type={showCurrentPassword ? "text" : "password" }
                  name='currentPassword'
                  id='currentPassword'
                  {
                    ...register("currentPassword", {
                      required: {value: true, message: "write your current password"},
                    })
                  }
                />
                {
                  errors.currentPassword && (
                    <span className='text-yellow-100 text-sm opacity-50'>
                      {errors.currentPassword.message}
                    </span>
                  )
                }
                <span
                  onClick={() => {setShowCurrentPassword((prev) => !prev)}}
                  className='absolute left-1/2 top-1/2 translate-x-[500%] lg:translate-x-[400%] md:translate-x-[700%] translate-y-[10%] cursor-pointer'
                >
                  {
                    !showCurrentPassword 
                    ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/> 
                    : <AiOutlineEye fontSize={24} fill="#AFB2BF"/>
                  }
                </span> 
              </div>

              <div className='relative flex flex-col w-full gap-y-2 lg:w-1/3'>
                <label className='flex w-full' htmlFor="changePassword">Change Password</label>
                <input
                  className='flex w-full text-richblack-200 shadow-[inset_0px_-1px_0px_0px_rgba(255,255,255,0.25)] p-3 rounded-lg bg-richblack-700'
                  type={showChangePassword ? "text" : "password"}
                  name="changePassword"
                  id="changePassword"
                  {
                    ...register("changePassword", {
                      required: {value: true, message: "write the new password"},
                    })
                  }
                />
                {
                  errors.changePassword && (
                    <span className='text-yellow-100 text-sm opacity-50'>
                      {errors.changePassword.message}
                    </span>
                  )
                }
                
                <span
                  onClick={() => setShowChangePassword((prev) => !prev)}
                  className='absolute left-1/2 top-1/2 translate-x-[500%] lg:translate-x-[400%] md:translate-x-[700%] translate-y-[10%] cursor-pointer'
                >
                  {
                    !showChangePassword
                      ? (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>)
                      : (<AiOutlineEye fontSize={24} fill="#AFB2BF"/>)
                  }
                </span>
                
              </div>

              <div className='relative flex flex-col w-full gap-y-2 lg:w-1/3'>
                <label className='flex w-full' htmlFor="confirmChangePassword">Confirm Change Password</label>
                <input
                  className='flex w-full text-richblack-200 shadow-[inset_0px_-1px_0px_0px_rgba(255,255,255,0.25)] p-3 rounded-lg bg-richblack-700'
                  type={showConfirmChangePassword ? "text" : "password"}
                  name="confimeChangePassword"
                  id="confimeChangePassword"
                  {
                    ...register("confirmChangePassword", {
                      required: {value: true, message: "write the new password"},
                    })
                  }
                />
                {
                  errors.confirmChangePassword && (
                    <span className='text-yellow-100 text-sm opacity-50'>
                      {errors.confirmChangePassword.message}
                    </span>
                  )
                }
                
                <span
                  onClick={() => setShowConfirmChangePassword((prev) => !prev)}
                  className='absolute left-1/2 top-1/2 translate-x-[500%] lg:translate-x-[400%] md:translate-x-[700%] translate-y-[10%] cursor-pointer'
                >
                  {
                    !showConfirmChangePassword
                      ? (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>)
                      : (<AiOutlineEye fontSize={24} fill="#AFB2BF"/>)
                  }
                </span>
                
              </div>
            </div>

            {/* button cancel & save */}
            <div className='flex w-full flex-row justify-center lg:justify-end items-center gap-5 py-2'>
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
                
                <CiSaveUp2 className="w-6 h-6 mr-1" />
              </IconButton>
            </div>

          </form>

        </div>
    </div>
  )
}

export default UpdatePassword