const RatingAndReview = require("../models/RatingAndReviews");
const Course = require("../models/Course");
const { default: mongoose } = require("mongoose");

// createRatingAndReview
exports.createRating = async (req, res) => {
  try {
    // get user id
    const userId = req.user.id;
    // data fetch from req.body
    const { rating, review, courseId } = req.body;
    // check if user enrolled or not in the course
    const courseDetails = await Course.findOne({
      _id: courseId,
      studentsEnrolled: { $elemMatch: { $eq: userId } },
    });
    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Student is not enrolled in the course",
      });
    }
    // check if user already review the course
    const alreadyReviewed = await RatingAndReview.findOne({
      user: userId,
      course: courseId,
    });

    if (alreadyReviewed) {
      return res.status(403).json({
        success: false,
        message: "Course is already review by the user",
      });
    }
    // create rating and review in DB Modal
    const ratingReview = await RatingAndReview.create({
      rating, review,
      course: courseId,
      user: userId,
    });
    // Update course with this rating/review
    const updatedCourseDetails = await Course.findByIdAndUpdate(courseId,
      {
        $push: {
          ratingAndReviews: ratingReview._id,
        }
      },
      { new: true });

    console.log(updatedCourseDetails);
    // return res
    return res.status(200).json({
      success: true,
      message: "Rating and Review created Successfully",
      ratingReview,
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Rating and Review Not Found",
    })
  }
}


// getAverageRatingAndReview
exports.getAverageRating = async (req, res) => {
  try {
    // get course id
    const courseId = req.body.courseId;
    // calculate avg rating

    const result = await RatingAndReview.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" }
        }
      }
    ])

    // return rating
    if (result.length > 0) {

      return res.status(200).json({
        success: true,
        averageRating: result[0].averageRating,
      })
    }
    // if no rating/review exist
    return res.status(200).json({
      success: true,
      message: "Average Rating is 0, no rating given till now",
      averageRating: 0,
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Rating and Review Not Found",
    })
  }
}



// getAllRatingAndReview
exports.getAllRating = async (req, res) => {
  try {
    const allReviews = await RatingAndReview.find({})
                            .sort({rating:"desc"})
                            .populate({
                              path:"user",
                              select:"firstName lastName email image",
                            })
                            .populate({
                              path:"course",
                              select:"courseName",
                            })
                            .exec();
    return res.status(200).json({
      success:true,
      message:"All reviews fetched successfully",
      data:allReviews,
    });
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Rating and Review Not Found",
    })
  }
}