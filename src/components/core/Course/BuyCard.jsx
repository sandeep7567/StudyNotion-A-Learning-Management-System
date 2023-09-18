import { CiClock2 } from "react-icons/ci";
import { PiCursorFill } from "react-icons/pi";
import { HiDeviceMobile } from "react-icons/hi";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";
import { BiLogIn } from "react-icons/bi";

import { ACCOUNT_TYPE } from "../../../utils/constants";
import { addToCart } from "../../../slices/cartSlice";

const BuyCard = ({ specificCourse, handleBuyCourse, setConfirmationModal }) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are creator not a consumer of the course product");
      return;
    }
    if (token) {
      dispatch(addToCart(specificCourse));
      navigate("/dashboard/cart")
      return;
    }
    setConfirmationModal({
      text1: "You are not logged In",
      text2: "Please Login to purchase the course",
      btn1Text: "Login",
      btn2Text: "Cancel",
      Icon: BiLogIn,
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  const handleShare = () => {
    copy(window.location.href);
    toast.success("Link copy to clipboard");
  };
  const courseInclude = [
    {
      id: 1,
      Icon: CiClock2,
      include: "8 hours on-demand video",
    },
    {
      id: 2,
      Icon: PiCursorFill,
      include: "Full Lifetime access",
    },
    {
      id: 3,
      Icon: HiDeviceMobile,
      include: "Access on Mobile and TV",
    },
    {
      id: 4,
      Icon: BsFillPatchCheckFill,
      include: "Certificate of completion",
    },
  ];
  console.log(specificCourse)
  return (
    <div className="bg-[#2C333F] rounded-lg shadow-[0_8px_30px_rgb(6,214,160,0.25)]">
      <img
        src={specificCourse?.thumbnail}
        alt="thumbnail"
        className="max-h-[300px] h-[180px] min-h-[180px] w-[400px] rounded-lg"
      />

      <div className="p-6 flex flex-col gap-4">

        

        <div className="text-3xl text-richblack-5 font-bold flex justify-start">
          Rs. {specificCourse?.price}
        </div>

        <div className="flex flex-col gap-y-6">
          <button
            className="bg-yellow-50 w-full rounded-md py-3 px-6 text-richblack-900"
            onClick={
              user && specificCourse?.studentsEnrolled.includes(user?._id)
                ? () => navigate("/dashboard/enrolled-courses")
                : handleBuyCourse
            }
          >
            {user && specificCourse && specificCourse?.studentsEnrolled.includes(user?._id)
                ? "Go to Course"
                : "Buy Now"
            }

          </button>

          {!specificCourse?.studentsEnrolled.includes(user?._id) && (
            <button
              className="bg-richblack-800 w-full rounded-md py-3 px-6 text-richblack-100"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          )}
        </div>

        <div>
          <p className="text-sm font-normal text-richblack-25 text-center mb-4">30-Day Money-Back Guarantee</p>

          <p className="text-base mb-4 text-richblack-5 font-normal">This course includes:</p>

          <div className="flex flex-col gap-y-2">
            {courseInclude &&
              courseInclude.map((text, index) => (
                <div key={text.id} className="flex gap-x-2 text-caribbeangreen-100 text-sm font-normal">
                  <div>
                    <text.Icon />
                  </div>
                  <div>{text.include}</div>
                </div>
              ))}
          </div>
        </div>

        <div>
          <button className="w-full text-center text-yellow-5" onClick={handleShare}>
            Share
          </button>
        </div>

      </div>
    </div>
  );
};

export default BuyCard;
