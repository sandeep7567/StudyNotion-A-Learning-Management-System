import React from 'react'
import { useNavigate } from 'react-router-dom'
import IconButton from '../../Common/IconButton';
import { BiEdit } from 'react-icons/bi'
import DashboardHeading from '../../Common/DashboardHeading';
import { formattedDate } from '../../../utils/dateFormatter';

import { useSelector } from 'react-redux';
// import { setUser } from '../../../slices/profileSlice';
// import { getUserDetails } from '../../../services/oprations/profileAPI';
import Error from '../../../pages/Error';

const MyProfile = () => {
  const navigate = useNavigate();  
  const {user} = useSelector((state) => state.profile);

  // const handleSubmit = useCallback(() => {
  //   user && token !== null && getAllUserDetails(token)
    
  // }, [user, token]);

  // useEffect(() => {
  //   const getAllUserDetails = ( token ) => {
      
  //     console.log("user",user, "token", token)
  //     try {
  //       setLoading(true);
        
  //       dispatch(getUserDetails( token, navigate ))
        
  //     } catch (error) {
  //       console.log("Error", error.message);
  //     }
  //     setLoading(false);
  //   }
  //   getAllUserDetails(token);
  // }, [token]);

  if (!user) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  };

  if (!user.approved) {
    return <Error />;
  };
  
  return (
    <div className='flex flex-col gap-5 mt-10 md:mt-0 sm:mb-0 lg:mb-0 scroll-smooth max-w-sm sm:max-w-md md:max-w-lg lg:max-w-4xl mx-auto'>
      {/* Dashboard Heading */}
      <DashboardHeading/>

      {/* section-1 */}
      <div className='flex p-6 gap-2 bg-richblack-800 border border-richblack-700  rounded-lg justify-between'>
        <div className='flex flex-col sm:flex-row gap-y-2 gap-x-6'>
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`} 
            className='aspect-square w-10 h-10 sm:h-fit sm:w-[4.875rem] border-solid border-2 border-richblack-900 rounded-full'
          />
          <div className='flex flex-col gap-[0.125rem] justify-center'>
            <p className='text-richblack-5 text-base sm:text-lg font-semibold'>{user?.firstName + " " + user?.lastName}</p>
            <p className='text-richblack-300 text-xs sm:text-sm font-inter font-normal'>{user?.email}</p>
          </div>
        </div>
        <IconButton
          text={"Edit"}
          onclick={() => {
          return navigate("/dashboard/settings")}}
          customClasses={"bg-yellow-50 md:w-fit w-fit ml-auto md:mx-0 text-richblack-900 text-base font-medium flex flex-row-reverse px-5 py-2 bg-yellow-50 my-auto rounded-lg shadow-[-0.5px_-1.5px_0px_0px_rgba(0,0,0,1)_inset] justify-center items-center gap-2 transition-all duration-200 hover:bg-yellow-100"}
        >
          <BiEdit size={"1.125rem"}/>
        </IconButton>
      </div>

      {/* section-2 */}
      <div className='flex p-6 flex-col gap-2 bg-richblack-800 border border-richblack-700  rounded-lg '>
        <div className='flex flex-row justify-between items-center'>
          <p className='text-richblack-5 font-inter text-lg font-semibold'>About</p>
          <IconButton
            text={"Edit"}
            onclick={() => {
              return navigate("/dashboard/settings")}}
              customClasses={"bg-yellow-50 text-richblack-900 text-base font-medium flex flex-row-reverse px-5 py-2 bg-yellow-50 my-auto rounded-lg shadow-[-0.5px_-1.5px_0px_0px_rgba(0,0,0,1)_inset] justify-center items-center gap-2 transition-all duration-200 hover:bg-yellow-100"}
          >
            <BiEdit size={"1.125rem"}/>
          </IconButton>
        </div>
        <p
          className={`text-richblack-5  text-xs sm:text-sm font-inter opacity-60 font-extralight`}
        >
          {user?.additionalDetails?.about ??  "Write Something about Yourself"}
        </p>
      </div>

      {/* section-3 */}
      <div className='flex flex-col p-6 mb-6 gap-5 bg-richblack-800 border border-richblack-700  rounded-lg'>

        <div className='flex justify-between items-center '>

          <p className='text-richblack-5 font-inter text-lg font-semibold'>Personal Details</p>
          <IconButton
            text={"Edit"}
            onclick={() => {
              return navigate("/dashboard/settings")}}
              customClasses={`bg-yellow-50 text-richblack-900 text-base font-medium rounded-lg
                              flex flex-row-reverse px-5 py-2 bg-yellow-50 my-auto
                              shadow-[-0.5px_-1.5px_0px_0px_rgba(0,0,0,1)_inset] 
                              justify-center items-center gap-2 transition-all duration-200 
                              hover:bg-yellow-100`}
          >
            <BiEdit size={"1.125rem"}/>
          </IconButton>
          
        </div>

        <div className='flex flex-col gap-x-4 gap-y-4'>

          <div className='flex justify-between items-center'>
            <div className='flex flex-col w-1/2'>
              <p className='text-richblack-600  text-xs sm:text-sm font-normal'>
                First Name
              </p>
              <p className='text-richblack-5  text-xs sm:text-sm font-medium font-inter'>
                {user?.firstName}
              </p>
            </div>
            <div className='flex flex-col w-1/2'>
              <p className='text-richblack-600  text-xs sm:text-sm font-normal'>
                Last Name
              </p>
              <p className='text-richblack-5  text-xs sm:text-sm font-medium font-inter'>
                {user?.lastName ?? "Add Last Name"}
              </p>
            </div>
          </div>

          {/* gender and email */}
          <div className='flex justify-between items-center'>
            <div className='flex flex-col w-1/2'>
              <p className='text-richblack-600  text-xs sm:text-sm font-normal'>
                Gender
              </p>
              <p className='text-richblack-5  text-xs sm:text-sm font-medium font-inter'>
                {user?.additionalDetails?.gender ?? "Select Your Gender"}
              </p>
            </div>
            <div className='flex flex-col w-1/2'>
              <p className='text-richblack-5  text-xs sm:text-sm font-medium font-inter'>
                Email
              </p>
              <p className='text-richblack-600  text-xs sm:text-sm font-normal'>
                {user?.email}
              </p>
            </div>
          </div>
          
          {/* CountryCode AND Phone No */}
          <div className='flex justify-between items-center'>
            <div className='flex flex-col w-1/2'>
              <p className='text-richblack-600  text-xs sm:text-sm font-normal'>
                Phone No
              </p>
              <p className='text-richblack-5  text-xs sm:text-sm font-medium font-inter'>
                {`${user?.additionalDetails?.countrycode ?? "(+91)"} 
                ${user?.additionalDetails?.contactNumber ?? "123-456-7890"}`}
              </p>
            </div>
            <div className='flex flex-col w-1/2'>
              <p className='text-richblack-600  text-xs sm:text-sm font-normal'>
                Date Of Birth
              </p>
              <p className='text-richblack-5  text-xs sm:text-sm font-medium font-inter'>
                
              {
                user?.additionalDetails?.dateOfBirth
                  ? formattedDate(user?.additionalDetails?.dateOfBirth)
                  : ("mm/dd/yyyy")
              }
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  )
}

export default MyProfile