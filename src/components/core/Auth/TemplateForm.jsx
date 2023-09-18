import React from "react";

import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import frameImage from "../../../assets/Images/frame.png";

import Spinner from "../../Common/Spinner";

const TemplateForm = ({
  title,
  desc1,
  desc2,
  image,
  formtype,
}) => {
  return (
    <div className="grid mt-16 min-h-[calc(100vh-3.5rem)] place-items-center">
      {false ? (
        <div className="spinner w-full h-full text-lg bg-white"><Spinner/></div>
      ) : (
      <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-evenly gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12 ">
        <div className="mx-auto w-11/12 max-w-sm md:mx-0">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
            {title}
          </h1>
          <p className="mt-4 text-[1.125rem] leading-[1.625rem] lg:h-14">
            <span className="text-richblack-100 font-inter font-normal text-lg">
              {desc1}
            </span>
            <span className="text-blue-100 font-edu-sa font-bold italic text-base">
              {desc2}
            </span>
          </p>
          {formtype === "signup" ? (
            <SignupForm />
          ) : (
            <LoginForm />
          )}
        </div>
        <div className="relative mx-auto w-11/12 max-w-xs md:max-w-md md:mx-0">
          <img
            src={frameImage}
            alt="Pattern"
            width={558}
            height={504}
            loading="lazy"
          />
          <img
            className="absolute -top-4 right-4 md:-top-4 md:right-4 "
            src={image}
            alt="Students"
            width={558}
            height={504}
            loading="lazy"
          />
        </div>
      </div>
      )}
    </div>
  );
};

export default TemplateForm;
