const CourseProgress = require("../models/CourseProgress")
const SubSection = require("../models/SubSection")

exports.updateCourseProgress = async(req, res) => {
  const {courseId, subSectionId} = req.body;
  const userId = req.user.id;

  // console.log(courseId, subSectionId, userId)

  try {
    // check if the subSection is valid
    const subSection = await SubSection.findById(subSectionId)
    if(!subSection) {
      return res.status(400).json({error:"Invalid Subsection"})
    }

    // check for old entry
    let courseProgress = await CourseProgress.findOne({
      courseID:courseId,
      userId: userId,
    });
    if(!courseProgress) {
      return res.status(400).json({
        success:false,
        message:"Course Progress does not exist",
      });
    } else {
      // check for re-completing video/subsection
      if(courseProgress?.completedVideos.includes(subSectionId)) {
        return res.status(400).json({
          success:false,
          message:"Subsection already completed",
        });
      }

      // push into completedVideos
      courseProgress?.completedVideos.push(subSectionId);
    }

    await courseProgress.save();

    return res.status(200).json({
      success: true,
      message: "Course Progress Updated Successfully",
    })

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error:"Internal Server Error"
    })
  }
}