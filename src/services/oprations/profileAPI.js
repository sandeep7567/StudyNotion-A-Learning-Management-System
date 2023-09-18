import { toast } from "react-hot-toast"

import { setLoading, setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { profileEndpoints } from "../apis"
import { logout } from "./authAPI"

const {
  GET_USER_DETAILS_API,
  GET_USER_ENROLLED_COURSES_API,
  GET_INSTRUCTOR_DATA_API
} = profileEndpoints

export function getUserDetails(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    console.log(token)
    try {
      const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
        authorization: `Bearer ${token}`,
      })
      console.log("GET_USER_DETAILS API RESPONSE............", response);
      
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      const { password, ...dataWithoutPassword } = response.data.data;

      console.log("dataWithoutPassword", dataWithoutPassword)

      const userImage = response.data.data.image
        ? response.data.data.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
        
      dispatch(setUser({ ...dataWithoutPassword, image: userImage }))

      localStorage.setItem("user", JSON.stringify({...dataWithoutPassword, image: userImage}))

    } catch (error) {
      dispatch(logout(navigate));
      console.log("GET_USER_DETAILS API ERROR............", error)
      toast.error("Could Not Get User Details")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}

export async function getUserEnrolledCourses(token) {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    console.log("BEFORE Calling BACKEND API FOR ENROLLED COURSES");
    const response = await apiConnector(
      "GET",
      GET_USER_ENROLLED_COURSES_API,
      null,
      {
        authorization: `Bearer ${token}`,
      }
    )
    console.log("AFTER Calling BACKEND API FOR ENROLLED COURSES");
    // console.log(
    //   "GET_USER_ENROLLED_COURSES_API API RESPONSE............",
    //   response
    // )

    console.log("response batao", response)
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data.data
  } catch (error) {
    console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
    toast.error("Could Not Get Enrolled Courses")
  }
  toast.dismiss(toastId)
  return result
}

export async function getInstructorData(token) {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const res = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, 
    {
      authorization: `Bearer ${token}`,
    })
    
    console.log("GET_INSTRUCTOR_DATA_API_RESPONSE", res);
    if(!res?.data?.success) {
      throw new Error(res.data.message)
    }
    result = res?.data?.courses
  } catch (error) {
    console.error("Get instructor_API Error", error);
    toast.error("Could not get instructor data")
  }
  toast.dismiss(toastId);
  return result;
}