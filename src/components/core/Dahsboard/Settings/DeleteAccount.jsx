import React, { useState } from 'react'

// react icon
import { BsFillTrashFill } from "react-icons/bs"
import { MdOutlineCancel } from 'react-icons/md';
import { VscTrash } from 'react-icons/vsc';

import ConfirmationModal from '../../../Common/ConfirmationModal';
import { deleteProfile } from '../../../../services/oprations/SettingsAPI';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const DeleteAccount = () => {
  
  const [confirmationModal, setConfirmationModal] = useState(null);
  const navigate = useNavigate()
  const {token, loading: authLoading} = useSelector((state) => state.auth)
  const dispatch = useDispatch();

  return (
    <div className=' bg-pink-900 border border-pink-700 rounded-lg overflow-x-hidden overflow-auto'>

        <div className="flex flex-col md:flex-row items-center justify-center gap-5 p-10">

            {/* Delete Icon */}
            <div className='p-3.5 bg-pink-700 w-fit flex justify-center items-center rounded-full'>
              <BsFillTrashFill fontSize={24} fill="#EF476F" />
            </div>

            <div className='w-full flex flex-col text-center md:text-start'>
              <h2 className='w-full text-richblack-5 font-inter text-lg font-bold'>Delete Parmanent Account</h2>
              <p className='w-full text-pink-300 italic text-base font-semibold font-inter'>I want to delete my account</p>
            </div>

            <div className='flex w-full flex-row justify-center md:justify-end items-center gap-5 py-2'>
              {/* button cancel & save */}
              <button
                onClick={() => {
                  return navigate("/dashboard/my-profile")
                  }
                }
                type='reset'
                className='flex items-center bg-richblack-500 text-richblack-5 text-center 
                            font-medium px-4 py-2 rounded-lg hover:bg-richblack-400 border-b border-r border-richblack-100 hover:scale-105 hover:shadow-[2px_2px_5px_1px_rgba(250,250,250,0.2)]'
              >
                <MdOutlineCancel className="w-6 h-6 mr-1"/>
                Cancel
              </button>

              {/* delete button */}
              <button
                type=''
                onClick={() => setConfirmationModal({
                  id: 2,
                  text1: "Delete Account ?",
                  text2: "Would you like to delete account?",
                  text3: "This account contains Paid Courses. Deleting your account will remove all the contain associated with it.",
                  text4: "I want to delete my account.",
                  Icon:VscTrash,
                  IconSymbol:BsFillTrashFill,
                  btn1Text: "Delete",
                  btn2Text: "Cancel",
                  text1Classes:` text-pink-5 text-lg font-bold mb-2`,
                  text2AND3Classes:`text-pink-25 text-sm font-medium mt-2`,
                  text4Classes: `text-pink-300 text-base italic font-medium mt-2`,
                  btn1Handler: () => dispatch(deleteProfile( token, navigate)),
                  btn2Handler: () => setConfirmationModal(null),
                  btn1Classes:`flex flex-row-reverse gap-x-1 justify-center items-center text-center
                              py-2 px-4 font-medium rounded-lg border-1 bg-pink-600 text-richblack-900
                              hover:bg-pink-700 border-b border-r border-richblack-400 hover:scale-105 
                              hover:shadow-[2px_2px_5px_1px_rgba(250,250,250,0.2)]`,
                  btn2Classes:`flex flex-row-reverse gap-x-1 items-center bg-richblack-500 text-richblack-5 text-center 
                              font-medium px-4 py-2 rounded-lg hover:bg-richblack-400 border-b border-r 
                              border-richblack-100 hover:scale-105 hover:shadow-[2px_2px_5px_1px_rgba(250,250,250,0.2)]`,
                  customClasses:`h-1/2 p-6 bg-pink-900 border border-pink-700 rounded-lg gap-2 w-fit text-center 
                              aspect-square shadow-[inset_1px_1px_40px_1px_#000000] hover:scale-110 transition-all duration-200`,
                })}
                className={`flex flex-row-reverse justify-center items-center text-center
                                py-2 px-4 font-medium rounded-lg border-1 bg-pink-600 
                                text-richblack-900 hover:bg-pink-700 border-b border-r border-richblack-400 hover:scale-105 hover:shadow-[2px_2px_5px_1px_rgba(250,250,250,0.2)]`}
              >
                Delete
                <BsFillTrashFill className="mr-1" fontSize={24} fill="#EF476F" />
              </button>

            </div>

            { confirmationModal !== null && <ConfirmationModal {...confirmationModal}/> }
            
        </div>

    </div>
  )
}

export default DeleteAccount