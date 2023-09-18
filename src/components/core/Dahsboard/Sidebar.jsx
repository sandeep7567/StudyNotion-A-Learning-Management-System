import { useState } from "react"
import { VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { sidebarLinks } from "../../../data/dashboard-links"

import { logout } from "../../../services/oprations/authAPI"
import ConfirmationModal from "../../Common/ConfirmationModal"
import SidebarLink from "./SidebarLink"

import { useRef } from "react"
import useOnClickOutside from "../../../hooks/useOnClickOutside"

export default function Sidebar({show, setShow}) {

  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const { loading: authLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // to keep track of confirmation modal
  const [confirmationModal, setConfirmationModal] = useState(null);
  
  const ref = useRef();
  useOnClickOutside(ref, () => setShow(false))
  // console.log("show", show)

  // useEffect(() => {
  //   const handler = (event) => {
  //     if (
  //       show &&
  //       ref.current &&
  //       !ref.current.contains(event.target)
  //     ) {
  //       setShow(false);
  //     }
  //   };
  //   document.addEventListener('mousedown', handler);
  //   return () => {
  //     // Cleanup the event listener
  //     document.removeEventListener('mousedown', handler);
  //   };
  // }, [show]);

  // if (profileLoading || authLoading) {
  //   return (
  //     <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
  //       <div className="spinner">Spinner</div>
  //     </div>
  //   )
  // }

  return (
    <>
      {/* sidebar */}
        <div
          onClick={(e) => e.stopPropagation()}
          ref={ref}
          className={`${show ? "left-0" : "-left-full" } fixed z-10 top-14 w-full max-h-screen 
          mt-[0rem] min-w-[220px] border-r-[1px] border-r-richblack-700 bg-richblack-800 
          py-10 md:static md:w-auto md:max-h-max transition-all duration-200`}
        >

          <div
            className={`flex flex-col`}>
            {sidebarLinks.map((link) => {
              if (link.type && user?.accountType !== link.type) return null
              return (
                <SidebarLink
                  key={link.id}
                  link={link}
                  iconName={link.icon}
                  setShow={setShow}
                />
              )
            })}
          </div>

          <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />

          <div className={`flex`}>
            {/* <SidebarLink
              link={{ name: "Settings", path: "/dashboard/settings" }}
              iconName="VscSettingsGear"
              setShow={setShow}
            /> */}

            {/* logout button */}
            <div
              onClick={() => setShow(false)}
            >
              <button
                onClick={() => {setConfirmationModal({

                  text1: "Are You Sure ?",
                  text2: "You will be logged out of your Account",
                  btn1Text: "Logout",
                  btn2Text: "Cancel",
                  Icon: VscSignOut,
                  // btn1Handler: () => dispatch(logout(navigate)),
                  btn1Handler: () => dispatch(logout(navigate)),
                  btn2Handler: () => setConfirmationModal(null),
                })}}
                className={`px-8 py-1 text-sm font-medium text-richblack-300`}
              >
                
                <div
                  className="flex items-center gap-x-2">
                  <VscSignOut className="text-lg" />
                  <span>Logout</span>
                </div>   
              </button>
            </div>
            
            
          </div>
        </div>

      {confirmationModal && <ConfirmationModal {...confirmationModal} />}
    </>
  )
}