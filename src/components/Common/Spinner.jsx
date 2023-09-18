import React from 'react';
import "../../App.css";

const Spinner = ({className}) => {
  return (
    <div className={`custom-loader ${className} mx-auto`}/>
  )
};

export default Spinner;
