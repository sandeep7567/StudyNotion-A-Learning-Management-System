import React from "react";

const Svg = () => {
  return (
    <div className="absolute inset-0 -z-[999] w-full">
      <svg
        viewBox="0 0 349.32501220703125 225"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="stroke-1 stroke-[rgb(82,90,118)] h-full w-full absolute z-[90] featureCardSVG transition-all duration-200"
        style={{strokeOpacity: "0.8"}}

      >
        <path
          d="m 0 6 
                    a 6 6 0 0 1 6 -6 
                    h 250.32501220703125 
                    a 16 16 0 0 1 11 5 
                    l 77 77 
                    a 16 16 0 0 1 5 11 
                    v 126 
                    a 6 6 0 0 1 -6 6 
                    h -337.32501220703125 
                    a 6 6 0 0 1 -6 -6 
                    z"
          fill="#181C2E"
        ></path>
      </svg>
    </div>
  );
};

export default Svg;
