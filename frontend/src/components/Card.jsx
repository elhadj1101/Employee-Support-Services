import React from "react";

const Card = ({ title, price, isEligable,icon , sub , ReactIcon  }) => {
  return (
    <div className={`shadoww ${ReactIcon ?'min-h-40 px-16 ':'min-h-44 px-5'}  min-w-96  sm:basis-1/3 mb-4 flex items-center justify-start  p-3 bg-white rounded-lg`}>
      { !ReactIcon ? <img
        className="  mr-5 h-[70px] w-[70px] p-2  "
        src={icon}
        alt="case"
      /> :
      <div className="mr-5">{ReactIcon}</div>
     
      }
      <div className=" h-full py-6 flex-col justify-start items-start ">
        <h3 className="text-lg md:text-xl font-semibold  text-[#262b40] capitalize ">{title} <span className="text-sm text-gray-600">{sub}</span></h3>
        {price && (
          <h3 className=" text-xl md:text-3xl font-bold text-[#262b40] mt-3">{price} DA</h3>
        )}
        {isEligable && !price ? (
          <h2 className="  text-2xl font-bold  mt-3 text-green-600 ">OUI</h2>
        ) : !isEligable && !price ? (
          <h2 className=" text-2xl font-bold  mt-3 text-red-600">NON</h2>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Card;
