import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { resetPassword } from '../services/oprations/authAPI';
import { FaArrowLeft } from 'react-icons/fa';

const UpdatePassword = () => {
  const navigate = useNavigate()

  const location = useLocation();

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    password:"",
    confirmPassword:"",
  });
  const {password, confirmPassword} = formData;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const {loading} = useSelector((state) => state.auth);

  const handleOnChange = (e) => {
    const {name, value} = e.target 
    setFormData((prevData) => 
    (
        {
          ...prevData,
          
          [name]: value,
        }
      )
    )
  }
    
    const handleOnSubmit = (e) => {
      const token = location.pathname.split("/").at(-1);

      e.preventDefault()
      dispatch(resetPassword(password, confirmPassword, token, navigate))

    }

  return (
    <div className='flex justify-center items-center h-screen w-11/12 mx-auto'>
      {
        loading
          ? (<div className='text-richblack-5 m-auto w-full h-full'>Loading...</div>)
          : (
            <div className='flex flex-col gap-6 p-8 max-w-maxContent sm:w-[50%] xl:w-[33%]'>

              <h1 className="text-3xl leading-[38px] font-inter font-semibold text-richblack-5">Choose  new password</h1>
              <p className="text-[18px] leading-[26px] font-inter font-normal text-richblack-100">Almost done. Enter your new password and youre all set.</p>

              <form
                onSubmit={handleOnSubmit}
                className='flex flex-col gap-5'
              >

                <label className="relative flex flex-col gap-[6px] ">
                  <p className="text-sm leading-[22px] font-inter font-normal text-richblack-5">New Password<sup className='text-pink-100'>*</sup></p>
                  <input
                    required
                    type={showPassword ? ("text") : ("password")}
                    name='password'
                    value={password}
                    onChange={handleOnChange}
                    placeholder='Password'
                    className='w-full p-3 font-medium font-inter text-base bg-richblack-600 transition-all duration-200
                    text-richblack-5 shadow-[inset_0_-1px_0_0_rgba(255,255,255,0.18)] 
                    border rounded-lg'
                  />
                  <span
                      onClick={() => setShowPassword((prev) => !prev)}
                      className='absolute left-1/2 top-1/2 translate-x-[650%] translate-y-[5%] cursor-pointer'
                    >
                      {
                        !showPassword
                          ? (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>)
                          : (<AiOutlineEye fontSize={24} fill="#AFB2BF"/>)
                      }
                    </span>
                </label>

                <label className="relative flex flex-col gap-[6px] mb-2">
                  <p className="text-sm leading-[22px] font-inter font-normal text-richblack-5">Confirm Password<sup className='text-pink-100'>*</sup></p>
                  <input
                    required
                    type={showConfirmPassword ? ("text") : ("password")}
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={handleOnChange}
                    placeholder='Confirm Password'
                    className='w-full p-3 outline-none font-medium font-inter text-base bg-richblack-600 transition-all duration-200
                    text-richblack-5 shadow-[inset_0_-1px_0_0_rgba(255,255,255,0.18)] 
                    border rounded-lg'
                    
                  />
                    <span
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className='absolute left-1/2 top-1/2 translate-x-[650%] translate-y-[5%] cursor-pointer'
                    >
                      {
                        !showConfirmPassword
                          ? (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>)
                          : (<AiOutlineEye fontSize={24} fill="#AFB2BF"/>)
                      }
                    </span>

                </label>

                <button 
                  type="submit"
                  className="bg-yellow-50 text-black text-center text-base p-3 font-bold hover:scale-95
                              border rounded-lg shadow-[inset_-2px_-2px_0_0_rgba(0,0,0,0.12)] transition-all duration-200"
                >
                  Reset Password
                </button>

              </form>

              <div>
                <Link to={"/login"} className='flex flex-row flex-1 items-center mx-auto gap-x-3'>
                  <FaArrowLeft size={16}/>
                  <p className=''>Back to Login</p>
                </Link>
              </div>

            </div>
          )
      }
    </div>
  )
}

export default UpdatePassword