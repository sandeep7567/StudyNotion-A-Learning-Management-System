import { setLoading, setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiconnector";
import { settingsEndpoints } from "../apis";

import { toast } from "react-hot-toast";
import { logout } from "./authAPI";

const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
} = settingsEndpoints;

// UPDATE DISPLAY PICTURE
export const updateDisplayPicture = (token, formData, navigate) => {

  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      console.log(formData)
      const response = await apiConnector("PUT", UPDATE_DISPLAY_PICTURE_API, formData, {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${token}`,
      })
      console.log( "UPDATE_DISPLAY_PICTURE_API API RESPONSE............", response)

      if(!response.data || !response.data.success) {
        throw new Error(response.data.message || "Update Profile Picture failed");
      }
      // console.log(response?.data?.data);
      const { password, ...restData } = response?.data?.data;

      const profilePic = restData?.image
        ? restData?.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${restData?.firstName} ${restData?.lastName}`

      dispatch(setUser( { ...restData, image: profilePic, } ));
      localStorage.setItem("user", JSON.stringify({...restData, image: profilePic }))

      navigate("/dashboard/my-profile")

      toast.success("Profile Picture updated Successfully")

    } catch (error) {
      dispatch(setLoading(false));
      console.log(error);
      toast.error("Failed to update profile picture - formdata");
    } finally {
      toast.dismiss(toastId);
    }
  };
};

// update profile additional details
export const updateProfile = (token, formData, navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    console.log(formData)

    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
        authorization: `Bearer ${token}`,
      })
      console.log("UPDATE_PROFILE_API API RESPONSE............", response)

      if(!response.data || !response.data.success) {
        throw new Error(response.data.message || "Update Profile formData failed");
      }
      // delete profile data object from response.data.profile
      delete response.data.updatedUserDetails?.password

      console.log("response.data.userDetails-->", response?.data?.updatedUserDetails)

      // updated additionalDetails data object using data from response.data.profile

      // response.data.userDetails["additionalDetails"] = response.data.profile


      // console.log(response?.data)

      // console.log(response.data.userDetails)
      
      navigate("/dashboard/my-profile")

      const userImage = response?.data?.updatedUserDetails.image
        ? response?.data?.updatedUserDetails.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response?.data?.updatedUserDetails.lastName}`

      dispatch(setUser({ ...response.data.updatedUserDetails, image: userImage }))

      localStorage.setItem("user", JSON.stringify({...response?.data?.updatedUserDetails, image: userImage}))

      toast.success("profile updated Successfully")

    } catch (error) {
      dispatch(setLoading(false));
      console.log(error);
      toast.error("Failed to update profile additionalDetails - formdata");
    } finally {
      toast.dismiss(toastId);
    }
  };
};

// CHANGE PASSWORD
export const changePassword = (token, formData, navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    // console.log(token);

    try {
      const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
        authorization: `Bearer ${token}`,
      })
      // console.log(response);

      if(!response.data || !response.data.success) {
        throw new Error(response.data.message || "Update Profile formData failed");
      }

      navigate("/dashboard/my-profile")

      toast.success("profile password updated Successfully")

    } catch (error) {
      dispatch(setLoading(false));
      console.log(error);
      toast.error("Failed to update profile password, write correct password - formdata");
    } finally {
      toast.dismiss(toastId);
    }
  };
};

// delete profile
export const deleteProfile = (token, navigate) => {
  console.log("token", token)
  return async (dispatch) => {
    const toastId = toast.loading("Loading");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
        authorization: `Bearer ${token}`,
      });

      console.log("DELETE PROFILE API RESPONSE............", response);

      if (!response.data || !response.data.success) {
        throw new Error(response.data.message || "Delete operation failed");
      }

      toast.success("Account Delete Successful");
      dispatch(logout(navigate));

    } catch (error) {
      dispatch(setLoading(false));
      console.log(error);
      toast.error("Failed to delete profile");
    } finally {
      toast.dismiss(toastId);
    }
  };
};
