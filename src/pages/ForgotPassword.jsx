import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../services/oprations/authAPI";
import { AiOutlineArrowLeft } from "react-icons/ai";

const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");

  // from redux store
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));
  }
  
  return (
    <div className="text-white flex justify-center items-center h-screen w-11/12 mx-auto">
      {loading ? (
        <div className="text-richblack-5 m-auto w-full h-full">Loading...</div>
      ) : (
        <div className="flex flex-col gap-9 border p-8 max-w-maxContent sm:w-[50%] xl:w-[33%]">
          <h1 className="text-3xl leading-[38px] font-inter font-semibold text-richblack-5">
            {
              !emailSent ? "Reset Your Password" : "Check Your Email"
            }
          </h1>
          <p className="text-[18px] leading-[26px] font-inter font-normal text-richblack-100">
            {
              !emailSent
                ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                : `We have sent the reset email to ${email}`
            }
          </p>

          <form
            className="flex flex-col gap-9"
            onSubmit={handleOnSubmit}
          >
            {
              !emailSent && (
                <label className="flex flex-col gap-[6px]">
                  <p className="text-sm leading-[22px] font-inter font-normal text-richblack-5">Email address<sup className="text-pink-100  ">*</sup></p>
                  <input
                    required
                    name="email"
                    type="email"
                    value={email}
                    placeholder="Enter your placeholder"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 font-medium font-inter text-base bg-richblack-600 transition-all duration-200
                              text-richblack-5 shadow-[inset_0_-1px_0_0_rgba(255,255,255,0.18)] 
                              border rounded-lg"
                  />

                </label>
              )
            }

            <button
              type="submit"
              className="bg-yellow-50 text-black text-center text-base p-3 font-bold hover:scale-95
                          border rounded-lg shadow-[inset_-2px_-2px_0_0_rgba(0,0,0,0.12)] transition-all duration-200"
            >
              {
                !emailSent
                  ? ("Reset Password")
                  : ("Resend Email")
              }
            </button>
          </form>

          <div className="">
            <Link to={"/login"}
              className="flex flex-row items-center gap-3"
            >
              <AiOutlineArrowLeft size={18} className=""/>
              <p className="text-richblack-5 font-medium text-base font-inter"> Back to Login</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
