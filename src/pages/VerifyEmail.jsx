import React, { useEffect, useState } from 'react'
import OTPInput from 'react-otp-input'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

// Post req;
import { sendOtp, signUp } from '../services/oprations/authAPI'

// Icons
import { FaArrowLeft } from 'react-icons/fa'
import { VscRefresh } from 'react-icons/vsc'

// import OTPInput style object from constants
import { containerStyle, inputStyle } from "../utils/constants"

const VerifyEmail = () => {

  const {loading, signupData} = useSelector((state) => state.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // react-otpInput
  const [otp, setOtp] = useState([]);

  // data not enter in input
  useEffect(() => {
    if(!signupData) {
      navigate("/signup");
    }
  }, [])

  const handleOnSubmit = (e) => {
    e.preventDefault();
    
    // getting destructuring data from redux auth store state --> signupData
    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword, 
    } = signupData

    dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate));
  }
  
  return (
    <div className='text-richblack-25 flex justify-center items-center w-11/12 mx-auto h-screen'>
      {
        loading 
          ? (
              <div className='m-auto w-full h-full text-richblack-5'>
                Loading....
              </div>
            ) 
          : (
            <div className='flex flex-col gap-6 p-8 max-w-maxContent sm:w-[50%] xl:w-[33%]'>

              <h1 className="text-3xl leading-[38px] font-inter font-semibold text-richblack-5">Verify Email</h1>
              <p className="text-[18px] leading-[26px] font-inter font-normal text-richblack-100">A Verification code has been sent to you. Enter the code below</p>

              <form
                onSubmit={handleOnSubmit}
                className='flex flex-col gap-9'
              >
                  <OTPInput
                    inputStyle={inputStyle}
                    containerStyle={containerStyle}
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span className='text-richblack-5'>-</span>}
                    renderInput={(props) => (<input className='' {...props} placeholder='-'
                    />)}
                  />

                  <button
                    type='submit'
                    className="bg-yellow-50 text-black text-center text-base p-3 font-bold hover:scale-95
                              border rounded-lg shadow-[inset_-2px_-2px_0_0_rgba(0,0,0,0.12)] transition-all duration-200"
                  >
                    Verify Email
                  </button>
              </form>
              <div className='flex flex-row justify-between items-center text-center'>
                <div className="text-richblack-5 w-fit text-center text-base p-3 font-normal hover:scale-95
                            transition-all duration-200">
                  <Link to={"/login"} className='flex flex-row text-center justify-center items-center gap-x-2'>
                    <FaArrowLeft/>
                    back to Login
                  </Link>
                </div>

                <button
                  onClick={() => dispatch(sendOtp(signupData.email, navigate))}
                  className="w-fit text-blue-100 text-center text-base p-3 font-normal hover:scale-95
                            transition-all duration-200 flex flex-row justify-center items-center gap-x-2"
                >
                  <VscRefresh/>
                  Resend it
                </button>

              </div>
            </div>
          )
      }
    </div>
  )
}

export default VerifyEmail