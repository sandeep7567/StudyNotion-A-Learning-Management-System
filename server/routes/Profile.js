const express = require("express");
const router = express.Router();
// middlewares
const { auth, isInstructor } = require("../middlewares/auth");
const {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
  getEnrolledCourses,
  instructorDashboard,
} = require("../controllers/Profile");

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/deleteProfile", auth, deleteAccount)
// Update User Account
router.put("/updateProfile", auth, updateProfile)
// get All User Account details
router.get("/getUserDetails", auth, getAllUserDetails)
// Get Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses)
// update Display Picture
router.put("/updateDisplayPicture", auth, updateDisplayPicture)
router.get("/instructor", auth, isInstructor, instructorDashboard)

module.exports = router;