import React, { useEffect, useState, useRef } from "react";
import ReactStars from "react-rating-stars-component";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "../../App.css";
// Icons
import { FaStar } from "react-icons/fa";
// Import required modules
import { Autoplay, FreeMode, Pagination } from "swiper/modules";

// Get apiFunction and the endpoint
import { apiConnector } from "../../services/apiconnector";
import { ratingsEndpoints } from "../../services/apis";
import Svg from "./Svg";

function ReviewSlider() {
  const { REVIEWS_DETAILS_API } = ratingsEndpoints;
  const [reviews, setReviews] = useState([]);
  const truncateWords = 15;
  const courseTitleWords = 4;

  useEffect(() => {
    (async () => {
      const { data } = await apiConnector("GET", REVIEWS_DETAILS_API);
      if (data?.success) {
        setReviews(data?.data);
      }
    })();
  }, []);

  // console.log(reviews)

  return (
    <div className="text-white">
      <div className={`mb-5 h-[184px] max-w-maxContentTab lg:max-w-maxContent`}>

        <Swiper
          slidesPerView={"auto"}
          spaceBetween={25}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          // slideNextClass={Autoplay}
          modules={[FreeMode, Pagination, Autoplay]}
          className="mySwiper bg-opacity-10 rounded-2xl relative w-full md:w-[130%] lg:w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {reviews.map((review, i) => {
            return (
              <SwiperSlide className="bg-transparent" key={i}>
                
                <Svg/>
                {/* review & rating information by student */}
                <div className="flex flex-col gap-3 p-3 text-[14px] text-richblack-25">
                  
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        review?.user?.image
                          ? review?.user?.image
                          : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                      }
                      alt="ProfilePic"
                      className="h-9 w-9 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <h1 className="font-semibold text-richblack-5">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
                      <h2 className="text-[12px] font-medium text-richblack-500">
                        {review?.course?.courseName.split(" ").length >
                        courseTitleWords
                          ? `${review?.course?.courseName
                              .split(" ")
                              .slice(0, courseTitleWords)
                              .join(" ")}...`
                          : `${review?.course?.courseName}`}
                      </h2>
                    </div>
                  </div>
                  <p className="font-medium text-richblack-25">
                    {review?.review.split(" ").length > truncateWords
                      ? `${review?.review
                          .split(" ")
                          .slice(0, truncateWords)
                          .join(" ")} ...`
                      : `${review?.review}`}
                  </p>
                  <div className="flex items-center gap-2 ">
                    <h3 className="font-semibold text-yellow-100">
                      {review.rating.toFixed(1)}
                    </h3>
                    <ReactStars
                      count={5}
                      value={review.rating}
                      size={20}
                      edit={false}
                      activeColor="#ffd700"
                      emptyIcon={<FaStar />}
                      fullIcon={<FaStar />}
                    />
                  </div>
                </div>

              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}

export default ReviewSlider;
