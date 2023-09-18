import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { RxDropdownMenu } from 'react-icons/rx'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { MdEdit } from 'react-icons/md'
import { MdDelete } from 'react-icons/md'
import { IoIosArrowDropdownCircle } from 'react-icons/io'
import { VscSignOut } from 'react-icons/vsc'
import { AiOutlinePlus } from 'react-icons/ai'
import SubSectionModal from './SubSectionModal';
import { setCourse, setStep } from "../../../../../slices/courseSlice"
import { deleteSection, deleteSubSection } from '../../../../../services/oprations/courseDetailsAPI';
import ConfirmationModal from "../../../../Common/ConfirmationModal.jsx"

const NestedView = ({handleChangeEditSectionName}) => {

  const {course} = useSelector((state) => state.course);
  const {token} = useSelector((state) => state.auth);
  
  // console.log("course", course)

  const dispatch = useDispatch();
  
  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);

  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleDeleteSection = async(sectionId) => {
    const result = await deleteSection({
      sectionId,
      courseId: course._id,
      token,
    })
    if(result) {  
      dispatch(setCourse(result))
    }
    setConfirmationModal(null);
  };

  const handleDeleteSubSection = async(subSectionId, sectionId) => {
    const result = await deleteSubSection({
      subSectionId,
      sectionId,
      token,
    })
    if(result) {
      // extra kya kar skate the
      const updatedCourseContent = course.courseContent.map((section) => 
      section._id === sectionId ? result : section);
      const updatedCourse = {...course, courseContent: updatedCourseContent};
      dispatch(setCourse(updatedCourse))
    }
    // close the modal
    setConfirmationModal(null);
  };
  
  return (
    <div className={'relative'}>

      <div className='mt-10 rounded-lg bg-richblack-600 p-6 px-8'>
        { 
        // course?.courseContent.length > 0 &&
          course?.courseContent?.map((section) => {
            return (
              <details key={section._id} open className=''>

                <summary className='flex items-center font-medium justify-between gap-x-3 mb-4 border-b-2 pb-2 text-richblack-50 text-base border-richblack-400'>

                  <div className='flex items-center justify-between gap-x-3'>
                    <RxDropdownMenu className='text-richblack-400 text-xl'/>
                    <p>{section.sectionName}</p>
                  </div>

                  <div className='flex items-center gap-x-3'>
                    <button
                      type='button'
                      onClick={() => (handleChangeEditSectionName(section._id, section.sectionName))}
                    >
                      <MdEdit className='text-richblack-400 text-xl' />
                    </button>

                    <button
                      onClick={() => {setConfirmationModal({
                        
                        // btn1Handler: () => dispatch(logout(navigate)),

                        text1: "Delete this Section",
                        text2: "All the lecture of this section will be deleted",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        Icon: VscSignOut,
                        btn1Handler: () => handleDeleteSection(section._id),
                        btn2Handler: () => setConfirmationModal(null),

                      })}}
                    >
                      <MdDelete className='text-richblack-400 text-xl'/>
                    </button>
                    <span className='text-richblack-400 text-xl'>|</span>
                    <IoIosArrowDropdownCircle className='text-richblack-400 text-xl'/>
                  </div>
                  
                </summary>

                <div className='text-richblack-50 text-sm'>
                    { 
                        // section?.subSection.length > 0 &&
                        section?.subSection?.map((data) => (
                            <div
                              key={data?._id} 
                              onClick={() => setViewSubSection(data)}
                              className='flex items-center justify-between pl-8 py-3 gap-x-3 border-b-2 border-solid border-richblack-400 border-opacity-50'
                            >
                                <div className='flex justify-center items-center gap-x-2'>
                                    <RxDropdownMenu className='text-richblack-400 text-xl'/>
                                    <p className=''>{data.title}</p>
                                </div>

                                <div
                                  onClick={(e) => e.stopPropagation()}
                                  className='flex items-center gap-x-3'>

                                    <button
                                    onClick={() => setEditSubSection({...data, sectionId:section._id})}
                                    >
                                      <MdEdit className='text-richblack-400 text-base' />
                                    </button>

                                    <button
                                      className=''
                                      onClick={() => setConfirmationModal({
                                          text1: "Delete this Sub Section",
                                          text2: "selected Lecture will be deleted",
                                          btn1Text: "Delete",
                                          btn2Text: "Cancel",
                                          Icon: VscSignOut,
                                          btn1Handler: () => handleDeleteSubSection(data._id, section._id),
                                          btn2Handler: () => setConfirmationModal(null), })}
                                      >
                                      <RiDeleteBin6Line className='text-richblack-400 text-base' />
                                        
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                    <button
                      onClick={() => setAddSubSection(section._id)}
                      className='my-4 text-base flex items-center gap-x-2 font-normal text-yellow-50'
                    >
                        <AiOutlinePlus className='text-yellow-50 text-xl' />
                        <p>Add Lecture</p>
                    </button>
                </div>

              </details>
            )
          })
        }
      </div>

      {
        addSubSection 
          ? (<SubSectionModal
                modalData={addSubSection}
                setModalData={setAddSubSection}
                add={true}
              />
            ) 
          : viewSubSection 
            ? (<SubSectionModal
                  modalData={viewSubSection}
                  setModalData={setViewSubSection}
                  view={true}
                />
              ) 
            : editSubSection 
              ? (<SubSectionModal
                    modalData={editSubSection}
                    setModalData={setEditSubSection}
                    edit={true}
                  />
                )
                : (<div></div>)
      }

      {/* {confirmationModal !== null &&
           (<ConfirmationModal
              {...confirmationModal}
            />
          )
        //  (<div></div>)
      } */}
       { confirmationModal && <ConfirmationModal {...confirmationModal}/> }
    </div>
  )
}

export default NestedView