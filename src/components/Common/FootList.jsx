import React from "react";
import { Link } from "react-router-dom";

const FootList = ({ footerLink1, footerLink2 }) => {
  const { title, links } = footerLink1 || footerLink2;
  return (
    <div className="flex flex-col gap-3">
      <div className="font-inter text-base font-semibold text-richblack-100">
        {title}
      </div>
      <div>
        {links.map((el, i) => {
          return (
            <div key={i} className="text-[14px] cursor-pointer text-richblack-400 hover:text-richblack-50 transition-all duration-200 mt-2">
              <Link to={el.link.split(" ").join("-").toLocaleLowerCase()}>
                {el.title}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FootList;
