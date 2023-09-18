import React, { useState } from "react";
import TemplateForm from "../components/core/Auth/TemplateForm";
import image from "../assets/Images/login.webp";
import { ACCOUNT_TYPE } from "../utils/constants";

const formStaticData = [
  {
    title: "Welcome Back",
    desc1: "Build skills for today, tomorrow, and beyond.",
    desc2: " Education to future-proof your career.",
    image: image,
    formtype: "login",
  },
];

const Login = () => {

  return (
    <div className="">
        <div>
          <TemplateForm {...formStaticData[0]} />
        </div>
    </div>
  );
};

export default Login;
