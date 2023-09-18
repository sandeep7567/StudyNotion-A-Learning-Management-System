import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { COURSE_STATUS } from '../../../../utils/constants';

import { VscTrash } from 'react-icons/vsc'
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { FiDelete } from "react-icons/fi";
import { deleteCourse, fetchInstructorCourses } from '../../../../services/oprations/courseDetailsAPI';
import { setCourse } from '../../../../slices/courseSlice';

// react-super-responsive-table
import { Table, Tbody, Thead, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import ConfirmationModal from '../../../Common/ConfirmationModal';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../../Common/Spinner';

const CoursesTable = ({courses, setCourses}) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleCourseDelete = async(courseId) => {
    setLoading(true);

    // api delete call
    await deleteCourse({courseId}, token);

    // get fetch all api data call
    const result = await fetchInstructorCourses(token);
    if(result) {
      setCourses(result);
    };
    setConfirmationModal(null);
    setLoading(false);
  };

  return (
    <div className='text-white p-4'>
      {/* Table */}
      <Table>
        {/* thead */}
        <Thead className="border-dashed border-2 border-richblack-500">
          <Tr className="flex flex-row gap-x-5 bg-richblack-800 rounded-md justify-around items-center border-richblack-800 p-8">
            
            <Th className="w-[33rem] text-2xl font-bold text-yellow-50">
              Courses
            </Th>
            <Th className="text-2xl text-yellow-50 font-bold">
              Duration
            </Th>
            <Th className=" text-2xl text-yellow-50 font-bold">
              Price
            </Th>
            <Th className="text-lg text-yellow-50 sm:text-2xl font-bold">
              Actions
            </Th>
          </Tr>
        </Thead>
        

        <Tbody className="bg-richblack-800 shadow-2xl border-dashed border-2 border-richblack-500 drop-shadow-2xl">
          {courses.length === 0
            ? (
                <Tr className="flex flex-col gap-y-4 py-20 justify-center items-center">
                  <Td className="font-bold bg-richblack-5
                      bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] 
                      text-transparent bg-clip-text flex justify-center items-center 
                      w-full h-full text-2xl sm:text-5xl">
                    No Courses Found
                  </Td>
                  <Spinner/>
                </Tr>
              )
            : (
                courses.map((course) => (
                  <Tr key={course._id} className="flex flex-col lg:flex-row gap-x-10 border-richblack-800 p-8">
                    <Td className="flex flex-col lg:flex-row gap-x-4">
                      <img src={course?.thumbnail} alt={course?.courseName}
                        className='h-[150px] w-[200px] rounded-md object-cover'
                      />
                      <div className='flex flex-col w-[31rem]'>
                        <p>
                          {course?.courseName.length > 5 
                            ? course?.courseName.split(" ").slice(0,5).join(" ") + "...." 
                            : course?.courseName
                          }
                        </p>
                        <p>
                          {course?.courseDescription.length > 5 ? course?.courseDescription.split(" ").slice(0,5).join(" ") + "...." : course?.courseDescription
                          }
                        </p>
                        <p>
                          Created: {new Date().getMonth()}/{new Date().getFullYear()}
                        </p>
                        {
                          course?.status === COURSE_STATUS.DRAFT
                            ? (<p className='text-pink-50'>DRAFTED</p>)
                            : (<p className='text-yellow-50'>PUBLISHED</p>)
                        }

                      </div>
                    </Td>

                    <Td className="text-xl font-normal font-inter ">
                      2h 30min
                    </Td>

                    <Td className="text-2xl font-bold font-inter text-yellow-100">
                      ${course?.price}
                    </Td>

                    <Td className="flex justify-center items-start">
                      <button
                        disabled={loading}
                        onClick={() => {
                          return navigate(`/dashboard/edit-course/${course._id}`)
                        }}
                        className="mr-5"
                      >
                        <FiEdit size={22} className='text-yellow-50'/>
                      </button>
                    
                      <button
                        disabled={loading}
                        onClick={() => setConfirmationModal({
                          text1:"Confirm Delete Course",
                          text2:"All the data related to this course will be deleted",
                          btn1Text:"Delete",
                          btn2Text:"Cancel",
                          Icon: VscTrash,
                          btn1Handler: !loading ? () => handleCourseDelete(course._id) : () => {},
                          btn2Handler:!loading ? () => setConfirmationModal(null) : () => {},
                        })}
                      >
                        <FiTrash2 size={22} className='text-yellow-50'/>
                      </button>
                    </Td>
                  </Tr>
                ))
              )
          }
        </Tbody>

      </Table>

      {confirmationModal && <ConfirmationModal {...confirmationModal}/>}
    </div>
  )
}

export default CoursesTable;