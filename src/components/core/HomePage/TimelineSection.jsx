import React from "react";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timelineImage from "../../../assets/Images/TimelineImage.png";

const TimelineSection = () => {
  const timelineArray = [
    {
      Id: 1,
      Tag: "Logo1",
      Logo: Logo1,
      Heading: "Leadership",
      Description: "Fully committed to the success company",
    },
    {
      Id: 2,
      Tag: "Logo2",
      Logo: Logo2,
      Heading: "Leadership",
      Description: "Fully committed to the success company",
    },
    {
      Id: 3,
      Tag: "Logo3",
      Logo: Logo3,
      Heading: "Leadership",
      Description: "Fully committed to the success company",
    },
    {
      Id: 4,
      Tag: "Logo4",
      Logo: Logo4,
      Heading: "Leadership",
      Description: "Fully committed to the success company",
    },
  ];

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-14 items-center">
        {/* left box */}
        <div className="flex flex-col  mt-14 w-full lg:w-[40%] gap-5">
          {timelineArray.map((element, index) => {
            return (
              <div className="flex flex-row gap-6" key={element.Id}>
                <div className="w-[50px] h-[50px] bg-white flex items-center justify-center rounded-full">
                  <img
                    className="shadow-white h-fit object-cover"
                    src={element.Logo}
                    alt={element.Tag}
                    loading="lazy"
                  />
                </div>
                <div>
                  <h2 className="font-semibold text-[18px]">{element.Heading}</h2>
                  <p className="text-base">{element.Description }</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* right img box */}
        <div className="relative px-4 shadow-lg shadow-blue-200">
          <img
            src={timelineImage}
            alt="timelineImage"
            className="shadow-white h-[500px] object-cover lg:h-full"
          />

          <div className="absolute h-1/2 w-2/5 lg:w-[80%] lg:h-fit bottom-3 translate-y-[-95%] lg:bottom-0 lg:translate-y-[50%] lg:translate-x-[13%]
                        bg-caribbeangreen-700 flex flex-col justify-around lg:flex-row gap-y-20 lg:gap-0 text-white uppercase py-7">
            <div className="flex flex-row gap-5 justify-center border-r border-caribbeangreen-300 px-7">
              <p className="text-3xl font-bold">10</p>
              <p className="text-caribbeangreen-300 text-center my-auto text-sm">Years of Experience</p>
            </div>
            <div className="flex flex-row gap-5 justify-center h-fit border-r border-caribbeangreen-300 px-7">
              <p className="text-3xl font-bold">250</p>
              <p className="text-caribbeangreen-300 text-center my-auto text-sm">Types of Course</p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default TimelineSection;
