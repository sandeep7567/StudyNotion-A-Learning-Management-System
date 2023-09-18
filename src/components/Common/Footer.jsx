import React from "react";
import FootList from "./FootList";
import { FooterLink1, FooterLink2, BottomFooter } from "../../data/footer-links";
// Images
import Logo from "../../assets/Logo/Logo-Full-Light.png";
// Icons
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
      <div className="mt-[3.25rem] bg-richblack-800 border-t-[1px] border-richblack-600">
      <div className="w-11/12 pb-[3.25rem] h-fit max-w-maxContent flex flex-col gap-9 justify-center items-center mx-auto">
        {/* main section */}
        <div className="flex flex-row justify-center gap-12 pt-[3.25rem] pb-[2.25rem] w-full border-b border-b-richblack-600">
          <div className="grid xs:grid-cols-2 lg:grid-cols-3 w-[50%] gap-3 border-r border-r-richblack-700">
            {/* col-1 */}
            <div className="flex flex-col gap-3 flex-1 flex-grow-0 flex-shrink-0">
              {/* logo */}
              <div>
                <img className="w-40 h-8 bg-cover bg-no-repeat bg-center" src={Logo} alt="studyNotionLogo" />
              </div>
              <div>
                <FootList footerLink1={FooterLink1[0]} />
              </div>
              <div className="flex gap-3 cursor-pointer">
                 <FaFacebook size={18} className="text-richblack-400" />
                 <FaGoogle size={18} className="text-richblack-400" />
                 <FaTwitter size={18} className="text-richblack-400" />
                 <FaYoutube size={18} className="text-richblack-400" />
              </div>
            </div>
            {/* col-2 */}
            <div className="flex flex-col gap-9">
              <div>
                <FootList footerLink1={FooterLink1[1]} />
              </div>
              <div>
                <FootList footerLink1={FooterLink1[2]} />
              </div>
            </div>
            {/* col-3 */}
            <div>
              <div className="flex flex-col gap-9">
                <div>
                  <FootList footerLink1={FooterLink1[3]} />
                </div>
                <div>
                  <FootList footerLink1={FooterLink1[4]} />
                </div>
              </div>
            </div>
          </div>
          <div className="grid xs:grid-cols-2 lg:grid-cols-3 gap-3 w-[50%] border-r-richblack-700">
            <div>
              <FootList footerLink2={FooterLink2[0]} />
            </div>
            <div>
              <FootList footerLink2={FooterLink2[1]} />
            </div>
            <div>
              <FootList footerLink2={FooterLink2[2]} />
            </div>
          </div>
        </div>
        {/* other section */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start w-full">
          <div className="flex flex-col lg:flex-row gap-2 font-inter text-sm leading-[22px]
            text-richblack-300 font-medium text-center">
            {
              BottomFooter.map((el, i) => {
                return (
                  <div
                    className={` ${BottomFooter.length - 1 === i 
                      ? "" : "border-r text-center border-richblack-600 cursor-pointer text-richblack-300 transition-all duration-200"} pr-3 `}
                    key={i}
                  >
                    <Link className="hover:text-richblack-50"
                      to={el.split(" ").join("-").toLocaleLowerCase()}
                    >
                      {el}
                    </Link>
                  </div>
                )
              })
            }
          </div>
          <div className="text-center font-inter text-sm leading-[22px] text-richblack-300 font-medium">
            Made by ❤️ Sandeep Thakur © 2023 Studynotion
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Footer;