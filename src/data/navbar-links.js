  // const Home = matchRoute(link?.path) ? <AiFillHome/> : <AiOutlineHome/>
  // const Contact = matchRoute(link?.path) ? <AiFillHome/> : <AiOutlineHome/>

import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import { BiSolidCategory, BiSolidMessageEdit } from "react-icons/bi";
import { FcAbout } from "react-icons/fc";
import { RiProfileLine } from "react-icons/ri";

// const Catalog = matchRoute(link?.path) ? <AiFillHome/> : <AiOutlineHome/>
export const NavbarLinks = [
  {
    title: "Home",
    Icon: <AiFillHome size={24}/>,
    path: "/",
  },
  {
    title: "Catalog",
    Icon: <BiSolidCategory size={24} color="#125acd"/>,
    path: '/catalog',
  },
  {
    title: "About Us",
    Icon: <RiProfileLine size={24}/>,
    path: "/about",
  },
  {
    title: "Contact Us",
    Icon: <BiSolidMessageEdit size={24}/>,
    path: "/contact",
  },
];


// const Home = matchRoute(link?.path) ? <AiFillHome/> : <AiOutlineHome/>
// const About = matchRoute(link?.path) ? <AiFillHome/> : <AiOutlineHome/>
// const Contact = matchRoute(link?.path) ? <AiFillHome/> : <AiOutlineHome/>
// const Catalog = matchRoute(link?.path) ? <AiFillHome/> : <AiOutlineHome/>