import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../components/core/Dahsboard/Sidebar';
import SidebarLink from "../components/core/Dahsboard/SidebarLink"

import {AiOutlineMenu} from "react-icons/ai";
// import {VscChromeClose} from "react-icons/vsc";
import { useState } from 'react';
import { sidebarLinks } from '../data/dashboard-links';

const Dashboard = () => {

  const [showNav, setShowNav] = useState(false)
  const location = useLocation();

  // const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading, user } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);

  // if (profileLoading || authLoading) {
  //   return (
  //     <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center mt-56'>
  //       <div className='spinner'>
  //         Loading...dashboard
  //       </div>
  //     </div>
  //   )
  // }

  return (
    // dashboard layout
    <>
      {user &&
        <div className='bg-richblack-900 mt-14'>

          <div className='fixed w-full justify-center z-10 flex md:hidden items-center '>

            <button
              onClick={() => setShowNav((prev) => !prev)}
              // fixed z-10 top-[4.5rem]
              className='text-white  '>
              <AiOutlineMenu className='w-6 h-6'/>
            </button>
            {/* fixed top-16 left-1/2 -translate-x-20 z-10 */}
            <div className='flex grow justify-center '>

              {/* Dashboard */}
              {
                sidebarLinks.filter((link) => link.path === location.pathname).map((link) => {
                if (link.type && user?.accountType !== link.type) return null
                return (
                    <SidebarLink
                      key={link.id}
                      link={link}
                      iconName={link.icon}
                      
                    />
                  )
                  }
                )
              }
            </div>
          </div>

          <div className='relative flex min-h-[calc(100vh-3.5rem)]'>

            <Sidebar show={showNav} setShow={setShowNav} /> 

            <div className='h-[calc(100vh-3.5rem)] flex-1 overflow-auto scroll-smooth'>
              <div className='mx-auto w-11/12 max-w-[62.5rem] pt-4'>
                <Outlet/>
        
              </div>
            </div>

          </div>

        </div>
      }
    </>
    
  )
}

export default Dashboard