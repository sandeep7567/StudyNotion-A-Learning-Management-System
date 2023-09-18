import { setToken, setLoading } from "../../slices/authSlice";
import { resetCart } from "../../slices/cartSlice";
import { setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiconnector";
import { endpoints } from "../apis";
import { toast } from "react-hot-toast";

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API
} = endpoints;

// sendOtp for registration
export const sendOtp = (email, navigate) => {
  console.log(email);

  return async(dispatch) => {

    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      })
      console.log("SENDOTP API RESPONSE............", response);

      console.log(response.data.success);

      if(!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Send Otp Successfully")
      navigate("/verify-email")
    } catch (error) {
      console.log("SENDOTP API ERROR............", error)
      toast.error("Could Not Send OTP For Existing User");
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
};

// signUp
export const signUp = (
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) => {
  return async(dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      })

      console.log("SIGNUP API RESPONSE............", response)

      if(!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Signup Successful")
      navigate("/login")
    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      toast.error("Signup Failed")
      navigate("/signup")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
};

// login
export const login = (email, password, accountType, navigate) => {
  return async(dispatch) => {

    const toastId = toast.loading("Loading")
    dispatch(setLoading(true))

    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
        accountType,
      })

      console.log("LOGIN API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Login Successful")

      dispatch(setToken(response.data.token))

      const userImage = response?.data?.user?.image 
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response?.data?.user?.firstName} ${response?.data?.user?.lastName}`

      dispatch(setUser( { ...response.data.user, image: userImage, } ))

      localStorage.setItem("token", JSON.stringify(response?.data?.token))
      localStorage.setItem("user", JSON.stringify(response?.data?.user))

      navigate("/dashboard/my-profile")

    } catch (error) {
      console.log("LOGIN API ERROR............", error)
      toast.error("Login Failed")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
};

// resetState for logout
export const resetState = (dispatch) => {
  dispatch(setToken(null))
  dispatch(setUser(null))
  dispatch(resetCart(null))

  localStorage.removeItem("token")
  localStorage.removeItem("user")
  toast.success("Logout Successfully done!")
}

// logout
export const logout = (navigate) => {
  return async(dispatch) => {
    // dispatch(setToken(null))
    // dispatch(setUser(null))
    // dispatch(resetCart(null))

    // localStorage.removeItem("token")
    // localStorage.removeItem("user")

    resetState(dispatch);

    navigate("/")
  }
};

// getPasswordResetToken
export const getPasswordResetToken = (email, setEmailSent) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading....")
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {email,})
      
      console.log("Reset Password Token Response...", response)
      console.log(email)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Reset Email Successfully")

      // After successfully email link sent,
      // Then we change UI from one UI to Another UI using setEmailSend(toggle from false to true)
      setEmailSent(true)

    } catch (error) {
      console.log("Reset Password Token Error.", error)
      toast.error("Failed to set reset password")
      
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId)
  }
};

// Update Password
export const resetPassword = (password, confirmPassword, token, navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading....")
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, { password, confirmPassword, token });

      console.log("Reset Password Response:", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Reset Password Successfully")
      navigate("/login")
    } catch (error) {
      console.log("Reset Password Unable.")
      toast.error("Failed to Reset password")
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId)
  }
};
