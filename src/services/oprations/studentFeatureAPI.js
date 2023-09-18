// external npm toast lib
import toast from "react-hot-toast";
// logo
import rzpLogo from "../../assets/Logo/Logo-Full-Dark.png"
// endpoints and apiConnector
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
// slice
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";

const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
} = studentEndpoints;

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  })
};

export async function buyCourse(token, courses, userDetails, navigate, dispatch) {
  const toastId = toast.loading("Loading...")
  try {
    // load the script
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

    if (!res) {
      toast.error("Razorpay SDK Failed to load")
    }

    // initiate the order;
    const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API,
      { courses },
      {
        authorization: `Bearer ${token}`,
      })

    if (!orderResponse.data.success) {
      throw new Error(orderResponse.data.message);
    };

    console.log(orderResponse.data.data)

    // options
    const options = {
      key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      amount: `${orderResponse.data.data.amount}`, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise.
      currency: orderResponse.data.data.currency,
      name: "StudyNotion",
      description: "Thank you for purchasing the course",
      image: rzpLogo,
      // account_id: "acc_Ef7ArAsdU5t0XL",
      order_id: orderResponse.data.data.id, //This is a sample Order id. Pass the `id` obtained in the response of Step 1.
      prefill: {
        name: `${userDetails.firstName}`,
        email: `${userDetails.email}`,
        // contact: "1234567890"
      },
      // notes: {
      //   address: "Razorpay Corporate Office"
      // },
      theme: {
        color: "#3399cc"
      },
      handler: function (response){
        // send successfull mail
        sendPaymentSuccessEmail(response, orderResponse.data.data.amount, token);

        // verify payment
        verifyPayment({...response, courses}, token, navigate, dispatch)
      },
    }

    // miss hogaya tha
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", function(response) {
      toast.error("Payment Failed");
      console.log(response.error);
    })

  } catch (error) {
    console.log("Payment Error API....", error)
    toast.error("Could not make payment")
  }
  toast.dismiss(toastId);
};

async function sendPaymentSuccessEmail(response, amount, token) {
  try {
    await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
      orderId: response.razorpay_order_id,
      paymentId: response.razorpay_payment_id,
      amount,
    },
    {
      authorization: `Bearer ${token}`,
    }
    )
  } catch (error) {
    console.log("Payment Success email error...", error) 
  }
};

// verify payment
async function verifyPayment(bodyData, token, navigate, dispatch) {
  const toastId = toast.loading("Verifying Payment...");
  dispatch(setPaymentLoading(true));

  try {
    const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
      authorization: `Bearer ${token}`,
    })

    console.log("response", response)

    if(!response.data.success) {
      throw new Error(response.data.message)
    }

    toast.success("Payment Successfull, you are added to the course");
    navigate("/dashboard/enrolled-courses");
    dispatch(resetCart());
  } catch (error) {
    console.log("Payment Verify Failed", error);
    toast.error("Could not verify payment")
  } finally {
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
  }
};