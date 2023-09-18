import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaCircleXmark } from "react-icons/fa6";
import { BsFillCloudArrowUpFill, BsFillCloudCheckFill } from "react-icons/bs";

function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
  className,
}) {
  const [imageFiles, setImageFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  );
  const [rejected, setRejected] = useState([]);

  useEffect(() => {
    register(name, { required: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [register]);

  useEffect(() => {
    setValue(name, selectedFile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFile, setValue]);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    console.log(rejectedFiles, "rejectedFiles");
    console.log(acceptedFiles, "acceptedFiles");

    // Do something with the files
    if (acceptedFiles?.length) {
      const file = acceptedFiles.map((imageFile) =>
        Object.assign(imageFile, { preview: URL.createObjectURL(imageFile) })
      );
      const selectedFile = acceptedFiles.map((imageFile) =>
        Object.assign(imageFile, { preview: URL.createObjectURL(imageFile) })
      )[0];
      console.log(file, selectedFile);
      setImageFiles(file);
      setSelectedFile(selectedFile);
      setPreviewSource(selectedFile);
    }
    if (rejectedFiles?.length) {
      setRejected(() => [...rejectedFiles]);
    }
    // console.log(imageFiles[0])
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    // image format * all img format support only.
    // video format * all video format support only.
    accept: !video ? { "image/*": [] } : { "video/*": [] },
    // max image upload size is allow upto 1024000 bytes
    maxSize: 1024 * 1000,
  });

  // accepted image remove
  const removeImageFiles = (name) => {
    setImageFiles(imageFiles.filter((imageFile) => imageFile.name !== name));
    setSelectedFile(null);
  };

  // rejected image remove
  const removeRejectedImageFiles = (name) => {
    setRejected(rejected.filter(({ file }) => file.name !== name));
  };

  return (
    <>
      <div className="flex flex-col space-y-2">
        <label className="lable-style" htmlFor={name}>
          {label}
          {!viewData && <sup className="text-pink-200">*</sup>}
        </label>
        {selectedFile === null && (
          <div
            {...getRootProps({
              className: "flex w-full flex-col items-center p-6",
            })}
          >
            {/* <input {...getInputProps()} /> */}
            {selectedFile === null && (
              <>
                <input {...getInputProps()} />
                {isDragActive ? (
                  <div
                    className={`w-full flex flex-col gap-12 justify-center items-center`}
                  >
                    <div className="w-1/2 justify-center items-center mx-auto">
                      <p className="text-center">
                        Drop an image, or Browse Max 6MB each (12MB for videos)
                      </p>
                    </div>

                    <div className="w-full">
                      <ul className="w-full list-disc flex justify-center items-center gap-12 mx-auto">
                        <li className="">Aspect ratio 16:9</li>
                        <li>Recommended size 1024x576</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`w-full flex flex-col gap-6 justify-center items-center`}
                  >
                    {/* <BsFillCloudCheckFill className='w-12 h-12 aspect-square  text-richblack-5 cursor-pointer' /> */}
                    <BsFillCloudArrowUpFill className="w-12 h-12 aspect-square  text-richblack-5 cursor-pointer" />

                    <div className="w-1/2 justify-center items-center mx-auto">
                      <p className="text-center">
                        Drag 'n' drop some files here, or click to select image
                        files
                      </p>
                    </div>

                    <div className="w-full">
                      <ul className="w-full list-disc flex justify-center items-center gap-12 mx-auto">
                        <li className="">Aspect ratio 16:9</li>
                        <li>Recommended size 1024x576</li>
                      </ul>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* preview */}
        {selectedFile !== null && imageFiles !== null && (
          <ul className="mt-6 flex flex-col">
            {imageFiles.map((imageFile) => (
              <li
                key={imageFile.name}
                className="relative rounded-md shadow-lg"
              >
                {/* {imageFile.name} */}
                {
                  imageFile?.type.includes("image") && 
               
                  <img
                        src={imageFile.preview}
                        alt={imageFile.name}
                        onLoad={() => {
                          URL.revokeObjectURL(imageFile.preview)
                        }}
                        className='aspect-video w-full rounded-md object-cover'
                      />
                }

                {imageFile?.type.includes("video") &&

                  <div className="w-full shadow-lg shadow-richblack-200 flex flex-col gap-y-2 h-full justify-center items-center bg-richblack-500 aspect-video text-richblack-5 text-2xl rounded-xl">
                    <p>File Selected Successfully</p>
                    <p className="font-normal text-sm text-richblack-900 italic">
                      {`${imageFile.name.split("_")[0]}.mp4`}
                    </p>
                  </div>

                }

                <button
                  type="button"
                  className={`w-7 h-7 absolute ${imageFile?.type.includes("video") ? "top-8 right-2" : "top-2 right-2" } border border-pink-400 bg-pink-400 rounded-full`}
                  onClick={() => removeImageFiles(imageFile.name)}
                >
                  <FaCircleXmark className="w-5 h-5 hover:fill-pink-600 text-center mx-auto" />
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* rejected image file */}
        <ul className="mt-6 flex flex-col">
          {rejected.map(({ file, errors }) => (
            <li key={file.name} className="flex items-start justify-between">
              <div>
                <p className="mt-2 text-richblack-500 text-sm font-medium">
                  {file.name}
                </p>
                <ul className="text-[12px] text-pink-400">
                  {errors.map(({ code, message }) => (
                    <li key={code}>{message}</li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                className="w-7 h-7 border border-pink-400 bg-pink-400 rounded-full"
                onClick={() => removeRejectedImageFiles(file.name)}
              >
                <FaCircleXmark className="w-5 h-5 hover:fill-pink-600 text-center mx-auto" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Upload;

// import { useEffect, useRef, useState } from "react"
// import { useDropzone } from "react-dropzone"
// import { FiUploadCloud } from "react-icons/fi"
// import { useSelector } from "react-redux"

// import "video-react/dist/video-react.css"
// import { Player } from "video-react"

// export default function Upload({
//   name,
//   label,
//   register,
//   setValue,
//   errors,
//   video = false,
//   viewData = null,
//   editData = null,
// }) {
//   const { course } = useSelector((state) => state.course)
//   const [selectedFile, setSelectedFile] = useState(null)
//   const [previewSource, setPreviewSource] = useState(
//     viewData ? viewData : editData ? editData : ""
//   )
//   const inputRef = useRef(null)

//   const onDrop = (acceptedFiles) => {
//     const file = acceptedFiles[0]
//     if (file) {
//       previewFile(file)
//       setSelectedFile(file)
//     }
//   }

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     accept: !video
//       ? { "image/*": [".jpeg", ".jpg", ".png"] }
//       : { "video/*": [".mp4"] },
//     onDrop,
//   })

//   const previewFile = (file) => {
//     // console.log(file)
//     const reader = new FileReader()
//     reader.readAsDataURL(file)
//     reader.onloadend = () => {
//       setPreviewSource(reader.result)
//     }
//   }

//   useEffect(() => {
//     register(name, { required: true })
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [register])

//   useEffect(() => {
//     setValue(name, selectedFile)
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [selectedFile, setValue])

//   return (
//     <div className="flex flex-col space-y-2">
//       <label className="text-sm text-richblack-5" htmlFor={name}>
//         {label} {!viewData && <sup className="text-pink-200">*</sup>}
//       </label>
//       <div
//         className={`${
//           isDragActive ? "bg-richblack-600" : "bg-richblack-700"
//         } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}
//       >
//         {previewSource ? (
//           <div className="flex w-full flex-col p-6">
//             {!video ? (
//               <img
//                 src={previewSource}
//                 alt="Preview"
//                 className="h-full w-full rounded-md object-cover"
//               />
//             ) : (
//               <Player aspectRatio="16:9" playsInline src={previewSource} />
//             )}
//             {!viewData && (
//               <button
//                 type="button"
//                 onClick={() => {
//                   setPreviewSource("")
//                   setSelectedFile(null)
//                   setValue(name, null)
//                 }}
//                 className="mt-3 text-richblack-400 underline"
//               >
//                 Cancel
//               </button>
//             )}
//           </div>
//         ) : (
//           <div
//             className="flex w-full flex-col items-center p-6"
//             {...getRootProps()}
//           >
//             <input {...getInputProps()} ref={inputRef} />
//             <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
//               <FiUploadCloud className="text-2xl text-yellow-50" />
//             </div>
//             <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
//               Drag and drop an {!video ? "image" : "video"}, or click to{" "}
//               <span className="font-semibold text-yellow-50">Browse</span> a
//               file
//             </p>
//             <ul className="mt-10 flex list-disc justify-between space-x-12 text-center  text-xs text-richblack-200">
//               <li>Aspect ratio 16:9</li>
//               <li>Recommended size 1024x576</li>
//             </ul>
//           </div>
//         )}
//       </div>
//       {errors[name] && (
//         <span className="ml-2 text-xs tracking-wide text-pink-200">
//           {label} is required
//         </span>
//       )}
//     </div>
//   )
// }
