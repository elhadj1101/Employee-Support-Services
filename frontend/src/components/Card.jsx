import React from "react";

const Card = ({ title, price, isEligable }) => {
  return (
    <div className=" h-28  sm:basis-1/3 mb-4 flex items-center justify-start gap-7 p-3 bg-slate-50 rounded-lg  ">
      <img
        className=" mr-2 h-[60px] w-[60px] p-2 rounded-full bg-slate-300"
        src="/icons/work.svg"
        alt="case"
      />
      <div className=" flex-col justify-start items-start mx-1">
        <h3 className="text-lg">{title}</h3>
        {price && (
          <h3 className="  text-blue-900 text-lg font-medium">{price} DA</h3>
        )}
        {isEligable && !price ? (
          <h2 className="  font-semibold text-green-600 ">OUI</h2>
        ) : !isEligable && !price ? (
          <h2 className=" ">NON</h2>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Card;
