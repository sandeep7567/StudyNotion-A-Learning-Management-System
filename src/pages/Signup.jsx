import React, { useState } from "react";
import TemplateForm from "../components/core/Auth/TemplateForm";
import image from "../assets/Images/signup.webp";
import {ACCOUNT_TYPE} from "../utils/constants";

const formStaticData = [
  {
    title: "Join the millions learning to code with StudyNotion for free",
    desc1: "Build skills for today, tomorrow, and beyond.",
    desc2: " Education to future-proof your career.",
    image: image,
    formtype: "signup",
  },
  {
    title: "Welcome Back",
    desc1: "Discover your passions,",
    desc2: " Be Unstoppable",
    image: image,
    formtype: "signup",
  },
];


const Signup = () => {
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT || ACCOUNT_TYPE.INSTRUCTOR);

  return (
    <div>
      {accountType === ACCOUNT_TYPE.STUDENT && (
        <div>
          <TemplateForm {...formStaticData[0]} accountType={accountType} setAccountType={setAccountType} />
        </div>
      )}
      {accountType === ACCOUNT_TYPE.INSTRUCTOR && (
        <div>
          <TemplateForm {...formStaticData[1]} accountType={accountType} setAccountType={setAccountType} />
        </div>
      )}
    </div>
  );
};

export default Signup;
