import "./App.css";

import { Route, Routes } from "react-router-dom";
// import { ToastContainer } from "react-toastify"

// redux
import { useSelector } from "react-redux";

import { ACCOUNT_TYPE } from "./utils/constants";

// Home && Navbar
import Home from "./pages/Home";
import Navbar from "./components/Common/Navbar";

// open route
import OpenRoute from "./components/core/Auth/OpenRoute";

// private route
import PrivateRoute from "./components/core/Auth/PrivateRoute";

// Error Page handling
import Error from "./pages/Error";

// route
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Contact from "./pages/Contact";

// dashboard route nested
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/core/Dahsboard/MyProfile";
import Settings from "./components/core/Dahsboard/Settings/Index";
import Cart from "./components/core/Dahsboard/Cart/index";
import EnrolledCourses from "./components/core/Dahsboard/EnrolledCourses";
import AddCourse from "./components/core/Dahsboard/AddCoures";
import MyCourses from "./components/core/Dahsboard/MyCourses";
import EditCourse from "./components/core/Dahsboard/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import VideoDetails from "./components/core/viewCourse/VideoDetails";
import ViewCourse from "./pages/ViewCourse";
import Instructor from "./components/core/Dahsboard/instructorDashboard/Instructore";
import Loader from "./components/Common/loader/Loader";

function App() {

  const { user } = useSelector((state) => state.profile)

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      {/* <ToastContainer/> */}      
      <Navbar />

      <Routes>

        {/* Route-1 */}
        <Route path="/" element={<Home />} />
        {/* Route-2 */}
        <Route path="catalog/:catalogName" element={<Catalog/>} />
        <Route path="courses/:courseId" element={<CourseDetails/>} />

        {/* Route-3 */}
        <Route
          path="/login"
          element={
              <OpenRoute>
                <Login />
              </OpenRoute>
            } 
        />

        {/* Route-4 */}
        <Route
          path="/signup"
          element={
              <OpenRoute>
                <Signup />
              </OpenRoute>
            }
        />

        {/* Route-5 */}
        <Route
          path="/forgot-password"
          element={
              <OpenRoute>
                <ForgotPassword />
              </OpenRoute>
            } 
        />

        {/* Route-6 */}
        <Route
          path="/update-password/:id"
          element={
              <OpenRoute>
                <UpdatePassword />
              </OpenRoute>
            } 
        />

        {/* Route-7 */}
        <Route
          path="/verify-email"
          element={
              <OpenRoute>
                <VerifyEmail />
              </OpenRoute>
            } 
        />

        {/* Route-8 */}
        <Route
          path="/about"
          element={
              <About />
            } 
        />

        {/* Route-9 */}
        <Route
          path="/contact"
          element={
              <Contact />
            }
        />

        {/* Nested Dashboard/ && It's Outlet Route */}
        <Route
          element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          }
        >
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          
          <Route path="dashboard/whishlist" element={<MyProfile />} />
          <Route path="dashboard/purchase-history" element={<MyProfile />} />
          
          <Route path="dashboard/settings" element={<Settings />} />

          {
            user && user.accountType === ACCOUNT_TYPE.STUDENT &&
            <>
              <Route path="dashboard/cart" element={<Cart />} />
              <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
            </>
          }

          {
            user && user.accountType === ACCOUNT_TYPE.INSTRUCTOR &&
            <>
              <Route path="dashboard/add-course" element={<AddCourse />} />
              <Route path="dashboard/my-courses" element={<MyCourses />} />
              <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
              <Route path="dashboard/instructor" element={<Instructor />} />
            </>
          }
        </Route>

        <Route element={
          <PrivateRoute>
            <ViewCourse/>
          </PrivateRoute>
        }>
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT &&
            <>
              <Route
                path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails />}
              />
            </>
          }

        </Route>

        <Route path="*" element={<Error />} />

      </Routes>

    </div>
  );
}

export default App;
