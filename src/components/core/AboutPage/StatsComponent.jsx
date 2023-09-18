import React from 'react'

const Stats = [
  {
    count: "5k",
    label: "Active Student"
  },
  {
    count: "10+",
    label: "Mentors"
  },
  {
    count: "200+",
    label: "Courses"
  },
  {
    count: "50+",
    label: "Awards"
  },
]

const StatsComponent = () => {
  return (
    <section className='bg-richblack-800 py-[5.625rem]'>
      <div className="w-11/12 mx-auto">
        <div className='flex justify-evenly items-center gap-x-3'>
          {
            Stats.map((data, index) => {
              return (
                <div key={index} className='flex flex-col gap-3'>
                  <h1 className='text-richblack-5 text-center font-bold font-inter text-3xl'>
                    {data.count}
                  </h1>
                  <h2 className="text-richblack-500 text-center font-inter text-base font-semibold font-style: normal">
                    {data.label}
                  </h2>
                </div>
              )
            })
          }
        </div>
      </div>
    </section>
    
  )
}

export default StatsComponent