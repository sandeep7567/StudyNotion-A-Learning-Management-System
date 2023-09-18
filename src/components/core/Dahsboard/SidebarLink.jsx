import React from 'react'
import * as Icons from "react-icons/vsc"
import { NavLink, matchPath, useLocation } from 'react-router-dom';

const SidebarLink = ({link, iconName, className, setShow}) => {

  const Icon = Icons[iconName];
  
  const location = useLocation();

  const matchRoute = (route) => {
    return matchPath({path:route}, location.pathname)
  }

  return (
    
    <NavLink
      onClick={() => setShow(false)}
      to={link.path}
      className={ `relative px-8 py-2  ${matchRoute(link.path) ? "bg-yellow-800" : "bg-richblack-800" }` } 
    >
      <span className={`${matchRoute(link.path) ? "opacity-100" : "opacity-0"}
      absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50`}>

      </span>

      <div className={`flex items-center gap-x-2 `}>

        <Icon className={` text-lg ${matchRoute(link.path) ? "opacity-100 text-yellow-50" : "text-richblack-300 font-medium"} `}/>
        <span className={` ${matchRoute(link.path) ? "opacity-100 text-yellow-50" : "bg-opacity-0 text-richblack-300"} font-inter text-sm font-medium`}>{link.name}</span>
      </div>
    </NavLink>
  )
}

export default SidebarLink;