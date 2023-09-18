import DashboardHeading from '../../../Common/DashboardHeading';
import ChangeProfilePicture from './ChangeProfilePicture';
import EditProfile from './EditProfile';
import UpdatePassword from './UpdatePassword';
import DeleteAccount from './DeleteAccount';

const Settings = () => {

  return (
    <div className='text-richblack-5 mt-10 md:mt-0 mb-8 flex flex-col gap-5 scroll-smooth max-w-sm sm:max-w-md md:max-w-lg lg:max-w-4xl mx-auto'>

      {/* Dashboard Main Heading */}
      <DashboardHeading/>

      {/* section-1 */}
      <ChangeProfilePicture/>     

      {/* section-2 */}
      <EditProfile/>

      {/* section-3*/}
      <UpdatePassword/>      

      {/* section-4 */}
      <DeleteAccount/>      
      
    </div>
  )
}

export default Settings;