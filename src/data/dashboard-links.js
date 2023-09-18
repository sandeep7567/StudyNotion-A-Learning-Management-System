import { ACCOUNT_TYPE } from "../utils/constants";
export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    icon: "VscAccount",
  },
  {
    id: 2,
    name: "Dashboard",
    path: "/dashboard/instructor",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscDashboard",
  },
  {
    id: 3,
    name: "My Courses",
    path: "/dashboard/my-courses",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscVm",
  },
  {
    id: 4,
    name: "Add Course",
    path: "/dashboard/add-course",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "AiOutlineShoppingCart",
  },
  {
    id: 5,
    name: "Enrolled Courses",
    path: "/dashboard/enrolled-courses",
    type: ACCOUNT_TYPE.STUDENT,
    icon: "VscMortarBoard",
  },
  {
    id: 6,
    name: "Cart",
    path: "/dashboard/cart",
    type: ACCOUNT_TYPE.STUDENT,
    icon: "VscArchive",
  },
  // {
  //   id: 7,
  //   name: "Purchase History",
  //   path: "/dashboard/purchase-history",
  //   type: ACCOUNT_TYPE.STUDENT,
  //   icon: "VscHistory",
  // },
  {
    id: 8,
    name: "Settings",
    path: "/dashboard/settings",
    // type: ACCOUNT_TYPE.INSTRUCTOR || ACCOUNT_TYPE.STUDENT,
    icon: "VscSettingsGear",
  },
];
