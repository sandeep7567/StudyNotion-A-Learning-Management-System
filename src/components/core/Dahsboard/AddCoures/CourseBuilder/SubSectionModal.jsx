import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  createSubSection,
  updateSubSection,
} from "../../../../../services/oprations/courseDetailsAPI";
import { setCourse } from "../../../../../slices/courseSlice";
import { RxCross1 } from "react-icons/rx";
import Upload from "../Upload";
import IconButton from "../../../../Common/IconButton";
import "../../../../../App.css";

const SubSectionModal = ({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) => {
  // console.log("modalData", modalData)

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData.title);
      setValue("lectureDesc", modalData.description);
      setValue("lectureVideo", modalData.videoUrl);
    }
  }, []);

  const isFormUpload = () => {
    const currentValues = getValues();
    if (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleEditSubSection = async () => {
    const currentValues = getValues();
    const formData = new FormData();

    formData.append("sectionId", modalData.sectionId);
    formData.append("subSectionId", modalData._id);

    if (currentValues.lectureTitle !== modalData.title) {
      formData.append("title", currentValues.lectureTitle);
    }
    if (currentValues.lectureDesc !== modalData.description) {
      formData.append("description", currentValues.lectureDesc);
    }
    if (currentValues.lectureVideo !== modalData.videoUrl) {
      formData.append("video", currentValues.lectureVideo);
    }
    setLoading(true);
    const result = await updateSubSection(formData, token);

    //  console.log("result", result)

    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData.sectionId ? result : section
      );
      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(setCourse(updatedCourse));
    }
    setModalData(null);
    setLoading(false);
  };

  const onSubmit = async (data) => {
    if (view) {
      return;
    }
    if (edit) {
      if (!isFormUpload) {
        toast.error("No changes made to the form");
      } else {
        // edit karo
        handleEditSubSection();
      }
      return;
    }

    // Add
    const formData = new FormData();
    formData.append("sectionId", modalData);
    formData.append("title", data.lectureTitle);
    formData.append("description", data.lectureDesc);
    formData.append("video", data.lectureVideo);
    setLoading(true);

    //  API Call
    const result = await createSubSection(formData, token);

    if (result) {
      // TODO: check for updation
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData ? result : section
      );
      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      // console.log("updatedCourse", updatedCourse)
      dispatch(setCourse(updatedCourse));
    }

    setModalData(null);
    setLoading(false);
  };

  return (
    <div className="fixed z-[9999] backdrop-blur inset-0 top-0 left-0 mx-auto flex justify-center items-center">
      <div className="relative bg-richblack-900 shadow-richblack-200 shadow-2xl rounded-md px-4 py-2">
        <div>
          <p className="text-xl md:text-2xl my-4 text-richblack-5 font-inter font-semibold">
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
          </p>
          <button
            onClick={() => (!loading ? setModalData(null) : {})}
            className="absolute right-6 top-6"
          >
            <RxCross1 size={24} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-3"
        >
          <Upload
            name={"lectureVideo"}
            label={"Lecture Video"}
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl : null}
          />

          <div className="space-y-1">
            <label className="lable-style" htmlFor="lectureTitle">
              Lecture Title
            </label>
            <input
              id="lectureTitle"
              type="text"
              placeholder="Enter Lecture Title"
              {...register("lectureTitle", { required: true })}
              className="form-style w-full"
            />
            {errors.lectureTitle && (
              <span className="text-xs font-thin text-pink-500">
                Lecture Title is required
              </span>
            )}
          </div>

          <div className="space-y-1">
            <label className="lable-style" htmlFor="lectureDesc">
              Lecture Description
            </label>
            <textarea
              {...register("lectureDesc", { required: true })}
              id="lectureDesc"
              placeholder="Enter Lecture Description"
              className="form-style w-full min-h-[130px]"
            />
            {errors.lectureDesc && (
              <span className="text-xs font-thin text-pink-500 ">
                Lecture Description is required
              </span>
            )}
          </div>
          {!view && (
            <div>
              <IconButton
                type={"submit"}
                disabled={loading}
                text={loading ? "Loading..." : edit ? "Save Changes" : "Save"}
                customClasses={`mb-4 px-4 bg-yellow-50 hover:bg-yellow-100 flex justify-center items-center  text-richblack-800 hover:text-richblack-900 font-semibold text-xl py-1.5 w-full rounded-md`}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SubSectionModal;
