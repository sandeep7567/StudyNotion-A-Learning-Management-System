import React from 'react'
import { sidebarLinks } from '../../data/dashboard-links'
import { useSelector } from 'react-redux'
import SidebarLink from '../core/Dahsboard/SidebarLink'
import { NavLink, useLocation } from 'react-router-dom'
import * as Icons from "react-icons/vsc"


const DashboardHeading = ({
  children,
  customClasses
}) => {
  const location = useLocation();
  const { user } = useSelector((state) => state.profile)

  return (
    <>
      {children
        ? (<div className={`${customClasses}`}>{children}</div>)
        : sidebarLinks
            .filter((link) => link.path === location.pathname)
            .map(({ id, icon, name, path, type }) => {
                if (type && user?.accountType !== type) return null
                // const { id, icon, name, path, type } = link
                const Icon = Icons[icon]
                  return (

                      <NavLink
                        key={id}
                        to={path}
                        className={`relative hidden md:block w-fit px-8 py-2.5 shadow-[0px_1px_0px_0px_rgba(255,255,255,0.25)] 
                        hover:shadow-[0px_2px_10px_1px_rgba(255,255,255,0.25)] bg-yellow-800 hover:bg-opacity-70 rounded-full` } 
                      >
                        <div className={`flex items-center gap-x-2`}>

                          <Icon className={` text-base text-yellow-50`}/>
                          <span className={`text-yellow-50 font-medium  text-base`}>{name}</span>

                        </div>
                      </NavLink>
                    )
          }
          )
        
      }      
    </>
  )
};

export default DashboardHeading