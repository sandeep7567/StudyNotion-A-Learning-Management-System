import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';

// react icons
// import { PiUploadSimpleBold } from 'react-icons/pi';
import { FiUpload } from 'react-icons/fi';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IconButton from '../../../Common/IconButton';
import { updateDisplayPicture } from '../../../../services/oprations/SettingsAPI';
import toast from 'react-hot-toast';
// import { updateDisplayPicture } from '';

const ChangeProfilePicture = () => {

  // redux state management
  const { token } =  useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);

  const fileInputRef = useRef(null);
  // console.log(fileInputRef.current)

  const handleClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    console.log(file)

    if (file) {
      setImageFile(file)
      previewFile(file)
    }
  }

  const previewFile = (file) => {
    const reader = new FileReader();

    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  const handleFileUpload = () => {
    try {
      setLoading(true)
      const formData = new FormData()
      if(!imageFile) {
        toast.error("Select file to upload");
        setLoading(false);
        return;
      }
      console.log(imageFile)

      formData.append("displayPicture", imageFile)
      console.log("formdata", formData)

      dispatch(updateDisplayPicture(token, formData, navigate)).then(() => {
        setLoading(false)
      })
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile)
    }
  }, [imageFile])
  
  return (
    <div className='flex p-6 gap-5 bg-richblack-800 border border-richblack-700 rounded-lg'>

        {/* profile pic upload */}
        <div className='flex gap-2'>
          <img
            src={ previewSource || user?.image }
            alt={`profile-${user?.firstName}`}
            className='aspect-square w-[4.875rem] border-solid border-2 border-richblack-900 rounded-full'
          />
        </div>

        {/* form */}
        <div>
          <div className='flex flex-col gap-3'>
            <label htmlFor="profilePicUpload" className='text-richblack-5 text-lg font-semibold'>Change Profile Picture</label>
            <div className="flex flex-row items-center gap-1">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png, image/gif, image/jpeg"
              />
              <button
                onClick={handleClick}
                disabled={loading}
                className='text-center mr-4 border-0 text-sm hover:file:bg-richblack-700 cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50'
              >
                Select
              </button>
              <IconButton
                text={loading ? "Uploading..." : "Upload"}
                onclick={handleFileUpload}
                customClasses={`flex justify-center items-center gap-2 text-center mr-4 py-2 px-4 rounded-md border-0 text-sm font-semibold bg-yellow-50 text-richblack-700 hover:bg-yellow-100`}
              >
                {!loading && (
                  <FiUpload className="text-lg text-richblack-900" />
                )}
              </IconButton>

              
            </div>

          </div>

        </div>
        
    </div>
  )
}

export default ChangeProfilePicture