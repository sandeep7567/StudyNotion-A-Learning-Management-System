import React from 'react';
import ReactDOM from 'react-dom';
import "../../../App.css";
import Spinner from '../Spinner';

const Loader = () => {
    return ReactDOM.createPortal(
      <div className='flex flex-col justify-center items-center w-screen h-screen'>
      <div className='spinner border-richblack-50'>
      </div>
    </div>,
      document.getElementById("loader")
    )
  };
export default Loader;
