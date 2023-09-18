import { useEffect, useState } from "react";

import { IconType } from "react-icons";
import { Link, matchPath, useLocation } from "react-router-dom";
import {
  AiFillHome,
  AiOutlineHome,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";

import { useSelector } from "react-redux";

import logo from "../../assets/Logo/Logo-Full-Light.png";
import smLogo from "../../assets/Logo/Logo-Small-Light.png";

import { NavbarLinks } from "../../data/navbar-links";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { ACCOUNT_TYPE } from "../../utils/constants";
import ProfileDropdown from "../core/Auth/ProfileDropDown";

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  // const courseCategoryChange = subLinks.map((subLink) => (
  //   subLink?.courses.length
  // ))

  useEffect(() => {
    const fetchingCatrogry = async () => {
      setLoading(true);
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        setSubLinks(res.data.data);
      } catch (error) {
        console.log("Could not fetch Categories.", error);
      } finally {
        setLoading(false);
      }
    };
    fetchingCatrogry();
  }, []);

  // console.log("sub links", subLinks)
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div
      className={`fixed z-10 inset-x-0 top-0 mx-auto border-opacity-60  w-full flex h-14 items-center justify-center border-b border-b-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            className="hidden md:block w-40 h-8"
            loading="lazy"
          />
          <img
            src={smLogo}
            alt="logo"
            className="block md:hidden w-6 h-6"
            loading="lazy"
          />
        </Link>
        {/* Navigation links */}
        <nav className="">
          <ul className="flex gap-x-7 text-richblack-25">
            {/* {JSON.stringify(NavbarLinks.map( link => link ))} */}
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <>
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      <p className="hidden md:block">{link.title}</p>
                      <p className="block md:hidden">{link.Icon}</p>
                      <BsChevronDown className="hidden md:block" />
                      <BsChevronDown className="block md:hidden" color="#125acd" />
                      
                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3rem] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                        {subLinks.length ? (
                          <>
                            {subLinks
                              ?.filter(
                                (subLink) => subLink?.courses?.length > 0
                              )
                              ?.map((subLink, i) => (
                                <Link
                                  to={`/catalog/${subLink.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                  className="rounded-lg bg-transparent py-2 pl-2 hover:bg-richblack-50"
                                  key={i}
                                >
                                  <p>{subLink.name}</p>
                                </Link>
                              ))}
                          </>
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      } ${"hidden md:block"}
                      `}
                    >
                      {link.title}
                    </p>

                    <div
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      } ${"block md:hidden"} relative group
                        `}
                    >
                      {link.Icon}
                      <p className="absolute invisible text-opacity-75 text-richblack-5 group-hover:visible -bottom-5 -right-10 text-xs">
                        {link.title}
                      </p>
                    </div>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Login / Signup / Dashboard */}
        <div className="items-center gap-x-4 flex">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute animate-bounce -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
              {totalItems === 0 && (
                <span className="absolute animate-bounce -top-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
        </div>
        {/* <button className="mr-4 md:hidden">
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button> */}
      </div>
    </div>
  );
}

export default Navbar;
