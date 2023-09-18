import React, { useState } from 'react';
import { Chart, registerables, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

Chart.register(...registerables, ArcElement, Tooltip, Legend)

const InstructorChart = ({courses}) => {
  const [currChart, setCurrChart] = useState("students");
  
  // randomColorGenerator function
  const randomColorGenerator = (numColors) => {
    const colors = [];
    for (let i=0; i<numColors; i++ ) {
      const rgb1 = Math.floor(Math.random()*256)
      const rgb2 = Math.floor(Math.random()*256)
      const rgb3 = Math.floor(Math.random()*256)
      const color = `rgb(${rgb1}, ${rgb2}, ${rgb3})`
      
      colors.push(color);
    }
    return colors;
  };

  // create data for chart displaying student info;
  const chartDataForStudents = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalStudentsEnrolled),
        backgroundColor: randomColorGenerator(courses.length),
        borderColor: randomColorGenerator(courses.length),
        borderWidth: 1,
      }
    ]
  };

  // create data for chart displaying income info;
  const chartDataForIncome = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalAmountGenerated),
        backgroundColor: randomColorGenerator(courses.length),
        borderColor: randomColorGenerator(courses.length),
        borderWidth: 1,
      }
    ]
  };


  // options for chart;
  const options = {
    
  };

  return (
    <div className='flex flex-col gap-y-5 justify-center'>
      <p className="text-richblack-5 font-inter text-xl md:text-2xl font-semibold">Visualise</p>
      <div className='w-fit mx-auto md:w-full hover:border bg-richblack-700 py-2 px-4 space-x-4 rounded-full'>
        <button
          className={`${currChart.includes("students")
                      ? "bg-richblack-900 border bg-opacity-60 text-richblack-100" 
                      : ""} px-10 py-2 rounded-3xl transition-all duration-300`}
          onClick={() => setCurrChart("students")}
        >
          Student
        </button>
        {/* <span className='text-richblack-900 w-1 h-8 bg-richblack-900'></span> */}
        <button
          className={`${currChart.includes("income")
                      ? "bg-richblack-900 border bg-opacity-60 text-richblack-100" 
                      : ""} px-10 py-2 rounded-3xl transition-all duration-300 scroll-smooth drop-shadow-2xl`}
          onClick={() => setCurrChart("income")}
        >
          Income
        </button>
      </div>

      <div className='flex justify-center items-center bg-richblack-900 bg-opacity-20 p-4 rounded-lg'>
        <Pie
          data={currChart.includes("students") 
            ? chartDataForStudents
            : chartDataForIncome }
          options={options}
          className=''
        />
      </div>
    </div>
  )
}

export default InstructorChart;