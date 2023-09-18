import { useState } from "react";

import { HiOutlineVideoCamera } from "react-icons/hi";

const Accordion = ({ sectionName, subSection, isOpen, onClick, }) => {
  const [isDescOpen, setIsDescOpen] = useState(null);

  const toggleData = (subSectionId) => {
    const data = subSection.filter((item) => item._id === subSectionId )
    if (isDescOpen === data[0]._id) {
      setIsDescOpen(null)
    } else {
      setIsDescOpen(data[0]._id);
    }
  };

  let totalDuration = 0;
  // console.log("subSection", subSection)
  for (const item of subSection) {
    totalDuration += parseInt(item.timeDuration);
    // console.log(totalDuration)
    
  };

  // console.log(totalDuration)

  let timeHrANDMin = "";

  if (totalDuration >= 60) {
    const timeDurationHr = totalDuration/60;
    const hr = timeDurationHr.toLocaleString().slice(0,1)
    const min = (timeDurationHr.toFixed(2).toString().slice(2) * 60 / 100).toPrecision(2)

    timeHrANDMin = `${hr}hr ${min}min`
  } else {
    const timeDurationHr = totalDuration/60;
    const min = (timeDurationHr.toFixed(2).toString().slice(2) * 60 / 100).toPrecision(2)
    timeHrANDMin = `${min}min`
  }
  
  // console.log("subSection", subSection)
  return (
    <div className={`overflow-hidden transition-[max-height] duration-500 ease-in ${isOpen ? "max-h-52" : "max-h-20"} border-b border border-solid border-richblack-600 mx-auto`}>
      <div className={`py-4 px-8 bg-richblack-700`}>
          <button
            onClick={onClick}
            className={`w-full grow flex justify-start gap-4 items-center 
            font-semibold focus:outline-none`}>
            <div className="flex gap-2 grow">
              <span className={`ml-2 w-5 h-5 ${isOpen ? 'transform rotate-180' : ''}`}>▼</span>
              <span className="text-richblack-5 text-sm font-medium">{sectionName}</span>
            </div>

            <div className="flex gap-x-2">
              <p className="text-yellow-50 text-sm font-medium">{subSection.length} lectures</p>
              <p className="text-richblack-25 text-sm font-medium">{timeHrANDMin}</p> 
            </div>
          </button>
      </div>

      {isOpen && (
        <div className="py-4 px-8 min-h-full">
          {subSection.map((item, index) => (
            <div key={index} className={`overflow-hidden transition-[max-height] duration-500 ease-in ${isDescOpen && isDescOpen === item?._id ? "max-h-14" : "max-h-5"} mb-3 min-h-full`}>
              <div className="flex flex-row items-center">
                <div className="flex-grow font-semibold focus:outline-none">
                  <button onClick={() => toggleData(item?._id)} className="ml-2 flex items-center space-x-2 focus:outline-none">
                    <HiOutlineVideoCamera className="w-4 h-4 text-richblack-5"/>
                    <span className="text-sm text-richblack-5 font-normal">{item?.title}</span>
                    <span className={`transform ${isDescOpen && isDescOpen === item?._id ? 'rotate-180' : ''}`}>▼</span>
                  </button>
                </div>
                <p className="text-sm text-richblack-25 font-normal">{item.timeDuration} min</p>
              </div>
              
              {isDescOpen === item?._id && (
                <p className={`mt-2 px-2 ${isDescOpen && isDescOpen === item?._id ? "pb-4" : ""} ml-6 min-h-full text-opacity-60 text-sm font-normal text-richblack-50`}>{item.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Accordion;
